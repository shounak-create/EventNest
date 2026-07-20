import {
  createBooking,
  findBookingById,
  findBookingsByAttendee,
  updateBooking,
  deleteBooking,
} from "../repositories/booking.repository.js";

import { findEventById } from "../repositories/event.repository.js";

export const createNewBooking = async (attendeeId, { eventId, quantity }) => {
  const event = await findEventById(eventId);

  if (!event) {
    throw new Error("Event not found.");
  }

  if (!event.isPublished) {
    throw new Error("This event is not available for booking.");
  }

  if (event.status !== "published") {
    throw new Error("Bookings are closed for this event.");
  }

  if (event.remainingSeats < quantity) {
    throw new Error("Not enough seats available.");
  }

  const totalAmount = event.price * quantity;

  return await createBooking({
    attendee: attendeeId,
    event: event._id,
    quantity,
    totalAmount,
  });
};

export const getBooking = async (bookingId) => {
  const booking = await findBookingById(bookingId);

  if (!booking) {
    throw new Error("Booking not found.");
  }

  return booking;
};

export const getMyBookings = async (attendeeId) => {
  return await findBookingsByAttendee(attendeeId);
};

export const cancelBooking = async (bookingId, attendeeId) => {
  const booking = await findBookingById(bookingId);

  if (!booking) {
    throw new Error("Booking not found.");
  }

  if (booking.attendee._id.toString() !== attendeeId) {
    throw new Error("You are not authorized to cancel this booking.");
  }

  if (booking.status === "cancelled") {
    throw new Error("Booking already cancelled.");
  }

  return await updateBooking(bookingId, {
    status: "cancelled",
  });
};

//admin
export const removeBooking = async (bookingId) => {
  const booking = await findBookingById(bookingId);

  if (!booking) {
    throw new Error("Booking not found.");
  }

  return await deleteBooking(bookingId);
};
