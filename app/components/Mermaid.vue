<script setup lang="ts">
import { ref, watch, onMounted, nextTick } from 'vue'

const props = defineProps<{
  code: string
}>()

const container = ref<HTMLDivElement | null>(null)
const svg = ref<string>('')
const error = ref<string>('')

let idCounter = 0
const uid = `mermaid-${Date.now()}-${idCounter++}`

async function render() {
  if (!props.code) return
  try {
    const mermaid = (await import('mermaid')).default
    mermaid.initialize({
      startOnLoad: false,
      theme: 'default',
      securityLevel: 'loose',
      fontFamily: 'inherit',
      flowchart: { htmlLabels: true, curve: 'basis' },
    })
    const { svg: rendered } = await mermaid.render(`${uid}-${idCounter++}`, props.code)
    svg.value = rendered
    error.value = ''
  }
  catch (e: any) {
    error.value = e?.message || String(e)
    svg.value = ''
  }
}

onMounted(() => {
  nextTick(render)
})

watch(() => props.code, () => {
  nextTick(render)
})
</script>

<template>
  <ClientOnly>
    <div
      ref="container"
      class="mermaid-diagram my-4 flex justify-center overflow-x-auto rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900"
    >
      <div v-if="error" class="text-sm text-red-600 dark:text-red-400">
        Mermaid render error: {{ error }}
      </div>
      <div v-else v-html="svg" />
    </div>
    <template #fallback>
      <div class="my-4 rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm text-gray-500 dark:border-gray-700 dark:bg-gray-900">
        Loading diagram...
      </div>
    </template>
  </ClientOnly>
</template>
