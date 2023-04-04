import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
});
