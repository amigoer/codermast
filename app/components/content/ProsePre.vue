<script setup lang="ts">
import { computed } from 'vue'
import UPre from '#ui/components/prose/Pre.vue'

const props = defineProps<{
  code?: string
  language?: string
  filename?: string
  highlights?: number[]
  hideHeader?: boolean
  meta?: string
  class?: any
  ui?: any
}>()

// Map shiki language id -> vscode-icons file-type icon id
const langIconMap: Record<string, string> = {
  javascript: 'js',
  typescript: 'typescript',
  vue: 'vue',
  go: 'go',
  java: 'java',
  python: 'python',
  html: 'html',
  css: 'css',
  json: 'json',
  yaml: 'yaml',
  bash: 'shell',
  shell: 'shell',
  sh: 'shell',
  sql: 'sql',
  xml: 'xml',
  markdown: 'markdown',
  md: 'markdown',
  dockerfile: 'docker',
  nginx: 'nginx',
  ini: 'ini',
  properties: 'properties',
  diff: 'diff',
  c: 'c',
  cpp: 'cpp',
}

const icon = computed(() => {
  const lang = props.language?.toLowerCase()
  if (!lang) return undefined
  const mapped = langIconMap[lang] ?? lang
  return `i-vscode-icons:file-type-${mapped}`
})

// Mermaid blocks are relabeled to lang=text with "mermaid" in meta
// by the remark-code-title plugin — detect that here.
const isMermaid = computed(() => {
  return /(^|\s)mermaid(\s|$)/.test(props.meta ?? '')
})

const toast = useAppToast()

function onWrapperClick(e: MouseEvent) {
  // UPre's copy button is the only <button> inside the Pre block.
  const btn = (e.target as HTMLElement | null)?.closest('button')
  if (!btn) return
  // Fire a short toast — UPre itself briefly swaps its icon to a
  // checkmark, so we just add a Sonner-style confirmation.
  toast.success('已复制到剪贴板')
}
</script>

<template>
  <Mermaid v-if="isMermaid" :code="code ?? ''" />
  <div v-else class="group/pre pre-hover-wrapper" @click.capture="onWrapperClick">
    <UPre v-bind="props" :icon="icon">
      <slot />
    </UPre>
  </div>
</template>

<style scoped>
.pre-hover-wrapper :deep(button) {
  opacity: 0;
  transition: opacity 0.15s ease;
}
.pre-hover-wrapper:hover :deep(button),
.pre-hover-wrapper :deep(button:focus-visible) {
  opacity: 1;
}
</style>
