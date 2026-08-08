
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getMyBookings, type Booking } from "@/lib/bookings";

export default function BookingDetailsPage() {
  const params = useParams();
  const bookingId = params.id as string;

  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBooking = async () => {
      try {
        const data = await getMyBookings(bookingId);
        setBooking(data);
      } catch (error) {
        console.error("Failed to load booking:", error);
      } finally {
        setLoading(false);
      }
    };

    loadBooking();
  }, [bookingId]);

  if (loading) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-12">
        <p>Loading booking...</p>
      </main>
    );
  }

  if (!booking) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-12">
        <div className="rounded-xl border border-dashed p-12 text-center">
          <h1 className="text-xl font-semibold">
            Booking not found
          </h1>

          <p className="mt-2 text-zinc-500">
            We couldn't find this booking.
          </p>

          <Link
            href="/bookings"
            className="mt-6 inline-block rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white"
          >
            Back to Bookings
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <Link
        href="/bookings"
        className="text-sm font-medium text-zinc-600 hover:text-zinc-900"
      >
        ← Back to bookings
      </Link>

      <div className="mt-8 overflow-hidden rounded-2xl border bg-white">
        {booking.event.banner && (
          <div className="aspect-video bg-zinc-100">
            <img
              src={booking.event.banner}
              alt={booking.event.title}
              className="h-full w-full object-cover"
            />
          </div>
        )}

        <div className="p-6 sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-medium text-zinc-500">
                Booking Details
              </p>

              <h1 className="mt-1 text-3xl font-bold">
                {booking.event.title}
              </h1>
            </div>

            <span className="w-fit rounded-full bg-zinc-100 px-3 py-1 text-sm font-medium capitalize">
              {booking.status}
            </span>
          </div>

          <div className="mt-8 grid gap-6 border-t pt-6 sm:grid-cols-2">
            <div>
              <p className="text-sm text-zinc-500">
                Venue
              </p>

              <p className="mt-1 font-medium">
                {booking.event.venue}
              </p>
            </div>

            <div>
              <p className="text-sm text-zinc-500">
                Location
              </p>

              <p className="mt-1 font-medium">
                {booking.event.city},{" "}
                {booking.event.state}
              </p>
            </div>

            <div>
              <p className="text-sm text-zinc-500">
                Date
              </p>

              <p className="mt-1 font-medium">
                {new Date(
                  booking.event.startDate
                ).toLocaleDateString()}
              </p>
            </div>

            <div>
              <p className="text-sm text-zinc-500">
                Tickets
              </p>

              <p className="mt-1 font-medium">
                {booking.quantity}
              </p>
            </div>

            <div>
              <p className="text-sm text-zinc-500">
                Total Amount
              </p>

              <p className="mt-1 font-medium">
                ₹{booking.totalAmount}
              </p>
            </div>

            <div>
              <p className="text-sm text-zinc-500">
                Payment Status
              </p>

              <p className="mt-1 font-medium capitalize">
                {booking.paymentStatus}
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-xl bg-zinc-50 p-5">
            <p className="text-sm text-zinc-500">
              Ticket Reference
            </p>

            <p className="mt-1 font-mono font-semibold">
              {booking.ticketReference}
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={`/tickets/${booking._id}`}
              className="rounded-lg bg-zinc-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-800"
            >
              View Ticket
            </Link>

            <Link
              href="/bookings"
              className="rounded-lg border px-5 py-3 text-sm font-medium transition hover:bg-zinc-50"
            >
              Back to Bookings
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

