import { findBookingById } from "../repositories/booking.repository.js";

import { generateTicketPDF } from "./pdf.service.js";

export const downloadTicket = async (
    bookingId,
    user
) => {

    const booking =
        await findBookingById(
            bookingId
        );

    if (!booking) {
        throw new Error("Booking not found.");
    }

    if (
        user.role === "attendee" &&
        booking.attendee._id.toString() !== user.id
    ) {
        throw new Error(
            "You are not authorized."
        );
    }

    if (
        user.role === "organizer" &&
        booking.event.organizer.toString() !==
            user.id
    ) {
        throw new Error(
            "You are not authorized."
        );
    }

    const pdf =
        await generateTicketPDF(
            booking
        );

    return {
        pdf,
        ticketReference:
            booking.ticketReference,
    };
};