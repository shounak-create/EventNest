import {
    createEvent as createEventRepository,
    findEventById,
    findAllEvents,
    findEventsByOrganizer,
    updateEvent as updateEventRepository,
    deleteEvent as deleteEventRepository,
} from "../repositories/event.repository.js";

export const createEvent = async (eventData, user) => {

    if (user.role !== "organizer" && user.role !== "admin") {
        throw new Error("You are not authorized to create events.");
    }

    if (new Date(eventData.endDate) <= new Date(eventData.startDate)) {
        throw new Error("End date must be after the start date.");
    }

    eventData.organizer = user.id;

    eventData.remainingSeats = eventData.capacity;

    return await createEventRepository(eventData);
};

export const getEventById = async (eventId) => {

    const event = await findEventById(eventId);

    if (!event) {
        throw new Error("Event not found.");
    }

    return event;
};

export const getAllEvents = async () => {

    return await findAllEvents();

};

export const getOrganizerEvents = async (organizerId) => {

    return await findEventsByOrganizer(organizerId);

};

export const updateEvent = async (
    eventId,
    updateData,
    user
) => {

    const event = await findEventById(eventId);

    if (!event) {
        throw new Error("Event not found.");
    }

    if (
        event.organizer._id.toString() !== user.id.toString() &&
        user.role !== "admin"
    ) {
        throw new Error("You are not authorized to update this event.");
    }

    if (
        updateData.startDate &&
        updateData.endDate &&
        new Date(updateData.endDate) <= new Date(updateData.startDate)
    ) {
        throw new Error("End date must be after the start date.");
    }

    return await updateEventRepository(
        eventId,
        updateData
    );
};

export const deleteEvent = async (
    eventId,
    user
) => {

    const event = await findEventById(eventId);

    if (!event) {
        throw new Error("Event not found.");
    }

    if (
        event.organizer._id.toString() !== user.id.toString() &&
        user.role !== "admin"
    ) {
        throw new Error("You are not authorized to delete this event.");
    }

    await deleteEventRepository(eventId);

    return {
        message: "Event deleted successfully.",
    };
};