import { hopeTheme } from "vuepress-theme-hope";
import { zhNavbar } from "./navbar/index.js";
import { zhSidebar } from "./sidebar/index.js";

export default hopeTheme({
  breadcrumb: false,
  headerDepth: 2,
  // ico图标
  favicon: "/favicon.ico",
  // 顶部导航栏
  navbar: zhNavbar,
  // 侧边栏
  sidebar: zhSidebar,
  // 页脚
  footer: '<a href="https://beian.miit.gov.cn/" rel="nofollow">陕ICP备20010345号-5</a>',

  // 全局显示页脚
  displayFooter: true,
  metaLocales: {
    editLink: "编辑此页",
  },

  // 发布站点链接
  hostname: "https://www.codermast.com",

  // 作者信息
  author: {
    name: "友人",
    url: "https://www.codermast.com",
    email: "codermast@163.com",
  },

  iconAssets: "//code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js",

  logo: "/logo.svg",

  // 文档仓库地址
  repo: "https://github.com/codermast/codermast-notes",

  // 文档在仓库中的目录
  docsDir: "docs",

  // 文档存放的分值
  docsBranch: "main",

  // encrypt: {
  //   config: {
  //     "/demo/encrypt.html": ["1234"],
  //   },
  // },

  plugins: {
    // 配置评论框
    comment: {
      provider: "Giscus",
      repo: "codermast/codermast-notes",
      repoId: "R_kgDOIetRIw",
      category: "Announcements",
      categoryId: "DIC_kwDOIetRI84CVg1f",
    },

    // markdown增强
    mdEnhance: {
      // 启动自定义对齐
      align: true,
      attrs: true,
      chart: true,
      codetabs: true,
      demo: true,
      echarts: true,
      figure: true,
      flowchart: true,
      gfm: true,
      imgLazyload: true,
      imgSize: true,
      include: true,
      katex: true,
      mark: true,
      mermaid: true,
      playground: {
        presets: ["ts", "vue"],
      },
      presentation: ["highlight", "math", "search", "notes", "zoom"],
      stylize: [
        {
          matcher: "Recommended",
          replacer: ({ tag }) => {
            if (tag === "em")
              return {
                tag: "Badge",
                attrs: { type: "tip" },
                content: "Recommended",
              };
          },
        },
      ],
      sub: true,
      sup: true,
      tabs: true,
      vPre: true,
      vuePlayground: true,
    },
  },
});
