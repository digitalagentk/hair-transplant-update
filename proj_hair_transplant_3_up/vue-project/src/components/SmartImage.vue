<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Photo } from '../types'

const props = defineProps<{ photo: Photo; eager?: boolean; imgClass?: string }>()

const current = ref(props.photo.src)
const failed = ref(false)

watch(
  () => props.photo.src,
  (v) => {
    current.value = v
    failed.value = false
  },
)

function onError() {
  const fb = props.photo.fallback
  if (fb && current.value !== fb) {
    current.value = fb
    return
  }
  failed.value = true
}
</script>

<template>
  <div class="relative h-full w-full overflow-hidden bg-gradient-to-br from-slate-800 via-teal-900 to-blue-950">
    <img
      v-if="!failed"
      :src="current"
      :alt="photo.alt"
      :loading="eager ? 'eager' : 'lazy'"
      class="h-full w-full object-cover"
      :class="imgClass"
      @error="onError"
    />
    <div
      v-else
      role="img"
      :aria-label="photo.alt"
      class="flex h-full w-full flex-col items-center justify-center gap-3 bg-[radial-gradient(circle_at_30%_20%,rgba(20,184,166,0.25),transparent_60%)] p-4 text-center"
    >
      <span class="h-px w-10 bg-teal-400/60"></span>
      <span class="text-sm font-bold leading-6 text-teal-100">{{ photo.caption }}</span>
      <span class="h-px w-10 bg-teal-400/60"></span>
    </div>
  </div>
</template>