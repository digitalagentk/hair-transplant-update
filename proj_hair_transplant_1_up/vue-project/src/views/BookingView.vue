<script setup lang="ts">
import BookingForm from '../components/BookingForm.vue'
import { CLINIC, IMG, hideBroken, img, motionIn } from '../utils/helpers'

const formM = motionIn({ y: 40 })
const sideM = motionIn({ y: 40, delay: 150 })
</script>

<template>
  <div>
    <section class="bg-gradient-to-r from-slate-950 via-zinc-900 to-cyan-950 py-14 text-center text-white">
      <div class="mx-auto max-w-3xl px-5">
        <p class="mb-3 font-bold text-bronze-light">حجز الاستشارة</p>
        <h1 class="mb-4 text-4xl sm:text-5xl">احجز استشارتك المجانية</h1>
        <p class="leading-8 text-slate-300">كل الحجوزات استشارات داخل المركز. اختر الموعد المناسب وسيتصل بك منسقنا للتأكيد.</p>
      </div>
    </section>

    <section class="py-14">
      <div class="mx-auto grid max-w-7xl gap-8 px-5 lg:grid-cols-3">
        <div v-motion :initial="formM.initial" :enter="formM.enter" class="lg:col-span-2">
          <BookingForm />
        </div>

        <aside v-motion :initial="sideM.initial" :enter="sideM.enter" class="space-y-6">
          <div class="overflow-hidden rounded-3xl bg-gradient-to-b from-slate-950 to-zinc-900 text-slate-200 shadow-xl">
            <div class="bg-gradient-to-br from-slate-800 to-cyan-950">
              <img :src="img(IMG.reception, 800)" alt="استقبال مركز أوريكس" class="h-40 w-full object-cover" loading="lazy" @error="hideBroken" />
            </div>
            <div class="space-y-6 p-6">
              <div>
                <h2 class="mb-3 text-lg text-white">ساعات العمل</h2>
                <ul class="space-y-2 text-sm">
                  <li v-for="h in CLINIC.hours" :key="h.days" class="flex justify-between gap-4 border-b border-white/10 pb-2">
                    <span>{{ h.days }}</span>
                    <span class="text-slate-400">{{ h.time }}</span>
                  </li>
                </ul>
              </div>
              <div>
                <h2 class="mb-2 text-lg text-white">رقم التواصل</h2>
                <a :href="CLINIC.phoneHref" dir="ltr" class="inline-flex min-h-11 items-center font-bold text-cyan-300 hover:text-cyan-200">{{ CLINIC.phone }}</a>
              </div>
              <div>
                <h2 class="mb-2 text-lg text-white">العيادة الرئيسية</h2>
                <p class="text-sm leading-7 text-slate-300">{{ CLINIC.address }}</p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  </div>
</template>