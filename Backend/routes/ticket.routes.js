
import express from "express";

import {
    requireAuth,
} from "../middleware/auth.middleware.js";

import {
    getTicketToken,
    downloadBookingTicket,
} from "../controllers/ticket.controller.js";


const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: Tickets
 *   description: Ticket APIs
 */


router.get(
    "/token/:bookingId",
    requireAuth,
    getTicketToken
);


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

