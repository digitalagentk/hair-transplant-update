<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const route = useRoute()
const { user, isLoggedIn } = useAuth()
const drawerOpen = ref(false)

const links = [
  { to: '/', label: 'الرئيسية' },
  { to: '/about', label: 'من نحن' },
  { to: '/gallery', label: 'معرض الحالات' },
  { to: '/pricing', label: 'الباقات والأسعار' },
]

const accountLabel = computed(() =>
  isLoggedIn.value && user.value ? user.value.name.split(' ')[0] : 'تسجيل الدخول',
)

watch(
  () => route.fullPath,
  () => {
    drawerOpen.value = false
  },
)

watch(drawerOpen, (v) => {
  document.body.style.overflow = v ? 'hidden' : ''
})

function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') drawerOpen.value = false
}
onMounted(() => window.addEventListener('keydown', onKey))
onUnmounted(() => {
  window.removeEventListener('keydown', onKey)
  document.body.style.overflow = ''
})
</script>

<template>
  <header class="sticky top-0 z-40 h-16 border-b border-yellow-900/40 bg-zinc-900/80 backdrop-blur-md">
    <div class="mx-auto flex h-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
      <!-- الشعار (أقصى اليمين) -->
      <RouterLink to="/" class="flex items-center gap-3" aria-label="مركز تيتان للحية والنحت - الرئيسية">
        <svg viewBox="0 0 32 32" class="h-10 w-10 shrink-0" fill="none" stroke="#D4A574" stroke-width="1.6" stroke-linecap="round" aria-hidden="true">
          <circle cx="16" cy="16" r="14.5" />
          <path d="M9 13.5c0 5.4 3 9 7 9s7-3.600 7-9" />
          <path d="M11.500 17.200c1.600-1.300 3-1.300 4.500 0 1.500-1.300 2.900-1.300 4.500 0" />
          <path d="M16 22.500v2.200M13 21.600l-.8 1.800M19 21.600l.8 1.800" />
        </svg>
        <span class="text-sm font-bold leading-tight text-stone-100 sm:text-base">مركز تيتان للحية والنحت</span>
      </RouterLink>

      <!-- الروابط (الوسط) -->
      <nav class="hidden items-center gap-7 lg:flex" aria-label="التنقل الرئيسي">
        <RouterLink v-for="l in links" :key="l.to" :to="l.to" class="nav-link">{{ l.label }}</RouterLink>
      </nav>

      <!-- الأزرار (أقصى اليسار) -->
      <div class="flex items-center gap-2">
        <RouterLink to="/booking" class="btn-copper hidden !min-h-11 !px-4 text-sm sm:inline-flex">احجز استشارتك</RouterLink>
        <RouterLink
          to="/login"
          class="hidden min-h-11 items-center rounded-xl border border-stone-500/50 px-4 text-sm font-bold text-stone-100 transition hover:border-yellow-500 hover:text-yellow-400 lg:inline-flex"
        >
          {{ accountLabel }}
        </RouterLink>

        <button
          type="button"
          class="flex h-11 w-11 items-center justify-center rounded-xl border border-stone-600/60 text-stone-100 transition hover:border-yellow-500 lg:hidden"
          aria-label="فتح القائمة"
          :aria-expanded="drawerOpen"
          @click="drawerOpen = true"
        >
          <svg viewBox="0 0 24 24" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
      </div>
    </div>
  </header>

  <!-- Drawer للجوال -->
  <Transition name="fade">
    <div v-if="drawerOpen" class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden" @click="drawerOpen = false" />
  </Transition>

  <aside
    class="fixed inset-y-0 right-0 z-50 flex w-72 max-w-[85vw] flex-col border-l border-yellow-900/40 bg-gradient-to-b from-zinc-900 via-stone-900 to-yellow-950 p-5 shadow-2xl transition-[transform,visibility] duration-300 lg:hidden"
    :class="drawerOpen ? 'translate-x-0' : 'invisible translate-x-full'"
    role="dialog"
    aria-label="القائمة الجانبية"
    :aria-hidden="!drawerOpen"
  >
    <div class="mb-6 flex items-center justify-between">
      <span class="font-bold text-yellow-500">مركز تيتان</span>
      <button type="button" class="flex h-11 w-11 items-center justify-center rounded-xl text-stone-200 transition hover:bg-white/10" aria-label="إغلاق القائمة" @click="drawerOpen = false">
        <svg viewBox="0 0 24 24" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
    </div>

    <nav class="flex flex-col gap-1" aria-label="التنقل الجانبي">
      <RouterLink v-for="l in links" :key="l.to" :to="l.to" class="drawer-link">{{ l.label }}</RouterLink>
      <RouterLink to="/login" class="drawer-link">{{ accountLabel }}</RouterLink>
    </nav>

    <RouterLink to="/booking" class="btn-copper mt-auto w-full">احجز استشارتك</RouterLink>
  </aside>
</template>