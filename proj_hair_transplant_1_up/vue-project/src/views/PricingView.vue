<script setup lang="ts">
import { BTN_PRIMARY, motionIn } from '../utils/helpers'
import type { Package } from '../types'

const packages: (Package & { m: ReturnType<typeof motionIn> })[] = (
  [
    {
      id: 'dhi', name: 'باقة السفير DHI المتكاملة', tagline: 'زراعة دقيقة بأقلام السفير', service: 'زراعة شعر رأس',
      price: 2250, oldPrice: 2650, discount: 15, plasma: 'جلستا بلازما مجانيتان بعد العملية',
      features: ['فحص وتصميم خط الشعر بالمجهر', 'زراعة مباشرة بأقلام السفير (DHI)', 'تحكم كامل بزاوية واتجاه ونمو الشعر', 'مخدر موضعي وبروتوكول راحة', 'مستلزمات العناية والشامبو الطبي', 'متابعة طبية لمدة 12 شهراً'],
    },
    {
      id: 'fue-basic', name: 'باقة FUE الأساسية', tagline: 'اقتطاف وزراعة بتقنية FUE', service: 'زراعة شعر رأس',
      price: 1400, oldPrice: 1650, discount: 15, plasma: null,
      features: ['استشارة وفحص شامل', 'اقتطاف البصيلات بتقنية FUE', 'زراعة بكثافة مناسبة للحالة', 'مخدر موضعي', 'مستلزمات العناية الأولية', 'متابعة طبية لمدة 6 أشهر'],
    },
    {
      id: 'fue-adv', name: 'باقة FUE المتقدمة', tagline: 'FUE بكثافة أعلى وجلسات بلازما', service: 'زراعة شعر رأس',
      price: 1850, oldPrice: 2350, discount: 21, plasma: 'ثلاث جلسات بلازما مجانية بعد العملية', featured: true,
      features: ['تصميم متقدم لخط الشعر', 'اقتطاف FUE بأجهزة دقيقة حديثة', 'زراعة بكثافة عالية', 'غرفة عمليات خاصة وفريق مخصص', 'حقيبة عناية متكاملة', 'متابعة طبية لمدة 12 شهراً'],
    },
    {
      id: 'beard', name: 'باقة زراعة اللحية الفاخرة', tagline: 'DHI للحية والذقن', service: 'زراعة لحية',
      price: 1200, oldPrice: 1450, discount: 17, plasma: 'جلسة بلازما مجانية بعد العملية',
      features: ['تصميم شكل اللحية والخطوط', 'زراعة DHI دقيقة للحية والذقن', 'تغطية الفراغات والندوب', 'مخدر موضعي', 'تعليمات عناية مفصلة', 'متابعة طبية لمدة 6 أشهر'],
    },
    {
      id: 'crown', name: 'باقة تكثيف التاج', tagline: 'لعلاج تساقط التاج دون حلاقة كاملة', service: 'زراعة شعر رأس',
      price: 1650, oldPrice: 1950, discount: 15, plasma: 'جلستا بلازما مجانيتان بعد العملية',
      features: ['فحص اتجاه الشعر في منطقة التاج', 'اقتطاف انتقائي دون حلاقة كاملة', 'زراعة بزاوية دوّامية طبيعية', 'مخدر موضعي', 'مستلزمات العناية', 'متابعة طبية لمدة 12 شهراً'],
    },
    {
      id: 'prp', name: 'باقة العلاج والبلازما', tagline: 'جلسات PRP + علاجات مساندة', service: 'بلازما',
      price: 450, oldPrice: 600, discount: 25, plasma: null,
      features: ['أربع جلسات بلازما PRP', 'تحليل فروة الرأس بالمجهر', 'علاجات مساندة لتقوية الجذور', 'مكمّلات وشامبو طبي', 'مناسبة قبل الزراعة أو بعدها', 'متابعة شهرية'],
    },
  ] as Package[]
).map((p, i) => ({ ...p, m: motionIn({ y: 40, delay: (i % 3) * 120 }) }))

