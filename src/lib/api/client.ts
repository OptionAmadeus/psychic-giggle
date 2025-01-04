import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { API_CONFIG } from "@/config/api";
import type { ApiError } from "@/types/api";

export const apiClient = axios.create({
  baseURL: API_CONFIG.baseUrl,
  timeout: API_CONFIG.timeout,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = localStorage.getItem("auth_token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const apiError: ApiError = {
      message: error.response?.data?.message || "An unexpected error occurred",
      code: error.response?.data?.code,
      details: error.response?.data?.details,
    };
    return Promise.reject(apiError);
  },
);
