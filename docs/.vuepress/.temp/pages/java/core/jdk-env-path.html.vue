<template><div><h1 id="java核心-环境认识及搭建" tabindex="-1"><a class="header-anchor" href="#java核心-环境认识及搭建" aria-hidden="true">#</a> Java核心 - 环境认识及搭建</h1>
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
<h2 id="jdk、jre、jvm" tabindex="-1"><a class="header-anchor" href="#jdk、jre、jvm" aria-hidden="true">#</a> JDK、JRE、JVM</h2>
<h3 id="jdk" tabindex="-1"><a class="header-anchor" href="#jdk" aria-hidden="true">#</a> JDK</h3>
<p>  JDK全称（<code v-pre>Java Development Kit</code>），根据其意思我们可以看出来其是Java开发时环境和所包含的配套元件，是整个JAVA的核心，包括了Java运行环境（<code v-pre>Java Runtime Envirnment</code>），一堆Java工具（javac/java/jdb等）和Java基础的类库。</p>
<p>  这里要提一下javac，这个工具，其本质就是一个编译器，用来将程序员写好的Java代码编译成Class文件，这时候才能使用java命令进行运行，运行时是运行的编译好的Class文件，而不是我们写好的java文件。</p>
<p>  JDK包含了JRE和JVM，程序员在开发时候需要进行运行调试，这个时候就需要用到JRE和JVM进行程序的运行调试。</p>
<h3 id="jre" tabindex="-1"><a class="header-anchor" href="#jre" aria-hidden="true">#</a> JRE</h3>
<p>  JRE全称（<code v-pre>Java Runtime Environment</code>），很显然我们看到全称，就很容易的理解，它是Java运行时环境，包含了运行Java程序的所有配置工具，其中包括JVM。</p>
<p>  用户在使用时，并不需要将我们写的Java文件进行编译，用户拿到的只是的打包好的jar包或者war包，本质上是Class文件，就不需要类似于javac编译器这种工具，只需要运行时的一些类库，和JVM即可。</p>
<h3 id="jvm" tabindex="-1"><a class="header-anchor" href="#jvm" aria-hidden="true">#</a> JVM</h3>
<p>  JVM全称（<code v-pre>Java Virtual Machine</code>），即为Java虚拟机，是Java将编译好的Class文件进行解释，解释成操作系统能够识别的字节码，然后进行执行。</p>
<p>  Java的一个特性就是一次编译，到处运行，就是基于JVM的，JVM就相当于一本字典，无论版本如何，字典内输出的内容都是相同的，无论在那种环境下，通过JVM解释的含义都是相同的，这就实现了一次编译，到处运行。</p>
<h2 id="什么关系" tabindex="-1"><a class="header-anchor" href="#什么关系" aria-hidden="true">#</a> 什么关系？</h2>
<figure><img src="@source/../assets/jdk-jre-jvm/2024-03-15-16-15-32.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>  JDK中包含了JRE和JVM，JRE中包含了JVM。三者的关系并不难懂，实质上根据需求来分析很容易。</p>
<p>  JDK是程序员编写时需要用到的，需要进行程序的调试，所以这里就必须包括编译运行的相关工具，还需要编写程序相关的工具。</p>
<p>  JRE是运行时环境，通常是用户进行使用，用户进行只是使用，并不会重新编写程序，更不会去调试，所以只需要进行运行就可以了，不需要相关的编译工具，需要相关的类库工具和JVM即可。</p>
<p>  JVM是把Class文件进行解释的工具，是虚拟化出来的一个独立的机器，在程序运行时需要使用。</p>
</div></template>


