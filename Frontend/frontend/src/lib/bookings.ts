import api from "./api";

export interface BookingEvent {
  _id: string;
  title: string;
  venue: string;
  city: string;
  state: string;
  startDate: string;
  endDate: string;
  banner?: string;
  price: number;
}

export interface Booking {
  _id: string;
  quantity: number;
  totalAmount: number;
  status: "pending" | "confirmed" | "cancelled" | "refunded";
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
  checkedIn: boolean;
  checkedInAt?: string | null;
  ticketReference: string;
  event: BookingEvent;
  createdAt: string;
}

export const getMyBookings = async (): Promise<Booking[]> => {
  const response = await api.get("/bookings/my-bookings");

  return response.data.data;
};