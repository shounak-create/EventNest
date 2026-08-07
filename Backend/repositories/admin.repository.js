import User from "../models/User.models.js";
import Event from "../models/Event.models.js";
import Booking from "../models/Booking.models.js";
import Payment from "../models/Payment.models.js";

/*
|--------------------------------------------------------------------------
| Users
|--------------------------------------------------------------------------
*/

export const findAllUsers = async () => {
    return await User.find()
        .select("-password -refreshToken")
        .sort({ createdAt: -1 });
};

export const findUserById = async (userId) => {
    return await User.findById(userId)
        .select("-password -refreshToken");
};

export const updateUserStatus = async (
    userId,
    isActive
) => {
    return await User.findByIdAndUpdate(
        userId,
        {
            isActive,
        },
        {
            new: true,
            runValidators: true,
        }
    ).select("-password -refreshToken");
};

/*
|--------------------------------------------------------------------------
| Events
|--------------------------------------------------------------------------
*/

export const findAllAdminEvents = async () => {
    return await Event.find()
        .populate(
            "organizer",
            "fullName email avatar"
        )
        .sort({ createdAt: -1 });
};

export const findAdminEventById = async (eventId) => {
    return await Event.findById(eventId)
        .populate(
            "organizer",
            "fullName email avatar"
        );
};

export const updateEventStatus = async (
    eventId,
    status,
    isPublished
) => {
    return await Event.findByIdAndUpdate(
        eventId,
        {
            status,
            isPublished,
        },
        {
            new: true,
            runValidators: true,
        }
    ).populate(
        "organizer",
        "fullName email avatar"
    );
};

export const deleteAdminEvent = async (eventId) => {
    return await Event.findByIdAndDelete(eventId);
};

/*
|--------------------------------------------------------------------------
| Platform Statistics
|--------------------------------------------------------------------------
*/

export const getPlatformStats = async () => {
    const [
        totalUsers,
        totalOrganizers,
        totalAttendees,
        totalEvents,
        publishedEvents,
        completedEvents,
        cancelledEvents,
        totalBookings,
        confirmedBookings,
        checkedInBookings,
        revenueResult,
        totalPayments,
        paidPayments,
    ] = await Promise.all([
        User.countDocuments(),

        User.countDocuments({
            role: "organizer",
        }),

        User.countDocuments({
            role: "attendee",
        }),

        Event.countDocuments(),

        Event.countDocuments({
            status: "published",
        }),

        Event.countDocuments({
            status: "completed",
        }),

        Event.countDocuments({
            status: "cancelled",
        }),

        Booking.countDocuments(),

        Booking.countDocuments({
            status: "confirmed",
        }),

        Booking.countDocuments({
            checkedIn: true,
        }),

        Payment.aggregate([
            {
                $match: {
                    status: "paid",
                },
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: {
                        $sum: "$amount",
                    },
                },
            },
        ]),

        Payment.countDocuments(),

        Payment.countDocuments({
            status: "paid",
        }),
    ]);

    return {
        users: {
            totalUsers,
            totalOrganizers,
            totalAttendees,
        },

        events: {
            totalEvents,
            publishedEvents,
            completedEvents,
            cancelledEvents,
        },

        bookings: {
            totalBookings,
            confirmedBookings,
            checkedInBookings,
        },

        revenue: {
            totalRevenue:
                revenueResult[0]?.totalRevenue || 0,
            totalPayments,
            paidPayments,
        },
    };
};

