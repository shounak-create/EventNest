import { getEventById } from "@/lib/events";
import Link from "next/link";

interface EventDetailsPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function EventDetailsPage({
    params,
}: EventDetailsPageProps) {
    const { id } = await params;

    const event = await getEventById(id);

    return (
        <main className="mx-auto max-w-6xl px-6 py-12">
            <div className="overflow-hidden rounded-2xl border bg-white">
                {/* Event Banner */}
                <div className="aspect-[2/1] bg-zinc-100">
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
                </div>

                {/* Event Details */}
                <div className="p-8">
                    <div className="flex flex-col gap-8 md:flex-row md:justify-between">
                        <div className="max-w-3xl">
                            <p className="text-sm font-semibold text-zinc-500">
                                {event.category}
                            </p>

                            <h1 className="mt-2 text-4xl font-bold tracking-tight">
                                {event.title}
                            </h1>

                            <p className="mt-6 leading-7 text-zinc-600">
                                {event.description}
                            </p>

                            <div className="mt-8 space-y-3 text-zinc-600">
                                <p>
                                    📍 {event.venue}, {event.city},{" "}
                                    {event.state}, {event.country}
                                </p>

                                <p>
                                    📅{" "}
                                    {new Date(
                                        event.startDate
                                    ).toLocaleDateString("en-IN", {
                                        weekday: "long",
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                    })}
                                </p>

                                <p>
                                    🕐{" "}
                                    {new Date(
                                        event.startDate
                                    ).toLocaleTimeString("en-IN", {
                                        hour: "numeric",
                                        minute: "2-digit",
                                    })}
                                </p>
                            </div>
                        </div>

                        {/* Booking Card */}
                        <div className="h-fit w-full rounded-xl border p-6 md:w-80">
                            <p className="text-sm text-zinc-500">
                                Ticket Price
                            </p>

                            <p className="mt-1 text-3xl font-bold">
                                {event.price === 0
                                    ? "Free"
                                    : `₹${event.price}`}
                            </p>

                            <p className="mt-2 text-sm text-zinc-500">
                                {event.remainingSeats} seats remaining
                            </p>

                            <Link
                                href={`/events/${event._id}/book`}
                                className="mt-6 block w-full rounded-lg bg-zinc-900 px-4 py-3 text-center font-medium text-white transition hover:bg-zinc-800"
                            >
                                Book Now
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}