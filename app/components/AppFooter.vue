<template>
  <footer class="mt-16 border-t border-gray-200 bg-white py-8 dark:border-gray-800 dark:bg-gray-900">
    <div class="mx-auto max-w-[90rem] px-4 text-center text-sm text-gray-500 lg:px-8">
      <div class="flex items-center justify-center gap-4">
        <span>&copy; {{ new Date().getFullYear() }} CoderMast</span>
        <a
          href="https://github.com/amigoer/codermast"
          target="_blank"
          class="inline-flex items-center gap-1 transition-colors hover:text-gray-700 dark:hover:text-gray-300"
        >
          <Icon name="mdi:github" class="size-4" />
          GitHub
        </a>
      </div>
    </div>
  </footer>
</template>
