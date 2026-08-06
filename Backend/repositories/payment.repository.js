import Payment from "../models/Payment.models.js";

export const createPayment = async (
    paymentData,
    session = null
) => {

    const payment = new Payment(paymentData);

    return await payment.save({
        session,
    });

};

export const findPaymentByOrderId = async (
    razorpayOrderId
) => {

    return await Payment.findOne({
        razorpayOrderId,
    })
        .populate("event")
        .populate("attendee");

};

export const updatePayment = async (
    paymentId,
    updateData,
    session = null
) => {

    return await Payment.findByIdAndUpdate(

        paymentId,

        updateData,

        {

            new: true,

            runValidators: true,

            session,

        }

    );

};

export const markPaymentFailed = async (
    paymentId,
    session = null
) => {

    return await Payment.findByIdAndUpdate(

        paymentId,

        {
            status: "failed",
        },

        {
            new: true,
            runValidators: true,
            session,
        }

    );

};