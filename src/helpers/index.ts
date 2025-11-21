/* eslint-disable @typescript-eslint/no-explicit-any */

import axios from "axios";

export const validationToken = async (): Promise<any> => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  if (!token) {
    return { error: "No token found" };
  }

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    console.error("API URL is not defined in environment variables");
    return { error: "API URL is not defined" };
  }

  try {
    const response = await axios.get(`${apiUrl}/auth/me`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      return {
        error: true,
        message: error.response?.data,
        status: error.response?.status || 500,
      };
    }
    return { error: true, message: "Unexpected error occurred", status: 500 };
  }
};
