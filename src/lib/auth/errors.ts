export class AuthError extends Error {
  constructor(
    message: string,
    public code?: string,
    public status?: number,
  ) {
    super(message);
    this.name = "AuthError";
  }

  static fromSupabaseError(_error: {
    code?: string;
    message?: string;
    status?: number;
  }): AuthError {
    // ...
  }
}
