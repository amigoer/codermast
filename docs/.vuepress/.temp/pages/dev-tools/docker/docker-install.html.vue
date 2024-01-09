<template><div><h1 id="docker-安装" tabindex="-1"><a class="header-anchor" href="#docker-安装" aria-hidden="true">#</a> Docker - 安装</h1>
<h2 id="macos安装" tabindex="-1"><a class="header-anchor" href="#macos安装" aria-hidden="true">#</a> MacOS安装</h2>
<p><strong>1.使用 Homebrew 安装</strong></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>brew <span class="token function">install</span> <span class="token function">docker</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="@source/../assets/docker-install/2024-01-09-11-02-32.png" alt="安装成功" tabindex="0" loading="lazy"><figcaption>安装成功</figcaption></figure>
<p>如果你的电脑没有安装Docker，则会自动进行安装。</p>
<figure><img src="@source/../assets/docker-install/2024-01-09-11-00-51.png" alt="已经安装" tabindex="0" loading="lazy"><figcaption>已经安装</figcaption></figure>
<p>如果你的电脑已经安装了Docker，就显示已经安装。</p>
<div class="hint-container tip">
<p class="hint-container-title">提示</p>
<p>由于涉及到应用的安装，系统会进行拦截，在这期间可能会需要输入电脑的密码，输入即可。</p>
</div>
<p><strong>2.手动下载安装</strong></p>
<p>手动下载的是 Docker 的桌面管理程序，安装打开后会自动检测系统当前的 Docker 环境。</p>
<p>下载地址：<a href="https://docs.docker.com/desktop/install/mac-install/" target="_blank" rel="noopener noreferrer">https://docs.docker.com/desktop/install/mac-install/<ExternalLinkIcon/></a></p>
<figure><img src="@source/../assets/docker-install/2024-01-09-10-58-05.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>Docker官方提供了Intel、Apple芯片两种，选择自己电脑的版本下载即可。</p>
<blockquote>
<ul>
<li>M系列芯片，就选择Apple芯片。如：M1、M2、M3系列</li>
<li>Intel 系列芯片，就选择 Intel 芯片。如：i5、i3、i7系列</li>
</ul>
</blockquote>
<p>下载好的文件为 Docker.dmg，双击打开即可。</p>
<figure><img src="@source/../assets/docker-install/2024-01-09-11-05-24.png" alt="下载好的文件" tabindex="0" loading="lazy"><figcaption>下载好的文件</figcaption></figure>
<figure><img src="@source/../assets/docker-install/2024-01-09-11-05-58.png" alt="双击安装" tabindex="0" loading="lazy"><figcaption>双击安装</figcaption></figure>
<p>将 Docker 图标拖动至 Applications 文件夹，或者双击 Docker 图标即可进行安装。</p>
<h2 id="windows安装" tabindex="-1"><a class="header-anchor" href="#windows安装" aria-hidden="true">#</a> Windows安装</h2>
<p>Docker 并不是一个通用的容器工具，它依赖于已存在并运行的 Linux 内核环境。</p>
<p>Docker 实质上是在已经运行的 Linux 下制造了一个隔离的文件环境，因此它执行的效率几乎等同于所部署的 Linux 主机。</p>
<p>因此，Docker 必须部署在 Linux 内核的系统上。如果其他系统想部署 Docker 就必须安装一个虚拟 Linux 环境。</p>
<div class="hint-container note">
<p class="hint-container-title">注</p>
<p>博客园上这篇安装教程写的比较详细，Windows安装遇到问题的朋友可以参考一下。<br>
<a href="https://www.cnblogs.com/Can-daydayup/p/15468591.html" target="_blank" rel="noopener noreferrer">https://www.cnblogs.com/Can-daydayup/p/15468591.html<ExternalLinkIcon/></a></p>
</div>
<p>下面的下载是 Docker 桌面管理程序的下载地址：</p>
<ul>
<li>官网下载：<a href="https://desktop.docker.com/win/main/amd64/Docker%20Desktop%20Installer.exe" target="_blank" rel="noopener noreferrer">https://desktop.docker.com/win/main/amd64/Docker Desktop Installer.exe<ExternalLinkIcon/></a></li>
</ul>
<p>官网下载速度可能会比较慢，这里提供一个国内的下载镜像，速度会比较快。</p>
<ul>
<li>国内镜像：<a href="https://smartidedl.blob.core.chinacloudapi.cn/docker/20210926/Docker-win.exe" target="_blank" rel="noopener noreferrer">https://smartidedl.blob.core.chinacloudapi.cn/docker/20210926/Docker-win.exe<ExternalLinkIcon/></a></li>
</ul>
<div class="hint-container warning">
<p class="hint-container-title">注意</p>
<p>博主目前只有一台 MacOS 的电脑，无法制作更详细的 Windows 平台下的安装教程，后续会更新。</p>
</div>
<h2 id="linux安装" tabindex="-1"><a class="header-anchor" href="#linux安装" aria-hidden="true">#</a> Linux安装</h2>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-fsSL</span> https://test.docker.com <span class="token parameter variable">-o</span> test-docker.sh
<span class="token function">sudo</span> <span class="token function">sh</span> test-docker.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>直接使用 Docker 官方提供的安装脚本安装即可。</p>
</div></template>


