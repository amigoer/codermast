<template><div><h1 id="redis实战-项目介绍" tabindex="-1"><a class="header-anchor" href="#redis实战-项目介绍" aria-hidden="true">#</a> Redis实战 - 项目介绍</h1>
<h2 id="项目介绍" tabindex="-1"><a class="header-anchor" href="#项目介绍" aria-hidden="true">#</a> 项目介绍</h2>
<p>本项目是黑马程序员发布的黑马点评网项目，项目基于Spring Boot + Redis + MySQL 技术栈开发。</p>
<p>功能模块：</p>
<ol>
<li>短信登录</li>
<li>商户查询缓存</li>
<li>达人探店</li>
<li>优惠券秒杀</li>
<li>好友关注</li>
<li>附近的商户</li>
<li>用户签到</li>
<li>UV 统计</li>
</ol>
<h2 id="资料下载" tabindex="-1"><a class="header-anchor" href="#资料下载" aria-hidden="true">#</a> 资料下载</h2>
<div class="hint-container tip">
<p class="hint-container-title">百度网盘</p>
<ul>
<li>地址：<a href="https://pan.baidu.com/s/1SnbpxXcbjnvcz_qndWZbsg?pwd=5y8g" target="_blank" rel="noopener noreferrer">https://pan.baidu.com/s/1SnbpxXcbjnvcz_qndWZbsg?pwd=5y8g<ExternalLinkIcon/></a></li>
<li>提取码: 5y8g</li>
</ul>
</div>
<figure><img src="@source/../../assets/project-introduce/2023-05-20-00-23-04.png" alt="百度网盘" tabindex="0" loading="lazy"><figcaption>百度网盘</figcaption></figure>
<h2 id="项目导入" tabindex="-1"><a class="header-anchor" href="#项目导入" aria-hidden="true">#</a> 项目导入</h2>
<h3 id="windows-os" tabindex="-1"><a class="header-anchor" href="#windows-os" aria-hidden="true">#</a> Windows OS</h3>
<div class="hint-container tip">
<p class="hint-container-title">参考视频</p>
<p>参考官方的教程视频即可：
<a href="https://www.bilibili.com/video/BV1cr4y1671t?p=25" target="_blank" rel="noopener noreferrer">https://www.bilibili.com/video/BV1cr4y1671t?p=25<ExternalLinkIcon/></a></p>
</div>
<h3 id="mac-os" tabindex="-1"><a class="header-anchor" href="#mac-os" aria-hidden="true">#</a> Mac OS</h3>
<ol>
<li>
<p>下载资料</p>
</li>
<li>
<p>导入后端项目至 IDEA 或其他开发工具</p>
</li>
<li>
<p>使用 Brew 安装 Nginx</p>
</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>brew <span class="token function">install</span> nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="4">
<li>配置前台项目</li>
</ol>
<p>将资料中的 nginx-1.18.0.zip 内 html 文件夹中的 hmdp 文件夹复制到我们安装好的 Nginx 中的html 文件夹中。</p>
<ol start="5">
<li>配置 Nginx</li>
</ol>
<p>通过 Brew 安装的 Nginx 配置文件在 <code v-pre>/opt/homebrew/etc/nginx</code> 这个目录下，修改里面的 nginx.conf 文件内容为 <code v-pre>nginx-1.18.0.zip</code> 中的配置项。</p>
</div></template>


