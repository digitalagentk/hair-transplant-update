import { computed, reactive } from 'vue'
import type { Appointment, Booking, User } from '../types'

interface StoredUser extends User {
  password: string
}

const K_USERS = 'oryx_users'
const K_SESSION = 'oryx_session'
const K_BOOKINGS = 'oryx_bookings'

const DEMO: StoredUser = {
  name: 'عبدالله الراوي',
  email: 'demo@oryx.com',
  phone: '07701234567',
  password: '123456',
}

function read<T>(key: string, fallback: T, store: Storage = localStorage): T {
  try {
    const raw = store.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function write(key: string, value: unknown, store: Storage = localStorage) {
  try {
    store.setItem(key, JSON.stringify(value))
  } catch {
    /* التخزين غير متاح */
  }
}

const state = reactive<{ user: User | null; bookings: Booking[] }>({
  user: read<User | null>(K_SESSION, null, sessionStorage) ?? read<User | null>(K_SESSION, null),
  bookings: read<Booking[]>(K_BOOKINGS, []),
})

const digitsOf = (s: string) => s.replace(/\D/g, '')

export function useAuth() {
  const user = computed(() => state.user)
  const isLoggedIn = computed(() => !!state.user)

  function login(identifier: string, password: string, remember = true) {
    const id = identifier.trim().toLowerCase()
    const digits = digitsOf(id)
    const all: StoredUser[] = [DEMO, ...read<StoredUser[]>(K_USERS, [])]
    const found = all.find(
      (u) =>
        (u.email.toLowerCase() === id || (digits.length >= 9 && digitsOf(u.phone) === digits)) &&
        u.password === password,
    )
    if (!found) {
      return { ok: false, error: 'بيانات الدخول غير صحيحة، تأكد من البريد أو الهاتف وكلمة المرور.' }
    }
    const safe: User = { name: found.name, email: found.email, phone: found.phone }
    state.user = safe
    localStorage.removeItem(K_SESSION)
    sessionStorage.removeItem(K_SESSION)
    write(K_SESSION, safe, remember ? localStorage : sessionStorage)
    return { ok: true, error: '' }
  }

  function register(data: { name: string; email: string; phone: string; password: string }) {
    const users = read<StoredUser[]>(K_USERS, [])
    const all = [DEMO, ...users]
    const email = data.email.trim().toLowerCase()
    const phone = digitsOf(data.phone)
    if (all.some((u) => u.email.toLowerCase() === email)) {
      return { ok: false, error: 'هذا البريد الإلكتروني مسجّل مسبقاً.' }
    }
    if (all.some((u) => digitsOf(u.phone) === phone)) {
      return { ok: false, error: 'رقم الهاتف هذا مسجّل مسبقاً.' }
    }
    users.push({
      name: data.name.trim(),
      email,
      phone: data.phone.trim(),
      password: data.password,
    })
    write(K_USERS, users)
    return login(email, data.password, true)
  }

  function logout() {
    state.user = null
    localStorage.removeItem(K_SESSION)
    sessionStorage.removeItem(K_SESSION)
  }

  function addBooking(data: Omit<Booking, 'id' | 'createdAt' | 'userEmail'>) {
    const booking: Booking = {
      ...data,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      userEmail: state.user?.email,
    }
    state.bookings.push(booking)
    write(K_BOOKINGS, state.bookings)
    return booking
  }

  /** مواعيد وهمية + مواعيد المستخدم المحفوظة محلياً */
  const appointments = computed<Appointment[]>(() => {
    const d = new Date(Date.now() + 5 * 86400000)
    const mock: Appointment = {
      id: 1,
      service: 'استشارة زراعة شعر رأس',
      date: d.toISOString().slice(0, 10),
      time: 'صباحاً',
      status: 'مؤكد',
    }
    const mine: Appointment[] = state.bookings
      .filter((b) => b.userEmail && b.userEmail === state.user?.email)
      .map((b) => ({
        id: b.id,
        service: b.packageName ? `${b.service} — ${b.packageName}` : b.service,
        date: b.date,
        time: b.time,
        status: 'قيد التأكيد',
      }))
    return [mock, ...mine]
  })

  return { user, isLoggedIn, login, register, logout, addBooking, appointments }
}