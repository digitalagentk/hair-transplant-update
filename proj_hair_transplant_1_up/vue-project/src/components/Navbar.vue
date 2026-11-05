<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import { BTN_PRIMARY, CLINIC } from '../utils/helpers'

const route = useRoute()
const { isLoggedIn } = useAuth()
const open = ref(false)

const links = [
  { to: '/', label: 'الرئيسية' },
  { to: '/about', label: 'من نحن' },
  { to: '/gallery', label: 'معرض الحالات' },
  { to: '/pricing', label: 'الباقات والأسعار' },
]

watch(
  () => route.fullPath,
  () => {
    open.value = false
  },
)

watch(open, (v) => {
  document.body.style.overflow = v ? 'hidden' : ''
})
</script>

<template>
  <header class="sticky top-0 z-40 h-16 border-b border-cyan-900/40 bg-slate-950/80 backdrop-blur-xl">
    <div class="mx-auto flex h-full max-w-7xl items-center justify-between gap-4 px-5">
      <!-- الشعار (أقصى اليمين) -->
      <RouterLink
        to="/"
        class="flex shrink-0 items-center gap-3 rounded-lg focus-visible:ring-2 focus-visible:ring-cyan-400"
        aria-label="مركز أوريكس لزراعة الشعر — الصفحة الرئيسية"
      >
        <svg viewBox="0 0 40 40" class="h-10 w-10" aria-hidden="true">
          <defs>
            <linearGradient id="nav-logo-g" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="40" y2="40">
              <stop offset="0" stop-color="#22d3ee" />
              <stop offset="1" stop-color="#c9a961" />
            </linearGradient>
          </defs>
          <circle cx="20" cy="20" r="18" fill="none" stroke="url(#nav-logo-g)" stroke-width="2" />
          <g fill="none" stroke="url(#nav-logo-g)" stroke-width="2" stroke-linecap="round">
            <path d="M20 28V11" />
            <path d="M20 22c-1-4-4-6-7.5-7" />
            <path d="M20 22c1-4 4-6 7.5-7" />
          </g>
          <circle cx="20" cy="30.5" r="2.4" fill="url(#nav-logo-g)" />
        </svg>
        <span class="text-base font-bold leading-tight text-white sm:text-lg">مركز أوريكس لزراعة الشعر</span>
      </RouterLink>

      <!-- الروابط (الوسط) -->
      <nav class="hidden items-center gap-8 lg:flex" aria-label="التنقل الرئيسي">
        <RouterLink v-for="l in links" :key="l.to" :to="l.to" custom v-slot="{ href, navigate, isActive, isExactActive }">
          <a
            :href="href"
            @click="navigate"
            :aria-current="(l.to === '/' ? isExactActive : isActive) ? 'page' : undefined"
            class="relative py-2 font-bold transition-colors duration-300 hover:text-cyan-300"
            :class="(l.to === '/' ? isExactActive : isActive) ? 'text-cyan-400' : 'text-slate-200'"
          >
            {{ l.label }}
            <span
              class="absolute inset-x-0 -bottom-0.5 h-0.5 origin-center rounded-full bg-gradient-to-l from-cyan-400 to-bronze-light transition-transform duration-300"
              :class="(l.to === '/' ? isExactActive : isActive) ? 'scale-x-100' : 'scale-x-0'"
            />
          </a>
        </RouterLink>
      </nav>

      <!-- الأزرار (أقصى اليسار) -->
      <div class="hidden items-center gap-3 lg:flex">
        <RouterLink
          to="/login"
          class="inline-flex h-11 items-center rounded-xl border border-white/20 px-5 font-bold text-slate-100 transition hover:border-cyan-400/60 hover:text-cyan-300 focus-visible:ring-2 focus-visible:ring-cyan-400"
        >
          {{ isLoggedIn ? 'حسابي' : 'تسجيل الدخول' }}
        </RouterLink>
        <RouterLink to="/booking" :class="BTN_PRIMARY" class="!min-h-11">احجز استشارتك</RouterLink>
      </div>

      <!-- هامبرغر -->
      <button
        type="button"
        class="inline-flex h-11 w-11 items-center justify-center rounded-lg text-white transition hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-cyan-400 lg:hidden"
        aria-label="فتح القائمة"
        :aria-expanded="open"
        @click="open = true"
      >
        <svg viewBox="0 0 24 24" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      </button>
    </div>

    <!-- Drawer -->
    <Transition name="drawer">
      <div v-if="open" class="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="القائمة">
        <div class="drawer-backdrop absolute inset-0 bg-slate-950/70 backdrop-blur-sm" @click="open = false" />
        <aside
          class="drawer-panel absolute inset-y-0 right-0 flex w-[82%] max-w-sm flex-col border-l border-cyan-900/40 bg-gradient-to-b from-slate-950 via-zinc-900 to-cyan-950 p-6 shadow-2xl"
        >
          <div class="mb-8 flex items-center justify-between">
            <span class="font-bold text-white">{{ CLINIC.nameAr }}</span>
            <button
              type="button"
              class="inline-flex h-11 w-11 items-center justify-center rounded-lg text-white hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-cyan-400"
              aria-label="إغلاق القائمة"
              @click="open = false"
            >
              <svg viewBox="0 0 24 24" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          <nav class="flex flex-col gap-1" aria-label="قائمة الجوال">
            <RouterLink
              v-for="l in links"
              :key="l.to"
              :to="l.to"
              class="flex min-h-12 items-center rounded-xl px-4 font-bold text-slate-200 transition hover:bg-white/5 hover:text-cyan-300"
              active-class="!bg-cyan-500/10 !text-cyan-300"
              exact-active-class="!bg-cyan-500/10 !text-cyan-300"
            >
              {{ l.label }}
            </RouterLink>
          </nav>

          <div class="mt-auto flex flex-col gap-3 pt-8">
            <RouterLink
              to="/login"
              class="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/20 font-bold text-white transition hover:border-cyan-400/60"
            >
              {{ isLoggedIn ? 'حسابي' : 'تسجيل الدخول' }}
            </RouterLink>
            <RouterLink to="/booking" :class="BTN_PRIMARY">احجز استشارتك</RouterLink>
          </div>
        </aside>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.drawer-enter-active,
.drawer-leave-active {
  transition: opacity 0.3s ease;
}
.drawer-enter-active .drawer-panel,
.drawer-leave-active .drawer-panel {
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}
.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
}
.drawer-enter-from .drawer-panel,
.drawer-leave-to .drawer-panel {
  transform: translateX(100%);
}
</style>