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
        class="fixed left-0 top-16 z-40 transition-transform lg:relative lg:top-0 lg:z-auto lg:translate-x-0"
        :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full'"
      >
        <AppSidebar @close="sidebarOpen = false" />
      </div>

      <!-- Main content -->
      <slot />
    </div>
  </div>
</template>

<script setup>
const sidebarOpen = ref(false)

// Close sidebar on route change (mobile)
const route = useRoute()
watch(() => route.path, () => {
  sidebarOpen.value = false
})
</script>
