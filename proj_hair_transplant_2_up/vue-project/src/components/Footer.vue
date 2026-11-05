<script setup lang="ts">
const quickLinks = [
  { to: '/', label: 'الرئيسية' },
  { to: '/about', label: 'من نحن' },
  { to: '/gallery', label: 'معرض الحالات' },
  { to: '/pricing', label: 'الباقات والأسعار' },
  { to: '/booking', label: 'احجز استشارتك' },
  { to: '/login', label: 'تسجيل الدخول' },
]
const year = new Date().getFullYear()
</script>

<template>
  <footer class="bg-zinc-900 text-stone-300">
    <div class="h-px bg-gradient-to-r from-transparent via-yellow-700/60 to-transparent"></div>

    <div class="mx-auto grid max-w-6xl gap-8 px-4 py-9 sm:px-6 md:grid-cols-[1.5fr_1fr_1.3fr] lg:px-8">
      <!-- 1) عن المركز -->
      <div>
        <div class="mb-3 flex items-center gap-2.5">
          <svg viewBox="0 0 32 32" class="h-9 w-9 shrink-0" fill="none" stroke="#D4A574" stroke-width="1.6" stroke-linecap="round" aria-hidden="true">
            <circle cx="16" cy="16" r="14.5" />
            <path d="M9 13.5c0 5.4 3 9 7 9s7-3.600 7-9" />
            <path d="M11.500 17.200c1.600-1.300 3-1.300 4.500 0 1.500-1.300 2.900-1.300 4.500 0" />
            <path d="M16 22.500v2.200M13 21.600l-.8 1.800M19 21.600l.8 1.800" />
          </svg>
          <span class="text-base font-bold text-stone-100">مركز تيتان للحية والنحت</span>
        </div>
        <p class="max-w-sm text-[13px] leading-6 text-stone-400">
          زراعة وتكثيف اللحية والشارب، ملء الفراغات، نحت اللحية وإصلاح ندوب الوجه، بخبرة تتجاوز 12 عاماً وفريق طبي معتمد دولياً.
        </p>
        <p class="mt-3 text-xs font-bold text-yellow-600">ISHRS &middot; ABHRS &middot; وزارة الصحة</p>
      </div>

      <!-- 2) روابط سريعة -->
      <div>
        <h3 class="text-sm font-bold text-stone-100">روابط سريعة</h3>
        <span class="mb-3 mt-1.5 block h-px w-8 bg-yellow-700"></span>
        <ul class="grid grid-cols-2 gap-x-4">
          <li v-for="l in quickLinks" :key="l.to">
            <RouterLink :to="l.to" class="inline-block py-1.5 text-[13px] text-stone-400 transition hover:text-yellow-500">{{ l.label }}</RouterLink>
          </li>
        </ul>
      </div>

      <!-- 3) التواصل -->
      <div>
        <h3 class="text-sm font-bold text-stone-100">تواصل معنا</h3>
        <span class="mb-3 mt-1.5 block h-px w-8 bg-yellow-700"></span>
        <dl class="space-y-2.5 text-[13px] leading-6 text-stone-400">
          <div>
            <dt class="text-xs font-bold text-yellow-600">ساعات العمل</dt>
            <dd>السبت – الخميس: 10 ص – 9 م &middot; الجمعة: 2 – 8 م</dd>
          </div>
          <div>
            <dt class="text-xs font-bold text-yellow-600">العيادة الرئيسية</dt>
            <dd>شارع الأطباء، مجمع تيتان الطبي، الطابق الثالث</dd>
          </div>
          <div class="flex flex-wrap gap-x-6 gap-y-2">
            <div>
              <dt class="text-xs font-bold text-yellow-600">البريد</dt>
              <dd dir="ltr" class="text-right">info@titan-beard.com</dd>
            </div>
            <div>
              <dt class="text-xs font-bold text-yellow-600">الهاتف</dt>
              <dd dir="ltr" class="text-right">+964 770 123 4567</dd>
            </div>
          </div>
        </dl>
      </div>
    </div>

    <div class="border-t border-white/5">
      <div class="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 pb-24 pt-4 sm:flex-row sm:px-6 sm:pb-4 lg:px-8">
        <p class="text-xs text-stone-500">&copy; {{ year }} مركز تيتان للحية والنحت. جميع الحقوق محفوظة.</p>

        <div class="flex items-center gap-2" style="color: #d4a574">
          <a href="https://t.me/" target="_blank" rel="noopener" aria-label="تليجرام" class="flex h-10 w-10 items-center justify-center rounded-full border border-yellow-900/40 transition hover:border-yellow-600 hover:text-yellow-400">
            <svg viewBox="0 0 24 24" class="h-[18px] w-[18px]" fill="currentColor" aria-hidden="true">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
            </svg>
          </a>
          <a href="https://facebook.com/" target="_blank" rel="noopener" aria-label="فيسبوك" class="flex h-10 w-10 items-center justify-center rounded-full border border-yellow-900/40 transition hover:border-yellow-600 hover:text-yellow-400">
            <svg viewBox="0 0 24 24" class="h-[18px] w-[18px]" fill="currentColor" aria-hidden="true">
              <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" />
            </svg>
          </a>
          <a href="https://instagram.com/" target="_blank" rel="noopener" aria-label="إنستغرام" class="flex h-10 w-10 items-center justify-center rounded-full border border-yellow-900/40 transition hover:border-yellow-600 hover:text-yellow-400">
            <svg viewBox="0 0 24 24" class="h-[18px] w-[18px]" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>
          <a href="https://wa.me/9647701234567" target="_blank" rel="noopener" aria-label="واتساب" class="flex h-10 w-10 items-center justify-center rounded-full border border-yellow-900/40 transition hover:border-yellow-600 hover:text-yellow-400">
            <svg viewBox="0 0 24 24" class="h-[18px] w-[18px]" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>