
import { Router } from "express";

import {
    getAllUsers,
    getUserById,
    suspend,
    activate,
    getEvents,
    approve,
    reject,
    remove,
    dashboard,
} from "../controllers/admin.controller.js";

import { requireAuth } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| All Admin Routes
|--------------------------------------------------------------------------
*/

router.use(
    requireAuth,
    authorize("admin")
);

/*
|--------------------------------------------------------------------------
| Dashboard
|--------------------------------------------------------------------------
*/

router.get(
    "/dashboard",
    dashboard
);

/*
|--------------------------------------------------------------------------
| User Management
|--------------------------------------------------------------------------
*/

router.get(
    "/users",
    getAllUsers
);

router.get(
    "/users/:id",
    getUserById
);

router.patch(
    "/users/:id/suspend",
    suspend
);

router.patch(
    "/users/:id/activate",
    activate
);

/*
|--------------------------------------------------------------------------
| Event Moderation
|--------------------------------------------------------------------------
*/

router.get(
    "/events",
    getEvents
);

router.patch(
    "/events/:id/approve",
    approve
);

router.patch(
    "/events/:id/reject",
    reject
);

router.delete(
    "/events/:id",
    remove
);

export default router;
