import type { AxiosError, AxiosResponse } from "axios";

export interface ApiResponse<T> {
  data: T; // Replace with specific type
  status: number;
  statusText: string;
}

export interface ApiError extends AxiosError {
  response?: AxiosResponse;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export type SpecificType = object;
