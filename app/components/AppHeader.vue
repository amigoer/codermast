<template>
  <header class="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-gray-900/80">
    <div class="mx-auto flex h-16 max-w-[90rem] items-center gap-6 px-4 lg:px-8">
      <!-- Logo -->
      <NuxtLink to="/" class="flex shrink-0 items-center">
        <img src="/logo-text.svg" alt="CoderMast" class="h-8 dark:hidden" />
        <img src="/logo-text-dark.svg" alt="CoderMast" class="hidden h-8 dark:block" />
      </NuxtLink>

      <!-- Mobile menu button -->
      <button
        class="ml-auto rounded-md p-2 text-gray-500 hover:bg-gray-100 lg:hidden dark:hover:bg-gray-800"
        aria-label="Toggle menu"
        @click="$emit('toggle-sidebar')"
      >
        <Icon name="heroicons:bars-3" class="size-5" />
      </button>

      <!-- Tabs (desktop) -->
      <nav class="hidden flex-1 items-center justify-center lg:flex">
        <div class="flex items-center gap-1">
          <template v-for="tab in tabs" :key="tab.prefix">
            <!-- Standalone tab: hover dropdown with flat page list -->
            <div
              v-if="tab.standalone"
              class="group relative"
            >
              <NuxtLink
                :to="getTabLink(tab)"
                class="relative flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-colors"
                :class="
                  activeTab?.prefix === tab.prefix
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
                "
              >
                <Icon v-if="tab.icon" :name="tab.icon" class="size-4 shrink-0" />
                <span>{{ tab.name }}</span>
                <Icon name="i-lucide-chevron-down" class="size-3.5 opacity-60 transition-transform group-hover:rotate-180" />
                <span
                  v-if="activeTab?.prefix === tab.prefix"
                  class="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-blue-600 dark:bg-blue-400"
                />
              </NuxtLink>
              <!-- Dropdown -->
              <div
                class="invisible absolute left-1/2 top-full z-50 min-w-[12rem] -translate-x-1/2 translate-y-1 pt-1 opacity-0 transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100"
              >
                <div class="overflow-hidden rounded-lg border border-gray-200 bg-white p-1 shadow-lg dark:border-gray-700 dark:bg-gray-900">
                  <NuxtLink
                    v-for="item in flattenTabItems(tab)"
                    :key="item.path"
                    :to="item.path!"
                    class="flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors"
                    :class="
                      route.path === item.path
                        ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300'
                        : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800'
                    "
                  >
                    <Icon v-if="item.icon" :name="item.icon" class="size-4 shrink-0" />
                    <span>{{ item.title }}</span>
                  </NuxtLink>
                </div>
              </div>
            </div>
            <!-- Regular tab -->
            <NuxtLink
              v-else
              :to="getTabLink(tab)"
              class="group relative flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-colors"
              :class="
                activeTab?.prefix === tab.prefix
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
              "
            >
              <Icon
                v-if="tab.icon"
                :name="tab.icon"
                class="size-4 shrink-0"
                :class="activeTab?.prefix !== tab.prefix && !tab.icon?.startsWith('i-vscode-icons') ? 'opacity-80' : ''"
              />
              <span>{{ tab.name }}</span>
              <span
                v-if="activeTab?.prefix === tab.prefix"
                class="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-blue-600 dark:bg-blue-400"
              />
            </NuxtLink>
          </template>
        </div>
      </nav>

      <!-- Right actions (desktop) -->
      <div class="hidden items-center gap-1 lg:flex">
        <a
          href="https://github.com/amigoer/codermast"
          target="_blank"
          aria-label="GitHub"
          class="flex size-9 items-center justify-center rounded-md text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
        >
          <Icon name="mdi:github" class="size-5" />
        </a>
        <button
          aria-label="Toggle dark mode"
          class="flex size-9 items-center justify-center rounded-md text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
          @click="toggleColorMode"
        >
          <Icon :name="colorModeIcon" class="size-5" />
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import type { NavItem, NavTab } from '~/navigation.config'

defineEmits<{
  'toggle-sidebar': []
}>()

const route = useRoute()
const { tabs, activeTab } = useNavigation()

function flattenTabItems(tab: NavTab): NavItem[] {
  const out: NavItem[] = []
  const walk = (items: NavItem[]) => {
    for (const it of items) {
      if (it.path) out.push(it)
      if (it.children) walk(it.children)
    }
  }
  walk(tab.groups)
  return out
}
const colorMode = useColorMode()

const colorModeIcon = computed(() =>
  colorMode.value === 'dark' ? 'heroicons:sun' : 'heroicons:moon'
)

function toggleColorMode() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

function getTabLink(tab: NavTab) {
  // Get the first page link in the tab
  const findFirst = (items: any[]): string => {
    for (const item of items) {
      if (item.path) return item.path
      if (item.children) {
        const found = findFirst(item.children)
        if (found) return found
      }
    }
    return tab.prefix
  }
  return findFirst(tab.groups)
}
</script>
