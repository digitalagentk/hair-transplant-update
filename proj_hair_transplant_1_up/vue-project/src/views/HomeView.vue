<script setup lang="ts">
import { BTN_GHOST, BTN_PRIMARY, IMG, hideBroken, img, motionIn } from '../utils/helpers'
import type { Testimonial } from '../types'

const heroText = motionIn({ y: 40, duration: 800 })
const heroCard = motionIn({ y: 50, duration: 900, delay: 200 })
const secTitle = motionIn({ y: 30 })
const aboutText = motionIn({ y: 40 })
const aboutImg = motionIn({ y: 40, delay: 150 })
const cta = motionIn({ y: 30, scale: 0.97 })

const experience = [
  {
    title: '+15 عاماً من الخبرة',
    text: 'فريق طبي متخصص في جراحة استعادة الشعر، راكم خبرة طويلة في تصميم خطوط شعر طبيعية تناسب ملامح كل وجه.',
    image: IMG.team,
    alt: 'الفريق الطبي في مركز أوريكس',
  },
  {
    title: '+8,000 عملية ناجحة',
    text: 'آلاف الحالات من الصلع الوراثي وتراجع خط الشعر أُنجزت في غرف عمليات معقمة وبأجهزة دقيقة حديثة.',
    image: IMG.surgery,
    alt: 'غرفة عمليات حديثة',
  },
  {
    title: 'تقنيات FUE و DHI المعتمدة',
    text: 'اقتطاف وزراعة بأدوات متناهية الدقة تحافظ على سلامة البصيلة وتمنح كثافة وزاوية نمو طبيعية.',
    image: IMG.tools,
    alt: 'أدوات دقيقة لعمليات زراعة الشعر',
  },
].map((e, i) => ({ ...e, m: motionIn({ y: 40, delay: i * 130 }) }))

const testimonials: (Testimonial & { m: ReturnType<typeof motionIn> })[] = [
  {
    id: 1,
    name: 'عبدالله ك.',
    procedure: 'زراعة 4000 بصيلة — FUE',
    text: 'كنت متردداً لسنوات، لكن الشرح الواضح في الاستشارة والمتابعة بعد العملية أعطاني اطمئناناً كبيراً. النتيجة طبيعية جداً حتى أن المحيطين بي لم يلاحظوا سوى تحسن مظهري.',
    rating: 5,
  },
  {
    id: 2,
    name: 'حيدر م.',
    procedure: 'زراعة 3200 بصيلة — DHI',
    text: 'الفريق دقيق ومحترف، والعملية كانت أهدأ مما توقعت. خط الشعر الجديد مرسوم بعناية ويناسب وجهي تماماً.',
    rating: 5,
  },
  {
    id: 3,
    name: 'سجاد ع.',
    procedure: 'تكثيف التاج — 2800 بصيلة FUE',
    text: 'أكثر ما أعجبني الصدق في التعامل؛ شرحوا لي المتوقع بالتفصيل ولم يبالغوا بالوعود. بعد أشهر صرت أرى الكثافة في منطقة التاج.',
    rating: 5,
  },
].map((t, i) => ({ ...t, m: motionIn({ y: 40, delay: i * 130 }) }))
</script>

