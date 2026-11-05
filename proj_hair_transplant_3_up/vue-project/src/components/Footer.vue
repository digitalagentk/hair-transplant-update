<script setup lang="ts">
import { ref } from 'vue'
import { CLINIC, NAV_LINKS } from '../data/content'

const email = ref('')
const emailError = ref('')
const subscribed = ref(false)

function subscribe() {
  if (!/^\S+@\S+\.\S+$/.test(email.value.trim())) {
    emailError.value = 'يرجى إدخال بريد إلكتروني صحيح'
    return
  }
  emailError.value = ''
  subscribed.value = true
  email.value = ''
}
</script>

<template>
  <footer
    v-motion
    :initial="{ opacity: 0, y: 24 }"
    :visibleOnce="{ opacity: 1, y: 0, transition: { duration: 600 } }"
    class="relative border-t border-teal-800/30 bg-gradient-to-br from-slate-950 via-teal-950 to-blue-950 text-slate-300"
  >
    <!-- خط لمعان رفيع أعلى الفوتر -->
    <div class="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal-400/50 to-transparent"></div>

    <div class="mx-auto max-w-7xl px-4 pb-5 pt-10">
      <div class="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-[1.5fr_0.8fr_1.4fr_1.4fr] lg:gap-10">
        <!-- 1: الشعار -->
        <div class="col-span-2 lg:col-span-1">
          <div class="flex items-center gap-3">
            <svg viewBox="0 0 40 40" class="h-10 w-10" fill="none" aria-hidden="true">
              <defs>
                <linearGradient id="logoFoot" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#2DD4BF" />
                  <stop offset="1" stop-color="#3B82F6" />
                </linearGradient>
              </defs>
              <circle cx="20" cy="20" r="18" stroke="url(#logoFoot)" stroke-width="2" />
              <path d="M20 8c4.5 6 8 9.6 8 14a8 8 0 1 1-16 0c0-4.4 3.5-8 8-14z" fill="url(#logoFoot)" />
              <path d="M20 16.5v11M16.5 23l3.5 3.5 3.5-3.5" stroke="#0F172A" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <span class="text-lg font-bold text-white">{{ CLINIC.shortName }}</span>
          </div>
          <p class="mt-3 max-w-xs text-sm leading-7 text-slate-400">
            علاجات تجديدية غير جراحية لشعر أكثر كثافة وصحة — بلازما، ميزوثيرابي، وخلايا جذعية.
          </p>
        </div>

        <!-- 2: روابط سريعة -->
        <nav aria-label="روابط سريعة">
          <h3 class="mb-3 text-sm font-bold text-white">روابط سريعة</h3>
          <ul class="space-y-1.5 text-sm">
            <li v-for="l in NAV_LINKS" :key="l.to">
              <RouterLink :to="l.to" class="inline-block py-0.5 transition hover:text-teal-300">{{ l.label }}</RouterLink>
            </li>
            <li>
              <RouterLink to="/booking" class="inline-block py-0.5 font-bold text-teal-300 transition hover:text-teal-200">احجز استشارتك</RouterLink>
            </li>
          </ul>
        </nav>

        <!-- 3: التواصل -->
        <div>
          <h3 class="mb-3 text-sm font-bold text-white">معلومات التواصل</h3>
          <ul class="space-y-2 text-sm leading-6">
            <li class="text-slate-400">{{ CLINIC.address }}</li>
            <li><a :href="`mailto:${CLINIC.email}`" class="transition hover:text-teal-300">{{ CLINIC.email }}</a></li>
            <li class="flex flex-wrap items-center gap-x-2">
              <a :href="`tel:${CLINIC.phone.replace(/\s/g, '')}`" class="transition hover:text-teal-300" dir="ltr">{{ CLINIC.phone }}</a>
              <span class="text-slate-600" aria-hidden="true">|</span>
              <a :href="`https://wa.me/${CLINIC.whatsapp}`" target="_blank" rel="noopener" class="transition hover:text-teal-300">واتساب</a>
            </li>
            <li v-for="h in CLINIC.hours" :key="h.days" class="flex justify-between gap-3 border-t border-teal-900/40 pt-2 first:mt-1">
              <span class="font-bold text-white">{{ h.days }}</span>
              <span class="text-slate-400">{{ h.time }}</span>
            </li>
          </ul>
        </div>

        <!-- 4: النشرة -->
        <div class="col-span-2 lg:col-span-1">
          <h3 class="mb-3 text-sm font-bold text-white">اشترك معنا</h3>
          <p class="mb-3 text-sm leading-6 text-slate-400">اشترك لتصلك أحدث العروض والنصائح الصحية.</p>

          <p v-if="subscribed" role="status" class="rounded-xl border border-teal-500/40 bg-teal-500/10 px-4 py-3 text-sm font-bold text-teal-200">
            شكراً لاشتراكك، سنوافيك بكل جديد.
          </p>
          <form v-else novalidate @submit.prevent="subscribe">
            <div class="flex gap-2">
              <label for="newsletter-email" class="sr-only">البريد الإلكتروني</label>
              <input
                id="newsletter-email"
                v-model="email"
                type="email"
                autocomplete="email"
                placeholder="بريدك الإلكتروني"
                class="min-h-[44px] min-w-0 flex-1 rounded-xl border border-teal-800/50 bg-slate-950/50 px-4 text-sm text-white placeholder:text-slate-500 focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-400/40"
                :aria-invalid="!!emailError"
                aria-describedby="newsletter-err"
              />
              <button type="submit" class="btn-primary shrink-0 !px-5 !py-2.5 text-sm">اشتراك</button>
            </div>
            <p v-if="emailError" id="newsletter-err" class="mt-1.5 text-xs text-red-300">{{ emailError }}</p>
          </form>
        </div>
      </div>

      <!-- الشريط السفلي -->
      <div class="mt-8 flex flex-col items-center gap-3 border-t border-teal-800/30 pt-4 sm:flex-row sm:justify-between">
        <p class="text-xs text-slate-400">© 2025 عيادة ريفايف — جميع الحقوق محفوظة.</p>

        <p class="hidden text-xs text-slate-500 lg:block">تختلف النتائج من شخص لآخر ويحدّدها الطبيب بعد الفحص.</p>

        <div class="flex items-center gap-1.5 text-teal-200">
          <a href="#" aria-label="تليجرام" class="soc">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
            </svg>
          </a>
          <a href="#" aria-label="فيسبوك" class="soc">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
              <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" />
            </svg>
          </a>
          <a href="#" aria-label="إنستغرام" class="soc">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>
          <a :href="`https://wa.me/${CLINIC.whatsapp}`" target="_blank" rel="noopener" aria-label="واتساب" class="soc">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.soc {
  display: flex;
  height: 44px;
  width: 44px;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  border: 1px solid rgb(19 78 74 / 0.5);
  transition: transform 0.3s ease, color 0.3s ease, border-color 0.3s ease;
}
.soc:hover {
  transform: scale(1.1);
  color: #5eead4;
  border-color: rgb(45 212 191 / 0.6);
}
</style>