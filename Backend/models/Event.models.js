import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true,
            minlength: 3,
            maxlength: 100,
        },

        description: {
            type: String,
            required: [true, "Description is required"],
            trim: true,
            maxlength: 5000,
        },

        category: {
            type: String,
            required: [true, "Category is required"],
            enum: [
                "Music",
                "Sports",
                "Technology",
                "Business",
                "Education",
                "Food",
                "Comedy",
                "Workshop",
                "Festival",
                "Other",
            ],
        },

        banner: {
            type: String,
            default: "",
        },

        venue: {
            type: String,
            required: [true, "Venue is required"],
        },

        city: {
            type: String,
            required: true,
        },

        state: {
            type: String,
            required: true,
        },

        country: {
            type: String,
            required: true,
        },

        startDate: {
            type: Date,
            required: true,
        },

        endDate: {
            type: Date,
            required: true,
        },

        price: {
            type: Number,
            default: 0,
            min: 0,
        },

        capacity: {
            type: Number,
            required: true,
            min: 1,
        },

        remainingSeats: {
            type: Number,
            required: true,
        },

        organizer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        status: {
            type: String,
            enum: [
                "draft",
                "published",
                "cancelled",
                "completed",
            ],
            default: "draft",
        },

        isPublished: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const Event = mongoose.model("Event", eventSchema);

export default Event;