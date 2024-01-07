import { defineClientConfig } from "@vuepress/client";
import { hasGlobalComponent } from "/Users/codermast/DevProjects/CoderMast/node_modules/vuepress-shared/lib/client/index.js";
import { h } from "vue";

import { useScriptTag } from "/Users/codermast/DevProjects/CoderMast/node_modules/@vueuse/core/index.mjs";
import { useStyleTag } from "/Users/codermast/DevProjects/CoderMast/node_modules/@vueuse/core/index.mjs";
import Badge from "/Users/codermast/DevProjects/CoderMast/node_modules/vuepress-plugin-components/lib/client/components/Badge.js";
import FontIcon from "/Users/codermast/DevProjects/CoderMast/node_modules/vuepress-plugin-components/lib/client/components/FontIcon.js";
import BackToTop from "/Users/codermast/DevProjects/CoderMast/node_modules/vuepress-plugin-components/lib/client/components/BackToTop.js";

import "/Users/codermast/DevProjects/CoderMast/node_modules/vuepress-plugin-components/lib/client/styles/sr-only.scss";

export default defineClientConfig({
  enhance: ({ app }) => {
    if(!hasGlobalComponent("Badge")) app.component("Badge", Badge);
    if(!hasGlobalComponent("FontIcon")) app.component("FontIcon", FontIcon);
    
  },
  setup: () => {
    useScriptTag(
  `https://cdn.jsdelivr.net/npm/iconify-icon@1`
);
      useStyleTag(`\
  @import url("https://at.alicdn.com/t/c/font_2410206_5vb9zlyghj.css");
  `);
  },
  rootComponents: [
    () => h(BackToTop, {}),
  ],
});
