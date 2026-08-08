import Link from "next/link";

interface EventCardProps {
  event: {
    _id: string;
    title: string;
    description: string;
    category: string;
    banner?: string;
    venue: string;
    city: string;
    state: string;
    startDate: string;
    price: number;
    remainingSeats: number;
  };
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <article className="overflow-hidden rounded-2xl border border-zinc-200 bg-white transition hover:-translate-y-1 hover:shadow-lg">
      {/* Event Banner */}
      <div className="relative h-52 bg-zinc-100">
        {event.banner ? (
          <img
            src={event.banner}
            alt={event.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-zinc-400">
            No image available
          </div>
        )}

        <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-semibold text-zinc-800 shadow">
          {event.category}
        </span>
      </div>

      {/* Event Information */}
      <div className="p-5">
        <h2 className="line-clamp-1 text-xl font-semibold text-zinc-900">
          {event.title}
        </h2>

        <p className="mt-2 line-clamp-2 text-sm leading-6 text-zinc-500">
          {event.description}
        </p>

        <div className="mt-4 space-y-2 text-sm text-zinc-600">
          <p>
            📍 {event.venue}, {event.city}
          </p>

          <p>
            📅{" "}
            {new Date(event.startDate).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>

        {/* Price + Availability */}
        <div className="mt-5 flex items-center justify-between">
          <div>
            <p className="text-lg font-bold text-zinc-900">
              {event.price === 0 ? "Free" : `₹${event.price}`}
            </p>

            <p className="text-xs text-zinc-500">
              {event.remainingSeats} seats left
            </p>
          </div>

          <Link
            href={`/events/${event._id}`}
            className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800"
          >
            View Event
          </Link>
        </div>
      </div>
    </article>
  );
}