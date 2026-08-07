import {
    getUsers,
    getUser,
    suspendUser,
    activateUser,
    getAdminEvents,
    approveEvent,
    rejectEvent,
    removeEvent,
    getAdminDashboard,
} from "../services/admin.service.js";

/*
|--------------------------------------------------------------------------
| User Management
|--------------------------------------------------------------------------
*/

export const getAllUsers = async (
    req,
    res,
    next
) => {
    try {
        const users = await getUsers();

        return res.status(200).json({
            success: true,
            count: users.length,
            data: users,
        });
    } catch (error) {
        next(error);
    }
};

export const getUserById = async (
    req,
    res,
    next
) => {
    try {
        const user = await getUser(
            req.params.id
        );

        return res.status(200).json({
            success: true,
            data: user,
        });
    } catch (error) {
        next(error);
    }
};

export const suspend = async (
    req,
    res,
    next
) => {
    try {
        const user = await suspendUser(
            req.params.id
        );

        return res.status(200).json({
            success: true,
            message: "User suspended successfully.",
            data: user,
        });
    } catch (error) {
        next(error);
    }
};

export const activate = async (
    req,
    res,
    next
) => {
    try {
        const user = await activateUser(
            req.params.id
        );

        return res.status(200).json({
            success: true,
            message: "User activated successfully.",
            data: user,
        });
    } catch (error) {
        next(error);
    }
};

/*
|--------------------------------------------------------------------------
| Event Moderation
|--------------------------------------------------------------------------
*/

export const getEvents = async (
    req,
    res,
    next
) => {
    try {
        const events = await getAdminEvents();

        return res.status(200).json({
            success: true,
            count: events.length,
            data: events,
        });
    } catch (error) {
        next(error);
    }
};

export const approve = async (
    req,
    res,
    next
) => {
    try {
        const event = await approveEvent(
            req.params.id
        );

        return res.status(200).json({
            success: true,
            message: "Event approved successfully.",
            data: event,
        });
    } catch (error) {
        next(error);
    }
};

export const reject = async (
    req,
    res,
    next
) => {
    try {
        const event = await rejectEvent(
            req.params.id
        );

        return res.status(200).json({
            success: true,
            message: "Event rejected successfully.",
            data: event,
        });
    } catch (error) {
        next(error);
    }
};

export const remove = async (
    req,
    res,
    next
) => {
    try {
        const result = await removeEvent(
            req.params.id
        );

        return res.status(200).json({
            success: true,
            message: result.message,
        });
    } catch (error) {
        next(error);
    }
};

/*
|--------------------------------------------------------------------------
| Analytics
|--------------------------------------------------------------------------
*/

export const dashboard = async (
    req,
    res,
    next
) => {
    try {
        const stats =
            await getAdminDashboard();

        return res.status(200).json({
            success: true,
            data: stats,
        });
    } catch (error) {
        next(error);
    }
};
