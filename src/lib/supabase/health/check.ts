import { supabase } from "../client";

interface HealthCheckResult {
  status: "healthy" | "unhealthy";
  timestamp: string;
  message: string;
  error?: string;
}

export async function checkSupabaseHealth(): Promise<HealthCheckResult> {
  try {
    // Test database connection
    const { error: dbError } = await supabase
      .from("waitlist")
      .select("count")
      .limit(0);

    // Test auth service
    const { error: authError } = await supabase.auth.getSession();

    const isHealthy = !dbError && !authError;

    return {
      status: isHealthy ? "healthy" : "unhealthy",
      timestamp: new Date().toISOString(),
      message: isHealthy
        ? "All services operational"
        : "Service experiencing issues",
      error: dbError?.message || authError?.message,
    };
  } catch (error) {
    return {
      status: "unhealthy",
      timestamp: new Date().toISOString(),
      message: "Service experiencing issues",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
