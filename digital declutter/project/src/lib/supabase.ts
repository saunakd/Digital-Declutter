import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please click "Connect to Supabase" button to set up your connection.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type User = {
  id: string;
  email: string;
  created_at: string;
};

export type DigitalItem = {
  id: string;
  user_id: string;
  name: string;
  type: 'app' | 'account' | 'device' | 'subscription';
  category: string;
  last_used_date: string | null;
  usage_frequency: 'daily' | 'weekly' | 'monthly' | 'rarely' | 'never';
  importance: 'high' | 'medium' | 'low';
  platform: string;
  notes: string;
  created_at: string;
  updated_at: string;
};

export type HealthCheck = {
  id: string;
  user_id: string;
  check_date: string;
  total_items: number;
  unused_items: number;
  recommendations: string[];
  created_at: string;
};