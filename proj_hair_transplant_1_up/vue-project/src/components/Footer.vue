<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { BTN_PRIMARY, CLINIC } from '../utils/helpers'

const quick = [
  { to: '/', label: 'الرئيسية' },
  { to: '/about', label: 'من نحن' },
  { to: '/gallery', label: 'معرض الحالات' },
  { to: '/pricing', label: 'الباقات والأسعار' },
  { to: '/booking', label: 'احجز استشارتك' },
  { to: '/login', label: 'تسجيل الدخول' },
]

const badges = ['ISHRS', 'ABHRS', 'وزارة الصحة']
const year = new Date().getFullYear()
const mapHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CLINIC.address)}`

/* حالة الدوام حسب توقيت بغداد */
const now = ref(new Date())
let timer: ReturnType<typeof setInterval> | undefined
onMounted(() => {
  timer = setInterval(() => (now.value = new Date()), 60000)
})
onBeforeUnmount(() => clearInterval(timer))

const status = computed(() => {
  const t = new Date(now.value.toLocaleString('en-US', { timeZone: 'Asia/Baghdad' }))
  const day = t.getDay()
  const mins = t.getHours() * 60 + t.getMinutes()
  if (day === 5) return { open: false, text: 'الجمعة — بموعد مسبق فقط' }
  if (mins >= 540 && mins < 1200) return { open: true, text: 'مفتوح الآن — حتى 8:00 مساءً' }
  return { open: false, text: 'مغلق الآن — الدوام 9:00 صباحاً إلى 8:00 مساءً' }
})

const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
</script>

<template>
  <footer class="relative overflow-hidden bg-slate-950 text-slate-300">
    <!-- خط علوي متدرج + إضاءات خلفية -->
    <div class="h-px bg-gradient-to-l from-transparent via-cyan-500/60 to-transparent" />
    <div class="pointer-events-none absolute -top-20 right-10 h-56 w-56 rounded-full bg-cyan-500/10 blur-3xl" />
    <div class="pointer-events-none absolute bottom-0 left-10 h-48 w-48 rounded-full bg-bronze/10 blur-3xl" />

    <div class="relative mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr] lg:gap-12">
      <!-- 1) عن المركز -->
      <div>
        <div class="mb-3 flex items-center gap-3">
          <svg viewBox="0 0 40 40" class="h-9 w-9 shrink-0" aria-hidden="true">
            <defs>
              <linearGradient id="foot-logo-g" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="40" y2="40">
                <stop offset="0" stop-color="#22d3ee" />
                <stop offset="1" stop-color="#c9a961" />
              </linearGradient>
            </defs>
            <circle cx="20" cy="20" r="18" fill="none" stroke="url(#foot-logo-g)" stroke-width="2" />
            <g fill="none" stroke="url(#foot-logo-g)" stroke-width="2" stroke-linecap="round">
              <path d="M20 28V11" />
              <path d="M20 22c-1-4-4-6-7.5-7" />
              <path d="M20 22c1-4 4-6 7.5-7" />
            </g>
            <circle cx="20" cy="30.5" r="2.4" fill="url(#foot-logo-g)" />
          </svg>
          <div class="leading-tight">
            <p class="font-bold text-white">{{ CLINIC.nameAr }}</p>
            <p class="text-xs text-slate-500" dir="ltr">{{ CLINIC.nameEn }}</p>
          </div>
        </div>

        <p class="mb-4 max-w-md text-sm leading-7 text-slate-400">
          زراعة شعر الرأس بتقنيتي FUE وDHI بخبرة تتجاوز 15 عاماً، ونتائج طبيعية دائمة بإشراف طبي معتمد دولياً.
        </p>

        <ul class="mb-5 flex flex-wrap gap-2" aria-label="الاعتمادات">
          <li
            v-for="b in badges"
            :key="b"
            class="rounded-full border border-bronze-light/30 bg-bronze/10 px-3 py-1 text-xs font-bold text-bronze-light"
          >
            {{ b }}
          </li>
        </ul>

        <RouterLink to="/booking" :class="BTN_PRIMARY" class="!min-h-11 !px-6 text-sm">احجز استشارتك</RouterLink>
      </div>

      <!-- 2) روابط سريعة -->
      <div>
        <h3 class="mb-3 flex items-center gap-2 text-base text-white">
          <span class="h-4 w-1 rounded-full bg-gradient-to-b from-cyan-400 to-bronze-light" />
          روابط سريعة
        </h3>
        <ul class="grid grid-cols-2 gap-x-4 text-sm md:grid-cols-1">
          <li v-for="l in quick" :key="l.to">
            <RouterLink
              :to="l.to"
              class="group inline-flex min-h-9 items-center gap-2 rounded transition hover:text-cyan-300 focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              <span class="h-px w-0 bg-cyan-400 transition-all duration-300 group-hover:w-3" aria-hidden="true" />
              {{ l.label }}
            </RouterLink>
          </li>
        </ul>
      </div>

      <!-- 3) الدوام والتواصل -->
      <div class="md:col-span-2 lg:col-span-1">
        <h3 class="mb-3 flex items-center gap-2 text-base text-white">
          <span class="h-4 w-1 rounded-full bg-gradient-to-b from-cyan-400 to-bronze-light" />
          الدوام والتواصل
        </h3>

        <p
          class="mb-3 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-bold"
          :class="status.open ? 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300' : 'border-white/15 bg-white/5 text-slate-400'"
          role="status"
        >
          <span class="relative flex h-2 w-2">
            <span v-if="status.open" class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
            <span class="relative inline-flex h-2 w-2 rounded-full" :class="status.open ? 'bg-emerald-400' : 'bg-slate-500'" />
          </span>
          {{ status.text }}
        </p>

        <dl class="space-y-1.5 text-sm">
          <div v-for="h in CLINIC.hours" :key="h.days" class="flex justify-between gap-3 border-b border-white/10 pb-1.5">
            <dt>{{ h.days }}</dt>
            <dd class="text-slate-400">{{ h.time }}</dd>
          </div>
          <div class="flex gap-2 pt-1">
            <dt class="shrink-0 text-slate-500">العنوان:</dt>
            <dd class="leading-6">
              {{ CLINIC.address }}
              <a :href="mapHref" target="_blank" rel="noopener" class="mr-1 font-bold text-cyan-400 hover:text-cyan-300 hover:underline">عرض على الخريطة</a>
            </dd>
          </div>
          <div class="flex flex-wrap gap-x-6 gap-y-1 pt-1">
            <div class="flex gap-2">
              <dt class="text-slate-500">الهاتف:</dt>
              <dd><a :href="CLINIC.phoneHref" dir="ltr" class="hover:text-cyan-300">{{ CLINIC.phone }}</a></dd>
            </div>
            <div class="flex gap-2">
              <dt class="text-slate-500">البريد:</dt>
              <dd><a :href="`mailto:${CLINIC.email}`" class="hover:text-cyan-300">{{ CLINIC.email }}</a></dd>
            </div>
          </div>
        </dl>
      </div>
    </div>

    <!-- الشريط السفلي -->
    <div class="relative border-t border-white/10">
      <div class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 pb-20 pt-4 sm:flex-row sm:pb-4">
        <p class="text-xs text-slate-500">© {{ year }} {{ CLINIC.nameAr }}. جميع الحقوق محفوظة.</p>

        <div class="flex items-center gap-1 text-cyan-400/80">
          <a href="https://t.me/" target="_blank" rel="noopener" aria-label="تليجرام" class="inline-flex h-11 w-11 items-center justify-center rounded-full transition hover:bg-white/5 hover:text-bronze-light focus-visible:ring-2 focus-visible:ring-cyan-400">
            <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2L11 13" /><path d="M22 2l-7 20-4-9-9-4 20-7z" /></svg>
          </a>
          <a href="https://facebook.com/" target="_blank" rel="noopener" aria-label="فيسبوك" class="inline-flex h-11 w-11 items-center justify-center rounded-full transition hover:bg-white/5 hover:text-bronze-light focus-visible:ring-2 focus-visible:ring-cyan-400">
            <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
          </a>
          <a href="https://instagram.com/" target="_blank" rel="noopener" aria-label="إنستغرام" class="inline-flex h-11 w-11 items-center justify-center rounded-full transition hover:bg-white/5 hover:text-bronze-light focus-visible:ring-2 focus-visible:ring-cyan-400">
            <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><path d="M17.5 6.5h.01" /></svg>
          </a>
          <a :href="`https://wa.me/${CLINIC.whatsapp}`" target="_blank" rel="noopener" aria-label="واتساب" class="inline-flex h-11 w-11 items-center justify-center rounded-full transition hover:bg-white/5 hover:text-bronze-light focus-visible:ring-2 focus-visible:ring-cyan-400">
            <svg viewBox="0 0 24 24" class="h-5 w-5" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.18 2.095 3.195 5.076 4.483.709.3 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.123-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
          </a>
        </div>

        <button
          type="button"
          class="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 px-4 text-xs font-bold text-slate-300 transition hover:border-cyan-400/60 hover:text-cyan-300 focus-visible:ring-2 focus-visible:ring-cyan-400"
          @click="toTop"
        >
          العودة للأعلى
          <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
        </button>
      </div>
    </div>
  </footer>
</template>