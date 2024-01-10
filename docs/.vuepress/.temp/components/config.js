import { defineClientConfig } from "@vuepress/client";
import { hasGlobalComponent } from "/Users/codermast/DevProjects/CoderMast/node_modules/vuepress-shared/lib/client/index.js";
import { h } from "vue";

import { useScriptTag } from "/Users/codermast/DevProjects/CoderMast/node_modules/@vueuse/core/index.mjs";
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
    useScriptTag(`//code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js`);
  },
  rootComponents: [
    () => h(BackToTop, {}),
  ],
});
