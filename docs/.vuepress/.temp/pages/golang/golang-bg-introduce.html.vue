<template><div><h1 id="golang基础" tabindex="-1"><a class="header-anchor" href="#golang基础" aria-hidden="true">#</a> Golang基础</h1>
<h2 id="_1-什么是golang" tabindex="-1"><a class="header-anchor" href="#_1-什么是golang" aria-hidden="true">#</a> 1. 什么是Golang</h2>
<p>Golang（又称Go语言）是Google开发的一种静态强类型、编译型、并发型，并具有垃圾回收功能的编程语言。罗伯特·格瑞史莫（英语：Robert Griesemer）、罗勃·派克及肯·汤普逊于2007年9月开始设计Go，稍后伊恩·兰斯·泰勒（Ian Lance Taylor）、拉斯·考克斯（Russ Cox）加入项目。Go是基于Inferno操作系统所开发的。Go于2009年11月正式宣布推出，成为开放源代码项目，支持Linux、macOS、Windows等操作系统。</p>
<p>Go的语法接近C语言，但对于变量的声明（英语：type declaration）有所不同。Go支持垃圾回收功能。Go的并行计算模型是以东尼·霍尔的通信顺序进程（CSP）为基础，采取类似模型的其他语言包括Occam和Limbo，Go也具有这个模型的特征，比如通道传输。通过goroutine和通道等并行构造可以建造线程池和管道等[8]。在1.8版本中开放插件（Plugin）的支持，这意味着现在能从Go中动态加载部分函数。</p>
<p>与C++相比，Go并不包括如枚举、异常处理、继承、泛型、断言、虚函数等功能，但增加了 切片(Slice) 型、并发、管道、垃圾回收功能、接口等特性的语言级支持。Go 2.0版本将支持泛型，对于断言的存在，则持负面态度，同时也为自己不提供类型继承来辩护。</p>
<p>不同于Java，Go原生提供了关联数组（也称为哈希表（Hashes）或字典（Dictionaries））。</p>
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
</div></template>


