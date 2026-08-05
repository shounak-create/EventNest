import { validateTicket } from "../services/checkin.service.js";

export const checkIn = async (req, res, next) => {
    try {

        const booking = await validateTicket(
            req.body.ticketReference,
            req.user
        );

        return res.status(200).json({
            success: true,
            message: "Check-in successful.",
            data: booking,
        });

    } catch (error) {
        next(error);
    }
};