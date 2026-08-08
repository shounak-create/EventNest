"use client";

import { useState } from "react";
import Script from "next/script";
import { useRouter } from "next/navigation";

import { createPaymentOrder, verifyPayment } from "@/lib/payment";
import { getEventById } from "@/lib/events";

interface Event {
_id: string;
title: string;
banner?: string;
category: string;
venue: string;
city: string;
state: string;
country: string;
startDate: string;
price: number;
remainingSeats: number;
}

interface BookPageProps {
params: Promise<{
id: string;
}>;
}

declare global {
interface Window {
Razorpay: any;
}
}

export default function BookPage({
params,
}: BookPageProps) {
const router = useRouter();


const [event, setEvent] = useState<Event | null>(null);
const [quantity, setQuantity] = useState(1);
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

const loadEvent = async () => {
    try {
        const { id } = await params;
        const data = await getEventById(id);

        setEvent(data);
    } catch {
        setError("Unable to load event.");
    }
};

if (!event && !error) {
    loadEvent();
}

const totalAmount = event
    ? event.price * quantity
    : 0;

const handlePayment = async () => {
    if (!event) return;

    setError("");
    setLoading(true);

    try {
        const order = await createPaymentOrder(
            event._id,
            quantity
        );

        if (!window.Razorpay) {
            throw new Error(
                "Razorpay checkout failed to load."
            );
        }

        const options = {
            key: order.key,

            amount: order.amount,

            currency: order.currency,

            name: "EventNest",

            description: event.title,

            order_id: order.orderId,

            handler: async (response: any) => {
                try {
                    const booking =
                        await verifyPayment({
                            razorpay_order_id:
                                response.razorpay_order_id,

                            razorpay_payment_id:
                                response.razorpay_payment_id,

                            razorpay_signature:
                                response.razorpay_signature,
                        });

                    router.push(
                        `/bookings/${booking._id}`
                    );
                } catch (error: any) {
                    setError(
                        error?.response?.data?.message ||
                            "Payment verification failed."
                    );

                    setLoading(false);
                }
            },

            prefill: {
                name: "",
                email: "",
            },

            theme: {
                color: "#18181b",
            },

            modal: {
                ondismiss: () => {
                    setLoading(false);
                },
            },
        };

        const razorpay =
            new window.Razorpay(options);

        razorpay.open();
    } catch (error: any) {
        setError(
            error?.response?.data?.message ||
                "Unable to create payment order."
        );

        setLoading(false);
    }
};

if (error && !event) {
    return (
        <main className="mx-auto max-w-3xl px-6 py-16">
            <div className="rounded-xl border p-8 text-center">
                <h1 className="text-2xl font-bold">
                    Unable to load event
                </h1>

                <p className="mt-2 text-zinc-500">
                    {error}
                </p>
            </div>
        </main>
    );
}

if (!event) {
    return (
        <main className="mx-auto max-w-3xl px-6 py-16">
            <p className="text-center text-zinc-500">
                Loading event...
            </p>
        </main>
    );
}

return (
    <>
        <Script
            src="https://checkout.razorpay.com/v1/checkout.js"
            strategy="afterInteractive"
        />

        <main className="mx-auto max-w-5xl px-6 py-12">
            <div className="mb-10">
                <h1 className="text-3xl font-bold">
                    Complete Your Booking
                </h1>

                <p className="mt-2 text-zinc-500">
                    Review your booking before continuing
                    to payment.
                </p>
            </div>

            <div className="grid gap-8 md:grid-cols-[1fr_360px]">
                <div className="rounded-2xl border bg-white p-6">
                    <div className="flex gap-5">
                        <div className="h-28 w-40 shrink-0 overflow-hidden rounded-lg bg-zinc-100">
                            {event.banner && (
                                <img
                                    src={event.banner}
                                    alt={event.title}
                                    className="h-full w-full object-cover"
                                />
                            )}
                        </div>

                        <div>
                            <p className="text-sm font-medium text-zinc-500">
                                {event.category}
                            </p>

                            <h2 className="mt-1 text-xl font-semibold">
                                {event.title}
                            </h2>

                            <p className="mt-2 text-sm text-zinc-500">
                                {event.venue}, {event.city}
                            </p>

                            <p className="mt-1 text-sm text-zinc-500">
                                {new Date(
                                    event.startDate
                                ).toLocaleDateString(
                                    "en-IN",
                                    {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                    }
                                )}
                            </p>
                        </div>
                    </div>

                    <div className="mt-8 border-t pt-6">
                        <label className="text-sm font-medium">
                            Number of Tickets
                        </label>

                        <div className="mt-3 flex items-center gap-4">
                            <button
                                type="button"
                                onClick={() =>
                                    setQuantity(
                                        Math.max(
                                            1,
                                            quantity - 1
                                        )
                                    )
                                }
                                disabled={quantity === 1}
                                className="flex h-10 w-10 items-center justify-center rounded-lg border text-lg disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                −
                            </button>

                            <span className="w-8 text-center font-semibold">
                                {quantity}
                            </span>

                            <button
                                type="button"
                                onClick={() =>
                                    setQuantity(
                                        Math.min(
                                            event.remainingSeats,
                                            quantity + 1
                                        )
                                    )
                                }
                                disabled={
                                    quantity >=
                                    event.remainingSeats
                                }
                                className="flex h-10 w-10 items-center justify-center rounded-lg border text-lg disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                +
                            </button>
                        </div>

                        <p className="mt-3 text-sm text-zinc-500">
                            {event.remainingSeats} seats
                            available
                        </p>
                    </div>
                </div>

                <div className="h-fit rounded-2xl border bg-white p-6">
                    <h2 className="text-lg font-semibold">
                        Booking Summary
                    </h2>

                    <div className="mt-6 space-y-4 text-sm">
                        <div className="flex justify-between">
                            <span className="text-zinc-500">
                                Ticket price
                            </span>

                            <span>
                                ₹{event.price}
                            </span>
                        </div>

                        <div className="flex justify-between">
                            <span className="text-zinc-500">
                                Quantity
                            </span>

                            <span>
                                × {quantity}
                            </span>
                        </div>

                        <div className="border-t pt-4">
                            <div className="flex justify-between">
                                <span className="font-medium">
                                    Total
                                </span>

                                <span className="text-xl font-bold">
                                    {event.price === 0
                                        ? "Free"
                                        : `₹${totalAmount}`}
                                </span>
                            </div>
                        </div>
                    </div>

                    {error && (
                        <div className="mt-5 rounded-lg bg-red-50 p-3 text-sm text-red-600">
                            {error}
                        </div>
                    )}

                    <button
                        type="button"
                        onClick={handlePayment}
                        disabled={loading}
                        className="mt-6 w-full rounded-lg bg-zinc-900 px-4 py-3 font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {loading
                            ? "Processing..."
                            : event.price === 0
                            ? "Confirm Booking"
                            : "Proceed to Payment"}
                    </button>
                </div>
            </div>
        </main>
    </>
);


}
