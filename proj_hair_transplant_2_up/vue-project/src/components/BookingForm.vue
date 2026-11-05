<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import type { ServiceOption, TimeSlot } from '../types'

const services: ServiceOption[] = ['زراعة لحية', 'تكثيف شارب', 'ملء فراغات', 'إصلاح ندوب الوجه', 'استشارة عامة']
const slots: TimeSlot[] = ['صباحاً', 'ظهراً', 'مساءً']

const route = useRoute()
const { user, isLoggedIn, addBooking } = useAuth()

const d = new Date()
const today = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`

const form = reactive({
  name: '',
  phone: '',
  service: '' as ServiceOption | '',
  date: '',
  time: '' as TimeSlot | '',
  notes: '',
})
const errors = reactive<Record<string, string>>({})
const submitting = ref(false)
const submitted = ref(false)

// Auto-fill من useAuth (دون الكتابة فوق ما أدخله المستخدم)
watch(
  user,
  (u) => {
    if (!u) return
    if (!form.name) form.name = u.name
    if (!form.phone) form.phone = u.phone
  },
  { immediate: true },
)

onMounted(() => {
  const s = route.query.service
  if (typeof s === 'string' && (services as string[]).includes(s)) form.service = s as ServiceOption
  const p = route.query.pkg
  if (typeof p === 'string' && !form.notes) form.notes = `الباقة المطلوبة: ${p}`
})

function validate(): boolean {
  Object.keys(errors).forEach((k) => delete errors[k])
  if (form.name.trim().length < 3) errors.name = 'يرجى إدخال الاسم الكامل.'
  if (digitsOnly(form.phone).length < 8) errors.phone = 'يرجى إدخال رقم هاتف صحيح.'
  if (!form.service) errors.service = 'اختر التقنية المطلوب الاستفسار عنها.'
  if (!form.date) errors.date = 'اختر تاريخ الزيارة المفضل.'
  else if (form.date < today) errors.date = 'لا يمكن اختيار تاريخ سابق.'
  if (!form.time) errors.time = 'اختر وقت الزيارة المفضل.'
  return Object.keys(errors).length === 0
}

function digitsOnly(v: string) {
  return v.replace(/\D/g, '')
}

async function submit() {
  if (!validate() || submitting.value) return
  submitting.value = true
  await new Promise((r) => setTimeout(r, 900))
  addBooking({
    name: form.name.trim(),
    phone: form.phone.trim(),
    service: form.service as ServiceOption,
    date: form.date,
    time: form.time as TimeSlot,
    notes: form.notes.trim() || undefined,
  })
  submitting.value = false
  submitted.value = true
}

function reset() {
  form.service = ''
  form.date = ''
  form.time = ''
  form.notes = ''
  submitted.value = false
}
</script>

<template>
  <div class="rounded-3xl bg-[#FAF7F2] p-6 shadow-2xl shadow-black/20 sm:p-8">
    <!-- حالة النجاح -->
    <div v-if="submitted" class="flex flex-col items-center py-10 text-center" role="status">
      <div class="pop-in flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-yellow-600 to-zinc-900 shadow-[0_0_40px_rgba(212,165,116,0.5)]">
        <svg viewBox="0 0 24 24" class="h-12 w-12 text-white" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h3 class="pop-in mt-6 text-2xl font-bold text-stone-900" style="animation-delay: 0.15s">تم استلام طلبك بنجاح</h3>
      <p class="pop-in mt-3 max-w-md leading-8 text-stone-500" style="animation-delay: 0.25s">
        سيتواصل معك منسق المركز خلال ساعة لتأكيد موعدك.
      </p>
      <button type="button" class="btn-copper mt-8" @click="reset">حجز موعد آخر</button>
    </div>

    <!-- الفورم -->
    <form v-else novalidate @submit.prevent="submit">
      <h2 class="text-2xl font-bold text-stone-900">احجز استشارتك المجانية</h2>
      <p class="mt-2 text-sm leading-7 text-stone-500">املأ البيانات التالية وسيؤكد لك منسق المركز الموعد داخل العيادة.</p>

      <p v-if="!isLoggedIn" class="mt-4 rounded-xl border border-yellow-700/30 bg-yellow-50 px-4 py-3 text-sm text-stone-700">
        لديك حساب؟
        <RouterLink :to="{ path: '/login', query: { redirect: '/booking' } }" class="font-bold text-yellow-800 underline underline-offset-4">سجّل الدخول</RouterLink>
        لتعبئة اسمك ورقمك تلقائياً.
      </p>

      <div class="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <label for="b-name" class="field-label">الاسم الكامل</label>
          <input id="b-name" v-model="form.name" type="text" class="field" autocomplete="name" :aria-invalid="!!errors.name" aria-describedby="b-name-err" />
          <p id="b-name-err" class="mt-1 min-h-5 text-xs font-bold text-red-700" role="alert">{{ errors.name }}</p>
        </div>

        <div>
          <label for="b-phone" class="field-label">رقم الهاتف</label>
          <input id="b-phone" v-model="form.phone" type="tel" dir="ltr" class="field text-right" autocomplete="tel" placeholder="07XX XXX XXXX" :aria-invalid="!!errors.phone" aria-describedby="b-phone-err" />
          <p id="b-phone-err" class="mt-1 min-h-5 text-xs font-bold text-red-700" role="alert">{{ errors.phone }}</p>
        </div>

        <div class="sm:col-span-2">
          <label for="b-service" class="field-label">التقنية المطلوب الاستفسار عنها</label>
          <select id="b-service" v-model="form.service" class="field" :aria-invalid="!!errors.service" aria-describedby="b-service-err">
            <option value="" disabled>اختر من القائمة</option>
            <option v-for="s in services" :key="s" :value="s">{{ s }}</option>
          </select>
          <p id="b-service-err" class="mt-1 min-h-5 text-xs font-bold text-red-700" role="alert">{{ errors.service }}</p>
        </div>

        <div>
          <label for="b-date" class="field-label">تاريخ الزيارة المفضل</label>
          <input id="b-date" v-model="form.date" type="date" :min="today" class="field" :aria-invalid="!!errors.date" aria-describedby="b-date-err" />
          <p id="b-date-err" class="mt-1 min-h-5 text-xs font-bold text-red-700" role="alert">{{ errors.date }}</p>
        </div>

        <div>
          <label for="b-time" class="field-label">وقت الزيارة المفضل</label>
          <select id="b-time" v-model="form.time" class="field" :aria-invalid="!!errors.time" aria-describedby="b-time-err">
            <option value="" disabled>اختر الوقت</option>
            <option v-for="t in slots" :key="t" :value="t">{{ t }}</option>
          </select>
          <p id="b-time-err" class="mt-1 min-h-5 text-xs font-bold text-red-700" role="alert">{{ errors.time }}</p>
        </div>

        <div class="sm:col-span-2">
          <label for="b-notes" class="field-label">ملاحظات <span class="font-medium text-stone-400">(اختياري)</span></label>
          <textarea id="b-notes" v-model="form.notes" rows="4" class="field py-3" placeholder="أخبرنا بحالتك أو أي استفسار لديك"></textarea>
        </div>
      </div>

      <button type="submit" class="btn-copper mt-4 w-full text-lg disabled:cursor-not-allowed disabled:opacity-70" :disabled="submitting">
        <svg v-if="submitting" viewBox="0 0 24 24" class="h-5 w-5 animate-spin" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" aria-hidden="true">
          <path d="M12 3a9 9 0 1 0 9 9" />
        </svg>
        {{ submitting ? 'جارٍ الإرسال...' : 'تأكيد طلب الموعد' }}
      </button>
    </form>
  </div>
</template>