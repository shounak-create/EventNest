import { Router } from "express";

import { requireAuth } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

import {
    create,
    verify,
} from "../controllers/payment.controller.js";

const router = Router();

router.post(
    "/create-order",
    requireAuth,
    authorize("attendee"),
    create
);

router.post(
    "/verify",
    requireAuth,
    authorize("attendee"),
    verify
);

export default router;