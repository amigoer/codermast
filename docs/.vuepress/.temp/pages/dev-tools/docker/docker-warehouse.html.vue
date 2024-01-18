<template><div><h1 id="docker-仓库管理" tabindex="-1"><a class="header-anchor" href="#docker-仓库管理" aria-hidden="true">#</a> Docker - 仓库管理</h1>
<p>仓库是集中存放资源的地方，代码仓库是存放代码的，那么Docker 中的仓库就是存放 Docker 镜像的。</p>
<p>和 GitHub 类似，Docker Hub 是 Docker 官方维护的一个免费的公共仓库，不但可以下载需要的镜像，而且还可以上传自己的镜像。</p>
<div class="hint-container tip">
<p class="hint-container-title">提示</p>
<p>本文主要以 Docker Hub 为例子进行说明，其他仓库同理。</p>
</div>
<h2 id="登录和退出" tabindex="-1"><a class="header-anchor" href="#登录和退出" aria-hidden="true">#</a> 登录和退出</h2>
<p>在需要使用 Docker Hub 中管理自己的镜像时，需要先进行登录。</p>
<ul>
<li>登录</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">docker</span> login 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>退出登录</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">docker</span> <span class="token builtin class-name">logout</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="推送镜像" tabindex="-1"><a class="header-anchor" href="#推送镜像" aria-hidden="true">#</a> 推送镜像</h2>
<p>用户登录后，可以通过 docker push 命令将自己的镜像推送到 Docker Hub。</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">docker</span> tag ubuntu:20.04 codermast/ubuntu:20.04
<span class="token function">docker</span> push codermast/ubuntu:20.04
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>codermast 改为你的 username 便于管理</p>
</div></template>


