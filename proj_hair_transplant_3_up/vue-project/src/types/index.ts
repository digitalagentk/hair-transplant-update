export interface User {
  name: string
  email: string
  phone: string
}

export type AuthResult = { ok: true; user: User } | { ok: false; error: string }

export interface Booking {
  id: string
  name: string
  phone: string
  treatment: string
  date: string
  time: string
  notes?: string
  createdAt: string
}

/** مكان صورة: src = ملف داخل public/images، fallback = رابط احتياطي (اختياري) */
export interface Photo {
  src: string
  alt: string
  caption: string
  fallback?: string
}

export interface Case {
  id: string
  title: string
  treatment: string
  sessions: string
  duration: string
  before: Photo
  after: Photo
}

export interface Package {
  id: string
  name: string
  summary: string
  price: number
  oldPrice: number
  treatment: string
  features: string[]
  popular?: boolean
}

export interface TeamMember {
  id: string
  name: string
  role: string
  experience: string
  credentials: string
  image: Photo
}

export interface Testimonial {
  id: string
  name: string
  treatment: string
  text: string
  rating: number
}