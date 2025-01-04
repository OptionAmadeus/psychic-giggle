export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public code?: string,
  ) {
    super(message);
    this.name = "ApiError";
  }

  static fromResponse(response: any): ApiError {
    return new ApiError(
      response.data?.message || "An unexpected error occurred",
      response.status,
      response.data?.code,
    );
  }
}

export class NetworkError extends Error {
  constructor(message: string = "Network error occurred") {
    super(message);
    this.name = "NetworkError";
  }
}

export class AuthenticationError extends Error {
  constructor(message: string = "Authentication failed") {
    super(message);
    this.name = "AuthenticationError";
  }
}

class AuthError extends Error {
  static fromSupabaseError(error: {
    code?: string;
    message?: string;
    status?: number;
  }): AuthError {
    // ...
  }

  // Remove this line if `error` is not used
  // static fromSupabaseError(_error: { code?: string; message?: string; status?: number }): AuthError { ... }
}
