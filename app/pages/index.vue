<script setup lang="ts">
import { tabs } from '~/navigation.config'
import type { NavTab, NavItem } from '~/navigation.config'

definePageMeta({
  layout: 'home',
})

useHead({
  title: 'CoderMast — 程序员编程知识体系',
  meta: [
    { name: 'description', content: 'CoderMast 是一个面向程序员的编程知识体系，涵盖 AI、Golang、Java、Spring、技术教程、面试宝典和项目实战。' },
  ],
})

function firstPath(tab: NavTab): string {
  const find = (items: NavItem[]): string | undefined => {
    for (const it of items) {
      if (it.path) return it.path
      if (it.children) {
        const f = find(it.children)
        if (f) return f
      }
    }
    return undefined
  }
  return find(tab.groups) ?? tab.prefix
}

const tabColors: Record<string, string> = {
  '/ai': 'from-purple-500/20 to-blue-500/20 text-purple-600 dark:text-purple-400',
  '/golang': 'from-cyan-500/20 to-blue-500/20 text-cyan-600 dark:text-cyan-400',
  '/other': 'from-orange-500/20 to-red-500/20 text-orange-600 dark:text-orange-400',
  '/tutorials': 'from-emerald-500/20 to-green-500/20 text-emerald-600 dark:text-emerald-400',
  '/interview': 'from-amber-500/20 to-orange-500/20 text-amber-600 dark:text-amber-400',
  '/project': 'from-pink-500/20 to-rose-500/20 text-pink-600 dark:text-pink-400',
  '/about': 'from-gray-500/20 to-slate-500/20 text-gray-600 dark:text-gray-400',
}

const tabDescriptions: Record<string, string> = {
  '/ai': '从机器学习基础到大语言模型，系统学习 AI 技术栈',
  '/golang': 'Go 语言核心基础、Web 开发、分布式系统与工程化实践',
  '/other': 'Java 核心、JVM、并发、Spring 全家桶完整体系',
  '/tutorials': '数据库、消息队列、云原生、前端与开发工具',
  '/interview': '高频面试题、算法题与面试技巧精讲',
  '/project': '从零到一的实战项目教程与最佳实践',
  '/about': '关于 CoderMast 项目与作者',
}

