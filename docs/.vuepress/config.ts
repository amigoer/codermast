import theme from "./theme.js";
import { getDirname, path } from "vuepress/utils";
import { defineUserConfig } from "vuepress";
import { viteBundler } from '@vuepress/bundler-vite'

const __dirname = getDirname(import.meta.url);

export default defineUserConfig({
  base: "/",
  lang: "zh-CN",
  title: "CoderMast编程桅杆",
  description: "CoderMast编程桅杆，深入学习编程的知识宝典，早日成为编码大师！。",
  head: [
    ["meta", { name: "keywords", content: "CoderMast,编程桅杆,Java编程,MySQL,Redis,Spring,MyBatis" }],
    ["meta", { name: "baidu-site-verification", content: "codeva-GfqTd2Cs0w" }],
    ["script", {}, `var _hmt = _hmt || [];
    (function() {
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?32371a71caaa9940216104814b1449b6";
      var s = document.getElementsByTagName("script")[0]; 
      s.parentNode.insertBefore(hm, s);
    })();`]
  ],

  theme,

  bundler: viteBundler({
    viteOptions: {},
    vuePluginOptions: {},
  }),

  alias: {
    // 你可以在这里将别名定向到自己的组件
    // 比如这里我们将主题的主页组件改为用户 .vuepress/components 下的 HomePage.vue
    "@theme-hope/components/CommonWrapper": path.resolve(
      __dirname,
      "./components/MyCommonWrapper.vue",
    ),
  },
});