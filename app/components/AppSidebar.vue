<template>
  <aside
    class="sidebar-scroll relative h-[calc(100vh-4rem)] w-64 shrink-0 overflow-y-auto border-r border-gray-200 bg-white pb-8 pt-4 dark:border-gray-800 dark:bg-gray-900"
  >
    <!-- Search -->
    <div class="mb-3 px-3">
      <AppSearch />
    </div>

    <!-- Mobile tabs -->
    <div class="mb-4 space-y-1 px-3 lg:hidden">
      <NuxtLink
        v-for="tab in tabs"
        :key="tab.prefix"
        :to="getTabLink(tab)"
        class="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium"
        :class="
          activeTab?.prefix === tab.prefix
            ? 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
            : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
        "
        @click="$emit('close')"
      >
        <Icon v-if="tab.icon" :name="tab.icon" class="size-4 shrink-0" />
        <span>{{ tab.name }}</span>
      </NuxtLink>
      <hr class="my-2 border-gray-200 dark:border-gray-700" />
    </div>

    <!-- Sidebar navigation -->
    <nav class="space-y-1 px-3">
      <SidebarGroup
        v-for="(item, index) in sidebarItems"
        :key="index"
        :item="item"
      />
    </nav>
  </aside>
</template>

<script setup lang="ts">
import type { NavTab } from '~/navigation.config'

defineProps<{
  collapsed?: boolean
}>()

defineEmits<{
  close: []
  'toggle-collapsed': []
}>()

const { tabs, activeTab, sidebarItems } = useNavigation()

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
