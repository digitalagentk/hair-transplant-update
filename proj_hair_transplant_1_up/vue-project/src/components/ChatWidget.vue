<script setup lang="ts">
import { nextTick, ref } from 'vue'

interface Msg {
  id: number
  from: 'bot' | 'user'
  text: string
  cta?: boolean
}

const quick = [
  {
    q: 'كم عدد البصيلات المناسب لحالتي؟',
    a: 'عدد البصيلات يعتمد على مساحة الصلع وكثافة المنطقة المانحة. يُحدد ذلك خلال الاستشارة المجانية بفحص دقيق.',
  },
  {
    q: 'كم مدة الشفاء بعد العملية؟',
    a: 'تلتئم المنطقتان المانحة والمستلمة عادةً خلال 7 إلى 10 أيام، ويعود معظم المرضى لحياتهم الاعتيادية خلال أيام قليلة. تبدأ النتائج بالظهور تدريجياً من الشهر الرابع وتكتمل بين 10 و12 شهراً.',
  },
  {
    q: 'كيف أغسل شعري بعد الزراعة؟',
    a: 'نبدأ بالغسل اللطيف بعد 48 ساعة بشامبو طبي مخصص وبرغوة خفيفة دون فرك أو ضغط، ونسلّمك بروتوكولاً مكتوباً. تجنّب الماء الساخن والشمس المباشرة في الأسبوع الأول.',
  },
]

const GENERIC =
  'شكراً لسؤالك. يسعدنا أن يجيبك أحد أطباء المركز بدقة أكبر خلال استشارة مجانية، ويمكنك حجز موعدك من الرابط أدناه.'

const open = ref(false)
const input = ref('')
const typing = ref(false)
const box = ref<HTMLElement | null>(null)
let uid = 2

const messages = ref<Msg[]>([
  { id: 1, from: 'bot', text: 'أهلاً بك في مركز أوريكس. كيف يمكنني مساعدتك في رحلة استعادة شعرك؟' },
])

async function toBottom() {
  await nextTick()
  box.value?.scrollTo({ top: box.value.scrollHeight, behavior: 'smooth' })
}

function reply(text: string, cta = false) {
  typing.value = true
  toBottom()
  setTimeout(() => {
    typing.value = false
    messages.value.push({ id: uid++, from: 'bot', text, cta })
    toBottom()
  }, 800)
}

function ask(item: { q: string; a: string }) {
  messages.value.push({ id: uid++, from: 'user', text: item.q })
  reply(item.a)
}

function send() {
  const t = input.value.trim()
  if (!t || typing.value) return
  messages.value.push({ id: uid++, from: 'user', text: t })
  input.value = ''
  if (t.includes('بصيل') || t.includes('عدد')) return reply(quick[0]!.a)
  if (t.includes('شفاء') || t.includes('نقاهة') || t.includes('مدة')) return reply(quick[1]!.a)
  if (t.includes('غسل') || t.includes('شامبو')) return reply(quick[2]!.a)
  reply(GENERIC, true)
}
</script>

