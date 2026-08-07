import { Router } from "express";

import { requireAuth } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

import { checkIn } from "../controllers/checkin.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Check-in
 *   description: Event Check-in Management
 */

/**
 * @swagger
 * /api/checkin:
 *   post:
 *     summary: Check in an attendee using their ticket
 *     tags: [Check-in]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ticketReference
 *             properties:
 *               ticketReference:
 *                 type: string
 *                 example: EVN-7A8F4B2C
 *     responses:
 *       200:
 *         description: Check-in successful
 *       404:
 *         description: Ticket not found
 *       400:
 *         description: Ticket already checked in
 */

router.post(
    "/",
    requireAuth,
    authorize("organizer", "admin"),
    checkIn
);

export default router;