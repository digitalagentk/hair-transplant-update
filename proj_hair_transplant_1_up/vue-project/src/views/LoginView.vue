<script setup lang="ts">
import { computed, onBeforeUnmount, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import { BTN_PRIMARY, IMG, INPUT_CLS, hideBroken, img, motionIn } from '../utils/helpers'

const route = useRoute()
const router = useRouter()
const { user, isLoggedIn, login, register, logout, appointments } = useAuth()

// الأنيميشن حسب المواصفات (مع احترام reduced-motion)
const cardM = motionIn({ x: 40, scale: 0.96, duration: 800 })
const formM = motionIn({ y: 30, duration: 800, delay: 150 })

const tab = ref<'signin' | 'signup'>('signin')
const showPass = ref(false)
const loading = ref(false)

const signin = reactive({ identifier: '', password: '', remember: true })
const signup = reactive({ name: '', email: '', phone: '', password: '', confirm: '' })
const errors = reactive<Record<string, string>>({})

const toast = reactive({ show: false, text: '', type: 'success' as 'success' | 'info' })
let toastTimer: ReturnType<typeof setTimeout> | undefined
let redirectTimer: ReturnType<typeof setTimeout> | undefined

const redirectTo = computed(() => {
  const r = route.query.redirect
  return typeof r === 'string' && r.startsWith('/') ? r : '/'
})

function showToast(text: string, type: 'success' | 'info' = 'success') {
  toast.text = text
  toast.type = type
  toast.show = true
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => (toast.show = false), 2600)
}

onBeforeUnmount(() => {
  clearTimeout(toastTimer)
  clearTimeout(redirectTimer)
})

function clearErrors() {
  Object.keys(errors).forEach((k) => delete errors[k])
}

function switchTab(t: 'signin' | 'signup') {
  tab.value = t
  clearErrors()
}

function fillDemo() {
  signin.identifier = 'demo@oryx.com'
  signin.password = '123456'
  clearErrors()
}

function finishSuccess(text: string) {
  showToast(text)
  redirectTimer = setTimeout(() => router.push(redirectTo.value), 1000)
}

function submitSignin() {
  clearErrors()
  if (!signin.identifier.trim()) errors.identifier = 'أدخل البريد الإلكتروني أو رقم الهاتف.'
  if (signin.password.length < 6) errors.password = 'كلمة المرور 6 أحرف على الأقل.'
  if (Object.keys(errors).length) return
  loading.value = true
  setTimeout(() => {
    loading.value = false
    const res = login(signin.identifier, signin.password, signin.remember)
    if (!res.ok) {
      errors.form = res.error
      return
    }
    finishSuccess('تم تسجيل الدخول بنجاح')
  }, 600)
}

function submitSignup() {
  clearErrors()
  if (signup.name.trim().length < 3) errors.name = 'أدخل اسمك الكامل.'
  if (!/^\S+@\S+\.\S+$/.test(signup.email.trim())) errors.email = 'أدخل بريداً إلكترونياً صحيحاً.'
  if (!/^\+?[\d\s-]{9,16}$/.test(signup.phone.trim())) errors.phone = 'أدخل رقم هاتف صحيحاً.'
  if (signup.password.length < 6) errors.password = 'كلمة المرور 6 أحرف على الأقل.'
  if (signup.confirm !== signup.password) errors.confirm = 'كلمتا المرور غير متطابقتين.'
  if (Object.keys(errors).length) return
  loading.value = true
  setTimeout(() => {
    loading.value = false
    const res = register({ name: signup.name, email: signup.email, phone: signup.phone, password: signup.password })
    if (!res.ok) {
      errors.form = res.error
      return
    }
    finishSuccess('تم إنشاء الحساب بنجاح')
  }, 700)
}

function doLogout() {
  logout()
  showToast('تم تسجيل الخروج', 'info')
}

const fmtDate = (d: string) =>
  new Date(d).toLocaleDateString('ar', { weekday: 'long', day: 'numeric', month: 'long' })
</script>

