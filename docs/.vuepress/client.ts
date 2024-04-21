import { defineClientConfig } from "vuepress/client";
import MyCommonWrapper from "./components/MyCommonWrapper.vue";

export default defineClientConfig({
    // 你可以在这里添加或覆盖布局
    layouts: {
        MyCommonWrapper,
    },
});
