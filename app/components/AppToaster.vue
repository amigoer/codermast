<script setup lang="ts">
const { toasts, dismiss } = useAppToast()

const iconMap = {
  success: 'i-lucide-check-circle-2',
  error: 'i-lucide-x-circle',
  info: 'i-lucide-info',
  warning: 'i-lucide-alert-triangle',
}

const colorMap = {
  success: 'text-emerald-500',
  error: 'text-red-500',
  info: 'text-blue-500',
  warning: 'text-amber-500',
}
</script>

<template>
  <Teleport to="body">
    <div class="pointer-events-none fixed top-4 left-1/2 z-[120] flex w-[calc(100vw-2rem)] max-w-sm -translate-x-1/2 flex-col items-center gap-2">
      <TransitionGroup
        tag="div"
        class="flex w-full flex-col items-center gap-2"
        enter-active-class="transition duration-250 ease-out"
        enter-from-class="-translate-y-3 opacity-0 scale-95"
        enter-to-class="translate-y-0 opacity-100 scale-100"
        leave-active-class="transition duration-200 ease-in absolute left-1/2 -translate-x-1/2"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-3"
      >
        <div
          v-for="t in toasts"
          :key="t.id"
          class="pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-lg border border-gray-200 bg-white p-3 shadow-lg backdrop-blur dark:border-gray-700 dark:bg-gray-900"
          role="status"
        >
          <Icon :name="iconMap[t.type]" :class="['mt-0.5 h-5 w-5 flex-shrink-0', colorMap[t.type]]" />
          <div class="min-w-0 flex-1">
            <div class="text-sm font-medium text-gray-900 dark:text-gray-100">
              {{ t.title }}
            </div>
            <div v-if="t.description" class="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
              {{ t.description }}
            </div>
          </div>
          <button
            class="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-200"
            aria-label="关闭"
            @click="dismiss(t.id)"
          >
            <Icon name="i-lucide-x" class="h-3.5 w-3.5" />
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>
