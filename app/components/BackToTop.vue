<script setup lang="ts">
const visible = ref(false)

function onScroll() {
  visible.value = window.scrollY > 400
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <Transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="translate-y-3 opacity-0"
    enter-to-class="translate-y-0 opacity-100"
    leave-active-class="transition duration-150 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="translate-y-3 opacity-0"
  >
    <button
      v-if="visible"
      type="button"
      aria-label="返回顶部"
      title="返回顶部"
      class="fixed bottom-5 right-5 z-[90] flex size-11 items-center justify-center rounded-full border border-gray-200 bg-white/90 text-gray-600 shadow-lg backdrop-blur transition-colors hover:border-blue-400 hover:text-blue-600 sm:bottom-8 sm:right-8 dark:border-gray-700 dark:bg-gray-900/90 dark:text-gray-300 dark:hover:border-blue-500 dark:hover:text-blue-400"
      @click="scrollToTop"
    >
      <Icon name="i-lucide-arrow-up" class="size-5" />
    </button>
  </Transition>
</template>
