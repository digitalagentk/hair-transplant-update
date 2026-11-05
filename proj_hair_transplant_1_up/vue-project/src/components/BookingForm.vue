<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import { BTN_PRIMARY, INPUT_CLS, SERVICES, TIMES } from '../utils/helpers'

const route = useRoute()
const { user, addBooking } = useAuth()

const pad = (n: number) => String(n).padStart(2, '0')
const t = new Date()
const minDate = `${t.getFullYear()}-${pad(t.getMonth() + 1)}-${pad(t.getDate())}`

const form = reactive({ name: '', phone: '', service: '', date: '', time: '', notes: '' })
const errors = reactive<Record<string, string>>({})
const loading = ref(false)
const success = ref(false)

const pkgName = typeof route.query.pkg === 'string' ? route.query.pkg : ''
if (typeof route.query.service === 'string' && SERVICES.includes(route.query.service)) {
  form.service = route.query.service
}

// Auto-fill من useAuth
watch(
  user,
  (u) => {
    if (u) {
      if (!form.name) form.name = u.name
      if (!form.phone) form.phone = u.phone
    }
  },
  { immediate: true },
)

function validate() {
  Object.keys(errors).forEach((k) => delete errors[k])
  if (form.name.trim().length < 3) errors.name = 'يرجى إدخال الاسم الكامل (3 أحرف على الأقل).'
  if (!/^\+?[\d\s-]{9,16}$/.test(form.phone.trim())) errors.phone = 'يرجى إدخال رقم هاتف صحيح.'
  if (!form.service) errors.service = 'اختر التقنية المطلوب الاستفسار عنها.'
  if (!form.date) errors.date = 'اختر تاريخ الزيارة المفضل.'
  else if (form.date < minDate) errors.date = 'لا يمكن اختيار تاريخ سابق.'
  if (!form.time) errors.time = 'اختر وقت الزيارة المفضل.'
  return Object.keys(errors).length === 0
}

function submit() {
  if (!validate()) return
  loading.value = true
  setTimeout(() => {
    addBooking({
      name: form.name.trim(),
      phone: form.phone.trim(),
      service: form.service,
      date: form.date,
      time: form.time,
      notes: form.notes.trim(),
      packageName: pkgName || undefined,
    })
    loading.value = false
    success.value = true
  }, 900)
}

function reset() {
  form.service = ''
  form.date = ''
  form.time = ''
  form.notes = ''
  success.value = false
}
</script>

