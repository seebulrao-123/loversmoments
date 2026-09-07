import { createClient } from '@supabase/supabase-js';

// Dono names se check karega taaki kabhi issue na aaye
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL ya Key .env file mein nahi mili!');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);