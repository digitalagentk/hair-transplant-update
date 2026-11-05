<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import SmartImage from '../components/SmartImage.vue'
import { PHOTOS, treatmentLabel, timeLabel, formatDate } from '../data/content'

const route = useRoute()
const router = useRouter()
const { user, isLoggedIn, bookings, login, register, logout } = useAuth()

const tab = ref<'signin' | 'signup'>('signin')
const showPass = ref(false)
const showPass2 = ref(false)
const loading = ref(false)

const signIn = reactive({ identifier: '', password: '', remember: true })
const signUp = reactive({ name: '', email: '', phone: '', password: '', confirm: '' })
const errors = reactive<Record<string, string>>({})

const toast = reactive({ show: false, message: '', type: 'success' as 'success' | 'error' | 'info' })
let toastTimer: ReturnType<typeof setTimeout> | undefined

function showToast(message: string, type: 'success' | 'error' | 'info' = 'success') {
  toast.message = message
  toast.type = type
  toast.show = true
  if (toastTimer) clearTimeout(toastTimer)
  toastTimer = setTimeout(() => (toast.show = false), 2800)
}

const clearErrors = () => Object.keys(errors).forEach((k) => delete errors[k])
watch(tab, clearErrors)

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))

function redirectTarget(): string {
  const q = route.query.redirect
  if (typeof q === 'string' && q.startsWith('/')) return q
  const back = router.options.history.state.back
  return back === '/booking' ? '/booking' : '/'
}

function fillDemo() {
  signIn.identifier = 'demo@revive.com'
  signIn.password = '123456'
  clearErrors()
}

async function submitSignIn() {
  clearErrors()
  if (!signIn.identifier.trim()) errors.identifier = 'أدخل البريد الإلكتروني أو رقم الهاتف'
  if (signIn.password.length < 6) errors.password = 'كلمة المرور لا تقل عن 6 أحرف'
  if (Object.keys(errors).length) return

  loading.value = true
  await wait(700)
  const res = login(signIn.identifier, signIn.password, signIn.remember)
  loading.value = false

  if (!res.ok) {
    errors.password = res.error
    showToast(res.error, 'error')
    return
  }
  showToast(`تم تسجيل الدخول بنجاح، أهلاً ${res.user.name}`)
  setTimeout(() => router.push(redirectTarget()), 1000)
}

async function submitSignUp() {
  clearErrors()
  if (signUp.name.trim().length < 3) errors.name = 'أدخل الاسم الكامل'
  if (!/^\S+@\S+\.\S+$/.test(signUp.email.trim())) errors.email = 'أدخل بريداً إلكترونياً صحيحاً'
  if (signUp.phone.replace(/\D/g, '').length < 8) errors.phone = 'أدخل رقم هاتف صحيح'
  if (signUp.password.length < 6) errors.password = 'كلمة المرور لا تقل عن 6 أحرف'
  if (signUp.confirm !== signUp.password) errors.confirm = 'كلمتا المرور غير متطابقتين'
  if (Object.keys(errors).length) return

  loading.value = true
  await wait(800)
  const res = register({ name: signUp.name, email: signUp.email, phone: signUp.phone, password: signUp.password })
  loading.value = false

  if (!res.ok) {
    errors.email = res.error
    showToast(res.error, 'error')
    return
  }
  showToast('تم إنشاء حسابك بنجاح')
  setTimeout(() => router.push(redirectTarget()), 1000)
}

function onLogout() {
  logout()
  showToast('تم تسجيل الخروج', 'info')
}

// مواعيدي القادمة (Mock): الحجوزات المخزّنة، أو موعد توضيحي إن لم يوجد
const upcoming = computed(() => {
  if (bookings.value.length) {
    return bookings.value.slice(0, 3).map((b) => ({
      id: b.id,
      treatment: treatmentLabel(b.treatment),
      date: formatDate(b.date),
      time: timeLabel(b.time),
    }))
  }
  const d = new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10)
  return [{ id: 'mock', treatment: 'استشارة وفحص فروة الرأس', date: formatDate(d), time: 'مساءً' }]
})
</script>

