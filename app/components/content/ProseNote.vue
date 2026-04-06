<template>
  <div class="my-5 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 dark:border-blue-800 dark:bg-blue-950/30">
    <div v-if="title" class="mb-2 flex items-center gap-2 font-semibold text-blue-700 dark:text-blue-300">
      <Icon name="heroicons:information-circle" class="size-5 shrink-0" />
      <span>{{ title }}</span>
    </div>
    <div
      class="text-sm leading-6 text-blue-900 dark:text-blue-100"
      :class="title ? '' : 'flex items-start gap-2'"
    >
      <Icon
        v-if="!title"
        name="heroicons:information-circle"
        class="mt-0.5 size-5 shrink-0 text-blue-500"
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
