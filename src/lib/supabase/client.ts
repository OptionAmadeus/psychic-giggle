import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types/schema";

const supabaseUrl = "https://dvkpanntfxehgasngylg.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2a3Bhbm50ZnhlaGdhc25neWxnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUyMzQ2OTEsImV4cCI6MjA1MDgxMDY5MX0.mYSCoWL2Ajk61V7vKfWM3aDkLY-0O47bilMdMPuwe_4";

export const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

export type SupabaseClient = typeof supabase;
