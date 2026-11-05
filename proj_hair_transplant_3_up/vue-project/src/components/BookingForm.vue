<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import { TREATMENTS, TIME_SLOTS, treatmentLabel, timeLabel, formatDate } from '../data/content'
import type { Booking } from '../types'

const route = useRoute()
const { user, addBooking } = useAuth()

const form = reactive({ name: '', phone: '', treatment: '', date: '', time: '', notes: '' })
const errors = reactive<Record<string, string>>({})
const submitting = ref(false)
const submitted = ref(false)
const lastBooking = ref<Booking | null>(null)
const today = new Date().toISOString().slice(0, 10)

// Auto-fill من الحساب
watch(
  user,
  (u) => {
    if (!u) return
    if (!form.name) form.name = u.name
    if (!form.phone) form.phone = u.phone
  },
  { immediate: true },
)

// اختيار علاج مسبق من صفحة الباقات (?treatment=prp)
watch(
  () => route.query.treatment,
  (q) => {
    if (typeof q === 'string' && TREATMENTS.some((t) => t.value === q)) form.treatment = q
  },
  { immediate: true },
)

function validate() {
  Object.keys(errors).forEach((k) => delete errors[k])
  if (form.name.trim().length < 3) errors.name = 'يرجى إدخال الاسم الكامل'
  if (form.phone.replace(/\D/g, '').length < 8) errors.phone = 'يرجى إدخال رقم هاتف صحيح'
  if (!form.treatment) errors.treatment = 'يرجى اختيار العلاج المطلوب'
  if (!form.date) errors.date = 'يرجى اختيار تاريخ الزيارة'
  else if (form.date < today) errors.date = 'لا يمكن اختيار تاريخ سابق'
  if (!form.time) errors.time = 'يرجى اختيار وقت الزيارة'
  return Object.keys(errors).length === 0
}

async function submit() {
  if (!validate()) return
  submitting.value = true
  await new Promise((r) => setTimeout(r, 900))
  lastBooking.value = addBooking({
    name: form.name.trim(),
    phone: form.phone.trim(),
    treatment: form.treatment,
    date: form.date,
    time: form.time,
    notes: form.notes.trim() || undefined,
  })
  submitting.value = false
  submitted.value = true
}

function reset() {
  form.treatment = ''
  form.date = ''
  form.time = ''
  form.notes = ''
  submitted.value = false
  lastBooking.value = null
}
</script>

