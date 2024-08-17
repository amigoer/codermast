import theme from "./theme.js";

import { defineUserConfig } from "vuepress";
import { viteBundler } from '@vuepress/bundler-vite'


export default defineUserConfig({
  base: "/",
  lang: "zh-CN",
  title: "友人的编程指南",
  description: "CoderMast编程指南，深入学习编程的技术指南，早日成为编码大师！。",
  head: [
    ["meta", { name: "keywords", content: "CoderMast,编程指南,Java编程,MySQL,Redis,Spring,MyBatis" }],
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
});