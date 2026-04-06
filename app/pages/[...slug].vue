<template>
  <div class="flex min-h-[calc(100vh-4rem)] flex-1">
    <!-- Content area -->
    <main class="min-w-0 flex-1 px-6 py-8 lg:px-12">
      <div v-if="page" class="mx-auto max-w-3xl">
        <!-- Page title -->
        <h1 class="mb-8 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          {{ page.title }}
        </h1>

        <!-- Rendered content -->
        <div class="prose prose-blue max-w-none dark:prose-invert prose-headings:scroll-mt-20 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-code:before:content-[''] prose-code:after:content-[''] prose-pre:bg-gray-950 prose-img:rounded-lg">
          <ContentRenderer v-if="page.body" :value="page" />
        </div>

        <!-- Changelog (GitHub commits for this file) -->
        <section v-if="commits && commits.length" class="mt-16">
          <h2 class="mb-4 border-b border-gray-200 pb-2 text-xl font-bold text-gray-900 dark:border-gray-800 dark:text-gray-100">
            更新日志
          </h2>
          <div class="rounded-lg bg-gray-50 dark:bg-gray-800/50">
            <button
              type="button"
              class="flex w-full items-center justify-between p-5 text-left"
              :aria-expanded="changelogOpen"
              @click="changelogOpen = !changelogOpen"
            >
              <div class="flex items-center gap-2 font-semibold text-gray-900 dark:text-gray-100">
                <Icon name="i-lucide-clock" class="size-4" />
                <span>{{ formatDate(commits[0].date) }}</span>
              </div>
              <div class="flex items-center gap-3">
                <a
                  :href="historyUrl"
                  target="_blank"
                  rel="noopener"
                  class="inline-flex items-center gap-1.5 text-sm text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                  @click.stop
                >
                  <Icon name="i-lucide-list" class="size-4" />
                  查看所有更新日志
                </a>
                <Icon
                  name="i-lucide-chevron-down"
                  class="size-4 text-gray-500 transition-transform"
                  :class="{ 'rotate-180': changelogOpen }"
                />
              </div>
            </button>
            <ul v-if="changelogOpen" class="space-y-2 px-5 pb-5 text-sm">
              <li
                v-for="c in commits"
                :key="c.sha"
                class="flex items-center gap-2 text-gray-700 dark:text-gray-300"
              >
                <Icon name="i-lucide-git-commit-horizontal" class="size-4 shrink-0 text-gray-400" />
                <a
                  :href="c.url"
                  target="_blank"
                  rel="noopener"
                  class="rounded bg-gray-200/70 px-1.5 py-0.5 font-mono text-xs text-gray-600 transition-colors hover:bg-blue-100 hover:text-blue-700 dark:bg-gray-700/70 dark:text-gray-400 dark:hover:bg-blue-950 dark:hover:text-blue-300"
                >
                  {{ c.shortSha }}
                </a>
                <span class="text-gray-400">-</span>
                <span class="flex-1 truncate">{{ c.message }}</span>
                <span class="shrink-0 text-xs text-gray-500 dark:text-gray-500">
                  于 {{ formatShortDate(c.date) }}
                </span>
              </li>
            </ul>
          </div>
        </section>

        <!-- Edit page / Report issue -->
        <div class="mt-16 flex items-center gap-4 text-sm">
          <div class="h-px flex-1 bg-gray-200 dark:bg-gray-800" />
          <a
            :href="editUrl"
            target="_blank"
            rel="noopener"
            class="inline-flex items-center gap-1.5 text-gray-500 transition-colors hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
          >
            <Icon name="i-lucide-pencil" class="size-4" />
            编辑此页
          </a>
          <span class="text-gray-300 dark:text-gray-700">or</span>
          <a
            :href="issueUrl"
            target="_blank"
            rel="noopener"
            class="inline-flex items-center gap-1.5 text-gray-500 transition-colors hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
          >
            <Icon name="i-lucide-circle-alert" class="size-4" />
            报告问题
          </a>
          <div class="h-px flex-1 bg-gray-200 dark:bg-gray-800" />
        </div>

        <!-- Prev / Next navigation -->
        <nav
          v-if="prevPage || nextPage"
          class="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          <NuxtLink
            v-if="prevPage"
            :to="prevPage.path!"
            class="group flex flex-col rounded-xl border border-gray-200 bg-white p-4 transition-all hover:-translate-y-0.5 hover:border-blue-400 hover:shadow-md dark:border-gray-800 dark:bg-gray-900 dark:hover:border-blue-600"
          >
            <span class="flex items-center gap-1.5 text-xs font-medium text-gray-500 dark:text-gray-500">
              <Icon name="i-lucide-arrow-left" class="size-3.5" />
              上一篇
            </span>
            <span class="mt-2 truncate text-base font-semibold text-gray-900 transition-colors group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400">
              {{ prevPage.title }}
            </span>
          </NuxtLink>
          <div v-else class="hidden sm:block" />
          <NuxtLink
            v-if="nextPage"
            :to="nextPage.path!"
            class="group flex flex-col items-end rounded-xl border border-gray-200 bg-white p-4 text-right transition-all hover:-translate-y-0.5 hover:border-blue-400 hover:shadow-md dark:border-gray-800 dark:bg-gray-900 dark:hover:border-blue-600"
          >
            <span class="flex items-center gap-1.5 text-xs font-medium text-gray-500 dark:text-gray-500">
              下一篇
              <Icon name="i-lucide-arrow-right" class="size-3.5" />
            </span>
            <span class="mt-2 truncate text-base font-semibold text-gray-900 transition-colors group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400">
              {{ nextPage.title }}
            </span>
          </NuxtLink>
        </nav>
      </div>

      <!-- 404 -->
      <div v-else class="flex flex-col items-center justify-center py-20">
        <h1 class="text-4xl font-bold text-gray-400">404</h1>
        <p class="mt-4 text-gray-500">页面不存在</p>
        <NuxtLink to="/ai/getting-started" class="mt-6 text-sm text-blue-600 hover:underline">
          返回首页
        </NuxtLink>
      </div>

      <!-- Footer -->
      <AppFooter />
    </main>

    <!-- Table of Contents -->
    <TableOfContents v-if="page?.body?.toc?.links" :toc="tocItems" />
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { prevPage, nextPage } = useNavigation()

