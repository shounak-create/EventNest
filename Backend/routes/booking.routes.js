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

router.post(
    "/",
    requireAuth,
    authorize("attendee"),
    createBookingValidation,
    create
);

router.get(
    "/my-bookings",
    requireAuth,
    authorize("attendee"),
    getMyBookingList
);

router.get(
    "/:id",
    requireAuth,
    getOne
);

router.patch(
    "/:id/cancel",
    requireAuth,
    authorize("attendee"),
    cancelBookingValidation,
    cancel
);

router.delete(
    "/:id",
    requireAuth,
    authorize("admin"),
    remove
);

export default router;