import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "http://127.0.0.1:54321";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0";

export function getSupabase() {
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

export async function setUserContext(supabase: ReturnType<typeof createClient>, userId: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await (supabase as any).rpc("set_current_user", { user_id: userId });
}