const fmt = (n: number) => n.toLocaleString('en-US')
</script>

<template>
  <div>
    <section class="bg-gradient-to-r from-slate-950 via-zinc-900 to-cyan-950 py-16 text-center text-white">
      <div class="mx-auto max-w-3xl px-5">
        <p class="mb-3 font-bold text-bronze-light">الباقات والأسعار</p>
        <h1 class="mb-4 text-4xl sm:text-5xl">باقات واضحة... وأسعار شفافة</h1>
        <p class="leading-8 text-slate-300">اختر الباقة الأقرب لحالتك، ويؤكد الطبيب الباقة والسعر النهائي بعد الفحص خلال الاستشارة المجانية.</p>
      </div>
    </section>

    <section class="py-16">
      <div class="mx-auto max-w-7xl px-5">
        <div class="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="p in packages"
            :key="p.id"
            v-motion
            :initial="p.m.initial"
            :visible-once="p.m.enter"
            class="rounded-3xl transition duration-300 hover:scale-[1.02]"
            :class="p.featured ? 'bg-gradient-to-br from-cyan-400 via-bronze-light to-cyan-600 p-[2px] shadow-2xl shadow-cyan-500/25' : ''"
          >
            <article
              class="relative flex h-full flex-col rounded-3xl p-7"
              :class="
                p.featured
                  ? 'bg-gradient-to-b from-slate-950 to-zinc-900 text-white'
                  : 'border border-slate-200 bg-white text-slate-900 shadow-md hover:shadow-xl hover:shadow-cyan-500/15'
              "
            >
              <span
                v-if="p.featured"
                class="absolute -top-3 right-7 rounded-full bg-gradient-to-l from-bronze-light to-bronze px-4 py-1 text-sm font-bold text-slate-950"
              >
                الأكثر طلباً
              </span>

              <h2 class="mb-1 text-xl">{{ p.name }}</h2>
              <p class="mb-5 text-sm" :class="p.featured ? 'text-slate-400' : 'text-slate-500'">{{ p.tagline }}</p>

              <div class="mb-6 flex flex-wrap items-end gap-3">
                <p class="text-4xl font-bold" :class="p.featured ? 'text-cyan-300' : 'text-cyan-700'">${{ fmt(p.price) }}</p>
                <p class="pb-1 text-slate-400 line-through">${{ fmt(p.oldPrice) }}</p>
                <span class="mb-1 rounded-full bg-bronze/15 px-3 py-0.5 text-sm font-bold text-bronze">خصم {{ p.discount }}%</span>
              </div>

              <ul class="mb-6 flex-1 space-y-3">
                <li v-for="f in p.features" :key="f" class="flex items-start gap-3 text-sm leading-7" :class="p.featured ? 'text-slate-200' : 'text-slate-600'">
                  <svg viewBox="0 0 20 20" class="mt-1 h-4 w-4 shrink-0 text-cyan-500" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 10.5l4 4 8-9" /></svg>
                  {{ f }}
                </li>
                <li v-if="p.plasma" class="flex items-start gap-3 text-sm font-bold leading-7" :class="p.featured ? 'text-bronze-light' : 'text-bronze'">
                  <svg viewBox="0 0 20 20" class="mt-1 h-4 w-4 shrink-0 text-cyan-500" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 10.5l4 4 8-9" /></svg>
                  {{ p.plasma }}
                </li>
              </ul>

              <RouterLink :to="{ path: '/booking', query: { service: p.service, pkg: p.name } }" :class="BTN_PRIMARY">
                احجز هذه الباقة
              </RouterLink>
            </article>
          </div>
        </div>

        <p class="mx-auto mt-10 max-w-2xl text-center text-sm leading-7 text-slate-500">
          الأسعار إرشادية وتُحدَّد نهائياً بعد الفحص السريري وعدد البصيلات المطلوب. الاستشارة الأولى مجانية دون التزام.
        </p>
      </div>
    </section>
  </div>
</template>