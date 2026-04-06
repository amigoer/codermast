<script setup lang="ts">
interface TocItem {
  id: string
  text: string
  depth: number
}

const props = defineProps<{
  toc: TocItem[]
}>()

const open = ref(false)
const activeId = ref('')

const activeItem = computed(
  () => props.toc.find(t => t.id === activeId.value) || props.toc[0]
)

let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          activeId.value = entry.target.id
        }
      }
    },
    { rootMargin: '-80px 0px -80% 0px' },
  )

  props.toc.forEach((item) => {
    const el = document.getElementById(item.id)
    if (el) observer!.observe(el)
  })
})

onUnmounted(() => observer?.disconnect())

function onItemClick() {
  // Collapse after selecting an entry, so users see the target section.
  open.value = false
}
</script>

<template>
  <div
    v-if="toc && toc.length > 0"
    class="not-prose mb-6 xl:hidden"
  >
    <div
      class="overflow-hidden rounded-lg border border-gray-200 bg-gray-50/60 dark:border-gray-800 dark:bg-gray-900/60"
    >
      <button
        type="button"
        class="flex w-full items-center gap-2 px-4 py-3 text-left text-sm"
        :aria-expanded="open"
        @click="open = !open"
      >
        <Icon name="i-lucide-list" class="size-4 shrink-0 text-gray-500 dark:text-gray-400" />
        <span class="font-medium text-gray-700 dark:text-gray-300">目录</span>
        <span
          v-if="!open && activeItem"
          class="min-w-0 flex-1 truncate text-gray-500 dark:text-gray-500"
        >
          · {{ activeItem.text }}
        </span>
        <span v-else class="flex-1" />
        <Icon
          name="i-lucide-chevron-down"
          class="size-4 shrink-0 text-gray-500 transition-transform duration-200 dark:text-gray-400"
          :class="{ 'rotate-180': open }"
        />
      </button>

      <Transition
        enter-active-class="transition-[max-height,opacity] duration-200 ease-out overflow-hidden"
        enter-from-class="max-h-0 opacity-0"
        enter-to-class="max-h-[60vh] opacity-100"
        leave-active-class="transition-[max-height,opacity] duration-150 ease-in overflow-hidden"
        leave-from-class="max-h-[60vh] opacity-100"
        leave-to-class="max-h-0 opacity-0"
      >
        <nav
          v-if="open"
          class="max-h-[60vh] overflow-y-auto border-t border-gray-200 px-4 py-3 dark:border-gray-800"
        >
          <ul class="space-y-1">
            <li v-for="item in toc" :key="item.id">
              <a
                :href="`#${item.id}`"
                class="block rounded px-2 py-1.5 text-sm leading-snug transition-colors"
                :class="[
                  item.depth === 3 ? 'pl-5' : '',
                  item.depth >= 4 ? 'pl-8 text-xs' : '',
                  activeId === item.id
                    ? 'bg-blue-50 font-medium text-blue-600 dark:bg-blue-950/40 dark:text-blue-400'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200',
                ]"
                @click="onItemClick"
              >
                {{ item.text }}
              </a>
            </li>
          </ul>
        </nav>
      </Transition>
    </div>
  </div>
</template>
