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



router.get("/", getAll);

router.get("/:id", getOne);

router.post(
    "/",
    requireAuth,
    authorize("organizer", "admin"),
    createEventValidation,
    create
);

router.get(
    "/organizer/my-events",
    requireAuth,
    authorize("organizer", "admin"),
    getOrganizerEventList
);

router.patch(
    "/:id",
    requireAuth,
    authorize("organizer", "admin"),
    updateEventValidation,
    update
);

router.delete(
    "/:id",
    requireAuth,
    authorize("organizer", "admin"),
    remove
);

export default router;