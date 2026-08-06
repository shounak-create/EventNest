import {
    createOrder,
    verifyPayment,
} from "../services/payment.services.js";

export const create = async (
    req,
    res,
    next
) => {

    try {

        const {

            eventId,

            quantity,

        } = req.body;

        const data =
            await createOrder(

                req.user.id,

                eventId,

                quantity

            );

        return res.status(200).json({

            success: true,

            message:
                "Order created successfully.",

            data,

        });

    } catch (error) {

        next(error);

    }

};

export const verify = async (
    req,
    res,
    next
) => {

    try {

        const booking =
            await verifyPayment(
                req.body
            );

        return res.status(200).json({

            success: true,

            message:
                "Payment verified successfully.",

            data: booking,

        });

    } catch (error) {

        next(error);

    }

};