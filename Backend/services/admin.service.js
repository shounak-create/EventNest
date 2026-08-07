import {
    findAllUsers,
    findUserById,
    updateUserStatus,
    findAllAdminEvents,
    findAdminEventById,
    updateEventStatus,
    deleteAdminEvent,
    getPlatformStats,
} from "../repositories/admin.repository.js";

/*
|--------------------------------------------------------------------------
| User Management
|--------------------------------------------------------------------------
*/

export const getUsers = async () => {
    return await findAllUsers();
};

export const getUser = async (userId) => {
    const user = await findUserById(userId);

    if (!user) {
        throw new Error("User not found.");
    }

    return user;
};

export const suspendUser = async (userId) => {
    const user = await findUserById(userId);

    if (!user) {
        throw new Error("User not found.");
    }

    if (user.role === "admin") {
        throw new Error(
            "Admin accounts cannot be suspended."
        );
    }

    return await updateUserStatus(
        userId,
        false
    );
};

export const activateUser = async (userId) => {
    const user = await findUserById(userId);

    if (!user) {
        throw new Error("User not found.");
    }

    return await updateUserStatus(
        userId,
        true
    );
};

/*
|--------------------------------------------------------------------------
| Event Moderation
|--------------------------------------------------------------------------
*/

export const getAdminEvents = async () => {
    return await findAllAdminEvents();
};

export const approveEvent = async (eventId) => {
    const event = await findAdminEventById(
        eventId
    );

    if (!event) {
        throw new Error("Event not found.");
    }

    return await updateEventStatus(
        eventId,
        "published",
        true
    );
};

export const rejectEvent = async (eventId) => {
    const event = await findAdminEventById(
        eventId
    );

    if (!event) {
        throw new Error("Event not found.");
    }

    return await updateEventStatus(
        eventId,
        "draft",
        false
    );
};

export const removeEvent = async (eventId) => {
    const event = await findAdminEventById(
        eventId
    );

    if (!event) {
        throw new Error("Event not found.");
    }

    await deleteAdminEvent(eventId);

    return {
        message: "Event removed successfully.",
    };
};

/*
|--------------------------------------------------------------------------
| Platform Analytics
|--------------------------------------------------------------------------
*/

export const getAdminDashboard = async () => {
    return await getPlatformStats();
};
