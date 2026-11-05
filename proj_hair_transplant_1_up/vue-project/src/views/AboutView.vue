<script setup lang="ts">
import { BTN_PRIMARY, IMG, hideBroken, img, motionIn } from '../utils/helpers'
import type { TeamMember } from '../types'

const storyText = motionIn({ y: 40 })
const storyImg = motionIn({ y: 40, delay: 150 })
const cta = motionIn({ y: 30, scale: 0.97 })

const team: (TeamMember & { m: ReturnType<typeof motionIn> })[] = [
  { id: 1, name: 'د. كرم السعدي', role: 'رئيس الفريق الطبي — جراح استعادة الشعر', years: 18, certs: 'ABHRS • عضو ISHRS', image: IMG.doctor1 },
  { id: 2, name: 'د. ياسر العبيدي', role: 'أخصائي تقنية DHI بأقلام التصميم', years: 12, certs: 'ISHRS • شهادة تدريب دولية', image: IMG.doctor2 },
  { id: 3, name: 'د. لانا الحديثي', role: 'أمراض جلدية وعلاجات البلازما PRP', years: 10, certs: 'زمالة الأمراض الجلدية • ISHRS', image: IMG.doctor4 },
  { id: 4, name: 'د. مازن الشمري', role: 'استشاري زراعة اللحية وتكثيف التاج', years: 14, certs: 'ABHRS • ترخيص وزارة الصحة', image: IMG.doctor3 },
].map((d, i) => ({ ...d, m: motionIn({ y: 40, delay: i * 110 }) }))

const accreditations = [
  { name: 'ISHRS', desc: 'عضوية الجمعية الدولية لجراحة استعادة الشعر، والتزام بمعايير الممارسة الأخلاقية والعلمية المعتمدة.' },
  { name: 'ABHRS', desc: 'شهادة المجلس الأمريكي لجراحة استعادة الشعر لدى أطبائنا الجراحين، وتعني اجتياز أعلى اختبارات الكفاءة.' },
  { name: 'اعتماد وزارة الصحة', desc: 'ترخيص رسمي لمزاولة المهنة وفحص دوري لغرف العمليات وبروتوكولات التعقيم ومكافحة العدوى.' },
]

const gallery = [
  { image: IMG.hero, caption: 'فريقنا أثناء عملية زراعة', alt: 'فريق طبي يجري عملية زراعة شعر' },
  { image: IMG.surgery, caption: 'تحضير الطعوم بدقة', alt: 'تحضير البصيلات أثناء عملية الزراعة' },
  { image: IMG.tools, caption: 'أدوات زراعة متناهية الدقة', alt: 'أدوات جراحية دقيقة لزراعة الشعر' },
  { image: IMG.consult, caption: 'فحص وعلاج داخل العيادة', alt: 'طبيب يعالج مريضاً داخل العيادة' },
]
</script>

