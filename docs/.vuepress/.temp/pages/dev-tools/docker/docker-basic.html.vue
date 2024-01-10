<template><div><h1 id="docker-入门基础" tabindex="-1"><a class="header-anchor" href="#docker-入门基础" aria-hidden="true">#</a> Docker - 入门基础</h1>
<h2 id="docker架构" tabindex="-1"><a class="header-anchor" href="#docker架构" aria-hidden="true">#</a> Docker架构</h2>
<p>Docker 使用的是客户端-服务端（C/S）架构模式，使用远程 API 来管理和创建 Docker 容器。</p>
<ul>
<li>Docker客户端：可以是基于命令行的 Docker 客户端，也可以是基于图形化界面的 Docker 应用。</li>
<li>Docker服务端：一个运行 Docker 服务的机器，可以是本地主机，也可以是远程的服务器。</li>
</ul>
<blockquote>
<p>Docker 的架构和 Redis 的几乎相同。</p>
</blockquote>
<h2 id="docker镜像加速" tabindex="-1"><a class="header-anchor" href="#docker镜像加速" aria-hidden="true">#</a> Docker镜像加速</h2>
<p>Docker 安装好之后，在使用时我们需要拉取 Docker 镜像，这些 Docker 镜像存储在国外的 DockerHub 中，在国内访问不稳定，故此 Docker 官方和国内许多服务商提供了国内的加速器服务。</p>
<ul>
<li>Docker官方：<a href="https://registry.docker-cn.com" target="_blank" rel="noopener noreferrer">https://registry.docker-cn.com<ExternalLinkIcon/></a></li>
<li>阿里云：<a href="https://help.aliyun.com/document_detail/60750.html" target="_blank" rel="noopener noreferrer">https://help.aliyun.com/document_detail/60750.html<ExternalLinkIcon/></a></li>
<li>网易：<a href="http://hub-mirror.c.163.com" target="_blank" rel="noopener noreferrer">http://hub-mirror.c.163.com<ExternalLinkIcon/></a></li>
<li>USTC：<a href="https://docker.mirrors.ustc.edu.cn" target="_blank" rel="noopener noreferrer">https://docker.mirrors.ustc.edu.cn<ExternalLinkIcon/></a></li>
<li>七牛云：<a href="https://reg-mirror.qiniu.com" target="_blank" rel="noopener noreferrer">https://reg-mirror.qiniu.com<ExternalLinkIcon/></a></li>
</ul>
<p>这里以 Docker 官方提供的国内加速服务为样例，进行配置教程，其他服务商的配置同理。</p>
<ul>
<li><strong>命令行配置</strong></li>
</ul>
<p>对于使用 systemd 的系统，请在 <code v-pre>/etc/docker/daemon.json</code> 中写入如下内容（如果文件不存在请新建该文件）</p>
<p>之后重新启动服务</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> systemctl daemon-reload
<span class="token function">sudo</span> systemctl restart <span class="token function">docker</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><strong>可视化界面配置</strong></li>
</ul>
<p>在设置中的 Docker Engine 内，插入如下配置即可。</p>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code><span class="token property">"registry-mirrors"</span><span class="token operator">:</span><span class="token punctuation">[</span>
        <span class="token string">"https://registry.docker-cn.com"</span>
<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="@source/../assets/docker-basic/2024-01-10-22-27-03.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>插入，保存后，需要重启才能够生效。</p>
<ul>
<li><strong>检查镜像是否生效</strong></li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">docker</span> info 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="@source/../assets/docker-basic/2024-01-10-22-35-21.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>Registry Mirrors:
    https://registry.docker-cn.com/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>只要出现如上的镜像链接，就是已经配置成功了。</p>
<h2 id="样例剖析" tabindex="-1"><a class="header-anchor" href="#样例剖析" aria-hidden="true">#</a> 样例剖析</h2>
<div class="hint-container tip">
<p class="hint-container-title">提示</p>
<p>对上一节中的 centos 实例进行分析</p>
</div>
<p>Docker 允许在容器内运行应用程序，使用 <code v-pre>docker run</code> 命令来在容器内运行一个应用程序。这里同样是个<code v-pre>Hello World</code>，不同在于它是在容器内部运行的。</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">docker</span> run centos:latest /bin/echo <span class="token string">"Hello World"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们看下各个参数的含义：</p>
<ul>
<li><code v-pre>docker</code>： Docker 的二进制执行文件。</li>
<li><code v-pre>run</code>： 与前面的 docker 组合来运行一个容器。</li>
<li><code v-pre>centos:latest</code>：指定要运行的镜像，Docker 首先从本地主机上查找镜像是否存在，如果不存在，Docker 就会从镜像仓库 Docker Hub 下载公共镜像。</li>
<li><code v-pre>/bin/echo &quot;Hello world&quot;</code>： 在启动的容器里执行的命令以上命令。</li>
</ul>
<p>完整的意思可以解释为：<code v-pre>Docker</code> 以 <code v-pre>centos</code> 最新的（默认是latest) 镜像创建一个新容器，然后在容器里执行 <code v-pre>bin/echo &quot;Hello world&quot;</code>，然后输出结果。</p>
</div></template>


