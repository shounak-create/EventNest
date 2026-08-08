
import api from "./api";

export type UserRole = "attendee" | "organizer" | "admin";

export interface User {
  _id: string;
  fullName: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  isVerified?: boolean;
}

interface AuthResponse {
  success: boolean;
  message?: string;
  data: User;
}

export const registerUser = async (data: {
  fullName: string;
  email: string;
  password: string;
}) => {
  const response = await api.post<AuthResponse>(
    "/auth/register",
    data
  );

  return response.data;
};

export const loginUser = async (data: {
  email: string;
  password: string;
}) => {
  const response = await api.post<AuthResponse>(
    "/auth/login",
    data
  );

  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get<AuthResponse>(
    "/auth/me"
  );

  return response.data.data;
};

export const logoutUser = async () => {
  const response = await api.post(
    "/auth/logout"
  );

  return response.data;
};

export const getGoogleLoginUrl = () => {
  return `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
};

