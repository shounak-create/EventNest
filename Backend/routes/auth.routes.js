import { Router } from "express";

import {
    register,
    login,
    me,
    refreshToken,
    logout,
    googleLogin,
    googleCallback,
} from "../controllers/auth.controller.js";

import {
    registerValidation,
    loginValidation,
    validate,
} from "../validators/auth.validators.js";

import { requireAuth } from "../middleware/auth.middleware.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Authentication & User Management APIs
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *               - email
 *               - password
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: Shounak Pandit
 *               email:
 *                 type: string
 *                 example: shounak@gmail.com
 *               password:
 *                 type: string
 *                 example: Password@123
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation failed
 */
router.post(
    "/register",
    registerValidation,
    validate,
    register
);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: shounak@gmail.com
 *               password:
 *                 type: string
 *                 example: Password@123
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
router.post(
    "/login",
    loginValidation,
    validate,
    login
);

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Get logged in user's profile
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user profile
 *       401:
 *         description: Unauthorized
 */
router.get(
    "/me",
    requireAuth,
    me
);

/**
 * @swagger
 * /api/auth/refresh-token:
 *   post:
 *     summary: Generate a new access token
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Access token refreshed
 *       401:
 *         description: Invalid refresh token
 */
router.post(
    "/refresh-token",
    refreshToken
);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Logout current user
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout successful
 */
router.post(
    "/logout",
    requireAuth,
    logout
);

/**
 * @swagger
 * /api/auth/google:
 *   get:
 *     summary: Login with Google
 *     tags: [Authentication]
 *     responses:
 *       302:
 *         description: Redirects to Google OAuth
 */
router.get(
    "/google",
    googleLogin
);

/**
 * @swagger
 * /api/auth/google/callback:
 *   get:
 *     summary: Google OAuth callback
 *     tags: [Authentication]
 *     responses:
 *       302:
 *         description: Redirects back after successful login
 */
router.get(
    "/google/callback",
    googleCallback
);

export default router;