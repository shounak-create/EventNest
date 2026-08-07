import express from "express";

import {
    downloadBookingTicket,
} from "../controllers/ticket.controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Tickets
 *   description: Ticket Download APIs
 */

/**
 * @swagger
 * /api/tickets/download:
 *   get:
 *     summary: Download booking ticket as PDF
 *     tags: [Tickets]
 *     parameters:
 *       - in: query
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: JWT ticket token
 *     responses:
 *       200:
 *         description: PDF ticket generated successfully
 *       401:
 *         description: Invalid or expired ticket
 */

router.get(
    "/download",
    downloadBookingTicket
);

export default router;