<script setup lang="ts">
import { PHOTOS } from '../utils/photos'
import type { TeamMember } from '../types'

const team: TeamMember[] = [
  {
    id: 1,
    name: 'د. كريم الهاشمي',
    specialty: 'رئيس الفريق — نحت اللحية وتصميم الخطوط',
    years: 14,
    certificates: ['ISHRS Fellow', 'ABHRS Diplomate'],
    photo: PHOTOS.doctors[0],
  },
  {
    id: 2,
    name: 'د. ياسر العبيدي',
    specialty: 'زراعة الشارب وتكثيف الذقن بتقنية DHI',
    years: 11,
    certificates: ['ISHRS Member', 'شهادة DHI العالمية'],
    photo: PHOTOS.doctors[1],
  },
  {
    id: 3,
    name: 'د. ليث النعيمي',
    specialty: 'إصلاح ندوب الوجه والشعر الحائر',
    years: 10,
    certificates: ['ABHRS Diplomate', 'زمالة الجراحة التجميلية'],
    photo: PHOTOS.doctors[2],
  },
  {
    id: 4,
    name: 'د. سارة الجبوري',
    specialty: 'جلسات البلازما PRP والعناية بعد العملية',
    years: 8,
    certificates: ['ISHRS Member', 'اعتماد وزارة الصحة'],
    photo: PHOTOS.doctors[3],
  },
]

const accreditations = [
  { name: 'ISHRS', text: 'عضوية الجمعية الدولية لجراحة استعادة الشعر، والتزام بأحدث بروتوكولات الجودة والسلامة.' },
  { name: 'ABHRS', text: 'أطباؤنا حاصلون على شهادة المجلس الأمريكي لجراحة استعادة الشعر.' },
  { name: 'اعتماد وزارة الصحة', text: 'مركز مرخّص ومعتمد رسمياً، وتخضع منشأتنا وتجهيزاتنا لتفتيش دوري.' },
]
</script>

