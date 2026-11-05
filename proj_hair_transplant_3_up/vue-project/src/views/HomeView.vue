<script setup lang="ts">
import SmartImage from '../components/SmartImage.vue'
import { PHOTOS, TESTIMONIALS } from '../data/content'

const experience = [
  {
    title: '+10 سنوات في العلاجات التجديدية',
    text: 'فريق طبي تخصّص في طب الشعر والعلاجات التجديدية، ويضع لكل مراجع خطة تناسب حالة بصيلاته.',
    photo: PHOTOS.team,
  },
  {
    title: '+3,000 جلسة بلازما ناجحة',
    text: 'بروتوكول دقيق لتحضير البلازما الغنية بالصفائح باستخدام أدوات معقّمة أحادية الاستخدام.',
    photo: PHOTOS.prp,
  },
  {
    title: 'تقنيات الخلايا الجذعية والميزوثيرابي',
    text: 'أحدث الأجهزة والمحاليل الطبية لدعم البصيلات الضعيفة وتحفيز نمو الشعر بصورة طبيعية.',
    photo: PHOTOS.lab,
  },
]
</script>

<template>
  <div>
    <!-- 1) Hero -->
    <section class="relative overflow-hidden bg-gradient-to-r from-slate-900 via-teal-950 to-blue-950 text-white">
      <div class="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-teal-500/20 blur-3xl"></div>
      <div class="pointer-events-none absolute -bottom-32 left-0 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl"></div>
      <div class="pointer-events-none absolute left-1/3 top-1/2 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl"></div>

      <div class="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 lg:grid-cols-2 lg:py-24">
        <div v-motion :initial="{ opacity: 0, y: 40 }" :enter="{ opacity: 1, y: 0, transition: { duration: 700 } }">
          <span class="inline-flex items-center rounded-full border border-teal-400/30 bg-teal-400/10 px-4 py-1.5 text-sm font-bold text-teal-300">
            علاجات تجديدية غير جراحية للشعر
          </span>
          <h1 class="mt-6 text-4xl leading-[1.35] sm:text-5xl lg:text-6xl">
            أوقف التساقط...
            <span class="block bg-gradient-to-l from-teal-300 to-cyan-400 bg-clip-text text-transparent">وأعد إحياء بصيلاتك</span>
          </h1>
          <p class="mt-6 max-w-xl text-lg leading-9 text-slate-300">
            نجمع بين حقن البلازما الغنية بالصفائح (PRP) والميزوثيرابي الطبي وتقنيات الخلايا الجذعية في علاج غير جراحي يقوّي البصيلات ويحدّ من التساقط، بدون جراحة وبدون فترة نقاهة طويلة.
          </p>
          <div class="mt-8 flex flex-wrap gap-4">
            <RouterLink to="/booking" class="btn-primary">احجز استشارتك المجانية</RouterLink>
            <RouterLink to="/gallery" class="btn-glass">شاهد النتائج</RouterLink>
          </div>
        </div>

        <!-- بطاقة الصورة: الحركة الخارجية للدخول، والداخلية للـ float -->
        <div v-motion :initial="{ opacity: 0, y: 50 }" :enter="{ opacity: 1, y: 0, transition: { duration: 800, delay: 200 } }" class="relative">
          <div class="halo absolute -inset-4 rounded-[2.5rem] bg-teal-500/25 blur-3xl"></div>
          <div class="float-card relative">
            <div class="relative overflow-hidden rounded-3xl shadow-2xl shadow-teal-900/40 ring-1 ring-white/10">
              <div class="h-80 sm:h-[28rem]">
                <SmartImage :photo="PHOTOS.hero" eager />
              </div>
              <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-teal-950/80 via-transparent to-transparent"></div>
              <div class="pointer-events-none absolute inset-x-0 bottom-0 p-6">
                <p class="text-sm font-bold text-teal-300">بروتوكول PRP</p>
                <p class="mt-1 text-xl font-bold">تحفيز البصيلات بخلايا جسمك نفسه</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 2) الخبرة والتميز -->
    <section class="mx-auto max-w-7xl px-4 py-16 lg:py-24">
      <div class="mx-auto max-w-2xl text-center">
        <span class="eyebrow">لماذا ريفايف</span>
        <h2 class="mt-4 text-3xl sm:text-4xl">خبرة تُترجم إلى نتائج</h2>
        <p class="mt-4 leading-8 text-slate-500">علم دقيق، وأجهزة حديثة، وفريق يرافقك في كل خطوة من رحلة علاج شعرك.</p>
      </div>

      <div class="mt-12 grid gap-8 md:grid-cols-3">
        <div
          v-for="(c, i) in experience"
          :key="c.title"
          v-motion
          :initial="{ opacity: 0, y: 40 }"
          :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 600, delay: i * 120 } }"
        >
          <article class="h-full overflow-hidden rounded-3xl border border-teal-100 bg-white shadow-lg shadow-teal-900/5 transition duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-teal-500/20">
            <div class="h-56">
              <SmartImage :photo="c.photo" />
            </div>
            <div class="p-6">
              <h3 class="text-xl text-slate-900">{{ c.title }}</h3>
              <p class="mt-3 leading-8 text-slate-500">{{ c.text }}</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- 3) عن العيادة والكادر -->
    <section class="bg-white py-16 lg:py-24">
      <div class="mx-auto grid max-w-7xl items-center gap-12 px-4 lg:grid-cols-2">
        <div v-motion :initial="{ opacity: 0, y: 40 }" :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 700 } }">
          <span class="eyebrow">عن العيادة</span>
          <h2 class="mt-4 text-3xl sm:text-4xl">علم... وتجديد... بلا جراحة</h2>
          <p class="mt-5 leading-9 text-slate-600">
            في عيادة ريفايف نؤمن بأن بصيلاتك تملك قدرة على التجدد إذا حصلت على التحفيز الصحيح. يبدأ كل برنامج بفحص دقيق لفروة الرأس لتحديد سبب التساقط، ثم نختار التقنية الأنسب: بلازما غنية بالصفائح، أو ميزوثيرابي طبي، أو خلايا جذعية.
          </p>
          <p class="mt-4 leading-9 text-slate-600">
            يشرف على كل حالة أطباء متخصصون في طب الشعر والعلاجات التجديدية، يعاونهم كادر مدرّب على أعلى معايير التعقيم والسلامة، وتلتزم العيادة بمعايير الجهات الصحية والاعتمادات الدولية في المجال.
          </p>
          <RouterLink to="/about" class="btn-primary mt-8">تعرّف علينا</RouterLink>
        </div>

        <div v-motion :initial="{ opacity: 0, y: 50 }" :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 800, delay: 150 } }">
          <div class="overflow-hidden rounded-3xl shadow-2xl shadow-teal-900/20">
            <div class="h-80 sm:h-[26rem]">
              <SmartImage :photo="PHOTOS.consult" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 4) آراء المراجعين -->
    <section class="mx-auto max-w-7xl px-4 py-16 lg:py-24">
      <div class="mx-auto max-w-2xl text-center">
        <span class="eyebrow">آراء المراجعين</span>
        <h2 class="mt-4 text-3xl sm:text-4xl">تجارب مراجعينا</h2>
      </div>

      <div class="mt-12 grid gap-8 md:grid-cols-3">
        <div
          v-for="(t, i) in TESTIMONIALS"
          :key="t.id"
          v-motion
          :initial="{ opacity: 0, y: 40 }"
          :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 600, delay: i * 120 } }"
        >
          <figure class="flex h-full flex-col rounded-3xl border border-teal-100 bg-white p-7 shadow-lg shadow-teal-900/5 transition duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-teal-500/20">
            <div class="flex gap-1 text-amber-400" :aria-label="`تقييم ${t.rating} من 5`" role="img">
              <svg v-for="n in t.rating" :key="n" viewBox="0 0 20 20" class="h-5 w-5" fill="currentColor" aria-hidden="true">
                <path d="M10 1.5l2.6 5.4 5.9.8-4.3 4.1 1 5.9L10 14.9l-5.2 2.8 1-5.9L1.5 7.7l5.9-.8L10 1.5z" />
              </svg>
            </div>
            <blockquote class="mt-4 flex-1 leading-8 text-slate-600">{{ t.text }}</blockquote>
            <figcaption class="mt-6 border-t border-teal-100 pt-4">
              <p class="font-bold text-slate-900">{{ t.name }}</p>
              <p class="mt-1 text-sm font-bold text-teal-600">{{ t.treatment }}</p>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>

    <!-- 5) CTA -->
    <section class="px-4 pb-16 lg:pb-24">
      <div
        v-motion
        :initial="{ opacity: 0, y: 40 }"
        :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 700 } }"
        class="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-to-r from-teal-600 to-slate-900 px-6 py-14 text-center text-white shadow-2xl shadow-teal-900/30"
      >
        <div class="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
        <h2 class="relative text-3xl sm:text-4xl">شعرك يستحق فرصة جديدة</h2>
        <p class="relative mx-auto mt-4 max-w-xl leading-8 text-teal-50">ابدأ بفحص فروة رأسك واعرف الخطة الأنسب لحالتك مع أحد أطبائنا.</p>
        <RouterLink to="/booking" class="relative mt-8 inline-flex min-h-[44px] items-center justify-center rounded-xl bg-white px-8 py-3 font-bold text-slate-900 shadow-lg transition duration-300 hover:scale-[1.05] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]">
          احجز الآن
        </RouterLink>
      </div>
    </section>
  </div>
</template>