const features = [
  {
    icon: 'i-lucide-book-open-check',
    title: '系统化学习路径',
    desc: '从入门到进阶，精心规划的学习路线，避免盲目摸索',
  },
  {
    icon: 'i-lucide-code-2',
    title: '代码与实战并重',
    desc: '每个知识点都配有可运行的代码示例和实战案例',
  },
  {
    icon: 'i-lucide-layers',
    title: '覆盖全技术栈',
    desc: '后端、前端、AI、数据库、中间件，一站式技术文档',
  },
  {
    icon: 'i-lucide-refresh-cw',
    title: '持续更新迭代',
    desc: '跟随技术演进，持续补充和优化内容',
  },
]
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="relative overflow-hidden">
      <!-- Background decoration -->
      <div class="pointer-events-none absolute inset-0 -z-10">
        <div class="absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-br from-blue-500/10 via-cyan-500/5 to-transparent blur-3xl" />
      </div>

      <div class="mx-auto max-w-6xl px-4 pb-20 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div class="text-center">
          <div class="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm text-blue-700 dark:border-blue-900 dark:bg-blue-950/50 dark:text-blue-300">
            <Icon name="i-lucide-sparkles" class="size-4" />
            <span>程序员的编程知识体系</span>
          </div>
          <h1 class="mx-auto max-w-4xl text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl dark:text-white">
            成为编程领域的
            <span class="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              CoderMast
            </span>
          </h1>
          <p class="mx-auto mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
            系统化整理 AI、Golang、Java、Spring、数据库、中间件等核心技术，助你构建完整的知识体系，轻松应对面试与实战。
          </p>
          <div class="mt-10 flex flex-wrap items-center justify-center gap-4">
            <NuxtLink
              to="/ai/getting-started"
              class="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md"
            >
              开始学习
              <Icon name="i-lucide-arrow-right" class="size-4" />
            </NuxtLink>
            <a
              href="https://github.com/amigoer/codermast"
              target="_blank"
              class="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-900 transition-all hover:border-gray-400 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700"
            >
              <Icon name="mdi:github" class="size-5" />
              GitHub
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Tabs grid -->
    <section class="mx-auto max-w-6xl px-4 pb-20 lg:px-8">
      <div class="mb-10 text-center">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white">
          探索知识栏目
        </h2>
        <p class="mt-3 text-gray-600 dark:text-gray-400">
          选择你感兴趣的领域开始学习
        </p>
      </div>
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <NuxtLink
          v-for="tab in tabs"
          :key="tab.prefix"
          :to="firstPath(tab)"
          class="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-6 transition-all hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg dark:border-gray-800 dark:bg-gray-800/50 dark:hover:border-blue-700"
        >
          <div
            class="pointer-events-none absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity group-hover:opacity-100"
            :class="tabColors[tab.prefix] ?? ''"
          />
          <div class="relative">
            <div
              class="mb-4 inline-flex size-12 items-center justify-center rounded-lg bg-gradient-to-br"
              :class="tabColors[tab.prefix] ?? 'from-blue-500/20 to-cyan-500/20'"
            >
              <Icon :name="tab.icon || 'i-lucide-book'" class="size-6" />
            </div>
            <h3 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
              {{ tab.name }}
            </h3>
            <p class="mb-4 text-sm text-gray-600 dark:text-gray-400">
              {{ tabDescriptions[tab.prefix] ?? '' }}
            </p>
            <div class="flex items-center text-sm font-medium text-blue-600 dark:text-blue-400">
              <span>开始学习</span>
              <Icon name="i-lucide-arrow-right" class="ml-1 size-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </NuxtLink>
      </div>
    </section>

    <!-- Features -->
    <section class="border-t border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900/50">
      <div class="mx-auto max-w-6xl px-4 py-20 lg:px-8">
        <div class="mb-12 text-center">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white">
            为什么选择 CoderMast
          </h2>
          <p class="mt-3 text-gray-600 dark:text-gray-400">
            高质量、成体系、易上手的编程学习平台
          </p>
        </div>
        <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div
            v-for="feature in features"
            :key="feature.title"
            class="text-center"
          >
            <div class="mx-auto mb-4 inline-flex size-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
              <Icon :name="feature.icon" class="size-6" />
            </div>
            <h3 class="mb-2 font-semibold text-gray-900 dark:text-white">
              {{ feature.title }}
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              {{ feature.desc }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="mx-auto max-w-6xl px-4 py-20 lg:px-8">
      <div class="rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-600 p-12 text-center">
        <h2 class="text-3xl font-bold text-white">
          开启你的编程之旅
        </h2>
        <p class="mx-auto mt-4 max-w-xl text-blue-50">
          加入 CoderMast，和千万程序员一起系统化学习，构建扎实的技术功底。
        </p>
        <NuxtLink
          to="/ai/getting-started"
          class="mt-8 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-base font-medium text-blue-700 shadow-sm transition-all hover:bg-blue-50"
        >
          立即开始
          <Icon name="i-lucide-arrow-right" class="size-4" />
        </NuxtLink>
      </div>
    </section>

    <!-- Footer -->
    <footer class="border-t border-gray-200 dark:border-gray-800">
      <div class="mx-auto max-w-6xl px-4 py-8 lg:px-8">
        <div class="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <img src="/logo-text.svg" alt="CoderMast" class="h-6 dark:hidden" />
            <img src="/logo-text-dark.svg" alt="CoderMast" class="hidden h-6 dark:block" />
          </div>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            © {{ new Date().getFullYear() }} CoderMast. Built with Nuxt.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>
