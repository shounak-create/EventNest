import {
    createNewBooking,
    getBooking,
    getMyBookings,
    cancelBooking,
    removeBooking,
} from "../services/booking.service.js";

export const create = async (req, res, next) => {
    try {

        const booking = await createNewBooking(
            req.user.id,
            req.body
        );

        return res.status(201).json({
            success: true,
            message: "Booking created successfully.",
            data: booking,
        });

    } catch (error) {
        next(error);
    }
};

export const getOne = async (req, res, next) => {
    try {

        const booking = await getBooking(
            req.params.id
        );

        return res.status(200).json({
            success: true,
            data: booking,
        });

    } catch (error) {
        next(error);
    }
};

export const getMyBookingList = async (
    req,
    res,
    next
) => {
    try {

        const bookings = await getMyBookings(
            req.user.id
        );

        return res.status(200).json({
            success: true,
            count: bookings.length,
            data: bookings,
        });

    } catch (error) {
        next(error);
    }
};

export const cancel = async (
    req,
    res,
    next
) => {
    try {

        const booking = await cancelBooking(
            req.params.id,
            req.user.id
        );

        return res.status(200).json({
            success: true,
            message: "Booking cancelled successfully.",
            data: booking,
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

        await removeBooking(req.params.id);

        return res.status(200).json({
            success: true,
            message: "Booking deleted successfully.",
        });

    } catch (error) {
        next(error);
    }
};