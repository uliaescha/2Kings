import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const corsOptions = {
  origin: "http://localhost:5174",
  credentials: true,
  // allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Підключення до MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Підключено до MongoDB"))
  .catch((err) => console.error("❌ Помилка підключення до MongoDB:", err));

// Swagger налаштування
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Chess API",
      version: "1.0.0",
      description: "API for chess website",
    },
    servers: [{ url: `http://localhost:${PORT}` }],
  },
  apis: ["./routes/*.js"], // Вказуємо шлях до файлів з описом API
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/api/users", userRoutes);

// Запуск сервера
app.listen(PORT, () => {
  console.log(`✅ Сервер запущено на порту ${PORT}`);
  console.log(
    `📄 Swagger доступний за адресою: http://localhost:${PORT}/api-docs`
  );
});