<template>
  <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-8">
    <!-- حالة النجاح -->
    <div v-if="success" class="success-pop flex flex-col items-center py-10 text-center" role="status">
      <span class="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-cyan-700 text-white shadow-lg shadow-cyan-600/30">
        <svg viewBox="0 0 24 24" class="h-10 w-10" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
      </span>
      <h2 class="mb-3 text-2xl text-slate-900">تم استلام طلبك بنجاح</h2>
      <p class="max-w-md leading-8 text-slate-500">
        تم استلام طلبك بنجاح، سيتواصل معك منسق المركز خلال ساعة لتأكيد موعدك.
      </p>
      <button type="button" :class="BTN_PRIMARY" class="mt-8" @click="reset">طلب موعد آخر</button>
    </div>

    <!-- الفورم -->
    <form v-else novalidate @submit.prevent="submit">
      <h2 class="mb-1 text-2xl text-slate-900">بيانات الحجز</h2>
      <p class="mb-6 text-slate-500">املأ النموذج وسنؤكد موعدك خلال ساعة.</p>

      <p v-if="pkgName" class="mb-5 rounded-xl border border-cyan-600/20 bg-cyan-50 px-4 py-3 text-sm font-bold text-cyan-800">
        الباقة المختارة: {{ pkgName }}
      </p>
      <p v-if="!user" class="mb-5 text-sm text-slate-500">
        لديك حساب؟
        <RouterLink :to="{ path: '/login', query: { redirect: '/booking' } }" class="font-bold text-cyan-700 underline underline-offset-4">
          سجّل الدخول
        </RouterLink>
        لتعبئة اسمك ورقمك تلقائياً.
      </p>

      <div class="grid gap-5 sm:grid-cols-2">
        <div>
          <label for="bk-name" class="mb-2 block text-sm font-bold text-slate-700">الاسم الكامل</label>
          <input id="bk-name" v-model="form.name" type="text" autocomplete="name" :class="INPUT_CLS" :aria-invalid="!!errors.name" aria-describedby="bk-name-err" />
          <p id="bk-name-err" class="mt-1 min-h-5 text-sm text-red-600" role="alert">{{ errors.name }}</p>
        </div>

        <div>
          <label for="bk-phone" class="mb-2 block text-sm font-bold text-slate-700">رقم الهاتف</label>
          <input id="bk-phone" v-model="form.phone" type="tel" autocomplete="tel" dir="ltr" placeholder="07XX XXX XXXX" :class="[INPUT_CLS, 'text-right']" :aria-invalid="!!errors.phone" aria-describedby="bk-phone-err" />
          <p id="bk-phone-err" class="mt-1 min-h-5 text-sm text-red-600" role="alert">{{ errors.phone }}</p>
        </div>

        <div class="sm:col-span-2">
          <label for="bk-service" class="mb-2 block text-sm font-bold text-slate-700">التقنية المطلوب الاستفسار عنها</label>
          <select id="bk-service" v-model="form.service" :class="INPUT_CLS" :aria-invalid="!!errors.service" aria-describedby="bk-service-err">
            <option value="" disabled>اختر من القائمة</option>
            <option v-for="s in SERVICES" :key="s" :value="s">{{ s }}</option>
          </select>
          <p id="bk-service-err" class="mt-1 min-h-5 text-sm text-red-600" role="alert">{{ errors.service }}</p>
        </div>

        <div>
          <label for="bk-date" class="mb-2 block text-sm font-bold text-slate-700">تاريخ الزيارة المفضل</label>
          <input id="bk-date" v-model="form.date" type="date" :min="minDate" :class="INPUT_CLS" :aria-invalid="!!errors.date" aria-describedby="bk-date-err" />
          <p id="bk-date-err" class="mt-1 min-h-5 text-sm text-red-600" role="alert">{{ errors.date }}</p>
        </div>

        <div>
          <label for="bk-time" class="mb-2 block text-sm font-bold text-slate-700">وقت الزيارة المفضل</label>
          <select id="bk-time" v-model="form.time" :class="INPUT_CLS" :aria-invalid="!!errors.time" aria-describedby="bk-time-err">
            <option value="" disabled>اختر الوقت</option>
            <option v-for="x in TIMES" :key="x" :value="x">{{ x }}</option>
          </select>
          <p id="bk-time-err" class="mt-1 min-h-5 text-sm text-red-600" role="alert">{{ errors.time }}</p>
        </div>

        <div class="sm:col-span-2">
          <label for="bk-notes" class="mb-2 block text-sm font-bold text-slate-700">ملاحظات (اختياري)</label>
          <textarea
            id="bk-notes"
            v-model="form.notes"
            rows="4"
            placeholder="أي تفاصيل تود إخبارنا بها عن حالتك..."
            class="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 transition focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
          />
        </div>
      </div>

      <button type="submit" :class="BTN_PRIMARY" class="mt-4 w-full disabled:cursor-wait disabled:opacity-70" :disabled="loading">
        <span v-if="!loading">تأكيد طلب الموعد</span>
        <span v-else class="inline-flex items-center gap-2">
          <svg viewBox="0 0 24 24" class="h-5 w-5 animate-spin" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M12 3a9 9 0 1 0 9 9" /></svg>
          جارٍ الإرسال...
        </span>
      </button>
    </form>
  </div>
</template>

<style scoped>
.success-pop {
  animation: scaleIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
}
@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.85); }
  to { opacity: 1; transform: scale(1); }
}
</style>