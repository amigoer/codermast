<template><div><h1 id="java-java-开发环境配置" tabindex="-1"><a class="header-anchor" href="#java-java-开发环境配置" aria-hidden="true">#</a> Java - Java 开发环境配置</h1>
<h2 id="下载-jdk" tabindex="-1"><a class="header-anchor" href="#下载-jdk" aria-hidden="true">#</a> 下载 JDK</h2>
<ol>
<li>官网下载：<a href="https://www.oracle.com/cn/java/technologies/downloads/" target="_blank" rel="noopener noreferrer">https://www.oracle.com/cn/java/technologies/downloads/<ExternalLinkIcon/></a></li>
</ol>
<figure><img src="@source/../assets/JDK/2024-03-15-15-31-06.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>选择适配自己电脑的版本，点击下载即可。</p>
<ol start="2">
<li>使用 IDEA 中的集成配置</li>
</ol>
<p>选择一个项目并打开，打开项目结构设置，选择 JDK 下载即可。</p>
<figure><img src="@source/../assets/JDK/2024-03-15-15-35-46.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h2 id="配置环境变量" tabindex="-1"><a class="header-anchor" href="#配置环境变量" aria-hidden="true">#</a> 配置环境变量</h2>
<h3 id="windows" tabindex="-1"><a class="header-anchor" href="#windows" aria-hidden="true">#</a> Windows</h3>
<div class="hint-container tip">
<p class="hint-container-title">提示</p>
<p>博主使用的是 Macos 故无法演示 Windows 下的环境变量配置，请参考本篇文章：<a href="https://blog.csdn.net/qq_38436214/article/details/105071088" target="_blank" rel="noopener noreferrer">https://blog.csdn.net/qq_38436214/article/details/105071088<ExternalLinkIcon/></a></p>
</div>
<h3 id="macos" tabindex="-1"><a class="header-anchor" href="#macos" aria-hidden="true">#</a> Macos</h3>
<div class="hint-container tip">
<p class="hint-container-title">提示</p>
<p>参考本篇文章：<a href="https://blog.csdn.net/m0_51520179/article/details/131295356" target="_blank" rel="noopener noreferrer">https://blog.csdn.net/m0_51520179/article/details/131295356<ExternalLinkIcon/></a></p>
</div>
<h2 id="环境检测" tabindex="-1"><a class="header-anchor" href="#环境检测" aria-hidden="true">#</a> 环境检测</h2>
<p>在系统命令行中，任意位置处执行如下指令，均能获取到 Java 版本信息，说明配置成功。</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">java</span> <span class="token parameter variable">-version</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="@source/../assets/JDK/2024-03-15-15-43-26.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
</div></template>


