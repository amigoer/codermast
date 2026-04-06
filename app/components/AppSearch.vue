<template>
  <div>
    <!-- Trigger button (looks like a search input) -->
    <button
      type="button"
      class="group flex w-full items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-400 transition-colors hover:border-blue-400 hover:text-gray-600 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-500 dark:hover:border-blue-500 dark:hover:text-gray-300"
      @click="open"
    >
      <Icon name="i-lucide-search" class="size-4 shrink-0" />
      <span class="flex-1 text-left">搜索...</span>
      <kbd class="hidden items-center gap-0.5 rounded border border-gray-200 bg-gray-50 px-1.5 py-0.5 font-mono text-[10px] font-medium text-gray-500 sm:flex dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
        <span>⌘</span><span>K</span>
      </kbd>
    </button>

    <!-- Modal overlay -->
    <Teleport to="body">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex items-start justify-center bg-black/50 p-4 pt-[10vh]"
        @click.self="close"
      >
        <div
          class="flex max-h-[70vh] w-full max-w-2xl flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-900"
        >
          <!-- Input -->
          <div class="flex items-center gap-3 border-b border-gray-200 px-4 py-3 dark:border-gray-800">
            <Icon name="i-lucide-search" class="size-5 shrink-0 text-gray-400" />
            <input
              ref="inputRef"
              v-model="query"
              type="text"
              placeholder="搜索文档..."
              class="flex-1 bg-transparent text-sm text-gray-900 placeholder-gray-400 outline-none dark:text-gray-100"
              @keydown.down.prevent="move(1)"
              @keydown.up.prevent="move(-1)"
              @keydown.enter.prevent="selectCurrent"
              @keydown.esc.prevent="close"
            >
            <button
              type="button"
              class="flex size-6 items-center justify-center rounded text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300"
              @click="close"
            >
              <Icon name="i-lucide-x" class="size-4" />
            </button>
          </div>

          <!-- Results -->
          <div
            ref="listRef"
            class="min-h-0 flex-1 overflow-y-auto"
          >
            <div
              v-if="!filtered.length"
              class="flex flex-col items-center gap-2 px-4 py-12 text-sm text-gray-400"
            >
              <Icon name="i-lucide-file-search" class="size-8" />
              <span>{{ query ? '没有找到相关文档' : '输入关键词开始搜索' }}</span>
            </div>
            <template v-else>
              <template v-for="(group, gi) in grouped" :key="gi">
                <div class="sticky top-0 bg-gray-50 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-gray-500 dark:bg-gray-800/80 dark:text-gray-400">
                  {{ group.tab }}
                </div>
                <button
                  v-for="item in group.items"
                  :key="item.path"
                  :ref="el => setItemRef(el, item._index)"
                  type="button"
                  class="flex w-full items-start gap-3 px-4 py-3 text-left transition-colors"
                  :class="
                    activeIndex === item._index
                      ? 'bg-blue-50 dark:bg-blue-950/40'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-800/60'
                  "
                  @mouseenter="activeIndex = item._index"
                  @click="go(item)"
                >
                  <Icon name="i-lucide-file-text" class="mt-0.5 size-4 shrink-0 text-gray-400" />
                  <div class="min-w-0 flex-1">
                    <div
                      class="truncate text-sm font-medium"
                      :class="activeIndex === item._index ? 'text-blue-700 dark:text-blue-300' : 'text-gray-900 dark:text-gray-100'"
                    >
                      {{ item.title }}
                    </div>
                    <div v-if="item.description" class="mt-0.5 truncate text-xs text-gray-500 dark:text-gray-400">
                      {{ item.description }}
                    </div>
                    <div class="mt-0.5 truncate font-mono text-[11px] text-gray-400 dark:text-gray-500">
                      {{ item.path }}
                    </div>
                  </div>
                  <Icon
                    v-if="activeIndex === item._index"
                    name="i-lucide-corner-down-left"
                    class="mt-1 size-3.5 shrink-0 text-blue-500"
                  />
                </button>
              </template>
            </template>
          </div>

          <!-- Footer hint -->
          <div class="flex items-center justify-between gap-4 border-t border-gray-200 bg-gray-50 px-4 py-2 text-[11px] text-gray-500 dark:border-gray-800 dark:bg-gray-900/60 dark:text-gray-400">
            <div class="flex items-center gap-3">
              <span class="flex items-center gap-1">
                <kbd class="rounded border border-gray-300 bg-white px-1 font-mono dark:border-gray-700 dark:bg-gray-800">↑↓</kbd>
                导航
              </span>
              <span class="flex items-center gap-1">
                <kbd class="rounded border border-gray-300 bg-white px-1 font-mono dark:border-gray-700 dark:bg-gray-800">↵</kbd>
                选择
              </span>
              <span class="flex items-center gap-1">
                <kbd class="rounded border border-gray-300 bg-white px-1 font-mono dark:border-gray-700 dark:bg-gray-800">Esc</kbd>
                关闭
              </span>
            </div>
            <span>{{ filtered.length }} 条结果</span>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { tabs } from '~/navigation.config'
