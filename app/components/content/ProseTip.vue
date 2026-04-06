<template>
  <div class="my-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3 dark:border-green-800 dark:bg-green-950/30">
    <div v-if="title" class="mb-2 flex items-center gap-2 font-semibold text-green-700 dark:text-green-300">
      <Icon name="heroicons:light-bulb" class="size-5 shrink-0" />
      <span>{{ title }}</span>
    </div>
    <div
      class="text-sm leading-6 text-green-900 dark:text-green-100"
      :class="title ? '' : 'flex items-start gap-2'"
    >
      <Icon
        v-if="!title"
        name="heroicons:light-bulb"
        class="mt-0.5 size-5 shrink-0 text-green-500"
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
