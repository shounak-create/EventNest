import Event from "../models/Event.models.js";
import Booking from "../models/Booking.models.js";
import Payment from "../models/Payment.models.js";

export const getOrganizerOverview = async (organizerId) => {
    const [
        eventStats,
        bookingStats,
        revenueStats,
        attendanceStats,
    ] = await Promise.all([
        Event.aggregate([
            {
                $match: {
                    organizer: organizerId,
                },
            },
            {
                $group: {
                    _id: null,
                    totalEvents: { $sum: 1 },
                    publishedEvents: {
                        $sum: {
                            $cond: [
                                { $eq: ["$status", "published"] },
                                1,
                                0,
                            ],
                        },
                    },
                    completedEvents: {
                        $sum: {
                            $cond: [
                                { $eq: ["$status", "completed"] },
                                1,
                                0,
                            ],
                        },
                    },
                    cancelledEvents: {
                        $sum: {
                            $cond: [
                                { $eq: ["$status", "cancelled"] },
                                1,
                                0,
                            ],
                        },
                    },
                },
            },
        ]),

        Booking.aggregate([
            {
                $lookup: {
                    from: "events",
                    localField: "event",
                    foreignField: "_id",
                    as: "event",
                },
            },
            {
                $unwind: "$event",
            },
            {
                $match: {
                    "event.organizer": organizerId,
                },
            },
            {
                $group: {
                    _id: null,
                    totalBookings: { $sum: 1 },
                    totalTicketsSold: { $sum: "$quantity" },
                },
            },
        ]),

        Payment.aggregate([
            {
                $lookup: {
                    from: "events",
                    localField: "event",
                    foreignField: "_id",
                    as: "event",
                },
            },
            {
                $unwind: "$event",
            },
            {
                $match: {
                    "event.organizer": organizerId,
                    status: "paid",
                },
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: "$amount" },
                    totalPayments: { $sum: 1 },
                },
            },
        ]),

        Booking.aggregate([
            {
                $lookup: {
                    from: "events",
                    localField: "event",
                    foreignField: "_id",
                    as: "event",
                },
            },
            {
                $unwind: "$event",
            },
            {
                $match: {
                    "event.organizer": organizerId,
                },
            },
            {
                $group: {
                    _id: null,
                    totalAttendees: { $sum: "$quantity" },
                    checkedInAttendees: {
                        $sum: {
                            $cond: [
                                "$checkedIn",
                                "$quantity",
                                0,
                            ],
                        },
                    },
                },
            },
        ]),
    ]);

    return {
        events: eventStats[0] || {
            totalEvents: 0,
            publishedEvents: 0,
            completedEvents: 0,
            cancelledEvents: 0,
        },

        bookings: bookingStats[0] || {
            totalBookings: 0,
            totalTicketsSold: 0,
        },

        revenue: revenueStats[0] || {
            totalRevenue: 0,
            totalPayments: 0,
        },

        attendance: attendanceStats[0] || {
            totalAttendees: 0,
            checkedInAttendees: 0,
        },
    };
};


export const getOrganizerEventsStats = async (
    organizerId
) => {
    return await Event.aggregate([
        {
            $match: {
                organizer: organizerId,
            },
        },
        {
            $lookup: {
                from: "bookings",
                localField: "_id",
                foreignField: "event",
                as: "bookings",
            },
        },
        {
            $project: {
                title: 1,
                status: 1,
                startDate: 1,
                endDate: 1,
                capacity: 1,
                remainingSeats: 1,
                price: 1,

                totalBookings: {
                    $size: "$bookings",
                },

                ticketsSold: {
                    $sum: "$bookings.quantity",
                },

                checkedInAttendees: {
                    $sum: {
                        $map: {
                            input: {
                                $filter: {
                                    input: "$bookings",
                                    as: "booking",
                                    cond: {
                                        $eq: [
                                            "$$booking.checkedIn",
                                            true,
                                        ],
                                    },
                                },
                            },
                            as: "booking",
                            in: "$$booking.quantity",
                        },
                    },
                },
            },
        },
        {
            $sort: {
                startDate: 1,
            },
        },
    ]);
};


export const getOrganizerBookingStats = async (
    organizerId
) => {
    return await Booking.aggregate([
        {
            $lookup: {
                from: "events",
                localField: "event",
                foreignField: "_id",
                as: "event",
            },
        },
        {
            $unwind: "$event",
        },
        {
            $match: {
                "event.organizer": organizerId,
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "attendee",
                foreignField: "_id",
                as: "attendee",
            },
        },
        {
            $unwind: "$attendee",
        },
        {
            $project: {
                _id: 1,
                quantity: 1,
                totalAmount: 1,
                status: 1,
                paymentStatus: 1,
                checkedIn: 1,
                createdAt: 1,

                event: {
                    _id: "$event._id",
                    title: "$event.title",
                },

                attendee: {
                    _id: "$attendee._id",
                    fullName: "$attendee.fullName",
                    email: "$attendee.email",
                },
            },
        },
        {
            $sort: {
                createdAt: -1,
            },
        },
    ]);
};


export const getOrganizerAttendanceStats = async (
    organizerId
) => {
    return await Booking.aggregate([
        {
            $lookup: {
                from: "events",
                localField: "event",
                foreignField: "_id",
                as: "event",
            },
        },
        {
            $unwind: "$event",
        },
        {
            $match: {
                "event.organizer": organizerId,
            },
        },
        {
            $group: {
                _id: "$event._id",

                eventTitle: {
                    $first: "$event.title",
                },

                totalAttendees: {
                    $sum: "$quantity",
                },

                checkedInAttendees: {
                    $sum: {
                        $cond: [
                            "$checkedIn",
                            "$quantity",
                            0,
                        ],
                    },
                },
            },
        },
        {
            $project: {
                _id: 1,
                eventTitle: 1,
                totalAttendees: 1,
                checkedInAttendees: 1,

                attendancePercentage: {
                    $cond: [
                        {
                            $gt: [
                                "$totalAttendees",
                                0,
                            ],
                        },
                        {
                            $multiply: [
                                {
                                    $divide: [
                                        "$checkedInAttendees",
                                        "$totalAttendees",
                                    ],
                                },
                                100,
                            ],
                        },
                        0,
                    ],
                },
            },
        },
        {
            $sort: {
                eventTitle: 1,
            },
        },
    ]);
};


export const getOrganizerPaymentHistory = async (
    organizerId
) => {
    return await Payment.aggregate([
        {
            $lookup: {
                from: "events",
                localField: "event",
                foreignField: "_id",
                as: "event",
            },
        },
        {
            $unwind: "$event",
        },
        {
            $match: {
                "event.organizer": organizerId,
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "attendee",
                foreignField: "_id",
                as: "attendee",
            },
        },
        {
            $unwind: "$attendee",
        },
        {
            $project: {
                _id: 1,
                amount: 1,
                quantity: 1,
                status: 1,
                razorpayOrderId: 1,
                razorpayPaymentId: 1,
                createdAt: 1,

                event: {
                    _id: "$event._id",
                    title: "$event.title",
                },

                attendee: {
                    _id: "$attendee._id",
                    fullName: "$attendee.fullName",
                    email: "$attendee.email",
                },
            },
        },
        {
            $sort: {
                createdAt: -1,
            },
        },
    ]);
};