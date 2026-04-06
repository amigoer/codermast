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
    icon: 'i-lucide-book-open',
    title: '系统化规划',
    desc: '从入门到进阶的全景规划，带你告别碎片化学习的焦虑，循序渐进构建核心能力。',
  },
  {
    icon: 'i-lucide-monitor-play',
    title: '实战驱动',
    desc: '所有的核心理论讲解都会贴身结合真实代码案例，确保你所学即所用，拒绝纸上谈兵。',
  },
  {
    icon: 'i-lucide-layers',
    title: '全栈视野',
    desc: '我们不设边界。从后端微服务架构、前沿前端框架、到如今大火的 AI 训练和推理知识。',
  },
]
</script>

<template>
  <main
    class="min-h-screen bg-white text-[#2c3e50] dark:bg-[#1e1e20] dark:text-[#c9d1d9] font-sans selection:bg-[#3b82f6]/30">
    <!-- Hero Section: Theme Hope Style -->
    <header class="relative px-6 pt-24 pb-16 lg:pt-36 lg:pb-24 overflow-hidden">
      <!-- 极浅淡的径向渐变背景 -->
      <div
        class="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] max-w-[1200px] max-h-[1200px] bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.06)_0%,rgba(255,255,255,0)_70%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.1)_0%,rgba(30,30,32,0)_70%)] z-0">
      </div>

      <div class="relative z-10 flex flex-col items-center justify-center text-center">
        <!-- Main Logo / Image -->
        <div
          class="mb-8 overflow-hidden rounded-3xl bg-white shadow-xl shadow-[#3b82f6]/10 dark:bg-black/20 dark:shadow-none p-4 w-32 h-32 flex items-center justify-center border border-gray-100 dark:border-gray-800">
          <Icon name="i-lucide-graduation-cap" class="size-20 text-[#3b82f6]" />
        </div>

        <h1 class="text-4xl md:text-6xl font-bold tracking-tight mb-4 text-[#2c3e50] dark:text-white">
          CoderMast
        </h1>
        <p class="text-xl md:text-2xl text-[#6a8bad] dark:text-[#8b9eb0] mb-10 max-w-2xl font-medium">
          一个拥有完整知识体系的现代程序员学习指南 ✨
        </p>

        <!-- CTA Actions -->
        <div class="flex flex-wrap justify-center gap-4">
          <NuxtLink to="/ai/getting-started"
            class="inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-white transition-all duration-300 ease-in-out bg-[#3b82f6] rounded-full hover:bg-[#2563eb] hover:-translate-y-0.5">
            开始探索
            <Icon name="i-lucide-arrow-right" class="ml-2 size-5" />
          </NuxtLink>
          <a href="https://github.com/amigoer/codermast" target="_blank"
            class="inline-flex items-center justify-center px-8 py-3 text-lg font-medium transition-all duration-300 ease-in-out rounded-full bg-[#f8f8f8] text-[#4e6e8e] hover:bg-[#e6e6e6] dark:bg-[#2b2b2f] dark:text-[#a0a5ad] dark:hover:bg-[#35353a] hover:-translate-y-0.5">
            项目介绍
          </a>
        </div>
      </div>
    </header>

    <!-- Content Wrap -->
    <div class="mx-auto max-w-[1152px] px-6 sm:px-8 pb-24">

      <!-- Primary Features -->
      <div
        class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 pt-10 border-t border-[#eaecef] dark:border-[#3e4c5a]/40">
        <div v-for="feature in features" :key="feature.title" class="flex flex-col text-center md:text-left">
          <h2
            class="text-xl font-semibold mb-3 text-[#2c3e50] dark:text-[#e2e2e3] flex items-center justify-center md:justify-start gap-2">
            <Icon :name="feature.icon" class="size-6 text-[#3b82f6]" />
            {{ feature.title }}
          </h2>
          <p class="text-[15px] leading-relaxed text-[#6a8bad] dark:text-[#8b9eb0] m-0">
            {{ feature.desc }}
          </p>
        </div>
      </div>

      <!-- Secondary Block: Tabs grid -->
      <div class="mt-20 pt-16 border-t border-[#eaecef] dark:border-[#3e4c5a]/40">
        <h2 class="text-2xl font-bold text-center mb-10 text-[#2c3e50] dark:text-[#e2e2e3]">详细专栏指南</h2>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <NuxtLink v-for="(tab, index) in tabs" :key="tab.prefix" :to="firstPath(tab)"
            class="group block bg-[#f8f9fa] dark:bg-[#202023] rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-none hover:shadow-[#3b82f6]/10 dark:hover:bg-[#29292c]">
            <div class="flex items-center gap-4 mb-4">
              <div
                class="flex items-center justify-center w-12 h-12 rounded-lg bg-white dark:bg-[#1e1e20] text-[#3b82f6] shadow-sm">
                <Icon :name="tab.icon || 'i-lucide-folder'" class="size-6 transition-transform group-hover:scale-110" />
              </div>
              <h3 class="text-lg font-semibold m-0 text-[#2c3e50] dark:text-[#e2e2e3]">
                {{ tab.name }}
              </h3>
            </div>
            <p class="text-[14px] text-[#6a8bad] dark:text-[#8b9eb0] leading-normal m-0 line-clamp-3">
              {{ tabDescriptions[tab.prefix] ?? '深入探索该领域的核心知识与实战技巧。' }}
            </p>
          </NuxtLink>
        </div>
      </div>

    </div>

    <!-- Footer -->
    <footer
      class="border-t border-[#eaecef] dark:border-[#3e4c5a]/40 py-8 text-center text-[#6a8bad] dark:text-[#8b9eb0] text-sm">
      <div class="flex items-center justify-center mb-4 text-[#2c3e50] dark:text-[#e2e2e3]">
        <img src="/logo-text.svg" alt="CoderMast" class="h-6 dark:hidden" />
        <img src="/logo-text-dark.svg" alt="CoderMast" class="hidden h-6 dark:block" />
      </div>
      <div>
        MIT Licensed | Copyright &copy; {{ new Date().getFullYear() }} CoderMast
      </div>
    </footer>
  </main>
</template>
