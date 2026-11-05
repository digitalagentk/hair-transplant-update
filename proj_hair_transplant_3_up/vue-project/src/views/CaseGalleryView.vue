<script setup lang="ts">
import SmartImage from '../components/SmartImage.vue'
import { CASES } from '../data/content'
</script>

<template>
  <div>
    <section class="relative overflow-hidden bg-gradient-to-r from-slate-900 via-teal-950 to-blue-950 py-16 text-center text-white lg:py-20">
      <div class="pointer-events-none absolute -bottom-24 left-10 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl"></div>
      <div v-motion :initial="{ opacity: 0, y: 30 }" :enter="{ opacity: 1, y: 0, transition: { duration: 700 } }" class="relative mx-auto max-w-3xl px-4">
        <h1 class="text-4xl sm:text-5xl">نتائج حقيقية... بدون جراحة</h1>
        <p class="mt-4 text-lg leading-9 text-slate-300">
          نماذج من برامج العلاج التجديدي لدينا. تختلف الاستجابة من شخص لآخر، ويحدّد الطبيب توقعاتك بعد فحص فروة رأسك.
        </p>
      </div>
    </section>

    <section class="mx-auto max-w-7xl px-4 py-16 lg:py-24">
      <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="(c, i) in CASES"
          :key="c.id"
          v-motion
          :initial="{ opacity: 0, y: 40 }"
          :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 600, delay: (i % 3) * 100 } }"
        >
          <article class="h-full overflow-hidden rounded-3xl border border-teal-100 bg-white shadow-lg shadow-teal-900/5 transition duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-teal-500/20">
            <div class="grid grid-cols-2 gap-px bg-white">
              <div class="relative h-56">
                <SmartImage :photo="c.before" />
                <span class="absolute right-3 top-3 rounded-full bg-slate-900/80 px-3 py-1 text-xs font-bold text-white backdrop-blur">قبل</span>
              </div>
              <div class="relative h-56">
                <SmartImage :photo="c.after" />
                <span class="absolute right-3 top-3 rounded-full bg-teal-600/90 px-3 py-1 text-xs font-bold text-white backdrop-blur">بعد</span>
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-lg text-slate-900">{{ c.title }}</h3>
              <dl class="mt-4 space-y-2 text-sm">
                <div class="flex justify-between gap-4"><dt class="text-slate-500">نوع العلاج</dt><dd class="font-bold text-slate-900">{{ c.treatment }}</dd></div>
                <div class="flex justify-between gap-4"><dt class="text-slate-500">عدد الجلسات</dt><dd class="font-bold text-slate-900">{{ c.sessions }}</dd></div>
                <div class="flex justify-between gap-4"><dt class="text-slate-500">مدة النتائج</dt><dd class="font-bold text-teal-600">{{ c.duration }}</dd></div>
              </dl>
            </div>
          </article>
        </div>
      </div>

      <p class="mx-auto mt-10 max-w-2xl text-center text-sm leading-7 text-slate-500">
        تُعرض في هذه البطاقات صور حالات حقيقية بعد موافقة المراجعين الخطية، وتختلف النتائج من شخص لآخر.
      </p>

      <div class="mt-10 text-center">
        <RouterLink to="/booking" class="btn-primary">احجز استشارتك</RouterLink>
      </div>
    </section>
  </div>
</template>