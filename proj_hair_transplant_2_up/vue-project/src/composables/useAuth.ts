import { computed, reactive } from 'vue'
import type { Booking, StoredUser, User } from '../types'

const USERS_KEY = 'titan_users'
const SESSION_KEY = 'titan_session'
const BOOKINGS_KEY = 'titan_bookings'

const demoUser: StoredUser = {
  id: 'demo-1',
  name: 'أحمد المنصور',
  email: 'demo@titan.com',
  phone: '07701234567',
  password: '123456',
}

function read<T>(storage: Storage, key: string, fallback: T): T {
  try {
    const raw = storage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function write(storage: Storage, key: string, value: unknown): void {
  try {
    storage.setItem(key, JSON.stringify(value))
  } catch {
    /* التخزين غير متاح */
  }
}

const digits = (v: string): string => v.replace(/\D/g, '')

const initialUsers = read<StoredUser[]>(localStorage, USERS_KEY, [])
if (!initialUsers.some((u) => u.email === demoUser.email)) initialUsers.unshift(demoUser)

const state = reactive({
  user: read<User | null>(localStorage, SESSION_KEY, null) ?? read<User | null>(sessionStorage, SESSION_KEY, null),
  users: initialUsers,
  bookings: read<Booking[]>(localStorage, BOOKINGS_KEY, []),
})

function persistSession(user: User | null, remember: boolean): void {
  localStorage.removeItem(SESSION_KEY)
  sessionStorage.removeItem(SESSION_KEY)
  if (user) write(remember ? localStorage : sessionStorage, SESSION_KEY, user)
}

function toPublic(u: StoredUser): User {
  return { id: u.id, name: u.name, email: u.email, phone: u.phone }
}

export interface AuthResult {
  ok: boolean
  error?: string
}

export function useAuth() {
  const user = computed(() => state.user)
  const isLoggedIn = computed(() => state.user !== null)

  const userBookings = computed(() =>
    state.bookings
      .filter((b) => state.user && b.userEmail === state.user.email)
      .sort((a, b) => a.date.localeCompare(b.date)),
  )

  function login(identifier: string, password: string, remember = true): AuthResult {
    const id = identifier.trim().toLowerCase()
    const found = state.users.find(
      (u) => u.email.toLowerCase() === id || (digits(id).length >= 8 && digits(u.phone) === digits(id)),
    )
    if (!found || found.password !== password) {
      return { ok: false, error: 'البريد/الهاتف أو كلمة المرور غير صحيحة.' }
    }
    state.user = toPublic(found)
    persistSession(state.user, remember)
    return { ok: true }
  }

  function register(data: { name: string; email: string; phone: string; password: string }): AuthResult {
    const email = data.email.trim().toLowerCase()
    if (state.users.some((u) => u.email.toLowerCase() === email)) {
      return { ok: false, error: 'هذا البريد مسجّل مسبقاً، جرّب تسجيل الدخول.' }
    }
    const created: StoredUser = {
      id: `u-${Date.now()}`,
      name: data.name.trim() || email.split('@')[0],
      email,
      phone: data.phone.trim(),
      password: data.password,
    }
    state.users.push(created)
    write(localStorage, USERS_KEY, state.users)
    state.user = toPublic(created)
    persistSession(state.user, true)
    return { ok: true }
  }

  function logout(): void {
    state.user = null
    persistSession(null, false)
  }

  function addBooking(data: Omit<Booking, 'id' | 'createdAt' | 'userEmail'>): Booking {
    const booking: Booking = {
      ...data,
      id: `b-${Date.now()}`,
      createdAt: new Date().toISOString(),
      userEmail: state.user?.email,
    }
    state.bookings.push(booking)
    write(localStorage, BOOKINGS_KEY, state.bookings)
    return booking
  }

  return { user, isLoggedIn, userBookings, login, register, logout, addBooking }
}