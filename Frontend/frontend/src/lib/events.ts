import api from "./api";

export type EventStatus =
    | "draft"
    | "published"
    | "cancelled"
    | "completed";

export type EventCategory =
    | "Music"
    | "Sports"
    | "Technology"
    | "Business"
    | "Education"
    | "Food"
    | "Comedy"
    | "Workshop"
    | "Festival"
    | "Other";

export interface EventOrganizer {
    _id: string;
    fullName: string;
    email: string;
    avatar?: string;
}

export interface Event {
    _id: string;
    title: string;
    description: string;
    category: EventCategory;
    banner: string;
    venue: string;
    city: string;
    state: string;
    country: string;
    startDate: string;
    endDate: string;
    price: number;
    capacity: number;
    remainingSeats: number;
    organizer: EventOrganizer;
    status: EventStatus;
    isPublished: boolean;
    createdAt: string;
    updatedAt: string;
}

export const getAllEvents = async (): Promise<Event[]> => {
    const response = await api.get("/events");

    return response.data.data;
};

export const getEventById = async (
    eventId: string
): Promise<Event> => {
    const response = await api.get(`/events/${eventId}`);

    return response.data.data;
};