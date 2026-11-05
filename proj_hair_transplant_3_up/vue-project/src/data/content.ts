import type { Case, Package, Photo, TeamMember, Testimonial } from '../types'

/** بيانات تجريبية — عدّلها ببيانات العيادة الحقيقية */
export const CLINIC = {
  name: 'عيادة ريفايف للعلاجات التجديدية',
  shortName: 'عيادة ريفايف',
  englishName: 'Revive Regenerative Hair Clinic',
  address: 'شارع الأطباء، مجمع ريفايف الطبي، الطابق الثالث',
  email: 'info@revive-clinic.com',
  phone: '+966 50 000 0000',
  whatsapp: '966500000000',
  hours: [
    { days: 'السبت – الخميس', time: '10ص – 10م' },
    { days: 'الجمعة', time: 'مغلق' },
  ],
}

export const NAV_LINKS = [
  { to: '/', label: 'الرئيسية' },
  { to: '/about', label: 'من نحن' },
  { to: '/gallery', label: 'معرض الحالات' },
  { to: '/pricing', label: 'الباقات والأسعار' },
]

export const TREATMENTS = [
  { value: 'prp', label: 'جلسة بلازما PRP' },
  { value: 'meso', label: 'ميزوثيرابي' },
  { value: 'stem', label: 'خلايا جذعية' },
  { value: 'early', label: 'علاج تساقط مبكر' },
  { value: 'general', label: 'استشارة عامة' },
]

export const TIME_SLOTS = [
  { value: 'morning', label: 'صباحاً' },
  { value: 'noon', label: 'ظهراً' },
  { value: 'evening', label: 'مساءً' },
]

export const treatmentLabel = (v: string) => TREATMENTS.find((t) => t.value === v)?.label ?? v
export const timeLabel = (v: string) => TIME_SLOTS.find((t) => t.value === v)?.label ?? v
export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('ar', { day: 'numeric', month: 'long', year: 'numeric' })

/* ====================================================================
   الصور — كل صورة = ملف داخل public/images/
   إذا الملف غير موجود يظهر لوح فيروزي بوصف الصورة (SmartImage.vue).
   ==================================================================== */
