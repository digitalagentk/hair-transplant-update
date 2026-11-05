export type ServiceOption =
  | 'زراعة لحية'
  | 'تكثيف شارب'
  | 'ملء فراغات'
  | 'إصلاح ندوب الوجه'
  | 'استشارة عامة'

export type TimeSlot = 'صباحاً' | 'ظهراً' | 'مساءً'

export type CaseType = 'ملء فراغات' | 'نحت اللحية' | 'إصلاح ندوب'

export interface User {
  id: string
  name: string
  email: string
  phone: string
}

export interface StoredUser extends User {
  password: string
}

export interface Booking {
  id: string
  name: string
  phone: string
  service: ServiceOption
  date: string
  time: TimeSlot
  notes?: string
  userEmail?: string
  createdAt: string
}

export interface Case {
  id: number
  title: string
  type: CaseType
  grafts: number
  technique: string
  before: string
  after: string
}

export interface Package {
  id: number
  name: string
  tagline: string
  price: number
  oldPrice: number
  featured?: boolean
  plasmaSessions: number
  service: ServiceOption
  features: string[]
}

export interface TeamMember {
  id: number
  name: string
  specialty: string
  years: number
  certificates: string[]
  photo: string
}

export interface Testimonial {
  id: number
  name: string
  procedure: string
  text: string
  rating: number
}