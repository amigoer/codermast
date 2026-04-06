<template>
  <aside
    v-if="toc && toc.length > 0"
    class="hidden w-56 shrink-0 xl:block"
  >
    <div class="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto pb-8 pt-4">
      <h4 class="mb-3 text-sm font-semibold text-gray-900 dark:text-gray-100">
        目录
      </h4>
      <nav class="space-y-1">
        <a
          v-for="item in toc"
          :key="item.id"
          :href="`#${item.id}`"
          class="block text-sm leading-6 transition-colors"
          :class="[
            item.depth === 3 ? 'pl-4' : '',
            activeId === item.id
              ? 'font-medium text-blue-600 dark:text-blue-400'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300',
          ]"
        >
          {{ item.text }}
        </a>
      </nav>
    </div>
  </aside>
</template>

<script setup lang="ts">
interface TocItem {
  id: string
  text: string
  depth: number
}

const props = defineProps<{
  toc: TocItem[]
}>()

const activeId = ref('')

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          activeId.value = entry.target.id
        }
      }
    },
    { rootMargin: '-80px 0px -80% 0px' }
  )

  // Observe all headings
  props.toc.forEach((item) => {
    const el = document.getElementById(item.id)
    if (el) observer.observe(el)
  })

  onUnmounted(() => observer.disconnect())
})
</script>
