<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import { NAV_LINKS, CLINIC } from '../data/content'
import { useAuth } from '../composables/useAuth'

const route = useRoute()
const { isLoggedIn } = useAuth()
const open = ref(false)
const close = () => (open.value = false)

watch(() => route.fullPath, close)
watch(open, (v) => {
  document.body.style.overflow = v ? 'hidden' : ''
})

const onKey = (e: KeyboardEvent) => {
  if (e.key === 'Escape') close()
}
onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKey)
  document.body.style.overflow = ''
})
</script>

<template>
  <header class="sticky top-0 z-40 h-16 border-b border-teal-900/40 bg-slate-900/80 backdrop-blur-xl">
    <div class="mx-auto flex h-full max-w-7xl items-center justify-between gap-4 px-4">
      <!-- الشعار (أقصى اليمين) -->
      <RouterLink to="/" class="group flex min-h-[44px] items-center gap-3" aria-label="الرئيسية">
        <svg viewBox="0 0 40 40" class="h-10 w-10 transition duration-300 group-hover:scale-105" fill="none" aria-hidden="true">
          <defs>
            <linearGradient id="logoNav" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
              <stop stop-color="#2DD4BF" />
              <stop offset="1" stop-color="#3B82F6" />
            </linearGradient>
          </defs>
          <circle cx="20" cy="20" r="18" stroke="url(#logoNav)" stroke-width="2" />
          <path d="M20 8c4.5 6 8 9.6 8 14a8 8 0 1 1-16 0c0-4.4 3.5-8 8-14z" fill="url(#logoNav)" />
          <path d="M20 16.5v11M16.5 23l3.5 3.5 3.5-3.5" stroke="#0F172A" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <span class="text-sm font-bold leading-tight text-white sm:text-base">
          عيادة ريفايف
          <span class="hidden text-teal-300 md:inline">للعلاجات التجديدية</span>
        </span>
      </RouterLink>

      <!-- الروابط (الوسط) -->
      <nav class="hidden items-center gap-8 lg:flex" aria-label="التنقل الرئيسي">
        <RouterLink v-for="l in NAV_LINKS" :key="l.to" :to="l.to" custom v-slot="{ href, navigate, isExactActive }">
          <a
            :href="href"
            class="relative flex min-h-[44px] items-center font-bold transition-colors duration-300"
            :class="isExactActive ? 'text-teal-400' : 'text-slate-200 hover:text-teal-300'"
            :aria-current="isExactActive ? 'page' : undefined"
            @click="navigate"
          >
            {{ l.label }}
            <span
              class="absolute inset-x-0 bottom-1.5 h-0.5 origin-center rounded-full bg-gradient-to-r from-teal-400 to-blue-500 transition-transform duration-300"
              :class="isExactActive ? 'scale-x-100' : 'scale-x-0'"
            ></span>
          </a>
        </RouterLink>
      </nav>

      <!-- الأزرار (أقصى اليسار) -->
      <div class="flex items-center gap-2">
        <RouterLink to="/booking" class="btn-primary hidden !px-4 !py-2 text-sm sm:inline-flex">
          احجز استشارتك
        </RouterLink>
        <RouterLink
          to="/login"
          class="hidden min-h-[44px] items-center rounded-xl border border-teal-700/50 px-4 text-sm font-bold text-teal-100 transition duration-300 hover:border-teal-400 hover:bg-teal-500/10 sm:inline-flex"
        >
          {{ isLoggedIn ? 'حسابي' : 'تسجيل الدخول' }}
        </RouterLink>

        <button
          type="button"
          class="flex h-11 w-11 items-center justify-center rounded-xl border border-teal-800/50 text-white transition hover:bg-white/10 lg:hidden"
          aria-label="فتح القائمة"
          :aria-expanded="open"
          @click="open = true"
        >
          <svg viewBox="0 0 24 24" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
      </div>
    </div>
  </header>

  <!-- Drawer (Teleport لأن backdrop-filter على الهيدر يكسر position:fixed) -->
  <Teleport to="body">
    <Transition name="drawer">
      <div v-if="open" class="fixed inset-0 z-[60]">
        <div class="absolute inset-0 bg-slate-950/70 backdrop-blur-sm" @click="close"></div>
        <aside
          class="drawer-panel absolute inset-y-0 right-0 flex w-80 max-w-[85vw] flex-col border-l border-teal-800/40 bg-gradient-to-br from-slate-900 via-teal-950 to-blue-950 p-6 shadow-2xl"
          role="dialog"
          aria-modal="true"
          aria-label="قائمة التنقل"
        >
          <div class="flex items-center justify-between">
            <span class="font-bold text-white">{{ CLINIC.shortName }}</span>
            <button
              type="button"
              class="flex h-11 w-11 items-center justify-center rounded-xl border border-teal-800/50 text-white transition hover:bg-white/10"
              aria-label="إغلاق القائمة"
              @click="close"
            >
              <svg viewBox="0 0 24 24" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          <nav class="mt-8 flex flex-1 flex-col gap-2" aria-label="التنقل الجانبي">
            <RouterLink v-for="l in NAV_LINKS" :key="l.to" :to="l.to" custom v-slot="{ href, navigate, isExactActive }">
              <a
                :href="href"
                class="flex min-h-[48px] items-center rounded-xl px-4 text-lg font-bold transition"
                :class="isExactActive ? 'bg-teal-500/15 text-teal-300' : 'text-slate-200 hover:bg-white/5'"
                @click="navigate"
              >
                {{ l.label }}
              </a>
            </RouterLink>
          </nav>

          <div class="space-y-3">
            <RouterLink to="/booking" class="btn-primary w-full">احجز استشارتك</RouterLink>
            <RouterLink to="/login" class="btn-glass w-full">{{ isLoggedIn ? 'حسابي' : 'تسجيل الدخول' }}</RouterLink>
          </div>
        </aside>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.drawer-enter-active,
.drawer-leave-active {
  transition: opacity 0.3s ease;
}
.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
}
.drawer-enter-active .drawer-panel,
.drawer-leave-active .drawer-panel {
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}
.drawer-enter-from .drawer-panel,
.drawer-leave-to .drawer-panel {
  transform: translateX(100%);
}
</style>