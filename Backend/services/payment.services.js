import crypto from "crypto";

import razorpay from "../configs/razorpay.js";

import { findEventById } from "../repositories/event.repository.js";
import {
  createPayment,
  findPaymentByOrderId,
  updatePayment,
} from "../repositories/payment.repository.js";

import { createNewBooking } from "./booking.service.js";
import mongoose from "mongoose";

import { decreaseRemainingSeats } from "../repositories/event.repository.js";
import { findBookingById } from "../repositories/booking.repository.js";
import { sendBookingConfirmation } from "./email.service.js";

//redis
import { lockSeats,getSeatLock,releaseSeatLock } from "./redis.service.js";

export const createOrder = async (attendeeId, eventId, quantity) => {
  const event = await findEventById(eventId);

  if (!event) {
    throw new Error("Event not found.");
  }

  if (!event.isPublished) {
    throw new Error("This event is not available.");
  }

  if (event.status !== "published") {
    throw new Error("Bookings are closed.");
  }

  if (event.remainingSeats < quantity) {
    throw new Error("Not enough seats available.");
  }

  //seat look redis
  await lockSeats(
    event._id.toString(),
    attendeeId,
    quantity
);

  const amount = event.price * quantity;

  const order = await razorpay.orders.create({
    amount: amount * 100,

    currency: "INR",

    receipt: `receipt_${Date.now()}`,
  });

  await createPayment({
    attendee: attendeeId,

    event: event._id,

    quantity,

    amount,

    razorpayOrderId: order.id,
  });

  return {
    orderId: order.id,

    amount: order.amount,

    currency: order.currency,

    key: process.env.RAZORPAY_KEY_ID,
  };
};

export const verifyPayment = async ({
  razorpay_order_id,

  razorpay_payment_id,

  razorpay_signature,
}) => {
  const generatedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (generatedSignature !== razorpay_signature) {
    throw new Error("Invalid payment signature.");
  }

  const payment = await findPaymentByOrderId(razorpay_order_id);

  const seatLock =
    await getSeatLock(
        payment.event._id.toString(),
        payment.attendee._id.toString()
    );

if (!seatLock) {
    throw new Error(
        "Seat reservation has expired."
    );
}

  if (!payment) {
    throw new Error("Payment not found.");
  }

  if (payment.status === "paid") {
    throw new Error("Payment already verified.");
  }

  const session = await mongoose.startSession();

  let booking;

  try {
    session.startTransaction();

    await updatePayment(
      payment._id,

      {
        status: "paid",

        razorpayPaymentId: razorpay_payment_id,
      },

      session,
    );

    booking = await createNewBooking(
      payment.attendee._id.toString(),

      {
        eventId: payment.event._id.toString(),

        quantity: payment.quantity,
      },

      session,
    );

    await releaseSeatLock(payment.event._id.toString(),payment.attendee._id.toString());

    await decreaseRemainingSeats(
      payment.event._id,

      payment.quantity,

      session,
    );

    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();

    throw error;
  } finally {
    session.endSession();
  }

  const populatedBooking = await findBookingById(booking._id);

  await sendBookingConfirmation(populatedBooking);

  return populatedBooking;
};
