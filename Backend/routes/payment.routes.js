import { Router } from "express";

import { requireAuth } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

import {
    create,
    verify,
} from "../controllers/payment.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: Razorpay Payment APIs
 */

/**
 * @swagger
 * /api/payments/create-order:
 *   post:
 *     summary: Create a Razorpay order
 *     tags: [Payments]
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
 *       200:
 *         description: Razorpay order created successfully
 */

router.post(
    "/create-order",
    requireAuth,
    authorize("attendee"),
    create
);

/**
 * @swagger
 * /api/payments/verify:
 *   post:
 *     summary: Verify Razorpay payment
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - razorpay_order_id
 *               - razorpay_payment_id
 *               - razorpay_signature
 *             properties:
 *               razorpay_order_id:
 *                 type: string
 *               razorpay_payment_id:
 *                 type: string
 *               razorpay_signature:
 *                 type: string
 *     responses:
 *       200:
 *         description: Payment verified successfully
 *       400:
 *         description: Invalid payment signature
 */

router.post(
    "/verify",
    requireAuth,
    authorize("attendee"),
    verify
);

export default router;