<template>
  <div class="relative min-h-screen overflow-hidden bg-gradient-to-r from-slate-950 via-zinc-900 to-cyan-950 px-4 py-10 sm:px-6">
    <!-- Toast -->
    <div class="pointer-events-none fixed inset-x-0 top-20 z-[60] flex justify-center px-4">
      <Transition name="toast">
        <div
          v-if="toast.show"
          role="status"
          class="pointer-events-auto flex items-center gap-3 rounded-2xl border px-5 py-3 font-bold shadow-2xl backdrop-blur"
          :class="toast.type === 'success' ? 'border-cyan-400/40 bg-slate-900/95 text-cyan-300' : 'border-white/20 bg-slate-900/95 text-slate-200'"
        >
          <svg v-if="toast.type === 'success'" viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
          {{ toast.text }}
        </div>
      </Transition>
    </div>

    <div class="mx-auto grid max-w-6xl items-stretch gap-4 rounded-3xl border border-white/10 bg-white/5 p-3 shadow-2xl backdrop-blur-xl sm:p-5 lg:grid-cols-2 lg:gap-6">
      <!-- الجانب الأيمن: كارد الصورة -->
      <div class="relative flex items-center p-3 sm:p-5">
        <div class="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
        <div class="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl" />

        <div v-motion :initial="cardM.initial" :enter="cardM.enter" class="relative w-full">
          <div class="float-card relative h-60 overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800 to-cyan-950 shadow-2xl shadow-black/50 sm:h-80 lg:h-[34rem]">
            <img :src="img(IMG.loginHero, 1200)" alt="عيادة زراعة شعر فاخرة وطبيب يعمل بدقة بإضاءة هادئة" class="absolute inset-0 h-full w-full object-cover" loading="eager" @error="hideBroken" />
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-cyan-950/30" />
            <div class="absolute inset-x-0 bottom-0 p-6 sm:p-8">
              <span class="mb-3 block h-1 w-14 rounded-full bg-gradient-to-l from-cyan-400 to-bronze-light" />
              <p class="text-2xl font-bold leading-snug text-white sm:text-3xl">شعرك الجديد... يبدأ من هنا</p>
              <p class="mt-2 text-sm leading-7 text-slate-300">مركز أوريكس لزراعة الشعر — FUE و DHI</p>
            </div>
          </div>
        </div>
      </div>

      <!-- الجانب الأيسر: الفورم -->
      <div v-motion :initial="formM.initial" :enter="formM.enter" class="flex items-center p-1 sm:p-3">
        <div class="w-full rounded-3xl bg-white/95 p-6 text-slate-900 shadow-xl backdrop-blur sm:p-8">
          <!-- مسجّل الدخول -->
          <div v-if="isLoggedIn && user">
            <div class="mb-6 flex items-center gap-4">
              <span class="inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-cyan-600 to-slate-900 text-xl font-bold text-white" aria-hidden="true">
                {{ user.name.charAt(0) }}
              </span>
              <div>
                <h1 class="text-2xl text-slate-900">مرحباً {{ user.name }}</h1>
                <p class="text-sm text-slate-500" dir="ltr">{{ user.email }}</p>
              </div>
            </div>

            <h2 class="mb-3 text-lg text-slate-900">مواعيدي القادمة</h2>
            <ul class="mb-6 space-y-3">
              <li v-for="a in appointments" :key="a.id" class="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div class="mb-1 flex items-center justify-between gap-3">
                  <p class="font-bold text-slate-900">{{ a.service }}</p>
                  <span class="rounded-full bg-cyan-600/10 px-3 py-0.5 text-xs font-bold text-cyan-700">{{ a.status }}</span>
                </div>
                <p class="text-sm text-slate-500">{{ fmtDate(a.date) }} — {{ a.time }}</p>
              </li>
            </ul>

            <div class="flex flex-wrap gap-3">
              <RouterLink to="/booking" :class="BTN_PRIMARY" class="flex-1">احجز موعداً جديداً</RouterLink>
              <button
                type="button"
                class="inline-flex min-h-12 flex-1 items-center justify-center rounded-xl border border-slate-300 font-bold text-slate-700 transition hover:border-red-400 hover:text-red-600 focus-visible:ring-2 focus-visible:ring-cyan-500"
                @click="doLogout"
              >
                تسجيل الخروج
              </button>
            </div>
          </div>

          <!-- Tabs + Forms -->
          <div v-else>
            <h1 class="mb-1 text-2xl text-slate-900">مرحباً بك في أوريكس</h1>
            <p class="mb-6 text-slate-500">سجّل دخولك لتتابع مواعيدك وتحجز بسرعة.</p>

            <div class="relative mb-6 grid grid-cols-2 rounded-xl bg-slate-100 p-1" role="tablist" aria-label="تسجيل الدخول أو إنشاء حساب">
              <span
                class="absolute inset-y-1 right-1 w-[calc(50%-4px)] rounded-lg bg-white shadow transition-transform duration-300"
                :class="tab === 'signup' ? '-translate-x-full' : 'translate-x-0'"
                aria-hidden="true"
              />
              <button type="button" role="tab" :aria-selected="tab === 'signin'" class="relative z-10 min-h-11 rounded-lg font-bold transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-cyan-500" :class="tab === 'signin' ? 'text-cyan-700' : 'text-slate-500'" @click="switchTab('signin')">تسجيل الدخول</button>
              <button type="button" role="tab" :aria-selected="tab === 'signup'" class="relative z-10 min-h-11 rounded-lg font-bold transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-cyan-500" :class="tab === 'signup' ? 'text-cyan-700' : 'text-slate-500'" @click="switchTab('signup')">إنشاء حساب</button>
            </div>

            <Transition name="tab" mode="out-in">
              <!-- Sign In -->
              <form v-if="tab === 'signin'" key="signin" novalidate class="space-y-4" @submit.prevent="submitSignin">
                <p v-if="errors.form" class="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">{{ errors.form }}</p>

                <div>
                  <label for="si-id" class="mb-2 block text-sm font-bold text-slate-700">البريد الإلكتروني أو الهاتف</label>
                  <input id="si-id" v-model="signin.identifier" type="text" autocomplete="username" dir="ltr" :class="[INPUT_CLS, 'text-right']" :aria-invalid="!!errors.identifier" />
                  <p class="mt-1 min-h-5 text-sm text-red-600" role="alert">{{ errors.identifier }}</p>
                </div>

                <div>
                  <label for="si-pass" class="mb-2 block text-sm font-bold text-slate-700">كلمة المرور</label>
                  <div class="relative">
                    <input id="si-pass" v-model="signin.password" :type="showPass ? 'text' : 'password'" autocomplete="current-password" dir="ltr" :class="[INPUT_CLS, 'pl-12 text-right']" :aria-invalid="!!errors.password" />
                    <button type="button" class="absolute left-1 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-lg text-slate-500 hover:text-cyan-700 focus-visible:ring-2 focus-visible:ring-cyan-500" :aria-label="showPass ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'" @click="showPass = !showPass">
                      <svg v-if="!showPass" viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" /><circle cx="12" cy="12" r="3" /></svg>
                      <svg v-else viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.9 10.9 0 0 1 12 19c-7 0-11-7-11-7a19.8 19.8 0 0 1 5.06-5.94M9.9 4.24A10.4 10.4 0 0 1 12 4c7 0 11 7 11 7a19.9 19.9 0 0 1-3.17 4.19M1 1l22 22" /></svg>
                    </button>
                  </div>
                  <p class="mt-1 min-h-5 text-sm text-red-600" role="alert">{{ errors.password }}</p>
                </div>

                <div class="flex items-center justify-between gap-3">
                  <label class="inline-flex min-h-11 cursor-pointer items-center gap-2 text-sm text-slate-600">
                    <input v-model="signin.remember" type="checkbox" class="h-5 w-5 rounded border-slate-300 accent-cyan-600" />
                    تذكرني
                  </label>
                  <button type="button" class="min-h-11 text-sm font-bold text-cyan-700 hover:underline focus-visible:ring-2 focus-visible:ring-cyan-500" @click="showToast('ميزة استعادة كلمة المرور غير متاحة في النسخة التجريبية', 'info')">نسيت كلمة المرور؟</button>
                </div>

                <button type="submit" :class="BTN_PRIMARY" class="w-full disabled:opacity-70" :disabled="loading">
                  {{ loading ? 'جارٍ التحقق...' : 'تسجيل الدخول' }}
                </button>
              </form>

              <!-- Sign Up -->
              <form v-else key="signup" novalidate class="space-y-3" @submit.prevent="submitSignup">
                <p v-if="errors.form" class="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">{{ errors.form }}</p>

                <div>
                  <label for="su-name" class="mb-1.5 block text-sm font-bold text-slate-700">الاسم الكامل</label>
                  <input id="su-name" v-model="signup.name" type="text" autocomplete="name" :class="INPUT_CLS" :aria-invalid="!!errors.name" />
                  <p class="mt-1 min-h-5 text-sm text-red-600" role="alert">{{ errors.name }}</p>
                </div>
                <div>
                  <label for="su-email" class="mb-1.5 block text-sm font-bold text-slate-700">البريد الإلكتروني</label>
                  <input id="su-email" v-model="signup.email" type="email" autocomplete="email" dir="ltr" :class="[INPUT_CLS, 'text-right']" :aria-invalid="!!errors.email" />
                  <p class="mt-1 min-h-5 text-sm text-red-600" role="alert">{{ errors.email }}</p>
                </div>
                <div>
                  <label for="su-phone" class="mb-1.5 block text-sm font-bold text-slate-700">رقم الهاتف</label>
                  <input id="su-phone" v-model="signup.phone" type="tel" autocomplete="tel" dir="ltr" :class="[INPUT_CLS, 'text-right']" :aria-invalid="!!errors.phone" />
                  <p class="mt-1 min-h-5 text-sm text-red-600" role="alert">{{ errors.phone }}</p>
                </div>
                <div class="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label for="su-pass" class="mb-1.5 block text-sm font-bold text-slate-700">كلمة المرور</label>
                    <input id="su-pass" v-model="signup.password" :type="showPass ? 'text' : 'password'" autocomplete="new-password" dir="ltr" :class="[INPUT_CLS, 'text-right']" :aria-invalid="!!errors.password" />
                    <p class="mt-1 min-h-5 text-sm text-red-600" role="alert">{{ errors.password }}</p>
                  </div>
                  <div>
                    <label for="su-confirm" class="mb-1.5 block text-sm font-bold text-slate-700">تأكيد كلمة المرور</label>
                    <input id="su-confirm" v-model="signup.confirm" :type="showPass ? 'text' : 'password'" autocomplete="new-password" dir="ltr" :class="[INPUT_CLS, 'text-right']" :aria-invalid="!!errors.confirm" />
                    <p class="mt-1 min-h-5 text-sm text-red-600" role="alert">{{ errors.confirm }}</p>
                  </div>
                </div>
                <label class="inline-flex min-h-11 cursor-pointer items-center gap-2 text-sm text-slate-600">
                  <input v-model="showPass" type="checkbox" class="h-5 w-5 rounded border-slate-300 accent-cyan-600" />
                  إظهار كلمة المرور
                </label>

                <button type="submit" :class="BTN_PRIMARY" class="w-full disabled:opacity-70" :disabled="loading">
                  {{ loading ? 'جارٍ إنشاء الحساب...' : 'إنشاء الحساب' }}
                </button>
              </form>
            </Transition>

            <!-- Google (اختياري) -->
            <div class="my-5 flex items-center gap-3 text-sm text-slate-400">
              <span class="h-px flex-1 bg-slate-200" /> أو <span class="h-px flex-1 bg-slate-200" />
            </div>
            <button
              type="button"
              class="inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-xl border border-slate-300 bg-white font-bold text-slate-700 transition hover:border-cyan-500 hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-cyan-500"
              @click="showToast('الدخول عبر Google غير متاح في النسخة التجريبية', 'info')"
            >
              <svg viewBox="0 0 24 24" class="h-5 w-5" aria-hidden="true">
                <path fill="#4285F4" d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.46a5.52 5.52 0 0 1-2.4 3.62v3h3.88c2.27-2.09 3.58-5.17 3.58-8.81z" />
                <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.94-2.91l-3.88-3a7.2 7.2 0 0 1-10.7-3.77H1.4v3.09A12 12 0 0 0 12 24z" />
                <path fill="#FBBC05" d="M5.36 14.32a7.2 7.2 0 0 1 0-4.64V6.59H1.4a12 12 0 0 0 0 10.82l3.96-3.09z" />
                <path fill="#EA4335" d="M12 4.75c1.76 0 3.34.6 4.58 1.8l3.44-3.44A11.5 11.5 0 0 0 12 0 12 12 0 0 0 1.4 6.59l3.96 3.09A7.2 7.2 0 0 1 12 4.75z" />
              </svg>
              المتابعة عبر Google
            </button>

            <p class="mt-5 text-center text-xs leading-6 text-slate-500">
              حساب تجريبي: <span dir="ltr" class="font-bold text-slate-700">demo@oryx.com / 123456</span>
              <button type="button" class="mr-2 min-h-11 font-bold text-cyan-700 hover:underline" @click="fillDemo; switchTab('signin')">تعبئة تلقائية</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tab-enter-active,
.tab-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.tab-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.tab-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

.toast-enter-active,
.toast-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(-14px);
}
</style>