<template>
  <div>
    <!-- 1) Hero -->
    <section class="relative overflow-hidden bg-gradient-to-r from-slate-950 via-zinc-900 to-cyan-950 text-white">
      <div class="pointer-events-none absolute -top-24 right-[-6rem] h-96 w-96 rounded-full bg-cyan-500/15 blur-3xl" />
      <div class="pointer-events-none absolute bottom-[-6rem] left-[-4rem] h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />

      <div class="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 lg:grid-cols-2 lg:py-24">
        <div v-motion :initial="heroText.initial" :enter="heroText.enter">
          <p class="mb-4 inline-block rounded-full border border-bronze-light/40 bg-bronze/10 px-4 py-1.5 text-sm font-bold text-bronze-light">
            FUE • DHI • علاج الصلع الوراثي
          </p>
          <h1 class="mb-6 text-4xl leading-tight sm:text-5xl lg:text-6xl">
            استعد شعرك...
            <span class="bg-gradient-to-l from-cyan-300 to-bronze-light bg-clip-text text-transparent">بثقة لا تُضاهى</span>
          </h1>
          <p class="mb-8 max-w-xl text-lg leading-9 text-slate-300">
            نجمع في مركز أوريكس بين تقنيتي FUE وDHI وخبرة تتجاوز 15 عاماً لنمنحك كثافة طبيعية ودائمة بخط شعر مصمَّم لوجهك.
            نتائج طبيعية دائمة، وإشراف طبي كامل من الفحص وحتى المتابعة.
          </p>
          <div class="flex flex-wrap gap-4">
            <RouterLink to="/booking" :class="BTN_PRIMARY">احجز استشارتك المجانية</RouterLink>
            <RouterLink to="/gallery" :class="BTN_GHOST">شاهد نتائجنا</RouterLink>
          </div>
        </div>

        <div v-motion :initial="heroCard.initial" :enter="heroCard.enter" class="relative">
          <div class="pointer-events-none absolute -inset-6 rounded-[2.5rem] bg-cyan-500/20 blur-3xl" />
          <div class="float-slow relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-800 to-cyan-950 shadow-2xl shadow-cyan-950/50">
            <img :src="img(IMG.hero, 1400)" alt="غرفة عمليات زراعة شعر حديثة وطبيب يعمل بدقة" class="aspect-[4/3] w-full object-cover" loading="eager" @error="hideBroken" />
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
            <div class="absolute inset-x-0 bottom-0 flex items-end justify-between p-6">
              <div>
                <p class="text-3xl font-bold text-white">+8,000</p>
                <p class="text-sm text-slate-300">عملية ناجحة</p>
              </div>
              <p class="rounded-full border border-bronze-light/50 bg-slate-950/60 px-4 py-1.5 text-sm font-bold text-bronze-light backdrop-blur">
                إشراف طبي معتمد
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 2) الخبرة والتميز -->
    <section class="bg-slate-50 py-20">
      <div class="mx-auto max-w-7xl px-5">
        <div v-motion :initial="secTitle.initial" :visible-once="secTitle.enter" class="mx-auto mb-12 max-w-2xl text-center">
          <p class="mb-2 font-bold text-cyan-700">لماذا أوريكس</p>
          <h2 class="mb-4 text-3xl text-slate-900 sm:text-4xl">خبرة وتقنية تصنعان الفارق</h2>
          <p class="leading-8 text-slate-500">أرقام وحقائق تعكس التزامنا بأعلى معايير الجودة والسلامة في كل خطوة من رحلتك.</p>
        </div>

        <div class="grid gap-6 md:grid-cols-3">
          <article
            v-for="e in experience"
            :key="e.title"
            v-motion
            :initial="e.m.initial"
            :visible-once="e.m.enter"
            class="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-md transition duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-cyan-500/20"
          >
            <div class="overflow-hidden bg-gradient-to-br from-slate-800 to-cyan-950">
              <img :src="img(e.image, 900)" :alt="e.alt" class="h-56 w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" @error="hideBroken" />
            </div>
            <div class="p-6">
              <h3 class="mb-3 text-xl text-slate-900">{{ e.title }}</h3>
              <p class="leading-8 text-slate-500">{{ e.text }}</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- 3) خبرة المركز والكادر -->
    <section class="bg-white py-20">
      <div class="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-2">
        <div v-motion :initial="aboutText.initial" :visible-once="aboutText.enter">
          <p class="mb-2 font-bold text-bronze">كادرنا الطبي</p>
          <h2 class="mb-6 text-3xl leading-snug text-slate-900 sm:text-4xl">خبرة تُبنى بالثقة... وكادر لا يعرف سوى الإتقان</h2>
          <p class="mb-5 leading-9 text-slate-600">
            في أوريكس يبدأ كل شيء بفحص دقيق للمنطقة المانحة وتصميم خط شعر يحترم ملامحك وعمرك وتوقعاتك الواقعية. يقود الفريق
            أطباء متخصصون في جراحة استعادة الشعر، يشرفون بأنفسهم على كل مرحلة من مراحل العملية دون تفويض الجوهر لغيرهم.
          </p>
          <p class="leading-9 text-slate-600">
            يعمل معهم كادر فني مدرّب على أحدث تقنيات الاقتطاف والزراعة، ضمن بروتوكولات تعقيم صارمة واعتمادات دولية تشمل
            عضوية الجمعية الدولية لجراحة استعادة الشعر وترخيص وزارة الصحة. نؤمن أن النتيجة الطبيعية هي ثمرة الصبر والدقة.
          </p>
        </div>

        <div v-motion :initial="aboutImg.initial" :visible-once="aboutImg.enter" class="relative">
          <div class="pointer-events-none absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-cyan-500/20 to-bronze/20 blur-2xl" />
          <div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800 to-cyan-950 shadow-2xl shadow-slate-900/20">
            <img :src="img(IMG.consult, 1200)" alt="طبيب يشرح الحالة لمريض داخل العيادة" class="aspect-[5/4] w-full object-cover" loading="lazy" @error="hideBroken" />
          </div>
        </div>
      </div>
    </section>

    <!-- 4) آراء المراجعين -->
    <section class="bg-slate-50 py-20">
      <div class="mx-auto max-w-7xl px-5">
        <div class="mx-auto mb-12 max-w-2xl text-center">
          <p class="mb-2 font-bold text-cyan-700">آراء المراجعين</p>
          <h2 class="text-3xl text-slate-900 sm:text-4xl">ثقتهم هي أكبر إنجاز لنا</h2>
        </div>

        <div class="grid gap-6 md:grid-cols-3">
          <figure
            v-for="t in testimonials"
            :key="t.id"
            v-motion
            :initial="t.m.initial"
            :visible-once="t.m.enter"
            class="flex flex-col rounded-3xl border border-slate-200 bg-white p-7 shadow-md transition duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-cyan-500/20"
          >
            <div class="mb-4 flex gap-1 text-bronze-light" :aria-label="`تقييم ${t.rating} من 5`" role="img">
              <svg v-for="n in t.rating" :key="n" viewBox="0 0 20 20" class="h-5 w-5" fill="currentColor" aria-hidden="true">
                <path d="M10 1.5l2.6 5.5 6 .8-4.4 4.2 1.1 6-5.3-2.9-5.3 2.9 1.1-6L1.4 7.8l6-.8z" />
              </svg>
            </div>
            <blockquote class="mb-6 flex-1 leading-8 text-slate-600">{{ t.text }}</blockquote>
            <figcaption class="flex items-center gap-3 border-t border-slate-100 pt-5">
              <span class="inline-flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-cyan-600 to-slate-900 font-bold text-white" aria-hidden="true">
                {{ t.name.charAt(0) }}
              </span>
              <span>
                <span class="block font-bold text-slate-900">{{ t.name }}</span>
                <span class="block text-sm text-slate-500">{{ t.procedure }}</span>
              </span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>

    <!-- 5) CTA -->
    <section class="px-5 py-20">
      <div
        v-motion
        :initial="cta.initial"
        :visible-once="cta.enter"
        class="relative mx-auto max-w-5xl overflow-hidden rounded-3xl bg-gradient-to-l from-cyan-600 to-slate-900 px-8 py-14 text-center text-white shadow-2xl shadow-cyan-900/30"
      >
        <div class="pointer-events-none absolute -top-16 left-10 h-56 w-56 rounded-full bg-bronze-light/20 blur-3xl" />
        <h2 class="relative mb-4 text-3xl sm:text-4xl">شعرك الجديد... على بُعد استشارة</h2>
        <p class="relative mx-auto mb-8 max-w-xl leading-8 text-cyan-50/90">
          احجز استشارتك المجانية وسيفحص أحد أطباء المركز حالتك ويضع لك خطة واضحة وسعراً شفافاً.
        </p>
        <RouterLink
          to="/booking"
          class="relative inline-flex min-h-12 items-center justify-center rounded-xl bg-white px-8 font-bold text-slate-900 shadow-lg transition duration-300 hover:scale-[1.05] hover:shadow-[0_0_30px_rgba(255,255,255,0.35)] focus-visible:ring-2 focus-visible:ring-white"
        >
          احجز الآن
        </RouterLink>
      </div>
    </section>
  </div>
</template>