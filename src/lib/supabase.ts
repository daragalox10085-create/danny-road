import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 类型定义
export interface Profile {
  id: string;
  username?: string;
  full_name?: string;
  avatar_url?: string;
  email?: string;
  car_model?: string;
  created_at: string;
  updated_at: string;
}

export interface Route {
  id: string;
  title: string;
  description?: string;
  start_location: string;
  end_location: string;
  distance_km?: number;
  estimated_duration_hours?: number;
  difficulty_level?: 'easy' | 'medium' | 'hard';
  cover_image_url?: string;
  created_by?: string;
  created_at: string;
  updated_at: string;
}

export interface RouteWaypoint {
  id: string;
  route_id: string;
  name: string;
  latitude: number;
  longitude: number;
  waypoint_type: 'charging' | 'scenic' | 'rest' | 'food' | 'accommodation';
  description?: string;
  order_index: number;
  created_at: string;
}

export interface ChargingStation {
  id: string;
  name: string;
  address?: string;
  latitude: number;
  longitude: number;
  connector_types?: string[];
  power_kw?: number;
  num_chargers?: number;
  available_24_7?: boolean;
  price_per_kwh?: number;
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: string;
  route_id: string;
  user_id?: string;
  rating?: number;
  title?: string;
  content?: string;
  images?: string[];
  created_at: string;
  updated_at: string;
}
