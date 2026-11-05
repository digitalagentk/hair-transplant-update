<script setup lang="ts">
import SmartImage from '../components/SmartImage.vue'
import { GALLERY, PHOTOS, TEAM } from '../data/content'

const accreditations = [
  { name: 'ISHRS', text: 'عضوية الجمعية الدولية لجراحة استعادة الشعر لأطباء العيادة.' },
  { name: 'EADV', text: 'عضوية الأكاديمية الأوروبية للأمراض الجلدية والتناسلية.' },
  { name: 'وزارة الصحة', text: 'ترخيص واعتماد رسمي لمزاولة الخدمات الطبية التجميلية.' },
]
</script>

<template>
  <div>
    <!-- Header -->
    <section class="relative overflow-hidden bg-gradient-to-r from-slate-900 via-teal-950 to-blue-950 py-16 text-center text-white lg:py-20">
      <div class="pointer-events-none absolute -top-20 right-10 h-72 w-72 rounded-full bg-teal-500/20 blur-3xl"></div>
      <div v-motion :initial="{ opacity: 0, y: 30 }" :enter="{ opacity: 1, y: 0, transition: { duration: 700 } }" class="relative mx-auto max-w-3xl px-4">
        <h1 class="text-4xl sm:text-5xl">من نحن</h1>
        <p class="mt-4 text-lg leading-9 text-slate-300">عيادة متخصصة في العلاجات التجديدية غير الجراحية للشعر.</p>
      </div>
    </section>

    <!-- القصة -->
    <section class="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 lg:grid-cols-2 lg:py-24">
      <div v-motion :initial="{ opacity: 0, y: 40 }" :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 700 } }">
        <div class="overflow-hidden rounded-3xl shadow-2xl shadow-teal-900/20">
          <div class="h-80 sm:h-[26rem]">
            <SmartImage :photo="PHOTOS.team" />
          </div>
        </div>
      </div>
      <div v-motion :initial="{ opacity: 0, y: 40 }" :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 700, delay: 150 } }">
        <span class="eyebrow">قصتنا</span>
        <h2 class="mt-4 text-3xl sm:text-4xl">بدأنا من سؤال: هل يمكن علاج الشعر بلا جراحة؟</h2>
        <p class="mt-5 leading-9 text-slate-600">
          تأسست عيادة ريفايف على قناعة بأن كثيراً من حالات التساقط يمكن إيقافها مبكراً بعلاجات تجديدية تحفّز البصيلات الموجودة بدل اللجوء إلى الجراحة. بدأنا بفريق صغير وجهاز واحد لتحضير البلازما، ونمونا لنصبح عيادة متكاملة تضم أحدث التقنيات.
        </p>
        <p class="mt-4 leading-9 text-slate-600">
          رؤيتنا أن نقدّم علاجاً علمياً صادقاً: نفحص، ونشرح، ونضع توقعات واقعية. ورسالتنا أن نعيد لمراجعينا ثقتهم بمظهرهم دون ألم الجراحة أو فترات النقاهة الطويلة.
        </p>
      </div>
    </section>

    <!-- الكادر الطبي -->
    <section class="bg-white py-16 lg:py-24">
      <div class="mx-auto max-w-7xl px-4">
        <div class="mx-auto max-w-2xl text-center">
          <span class="eyebrow">الكادر الطبي</span>
          <h2 class="mt-4 text-3xl sm:text-4xl">أطباء يهتمون بكل بصيلة</h2>
        </div>
        <div class="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div
            v-for="(d, i) in TEAM"
            :key="d.id"
            v-motion
            :initial="{ opacity: 0, y: 40 }"
            :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 600, delay: i * 100 } }"
          >
            <article class="h-full overflow-hidden rounded-3xl border border-teal-100 bg-aqua shadow-lg shadow-teal-900/5 transition duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-teal-500/20">
              <div class="h-64">
                <SmartImage :photo="d.image" img-class="object-top" />
              </div>
              <div class="p-5">
                <h3 class="text-lg text-slate-900">{{ d.name }}</h3>
                <p class="mt-1 text-sm font-bold text-teal-600">{{ d.role }}</p>
                <p class="mt-3 text-sm text-slate-500">{{ d.experience }}</p>
                <p class="mt-1 text-sm leading-7 text-slate-500">{{ d.credentials }}</p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>

    <!-- الاعتمادات -->
    <section class="mx-auto max-w-7xl px-4 py-16 lg:py-24">
      <div class="mx-auto max-w-2xl text-center">
        <span class="eyebrow">الاعتمادات</span>
        <h2 class="mt-4 text-3xl sm:text-4xl">معايير موثوقة</h2>
      </div>
      <div class="mt-12 grid gap-6 md:grid-cols-3">
        <div
          v-for="(a, i) in accreditations"
          :key="a.name"
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 600, delay: i * 120 } }"
        >
          <div class="h-full rounded-3xl border border-teal-200 bg-gradient-to-br from-white to-aqua p-7 text-center shadow-lg shadow-teal-900/5 transition duration-300 hover:scale-[1.02]">
            <p class="bg-gradient-to-r from-teal-600 to-blue-900 bg-clip-text text-3xl font-bold text-transparent">{{ a.name }}</p>
            <p class="mt-3 leading-8 text-slate-600">{{ a.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- المعرض -->
    <section class="bg-white py-16 lg:py-24">
      <div class="mx-auto max-w-7xl px-4">
        <div class="mx-auto max-w-2xl text-center">
          <span class="eyebrow">داخل العيادة</span>
          <h2 class="mt-4 text-3xl sm:text-4xl">بيئة نظيفة وهادئة</h2>
        </div>
        <div class="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div
            v-for="(g, i) in GALLERY"
            :key="g.caption"
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 600, delay: i * 100 } }"
          >
            <figure class="group overflow-hidden rounded-3xl shadow-lg">
              <div class="h-64 overflow-hidden">
                <SmartImage :photo="g" img-class="transition duration-500 group-hover:scale-105" />
              </div>
              <figcaption class="bg-slate-900 px-4 py-3 text-center text-sm font-bold text-teal-100">{{ g.caption }}</figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="px-4 py-16 lg:py-20">
      <div class="mx-auto max-w-4xl rounded-3xl bg-gradient-to-r from-teal-600 to-slate-900 px-6 py-12 text-center text-white shadow-2xl shadow-teal-900/30">
        <h2 class="text-3xl">جاهز لبدء رحلة علاج شعرك؟</h2>
        <p class="mt-3 text-teal-50">استشارة أولية مع فحص لفروة الرأس لتحديد الخطة الأنسب.</p>
        <RouterLink to="/booking" class="mt-7 inline-flex min-h-[44px] items-center justify-center rounded-xl bg-white px-8 py-3 font-bold text-slate-900 shadow-lg transition duration-300 hover:scale-[1.05]">
          احجز استشارتك
        </RouterLink>
      </div>
    </section>
  </div>
</template>