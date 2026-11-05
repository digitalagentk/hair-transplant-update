import { createRouter, createWebHistory } from 'vue-router'
import { CLINIC } from '../data/content'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: () => import('../views/HomeView.vue'), meta: { title: 'الرئيسية' } },
    { path: '/about', name: 'about', component: () => import('../views/AboutView.vue'), meta: { title: 'من نحن' } },
    { path: '/gallery', name: 'gallery', component: () => import('../views/CaseGalleryView.vue'), meta: { title: 'معرض الحالات' } },
    { path: '/pricing', name: 'pricing', component: () => import('../views/PricingView.vue'), meta: { title: 'الباقات والأسعار' } },
    { path: '/booking', name: 'booking', component: () => import('../views/BookingView.vue'), meta: { title: 'احجز استشارتك' } },
    { path: '/login', name: 'login', component: () => import('../views/LoginView.vue'), meta: { title: 'تسجيل الدخول' } },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0, behavior: 'smooth' }
  },
})

router.afterEach((to) => {
  const title = (to.meta.title as string | undefined) ?? ''
  document.title = title ? `${title} | ${CLINIC.shortName}` : CLINIC.name
})

export default router