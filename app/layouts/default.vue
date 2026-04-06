<template>
  <div class="min-h-screen bg-white dark:bg-gray-900">
    <AppHeader @toggle-sidebar="sidebarOpen = !sidebarOpen" />

    <div class="mx-auto flex max-w-[90rem]">
      <!-- Sidebar overlay (mobile) -->
      <div
        v-if="sidebarOpen"
        class="fixed inset-0 z-40 bg-black/50 lg:hidden"
        @click="sidebarOpen = false"
      />

      <!-- Sidebar -->
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

      <!-- Desktop: floating expand button when sidebar is collapsed -->
      <button
        v-if="sidebarCollapsed"
        class="fixed left-0 top-20 z-30 hidden items-center justify-center rounded-r-md border border-l-0 border-gray-200 bg-white p-2 text-gray-500 shadow-sm transition-colors hover:text-blue-600 lg:flex dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:text-blue-400"
        aria-label="展开侧边栏"
        @click="toggleCollapsed"
      >
        <Icon name="i-lucide-panel-left-open" class="size-4" />
      </button>

      <!-- Main content -->
      <slot />
    </div>
  </div>
</template>

<script setup>
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
