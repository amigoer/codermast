<script setup lang="ts">
import { ref, watch, onMounted, nextTick } from 'vue'

const props = defineProps<{
  code: string
}>()

const { open: openLightbox } = useLightbox()

const container = ref<HTMLDivElement | null>(null)
const svg = ref<string>('')
const error = ref<string>('')

function expand() {
  if (svg.value) openLightbox({ svg: svg.value })
}

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
    let out = await mermaid.render(`${uid}-${idCounter++}`, props.code).then(r => r.svg)
    // Mermaid renders at a "natural" size then pins the svg via
    // `style="max-width: Npx"`, which squeezes the diagram when the parent
    // column is narrower — text becomes unreadable for wide LR flowcharts.
    // Replace that with `min-width: naturalWidth` so the diagram always
    // shows at (at least) its natural width. The wrapper has overflow-x
    // auto, so wider-than-column diagrams just scroll horizontally.
    const vb = out.match(/viewBox="([\d.\-\s]+)"/)
    if (vb) {
      const [, , w, h] = vb[1].split(/\s+/).map(Number)
      // Drop mermaid's width="100%" attribute and replace its inline style so
      // the svg renders at its natural viewBox size instead of filling the
      // parent (which caused extreme vertical stretching for narrow diagrams).
      out = out
        .replace(/<svg([^>]*?)\swidth="[^"]*"/, '<svg$1')
        .replace(/<svg([^>]*?)\sheight="[^"]*"/, '<svg$1')
        .replace(
          /<svg([^>]*?)style="[^"]*"/,
          `<svg$1style="width: ${w}px; height: ${h}px; max-width: none;"`,
        )
    }
    svg.value = out
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
      class="mermaid-diagram group relative my-4 block w-full min-w-0 overflow-x-auto rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900"
    >
      <div v-if="error" class="text-sm text-red-600 dark:text-red-400">
        Mermaid render error: {{ error }}
      </div>
      <template v-else>
        <button
          type="button"
          class="absolute top-2 right-2 z-10 flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 bg-white/90 text-gray-600 opacity-0 shadow-sm transition hover:bg-white hover:text-gray-900 group-hover:opacity-100 max-md:opacity-100 dark:border-gray-700 dark:bg-gray-800/90 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
          title="查看大图"
          @click="expand"
        >
          <Icon name="i-lucide-maximize-2" class="h-4 w-4" />
        </button>
        <div
          class="mx-auto w-max cursor-zoom-in [&_svg]:block [&_svg]:shrink-0"
          @click="expand"
          v-html="svg"
        />
      </template>
    </div>
    <template #fallback>
      <div class="my-4 rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm text-gray-500 dark:border-gray-700 dark:bg-gray-900">
        Loading diagram...
      </div>
    </template>
  </ClientOnly>
</template>
