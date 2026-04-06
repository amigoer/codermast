<template>
  <div class="min-h-screen bg-white dark:bg-gray-900">
    <AppHeader @toggle-sidebar="sidebarOpen = !sidebarOpen" />

    <div class="relative mx-auto flex max-w-[90rem]">
      <!-- Sidebar overlay (mobile) -->
      <div
        v-if="sidebarOpen"
        class="fixed inset-0 z-40 bg-black/50 lg:hidden"
        @click="sidebarOpen = false"
      />

      <!-- Sidebar (hidden entirely for standalone tabs) -->
      <template v-if="!activeTab?.standalone">
        <div
          class="fixed left-0 top-16 z-40 transition-transform lg:sticky lg:top-16 lg:z-auto lg:h-[calc(100vh-4rem)] lg:translate-x-0 lg:self-start"
          :class="[
            sidebarOpen ? 'translate-x-0' : '-translate-x-full',
            sidebarCollapsed ? 'lg:hidden' : '',
          ]"
        >
          <AppSidebar
            :collapsed="sidebarCollapsed"
            @close="sidebarOpen = false"
            @toggle-collapsed="toggleCollapsed"
          />
        </div>

        <!-- Desktop: edge toggle button, sits on the sidebar/content border -->
        <div class="pointer-events-none sticky top-16 hidden h-[calc(100vh-4rem)] w-0 self-start lg:block">
          <button
            class="pointer-events-auto absolute top-1/2 flex size-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 shadow-sm transition-all hover:border-blue-400 hover:text-blue-600 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400 dark:hover:border-blue-500 dark:hover:text-blue-400"
            :aria-label="sidebarCollapsed ? '展开侧边栏' : '收起侧边栏'"
            @click="toggleCollapsed"
          >
            <Icon
              :name="sidebarCollapsed ? 'i-lucide-chevron-right' : 'i-lucide-chevron-left'"
              class="size-3.5"
            />
          </button>
        </div>
      </template>

      <!-- Main content -->
      <slot />
    </div>
  </div>
</template>

<script setup>
const { activeTab } = useNavigation()
const sidebarOpen = ref(false)
const sidebarCollapsed = useState('sidebar-collapsed', () => false)

// Restore from localStorage on client
onMounted(() => {
  const stored = localStorage.getItem('sidebar-collapsed')
  if (stored !== null) sidebarCollapsed.value = stored === '1'
})

function toggleCollapsed() {
  sidebarCollapsed.value = !sidebarCollapsed.value
  if (import.meta.client) {
    localStorage.setItem('sidebar-collapsed', sidebarCollapsed.value ? '1' : '0')
  }
}

// Close sidebar on route change (mobile)
const route = useRoute()
watch(() => route.path, () => {
  sidebarOpen.value = false
})
</script>
