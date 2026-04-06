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
</script>

<template>
  <main class="min-h-screen bg-white text-[#2c3e50] dark:bg-gray-900 dark:text-[#c9d1d9] font-sans selection:bg-[#3b82f6]/30">
    <!-- Hero Section: Side-by-Side Layout -->
    <header class="mx-auto max-w-[1050px] flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16 pt-16 pb-12 md:pt-28 md:pb-20 px-6 sm:px-8 relative">
      <!-- Left Logo Array -->
      <div class="shrink-0">
        <div class="relative overflow-hidden rounded-[2.5rem] bg-white shadow-xl shadow-[#3b82f6]/10 dark:bg-gray-800 dark:shadow-none p-6 md:p-8 flex items-center justify-center border border-gray-100 dark:border-gray-700 w-40 h-40 md:w-56 md:h-56 transition-transform duration-500 hover:scale-[1.02]">
          <Icon name="i-lucide-graduation-cap" class="size-24 md:size-32 text-[#3b82f6]" />
        </div>
      </div>

      <!-- Right Description -->
      <div class="text-center md:text-left flex flex-col justify-center max-w-[500px]">
        <h1 class="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-tight mb-5 text-[#2c3e50] dark:text-white leading-tight">
          CoderMast
        </h1>
        <p class="text-[17px] md:text-[19px] text-[#5c6e82] dark:text-[#8b9eb0] mb-8 leading-[1.6]">
          AI 应用开发 & 后端通用面试指南，覆盖大模型基础、Golang 进阶、Java 核心、项目实战与计算机基础。
        </p>

        <!-- CTA Actions -->
        <div class="flex flex-wrap justify-center md:justify-start gap-4 md:gap-5">
          <NuxtLink to="/ai/getting-started"
            class="inline-flex items-center justify-center px-8 py-3 text-[16px] font-medium text-white transition-all bg-[#3b82f6] rounded-full hover:bg-[#2563eb]">
            开始阅读
          </NuxtLink>
          <a href="https://github.com/amigoer/codermast" target="_blank"
            class="inline-flex items-center justify-center px-8 py-3 text-[16px] font-medium transition-all rounded-full bg-[#f1f3f5] text-[#495057] hover:bg-[#e9ecef] dark:bg-gray-800 dark:text-[#a0a5ad] dark:hover:bg-gray-700">
            GitHub 项目
          </a>
        </div>
      </div>
    </header>

    <!-- Content Wrap -->
    <div class="mx-auto max-w-[950px] px-6 sm:px-8 pb-32">
      <!-- Divider -->
      <div class="h-px w-full bg-gradient-to-r from-transparent via-[#eaecef] dark:via-gray-800 to-transparent mb-12 hidden md:block"></div>

      <!-- Section 1: 🔥 必看 -->
      <div class="mb-14">
        <h2 class="text-2xl font-bold mb-6 text-[#2c3e50] dark:text-white flex items-center">
          <span class="mr-2">🔥</span>必看
        </h2>
        <div class="bg-gray-50/50 dark:bg-gray-800/20 md:bg-transparent md:dark:bg-transparent rounded-2xl md:rounded-none p-5 md:p-0">
          <ul class="space-y-4 text-[#3c4858] dark:text-[#a0a5ad] text-[16px] leading-[1.7] marker:text-[#3b82f6]">
            <li class="pl-1 md:list-disc ml-0 md:ml-5">
              <NuxtLink to="/ai/getting-started" class="text-[#3b82f6] hover:underline hover:text-blue-700 dark:hover:text-blue-400 font-medium transition-colors">AI 应用开发指南</NuxtLink>
              （<span class="text-[#f59e0b] text-[15px]">⭐新增模块</span>）：从零开始系统学习 AI 技术栈，涵盖大模型基础、Prompt 工程、RAG 开发及 Agent 构建。
            </li>
            <li class="pl-1 md:list-disc ml-0 md:ml-5">
              <NuxtLink to="/golang/core/go-install" class="text-[#3b82f6] hover:underline hover:text-blue-700 dark:hover:text-blue-400 font-medium transition-colors">Golang 学习路线</NuxtLink>
              （<span class="text-[#f59e0b] text-[15px]">⭐重点推荐</span>）：Go 语言核心基础总结、并发模型（GMP）、Web 框架应用以及微服务架构实战。
            </li>
            <li class="pl-1 md:list-disc ml-0 md:ml-5">
              <NuxtLink to="/other/java/core/jdk-env-path" class="text-[#3b82f6] hover:underline hover:text-blue-700 dark:hover:text-blue-400 font-medium transition-colors">Java 核心基础指南</NuxtLink>
              ：Java 学习与进阶全系列，包含集合框架、IO 流、JVM 核心原理及 Spring/Spring Boot 底层分析。
            </li>
            <li class="pl-1 md:list-disc ml-0 md:ml-5">
              <span class="font-medium text-gray-800 dark:text-gray-200">面试资料与题库：</span>
              <ul class="mt-2.5 space-y-2.5 text-[15px] border-l-2 border-gray-200 dark:border-gray-800 pl-4 md:border-none md:pl-0">
                <li class="md:list-[circle] md:ml-6"><NuxtLink to="/interview/golang" class="text-[#3b82f6] hover:underline hover:text-blue-700 dark:hover:text-blue-400 transition-colors">《Golang 后端面试指南》 ↗</NuxtLink>：囊括后端面试常考问题与实战解析。</li>
                <li class="md:list-[circle] md:ml-6"><NuxtLink to="/interview/basic" class="text-[#3b82f6] hover:underline hover:text-blue-700 dark:hover:text-blue-400 transition-colors">《计算机基础常见面试题》 ↗</NuxtLink>：操作系统、计算机网络重点与难点。</li>
              </ul>
            </li>
            <li class="pl-1 md:list-disc ml-0 md:ml-5 mt-2">
              <span class="font-medium text-gray-800 dark:text-gray-200">实战项目选集：</span>
              <span class="text-[#f59e0b] text-[15px]">⭐经典项目</span>
              <NuxtLink to="/project/rocket-leaf" class="text-[#3b82f6] hover:underline hover:text-blue-700 dark:hover:text-blue-400 font-medium transition-colors ml-1">Rocket-Leaf 客户端 ↗</NuxtLink> 
              （基于 Wails v3 + Vue3 + RocketMQ 的极客开源项目）。
            </li>
          </ul>
        </div>
      </div>
      
      <!-- Section 2: 🌟 文章推荐 / 专栏分类 -->
      <div class="mb-12">
        <h2 class="text-2xl font-bold mb-6 text-[#2c3e50] dark:text-white flex items-center">
          <span class="mr-2">🌟</span>技术专栏体系
        </h2>
        <div class="bg-gray-50/50 dark:bg-gray-800/20 md:bg-transparent md:dark:bg-transparent rounded-2xl md:rounded-none p-5 md:p-0">
          <ul class="space-y-4 md:space-y-3.5 text-[#3c4858] dark:text-[#a0a5ad] text-[16px] leading-[1.7] marker:text-[#3b82f6]">
            <li class="pl-1 md:list-disc ml-0 md:ml-5 relative">
              <strong class="font-medium text-gray-800 dark:text-gray-200 mr-2 md:inline block mb-1 md:mb-0">编程语言：</strong>
              <NuxtLink to="/golang/core/go-install" class="text-[#3b82f6] hover:underline hover:text-blue-700 dark:hover:text-blue-400 transition-colors">Golang</NuxtLink> ↗、
              <NuxtLink to="/other/java/core/jdk-env-path" class="text-[#3b82f6] hover:underline hover:text-blue-700 dark:hover:text-blue-400 transition-colors">Java & Spring</NuxtLink> ↗、
              <NuxtLink to="/tutorials/front-end/vue3/basic-knowledge" class="text-[#3b82f6] hover:underline hover:text-blue-700 dark:hover:text-blue-400 transition-colors">前端 Vue3</NuxtLink> ↗
            </li>
            <li class="pl-1 md:list-disc ml-0 md:ml-5 relative">
              <strong class="font-medium text-gray-800 dark:text-gray-200 mr-2 md:inline block mb-1 md:mb-0">架构与系统：</strong>
              <NuxtLink to="/tutorials/cloud/linux/linux-file-directory" class="text-[#3b82f6] hover:underline hover:text-blue-700 dark:hover:text-blue-400 transition-colors">Linux 核心技能</NuxtLink> ↗、
              <NuxtLink to="/tutorials/dev-idea/design-patterns/behaiver-patterns/observer-pattern" class="text-[#3b82f6] hover:underline hover:text-blue-700 dark:hover:text-blue-400 transition-colors">后端设计模式</NuxtLink> ↗、
              <NuxtLink to="/tutorials/dev-tools/git/git-introduce-install" class="text-[#3b82f6] hover:underline hover:text-blue-700 dark:hover:text-blue-400 transition-colors">Git 协作规范</NuxtLink> ↗
            </li>
            <li class="pl-1 md:list-disc ml-0 md:ml-5 relative">
              <strong class="font-medium text-gray-800 dark:text-gray-200 mr-2 md:inline block mb-1 md:mb-0">数据库实战：</strong>
              <NuxtLink to="/tutorials/database/mysql/sql-basic" class="text-[#3b82f6] hover:underline hover:text-blue-700 dark:hover:text-blue-400 transition-colors">MySQL 原理与进阶</NuxtLink> ↗、
              <NuxtLink to="/tutorials/database/redis/redis-basic" class="text-[#3b82f6] hover:underline hover:text-blue-700 dark:hover:text-blue-400 transition-colors">Redis 高级应用</NuxtLink> ↗
            </li>
            <li class="pl-1 md:list-disc ml-0 md:ml-5 relative">
              <strong class="font-medium text-gray-800 dark:text-gray-200 mr-2 md:inline block mb-1 md:mb-0">消息与中间件：</strong>
              <NuxtLink to="/tutorials/mq/rocketmq/rocketmq-concepts" class="text-[#3b82f6] hover:underline hover:text-blue-700 dark:hover:text-blue-400 transition-colors">RocketMQ</NuxtLink> ↗、
              <NuxtLink to="/tutorials/mq/kafka/kafka-introduction" class="text-[#3b82f6] hover:underline hover:text-blue-700 dark:hover:text-blue-400 transition-colors">Kafka</NuxtLink> ↗、
              <NuxtLink to="/tutorials/mq/rabbitmq/rabbitmq-introduction" class="text-[#3b82f6] hover:underline hover:text-blue-700 dark:hover:text-blue-400 transition-colors">RabbitMQ</NuxtLink> ↗
            </li>
            <li class="pl-1 md:list-disc ml-0 md:ml-5 relative">
              <strong class="font-medium text-gray-800 dark:text-gray-200 mr-2 md:inline block mb-1 md:mb-0">云原生与部署：</strong>
              <NuxtLink to="/tutorials/cloud/docker/docker-introduce" class="text-[#3b82f6] hover:underline hover:text-blue-700 dark:hover:text-blue-400 transition-colors">Docker 容器化指南</NuxtLink> ↗、
              <NuxtLink to="/tutorials/cloud/kubernetes/k8s-introduction" class="text-[#3b82f6] hover:underline hover:text-blue-700 dark:hover:text-blue-400 transition-colors">Kubernetes 体系</NuxtLink> ↗、
              <NuxtLink to="/tutorials/cloud/nginx/nginx-install" class="text-[#3b82f6] hover:underline hover:text-blue-700 dark:hover:text-blue-400 transition-colors">Nginx 核心配置</NuxtLink> ↗
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer
      class="border-t border-[#eaecef] dark:border-gray-800 py-10 text-center text-[#6a8bad] dark:text-[#8b9eb0] text-[14px]">
      <div class="flex items-center justify-center mb-5 text-[#2c3e50] dark:text-[#e2e2e3]">
        <img src="/logo-text.svg" alt="CoderMast" class="h-6 dark:hidden opacity-80" />
        <img src="/logo-text-dark.svg" alt="CoderMast" class="hidden h-6 dark:block opacity-80" />
      </div>
      <div class="flex justify-center gap-4 text-sm font-medium">
        <span>MIT Licensed</span>
        <span class="text-gray-300 dark:text-gray-700">|</span>
        <span>Copyright &copy; {{ new Date().getFullYear() }} CoderMast</span>
      </div>
    </footer>
  </main>
</template>
