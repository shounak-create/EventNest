"use client";

import { useEffect, useState } from "react";
import { getMyBookings, Booking } from "@/lib/bookings";

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const data = await getMyBookings();
        setBookings(data);
      } catch (error) {
        console.error("Failed to load bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    loadBookings();
  }, []);

  if (loading) {
    return (
      <main className="mx-auto max-w-7xl px-6 py-12">
        <p>Loading bookings...</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight">
          My Bookings
        </h1>

        <p className="mt-2 text-zinc-600">
          View and manage your event bookings.
        </p>
      </div>

      {bookings.length === 0 ? (
        <div className="rounded-xl border border-dashed p-12 text-center">
          <h2 className="text-xl font-semibold">
            No bookings yet
          </h2>

          <p className="mt-2 text-zinc-500">
            Your booked events will appear here.
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="rounded-xl border bg-white p-6"
            >
              <h2 className="text-2xl font-semibold">
                {booking.event.title}
              </h2>

              <p className="mt-2 text-zinc-600">
                {booking.event.venue}, {booking.event.city}
              </p>

              <p className="mt-1 text-zinc-600">
                {new Date(
                  booking.event.startDate
                ).toLocaleDateString()}
              </p>

              <div className="mt-5 flex gap-6">
                <div>
                  <p className="text-sm text-zinc-500">
                    Tickets
                  </p>
                  <p className="font-semibold">
                    {booking.quantity}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-zinc-500">
                    Total
                  </p>
                  <p className="font-semibold">
                    ₹{booking.totalAmount}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-zinc-500">
                    Status
                  </p>
                  <p className="font-semibold">
                    {booking.status}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}