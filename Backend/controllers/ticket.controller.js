
import {
    createTicketToken,
    downloadTicket,
} from "../services/ticket.service.js";


export const getTicketToken = async (
    req,
    res,
    next
) => {

    try {

        const token =
            await createTicketToken(
                req.params.bookingId,
                req.user.id
            );

        return res.status(200).json({

            success: true,

            data: {
                token,
            },

        });

    } catch (error) {

        next(error);

    }
};


export const downloadBookingTicket = async (
    req,
    res,
    next
) => {

    try {

        const { token } =
            req.query;

        const {
            pdf,
            ticketReference,
        } = await downloadTicket(token);

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

