import { createApp } from 'vue'
import { MotionPlugin } from '@vueuse/motion'
import App from './App.vue'
import router from './router'
import './assets/main.css'

document.documentElement.lang = 'ar'
document.documentElement.dir = 'rtl'

// بديل تلقائي لأي صورة لا تُحمَّل (رابط معطّل أو انقطاع شبكة)
const FALLBACK =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#27272a"/><stop offset="0.6" stop-color="#1c1917"/><stop offset="1" stop-color="#422006"/></linearGradient></defs><rect width="800" height="1000" fill="url(#g)"/></svg>`,
  )

window.addEventListener(
  'error',
  (e) => {
    const t = e.target
    if (t instanceof HTMLImageElement && !t.dataset.fallback) {
      t.dataset.fallback = '1'
      t.src = FALLBACK
    }
  },
  true,
)

const app = createApp(App)
app.use(MotionPlugin)
app.use(router)
app.mount('#app')