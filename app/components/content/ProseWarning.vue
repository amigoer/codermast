<template>
  <div class="my-5 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 dark:border-amber-800 dark:bg-amber-950/30">
    <div v-if="title" class="mb-2 flex items-center gap-2 font-semibold text-amber-700 dark:text-amber-300">
      <Icon name="heroicons:exclamation-triangle" class="size-5 shrink-0" />
      <span>{{ title }}</span>
    </div>
    <div
      class="text-sm leading-6 text-amber-900 dark:text-amber-100"
      :class="title ? '' : 'flex items-start gap-2'"
    >
      <Icon
        v-if="!title"
        name="heroicons:exclamation-triangle"
        class="mt-0.5 size-5 shrink-0 text-amber-500"
      />
      <div class="[&>p:first-child]:mt-0 [&>p:last-child]:mb-0 [&>p]:my-2">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string
}>()
</script>
