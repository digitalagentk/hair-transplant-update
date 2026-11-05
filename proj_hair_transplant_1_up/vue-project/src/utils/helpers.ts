/* ───────── بيانات المركز (عدّلها هنا فقط) ───────── */
export const CLINIC = {
  nameAr: 'مركز أوريكس لزراعة الشعر',
  nameEn: 'Oryx Hair Transplant Center',
  phone: '+964 770 000 0000',
  phoneHref: 'tel:+9647700000000',
  whatsapp: '9647700000000',
  email: 'info@oryx-clinic.com',
  address: 'بغداد – المنصور، شارع الأطباء، مجمع أوريكس الطبي، الطابق الثالث',
  hours: [
    { days: 'السبت – الخميس', time: '9:00 صباحاً – 8:00 مساءً' },
    { days: 'الجمعة', time: 'بموعد مسبق فقط' },
  ],
}

export const SERVICES: string[] = ['زراعة شعر رأس', 'زراعة لحية', 'بلازما', 'استشارة عامة']
export const TIMES: string[] = ['صباحاً', 'ظهراً', 'مساءً']

/* ───────── كلاسات مشتركة ───────── */
export const INPUT_CLS =
  'h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-slate-900 placeholder:text-slate-400 transition focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/30'

export const BTN_PRIMARY =
  'inline-flex min-h-12 items-center justify-center rounded-xl border border-cyan-500/30 bg-gradient-to-l from-cyan-600 to-slate-900 px-7 font-bold text-white shadow-lg transition duration-300 hover:scale-[1.03] hover:shadow-[0_0_28px_rgba(6,182,212,0.45)] focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none'

export const BTN_GHOST =
  'inline-flex min-h-12 items-center justify-center rounded-xl border border-white/25 bg-white/5 px-7 font-bold text-white backdrop-blur transition duration-300 hover:scale-[1.03] hover:border-cyan-400/60 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none'

/* ───────── الصور ─────────
   القيمة يمكن أن تكون:
   - رقم صورة Pexels (مثل '36963686')
   - مسار محلي (مثل '/images/hero.jpg' من مجلد public)
   - رابط كامل يبدأ بـ http
   لتغيير أي صورة عدّل القيمة هنا فقط. */
export const IMG = {
  // فريق طبي يجري عملية زراعة شعر
  hero: '36963686',
  // تحضير الطعوم + أدوات الزراعة
  surgery: '27138339',
  tools: '27138340',
  // غرفة العمليات والفريق
  team: '12351699',
  // طبيب يعالج مريضاً داخل العيادة
  consult: '32260065',
  clinic: '32260064',
  reception: '32260064',
  // طعوم وأدوات
  lab: '27138343',
  // أطباء وجراحون أثناء العمل
  doctor1: '35634454',
  doctor2: '21810006',
  doctor3: '32260064',
  doctor4: '12351699',
  // صفحة الدخول: رجل بشعر كثيف بعد الزراعة
  loginHero: '37825461',
  // معرض الحالات (صور توضيحية — استبدلها بصور المرضى الحقيقية)
  before: ['39570855', '12474260', '8875609', '8727407', '38108997', '35833841'],
  after: ['39303687', '17987955', '8367711', '5485626', '38167608', '37825461'],
}

export const img = (src: string, w = 1200) => {
  if (src.startsWith('http') || src.startsWith('/')) return src
  return `https://images.pexels.com/photos/${src}/pexels-photo-${src}.jpeg?auto=compress&cs=tinysrgb&w=${w}`
}

/** عند فشل تحميل الصورة: نخفيها فتظهر الخلفية المتدرجة للحاوية */
export function hideBroken(e: Event) {
  ;(e.target as HTMLImageElement).style.visibility = 'hidden'
}

/* ───────── أنيميشن @vueuse/motion مع احترام prefers-reduced-motion ───────── */
const reduced =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

interface MotionOpts {
  x?: number
  y?: number
  scale?: number
  duration?: number
  delay?: number
}

export function motionIn(opts: MotionOpts = {}): {
  initial: Record<string, any>
  enter: Record<string, any>
} {
  const { x = 0, y = 0, scale = 1, duration = 700, delay = 0 } = opts
  const end = { opacity: 1, x: 0, y: 0, scale: 1 }
  if (reduced) {
    return { initial: { ...end }, enter: { ...end, transition: { duration: 0 } } }
  }
  return {
    initial: { opacity: 0, x, y, scale },
    enter: { ...end, transition: { duration, delay, ease: 'easeOut' } },
  }
}