import { Router } from "express";

import {
    create,
    getAll,
    getOne,
    getOrganizerEventList,
    update,
    remove,
} from "../controllers/event.controller.js";

import {
    createEventValidation,
    updateEventValidation,
} from "../validators/event.validators.js";

import { requireAuth } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Events
 *   description: Event Management APIs
 */

/**
 * @swagger
 * /api/events:
 *   get:
 *     summary: Get all events
 *     tags: [Events]
 *     responses:
 *       200:
 *         description: List of events
 */
router.get("/", getAll);

/**
 * @swagger
 * /api/events/organizer/my-events:
 *   get:
 *     summary: Get organizer's events
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Organizer event list
 */
router.get(
    "/organizer/my-events",
    requireAuth,
    authorize("organizer", "admin"),
    getOrganizerEventList
);

/**
 * @swagger
 * /api/events/{id}:
 *   get:
 *     summary: Get event by ID
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Event ID
 *     responses:
 *       200:
 *         description: Event details
 *       404:
 *         description: Event not found
 */
router.get("/:id", getOne);

/**
 * @swagger
 * /api/events:
 *   post:
 *     summary: Create a new event
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - venue
 *               - startDate
 *               - endDate
 *               - totalSeats
 *               - price
 *             properties:
 *               title:
 *                 type: string
 *                 example: Tech Conference 2026
 *               description:
 *                 type: string
 *                 example: Annual technology conference.
 *               venue:
 *                 type: string
 *                 example: Mumbai
 *               startDate:
 *                 type: string
 *                 format: date-time
 *               endDate:
 *                 type: string
 *                 format: date-time
 *               totalSeats:
 *                 type: integer
 *                 example: 300
 *               price:
 *                 type: number
 *                 example: 499
 *     responses:
 *       201:
 *         description: Event created successfully
 *       401:
 *         description: Unauthorized
 */
router.post(
    "/",
    requireAuth,
    authorize("organizer", "admin"),
    createEventValidation,
    create
);


/**
 * @swagger
 * /api/events/{id}:
 *   patch:
 *     summary: Update an event
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Event ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Event updated successfully
 *       404:
 *         description: Event not found
 */
router.patch(
    "/:id",
    requireAuth,
    authorize("organizer", "admin"),
    updateEventValidation,
    update
);

/**
 * @swagger
 * /api/events/{id}:
 *   delete:
 *     summary: Delete an event
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Event ID
 *     responses:
 *       200:
 *         description: Event deleted successfully
 *       404:
 *         description: Event not found
 */
router.delete(
    "/:id",
    requireAuth,
    authorize("organizer", "admin"),
    remove
);

export default router;