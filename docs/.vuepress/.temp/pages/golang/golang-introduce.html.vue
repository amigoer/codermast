<template><div><h1 id="golang简介" tabindex="-1"><a class="header-anchor" href="#golang简介" aria-hidden="true">#</a> Golang简介</h1>
<h2 id="_1-什么是golang" tabindex="-1"><a class="header-anchor" href="#_1-什么是golang" aria-hidden="true">#</a> 1. 什么是Golang</h2>
<p><img src="@source/../assets/golang-introduce/2023-05-12-22-03-58.png" alt="Golang-logo" loading="lazy">
Go 是一个开源的编程语言，它能让构造简单、可靠且高效的软件变得容易。</p>
<p>Go是从2007年末由Robert Griesemer, Rob Pike, Ken Thompson主持开发，后来还加入了Ian Lance Taylor, Russ Cox等人，并最终于2009年11月开源，在2012年早些时候发布了Go 1稳定版本。现在Go的开发已经是完全开放的，并且拥有一个活跃的社区。</p>
<h2 id="_2-golang的特性" tabindex="-1"><a class="header-anchor" href="#_2-golang的特性" aria-hidden="true">#</a> 2. Golang的特性</h2>
<ol>
<li>高性能，高并发</li>
<li>语法简单，学习曲线平滑</li>
<li>丰富的标准库</li>
<li>完善的工具链</li>
<li>静态链接</li>
<li>快速编译</li>
<li>跨平台</li>
<li>垃圾回收</li>
</ol>
<h2 id="_3-开发环境" tabindex="-1"><a class="header-anchor" href="#_3-开发环境" aria-hidden="true">#</a> 3. 开发环境</h2>
<h3 id="安装golang" tabindex="-1"><a class="header-anchor" href="#安装golang" aria-hidden="true">#</a> 安装Golang</h3>
<ul>
<li><a href="https://go.dev/" target="_blank" rel="noopener noreferrer">https://go.dev/<ExternalLinkIcon/></a></li>
<li><a href="https://studygolang.com/dl" target="_blank" rel="noopener noreferrer">https://studygolang.com/dl<ExternalLinkIcon/></a></li>
<li><a href="https://goproxy.cn" target="_blank" rel="noopener noreferrer">https://goproxy.cn<ExternalLinkIcon/></a></li>
</ul>
<h3 id="配置集成开发环境" tabindex="-1"><a class="header-anchor" href="#配置集成开发环境" aria-hidden="true">#</a> 配置集成开发环境</h3>
<ul>
<li>安装Goland集成开发环境：<a href="https://www.jetbrains.com/zh-cn/go/" target="_blank" rel="noopener noreferrer">https://www.jetbrains.com/zh-cn/go/<ExternalLinkIcon/></a></li>
<li>使用VSCode配合Golang插件使用：<a href="https://code.visualstudio.com/" target="_blank" rel="noopener noreferrer">https://code.visualstudio.com/<ExternalLinkIcon/></a></li>
<li>云开发环境：<a href="https://gitpod.io/#github.com/wangkechun/go-by-example" target="_blank" rel="noopener noreferrer">https://gitpod.io/#github.com/wangkechun/go-by-example<ExternalLinkIcon/></a></li>
</ul>
<h2 id="_4-hello-golang" tabindex="-1"><a class="header-anchor" href="#_4-hello-golang" aria-hidden="true">#</a> 4.Hello Golang！</h2>
<p>编写一个最简单的Golang程序hello.go，Golang文件的扩展名为go</p>
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">"fmt"</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Hello, Golang!"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>要执行这段代码可以使用<code v-pre>go run hello.go</code>即可，还可以编译成可执行的二进制文件，使用<code v-pre>go build hello,go</code>即可。</p>
</div></template>


