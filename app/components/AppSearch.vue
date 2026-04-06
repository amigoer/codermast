<template>
  <div>
    <!-- Trigger button (looks like a search input) -->
    <button
      type="button"
      class="group relative flex w-full items-center gap-2.5 rounded-lg border border-gray-200 bg-gray-50/80 px-3 py-2 text-sm text-gray-500 transition-all hover:border-blue-300 hover:bg-white hover:text-gray-700 hover:shadow-sm focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 dark:border-gray-800 dark:bg-gray-800/50 dark:text-gray-400 dark:hover:border-blue-600 dark:hover:bg-gray-900 dark:hover:text-gray-200 dark:focus:border-blue-500 dark:focus:ring-blue-950"
      @click="open"
    >
      <Icon name="i-lucide-search" class="size-4 shrink-0 text-gray-400 transition-colors group-hover:text-blue-500 dark:text-gray-500 dark:group-hover:text-blue-400" />
      <span class="flex-1 text-left text-gray-400 dark:text-gray-500">搜索文档...</span>
      <span class="hidden items-center gap-1 sm:flex">
        <kbd class="flex size-6 items-center justify-center rounded-md border border-gray-200 bg-white font-sans text-xs font-medium text-gray-600 shadow-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300">
          ⌘
        </kbd>
        <kbd class="flex size-6 items-center justify-center rounded-md border border-gray-200 bg-white font-sans text-xs font-medium text-gray-600 shadow-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300">
          K
        </kbd>
      </span>
    </button>

    <!-- Modal overlay -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="isOpen"
          class="fixed inset-0 z-50 flex items-start justify-center bg-gray-900/40 p-4 pt-[12vh] backdrop-blur-sm dark:bg-black/60"
          @click.self="close"
        >
          <Transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="translate-y-2 scale-[0.98] opacity-0"
            enter-to-class="translate-y-0 scale-100 opacity-100"
            leave-active-class="transition duration-150 ease-in"
            leave-from-class="translate-y-0 scale-100 opacity-100"
            leave-to-class="translate-y-2 scale-[0.98] opacity-0"
          >
            <div
              v-if="isOpen"
              class="flex max-h-[75vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-gray-200/80 bg-white/95 shadow-2xl shadow-gray-900/10 backdrop-blur-xl dark:border-gray-800 dark:bg-gray-900/95 dark:shadow-black/40"
            >
              <!-- Input -->
              <div class="flex items-center gap-3 border-b border-gray-100 px-4 py-3.5 dark:border-gray-800">
                <Icon name="i-lucide-search" class="size-5 shrink-0 text-gray-400" />
                <input
                  ref="inputRef"
                  v-model="query"
                  type="text"
                  placeholder="搜索文档、标题、关键字..."
                  class="flex-1 bg-transparent text-[15px] text-gray-900 placeholder-gray-400 outline-none dark:text-gray-100 dark:placeholder-gray-500"
                  @keydown.down.prevent="move(1)"
                  @keydown.up.prevent="move(-1)"
                  @keydown.enter.prevent="selectCurrent"
                  @keydown.esc.prevent="close"
                >
                <kbd
                  class="hidden items-center rounded-md border border-gray-200 bg-gray-50 px-1.5 py-0.5 font-mono text-[10px] font-medium text-gray-500 sm:flex dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
                >
                  ESC
                </kbd>
              </div>

              <!-- Results -->
              <div
                ref="listRef"
                class="min-h-0 flex-1 overflow-y-auto py-2"
              >
                <!-- Empty state -->
                <div
                  v-if="!filtered.length"
                  class="flex flex-col items-center gap-3 px-4 py-16 text-center"
                >
                  <div class="flex size-12 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                    <Icon
                      :name="query ? 'i-lucide-search-x' : 'i-lucide-sparkles'"
                      class="size-5 text-gray-400"
                    />
                  </div>
                  <div class="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {{ query ? '没有找到相关文档' : '开始搜索' }}
                  </div>
                  <div class="text-xs text-gray-500 dark:text-gray-500">
                    {{ query ? `试试其它关键词，比如 "MCP"、"Golang"` : '按标题、描述或路径快速定位文档' }}
                  </div>
                </div>

                <!-- Grouped results -->
                <template v-else>
                  <div
                    v-for="(group, gi) in grouped"
                    :key="gi"
                    class="px-2"
                    :class="gi > 0 ? 'mt-2' : ''"
                  >
                    <div class="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                      <Icon :name="tabIconMap[group.tab] || 'i-lucide-folder'" class="size-3" />
                      {{ group.tab }}
                      <span class="ml-auto font-mono text-[10px] normal-case tracking-normal text-gray-400">
                        {{ group.items.length }}
                      </span>
                    </div>
                    <button
                      v-for="item in group.items"
                      :key="item.path"
                      :ref="el => setItemRef(el, item._index)"
                      type="button"
                      class="group/item flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors"
                      :class="
                        activeIndex === item._index
                          ? 'bg-blue-50 dark:bg-blue-950/40'
                          : 'hover:bg-gray-50 dark:hover:bg-gray-800/60'
                      "
                      @mouseenter="activeIndex = item._index"
                      @click="go(item)"
                    >
                      <div
                        class="flex size-8 shrink-0 items-center justify-center rounded-md border transition-colors"
                        :class="
                          activeIndex === item._index
                            ? 'border-blue-200 bg-white text-blue-600 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-400'
                            : 'border-gray-200 bg-gray-50 text-gray-400 dark:border-gray-700 dark:bg-gray-800/60 dark:text-gray-500'
                        "
                      >
                        <Icon name="i-lucide-file-text" class="size-4" />
                      </div>
                      <div class="min-w-0 flex-1">
                        <div
                          class="truncate text-sm font-medium"
                          :class="activeIndex === item._index ? 'text-blue-700 dark:text-blue-300' : 'text-gray-900 dark:text-gray-100'"
                          v-html="highlight(item.title)"
                        />
                        <div
                          v-if="item.description"
                          class="mt-0.5 truncate text-xs text-gray-500 dark:text-gray-400"
                          v-html="highlight(item.description)"
                        />
                      </div>
                      <Icon
                        v-if="activeIndex === item._index"
                        name="i-lucide-corner-down-left"
                        class="size-4 shrink-0 text-blue-500"
                      />
                      <Icon
                        v-else
                        name="i-lucide-chevron-right"
                        class="size-4 shrink-0 text-gray-300 opacity-0 transition-opacity group-hover/item:opacity-100 dark:text-gray-600"
                      />
                    </button>
                  </div>
                </template>
              </div>

              <!-- Footer hint -->
              <div class="flex items-center justify-between gap-4 border-t border-gray-100 bg-gray-50/80 px-5 py-3 text-xs text-gray-500 dark:border-gray-800 dark:bg-gray-900/60 dark:text-gray-400">
                <div class="flex items-center gap-4">
                  <span class="flex items-center gap-1.5">
                    <kbd class="flex size-5 items-center justify-center rounded-md border border-gray-200 bg-white font-mono text-xs shadow-sm dark:border-gray-700 dark:bg-gray-800">↑</kbd>
                    <kbd class="flex size-5 items-center justify-center rounded-md border border-gray-200 bg-white font-mono text-xs shadow-sm dark:border-gray-700 dark:bg-gray-800">↓</kbd>
                    <span class="ml-0.5">导航</span>
                  </span>
                  <span class="flex items-center gap-1.5">
                    <kbd class="flex h-5 min-w-5 items-center justify-center rounded-md border border-gray-200 bg-white px-1.5 font-mono text-xs shadow-sm dark:border-gray-700 dark:bg-gray-800">↵</kbd>
                    <span class="ml-0.5">选择</span>
                  </span>
                  <span class="hidden items-center gap-1.5 sm:flex">
                    <kbd class="flex h-5 items-center rounded-md border border-gray-200 bg-white px-1.5 font-mono text-[10px] font-medium shadow-sm dark:border-gray-700 dark:bg-gray-800">ESC</kbd>
                    <span class="ml-0.5">关闭</span>
                  </span>
                </div>
                <span v-if="filtered.length" class="flex items-center gap-1.5 font-medium">
                  <Icon name="i-lucide-file-text" class="size-3.5" />
                  {{ filtered.length }} 条结果
                </span>
              </div>
            </div>
          </Transition>
        </div>
      </Transition>
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

// Tab -> icon lookup built from navigation config
const tabIconMap = computed<Record<string, string>>(() => {
  const map: Record<string, string> = {}
  for (const t of tabs) {
    if (t.icon) map[t.name] = t.icon
  }
  return map
})

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

// Highlight matched portions of text
function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function escapeRegex(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function highlight(text: string | undefined): string {
  if (!text) return ''
  const safe = escapeHtml(text)
  const q = query.value.trim()
  if (!q) return safe
  const re = new RegExp(`(${escapeRegex(escapeHtml(q))})`, 'ig')
  return safe.replace(
    re,
    '<mark class="rounded-sm bg-yellow-200/70 px-0.5 text-gray-900 dark:bg-yellow-500/30 dark:text-yellow-100">$1</mark>',
  )
}

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
