import {
    findBookingByTicketReference,
    checkInBooking,
} from "../repositories/booking.repository.js";

export const validateTicket = async (
    ticketReference,
    user
) => {

    const booking =
        await findBookingByTicketReference(
            ticketReference
        );

    if (!booking) {
        throw new Error(
            "Invalid ticket."
        );
    }

    if (
        booking.status === "cancelled"
    ) {
        throw new Error(
            "This booking has been cancelled."
        );
    }

    if (
        booking.checkedIn
    ) {
        throw new Error(
            "Attendee has already checked in."
        );
    }

    if (
        user.role !== "admin" &&
        booking.event.organizer.toString() !==
        user.id
    ) {
        throw new Error(
            "You are not authorized to check in attendees for this event."
        );
    }

    return await checkInBooking(
        booking._id
    );

};