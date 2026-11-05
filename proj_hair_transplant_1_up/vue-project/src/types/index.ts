export interface User {
  name: string
  email: string
  phone: string
}

export interface Booking {
  id: number
  name: string
  phone: string
  service: string
  date: string
  time: string
  notes: string
  packageName?: string
  userEmail?: string
  createdAt: string
}

export interface Appointment {
  id: number
  service: string
  date: string
  time: string
  status: string
}

export interface Case {
  id: number
  title: string
  before: string
  after: string
  follicles: number
  technique: string
  sessions: string
  months: number
}

export interface Package {
  id: string
  name: string
  tagline: string
  service: string
  price: number
  oldPrice: number
  discount: number
  plasma: string | null
  features: string[]
  featured?: boolean
}

export interface TeamMember {
  id: number
  name: string
  role: string
  years: number
  certs: string
  image: string
}

export interface Testimonial {
  id: number
  name: string
  procedure: string
  text: string
  rating: number
}