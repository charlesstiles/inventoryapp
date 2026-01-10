// config.js
// Update: Force persistent auth + singleton client for mobile reliability
// Revision: 2026-01-09.v2

const SUPABASE_URL = "https://YOURPROJECT.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh0bXFkenZlcHlocGtscnlramdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc0NzAzMjEsImV4cCI6MjA4MzA0NjMyMX0.nC_2KfGq6LGUhYjNQTXMFM_7Q_P0MflXEhV_GP1D16M";

let _supabase = null;

function getSupabase() {
  if (_supabase) return _supabase;

  _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storage: window.localStorage   // 🔑 critical for iOS
    }
  });

  return _supabase;
}
