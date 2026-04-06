<template>
  <div>
    <!-- Single page link (no children) -->
    <NuxtLink
      v-if="item.path && !item.children"
      :to="item.path"
      class="flex items-center gap-2 rounded-md px-3 py-1.5 text-sm transition-colors"
      :class="
        isActivePath(item.path)
          ? 'bg-blue-50 font-medium text-blue-700 dark:bg-blue-950 dark:text-blue-300'
          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200'
      "
    >
      <Icon v-if="item.icon" :name="item.icon" class="size-4 shrink-0" />
      <span class="truncate">{{ item.title }}</span>
    </NuxtLink>

    <!-- Group with children -->
    <div v-else-if="item.children">
      <button
        class="flex w-full items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800"
        @click="isOpen = !isOpen"
      >
        <Icon v-if="item.icon" :name="item.icon" class="size-4 shrink-0" />
        <span class="flex-1 truncate text-left">{{ item.title }}</span>
        <Icon
          name="heroicons:chevron-right"
          class="size-4 shrink-0 transition-transform"
          :class="{ 'rotate-90': isOpen }"
        />
      </button>
      <div v-show="isOpen" class="ml-3 border-l border-gray-200 pl-2 dark:border-gray-700">
        <SidebarGroup
          v-for="(child, index) in item.children"
          :key="index"
          :item="child"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NavItem } from '~/navigation.config'

const props = defineProps<{
  item: NavItem
}>()

const { isActivePath, isGroupActive } = useNavigation()

// Auto-expand if this group contains the active page
const isOpen = ref(isGroupActive(props.item))

// Watch for route changes to auto-expand
const route = useRoute()
watch(() => route.path, () => {
  if (isGroupActive(props.item)) {
    isOpen.value = true
  }
})
</script>