import type { NavItem } from '~/navigation.config'

interface SearchItem {
  path: string
  title: string
  description?: string
  tab: string
  _index: number
}

const router = useRouter()
const isOpen = ref(false)
const query = ref('')
const activeIndex = ref(0)
const inputRef = ref<HTMLInputElement>()
const listRef = ref<HTMLElement>()
const itemRefs = new Map<number, HTMLElement>()

function setItemRef(el: any, index: number) {
  if (el) itemRefs.set(index, el as HTMLElement)
}

// Flatten all nav items from all tabs into a searchable list
const allItems = computed<Omit<SearchItem, '_index'>[]>(() => {
  const items: Omit<SearchItem, '_index'>[] = []
  const walk = (nav: NavItem[], tabName: string) => {
    for (const item of nav) {
      if (item.path) {
        items.push({
          path: item.path,
          title: item.title,
          tab: tabName,
        })
      }
      if (item.children) walk(item.children, tabName)
    }
  }
  for (const tab of tabs) walk(tab.groups, tab.name)
  return items
})

// Fetch descriptions from content collection on first open
const { data: docs } = useAsyncData(
  'search-docs',
  () => queryCollection('docs').select('path', 'title', 'description').all(),
  { lazy: true, default: () => [] },
)

const descMap = computed(() => {
  const m = new Map<string, string>()
  for (const d of (docs.value ?? []) as any[]) {
    if (d.path && d.description) m.set(d.path, d.description)
  }
  return m
})

const filtered = computed<SearchItem[]>(() => {
  const q = query.value.trim().toLowerCase()
  const pool = allItems.value.map((it, i) => ({
    ...it,
    description: descMap.value.get(it.path),
    _index: i,
  }))
  if (!q) return pool.slice(0, 50)
  const result = pool.filter((it) => {
    return (
      it.title.toLowerCase().includes(q)
      || it.path.toLowerCase().includes(q)
      || (it.description?.toLowerCase().includes(q) ?? false)
    )
  })
  // Re-index after filtering so keyboard nav maps to visible list
  return result.map((it, i) => ({ ...it, _index: i }))
})

const grouped = computed(() => {
  const map = new Map<string, SearchItem[]>()
  for (const item of filtered.value) {
    if (!map.has(item.tab)) map.set(item.tab, [])
    map.get(item.tab)!.push(item)
  }
  return Array.from(map.entries()).map(([tab, items]) => ({ tab, items }))
})

function open() {
  isOpen.value = true
  query.value = ''
  activeIndex.value = 0
  nextTick(() => inputRef.value?.focus())
}

function close() {
  isOpen.value = false
}

function move(delta: number) {
  const total = filtered.value.length
  if (!total) return
  activeIndex.value = (activeIndex.value + delta + total) % total
  nextTick(() => {
    const el = itemRefs.get(activeIndex.value)
    el?.scrollIntoView({ block: 'nearest' })
  })
}

function selectCurrent() {
  const item = filtered.value[activeIndex.value]
  if (item) go(item)
}

function go(item: SearchItem) {
  close()
  router.push(item.path)
}

// Reset active index whenever filter changes
watch(filtered, () => {
  activeIndex.value = 0
})

// Global Cmd/Ctrl+K shortcut
function onKey(e: KeyboardEvent) {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault()
    isOpen.value ? close() : open()
  }
}

onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>