<template>
  <div class="rounded-3xl border border-teal-100 bg-white p-6 shadow-xl shadow-teal-900/5 sm:p-8">
    <Transition name="swap" mode="out-in">
      <!-- حالة النجاح -->
      <div v-if="submitted && lastBooking" key="ok" class="pop-in py-4 text-center" role="status">
        <div class="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-cyan-600 shadow-xl shadow-teal-500/30">
          <svg viewBox="0 0 24 24" class="h-12 w-12" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path class="draw-check" d="M5 12.5l4.5 4.5L19 7.5" />
          </svg>
        </div>
        <h2 class="mt-6 text-2xl font-bold text-slate-900">تم استلام طلبك بنجاح</h2>
        <p class="mx-auto mt-3 max-w-md leading-8 text-slate-500">
          سيتواصل معك منسق العيادة خلال ساعة لتأكيد موعدك.
        </p>

        <dl class="mx-auto mt-6 max-w-sm divide-y divide-teal-100 rounded-2xl bg-aqua px-5 text-start text-sm">
          <div class="flex justify-between gap-4 py-3"><dt class="text-slate-500">العلاج</dt><dd class="font-bold">{{ treatmentLabel(lastBooking.treatment) }}</dd></div>
          <div class="flex justify-between gap-4 py-3"><dt class="text-slate-500">التاريخ</dt><dd class="font-bold">{{ formatDate(lastBooking.date) }}</dd></div>
          <div class="flex justify-between gap-4 py-3"><dt class="text-slate-500">الوقت</dt><dd class="font-bold">{{ timeLabel(lastBooking.time) }}</dd></div>
        </dl>

        <button type="button" class="btn-primary mt-8" @click="reset">حجز موعد آخر</button>
      </div>

      <!-- الفورم -->
      <form v-else key="form" class="space-y-5" novalidate @submit.prevent="submit">
        <div class="grid gap-5 sm:grid-cols-2">
          <div>
            <label for="bk-name" class="field-label">الاسم الكامل</label>
            <input id="bk-name" v-model="form.name" type="text" autocomplete="name" class="field" :class="{ 'field-invalid': errors.name }" :aria-invalid="!!errors.name" aria-describedby="bk-name-err" />
            <p v-if="errors.name" id="bk-name-err" class="field-error">{{ errors.name }}</p>
          </div>
          <div>
            <label for="bk-phone" class="field-label">رقم الهاتف</label>
            <input id="bk-phone" v-model="form.phone" type="tel" inputmode="tel" autocomplete="tel" class="field" :class="{ 'field-invalid': errors.phone }" :aria-invalid="!!errors.phone" aria-describedby="bk-phone-err" />
            <p v-if="errors.phone" id="bk-phone-err" class="field-error">{{ errors.phone }}</p>
          </div>
        </div>

        <div>
          <label for="bk-treatment" class="field-label">العلاج المطلوب الاستفسار عنه</label>
          <select id="bk-treatment" v-model="form.treatment" class="field" :class="{ 'field-invalid': errors.treatment }" :aria-invalid="!!errors.treatment" aria-describedby="bk-treatment-err">
            <option value="" disabled>اختر العلاج</option>
            <option v-for="t in TREATMENTS" :key="t.value" :value="t.value">{{ t.label }}</option>
          </select>
          <p v-if="errors.treatment" id="bk-treatment-err" class="field-error">{{ errors.treatment }}</p>
        </div>

        <div class="grid gap-5 sm:grid-cols-2">
          <div>
            <label for="bk-date" class="field-label">تاريخ الزيارة المفضل</label>
            <input id="bk-date" v-model="form.date" type="date" :min="today" class="field" :class="{ 'field-invalid': errors.date }" :aria-invalid="!!errors.date" aria-describedby="bk-date-err" />
            <p v-if="errors.date" id="bk-date-err" class="field-error">{{ errors.date }}</p>
          </div>
          <div>
            <label for="bk-time" class="field-label">وقت الزيارة المفضل</label>
            <select id="bk-time" v-model="form.time" class="field" :class="{ 'field-invalid': errors.time }" :aria-invalid="!!errors.time" aria-describedby="bk-time-err">
              <option value="" disabled>اختر الوقت</option>
              <option v-for="t in TIME_SLOTS" :key="t.value" :value="t.value">{{ t.label }}</option>
            </select>
            <p v-if="errors.time" id="bk-time-err" class="field-error">{{ errors.time }}</p>
          </div>
        </div>

        <div>
          <label for="bk-notes" class="field-label">ملاحظات <span class="font-medium text-slate-500">(اختياري)</span></label>
          <textarea id="bk-notes" v-model="form.notes" rows="4" class="field resize-none" placeholder="مثلاً: منذ متى بدأ التساقط، أو أي علاجات سابقة جرّبتها"></textarea>
        </div>

        <button type="submit" class="btn-primary w-full" :disabled="submitting">
          <svg v-if="submitting" class="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" opacity="0.25" />
            <path d="M22 12a10 10 0 0 0-10-10" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
          </svg>
          {{ submitting ? 'جارٍ إرسال الطلب...' : 'تأكيد طلب الموعد' }}
        </button>
      </form>
    </Transition>
  </div>
</template>

<style scoped>
.swap-enter-active,
.swap-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.swap-enter-from {
  opacity: 0;
  transform: translateY(12px);
}
.swap-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>