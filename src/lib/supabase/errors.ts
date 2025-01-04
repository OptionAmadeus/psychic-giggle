export class SupabaseError extends Error {
  constructor(
    message: string,
    public code?: string,
    public status?: number,
  ) {
    super(message);
    this.name = "SupabaseError";
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
