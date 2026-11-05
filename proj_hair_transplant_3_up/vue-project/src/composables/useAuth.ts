import { reactive, computed } from 'vue'
import type { AuthResult, Booking, User } from '../types'

interface StoredUser extends User {
  password: string
}

const KEYS = {
  session: 'revive_user',
  users: 'revive_users',
  bookings: 'revive_bookings',
}

const DEMO_USER: StoredUser = {
  name: 'أحمد المحمود',
  email: 'demo@revive.com',
  phone: '0500000000',
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

function write(storage: Storage, key: string, value: unknown) {
  try {
    storage.setItem(key, JSON.stringify(value))
  } catch {
    /* التخزين غير متاح — نتجاهل */
  }
}

const normalizePhone = (v: string) => v.replace(/\D/g, '')

const state = reactive<{ user: User | null; users: StoredUser[]; bookings: Booking[] }>({
  user: read<User | null>(localStorage, KEYS.session, null) ?? read<User | null>(sessionStorage, KEYS.session, null),
  users: read<StoredUser[]>(localStorage, KEYS.users, []),
  bookings: read<Booking[]>(localStorage, KEYS.bookings, []),
})

function startSession(user: User, remember: boolean) {
  state.user = user
  localStorage.removeItem(KEYS.session)
  sessionStorage.removeItem(KEYS.session)
  write(remember ? localStorage : sessionStorage, KEYS.session, user)
}

function login(identifier: string, password: string, remember = true): AuthResult {
  const id = identifier.trim().toLowerCase()
  const digits = normalizePhone(identifier)
  const found = [DEMO_USER, ...state.users].find(
    (u) => u.email.toLowerCase() === id || (digits.length > 0 && normalizePhone(u.phone) === digits),
  )
  if (!found || found.password !== password) {
    return { ok: false, error: 'بيانات الدخول غير صحيحة، تحقّق منها وحاول مجدداً' }
  }
  const user: User = { name: found.name, email: found.email, phone: found.phone }
  startSession(user, remember)
  return { ok: true, user }
}

function register(data: { name: string; email: string; phone: string; password: string }): AuthResult {
  const email = data.email.trim().toLowerCase()
  const phone = normalizePhone(data.phone)
  const exists = [DEMO_USER, ...state.users].some(
    (u) => u.email.toLowerCase() === email || normalizePhone(u.phone) === phone,
  )
  if (exists) return { ok: false, error: 'يوجد حساب مسجّل بهذا البريد أو رقم الهاتف' }

  const stored: StoredUser = { name: data.name.trim(), email, phone: data.phone.trim(), password: data.password }
  state.users.push(stored)
  write(localStorage, KEYS.users, state.users)

  const user: User = { name: stored.name, email: stored.email, phone: stored.phone }
  startSession(user, true)
  return { ok: true, user }
}

function logout() {
  state.user = null
  localStorage.removeItem(KEYS.session)
  sessionStorage.removeItem(KEYS.session)
}

function addBooking(data: Omit<Booking, 'id' | 'createdAt'>): Booking {
  const booking: Booking = {
    ...data,
    id: `bk_${Date.now().toString(36)}`,
    createdAt: new Date().toISOString(),
  }
  state.bookings.unshift(booking)
  write(localStorage, KEYS.bookings, state.bookings)
  return booking
}

export function useAuth() {
  return {
    user: computed(() => state.user),
    isLoggedIn: computed(() => state.user !== null),
    bookings: computed(() => state.bookings),
    login,
    register,
    logout,
    addBooking,
  }
}