<template>
  <div>
    <!-- نافذة الدردشة -->
    <Transition name="chat">
      <section
        v-if="open"
        class="chat-window fixed bottom-24 right-6 z-50 flex h-[28rem] max-h-[calc(100vh-8rem)] w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-3xl border border-cyan-900/40 bg-white shadow-2xl shadow-black/40 sm:w-96"
        role="dialog"
        aria-label="المساعد الذكي لمركز أوريكس"
      >
        <header class="flex items-center justify-between bg-gradient-to-l from-cyan-600 to-slate-900 px-5 py-4 text-white">
          <div>
            <p class="font-bold">مساعد أوريكس الذكي</p>
            <p class="text-xs text-cyan-100/80">AI Hair Assistant — رد تجريبي</p>
          </div>
          <button
            type="button"
            class="inline-flex h-11 w-11 items-center justify-center rounded-full transition hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white"
            aria-label="إغلاق الدردشة"
            @click="open = false"
          >
            <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
        </header>

        <div ref="box" class="flex-1 space-y-3 overflow-y-auto bg-slate-50 p-4" aria-live="polite">
          <div
            v-for="m in messages"
            :key="m.id"
            class="flex"
            :class="m.from === 'user' ? 'justify-end' : 'justify-start'"
          >
            <div
              class="max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-7"
              :class="
                m.from === 'user'
                  ? 'rounded-tl-sm bg-gradient-to-l from-cyan-600 to-slate-900 text-white'
                  : 'rounded-tr-sm border border-slate-200 bg-white text-slate-800'
              "
            >
              {{ m.text }}
              <RouterLink
                v-if="m.cta"
                to="/booking"
                class="mt-2 block font-bold text-cyan-700 underline underline-offset-4"
                @click="open = false"
              >
                احجز استشارتك المجانية
              </RouterLink>
            </div>
          </div>

          <div v-if="typing" class="flex justify-start">
            <div class="flex gap-1 rounded-2xl rounded-tr-sm border border-slate-200 bg-white px-4 py-3" aria-label="جارٍ الكتابة">
              <span class="h-2 w-2 animate-bounce rounded-full bg-cyan-500" />
              <span class="h-2 w-2 animate-bounce rounded-full bg-cyan-500 [animation-delay:150ms]" />
              <span class="h-2 w-2 animate-bounce rounded-full bg-cyan-500 [animation-delay:300ms]" />
            </div>
          </div>
        </div>

        <div class="flex flex-wrap gap-2 border-t border-slate-200 bg-white px-4 py-3">
          <button
            v-for="item in quick"
            :key="item.q"
            type="button"
            class="min-h-11 rounded-full border border-cyan-600/30 bg-cyan-50 px-3 text-xs font-bold text-cyan-800 transition hover:bg-cyan-100 focus-visible:ring-2 focus-visible:ring-cyan-500 disabled:opacity-50"
            :disabled="typing"
            @click="ask(item)"
          >
            {{ item.q }}
          </button>
        </div>

        <form class="flex items-center gap-2 border-t border-slate-200 bg-white p-3" @submit.prevent="send">
          <label for="chat-input" class="sr-only">اكتب سؤالك</label>
          <input
            id="chat-input"
            v-model="input"
            type="text"
            placeholder="اكتب سؤالك هنا..."
            class="h-11 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
          />
          <button
            type="submit"
            class="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-l from-cyan-600 to-slate-900 text-white transition hover:scale-105 focus-visible:ring-2 focus-visible:ring-cyan-400"
            aria-label="إرسال"
          >
            <svg viewBox="0 0 24 24" class="h-5 w-5 -scale-x-100" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2L11 13" /><path d="M22 2l-7 20-4-9-9-4 20-7z" /></svg>
          </button>
        </form>
      </section>
    </Transition>

    <!-- الزر الدائري -->
    <button
      type="button"
      class="fixed bottom-6 right-6 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full border border-cyan-400/30 bg-gradient-to-br from-cyan-600 to-slate-900 text-white shadow-lg shadow-black/30 transition duration-300 hover:scale-110 hover:shadow-[0_0_28px_rgba(6,182,212,0.55)] focus-visible:ring-2 focus-visible:ring-cyan-300"
      :aria-label="open ? 'إغلاق المساعد' : 'فتح المساعد الذكي'"
      :aria-expanded="open"
      @click="open = !open"
    >
      <svg v-if="!open" viewBox="0 0 24 24" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.2A8 8 0 1 1 21 12z" />
      </svg>
      <svg v-else viewBox="0 0 24 24" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
    </button>
  </div>
</template>

<style scoped>
.chat-window {
  transform-origin: bottom right;
}
.chat-enter-active,
.chat-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.chat-enter-from,
.chat-leave-to {
  opacity: 0;
  transform: scale(0.88);
}
</style>