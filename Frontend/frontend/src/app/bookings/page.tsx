"use client";

import { useEffect, useState } from "react";
import { getMyBookings, Booking } from "@/lib/bookings";
import BookingCard from "@/components/bookings/BookingCard";

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
            <BookingCard
              key={booking._id}
              booking={booking}
            />
          ))}
        </div>
      )}
    </main>
  );
}

