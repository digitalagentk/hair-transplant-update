<script setup lang="ts">
import type { Package } from '../types'

const packages: Package[] = [
  {
    id: 1,
    name: 'باقة اللحية الكاملة DHI',
    tagline: 'نحت متكامل بتقنية DHI',
    price: 1440,
    oldPrice: 1800,
    featured: true,
    plasmaSessions: 4,
    service: 'زراعة لحية',
    features: [
      'زراعة حتى 4,000 بصيلة بتقنية DHI',
      'رسم خط اللحية رقمياً قبل العملية',
      'تخدير موضعي مريح',
      'متابعة طبية لمدة 12 شهراً',
      'أدوات عناية منزلية مجانية',
    ],
  },
  {
    id: 2,
    name: 'باقة تكثيف اللحية FUE',
    tagline: 'لملء الفراغات دون حلاقة كاملة',
    price: 1020,
    oldPrice: 1200,
    plasmaSessions: 2,
    service: 'زراعة لحية',
    features: ['زراعة حتى 2,500 بصيلة بتقنية FUE', 'بدون حلاقة كاملة للمنطقة', 'تخطيط كثافة مخصص', 'متابعة لمدة 6 أشهر'],
  },
  {
    id: 3,
    name: 'باقة الشارب النحيف',
    tagline: 'رسم الشارب بدقة طبيعية',
    price: 520,
    oldPrice: 650,
    plasmaSessions: 1,
    service: 'تكثيف شارب',
    features: ['زراعة حتى 800 بصيلة', 'تصميم شكل الشارب حسب الوجه', 'زراعة بزوايا طبيعية', 'متابعة لمدة 6 أشهر'],
  },
  {
    id: 4,
    name: 'باقة ملء الفراغات',
    tagline: 'لفراغات اللحية والذقن',
    price: 720,
    oldPrice: 900,
    plasmaSessions: 2,
    service: 'ملء فراغات',
    features: ['زراعة حتى 1,500 بصيلة', 'تحديد دقيق لمناطق الفراغ', 'تخدير موضعي', 'متابعة لمدة 6 أشهر'],
  },
  {
    id: 5,
    name: 'باقة إصلاح الندوب',
    tagline: 'لندوب الوجه والشعر الحائر',
    price: 935,
    oldPrice: 1100,
    plasmaSessions: 3,
    service: 'إصلاح ندوب الوجه',
    features: ['زراعة حتى 1,200 بصيلة في منطقة الندبة', 'تقييم الندبة بالفحص الرقمي', 'تحضير النسيج قبل الزراعة', 'متابعة لمدة 9 أشهر'],
  },
  {
    id: 6,
    name: 'باقة النحت والبلازما',
    tagline: 'نحت + جلسات PRP مساندة',
    price: 680,
    oldPrice: 800,
    plasmaSessions: 6,
    service: 'استشارة عامة',
    features: ['إعادة نحت وتحديد حدود اللحية', 'ست جلسات PRP لتقوية البصيلات', 'تقييم كثافة وصحة الجلد', 'خطة عناية منزلية'],
  },
]

const discount = (p: Package) => Math.round((1 - p.price / p.oldPrice) * 100)
const money = (n: number) => `$${n.toLocaleString('en-US')}`
</script>

<template>
  <div>
    <section class="relative overflow-hidden bg-gradient-to-r from-zinc-900 via-stone-900 to-yellow-950 py-16 text-white sm:py-20">
      <div class="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-amber-500/20 blur-3xl"></div>
      <div v-motion :initial="{ opacity: 0, y: 30 }" :enter="{ opacity: 1, y: 0, transition: { duration: 600 } }" class="relative mx-auto max-w-3xl px-4 text-center">
        <h1 class="text-4xl font-bold sm:text-5xl">الباقات والأسعار</h1>
        <p class="mt-5 text-lg leading-9 text-stone-300">باقات واضحة وشاملة، والتسعير النهائي يُحدَّد بعد الفحص في الاستشارة المجانية.</p>
      </div>
    </section>

    <section class="bg-stone-100 py-16">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="(p, i) in packages"
            :key="p.id"
            v-motion
            :initial="{ opacity: 0, y: 40 }"
            :visible-once="{ opacity: 1, y: 0, transition: { duration: 600, delay: (i % 3) * 120 } }"
            class="relative"
          >
            <div
              class="h-full rounded-3xl transition duration-500 hover:scale-[1.02]"
              :class="p.featured ? 'bg-gradient-to-br from-yellow-500 via-amber-300 to-yellow-800 p-[2px] shadow-xl shadow-yellow-900/30' : ''"
            >
              <article
                class="relative flex h-full flex-col rounded-3xl p-6"
                :class="
                  p.featured
                    ? 'bg-gradient-to-br from-zinc-900 via-stone-900 to-yellow-950 text-white'
                    : 'border border-stone-200 bg-[#FAF7F2] text-stone-900 shadow-lg'
                "
              >
                <span v-if="p.featured" class="absolute -top-3 right-6 rounded-full bg-gradient-to-r from-yellow-500 to-amber-300 px-4 py-1 text-xs font-bold text-zinc-900">الأكثر طلباً</span>

                <h2 class="text-xl font-bold" :class="p.featured ? 'text-amber-300' : 'text-stone-900'">{{ p.name }}</h2>
                <p class="mt-1 text-sm" :class="p.featured ? 'text-stone-300' : 'text-stone-500'">{{ p.tagline }}</p>

                <div class="mt-5 flex flex-wrap items-end gap-3">
                  <span class="text-4xl font-bold" :class="p.featured ? 'text-white' : 'text-stone-900'">{{ money(p.price) }}</span>
                  <span class="pb-1 text-sm line-through" :class="p.featured ? 'text-stone-400' : 'text-stone-400'">{{ money(p.oldPrice) }}</span>
                  <span class="mb-1 rounded-full bg-yellow-700 px-3 py-0.5 text-xs font-bold text-white">خصم {{ discount(p) }}%</span>
                </div>

                <ul class="mt-6 flex-1 space-y-3">
                  <li v-for="f in p.features" :key="f" class="flex items-start gap-3 text-sm leading-7">
                    <svg viewBox="0 0 24 24" class="mt-1 h-5 w-5 shrink-0" fill="none" stroke="#D4A574" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                    <span :class="p.featured ? 'text-stone-200' : 'text-stone-700'">{{ f }}</span>
                  </li>
                  <li v-if="p.plasmaSessions" class="flex items-start gap-3 text-sm font-bold leading-7">
                    <svg viewBox="0 0 24 24" class="mt-1 h-5 w-5 shrink-0" fill="none" stroke="#B8860B" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                    <span :class="p.featured ? 'text-amber-300' : 'text-yellow-800'">
                      {{ p.plasmaSessions }} جلسات بلازما مجانية بعد العملية
                    </span>
                  </li>
                </ul>

                <RouterLink :to="{ path: '/booking', query: { service: p.service, pkg: p.name } }" class="btn-copper mt-8 w-full">
                  احجز هذه الباقة
                </RouterLink>
              </article>
            </div>
          </div>
        </div>

        <p class="mt-10 text-center text-sm text-stone-500">الأسعار إرشادية وتخضع للتقييم الطبي النهائي. جميع الحجوزات عبارة عن استشارة داخل المركز.</p>
      </div>
    </section>
  </div>
</template>