<template>
  <div>
    <!-- Header -->
    <section class="relative overflow-hidden bg-gradient-to-r from-zinc-900 via-stone-900 to-yellow-950 py-16 text-white sm:py-20">
      <div class="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-amber-500/20 blur-3xl"></div>
      <div v-motion :initial="{ opacity: 0, y: 30 }" :enter="{ opacity: 1, y: 0, transition: { duration: 600 } }" class="relative mx-auto max-w-4xl px-4 text-center">
        <h1 class="text-4xl font-bold sm:text-5xl">من نحن</h1>
        <p class="mt-5 text-lg leading-9 text-stone-300">قصة مركز آمن بأن اللحية فنّ، وأن الدقة هي سرّ النتيجة الطبيعية.</p>
      </div>
    </section>

    <!-- Story -->
    <section class="bg-[#FAF7F2] py-20">
      <div class="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div v-motion :initial="{ opacity: 0, y: 40 }" :visible-once="{ opacity: 1, y: 0, transition: { duration: 700 } }">
          <h2 class="text-3xl font-bold text-stone-900">حكايتنا</h2>
          <p class="mt-5 leading-9 text-stone-600">
            تأسس مركز تيتان قبل أكثر من اثني عشر عاماً على فكرة بسيطة: أن اللحية الجيدة لا تُزرع فقط، بل تُصمَّم. بدأنا بعيادة صغيرة وفريق من الأطباء المتخصصين، وكبرنا بثقة المراجعين ونتائجهم.
          </p>
          <p class="mt-4 leading-9 text-stone-600">
            رؤيتنا أن نحت اللحية فنٌّ يجمع الدقة الطبية بالذائقة الجمالية، ورسالتنا أن نعيد الثقة لكل رجل عانى من فراغات أو ندوب أو كثافة غير متوازنة، بنتيجة تبدو كأنها لم تتدخل فيها يد.
          </p>
        </div>
        <div v-motion :initial="{ opacity: 0, y: 50 }" :visible-once="{ opacity: 1, y: 0, transition: { duration: 700, delay: 150 } }">
          <div class="overflow-hidden rounded-3xl shadow-2xl shadow-yellow-900/20 transition duration-500 hover:scale-[1.02]">
            <img :src="PHOTOS.story" alt="حلاق يعمل على نحت لحية رجل بدقة" class="aspect-[4/3] w-full object-cover" loading="lazy" />
          </div>
        </div>
      </div>
    </section>

    <!-- الكادر الطبي -->
    <section class="bg-stone-100 py-20">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="mx-auto mb-12 max-w-2xl text-center">
          <h2 class="text-3xl font-bold text-stone-900 sm:text-4xl">الكادر الطبي</h2>
          <p class="mt-4 leading-8 text-stone-500">أطباء متخصصون في نحت اللحية وزراعتها، بخبرة وشهادات دولية.</p>
        </div>
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div
            v-for="(m, i) in team"
            :key="m.id"
            v-motion
            :initial="{ opacity: 0, y: 40 }"
            :visible-once="{ opacity: 1, y: 0, transition: { duration: 600, delay: i * 100 } }"
          >
            <article class="h-full overflow-hidden rounded-3xl bg-[#FAF7F2] shadow-lg transition duration-500 hover:scale-[1.02] hover:shadow-[0_20px_50px_-15px_rgba(184,134,11,0.45)]">
              <img :src="m.photo" :alt="`صورة ${m.name}`" class="aspect-[4/5] w-full object-cover" loading="lazy" />
              <div class="p-5">
                <h3 class="text-lg font-bold text-stone-900">{{ m.name }}</h3>
                <p class="mt-1 text-sm leading-7 text-yellow-800">{{ m.specialty }}</p>
                <p class="mt-3 text-sm font-bold text-stone-700">خبرة {{ m.years }} عاماً</p>
                <ul class="mt-2 space-y-1 text-sm text-stone-500">
                  <li v-for="c in m.certificates" :key="c">{{ c }}</li>
                </ul>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>

    <!-- الاعتمادات -->
    <section class="bg-gradient-to-r from-zinc-900 via-stone-900 to-yellow-950 py-20 text-white">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 class="mb-12 text-center text-3xl font-bold sm:text-4xl">الاعتمادات الدولية</h2>
        <div class="grid gap-6 md:grid-cols-3">
          <div v-for="a in accreditations" :key="a.name" class="rounded-3xl border border-yellow-700/30 bg-white/5 p-6 backdrop-blur transition duration-500 hover:scale-[1.02] hover:border-yellow-600/60">
            <h3 class="text-2xl font-bold text-amber-300">{{ a.name }}</h3>
            <p class="mt-3 leading-8 text-stone-300">{{ a.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Photo Gallery -->
    <section class="bg-[#FAF7F2] py-20">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 class="mb-12 text-center text-3xl font-bold text-stone-900 sm:text-4xl">داخل المركز</h2>
        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div
            v-for="(g, i) in PHOTOS.gallery"
            :key="g"
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :visible-once="{ opacity: 1, y: 0, transition: { duration: 600, delay: i * 100 } }"
          >
            <div class="overflow-hidden rounded-2xl shadow-lg transition duration-500 hover:scale-[1.02]">
              <img :src="g" :alt="`لقطة من داخل المركز رقم ${i + 1}`" class="aspect-square w-full object-cover" loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-stone-100 py-16">
      <div class="mx-auto max-w-3xl px-4 text-center">
        <h2 class="text-3xl font-bold text-stone-900">جاهز لتبدأ رحلة لحيتك؟</h2>
        <p class="mt-3 leading-8 text-stone-500">استشارة مجانية داخل المركز تضع بين يديك خطة واضحة.</p>
        <RouterLink to="/booking" class="btn-copper mt-6 text-lg">احجز استشارتك</RouterLink>
      </div>
    </section>
  </div>
</template>