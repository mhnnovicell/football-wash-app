import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://iuevshfsgtxebxowfodx.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml1ZXZzaGZzZ3R4ZWJ4b3dmb2R4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk4NzkzMzMsImV4cCI6MjAxNTQ1NTMzM30.mjTda4RXPmAYN_RpP5CiELXCx_uV5uT4y0PxEROBGS0';

const options = {
  db: {
    schema: 'public',
  },
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, options);
