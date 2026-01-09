// config.js
// Single source of truth for Supabase URL + anon key.
// IMPORTANT: Do NOT commit service-role or secret keys. Only anon key belongs in the browser.

window.APP_CONFIG = {
  SUPABASE_URL: "https://htmqdzvepyhpklrykjgh.supabase.co",
  SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh0bXFkenZlcHlocGtscnlramdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc0NzAzMjEsImV4cCI6MjA4MzA0NjMyMX0.nC_2KfGq6LGUhYjNQTXMFM_7Q_P0MflXEhV_GP1D16M"
};

window.getSupabase = function getSupabase() {
  if (!window.supabase) throw new Error("Supabase SDK not loaded");
  const cfg = window.APP_CONFIG || {};
  if (!cfg.SUPABASE_URL || !cfg.SUPABASE_ANON_KEY) {
    throw new Error("Missing Supabase config. Check config.js.");
  }
  if (!window.__sbClient) {
    window.__sbClient = window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY);
  }
  return window.__sbClient;
};
