<script setup lang="ts">
import { PHOTOS } from '../utils/photos'
import type { Testimonial } from '../types'

const experience = [
  {
    title: '+12 عاماً في نحت اللحية',
    text: 'أكثر من عقد من الخبرة في رسم خطوط اللحية والذقن بدقة تناسب ملامح وجه كل مراجع على حدة.',
    img: PHOTOS.expTrim,
    alt: 'حلاق محترف يهذب لحية رجل بأدوات دقيقة',
  },
  {
    title: '+5,000 لحية طبيعية',
    text: 'آلاف الحالات الناجحة بنتائج كثيفة ومتناسقة لا يمكن تمييزها عن اللحية الأصلية.',
    img: PHOTOS.expResults,
    alt: 'رجل أنيق بلحية كثيفة مرتبة',
  },
  {
    title: 'تقنيات DHI و FUE للحية',
    text: 'أحدث أدوات الاقتطاف والزرع الدقيقة لضمان أعلى نسبة نمو وأقل فترة نقاهة.',
    img: PHOTOS.expTools,
    alt: 'أدوات دقيقة للعناية باللحية داخل صالون احترافي',
  },
]

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'فيصل العتيبي',
    procedure: 'زراعة 2500 بصيلة لحية — DHI',
    text: 'كانت لحيتي متفرقة في الخدين منذ سنوات. بعد ثمانية أشهر صارت النتيجة كثيفة وطبيعية لدرجة أن أقرب أصدقائي لم يلاحظ أنها مزروعة.',
    rating: 5,
  },
  {
    id: 2,
    name: 'مازن الحيدري',
    procedure: 'ملء فراغات الذقن — FUE',
    text: 'الطبيب رسم لي خط اللحية بدقة مذهلة، والفريق كان محترفاً من الاستقبال حتى المتابعة. أنصح به كل من يريد نتيجة نظيفة.',
    rating: 5,
  },
  {
    id: 3,
    name: 'طارق السامرائي',
    procedure: 'إصلاح ندوب الوجه — 900 بصيلة',
    text: 'كنت أخفي ندبة في خدي بلحية قصيرة دائماً. اليوم الندبة غطّاها الشعر تماماً وعادت ثقتي بنفسي.',
    rating: 5,
  },
]
</script>

