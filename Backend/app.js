import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import eventRoutes from "./routes/event.routes.js";
import bookingRoutes from "./routes/booking.routes.js";
import ticketRoutes from "./routes/ticket.routes.js";
import checkInRoutes from "./routes/checkin.routes.js";
import paymentRoutes from "./routes/payment.routes.js";

import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./configs/swagger.js";


const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/checkin", checkInRoutes);
app.use("/api/payments", paymentRoutes);

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Health Check Route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to EventNest API 🚀"
    });
});

export default app;