<script setup lang="ts">
import { IMG, hideBroken, img } from '../utils/helpers'
import type { Case } from '../types'

const cases: Case[] = [
  { id: 1, title: 'صلع وراثي متقدم', follicles: 4200, technique: 'DHI', sessions: 'جلسة واحدة', months: 12, before: IMG.before[0]!, after: IMG.after[0]! },
  { id: 2, title: 'تراجع خط الشعر الأمامي', follicles: 2800, technique: 'FUE', sessions: 'جلسة واحدة', months: 10, before: IMG.before[1]!, after: IMG.after[1]! },
  { id: 3, title: 'تكثيف منطقة التاج', follicles: 3000, technique: 'FUE', sessions: 'جلسة واحدة', months: 9, before: IMG.before[2]!, after: IMG.after[2]! },
  { id: 4, title: 'صلع الجزء الأمامي والوسط', follicles: 5000, technique: 'FUE + DHI', sessions: 'جلستان', months: 14, before: IMG.before[3]!, after: IMG.after[3]! },
  { id: 5, title: 'تغطية الجبهة والزوايا', follicles: 2200, technique: 'DHI', sessions: 'جلسة واحدة', months: 8, before: IMG.before[4]!, after: IMG.after[4]! },
  { id: 6, title: 'تكثيف مع جلسات بلازما', follicles: 3400, technique: 'FUE + PRP', sessions: 'جلسة + 3 جلسات بلازما', months: 12, before: IMG.before[5]!, after: IMG.after[5]! },
]
</script>

<template>
  <div>
    <section class="bg-gradient-to-r from-slate-950 via-zinc-900 to-cyan-950 py-16 text-center text-white">
      <div class="mx-auto max-w-3xl px-5">
        <p class="mb-3 font-bold text-bronze-light">معرض الحالات</p>
        <h1 class="mb-4 text-4xl sm:text-5xl">نتائج تتحدث عن نفسها</h1>
        <p class="leading-8 text-slate-300">
          نماذج من حالات أنجزها فريقنا بتقنيتي FUE وDHI. تختلف النتائج من مريض لآخر بحسب الحالة والمنطقة المانحة،
          ونوضح لك المتوقع بصدق خلال الاستشارة.
        </p>
      </div>
    </section>

    <section class="py-16">
      <div class="mx-auto max-w-7xl px-5">
        <div class="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          <article
            v-for="c in cases"
            :key="c.id"
            class="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-md transition duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-cyan-500/20"
          >
            <div class="grid grid-cols-2 gap-0.5 bg-slate-200">
              <figure class="relative bg-gradient-to-br from-slate-800 to-cyan-950">
                <img :src="img(c.before, 600)" :alt="`قبل — ${c.title}`" class="aspect-[3/4] w-full object-cover" loading="lazy" @error="hideBroken" />
                <figcaption class="absolute right-3 top-3 rounded-full bg-slate-950/75 px-3 py-1 text-xs font-bold text-white backdrop-blur">قبل</figcaption>
              </figure>
              <figure class="relative bg-gradient-to-br from-slate-800 to-cyan-950">
                <img :src="img(c.after, 600)" :alt="`بعد — ${c.title}`" class="aspect-[3/4] w-full object-cover" loading="lazy" @error="hideBroken" />
                <figcaption class="absolute right-3 top-3 rounded-full bg-cyan-600/90 px-3 py-1 text-xs font-bold text-white backdrop-blur">بعد</figcaption>
              </figure>
            </div>

            <div class="p-6">
              <h2 class="mb-4 text-lg text-slate-900">{{ c.title }}</h2>
              <dl class="space-y-2 text-sm">
                <div class="flex justify-between gap-3 border-b border-slate-100 pb-2">
                  <dt class="text-slate-500">عدد البصيلات</dt>
                  <dd class="font-bold text-slate-900">{{ c.follicles.toLocaleString('en-US') }} بصيلة</dd>
                </div>
                <div class="flex justify-between gap-3 border-b border-slate-100 pb-2">
                  <dt class="text-slate-500">التقنية</dt>
                  <dd class="font-bold text-cyan-700">{{ c.technique }}</dd>
                </div>
                <div class="flex justify-between gap-3 border-b border-slate-100 pb-2">
                  <dt class="text-slate-500">الجلسات</dt>
                  <dd class="font-bold text-slate-900">{{ c.sessions }}</dd>
                </div>
                <div class="flex justify-between gap-3">
                  <dt class="text-slate-500">مدة النتيجة</dt>
                  <dd class="font-bold text-slate-900">{{ c.months }} شهراً</dd>
                </div>
              </dl>
            </div>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>