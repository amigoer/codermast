<template>
  <div class="min-h-screen bg-white dark:bg-gray-900">
    <AppHeader @toggle-sidebar="drawerOpen = !drawerOpen" />

    <!-- Mobile drawer overlay -->
    <div
      v-if="drawerOpen"
      class="fixed inset-0 z-40 bg-black/50 lg:hidden"
      @click="drawerOpen = false"
    />

    <!-- Mobile drawer: tabs only (home has no sidebar) -->
    <aside
      v-if="drawerOpen"
      class="fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-64 overflow-y-auto border-r border-gray-200 bg-white pb-8 pt-4 lg:hidden dark:border-gray-800 dark:bg-gray-900"
    >
      <nav class="space-y-1 px-3">
        <NuxtLink
          v-for="tab in tabs"
          :key="tab.prefix"
          :to="getTabLink(tab)"
          class="flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
          @click="drawerOpen = false"
        >
          <Icon v-if="tab.icon" :name="tab.icon" class="size-4 shrink-0" />
          <span>{{ tab.name }}</span>
        </NuxtLink>
      </nav>
    </aside>

    <slot />
  </div>
</template>

<script setup lang="ts">
import { tabs } from '~/navigation.config'
import type { NavTab } from '~/navigation.config'

const drawerOpen = ref(false)

const route = useRoute()
watch(() => route.path, () => { drawerOpen.value = false })

function getTabLink(tab: NavTab) {
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
