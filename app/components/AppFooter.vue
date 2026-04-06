<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer class="mt-10 border-t border-gray-200 bg-gray-50/50 sm:mt-12 dark:border-gray-800 dark:bg-gray-900/60">
    <div class="mx-auto max-w-[90rem] px-4 py-4 sm:px-6 sm:py-5 lg:px-8">
      <div
        class="flex flex-col items-center justify-between gap-3 text-xs text-gray-500 sm:flex-row dark:text-gray-400">
        <div class="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
          <span>&copy; {{ year }} CoderMast</span>
          <span class="text-gray-300 dark:text-gray-700">·</span>
          <span class="inline-flex items-center gap-1">
            <Icon name="i-lucide-user" class="size-3" />
            Author
            <a href="https://github.com/amigoer" target="_blank" rel="noopener"
              class="font-medium text-gray-700 transition-colors hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">
              Amigoer
            </a>
          </span>
        </div>
        <div class="flex items-center gap-2">
          <a href="https://github.com/amigoer/codermast" target="_blank" rel="noopener"
            class="inline-flex items-center gap-1 transition-colors hover:text-blue-600 dark:hover:text-blue-400">
            <Icon name="mdi:github" class="size-3.5" />
            GitHub
          </a>
          <span class="text-gray-300 dark:text-gray-700">·</span>
          <a href="https://github.com/amigoer/codermast/blob/main/LICENSE" target="_blank" rel="noopener"
            class="inline-flex items-center gap-1 transition-colors hover:text-blue-600 dark:hover:text-blue-400">
            <Icon name="i-lucide-scale" class="size-3.5" />
            MIT License
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>
