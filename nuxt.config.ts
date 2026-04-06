import remarkCodeTitle from './remark-code-title'

export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxt/ui',
    '@nuxt/icon',
  ],

  css: ['~/assets/css/main.css'],

  ui: {
    colors: {
      primary: 'blue',
      secondary: 'blue',
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