<template>
  <div>
    <!-- Header -->
    <section class="bg-gradient-to-r from-slate-950 via-zinc-900 to-cyan-950 py-16 text-center text-white">
      <div class="mx-auto max-w-3xl px-5">
        <p class="mb-3 font-bold text-bronze-light">من نحن</p>
        <h1 class="mb-4 text-4xl sm:text-5xl">قصة مركز بُني على الثقة</h1>
        <p class="leading-8 text-slate-300">رحلة بدأت برؤية واضحة: أن يحصل كل مراجع على نتيجة طبيعية وصادقة وبمعايير طبية لا تقبل التهاون.</p>
      </div>
    </section>

    <!-- Story -->
    <section class="bg-white py-20">
      <div class="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-2">
        <div v-motion :initial="storyImg.initial" :visible-once="storyImg.enter" class="relative order-2 lg:order-1">
          <div class="pointer-events-none absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-cyan-500/20 to-bronze/20 blur-2xl" />
          <div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800 to-cyan-950 shadow-2xl shadow-slate-900/20">
            <img :src="img(IMG.team, 1200)" alt="الفريق الطبي في مركز أوريكس" class="aspect-[5/4] w-full object-cover" loading="lazy" @error="hideBroken" />
          </div>
        </div>

        <div v-motion :initial="storyText.initial" :visible-once="storyText.enter" class="order-1 lg:order-2">
          <h2 class="mb-6 text-3xl text-slate-900 sm:text-4xl">كيف بدأنا</h2>
          <p class="mb-5 leading-9 text-slate-600">
            تأسس مركز أوريكس قبل أكثر من خمسة عشر عاماً على يد فريق من الجراحين رأوا أن كثيراً من المرضى يتعرضون لنتائج غير طبيعية
            بسبب التسرع وضعف التخطيط. فكان الهدف أن نبني مركزاً يضع التصميم الدقيق والصدق مع المريض قبل أي اعتبار آخر.
          </p>
          <div class="mb-5 rounded-2xl border-r-4 border-cyan-600 bg-slate-50 p-5">
            <h3 class="mb-2 text-lg text-slate-900">رؤيتنا</h3>
            <p class="leading-8 text-slate-600">أن نكون الوجهة الأولى لمن يبحث عن حل دائم وطبيعي لفقدان الشعر في المنطقة.</p>
          </div>
          <div class="rounded-2xl border-r-4 border-bronze bg-slate-50 p-5">
            <h3 class="mb-2 text-lg text-slate-900">رسالتنا</h3>
            <p class="leading-8 text-slate-600">استعادة ثقة المراجعين بأنفسهم عبر أحدث التقنيات وكادر متمرس وشفافية كاملة في الخطة والتكلفة.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Team -->
    <section class="bg-slate-50 py-20">
      <div class="mx-auto max-w-7xl px-5">
        <div class="mx-auto mb-12 max-w-2xl text-center">
          <p class="mb-2 font-bold text-cyan-700">الكادر الطبي</p>
          <h2 class="text-3xl text-slate-900 sm:text-4xl">أطباء يشرفون على كل التفاصيل</h2>
        </div>
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <article
            v-for="d in team"
            :key="d.id"
            v-motion
            :initial="d.m.initial"
            :visible-once="d.m.enter"
            class="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-md transition duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-cyan-500/20"
          >
            <div class="overflow-hidden bg-gradient-to-br from-slate-800 to-cyan-950">
              <img :src="img(d.image, 700)" :alt="d.name" class="aspect-[4/5] w-full object-cover object-top transition duration-500 group-hover:scale-105" loading="lazy" @error="hideBroken" />
            </div>
            <div class="p-5">
              <h3 class="mb-1 text-lg text-slate-900">{{ d.name }}</h3>
              <p class="mb-3 text-sm leading-7 text-slate-500">{{ d.role }}</p>
              <p class="text-sm font-bold text-cyan-700">خبرة {{ d.years }} عاماً</p>
              <p class="mt-1 text-sm text-bronze">{{ d.certs }}</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- Accreditations -->
    <section class="bg-white py-20">
      <div class="mx-auto max-w-7xl px-5">
        <div class="mx-auto mb-12 max-w-2xl text-center">
          <p class="mb-2 font-bold text-bronze">الاعتمادات</p>
          <h2 class="text-3xl text-slate-900 sm:text-4xl">معايير دولية نلتزم بها</h2>
        </div>
        <div class="grid gap-6 md:grid-cols-3">
          <div v-for="a in accreditations" :key="a.name" class="rounded-3xl border border-slate-200 bg-gradient-to-b from-slate-50 to-white p-7 text-center transition duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-cyan-500/15">
            <h3 class="mb-3 bg-gradient-to-l from-cyan-700 to-bronze bg-clip-text text-2xl font-bold text-transparent">{{ a.name }}</h3>
            <p class="leading-8 text-slate-600">{{ a.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Photo gallery -->
    <section class="bg-slate-50 py-20">
      <div class="mx-auto max-w-7xl px-5">
        <h2 class="mb-10 text-center text-3xl text-slate-900 sm:text-4xl">داخل المركز</h2>
        <div class="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <figure v-for="g in gallery" :key="g.caption" class="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800 to-cyan-950 shadow-md transition duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-cyan-500/20">
            <img :src="img(g.image, 800)" :alt="g.alt" class="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" @error="hideBroken" />
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
            <figcaption class="absolute inset-x-0 bottom-0 p-5 font-bold text-white">{{ g.caption }}</figcaption>
          </figure>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="px-5 py-20">
      <div v-motion :initial="cta.initial" :visible-once="cta.enter" class="mx-auto max-w-4xl rounded-3xl bg-gradient-to-l from-cyan-600 to-slate-900 px-8 py-12 text-center text-white shadow-2xl shadow-cyan-900/30">
        <h2 class="mb-4 text-3xl">جاهز لأول خطوة نحو شعرك الجديد؟</h2>
        <p class="mx-auto mb-8 max-w-lg leading-8 text-cyan-50/90">استشارة مجانية بفحص دقيق وخطة واضحة دون أي التزام.</p>
        <RouterLink to="/booking" :class="BTN_PRIMARY" class="!bg-none bg-white !text-slate-900 !border-white">احجز استشارتك</RouterLink>
      </div>
    </section>
  </div>
</template>