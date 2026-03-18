import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 数据库类型定义
export interface Location {
  id: string
  name: string
  type: string
  latitude: number
  longitude: number
  parking: string
  parkingFee: string
  parkingSlots: number
  toilet: boolean
  charging: boolean
  quiet: boolean
  address: string
  tags: string[]
  gaodePoiId: string
  rating: number
  reviewCount: number
  createdAt: string
  updatedAt: string
}

export interface Route {
  id: string
  name: string
  description: string
  duration: string
  distance: string
  difficulty: string
  startPoint: any
  endPoint: any
  waypoints: any
  parkingInfo: string
  chargingInfo: string
  stayInfo: string
  toiletInfo: string
  tags: string[]
  rating: number
  reviewCount: number
  createdAt: string
  updatedAt: string
}

export interface Post {
  id: string
  author: string
  avatar: string
  title: string
  content: string
  tags: string[]
  likes: number
  comments: number
  time: string
  images: string[]
  source?: string
  createdAt: string
}

export interface Product {
  id: string
  name: string
  price: number
  originalPrice: number
  image: string
  tags: string[]
  rating: number
  reviews: number
  description: string
  createdAt: string
}
