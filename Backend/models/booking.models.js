import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
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

        totalAmount: {
            type: Number,
            required: true,
        },

        status: {
            type: String,
            enum: [
                "pending",
                "confirmed",
                "cancelled",
                "refunded",
            ],
            default: "pending",
        },

        paymentStatus: {
            type: String,
            enum: [
                "pending",
                "paid",
                "failed",
                "refunded",
            ],
            default: "pending",
        },

        paymentIntentId: {
            type: String,
            default: "",
        },

        qrCode: {
            type: String,
            default: "",
        },

        checkedIn: {
            type: Boolean,
            default: false,
        },

        checkedInAt: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

const Booking = mongoose.model(
    "Booking",
    bookingSchema
);

export default Booking;