<script setup lang="ts">
defineProps<{
  src?: string
  alt?: string
  width?: string | number
  height?: string | number
}>()

const { open } = useLightbox()

function expand(src?: string, alt?: string) {
  if (src) open({ src, alt })
}
</script>

<template>
  <img
    :src="src"
    :alt="alt"
    :width="width"
    :height="height"
    class="mx-auto my-4 max-w-full cursor-zoom-in rounded-lg border border-gray-200 dark:border-gray-700"
    loading="lazy"
    @click="expand(src, alt)"
  >
</template>
