import { verifyTicketToken } from "../utils/token.js";
import { findBookingById } from "../repositories/booking.repository.js";
import { generateTicketPDF } from "./pdf.service.js";

export const downloadTicket = async (token) => {

    const decoded = verifyTicketToken(token);


    const booking = await findBookingById(
        decoded.bookingId
    );


    if (!booking) {
        throw new Error("Booking not found.");
    }

    const pdf = await generateTicketPDF(
        booking
    );

    return {

        pdf,

        ticketReference:
            booking.ticketReference,

    };

};