<template>
  <div>
    <!-- 1) Hero -->
    <section class="relative isolate overflow-hidden bg-gradient-to-r from-zinc-900 via-stone-900 to-yellow-950 text-white">
      <div class="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-amber-500/20 blur-3xl"></div>
      <div class="pointer-events-none absolute -bottom-32 left-1/4 h-96 w-96 rounded-full bg-yellow-600/15 blur-3xl"></div>
      <div class="pointer-events-none absolute left-0 top-1/3 h-64 w-64 rounded-full bg-stone-400/10 blur-3xl"></div>

      <div class="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
        <div v-motion :initial="{ opacity: 0, y: 40 }" :enter="{ opacity: 1, y: 0, transition: { duration: 700, ease: 'easeOut' } }">
          <p class="mb-4 inline-block rounded-full border border-yellow-700/50 bg-yellow-900/20 px-4 py-1.5 text-sm font-bold text-amber-300">
            مركز تيتان للحية والنحت
          </p>
          <h1 class="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            لحيتك...
            <span class="bg-gradient-to-r from-amber-300 via-yellow-500 to-yellow-700 bg-clip-text text-transparent">توقيعك الذكوري</span>
          </h1>
          <p class="mt-6 max-w-xl text-lg leading-9 text-stone-300">
            نحت اللحية وملء الفراغات وتكثيف الشارب وإصلاح الندوب بتقنيات دقيقة، بنتيجة طبيعية 100% ترسم ملامحك كما تريدها تماماً.
          </p>
          <div class="mt-8 flex flex-wrap gap-3">
            <RouterLink to="/booking" class="btn-copper text-lg">احجز استشارتك المجانية</RouterLink>
            <RouterLink to="/gallery" class="btn-ghost text-lg">شاهد نتائجنا</RouterLink>
          </div>
        </div>

        <div v-motion :initial="{ opacity: 0, y: 50 }" :enter="{ opacity: 1, y: 0, transition: { duration: 800, delay: 200, ease: 'easeOut' } }">
          <div class="float-card relative mx-auto max-w-md">
            <div class="absolute -inset-4 -z-10 rounded-[2.5rem] bg-amber-500/20 blur-2xl"></div>
            <div class="overflow-hidden rounded-3xl border border-yellow-700/40 shadow-2xl shadow-black/50">
              <img :src="PHOTOS.heroMain" alt="رجل بلحية كثيفة أنيقة بإضاءة دافئة" class="aspect-[4/5] w-full object-cover" loading="eager" />
              <div class="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent"></div>
              <div class="absolute inset-x-0 bottom-0 p-5">
                <p class="inline-block rounded-xl bg-zinc-900/80 px-4 py-2 text-sm font-bold text-amber-300 backdrop-blur">نتيجة طبيعية 100%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 2) الخبرة والتميز -->
    <section class="bg-stone-100 py-20">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div v-motion :initial="{ opacity: 0, y: 30 }" :visible-once="{ opacity: 1, y: 0, transition: { duration: 600 } }" class="mx-auto mb-12 max-w-2xl text-center">
          <h2 class="text-3xl font-bold text-stone-900 sm:text-4xl">خبرة تُرى في كل تفصيلة</h2>
          <p class="mt-4 leading-8 text-stone-500">أرقام وتقنيات تعكس التزامنا بالدقة والنتائج الطبيعية.</p>
        </div>

        <div class="grid gap-6 md:grid-cols-3">
          <div
            v-for="(c, i) in experience"
            :key="c.title"
            v-motion
            :initial="{ opacity: 0, y: 40 }"
            :visible-once="{ opacity: 1, y: 0, transition: { duration: 600, delay: i * 120 } }"
          >
            <article class="group relative h-96 overflow-hidden rounded-3xl shadow-lg transition duration-500 hover:scale-[1.02] hover:shadow-[0_20px_50px_-15px_rgba(184,134,11,0.5)]">
              <img :src="c.img" :alt="c.alt" class="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" loading="lazy" />
              <div class="absolute inset-0 bg-gradient-to-t from-zinc-950/95 via-zinc-900/40 to-transparent"></div>
              <div class="absolute inset-x-0 bottom-0 p-6">
                <h3 class="text-2xl font-bold text-amber-300">{{ c.title }}</h3>
                <p class="mt-2 text-sm leading-7 text-stone-200">{{ c.text }}</p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>

    <!-- 3) عن خبرة المركز والكادر -->
    <section class="bg-[#FAF7F2] py-20">
      <div class="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div v-motion :initial="{ opacity: 0, y: 40 }" :visible-once="{ opacity: 1, y: 0, transition: { duration: 700 } }">
          <h2 class="text-3xl font-bold text-stone-900 sm:text-4xl">دقة في الرسم... إتقان في النحت</h2>
          <p class="mt-6 leading-9 text-stone-600">
            في مركز تيتان نتعامل مع اللحية كتصميم يخص صاحبه وحده. يبدأ كل مراجع بفحص رقمي لكثافة الشعر واتجاه نموه وزوايا الوجه، ثم يرسم الطبيب خط اللحية الذي يناسب ملامحه قبل أن تبدأ أي خطوة علاجية.
          </p>
          <p class="mt-4 leading-9 text-stone-600">
            يقود الفريق أطباء متخصصون في نحت اللحية وزراعتها، يدعمهم كادر تمريضي مدرّب وتجهيزات حديثة، ويعملون وفق معايير اعتماد دولية تضمن السلامة وأفضل نتيجة ممكنة.
          </p>
          <div class="mt-6 flex flex-wrap gap-2">
            <span class="rounded-full border border-yellow-700/40 bg-white px-4 py-1.5 text-sm font-bold text-yellow-800">ISHRS</span>
            <span class="rounded-full border border-yellow-700/40 bg-white px-4 py-1.5 text-sm font-bold text-yellow-800">ABHRS</span>
            <span class="rounded-full border border-yellow-700/40 bg-white px-4 py-1.5 text-sm font-bold text-yellow-800">اعتماد وزارة الصحة</span>
          </div>
          <RouterLink to="/about" class="btn-copper mt-8">تعرّف على فريقنا</RouterLink>
        </div>

        <div v-motion :initial="{ opacity: 0, y: 50 }" :visible-once="{ opacity: 1, y: 0, transition: { duration: 700, delay: 150 } }">
          <div class="overflow-hidden rounded-3xl shadow-2xl shadow-yellow-900/20 transition duration-500 hover:scale-[1.02]">
            <img :src="PHOTOS.clinicTeam" alt="طبيب مع فريقه داخل العيادة" class="aspect-[4/3] w-full object-cover" loading="lazy" />
          </div>
        </div>
      </div>
    </section>

    <!-- 4) آراء المراجعين -->
    <section class="bg-gradient-to-r from-zinc-900 via-stone-900 to-yellow-950 py-20 text-white">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div v-motion :initial="{ opacity: 0, y: 30 }" :visible-once="{ opacity: 1, y: 0, transition: { duration: 600 } }" class="mx-auto mb-12 max-w-2xl text-center">
          <h2 class="text-3xl font-bold sm:text-4xl">آراء مراجعينا</h2>
          <p class="mt-4 leading-8 text-stone-300">تجارب حقيقية لرجال استعادوا ثقتهم بلحيتهم.</p>
        </div>

        <div class="grid gap-6 md:grid-cols-3">
          <div
            v-for="(t, i) in testimonials"
            :key="t.id"
            v-motion
            :initial="{ opacity: 0, y: 40 }"
            :visible-once="{ opacity: 1, y: 0, transition: { duration: 600, delay: i * 120 } }"
          >
            <figure class="h-full rounded-3xl bg-[#FAF7F2] p-6 text-stone-900 shadow-xl transition duration-500 hover:scale-[1.02] hover:shadow-[0_20px_50px_-15px_rgba(212,165,116,0.5)]">
              <div class="flex gap-1" :aria-label="`تقييم ${t.rating} من 5`" role="img">
                <svg v-for="n in t.rating" :key="n" viewBox="0 0 24 24" class="h-5 w-5 text-yellow-600" fill="currentColor" aria-hidden="true">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              </div>
              <blockquote class="mt-4 leading-8 text-stone-600">{{ t.text }}</blockquote>
              <figcaption class="mt-5 border-t border-stone-200 pt-4">
                <p class="font-bold">{{ t.name }}</p>
                <p class="text-sm text-yellow-800">{{ t.procedure }}</p>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>

    <!-- 5) CTA -->
    <section class="bg-stone-100 py-20">
      <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div
          v-motion
          :initial="{ opacity: 0, scale: 0.96 }"
          :visible-once="{ opacity: 1, scale: 1, transition: { duration: 700 } }"
          class="relative overflow-hidden rounded-3xl bg-gradient-to-r from-yellow-700 to-zinc-900 px-6 py-14 text-center text-white shadow-2xl shadow-yellow-900/30 sm:px-12"
        >
          <div class="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-amber-300/20 blur-3xl"></div>
          <h2 class="relative text-3xl font-bold sm:text-4xl">لحيتك المثالية... على بُعد استشارة</h2>
          <p class="relative mx-auto mt-4 max-w-xl leading-8 text-stone-200">احجز استشارتك المجانية داخل المركز واحصل على خطة واضحة لنتيجة طبيعية تدوم.</p>
          <RouterLink to="/booking" class="relative mt-8 inline-flex min-h-12 items-center justify-center rounded-xl bg-[#FAF7F2] px-8 text-lg font-bold text-zinc-900 transition duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(250,247,242,0.4)]">
            احجز الآن
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>