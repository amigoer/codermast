<template><div><h1 id="java-jdk下载与环境配置" tabindex="-1"><a class="header-anchor" href="#java-jdk下载与环境配置" aria-hidden="true">#</a> Java - JDK下载与环境配置</h1>
<h2 id="下载-jdk" tabindex="-1"><a class="header-anchor" href="#下载-jdk" aria-hidden="true">#</a> 下载 JDK</h2>
<p><strong>1. 官网下载</strong></p>
<div class="hint-container tip">
<p class="hint-container-title">Oracle官网</p>
<p><a href="https://www.oracle.com/cn/java/technologies/downloads/" target="_blank" rel="noopener noreferrer">https://www.oracle.com/cn/java/technologies/downloads/<ExternalLinkIcon/></a></p>
</div>
<p>选择适配自己电脑的版本，点击下载即可。</p>
<ol>
<li>访问Oracle官网，找到该位置的Java</li>
</ol>
<figure><img src="@source/../assets/jdk-env-path/2024-03-15-16-12-49.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<ol start="2">
<li>点击此处的下载</li>
</ol>
<figure><img src="@source/../assets/jdk-env-path/2024-03-15-16-12-59.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<ol start="3">
<li>选择对应的版本下载</li>
</ol>
<figure><img src="@source/../assets/jdk-env-path/2024-03-15-16-13-07.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h2 id="安装jdk" tabindex="-1"><a class="header-anchor" href="#安装jdk" aria-hidden="true">#</a> 安装JDK</h2>
<ol>
<li>打开下载好的安装包，点击下一步</li>
</ol>
<figure><img src="@source/../assets/jdk-env-path/2024-03-15-16-13-15.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<ol start="2">
<li>选择指定目录，点击下一步</li>
</ol>
<figure><img src="@source/../assets/jdk-env-path/2024-03-15-16-13-23.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<ol start="3">
<li>等待安装完成。</li>
</ol>
<figure><img src="@source/../assets/jdk-env-path/2024-03-15-16-13-29.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<blockquote>
<p>注意：java这个时候我们只是安装好了JDK，但是并没有设置其环境变量，所以我们是没有办法使用命令行运行javac程序的。必须配置环境变量才能使用。</p>
</blockquote>
<ol start="2">
<li>使用 IDEA 中的集成配置</li>
</ol>
<p>选择一个项目并打开，打开项目结构设置，选择 JDK 下载即可。</p>
<figure><img src="@source/../assets/JDK/2024-03-15-15-35-46.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h2 id="配置环境变量" tabindex="-1"><a class="header-anchor" href="#配置环境变量" aria-hidden="true">#</a> 配置环境变量</h2>
<h3 id="windows" tabindex="-1"><a class="header-anchor" href="#windows" aria-hidden="true">#</a> Windows</h3>
<ol>
<li>在电脑搜索栏搜索<strong>编辑环境变量</strong></li>
</ol>
<figure><img src="@source/../assets/jdk-env-path/2024-03-15-16-13-39.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<ol start="2">
<li>选择环境变量</li>
</ol>
<figure><img src="@source/../assets/jdk-env-path/2024-03-15-16-13-44.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<ol start="3">
<li>选择系统变量中的PATH这一行，点击编辑</li>
</ol>
<figure><img src="@source/../assets/jdk-env-path/2024-03-15-16-13-50.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<ol start="4">
<li>点击新建</li>
</ol>
<figure><img src="@source/../assets/jdk-env-path/2024-03-15-16-13-55.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<ol start="5">
<li>输入刚才JDK的安装路径，直到bin目录为止</li>
</ol>
<figure><img src="@source/../assets/jdk-env-path/2024-03-15-16-14-01.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<ol start="6">
<li>点击确定，这个时候就已经配置成功了。</li>
</ol>
<h3 id="macos" tabindex="-1"><a class="header-anchor" href="#macos" aria-hidden="true">#</a> Macos</h3>
<div class="hint-container tip">
<p class="hint-container-title">提示</p>
<p>参考本篇文章：<a href="https://blog.csdn.net/m0_51520179/article/details/131295356" target="_blank" rel="noopener noreferrer">https://blog.csdn.net/m0_51520179/article/details/131295356<ExternalLinkIcon/></a></p>
</div>
<h2 id="环境检测" tabindex="-1"><a class="header-anchor" href="#环境检测" aria-hidden="true">#</a> 环境检测</h2>
<p>在系统命令行中，任意位置处执行如下指令，均能获取到 Java 版本信息，说明配置成功。</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">java</span> <span class="token parameter variable">-version</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="@source/../assets/JDK/2024-03-15-15-43-26.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<div class="hint-container warning">
<p class="hint-container-title">注意</p>
<p>在确保自己都是正确操作的情况下，仍无法正确执行，此时重启一下电脑，使配置项生效即可。</p>
</div>
</div></template>


