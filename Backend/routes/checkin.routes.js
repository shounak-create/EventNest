import { Router } from "express";

import { requireAuth } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

import { checkIn } from "../controllers/checkin.controller.js";

const router = Router();

router.post(
    "/",
    requireAuth,
    authorize("organizer", "admin"),
    checkIn
);

export default router;