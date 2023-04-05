import { defineClientConfig } from "@vuepress/client";
import { hasGlobalComponent } from "/Users/codermast/VScodeProjects/CoderMast/node_modules/vuepress-plugin-components/lib/client/shared.js";
import { h } from "vue";

import { useStyleTag } from "/Users/codermast/VScodeProjects/CoderMast/node_modules/vuepress-plugin-components/lib/client/vueuse.js";
import Badge from "/Users/codermast/VScodeProjects/CoderMast/node_modules/vuepress-plugin-components/lib/client/components/Badge.js";
import FontIcon from "/Users/codermast/VScodeProjects/CoderMast/node_modules/vuepress-plugin-components/lib/client/components/FontIcon.js";
import BackToTop from "/Users/codermast/VScodeProjects/CoderMast/node_modules/vuepress-plugin-components/lib/client/components/BackToTop.js";

import "/Users/codermast/VScodeProjects/CoderMast/node_modules/vuepress-plugin-components/lib/client/styles/sr-only.scss";

export default defineClientConfig({
  enhance: ({ app }) => {
    if(!hasGlobalComponent("Badge")) app.component("Badge", Badge);
    if(!hasGlobalComponent("FontIcon")) app.component("FontIcon", FontIcon);
    
  },
  setup: () => {
      useStyleTag(`\
  @import url("https://at.alicdn.com/t/c/font_2410206_5vb9zlyghj.css");
  `);
  },
  rootComponents: [
    () => h(BackToTop, { threshold: 300 }),
  ],
});
