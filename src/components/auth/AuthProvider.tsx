import React from "react";
import { useAuthSession } from "@/lib/supabase/hooks/useAuthSession";

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  useAuthSession();

  return <>{children}</>;
}
