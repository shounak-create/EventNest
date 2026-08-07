import { Router } from "express";

import {
    create,
    getOne,
    getMyBookingList,
    cancel,
    remove,
} from "../controllers/booking.controller.js";

import { requireAuth } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

import {
    createBookingValidation,
    cancelBookingValidation,
} from "../validators/booking.validator.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Bookings
 *   description: Booking Management Endpoints
 */

/**
 * @swagger
 * /api/bookings:
 *   post:
 *     summary: Create a booking
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - eventId
 *               - quantity
 *             properties:
 *               eventId:
 *                 type: string
 *                 example: 688ef6c5eb92451f52f8f47c
 *               quantity:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Booking created successfully
 *       401:
 *         description: Unauthorized
 */

router.post(
    "/",
    requireAuth,
    authorize("attendee"),
    createBookingValidation,
    create
);

/**
 * @swagger
 * /api/bookings/my-bookings:
 *   get:
 *     summary: Get logged-in attendee bookings
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Booking list retrieved successfully
 */

router.get(
    "/my-bookings",
    requireAuth,
    authorize("attendee"),
    getMyBookingList
);

/**
 * @swagger
 * /api/bookings/{id}:
 *   get:
 *     summary: Get booking by ID
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Booking ID
 *     responses:
 *       200:
 *         description: Booking details retrieved successfully
 *       404:
 *         description: Booking not found
 */

router.get(
    "/:id",
    requireAuth,
    getOne
);

/**
 * @swagger
 * /api/bookings/{id}/cancel:
 *   patch:
 *     summary: Cancel a booking
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Booking ID
 *     responses:
 *       200:
 *         description: Booking cancelled successfully
 *       404:
 *         description: Booking not found
 */

router.patch(
    "/:id/cancel",
    requireAuth,
    authorize("attendee"),
    cancelBookingValidation,
    cancel
);

/**
 * @swagger
 * /api/bookings/{id}:
 *   delete:
 *     summary: Delete a booking
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Booking ID
 *     responses:
 *       200:
 *         description: Booking deleted successfully
 *       404:
 *         description: Booking not found
 */

router.delete(
    "/:id",
    requireAuth,
    authorize("admin"),
    remove
);

export default router;