const { data: page } = await useAsyncData(
  `doc-${route.path}`,
  () => queryCollection('docs').path(route.path).first()
)

const REPO = 'amigoer/codermast'
const BRANCH = 'main'

const editUrl = computed(() => {
  const filePath = (page.value as any)?.stem
    ? `content/${(page.value as any).stem}.md`
    : `content${route.path}.md`
  return `https://github.com/${REPO}/edit/${BRANCH}/${filePath}`
})

const issueUrl = computed(() => {
  const title = encodeURIComponent(`[文档] ${page.value?.title ?? route.path}`)
  const body = encodeURIComponent(`页面：${route.path}\n\n问题描述：\n`)
  return `https://github.com/${REPO}/issues/new?title=${title}&body=${body}`
})

const filePath = computed(() => {
  const stem = (page.value as any)?.stem
  return stem ? `content/${stem}.md` : `content${route.path}.md`
})

const historyUrl = computed(
  () => `https://github.com/${REPO}/commits/${BRANCH}/${filePath.value}`
)

const { data: commitsData } = useFetch('/api/commits', {
  query: { path: filePath },
  key: `commits-${route.path}`,
  server: false,
  lazy: true,
  default: () => ({ commits: [] }),
})

const commits = computed(() => (commitsData.value as any)?.commits ?? [])

const changelogOpen = ref(false)

function formatDate(iso: string | null) {
  if (!iso) return ''
  const d = new Date(iso)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const hh = String(d.getHours()).padStart(2, '0')
  const mm = String(d.getMinutes()).padStart(2, '0')
  return `${y}/${m}/${day} ${hh}:${mm}`
}

function formatShortDate(iso: string | null) {
  if (!iso) return ''
  const d = new Date(iso)
  return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`
}

// Extract TOC items from content
const tocItems = computed(() => {
  if (!page.value?.body?.toc?.links) return []
  const items: { id: string; text: string; depth: number }[] = []
  const extractLinks = (links: any[], depth = 2) => {
    for (const link of links) {
      items.push({ id: link.id, text: link.text, depth })
      if (link.children) extractLinks(link.children, depth + 1)
    }
  }
  extractLinks(page.value.body.toc.links)
  return items
})

// SEO
useHead({
  title: page.value?.title ? `${page.value.title} - CoderMast` : 'CoderMast',
})

useSeoMeta({
  title: page.value?.title ? `${page.value.title} - CoderMast` : 'CoderMast',
  description: page.value?.description || 'CoderMast - 全栈开发者知识平台',
})
</script>
