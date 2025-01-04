export interface User {
  id: string;
  email: string;
  name: string;
  createdAt?: Date;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface AuthActions {
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => Promise<void>;
  handleOAuthCallback: (code: string) => Promise<boolean>;
  clearError: () => void;
}

export type AuthStore = AuthState & AuthActions;

export interface WaitlistEntry {
  email: string;
  name: string;
}
