import {
    getOrganizerOverview,
    getOrganizerEventsStats,
    getOrganizerBookingStats,
    getOrganizerAttendanceStats,
    getOrganizerPaymentHistory,
} from "../repositories/organizerDashboard.repository.js";


export const getDashboardOverview = async (
    organizerId
) => {
    return await getOrganizerOverview(
        organizerId
    );
};


export const getDashboardEvents = async (
    organizerId
) => {
    return await getOrganizerEventsStats(
        organizerId
    );
};


export const getDashboardBookings = async (
    organizerId
) => {
    return await getOrganizerBookingStats(
        organizerId
    );
};


export const getDashboardAttendance = async (
    organizerId
) => {
    return await getOrganizerAttendanceStats(
        organizerId
    );
};


export const getDashboardPayments = async (
    organizerId
) => {
    return await getOrganizerPaymentHistory(
        organizerId
    );
};