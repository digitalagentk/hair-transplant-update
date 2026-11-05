<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import { PHOTOS } from '../utils/photos'

type Tab = 'signin' | 'signup'
type ToastType = 'success' | 'info' | 'error'

const route = useRoute()
const router = useRouter()
const { user, isLoggedIn, userBookings, login, register, logout } = useAuth()

const tab = ref<Tab>('signin')
const showPass = ref(false)
const showPass2 = ref(false)
const loading = ref(false)
const redirecting = ref(false)
const error = ref('')

const signIn = reactive({ id: '', password: '', remember: true })
const signUp = reactive({ name: '', email: '', phone: '', password: '', confirm: '' })
const toast = reactive({ show: false, type: 'success' as ToastType, msg: '' })
let toastTimer: number | undefined

// الوجهة بعد النجاح: ?redirect=/booking أو القدوم من صفحة الحجز، وإلا الرئيسية
const cameFrom = (window.history.state as { back?: string } | null)?.back
const redirectTarget = computed(() => {
  const r = route.query.redirect
  if (typeof r === 'string' && r.startsWith('/')) return r
  return cameFrom === '/booking' ? '/booking' : '/'
})

function notify(msg: string, type: ToastType = 'success') {
  toast.msg = msg
  toast.type = type
  toast.show = true
  window.clearTimeout(toastTimer)
  toastTimer = window.setTimeout(() => (toast.show = false), 2600)
}

function finish(msg: string) {
  redirecting.value = true
  notify(msg, 'success')
  window.setTimeout(() => router.push(redirectTarget.value), 900)
}

function switchTab(t: Tab) {
  tab.value = t
  error.value = ''
}

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))

async function submitSignIn() {
  error.value = ''
  if (!signIn.id.trim() || !signIn.password) {
    error.value = 'يرجى إدخال البريد أو الهاتف وكلمة المرور.'
    return
  }
  loading.value = true
  await wait(600)
  const res = login(signIn.id, signIn.password, signIn.remember)
  loading.value = false
  if (!res.ok) {
    error.value = res.error ?? 'تعذّر تسجيل الدخول.'
    return
  }
  finish('تم تسجيل الدخول بنجاح')
}

async function submitSignUp() {
  error.value = ''
  if (signUp.name.trim().length < 3) return void (error.value = 'يرجى إدخال الاسم الكامل.')
  if (!/^\S+@\S+\.\S+$/.test(signUp.email)) return void (error.value = 'يرجى إدخال بريد إلكتروني صحيح.')
  if (signUp.phone.replace(/\D/g, '').length < 8) return void (error.value = 'يرجى إدخال رقم هاتف صحيح.')
  if (signUp.password.length < 6) return void (error.value = 'كلمة المرور يجب ألا تقل عن 6 أحرف.')
  if (signUp.password !== signUp.confirm) return void (error.value = 'تأكيد كلمة المرور غير مطابق.')
  loading.value = true
  await wait(700)
  const res = register({ name: signUp.name, email: signUp.email, phone: signUp.phone, password: signUp.password })
  loading.value = false
  if (!res.ok) {
    error.value = res.error ?? 'تعذّر إنشاء الحساب.'
    return
  }
  finish('تم إنشاء حسابك بنجاح')
}

function handleLogout() {
  logout()
  notify('تم تسجيل الخروج', 'info')
}

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString('ar', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
}
</script>

