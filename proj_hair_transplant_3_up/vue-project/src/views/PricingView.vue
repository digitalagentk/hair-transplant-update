<script setup lang="ts">
import { PACKAGES } from '../data/content'

const discount = (price: number, old: number) => Math.round((1 - price / old) * 100)
</script>

<template>
  <div>
    <section class="relative overflow-hidden bg-gradient-to-r from-slate-900 via-teal-950 to-blue-950 py-16 text-center text-white lg:py-20">
      <div class="pointer-events-none absolute -top-20 left-1/3 h-72 w-72 rounded-full bg-teal-500/20 blur-3xl"></div>
      <div v-motion :initial="{ opacity: 0, y: 30 }" :enter="{ opacity: 1, y: 0, transition: { duration: 700 } }" class="relative mx-auto max-w-3xl px-4">
        <h1 class="text-4xl sm:text-5xl">الباقات والأسعار</h1>
        <p class="mt-4 text-lg leading-9 text-slate-300">باقات واضحة وشاملة، ويؤكد الطبيب الخطة الأنسب لك خلال الاستشارة.</p>
      </div>
    </section>

    <section class="mx-auto max-w-7xl px-4 py-16 lg:py-24">
      <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="(p, i) in PACKAGES"
          :key="p.id"
          v-motion
          :initial="{ opacity: 0, y: 40 }"
          :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 600, delay: (i % 3) * 100 } }"
          class="relative"
        >
          <!-- إطار التدرج للبطاقة الأكثر طلباً -->
          <div
            class="h-full rounded-3xl transition duration-300 hover:scale-[1.02]"
            :class="p.popular ? 'bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-600 p-[2px] shadow-2xl shadow-teal-500/30' : 'border border-teal-100 bg-white shadow-lg shadow-teal-900/5 hover:shadow-xl hover:shadow-teal-500/20'"
          >
            <article
              class="relative flex h-full flex-col p-7"
              :class="p.popular ? 'rounded-[1.4rem] bg-gradient-to-br from-slate-900 via-teal-950 to-blue-950 text-white' : 'rounded-3xl'"
            >
              <span
                v-if="p.popular"
                class="absolute -top-3 right-7 rounded-full bg-gradient-to-r from-teal-400 to-cyan-500 px-4 py-1 text-sm font-bold text-slate-900 shadow-lg"
              >
                الأكثر طلباً
              </span>

              <h2 class="text-xl" :class="p.popular ? 'text-white' : 'text-slate-900'">{{ p.name }}</h2>
              <p class="mt-2 leading-7" :class="p.popular ? 'text-slate-300' : 'text-slate-500'">{{ p.summary }}</p>

              <div class="mt-6 flex flex-wrap items-end gap-3">
                <p class="text-4xl font-bold" :class="p.popular ? 'text-teal-300' : 'text-teal-600'" dir="ltr">${{ p.price.toLocaleString('en') }}</p>
                <p class="pb-1 text-lg text-slate-400 line-through" dir="ltr">${{ p.oldPrice.toLocaleString('en') }}</p>
                <span class="mb-1 rounded-full bg-teal-500/15 px-3 py-1 text-sm font-bold" :class="p.popular ? 'text-teal-300' : 'text-teal-700'">
                  خصم {{ discount(p.price, p.oldPrice) }}%
                </span>
              </div>

              <ul class="mt-6 flex-1 space-y-3">
                <li v-for="f in p.features" :key="f" class="flex items-start gap-3 leading-7" :class="p.popular ? 'text-slate-200' : 'text-slate-700'">
                  <svg viewBox="0 0 20 20" class="mt-1 h-5 w-5 shrink-0 text-teal-500" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0L3.3 9.7a1 1 0 1 1 1.4-1.4l3.8 3.8 6.8-6.8a1 1 0 0 1 1.4 0z" clip-rule="evenodd" />
                  </svg>
                  <span>{{ f }}</span>
                </li>
              </ul>

              <RouterLink :to="{ path: '/booking', query: { treatment: p.treatment } }" class="btn-primary mt-8 w-full">
                احجز هذه الباقة
              </RouterLink>
            </article>
          </div>
        </div>
      </div>

      <p class="mx-auto mt-10 max-w-2xl text-center text-sm leading-7 text-slate-500">
        الأسعار استرشادية وقد تتغيّر بحسب نتيجة الفحص السريري وخطة العلاج التي يعتمدها الطبيب.
      </p>
    </section>
  </div>
</template>