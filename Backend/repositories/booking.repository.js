import Booking from "../models/Booking.models.js";

export const createBooking = async (
    bookingData,
    session = null
) => {

    const booking =
        new Booking(bookingData);

    return await booking.save({
        session,
    });

};

export const findBookingById = async (
    bookingId
) => {

    return await Booking.findById(
        bookingId
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

export const findBookingsByAttendee = async (
    attendeeId
) => {

    return await Booking.find({

        attendee: attendeeId,

    })

        .populate("event")

        .sort({

            createdAt: -1,

        });

};

export const updateBooking = async (

    bookingId,

    updateData,

    session = null

) => {

    return await Booking.findByIdAndUpdate(

        bookingId,

        updateData,

        {

            new: true,

            runValidators: true,

            session,

        }

    );

};

export const deleteBooking = async (
    bookingId,
    session = null
) => {

    return await Booking.findByIdAndDelete(
        bookingId,
        {
            session,
        }
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
    bookingId,
    session = null
) => {

    return await Booking.findByIdAndUpdate(

        bookingId,

        {

            checkedIn: true,

            checkedInAt: new Date(),

        },

        {
    new: true,
    session,
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