<script setup lang="ts">
import { PHOTOS } from '../utils/photos'
import type { Case } from '../types'

const cases: Case[] = [
  { id: 1, title: 'فراغات الخدين', type: 'ملء فراغات', grafts: 2200, technique: 'DHI', ...PHOTOS.cases[0] },
  { id: 2, title: 'نحت خط اللحية', type: 'نحت اللحية', grafts: 1800, technique: 'FUE', ...PHOTOS.cases[1] },
  { id: 3, title: 'تكثيف الذقن', type: 'ملء فراغات', grafts: 1500, technique: 'DHI', ...PHOTOS.cases[2] },
  { id: 4, title: 'إصلاح ندبة الخد', type: 'إصلاح ندوب', grafts: 900, technique: 'FUE', ...PHOTOS.cases[3] },
  { id: 5, title: 'لحية كاملة متناسقة', type: 'نحت اللحية', grafts: 3200, technique: 'DHI', ...PHOTOS.cases[4] },
  { id: 6, title: 'ندوب الفك والذقن', type: 'إصلاح ندوب', grafts: 1100, technique: 'DHI', ...PHOTOS.cases[5] },
]
</script>

<template>
  <div>
    <section class="relative overflow-hidden bg-gradient-to-r from-zinc-900 via-stone-900 to-yellow-950 py-16 text-white sm:py-20">
      <div class="pointer-events-none absolute -left-20 -top-20 h-80 w-80 rounded-full bg-amber-500/20 blur-3xl"></div>
      <div v-motion :initial="{ opacity: 0, y: 30 }" :enter="{ opacity: 1, y: 0, transition: { duration: 600 } }" class="relative mx-auto max-w-3xl px-4 text-center">
        <h1 class="text-4xl font-bold sm:text-5xl">لحى... تُروى بنتائجها</h1>
        <p class="mt-5 text-lg leading-9 text-stone-300">
          حالات حقيقية من مراجعينا بين ملء فراغات ونحت وإصلاح ندوب، نتائج طبيعية تتحدث عن نفسها.
        </p>
      </div>
    </section>

    <section class="bg-stone-100 py-16">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <article
            v-for="c in cases"
            :key="c.id"
            class="overflow-hidden rounded-3xl bg-[#FAF7F2] shadow-lg transition duration-500 hover:scale-[1.02] hover:shadow-[0_20px_50px_-15px_rgba(184,134,11,0.45)]"
          >
            <div class="grid grid-cols-2 gap-0.5 bg-stone-300">
              <figure class="relative">
                <img :src="c.before" :alt="`قبل — ${c.title}`" class="aspect-[4/5] w-full object-cover" loading="lazy" />
                <figcaption class="absolute right-3 top-3 rounded-full bg-zinc-900/85 px-3 py-1 text-xs font-bold text-stone-100">قبل</figcaption>
              </figure>
              <figure class="relative">
                <img :src="c.after" :alt="`بعد — ${c.title}`" class="aspect-[4/5] w-full object-cover" loading="lazy" />
                <figcaption class="absolute right-3 top-3 rounded-full bg-yellow-700 px-3 py-1 text-xs font-bold text-white">بعد</figcaption>
              </figure>
            </div>
            <div class="p-5">
              <h2 class="text-lg font-bold text-stone-900">{{ c.title }}</h2>
              <dl class="mt-3 grid grid-cols-3 gap-2 text-center text-sm">
                <div class="rounded-xl bg-white p-2">
                  <dt class="text-xs text-stone-500">البصيلات</dt>
                  <dd class="font-bold text-stone-900">{{ c.grafts.toLocaleString('en-US') }}</dd>
                </div>
                <div class="rounded-xl bg-white p-2">
                  <dt class="text-xs text-stone-500">التقنية</dt>
                  <dd class="font-bold text-stone-900">{{ c.technique }}</dd>
                </div>
                <div class="rounded-xl bg-white p-2">
                  <dt class="text-xs text-stone-500">الحالة</dt>
                  <dd class="font-bold text-yellow-800">{{ c.type }}</dd>
                </div>
              </dl>
            </div>
          </article>
        </div>

        <div class="mt-12 text-center">
          <RouterLink to="/booking" class="btn-copper text-lg">احجز استشارتك</RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>