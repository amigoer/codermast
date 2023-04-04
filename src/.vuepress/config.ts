import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",
  lang: "zh-CN",

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
});
