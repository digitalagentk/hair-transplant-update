<script setup lang="ts">
import { nextTick, ref } from 'vue'

interface Msg {
  id: number
  from: 'bot' | 'user'
  text: string
}

const quick = [
  {
    q: 'كم بصيلة أحتاج لملء فراغات لحيتي؟',
    a: 'يعتمد العدد على مساحة الفراغ وكثافة المنطقة المحيطة بها. غالباً يتراوح بين 1,500 و3,000 بصيلة للخدين والذقن بالكامل، وأقل بكثير للفراغات الصغيرة. يحدد الأخصائي الرقم الدقيق بعد الفحص الرقمي في الاستشارة المجانية.',
  },
  {
    q: 'هل النتيجة طبيعية بعد الزراعة؟',
    a: 'زراعة اللحية تعطي نتيجة طبيعية 100% لأن البصيلات تُؤخذ من منطقة الرقبة الخلفية وتُزرع بزوايا طبيعية تحاكي نمو اللحية.',
  },
  {
    q: 'متى أحلق لحيتي بعد العملية؟',
    a: 'عادةً يمكن تهذيب اللحية بماكينة كهربائية بعد نحو أسبوعين، أما الحلاقة بالموس فبعد حوالي ثلاثة أسابيع، وكل ذلك حسب تقييم طبيبك لحالتك وتعليمات ما بعد العملية.',
  },
]

const generic =
  'شكراً لرسالتك. للحصول على تقييم دقيق لحالتك، احجز استشارتك المجانية وسيتواصل معك منسق المركز لتأكيد الموعد.'

const open = ref(false)
const input = ref('')
const typing = ref(false)
const scroller = ref<HTMLElement | null>(null)
let uid = 2

const msgs = ref<Msg[]>([
  { id: 1, from: 'bot', text: 'أهلاً بك في مركز تيتان. كيف يمكنني مساعدتك في نحت لحيتك؟' },
])

function scrollDown() {
  nextTick(() => {
    if (scroller.value) scroller.value.scrollTop = scroller.value.scrollHeight
  })
}

function botReply(text: string) {
  typing.value = true
  scrollDown()
  window.setTimeout(() => {
    msgs.value.push({ id: uid++, from: 'bot', text })
    typing.value = false
    scrollDown()
  }, 800)
}

function ask(item: { q: string; a: string }) {
  if (typing.value) return
  msgs.value.push({ id: uid++, from: 'user', text: item.q })
  scrollDown()
  botReply(item.a)
}

function send() {
  const t = input.value.trim()
  if (!t || typing.value) return
  msgs.value.push({ id: uid++, from: 'user', text: t })
  input.value = ''
  scrollDown()
  botReply(generic)
}
</script>

<template>
  <div>
    <Transition name="chat">
      <section
        v-if="open"
        class="fixed bottom-24 right-6 z-50 flex h-[28rem] w-[calc(100vw-3rem)] max-w-sm flex-col overflow-hidden rounded-3xl border border-yellow-900/30 bg-white shadow-2xl shadow-black/40"
        role="dialog"
        aria-label="مساعد تيتان للحية"
      >
        <header class="flex items-center justify-between bg-gradient-to-r from-yellow-700 to-zinc-900 px-4 py-3 text-white">
          <div class="flex items-center gap-3">
            <span class="flex h-10 w-10 items-center justify-center rounded-full border border-amber-300/60 bg-zinc-900/60 text-sm font-bold text-amber-300">T</span>
            <div class="leading-tight">
              <p class="text-sm font-bold">مساعد تيتان للحية</p>
              <p class="flex items-center gap-1.5 text-xs text-stone-200">
                <span class="h-2 w-2 rounded-full bg-green-400"></span> متاح الآن
              </p>
            </div>
          </div>
          <button type="button" class="flex h-11 w-11 items-center justify-center rounded-xl transition hover:bg-white/10" aria-label="إغلاق المحادثة" @click="open = false">
            <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </header>

        <div ref="scroller" class="flex flex-1 flex-col gap-3 overflow-y-auto bg-[#FAF7F2] p-4" aria-live="polite">
          <div
            v-for="m in msgs"
            :key="m.id"
            class="max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-7"
            :class="
              m.from === 'bot'
                ? 'self-start rounded-tr-sm bg-white text-stone-800 shadow-sm'
                : 'self-end rounded-tl-sm bg-gradient-to-r from-yellow-700 to-zinc-900 text-white'
            "
          >
            {{ m.text }}
          </div>

          <div v-if="typing" class="flex w-16 items-center justify-center gap-1 self-start rounded-2xl bg-white px-4 py-3 shadow-sm" aria-label="يكتب الآن">
            <span class="h-2 w-2 animate-bounce rounded-full bg-yellow-700" style="animation-delay: 0ms"></span>
            <span class="h-2 w-2 animate-bounce rounded-full bg-yellow-700" style="animation-delay: 150ms"></span>
            <span class="h-2 w-2 animate-bounce rounded-full bg-yellow-700" style="animation-delay: 300ms"></span>
          </div>
        </div>

        <div class="border-t border-stone-200 bg-white p-3">
          <div class="mb-2 flex gap-2 overflow-x-auto pb-1">
            <button
              v-for="item in quick"
              :key="item.q"
              type="button"
              class="min-h-11 shrink-0 rounded-full border border-yellow-700/40 px-3 text-xs font-bold text-yellow-800 transition hover:bg-yellow-50"
              @click="ask(item)"
            >
              {{ item.q }}
            </button>
          </div>
          <form class="flex items-center gap-2" @submit.prevent="send">
            <label for="chat-input" class="sr-only">اكتب رسالتك</label>
            <input id="chat-input" v-model="input" type="text" placeholder="اكتب سؤالك هنا..." class="field !min-h-11 flex-1 text-sm" autocomplete="off" />
            <button type="submit" class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-yellow-700 to-zinc-900 text-white transition hover:scale-105" aria-label="إرسال">
              <svg viewBox="0 0 24 24" class="h-5 w-5 -scale-x-100" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
            </button>
          </form>
        </div>
      </section>
    </Transition>

    <button
      type="button"
      class="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-yellow-700 to-zinc-900 text-white shadow-lg shadow-black/40 ring-1 ring-amber-300/40 transition duration-300 hover:scale-110 hover:shadow-[0_0_28px_rgba(212,165,116,0.55)]"
      :aria-label="open ? 'إغلاق المحادثة' : 'فتح مساعد اللحية'"
      :aria-expanded="open"
      @click="open = !open"
    >
      <svg v-if="!open" viewBox="0 0 24 24" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.700 8.700 0 0 1-3.800-.9L3 21l1.900-4.900A8.400 8.400 0 1 1 21 11.500z" />
      </svg>
      <svg v-else viewBox="0 0 24 24" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
        <path d="M6 6l12 12M18 6L6 18" />
      </svg>
    </button>
  </div>
</template>