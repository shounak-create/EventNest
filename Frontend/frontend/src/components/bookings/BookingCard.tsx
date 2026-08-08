import Link from "next/link";
import type { Booking } from "@/lib/bookings";

interface BookingCardProps {
  booking: Booking;
}

export default function BookingCard({
  booking,
}: BookingCardProps) {
  return (
    <div className="overflow-hidden rounded-xl border bg-white">
      {booking.event.banner && (
        <div className="aspect-video bg-zinc-100">
          <img
            src={booking.event.banner}
            alt={booking.event.title}
            className="h-full w-full object-cover"
          />
        </div>
      )}

      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold">
              {booking.event.title}
            </h2>

            <p className="mt-2 text-sm text-zinc-500">
              {booking.event.venue}, {booking.event.city}
            </p>

            <p className="mt-1 text-sm text-zinc-500">
              {new Date(
                booking.event.startDate
              ).toLocaleDateString()}
            </p>
          </div>

          <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium capitalize">
            {booking.status}
          </span>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-4 border-t pt-5 sm:grid-cols-3">
          <div>
            <p className="text-xs text-zinc-500">
              Tickets
            </p>
            <p className="mt-1 font-semibold">
              {booking.quantity}
            </p>
          </div>

          <div>
            <p className="text-xs text-zinc-500">
              Total
            </p>
            <p className="mt-1 font-semibold">
              ₹{booking.totalAmount}
            </p>
          </div>

          <div>
            <p className="text-xs text-zinc-500">
              Payment
            </p>
            <p className="mt-1 font-semibold capitalize">
              {booking.paymentStatus}
            </p>
          </div>
        </div>

        <div className="mt-5 flex gap-3">
          <Link
            href={`/bookings/${booking._id}`}
            className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800"
          >
            View Booking
          </Link>
        </div>
      </div>
    </div>
  );
}