
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import {
  getMyBookings,
  Booking,
} from "@/lib/bookings";

import {
  getTicketToken,
  downloadTicket,
} from "@/lib/tickets";

export default function TicketPage() {
  const params = useParams();

  const bookingId = params.id as string;

  const [booking, setBooking] =
    useState<Booking | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [downloading, setDownloading] =
    useState(false);

  useEffect(() => {
    const loadBooking = async () => {
      try {
        const bookings =
          await getMyBookings();

        const foundBooking =
          bookings.find(
            (booking) =>
              booking._id === bookingId
          );

        setBooking(
          foundBooking || null
        );

      } catch (error) {
        console.error(
          "Failed to load booking:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadBooking();
  }, [bookingId]);

  const handleDownload = async () => {
    if (!booking) return;

    try {
      setDownloading(true);

      const token =
        await getTicketToken(
          booking._id
        );

      const pdf =
        await downloadTicket(token);

      const url =
        window.URL.createObjectURL(pdf);

      const link =
        document.createElement("a");

      link.href = url;

      link.download =
        `${booking.ticketReference}.pdf`;

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error(
        "Failed to download ticket:",
        error
      );
    } finally {
      setDownloading(false);
    }
  };

  if (loading) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-16">
        <p className="text-zinc-500">
          Loading ticket...
        </p>
      </main>
    );
  }

  if (!booking) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-16">
        <div className="rounded-xl border border-dashed p-12 text-center">
          <h1 className="text-xl font-semibold">
            Ticket not found
          </h1>

          <p className="mt-2 text-zinc-500">
            We couldn't find this booking.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">

      <div className="mb-8">
        <p className="text-sm font-medium text-zinc-500">
          EventNest Ticket
        </p>

        <h1 className="mt-2 text-3xl font-bold">
          {booking.event.title}
        </h1>
      </div>

      <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">

        <div className="border-b bg-zinc-50 p-8">
          <p className="text-sm font-medium text-zinc-500">
            Ticket Reference
          </p>

          <p className="mt-1 text-xl font-bold">
            {booking.ticketReference}
          </p>
        </div>

        <div className="grid gap-8 p-8 sm:grid-cols-2">

          <div>
            <p className="text-sm text-zinc-500">
              Event
            </p>

            <p className="mt-1 font-semibold">
              {booking.event.title}
            </p>
          </div>

          <div>
            <p className="text-sm text-zinc-500">
              Date
            </p>

            <p className="mt-1 font-semibold">
              {new Date(
                booking.event.startDate
              ).toLocaleDateString()}
            </p>
          </div>

          <div>
            <p className="text-sm text-zinc-500">
              Venue
            </p>

            <p className="mt-1 font-semibold">
              {booking.event.venue}
            </p>
          </div>

          <div>
            <p className="text-sm text-zinc-500">
              Location
            </p>

            <p className="mt-1 font-semibold">
              {booking.event.city},{" "}
              {booking.event.state}
            </p>
          </div>

          <div>
            <p className="text-sm text-zinc-500">
              Tickets
            </p>

            <p className="mt-1 font-semibold">
              {booking.quantity}
            </p>
          </div>

          <div>
            <p className="text-sm text-zinc-500">
              Total Paid
            </p>

            <p className="mt-1 font-semibold">
              ₹{booking.totalAmount}
            </p>
          </div>

          <div>
            <p className="text-sm text-zinc-500">
              Booking Status
            </p>

            <p className="mt-1 font-semibold capitalize">
              {booking.status}
            </p>
          </div>

          <div>
            <p className="text-sm text-zinc-500">
              Payment Status
            </p>

            <p className="mt-1 font-semibold capitalize">
              {booking.paymentStatus}
            </p>
          </div>

        </div>

        <div className="border-t p-8">

          <button
            onClick={handleDownload}
            disabled={downloading}
            className="w-full rounded-lg bg-zinc-900 px-5 py-3 font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {downloading
              ? "Generating Ticket..."
              : "Download Ticket"}
          </button>

        </div>

      </div>

    </main>
  );
}

