<script setup lang="ts">
import CommonWrapper from "vuepress-theme-hope/components/CommonWrapper.js";
import NormalPage from "vuepress-theme-hope/components/NormalPage.js";
import SkipLink from "vuepress-theme-hope/components/SkipLink.js";
import { FadeSlideY } from "vuepress-theme-hope/components/transitions/FadeSlideY.js";


/* 获取完整URL */
var url = window.location.href;
var imageUrl = "https://api.pwmqr.com/qrcode/create/?url=" + url

</script>

<template>
    <SkipLink />

    <CommonWrapper>
        <FadeSlideY>
            <NormalPage>
                <!-- toc 之前放公众号的 logo -->
                <!-- <template #tocBefore>
                    <div><img src="../../../assets/images/gzh-white.png" height="100px" />
                    </div>
                </template> -->

            </NormalPage>
        </FadeSlideY>


        <template #sidebarTop>
            <div><img src="../../../assets/images/gzh-white.png" height="100px" /></div>
        </template>
    </CommonWrapper>
</template>

<style lang="scss" scoped></style>