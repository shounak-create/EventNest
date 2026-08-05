import Booking from "../models/Booking.models.js";

export const createBooking = async (bookingData) => {
    return await Booking.create(bookingData);
};

export const findBookingById = async (bookingId) => {
    return await Booking.findById(bookingId)
        .populate(
            "event",
            "title venue startDate organizer"
        )
        .populate(
            "attendee",
            "fullName email avatar"
        );
};

export const findBookingsByAttendee = async (attendeeId) => {
    return await Booking.find({
        attendee: attendeeId,
    })
        .populate("event")
        .sort({ createdAt: -1 });
};

export const updateBooking = async (
    bookingId,
    updateData
) => {
    return await Booking.findByIdAndUpdate(
        bookingId,
        updateData,
        {
            returnDocument: "after",
            runValidators: true,
        }
    );
};

export const deleteBooking = async (bookingId) => {
    return await Booking.findByIdAndDelete(
        bookingId
    );
};

export const findBookingByTicketReference = async (
    ticketReference
) => {
    return await Booking.findOne({
        ticketReference,
    })
        .populate(
            "event",
            "title venue startDate organizer"
        )
        .populate(
            "attendee",
            "fullName email avatar"
        );
};

export const checkInBooking = async (
    bookingId
) => {
    return await Booking.findByIdAndUpdate(
        bookingId,
        {
            checkedIn: true,
            checkedInAt: new Date(),
        },
        {
            returnDocument: "after",
        }
    )
        .populate(
            "event",
            "title venue startDate organizer"
        )
        .populate(
            "attendee",
            "fullName email avatar"
        );
};