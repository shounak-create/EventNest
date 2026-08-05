import { sendEmail } from "../utils/mail.js";
import { bookingConfirmationTemplate } from "../templates/bookingComformation.template.js";
import { generateTicketToken } from "../utils/token.js";

export const sendBookingConfirmation = async (booking) => {

    const ticketToken = generateTicketToken(
        booking._id.toString()
    );

    const downloadLink =
        `${process.env.BACKEND_URL}/api/tickets/download?token=${ticketToken}`;

    const html = bookingConfirmationTemplate({

        fullName: booking.attendee.fullName,

        eventTitle: booking.event.title,

        venue: booking.event.venue,

        eventDate: booking.event.startDate,

        quantity: booking.quantity,

        ticketReference: booking.ticketReference,

        downloadLink,

    });

    await sendEmail({

        to: booking.attendee.email,

        subject: `🎟 Booking Confirmed - ${booking.event.title}`,

        html,

    });


};