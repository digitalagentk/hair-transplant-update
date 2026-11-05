<script setup lang="ts">
import { ref, nextTick } from 'vue'

interface Msg {
  id: number
  from: 'bot' | 'user'
  text: string
}

const quick = [
  {
    q: 'كم جلسة بلازما أحتاج لوقف التساقط؟',
    a: 'جلسات البلازما تُعطى عادة بجرعة من 3-6 جلسات أولى بفاصل شهر، ثم جلسات صيانة كل 3-6 أشهر حسب استجابة بصيلاتك.',
  },
  {
    q: 'هل العلاج بالخلايا الجذعية مؤلم؟',
    a: 'يُجرى الإجراء بعد تخدير موضعي لطيف لفروة الرأس، لذلك يصفه معظم المراجعين بإحساس وخز بسيط ومحتمل، ويستطيعون العودة لأنشطتهم اليومية بعده.',
  },
  {
    q: 'هل النتائج دائمة أم مؤقتة؟',
    a: 'تستمر النتائج ما دامت البصيلات تستجيب للعلاج وتُحافظ عليها جلسات الصيانة. تختلف الاستجابة من شخص لآخر، ويحدّد الطبيب التوقعات الأدق بعد فحص فروة رأسك.',
  },
]

const generic =
  'شكراً لسؤالك. للحصول على إجابة دقيقة تناسب حالتك نوصي بفحص فروة الرأس خلال استشارة مجانية مع أحد أطبائنا — يمكنك حجز موعد من صفحة الحجز.'

const open = ref(false)
const input = ref('')
const typing = ref(false)
const scroller = ref<HTMLElement | null>(null)
let uid = 2

const messages = ref<Msg[]>([
  { id: 1, from: 'bot', text: 'أهلاً بك في عيادة ريفايف. كيف يمكنني مساعدتك في رحلة علاج شعرك؟' },
])

async function scrollDown() {
  await nextTick()
  scroller.value?.scrollTo({ top: scroller.value.scrollHeight, behavior: 'smooth' })
}

function reply(text: string) {
  typing.value = true
  scrollDown()
  setTimeout(() => {
    messages.value.push({ id: uid++, from: 'bot', text })
    typing.value = false
    scrollDown()
  }, 800)
}

function ask(item: { q: string; a: string }) {
  if (typing.value) return
  messages.value.push({ id: uid++, from: 'user', text: item.q })
  reply(item.a)
}

function send() {
  const text = input.value.trim()
  if (!text || typing.value) return
  messages.value.push({ id: uid++, from: 'user', text })
  input.value = ''
  reply(generic)
}
</script>

<template>
  <!-- النافذة -->
  <Transition name="chat">
    <section
      v-if="open"
      class="fixed bottom-24 right-6 z-50 flex h-[28rem] max-h-[calc(100vh-8rem)] w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-3xl border border-teal-900/30 bg-white shadow-2xl shadow-slate-900/30 sm:w-96"
      role="dialog"
      aria-label="مساعد ريفايف الذكي"
    >
      <header class="flex items-center justify-between bg-gradient-to-r from-teal-600 to-slate-900 px-5 py-4 text-white">
        <div>
          <p class="font-bold">مساعد ريفايف</p>
          <p class="text-xs text-teal-100">مساعد افتراضي لعلاجات الشعر التجديدية</p>
        </div>
        <button
          type="button"
          class="flex h-11 w-11 items-center justify-center rounded-xl transition hover:bg-white/15"
          aria-label="إغلاق المحادثة"
          @click="open = false"
        >
          <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </header>

      <div ref="scroller" class="flex-1 space-y-3 overflow-y-auto bg-aqua p-4" aria-live="polite">
        <div v-for="m in messages" :key="m.id" class="flex" :class="m.from === 'bot' ? 'justify-start' : 'justify-end'">
          <p
            class="max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-7"
            :class="m.from === 'bot' ? 'rounded-tr-sm border border-teal-100 bg-white text-slate-800' : 'rounded-tl-sm bg-gradient-to-r from-teal-600 to-teal-700 text-white'"
          >
            {{ m.text }}
          </p>
        </div>

        <div v-if="typing" class="flex justify-start" aria-label="المساعد يكتب">
          <div class="flex gap-1 rounded-2xl rounded-tr-sm border border-teal-100 bg-white px-4 py-3">
            <span class="h-2 w-2 animate-bounce rounded-full bg-teal-500"></span>
            <span class="h-2 w-2 animate-bounce rounded-full bg-teal-500 [animation-delay:150ms]"></span>
            <span class="h-2 w-2 animate-bounce rounded-full bg-teal-500 [animation-delay:300ms]"></span>
          </div>
        </div>

        <div class="flex flex-col gap-2 pt-2">
          <button
            v-for="item in quick"
            :key="item.q"
            type="button"
            class="min-h-[44px] rounded-xl border border-teal-300 bg-white px-3 py-2 text-start text-sm font-bold text-teal-800 transition hover:border-teal-500 hover:bg-teal-50 disabled:opacity-60"
            :disabled="typing"
            @click="ask(item)"
          >
            {{ item.q }}
          </button>
        </div>
      </div>

      <form class="flex gap-2 border-t border-teal-100 bg-white p-3" @submit.prevent="send">
        <label for="chat-input" class="sr-only">اكتب سؤالك</label>
        <input
          id="chat-input"
          v-model="input"
          type="text"
          placeholder="اكتب سؤالك هنا..."
          class="min-h-[44px] flex-1 rounded-xl border border-slate-200 px-3 text-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/40"
        />
        <button
          type="submit"
          class="flex h-11 min-w-[44px] items-center justify-center rounded-xl bg-gradient-to-r from-teal-600 to-slate-900 px-4 text-sm font-bold text-white transition hover:scale-105 disabled:opacity-60"
          :disabled="typing || !input.trim()"
        >
          إرسال
        </button>
      </form>
    </section>
  </Transition>

  <!-- الزر العائم -->
  <button
    type="button"
    class="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-teal-600 to-slate-900 text-white shadow-xl shadow-teal-900/40 transition duration-300 hover:scale-110 hover:shadow-[0_0_28px_rgba(20,184,166,0.6)]"
    :aria-label="open ? 'إغلاق مساعد ريفايف' : 'فتح مساعد ريفايف'"
    :aria-expanded="open"
    @click="open = !open"
  >
    <svg v-if="!open" viewBox="0 0 24 24" class="h-7 w-7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" />
    </svg>
    <svg v-else viewBox="0 0 24 24" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  </button>
</template>

<style scoped>
.chat-enter-active,
.chat-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
  transform-origin: bottom right;
}
.chat-enter-from,
.chat-leave-to {
  opacity: 0;
  transform: scale(0.9) translateY(10px);
}
</style>