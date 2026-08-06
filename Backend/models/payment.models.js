import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
    {
        attendee: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        event: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Event",
            required: true,
        },

        quantity: {
            type: Number,
            required: true,
            min: 1,
        },

        amount: {
            type: Number,
            required: true,
        },

        razorpayOrderId: {
            type: String,
            required: true,
            unique: true,
        },

        razorpayPaymentId: {
            type: String,
            default: "",
        },

        status: {
            type: String,
            enum: [
                "created",
                "paid",
                "failed",
                "refunded",
            ],
            default: "created",
        },
    },
    {
        timestamps: true,
    }
);

const Payment = mongoose.model(
    "Payment",
    paymentSchema
);

export default Payment;