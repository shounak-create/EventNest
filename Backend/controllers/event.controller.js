import {
    createEvent,
    getEventById,
    getAllEvents,
    getOrganizerEvents,
    updateEvent,
    deleteEvent,
} from "../services/event.service.js";

export const create = async (req, res, next) => {
    try {

        const event = await createEvent(
            req.body,
            req.user
        );

        return res.status(201).json({
            success: true,
            message: "Event created successfully.",
            data: event,
        });

    } catch (error) {
        next(error);
    }
};

export const getAll = async (req, res, next) => {
    try {

        const events = await getAllEvents();

        return res.status(200).json({
            success: true,
            count: events.length,
            data: events,
        });

    } catch (error) {
        next(error);
    }
};

export const getOne = async (req, res, next) => {
    try {

        const event = await getEventById(
            req.params.id
        );

        return res.status(200).json({
            success: true,
            data: event,
        });

    } catch (error) {
        next(error);
    }
};

export const getOrganizerEventList = async (
    req,
    res,
    next
) => {
    try {

        const events = await getOrganizerEvents(
            req.user.id
        );

        return res.status(200).json({
            success: true,
            count: events.length,
            data: events,
        });

    } catch (error) {
        next(error);
    }
};

export const update = async (req, res, next) => {
    try {

        const event = await updateEvent(
            req.params.id,
            req.body,
            req.user
        );

        return res.status(200).json({
            success: true,
            message: "Event updated successfully.",
            data: event,
        });

    } catch (error) {
        next(error);
    }
};

export const remove = async (req, res, next) => {
    try {

        const result = await deleteEvent(
            req.params.id,
            req.user
        );

        return res.status(200).json({
            success: true,
            message: result.message,
        });

    } catch (error) {
        next(error);
    }
};