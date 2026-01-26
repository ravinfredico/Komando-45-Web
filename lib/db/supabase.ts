import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper functions for common database operations
export async function fetchEvents() {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('date', { ascending: true });
  
  if (error) throw error;
  return data;
}

export async function submitContactForm(name: string, email: string, message: string) {
  const { data, error } = await supabase
    .from('contact_messages')
    .insert([{ name, email, message }]);
  
  if (error) throw error;
  return data;
}
