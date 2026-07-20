import { sendEmail } from "../utils/mail.js";
import { bookingConfirmationTemplate } from "../templates/bookingComformation.template.js";

export const sendBookingConfirmation = async (booking) => {

        console.log("📧 Email Service Started");


    const html = bookingConfirmationTemplate({

        fullName: booking.attendee.fullName,

        eventTitle: booking.event.title,

        venue: booking.event.venue,

        eventDate: booking.event.startDate,

        quantity: booking.quantity,

        ticketReference: booking.ticketReference,

        qrCode: booking.qrCode,

    });

    await sendEmail({

        to: booking.attendee.email,

        subject: `🎟 Booking Confirmed - ${booking.event.title}`,

        html,

    });

        console.log("✅ Email Sent");


};