
import api from "./api";

export const getTicketToken = async (
  bookingId: string
): Promise<string> => {
  const response = await api.get(
    `/tickets/token/${bookingId}`
  );

  return response.data.data.token;
};

export const downloadTicket = async (
  token: string
): Promise<Blob> => {
  const response = await api.get(
    `/tickets/download?token=${encodeURIComponent(token)}`,
    {
      responseType: "blob",
    }
  );

  return response.data;
};

