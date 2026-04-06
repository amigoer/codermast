import { tabs } from '~/navigation.config'
import type { NavTab, NavItem } from '~/navigation.config'

export function useNavigation() {
  const route = useRoute()

  const activeTab = computed<NavTab | undefined>(() => {
    const path = route.path
    // Homepage and other non-tab routes: no active tab
    if (path === '/') return undefined
    // Find the tab whose prefix matches the current path
    return tabs.find(tab => path.startsWith(tab.prefix))
  })

  const sidebarItems = computed<NavItem[]>(() => {
    return activeTab.value?.groups || []
  })

  const isActivePath = (itemPath: string | undefined) => {
    if (!itemPath) return false
    return route.path === itemPath
  }

  const isGroupActive = (item: NavItem): boolean => {
    if (item.path && isActivePath(item.path)) return true
    if (item.children) {
      return item.children.some(child => isGroupActive(child))
    }
    return false
  }

  // Find prev/next pages for pagination
  const flatPages = computed<NavItem[]>(() => {
    const pages: NavItem[] = []
    const flatten = (items: NavItem[]) => {
      for (const item of items) {
        if (item.path) pages.push(item)
        if (item.children) flatten(item.children)
      }
    }
    flatten(sidebarItems.value)
    return pages
  })

  const currentPageIndex = computed(() => {
    return flatPages.value.findIndex(p => p.path === route.path)
  })

  const prevPage = computed(() => {
    const idx = currentPageIndex.value
    return idx > 0 ? flatPages.value[idx - 1] : undefined
  })

  const nextPage = computed(() => {
    const idx = currentPageIndex.value
    return idx >= 0 && idx < flatPages.value.length - 1
      ? flatPages.value[idx + 1]
      : undefined
  })

  return {
    tabs,
    activeTab,
    sidebarItems,
    isActivePath,
    isGroupActive,
    prevPage,
    nextPage,
  }
}
