import express from "express";

import { requireAuth } from "../middleware/auth.middleware.js";

import {
    downloadBookingTicket,
} from "../controllers/ticket.controller.js";

const router = express.Router();

router.get(
    "/:bookingId",
    requireAuth,
    downloadBookingTicket
);

export default router;