import {
    getDashboardOverview,
    getDashboardEvents,
    getDashboardBookings,
    getDashboardAttendance,
    getDashboardPayments,
} from "../services/organizerDashboard.service.js";


export const overview = async (
    req,
    res,
    next
) => {
    try {
        const data =
            await getDashboardOverview(
                req.user.id
            );

        res.status(200).json({
            success: true,
            data,
        });
    } catch (error) {
        next(error);
    }
};


export const events = async (
    req,
    res,
    next
) => {
    try {
        const data =
            await getDashboardEvents(
                req.user.id
            );

        res.status(200).json({
            success: true,
            data,
        });
    } catch (error) {
        next(error);
    }
};


export const bookings = async (
    req,
    res,
    next
) => {
    try {
        const data =
            await getDashboardBookings(
                req.user.id
            );

        res.status(200).json({
            success: true,
            data,
        });
    } catch (error) {
        next(error);
    }
};


export const attendance = async (
    req,
    res,
    next
) => {
    try {
        const data =
            await getDashboardAttendance(
                req.user.id
            );

        res.status(200).json({
            success: true,
            data,
        });
    } catch (error) {
        next(error);
    }
};


export const payments = async (
    req,
    res,
    next
) => {
    try {
        const data =
            await getDashboardPayments(
                req.user.id
            );

        res.status(200).json({
            success: true,
            data,
        });
    } catch (error) {
        next(error);
    }
};