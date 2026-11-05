<script setup lang="ts">
import BookingForm from '../components/BookingForm.vue'
</script>

<template>
  <div class="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-gradient-to-r from-zinc-900 via-stone-900 to-yellow-950 py-14">
    <div class="pointer-events-none absolute -right-24 top-10 h-96 w-96 rounded-full bg-amber-500/15 blur-3xl"></div>
    <div class="pointer-events-none absolute -left-24 bottom-0 h-96 w-96 rounded-full bg-yellow-600/10 blur-3xl"></div>

    <div class="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div v-motion :initial="{ opacity: 0, y: 30 }" :enter="{ opacity: 1, y: 0, transition: { duration: 600 } }" class="mb-10 text-center text-white">
        <h1 class="text-4xl font-bold sm:text-5xl">احجز استشارتك</h1>
        <p class="mt-4 leading-8 text-stone-300">خطوة واحدة تفصلك عن لحية بالشكل الذي تريده.</p>
      </div>

      <div class="grid items-start gap-8 lg:grid-cols-3">
        <div
          v-motion
          :initial="{ opacity: 0, y: 40 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 700, delay: 100 } }"
          class="lg:col-span-2"
        >
          <BookingForm />
        </div>

        <aside
          v-motion
          :initial="{ opacity: 0, y: 40 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 700, delay: 200 } }"
          class="rounded-3xl border border-yellow-700/30 bg-white/5 p-6 text-stone-200 backdrop-blur-md"
        >
          <h2 class="text-xl font-bold text-amber-300">معلومات المركز</h2>
          <dl class="mt-5 space-y-5 text-sm leading-7">
            <div>
              <dt class="font-bold text-yellow-500">ساعات العمل</dt>
              <dd>السبت – الخميس: 10:00 صباحاً – 9:00 مساءً<br />الجمعة: 2:00 – 8:00 مساءً</dd>
            </div>
            <div>
              <dt class="font-bold text-yellow-500">رقم التواصل</dt>
              <dd dir="ltr" class="text-right">+964 770 123 4567</dd>
            </div>
            <div>
              <dt class="font-bold text-yellow-500">العيادة الرئيسية</dt>
              <dd>شارع الأطباء، مجمع تيتان الطبي، الطابق الثالث</dd>
            </div>
          </dl>
          <p class="mt-6 border-t border-white/10 pt-4 text-xs leading-6 text-stone-400">الاستشارة الأولى مجانية وتتم داخل المركز مع أحد أطبائنا المتخصصين.</p>
        </aside>
      </div>
    </div>
  </div>
</template>