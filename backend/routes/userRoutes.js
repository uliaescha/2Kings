import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";
dotenv.config();

const router = express.Router();

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Реєстрація нового користувача
 *     description: Створення нового користувача з іменем, email і паролем
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 example: "test@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       201:
 *         description: Успішна реєстрація
 *       400:
 *         description: Користувач вже існує
 *       500:
 *         description: Помилка сервера
 */
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body; 

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User is allready exist" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ name, email, password: hashedPassword }); 

    const token = generateToken(newUser._id);
    newUser.token = token;
    await newUser.save();

    res.cookie("authToken", token, {
       httpOnly: true,
       secure: process.env.NODE_ENV === "production",
       maxAge: 90 * 24 * 60 * 60 * 1000,
       sameSite: "Lax",
    });
    console.log("Cookie set:", res.getHeaders()["set-cookie"]);
    res.status(201).json({
       message: "User registered successfully",
       userId: newUser.userId,
       token,
    });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.post("/login", async (req, res) => {
  const { name, password } = req.body;

  try {
    const user = await User.findOne({ name });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (user.token) {
      try {
        jwt.verify(user.token, process.env.JWT_SECRET);
        console.log("Returning existing valid token");

        res.cookie("authToken", user.token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 90 * 24 * 60 * 60 * 1000,
          sameSite: "Lax",
        });

        return res.status(200).json({
          message: "User logged in successfully",
          token: user.token,
        });
      } catch (err) {
        console.log("Token expired or invalid, generating a new one");
      }
    }

    const token = generateToken(user._id);
    user.token = token;
    await user.save();

    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 90 * 24 * 60 * 60 * 1000,
      sameSite: "Lax",
    });

    res.status(200).json({
      message: "User logged in successfully",
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
