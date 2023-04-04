import { defineUserConfig } from "vuepress";
import { searchProPlugin } from "vuepress-plugin-search-pro"
import theme from "./theme.js";
import { git, hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  base: "/",
  lang: "zh-CN",
  theme,

});

  // Enable it with pwa
  // shouldPrefetch: false,