<template>
  <div class="relative min-h-screen overflow-hidden bg-gradient-to-r from-zinc-900 via-stone-900 to-yellow-950 px-4 py-10 sm:px-6 lg:py-16">
    <!-- Toast -->
    <Transition name="toast">
      <div
        v-if="toast.show"
        class="fixed left-1/2 top-20 z-[60] -translate-x-1/2 rounded-xl px-6 py-3 text-sm font-bold text-white shadow-2xl"
        :class="toast.type === 'success' ? 'bg-yellow-700' : toast.type === 'error' ? 'bg-red-700' : 'bg-zinc-700'"
        role="status"
      >
        {{ toast.msg }}
      </div>
    </Transition>

    <!-- البطاقة الزجاجية الكبيرة -->
    <div class="relative mx-auto max-w-6xl rounded-3xl border border-white/10 bg-white/5 p-4 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-6 lg:p-8">
      <div class="grid items-stretch gap-6 lg:grid-cols-2">
        <!-- الجانب الأيمن: الصورة داخل كارد مستقل -->
        <div v-motion :initial="{ opacity: 0, x: 40, scale: 0.96 }" :enter="{ opacity: 1, x: 0, scale: 1, transition: { duration: 700, ease: 'easeOut' } }" class="relative p-3 sm:p-4">
          <!-- Halo glow نحاسي + ذهبي -->
          <div class="halo pointer-events-none absolute -inset-2 z-0 rounded-[3rem] bg-amber-500/20 blur-3xl"></div>
          <div class="halo pointer-events-none absolute -bottom-10 -left-10 z-0 h-64 w-64 rounded-full bg-yellow-600/10 blur-3xl" style="animation-delay: 1.5s"></div>

          <div class="float-card relative z-10 h-full">
            <div class="relative h-72 overflow-hidden rounded-3xl shadow-2xl shadow-black/50 sm:h-96 lg:h-full lg:min-h-[34rem]">
              <img :src="PHOTOS.loginHero" alt="رجل بلحية كثيفة فاخرة بإضاءة دافئة نحاسية" class="absolute inset-0 h-full w-full object-cover" />
              <div class="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-yellow-950/40 to-amber-900/10"></div>
              <div class="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <h2 class="text-3xl font-bold text-amber-300 sm:text-4xl">لحيتك... توقيعك الذكوري</h2>
                <p class="mt-3 max-w-sm text-sm leading-7 text-stone-200">سجّل دخولك لتتابع مواعيدك وتحجز استشارتك بخطوة واحدة.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- الجانب الأيسر: بطاقة الفورم -->
        <div
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 700, delay: 100 } }"
          class="flex items-center p-1 sm:p-3"
        >
          <div class="w-full rounded-3xl bg-white/95 p-6 shadow-xl backdrop-blur sm:p-8">
            <!-- حالة: مسجّل مسبقاً -->
            <div v-if="isLoggedIn && !redirecting" class="text-center">
              <div class="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-yellow-600 to-zinc-900 text-3xl font-bold text-white">
                {{ user?.name.charAt(0) }}
              </div>
              <h1 class="mt-5 text-2xl font-bold text-stone-900">مرحباً {{ user?.name }}</h1>
              <p class="mt-1 text-sm text-stone-500" dir="ltr">{{ user?.email }}</p>

              <div class="mt-6 rounded-2xl bg-[#FAF7F2] p-4 text-right">
                <h2 class="mb-3 font-bold text-stone-900">مواعيدي القادمة</h2>
                <ul v-if="userBookings.length" class="space-y-2">
                  <li v-for="b in userBookings" :key="b.id" class="rounded-xl border border-stone-200 bg-white p-3 text-sm">
                    <p class="font-bold text-stone-900">{{ b.service }}</p>
                    <p class="text-stone-500">{{ fmtDate(b.date) }} — {{ b.time }}</p>
                  </li>
                </ul>
                <ul v-else class="space-y-2">
                  <li class="rounded-xl border border-dashed border-yellow-700/40 bg-white p-3 text-sm">
                    <p class="font-bold text-stone-900">استشارة نحت اللحية (موعد تجريبي)</p>
                    <p class="text-stone-500">لا توجد مواعيد محجوزة بعد. احجز استشارتك الأولى الآن.</p>
                  </li>
                </ul>
              </div>

              <div class="mt-6 flex flex-col gap-3 sm:flex-row">
                <RouterLink to="/booking" class="btn-copper flex-1">احجز استشارة</RouterLink>
                <button type="button" class="min-h-11 flex-1 rounded-xl border border-stone-300 px-6 font-bold text-stone-700 transition hover:border-red-400 hover:text-red-700" @click="handleLogout">
                  تسجيل الخروج
                </button>
              </div>
            </div>

            <!-- حالة: فورم الدخول / التسجيل -->
            <div v-else>
              <h1 class="text-2xl font-bold text-stone-900">أهلاً بك في مركز تيتان</h1>
              <p class="mt-1 text-sm text-stone-500">سجّل الدخول أو أنشئ حساباً جديداً.</p>

              <!-- Tabs -->
              <div class="relative mt-6 grid grid-cols-2 rounded-2xl bg-stone-100 p-1" role="tablist" aria-label="نوع العملية">
                <span
                  class="absolute inset-y-1 right-1 w-[calc(50%-4px)] rounded-xl bg-gradient-to-r from-yellow-700 to-zinc-900 shadow transition-transform duration-300"
                  :class="tab === 'signin' ? 'translate-x-0' : '-translate-x-full'"
                  aria-hidden="true"
                ></span>
                <button type="button" role="tab" :aria-selected="tab === 'signin'" class="relative z-10 min-h-11 rounded-xl text-sm font-bold transition-colors duration-300" :class="tab === 'signin' ? 'text-white' : 'text-stone-600'" @click="switchTab('signin')">
                  تسجيل الدخول
                </button>
                <button type="button" role="tab" :aria-selected="tab === 'signup'" class="relative z-10 min-h-11 rounded-xl text-sm font-bold transition-colors duration-300" :class="tab === 'signup' ? 'text-white' : 'text-stone-600'" @click="switchTab('signup')">
                  إنشاء حساب
                </button>
              </div>

              <p v-if="error" class="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-bold text-red-700" role="alert">{{ error }}</p>

              <Transition name="tab" mode="out-in">
                <!-- Sign In -->
                <form v-if="tab === 'signin'" key="signin" class="mt-5 space-y-4" novalidate @submit.prevent="submitSignIn">
                  <div>
                    <label for="si-id" class="field-label">البريد الإلكتروني أو رقم الهاتف</label>
                    <input id="si-id" v-model="signIn.id" type="text" class="field" autocomplete="username" dir="ltr" />
                  </div>

                  <div>
                    <label for="si-pass" class="field-label">كلمة المرور</label>
                    <div class="relative">
                      <input id="si-pass" v-model="signIn.password" :type="showPass ? 'text' : 'password'" class="field pl-12" autocomplete="current-password" dir="ltr" />
                      <button type="button" class="absolute left-1 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center text-stone-500 transition hover:text-yellow-700" :aria-label="showPass ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'" @click="showPass = !showPass">
                        <svg v-if="!showPass" viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                        <svg v-else viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                          <path d="M17.940 17.940A10.070 10.070 0 0 1 12 20c-7 0-11-8-11-8a18.450 18.450 0 0 1 5.060-5.940M9.900 4.240A9.120 9.120 0 0 1 12 4c7 0 11 8 11 8a18.500 18.500 0 0 1-2.160 3.190m-6.720-1.070a3 3 0 1 1-4.240-4.240" />
                          <line x1="1" y1="1" x2="23" y2="23" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div class="flex items-center justify-between gap-3">
                    <label class="flex min-h-11 cursor-pointer items-center gap-2 text-sm text-stone-700">
                      <input v-model="signIn.remember" type="checkbox" class="h-5 w-5 rounded border-stone-300 accent-yellow-700" />
                      تذكرني
                    </label>
                    <button type="button" class="min-h-11 text-sm font-bold text-yellow-800 underline underline-offset-4" @click="notify('ميزة استعادة كلمة المرور غير متاحة في النسخة التجريبية', 'info')">
                      نسيت كلمة المرور؟
                    </button>
                  </div>

                  <button type="submit" class="btn-copper w-full disabled:cursor-not-allowed disabled:opacity-70" :disabled="loading">
                    {{ loading ? 'جارٍ التحقق...' : 'تسجيل الدخول' }}
                  </button>
                </form>

                <!-- Sign Up -->
                <form v-else key="signup" class="mt-5 space-y-4" novalidate @submit.prevent="submitSignUp">
                  <div>
                    <label for="su-name" class="field-label">الاسم الكامل</label>
                    <input id="su-name" v-model="signUp.name" type="text" class="field" autocomplete="name" />
                  </div>
                  <div>
                    <label for="su-email" class="field-label">البريد الإلكتروني</label>
                    <input id="su-email" v-model="signUp.email" type="email" class="field" autocomplete="email" dir="ltr" />
                  </div>
                  <div>
                    <label for="su-phone" class="field-label">رقم الهاتف</label>
                    <input id="su-phone" v-model="signUp.phone" type="tel" class="field" autocomplete="tel" dir="ltr" />
                  </div>
                  <div>
                    <label for="su-pass" class="field-label">كلمة المرور</label>
                    <div class="relative">
                      <input id="su-pass" v-model="signUp.password" :type="showPass2 ? 'text' : 'password'" class="field pl-12" autocomplete="new-password" dir="ltr" />
                      <button type="button" class="absolute left-1 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center text-stone-500 transition hover:text-yellow-700" :aria-label="showPass2 ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'" @click="showPass2 = !showPass2">
                        <svg v-if="!showPass2" viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                        <svg v-else viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                          <path d="M17.940 17.940A10.070 10.070 0 0 1 12 20c-7 0-11-8-11-8a18.450 18.450 0 0 1 5.060-5.940M9.900 4.240A9.120 9.120 0 0 1 12 4c7 0 11 8 11 8a18.500 18.500 0 0 1-2.160 3.190m-6.720-1.070a3 3 0 1 1-4.240-4.240" />
                          <line x1="1" y1="1" x2="23" y2="23" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div>
                    <label for="su-confirm" class="field-label">تأكيد كلمة المرور</label>
                    <input id="su-confirm" v-model="signUp.confirm" :type="showPass2 ? 'text' : 'password'" class="field" autocomplete="new-password" dir="ltr" />
                  </div>

                  <button type="submit" class="btn-copper w-full disabled:cursor-not-allowed disabled:opacity-70" :disabled="loading">
                    {{ loading ? 'جارٍ إنشاء الحساب...' : 'إنشاء الحساب' }}
                  </button>
                </form>
              </Transition>

              <!-- Google -->
              <div class="my-5 flex items-center gap-3 text-xs text-stone-400">
                <span class="h-px flex-1 bg-stone-200"></span>أو<span class="h-px flex-1 bg-stone-200"></span>
              </div>
              <button type="button" class="flex min-h-11 w-full items-center justify-center gap-3 rounded-xl border border-stone-300 bg-white font-bold text-stone-700 transition hover:border-yellow-600 hover:shadow" @click="notify('تسجيل Google غير متاح في النسخة التجريبية', 'info')">
                <svg viewBox="0 0 24 24" class="h-5 w-5" aria-hidden="true">
                  <path fill="#4285F4" d="M23.490 12.270c0-.790-.070-1.540-.190-2.270H12v4.510h6.470c-.290 1.480-1.140 2.730-2.400 3.580v3h3.860c2.260-2.090 3.560-5.170 3.560-8.820z" />
                  <path fill="#34A853" d="M12 24c3.240 0 5.950-1.080 7.930-2.910l-3.860-3c-1.080.720-2.450 1.160-4.070 1.160-3.130 0-5.780-2.110-6.730-4.960H1.290v3.090C3.260 21.300 7.310 24 12 24z" />
                  <path fill="#FBBC05" d="M5.270 14.290c-.250-.720-.380-1.490-.380-2.290s.140-1.570.380-2.290V6.620H1.290C.470 8.240 0 10.060 0 12s.470 3.760 1.290 5.380l3.980-3.090z" />
                  <path fill="#EA4335" d="M12 4.750c1.770 0 3.350.610 4.600 1.800l3.420-3.420C17.950 1.190 15.240 0 12 0 7.310 0 3.260 2.700 1.290 6.620l3.980 3.090c.950-2.850 3.600-4.960 6.730-4.960z" />
                </svg>
                المتابعة عبر Google
              </button>

              <p class="mt-5 rounded-xl bg-stone-100 px-4 py-2.5 text-center text-xs text-stone-500" dir="ltr">
                Demo: demo@titan.com / 123456
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>