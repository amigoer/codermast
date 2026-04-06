import { fileURLToPath } from 'node:url'
import remarkCodeTitle from './remark-code-title'

const remarkCodeTitlePath = fileURLToPath(new URL('./remark-code-title.ts', import.meta.url))

export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxt/ui',
    '@nuxt/icon',
  ],

  css: ['~/assets/css/main.css'],

  alias: {
    'remark-code-title': remarkCodeTitlePath,
  },

  nitro: {
    alias: {
      'remark-code-title': remarkCodeTitlePath,
    },
    prerender: {
      crawlLinks: true,
      routes: ['/'],
      failOnError: false,
    },
  },

  vite: {
    resolve: {
      alias: {
        'remark-code-title': remarkCodeTitlePath,
      },
    },
  },

  colorMode: {
    preference: 'light',
  },

  content: {
    build: {
      markdown: {
        remarkPlugins: {
          'remark-code-title': {
            instance: remarkCodeTitle,
          },
        },
        highlight: {
          theme: {
            light: 'github-light',
            default: 'github-light',
            dark: 'github-dark',
          },
          langs: [
            'go', 'java', 'python', 'javascript', 'typescript', 'vue', 'html',
            'css', 'json', 'yaml', 'bash', 'shell', 'sql', 'xml', 'markdown',
            'dockerfile', 'nginx', 'ini', 'properties', 'diff', 'c', 'cpp',
          ],
        },
      },
    },
  },

  app: {
    head: {
      title: 'CoderMast',
      htmlAttrs: { lang: 'zh-CN' },
      link: [{ rel: 'icon', href: '/favicon.ico' }],
    },
  },

  compatibilityDate: '2025-01-01',
})
