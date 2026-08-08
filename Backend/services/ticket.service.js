
import {
    verifyTicketToken,
    generateTicketToken,
} from "../utils/token.js";

import {
    findBookingById,
} from "../repositories/booking.repository.js";

import {
    generateTicketPDF,
} from "./pdf.service.js";


export const createTicketToken = async (
    bookingId,
    userId
) => {

    const booking = await findBookingById(
        bookingId
    );

    if (!booking) {
        throw new Error("Booking not found.");
    }

    if (
        booking.attendee._id.toString() !==
        userId.toString()
    ) {
        throw new Error(
            "You are not authorized to access this ticket."
        );
    }

    return generateTicketToken({
        bookingId: booking._id.toString(),
    });
};


export const downloadTicket = async (token) => {

    const decoded =
        verifyTicketToken(token);

    const booking =
        await findBookingById(
            decoded.bookingId
        );

    if (!booking) {
        throw new Error(
            "Booking not found."
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
