import { getAllEvents } from "@/lib/events";
import EventCard from "@/components/events/EventCard";

export default async function EventsPage() {
    const events = await getAllEvents();

    return (
        <main className="mx-auto max-w-7xl px-6 py-12">
            <div className="mb-10">
                <h1 className="text-4xl font-bold tracking-tight">
                    Discover Events
                </h1>

                <p className="mt-2 text-zinc-600">
                    Find events happening around you.
                </p>
            </div>

            {events.length === 0 ? (
                <div className="rounded-xl border border-dashed p-12 text-center">
                    <h2 className="text-xl font-semibold">
                        No events found
                    </h2>

                    <p className="mt-2 text-zinc-500">
                        Check back later for upcoming events.
                    </p>
                </div>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {events.map((event) => (
                        <EventCard
                            key={event._id}
                            event={event}
                        />
                    ))}
                </div>
            )}
        </main>
    );
}