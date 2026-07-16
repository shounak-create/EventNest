import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";



const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);

// Health Check Route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to EventNest API 🚀"
    });
});

export default app;