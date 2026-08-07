import { Router } from "express";

import { requireAuth } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

import {
    overview,
    events,
    bookings,
    attendance,
    payments,
} from "../controllers/organizerDashboard.controller.js";


const router = Router();


/**
 * @swagger
 * tags:
 *   name: Organizer Dashboard
 *   description: Organizer dashboard analytics
 */


/**
 * @swagger
 * /api/organizer-dashboard/overview:
 *   get:
 *     summary: Get organizer dashboard overview
 *     tags: [Organizer Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard overview retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Organizer access required
 */
router.get(
    "/overview",
    requireAuth,
    authorize("organizer"),
    overview
);


/**
 * @swagger
 * /api/organizer-dashboard/events:
 *   get:
 *     summary: Get organizer event statistics
 *     tags: [Organizer Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Event statistics retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Organizer access required
 */
router.get(
    "/events",
    requireAuth,
    authorize("organizer"),
    events
);


/**
 * @swagger
 * /api/organizer-dashboard/bookings:
 *   get:
 *     summary: Get organizer booking analytics
 *     tags: [Organizer Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Booking analytics retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Organizer access required
 */
router.get(
    "/bookings",
    requireAuth,
    authorize("organizer"),
    bookings
);


/**
 * @swagger
 * /api/organizer-dashboard/attendance:
 *   get:
 *     summary: Get organizer attendance analytics
 *     tags: [Organizer Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Attendance analytics retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Organizer access required
 */
router.get(
    "/attendance",
    requireAuth,
    authorize("organizer"),
    attendance
);


/**
 * @swagger
 * /api/organizer-dashboard/payments:
 *   get:
 *     summary: Get organizer payment history
 *     tags: [Organizer Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Payment history retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Organizer access required
 */
router.get(
    "/payments",
    requireAuth,
    authorize("organizer"),
    payments
);


export default router;