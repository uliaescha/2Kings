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

export default router;
