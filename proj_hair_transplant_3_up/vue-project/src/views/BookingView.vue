<script setup lang="ts">
import { CLINIC, PHOTOS } from '../data/content'
import { useAuth } from '../composables/useAuth'
import BookingForm from '../components/BookingForm.vue'
import SmartImage from '../components/SmartImage.vue'

const { isLoggedIn } = useAuth()
</script>

<template>
  <div>
    <section class="relative overflow-hidden bg-gradient-to-r from-slate-900 via-teal-950 to-blue-950 py-14 text-center text-white lg:py-20">
      <div class="pointer-events-none absolute -bottom-20 right-10 h-72 w-72 rounded-full bg-teal-500/20 blur-3xl"></div>
      <div v-motion :initial="{ opacity: 0, y: 30 }" :enter="{ opacity: 1, y: 0, transition: { duration: 700 } }" class="relative mx-auto max-w-3xl px-4">
        <h1 class="text-4xl sm:text-5xl">احجز استشارتك</h1>
        <p class="mt-4 text-lg leading-9 text-slate-300">املأ بياناتك وسيتواصل معك منسق العيادة لتأكيد الموعد.</p>
      </div>
    </section>

    <section class="mx-auto grid max-w-7xl gap-8 px-4 py-12 lg:grid-cols-3 lg:py-20">
      <div v-motion :initial="{ opacity: 0, y: 40 }" :enter="{ opacity: 1, y: 0, transition: { duration: 700, delay: 100 } }" class="lg:col-span-2">
        <p v-if="isLoggedIn" class="mb-4 rounded-2xl border border-teal-200 bg-white px-5 py-3 text-sm font-bold text-teal-700">
          تمت تعبئة اسمك ورقم هاتفك تلقائياً من حسابك.
        </p>
        <p v-else class="mb-4 rounded-2xl border border-teal-100 bg-white px-5 py-3 text-sm text-slate-600">
          لديك حساب؟
          <RouterLink :to="{ path: '/login', query: { redirect: '/booking' } }" class="font-bold text-teal-600 underline-offset-4 hover:underline">
            سجّل دخولك
          </RouterLink>
          لتُعبّأ بياناتك تلقائياً.
        </p>
        <BookingForm />
      </div>

      <aside v-motion :initial="{ opacity: 0, y: 40 }" :enter="{ opacity: 1, y: 0, transition: { duration: 700, delay: 250 } }">
        <div class="overflow-hidden rounded-3xl border border-teal-100 bg-white shadow-xl shadow-teal-900/5">
          <div class="h-44">
            <SmartImage :photo="PHOTOS.reception" />
          </div>
          <div class="space-y-6 p-6">
            <div>
              <h2 class="text-lg text-slate-900">ساعات العمل</h2>
              <ul class="mt-3 space-y-2 text-slate-600">
                <li v-for="h in CLINIC.hours" :key="h.days" class="flex justify-between gap-4">
                  <span class="font-bold">{{ h.days }}</span><span>{{ h.time }}</span>
                </li>
              </ul>
            </div>
            <div>
              <h2 class="text-lg text-slate-900">رقم التواصل</h2>
              <a :href="`tel:${CLINIC.phone.replace(/\s/g, '')}`" class="mt-2 inline-flex min-h-[44px] items-center font-bold text-teal-600 hover:text-teal-700" dir="ltr">{{ CLINIC.phone }}</a>
            </div>
            <div>
              <h2 class="text-lg text-slate-900">عنوان العيادة</h2>
              <p class="mt-2 leading-8 text-slate-600">{{ CLINIC.address }}</p>
            </div>
          </div>
        </div>
      </aside>
    </section>
  </div>
</template>