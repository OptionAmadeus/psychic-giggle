import { StateCreator } from "zustand";
import { authClient } from "@/lib/auth/authClient";
import { authLogger } from "@/lib/supabase/debug/logger";
import { validateState } from "@/lib/coinbase/auth/connect";
import type { AuthStore } from "./types";

export const createAuthSlice: StateCreator<AuthStore> = (set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await authClient.signIn(credentials);
      if (!data?.user) throw new Error("No user data returned");

      set({
        user: {
          id: data.user.id,
          email: data.user.email!,
          name: data.user.user_metadata.name || "User",
        },
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
      return true;
    } catch (error) {
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: error instanceof Error ? error.message : "Login failed",
      });
      return false;
    }
  },

  logout: async () => {
    try {
      await authClient.signOut();
      set({
        user: null,
        isAuthenticated: false,
        error: null,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Logout failed",
      });
    }
  },

  handleOAuthCallback: async (code) => {
    set({ isLoading: true, error: null });
    try {
      // Get state from URL
      const urlParams = new URLSearchParams(window.location.search);
      const state = urlParams.get("state");

      // Validate state parameter
      if (!state || !validateState(state)) {
        throw new Error("Invalid OAuth state");
      }

      // Exchange code for token
      const { data } = await authClient.handleOAuthCallback(code);
      if (!data?.user) throw new Error("No user data returned");

      set({
        user: {
          id: data.user.id,
          email: data.user.email!,
          name: data.user.user_metadata.name || "User",
        },
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
      return true;
    } catch (error) {
      authLogger.error("OAuth callback failed:", error);
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: error instanceof Error ? error.message : "OAuth callback failed",
      });
      return false;
    }
  },

  clearError: () => set({ error: null }),
});
