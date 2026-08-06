import Payment from "../models/Payment.models.js";

export const createPayment = async (paymentData) => {
    return await Payment.create(paymentData);
};

export const findPaymentByOrderId = async (razorpayOrderId) => {
    return await Payment.findOne({
        razorpayOrderId,
    })
        .populate("event")
        .populate("attendee");
};

export const updatePayment = async (
    paymentId,
    updateData
) => {
    return await Payment.findByIdAndUpdate(
        paymentId,
        updateData,
        {
            returnDocument: "after",
            runValidators: true,
        }
    );
};