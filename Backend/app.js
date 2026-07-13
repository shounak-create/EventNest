import express from "express";
import cors from "cors";
import morgan from "morgan";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Health Check Route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to EventNest API 🚀"
    });
});

export default app;