class ApiError extends Error {
  code?: string;
  status?: number;

  constructor(message: string, code?: string, status?: number) {
    super(message);
    this.code = code;
    this.status = status;
  }

  static fromResponse(response: any): ApiError {
    return new ApiError(
      response.data?.message || "An unexpected error occurred",
      response.status,
      response.data?.code,
    );
  }
}
