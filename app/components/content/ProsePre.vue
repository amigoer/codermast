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
</script>

<template>
  <UPre v-bind="props" :icon="icon">
    <slot />
  </UPre>
</template>
