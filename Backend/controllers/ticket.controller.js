import { downloadTicket } from "../services/ticket.service.js";

export const downloadBookingTicket = async (req, res, next) => {

    try {

        const { pdf, ticketReference } =
            await downloadTicket(
                req.params.bookingId,
                req.user
            );

        res.setHeader(
            "Content-Type",
            "application/pdf"
        );

        res.setHeader(
            "Content-Disposition",
            `inline; filename=${ticketReference}.pdf`
        );

        return res.send(pdf);

    } catch (error) {
        next(error);
    }

};