<template>
  <section class="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-teal-950 to-blue-950 px-4 py-10 sm:py-14">
    <div class="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-teal-500/10 blur-3xl"></div>
    <div class="pointer-events-none absolute -bottom-32 left-0 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl"></div>

    <!-- Toast -->
    <Transition name="toast">
      <div
        v-if="toast.show"
        role="status"
        aria-live="polite"
        class="fixed inset-x-0 top-20 z-[60] mx-auto flex w-fit max-w-[90vw] items-center gap-2 rounded-2xl px-5 py-3 text-sm font-bold text-white shadow-2xl"
        :class="toast.type === 'error' ? 'bg-red-600' : toast.type === 'info' ? 'bg-slate-700' : 'bg-gradient-to-r from-teal-600 to-emerald-600'"
      >
        <svg v-if="toast.type === 'success'" viewBox="0 0 20 20" class="h-5 w-5 shrink-0" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0L3.3 9.7a1 1 0 1 1 1.4-1.4l3.8 3.8 6.8-6.8a1 1 0 0 1 1.4 0z" clip-rule="evenodd" />
        </svg>
        {{ toast.message }}
      </div>
    </Transition>

    <!-- البطاقة الزجاجية الكبيرة -->
    <div class="relative mx-auto max-w-6xl rounded-3xl border border-white/10 bg-white/5 p-4 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-6 lg:p-8">
      <div class="grid items-center gap-8 lg:grid-cols-2">
        <!-- الجانب الأيمن: كارد الصورة -->
        <div class="order-2 p-2 lg:order-1 lg:p-6">
          <div
            v-motion
            :initial="{ opacity: 0, x: 40, scale: 0.96 }"
            :enter="{ opacity: 1, x: 0, scale: 1, transition: { duration: 800, ease: 'easeOut' } }"
            class="relative"
          >
            <!-- halo glow -->
            <div class="halo absolute -inset-6 rounded-[2.5rem] bg-teal-500/20 blur-3xl"></div>
            <div class="absolute -bottom-10 -left-10 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl"></div>

            <div class="float-login relative">
              <div class="relative overflow-hidden rounded-3xl shadow-2xl ring-1 ring-white/10">
                <div class="h-72 sm:h-96 lg:h-[34rem]">
                  <SmartImage :photo="PHOTOS.hero" eager />
                </div>
                <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-teal-950 via-teal-950/50 to-transparent"></div>
                <div class="pointer-events-none absolute inset-x-0 bottom-0 p-6 sm:p-8">
                  <p class="text-sm font-bold text-teal-300">عيادة ريفايف</p>
                  <p class="mt-2 text-2xl font-bold leading-snug text-white sm:text-3xl">شعرك... يستحق فرصة جديدة</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- الجانب الأيسر: بطاقة الفورم -->
        <div
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 800, delay: 150 } }"
          class="order-1 lg:order-2"
        >
          <div class="rounded-3xl bg-white/95 p-6 shadow-2xl shadow-black/20 backdrop-blur sm:p-8">
            <!-- مسجّل مسبقاً -->
            <div v-if="isLoggedIn && user" class="pop-in">
              <div class="flex items-center gap-4">
                <div class="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-slate-900 text-xl font-bold text-white" aria-hidden="true">
                  {{ user.name.charAt(0) }}
                </div>
                <div class="min-w-0">
                  <h1 class="truncate text-2xl text-slate-900">مرحباً {{ user.name }}</h1>
                  <p class="truncate text-sm text-slate-500">{{ user.email }}</p>
                </div>
              </div>

              <div class="mt-6 rounded-2xl border border-teal-100 bg-aqua p-5">
                <h2 class="text-lg text-slate-900">مواعيدي القادمة</h2>
                <ul class="mt-3 space-y-3">
                  <li v-for="a in upcoming" :key="a.id" class="rounded-xl bg-white p-4 shadow-sm">
                    <p class="font-bold text-slate-900">{{ a.treatment }}</p>
                    <p class="mt-1 text-sm text-slate-500">{{ a.date }} — {{ a.time }}</p>
                  </li>
                </ul>
              </div>

              <div class="mt-6 flex flex-wrap gap-3">
                <RouterLink to="/booking" class="btn-primary flex-1">احجز استشارتك</RouterLink>
                <button type="button" class="min-h-[44px] flex-1 rounded-xl border border-slate-300 px-6 py-3 font-bold text-slate-700 transition hover:border-red-400 hover:bg-red-50 hover:text-red-600" @click="onLogout">
                  تسجيل الخروج
                </button>
              </div>
            </div>

            <!-- Tabs + الفورمات -->
            <div v-else>
              <div role="tablist" aria-label="الدخول أو إنشاء حساب" class="relative grid grid-cols-2 rounded-2xl bg-slate-100 p-1">
                <span
                  aria-hidden="true"
                  class="absolute inset-y-1 right-1 w-[calc(50%-0.25rem)] rounded-xl bg-gradient-to-r from-teal-600 to-slate-900 shadow transition-transform duration-300 ease-out"
                  :class="tab === 'signup' ? '-translate-x-full' : ''"
                ></span>
                <button
                  id="tab-signin"
                  type="button"
                  role="tab"
                  :aria-selected="tab === 'signin'"
                  class="relative z-10 min-h-[44px] rounded-xl text-sm font-bold transition-colors duration-300"
                  :class="tab === 'signin' ? 'text-white' : 'text-slate-600'"
                  @click="tab = 'signin'"
                >
                  تسجيل الدخول
                </button>
                <button
                  id="tab-signup"
                  type="button"
                  role="tab"
                  :aria-selected="tab === 'signup'"
                  class="relative z-10 min-h-[44px] rounded-xl text-sm font-bold transition-colors duration-300"
                  :class="tab === 'signup' ? 'text-white' : 'text-slate-600'"
                  @click="tab = 'signup'"
                >
                  حساب جديد
                </button>
              </div>

              <Transition name="tab" mode="out-in">
                <!-- Sign In -->
                <form v-if="tab === 'signin'" key="signin" class="mt-6 space-y-5" novalidate role="tabpanel" aria-labelledby="tab-signin" @submit.prevent="submitSignIn">
                  <h1 class="text-2xl text-slate-900">أهلاً بعودتك</h1>

                  <div>
                    <label for="si-id" class="field-label">البريد الإلكتروني أو رقم الهاتف</label>
                    <input id="si-id" v-model="signIn.identifier" type="text" autocomplete="username" class="field" :class="{ 'field-invalid': errors.identifier }" :aria-invalid="!!errors.identifier" aria-describedby="si-id-err" />
                    <p v-if="errors.identifier" id="si-id-err" class="field-error">{{ errors.identifier }}</p>
                  </div>

                  <div>
                    <label for="si-pass" class="field-label">كلمة المرور</label>
                    <div class="relative">
                      <input id="si-pass" v-model="signIn.password" :type="showPass ? 'text' : 'password'" autocomplete="current-password" class="field pl-14" :class="{ 'field-invalid': errors.password }" :aria-invalid="!!errors.password" aria-describedby="si-pass-err" />
                      <button type="button" class="absolute left-1 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-lg text-slate-500 transition hover:text-teal-600" :aria-label="showPass ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'" @click="showPass = !showPass">
                        <svg v-if="!showPass" viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                        <svg v-else viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><path d="M1 1l22 22" /></svg>
                      </button>
                    </div>
                    <p v-if="errors.password" id="si-pass-err" class="field-error">{{ errors.password }}</p>
                  </div>

                  <div class="flex flex-wrap items-center justify-between gap-3">
                    <label for="si-remember" class="flex min-h-[44px] cursor-pointer items-center gap-2 text-sm text-slate-700">
                      <input id="si-remember" v-model="signIn.remember" type="checkbox" class="h-5 w-5 rounded border-slate-300 accent-teal-600" />
                      تذكرني
                    </label>
                    <button type="button" class="min-h-[44px] text-sm font-bold text-teal-600 hover:underline" @click="showToast('ميزة استعادة كلمة المرور غير متاحة في النسخة التجريبية', 'info')">
                      نسيت كلمة المرور؟
                    </button>
                  </div>

                  <button type="submit" class="btn-primary w-full" :disabled="loading">
                    {{ loading ? 'جارٍ التحقق...' : 'تسجيل الدخول' }}
                  </button>

                  <div class="flex items-center gap-3 text-sm text-slate-400" aria-hidden="true">
                    <span class="h-px flex-1 bg-slate-200"></span>أو<span class="h-px flex-1 bg-slate-200"></span>
                  </div>

                  <button type="button" class="flex min-h-[44px] w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white font-bold text-slate-700 transition hover:border-teal-400 hover:bg-aqua" @click="showToast('الدخول عبر Google غير متاح في النسخة التجريبية', 'info')">
                    <svg viewBox="0 0 24 24" class="h-5 w-5" aria-hidden="true">
                      <path fill="#4285F4" d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.46a5.52 5.52 0 0 1-2.4 3.62v3h3.88c2.27-2.09 3.58-5.17 3.58-8.81z" />
                      <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.94-2.91l-3.88-3a7.2 7.2 0 0 1-10.7-3.78H1.34v3.09A12 12 0 0 0 12 24z" />
                      <path fill="#FBBC05" d="M5.36 14.31a7.2 7.2 0 0 1 0-4.62V6.6H1.34a12 12 0 0 0 0 10.8l4.02-3.09z" />
                      <path fill="#EA4335" d="M12 4.75c1.76 0 3.34.6 4.58 1.79l3.43-3.43A11.5 11.5 0 0 0 12 0 12 12 0 0 0 1.34 6.6l4.02 3.1A7.15 7.15 0 0 1 12 4.75z" />
                    </svg>
                    المتابعة عبر Google
                  </button>

                  <p class="text-center text-xs leading-6 text-slate-500">
                    حساب تجريبي: <span dir="ltr" class="font-bold text-slate-700">demo@revive.com / 123456</span>
                    <button type="button" class="mr-2 font-bold text-teal-600 hover:underline" @click="fillDemo">تعبئة تلقائية</button>
                  </p>
                </form>

                <!-- Sign Up -->
                <form v-else key="signup" class="mt-6 space-y-5" novalidate role="tabpanel" aria-labelledby="tab-signup" @submit.prevent="submitSignUp">
                  <h1 class="text-2xl text-slate-900">إنشاء حساب جديد</h1>

                  <div>
                    <label for="su-name" class="field-label">الاسم الكامل</label>
                    <input id="su-name" v-model="signUp.name" type="text" autocomplete="name" class="field" :class="{ 'field-invalid': errors.name }" :aria-invalid="!!errors.name" aria-describedby="su-name-err" />
                    <p v-if="errors.name" id="su-name-err" class="field-error">{{ errors.name }}</p>
                  </div>

                  <div>
                    <label for="su-email" class="field-label">البريد الإلكتروني</label>
                    <input id="su-email" v-model="signUp.email" type="email" autocomplete="email" class="field" :class="{ 'field-invalid': errors.email }" :aria-invalid="!!errors.email" aria-describedby="su-email-err" />
                    <p v-if="errors.email" id="su-email-err" class="field-error">{{ errors.email }}</p>
                  </div>

                  <div>
                    <label for="su-phone" class="field-label">رقم الهاتف</label>
                    <input id="su-phone" v-model="signUp.phone" type="tel" inputmode="tel" autocomplete="tel" class="field" :class="{ 'field-invalid': errors.phone }" :aria-invalid="!!errors.phone" aria-describedby="su-phone-err" />
                    <p v-if="errors.phone" id="su-phone-err" class="field-error">{{ errors.phone }}</p>
                  </div>

                  <div>
                    <label for="su-pass" class="field-label">كلمة المرور</label>
                    <div class="relative">
                      <input id="su-pass" v-model="signUp.password" :type="showPass2 ? 'text' : 'password'" autocomplete="new-password" class="field pl-14" :class="{ 'field-invalid': errors.password }" :aria-invalid="!!errors.password" aria-describedby="su-pass-err" />
                      <button type="button" class="absolute left-1 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-lg text-slate-500 transition hover:text-teal-600" :aria-label="showPass2 ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'" @click="showPass2 = !showPass2">
                        <svg v-if="!showPass2" viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                        <svg v-else viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><path d="M1 1l22 22" /></svg>
                      </button>
                    </div>
                    <p v-if="errors.password" id="su-pass-err" class="field-error">{{ errors.password }}</p>
                  </div>

                  <div>
                    <label for="su-confirm" class="field-label">تأكيد كلمة المرور</label>
                    <input id="su-confirm" v-model="signUp.confirm" :type="showPass2 ? 'text' : 'password'" autocomplete="new-password" class="field" :class="{ 'field-invalid': errors.confirm }" :aria-invalid="!!errors.confirm" aria-describedby="su-confirm-err" />
                    <p v-if="errors.confirm" id="su-confirm-err" class="field-error">{{ errors.confirm }}</p>
                  </div>

                  <button type="submit" class="btn-primary w-full" :disabled="loading">
                    {{ loading ? 'جارٍ إنشاء الحساب...' : 'إنشاء الحساب' }}
                  </button>
                </form>
              </Transition>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.tab-enter-active,
.tab-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.tab-enter-from {
  opacity: 0;
  transform: translateX(-14px);
}
.tab-leave-to {
  opacity: 0;
  transform: translateX(14px);
}

.toast-enter-active,
.toast-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}
</style>