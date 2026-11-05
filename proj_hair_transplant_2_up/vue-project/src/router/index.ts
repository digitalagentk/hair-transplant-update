import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
  }
}

const SITE = 'مركز تيتان للحية والنحت'

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'home', component: () => import('../views/HomeView.vue'), meta: { title: 'الرئيسية' } },
  { path: '/about', name: 'about', component: () => import('../views/AboutView.vue'), meta: { title: 'من نحن' } },
  { path: '/gallery', name: 'gallery', component: () => import('../views/CaseGalleryView.vue'), meta: { title: 'معرض الحالات' } },
  { path: '/pricing', name: 'pricing', component: () => import('../views/PricingView.vue'), meta: { title: 'الباقات والأسعار' } },
  { path: '/booking', name: 'booking', component: () => import('../views/BookingView.vue'), meta: { title: 'حجز استشارة' } },
  { path: '/login', name: 'login', component: () => import('../views/LoginView.vue'), meta: { title: 'تسجيل الدخول' } },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, top: 80 }
    return { top: 0 }
  },
})

router.afterEach((to) => {
  document.title = to.meta.title ? `${to.meta.title} | ${SITE}` : SITE
})

export default router