const pexels = (id: number, w = 1400) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`

const photo = (file: string, alt: string, caption: string, fallback?: string): Photo => ({
  src: `/images/${file}`,
  alt,
  caption,
  fallback,
})

export const PHOTOS = {
  // احتياطي: صورة Pexels مرتبطة بمقال عن PRP للشعر — تحقّق منها أو استبدلها بـ hero.jpg
  hero: photo(
    'hero.jpg',
    'جلسة علاج تجديدي لفروة الرأس بالبلازما الغنية بالصفائح',
    'جلسة حقن PRP لفروة الرأس',
    pexels(7581572),
  ),
  team: photo('team.jpg', 'فريق طبي متخصص في علاجات الشعر التجديدية', 'الفريق الطبي'),
  prp: photo('prp.jpg', 'أنابيب تحضير البلازما الغنية بالصفائح من دم المراجع', 'تحضير البلازما PRP'),
  lab: photo('lab.jpg', 'مجهر ومختبر لتقنيات الخلايا الجذعية والميزوثيرابي', 'الخلايا الجذعية والميزوثيرابي'),
  consult: photo('consult.jpg', 'طبيب يفحص فروة رأس مراجع بجهاز مكبّر', 'فحص فروة الرأس'),
  room: photo('room.jpg', 'غرفة جلسات علاج الشعر المعقّمة', 'غرفة جلسات معقّمة'),
  reception: photo('reception.jpg', 'استقبال العيادة', 'استقبال هادئ ومريح'),
}

export const GALLERY: Photo[] = [PHOTOS.room, PHOTOS.prp, PHOTOS.reception, PHOTOS.consult]

const casePhotos = (n: number, title: string) => ({
  before: photo(`cases/case-${n}-before.jpg`, `قبل العلاج: ${title}`, 'صورة قبل العلاج'),
  after: photo(`cases/case-${n}-after.jpg`, `بعد العلاج: ${title}`, 'صورة بعد العلاج'),
})

export const CASES: Case[] = [
  {
    id: 'c1',
    title: 'تساقط مبكر في منطقة التاج',
    treatment: 'حقن البلازما PRP',
    sessions: '6 جلسات',
    duration: 'استمرار النتائج بعد 9 أشهر',
    ...casePhotos(1, 'تساقط مبكر في منطقة التاج'),
  },
  {
    id: 'c2',
    title: 'ضعف كثافة الشعر العام',
    treatment: 'ميزوثيرابي للشعر',
    sessions: '6 جلسات',
    duration: 'استمرار النتائج بعد 6 أشهر',
    ...casePhotos(2, 'ضعف كثافة الشعر العام'),
  },
  {
    id: 'c3',
    title: 'ترقق في مقدمة الرأس',
    treatment: 'الخلايا الجذعية',
    sessions: '3 جلسات',
    duration: 'متابعة 12 شهراً',
    ...casePhotos(3, 'ترقق في مقدمة الرأس'),
  },
  {
    id: 'c4',
    title: 'تساقط ما بعد الولادة',
    treatment: 'PRP + ميزوثيرابي',
    sessions: '4 جلسات',
    duration: 'استمرار النتائج بعد 8 أشهر',
    ...casePhotos(4, 'تساقط ما بعد الولادة'),
  },
  {
    id: 'c5',
    title: 'ثعلبة خفيفة موضعية',
    treatment: 'حقن البلازما PRP',
    sessions: '5 جلسات',
    duration: 'متابعة 10 أشهر',
    ...casePhotos(5, 'ثعلبة خفيفة موضعية'),
  },
  {
    id: 'c6',
    title: 'ترقق في منطقة الفودين',
    treatment: 'علاج التساقط المبكر',
    sessions: '4 جلسات',
    duration: 'استمرار النتائج بعد 7 أشهر',
    ...casePhotos(6, 'ترقق في منطقة الفودين'),
  },
]

export const PACKAGES: Package[] = [
  {
    id: 'p1',
    name: 'باقة البلازما الأساسية',
    summary: 'بداية مثالية لتنشيط البصيلات وتقليل التساقط.',
    price: 450,
    oldPrice: 600,
    treatment: 'prp',
    features: ['3 جلسات PRP', 'استشارة طبية أولية', 'تحضير بلازما بأدوات معقّمة أحادية الاستخدام', 'تعليمات عناية بعد الجلسة'],
  },
  {
    id: 'p2',
    name: 'باقة البلازما المتكاملة',
    summary: 'برنامج كامل لاستعادة الكثافة مع تقييم دقيق للفروة.',
    price: 840,
    oldPrice: 1200,
    treatment: 'prp',
    popular: true,
    features: ['6 جلسات PRP', 'فحص فروة الرأس بالمجهر الرقمي', 'خطة علاج مخصّصة', 'متابعة دورية بالصور', 'جلسة مراجعة مجانية'],
  },
  {
    id: 'p3',
    name: 'باقة الميزوثيرابي للشعر',
    summary: 'تغذية مباشرة للبصيلات بمحاليل فيتامينات ومعادن طبية.',
    price: 720,
    oldPrice: 900,
    treatment: 'meso',
    features: ['6 جلسات ميزوثيرابي', 'مكملات غذائية داعمة للشعر', 'استشارة طبية أولية', 'تعليمات عناية منزلية'],
  },
  {
    id: 'p4',
    name: 'باقة الخلايا الجذعية للشعر',
    summary: 'تقنية متقدمة لدعم البصيلات الضعيفة وتحفيز تجددها.',
    price: 1650,
    oldPrice: 2200,
    treatment: 'stem',
    features: ['3 جلسات بالخلايا الجذعية', 'متابعة لمدة 6 أشهر', 'فحص فروة بالمجهر', 'تقارير تقدّم بالصور'],
  },
  {
    id: 'p5',
    name: 'باقة علاج التساقط المبكر',
    summary: 'تدخّل مبكر يجمع أكثر من تقنية لإيقاف التساقط.',
    price: 980,
    oldPrice: 1400,
    treatment: 'early',
    features: ['4 جلسات PRP', 'جلسات ميزوثيرابي داعمة', 'روتين عناية منزلي مخصّص', 'متابعة شهرية'],
  },
  {
    id: 'p6',
    name: 'باقة الصيانة السنوية',
    summary: 'للحفاظ على النتائج وإبقاء البصيلات في أفضل حالاتها.',
    price: 640,
    oldPrice: 800,
    treatment: 'prp',
    features: ['4 جلسات PRP على مدار السنة', 'فحص دوري للفروة', 'أولوية في حجز المواعيد', 'استشارة متابعة مجانية'],
  },
]

export const TEAM: TeamMember[] = [
  {
    id: 't1',
    name: 'د. ليلى الحدّاد',
    role: 'استشارية الأمراض الجلدية وأمراض الشعر',
    experience: '14 سنة خبرة',
    credentials: 'بورد في الأمراض الجلدية — عضو EADV',
    image: photo('doctors/doctor-1.jpg', 'د. ليلى الحدّاد', 'د. ليلى الحدّاد'),
  },
  {
    id: 't2',
    name: 'د. كريم السعدي',
    role: 'أخصائي العلاجات التجديدية',
    experience: '11 سنة خبرة',
    credentials: 'زمالة الطب التجديدي — عضو ISHRS',
    image: photo('doctors/doctor-2.jpg', 'د. كريم السعدي', 'د. كريم السعدي'),
  },
  {
    id: 't3',
    name: 'د. نور الدين البكري',
    role: 'أخصائي الخلايا الجذعية',
    experience: '9 سنوات خبرة',
    credentials: 'ماجستير الطب التجديدي — دورات دولية متقدّمة',
    image: photo('doctors/doctor-3.jpg', 'د. نور الدين البكري', 'د. نور الدين البكري'),
  },
  {
    id: 't4',
    name: 'د. سلمى العمر',
    role: 'أخصائية الميزوثيرابي وعناية الفروة',
    experience: '8 سنوات خبرة',
    credentials: 'دبلوم الميزوثيرابي الطبي — عضو EADV',
    image: photo('doctors/doctor-4.jpg', 'د. سلمى العمر', 'د. سلمى العمر'),
  },
]

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'r1',
    name: 'محمد العتيبي',
    treatment: '6 جلسات PRP — توقف التساقط',
    text: 'كان التساقط يزداد كل شهر. بعد البرنامج لاحظت أن الشعر المتساقط قلّ بوضوح، والشرح الذي قدّمه الطبيب قبل البدء كان صريحاً ومريحاً.',
    rating: 5,
  },
  {
    id: 'r2',
    name: 'سارة القحطاني',
    treatment: '4 جلسات ميزوثيرابي — كثافة أفضل',
    text: 'الجلسات أسرع مما توقعت، والفريق يهتم بأدق التفاصيل. بعد أشهر صار شعري أقوى وأقل تقصفاً.',
    rating: 5,
  },
  {
    id: 'r3',
    name: 'خالد المنصور',
    treatment: '3 جلسات خلايا جذعية — متابعة 6 أشهر',
    text: 'أعجبني التوثيق بالصور في كل زيارة، فكنت أرى التقدّم بنفسي. تجربة احترافية من الاستقبال حتى المتابعة.',
    rating: 5,
  },
]