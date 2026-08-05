import express from "express";

import {
    downloadBookingTicket,
} from "../controllers/ticket.controller.js";

const router = express.Router();

router.get(
    "/download",
    downloadBookingTicket
);

export default router;