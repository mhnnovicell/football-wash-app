import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bfsuptshqelwpuzokpot.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJmc3VwdHNocWVsd3B1em9rcG90Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE0MjQ5NzEsImV4cCI6MjAxNzAwMDk3MX0.SKkXWFXruQ9QMmaqSw1lVcUQvPKOMRtvR2A1rrDR7Ek';

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
