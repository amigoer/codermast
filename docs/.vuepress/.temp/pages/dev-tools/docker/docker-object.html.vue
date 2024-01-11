<template><div><h1 id="docker-镜像、容器、仓库" tabindex="-1"><a class="header-anchor" href="#docker-镜像、容器、仓库" aria-hidden="true">#</a> Docker - 镜像、容器、仓库</h1>
<div class="hint-container tip">
<p class="hint-container-title">提示</p>
<p>这个章节涉及到 Docker 最核心的知识，也是在使用过程中最常使用到的，需要重点学习。</p>
</div>
<h2 id="什么是docker镜像、容器、仓库" tabindex="-1"><a class="header-anchor" href="#什么是docker镜像、容器、仓库" aria-hidden="true">#</a> 什么是Docker镜像、容器、仓库？</h2>
<ul>
<li>
<p>Docker镜像：镜像是一个只读的模板，其中包含了创建 Docker 容器的说明，可以用来创建 Docker 容器。镜像可以包含操作系统、应用程序、依赖库、配置文件等。</p>
</li>
<li>
<p>Docker容器：容器是代码的隔离环境。这意味着容器并不直接在操作系统上运行。容器是 Docker 镜像的一个运行实例，可以理解为一个轻量级的虚拟机，用面向对象的思想来看，其就是一个镜像的运行对象。容器包含了运行应用程序所需的所有组件，包括操作系统、应用程序、依赖库等。</p>
</li>
<li>
<p>Docker仓库：仓库是用来存储和管理 Docker 镜像的地方，类似于代码仓库。Docker 官方提供了 Docker Hub 仓库，可以在其中存储和分享 Docker 镜像。用户也可以自建私有仓库来存储和管理自己的 Docker 镜像。</p>
</li>
</ul>
<h2 id="镜像、容器、仓库之间的关系" tabindex="-1"><a class="header-anchor" href="#镜像、容器、仓库之间的关系" aria-hidden="true">#</a> 镜像、容器、仓库之间的关系</h2>
<figure><img src="@source/../assets/docker-object/2024-01-11-12-36-40.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>Docker 镜像可以看做是一个静态模板，Docker 容器是对镜像的一个实例化，一个镜像可以实例化多个容器，这几个容器相互独立，互不影响。</p>
<p>Docker 仓库就是存放 Docker 镜像的地方，严格意义上来说可以分为本地仓库和远程仓库，远程仓库由 Docker 官方维护，包含了几乎所有的 Docker 镜像，Docker 本地仓库只有你拉取的镜像。</p>
<p>在使用 Docker 镜像创建对象之前，需要先拉取 Docker 镜像，这里的拉取通常是指从 Docker 官方仓库拉取。</p>
<p>故使用 Docker 的基本步骤可以清晰的总结为：</p>
<ol>
<li>
<p>从仓库拉取 Docker 镜像</p>
</li>
<li>
<p>使用 Docker 镜像实例化一个 Docker 容器</p>
</li>
<li>
<p>运行 Docker 容器</p>
</li>
</ol>
<h2 id="docker镜像" tabindex="-1"><a class="header-anchor" href="#docker镜像" aria-hidden="true">#</a> Docker镜像</h2>
<p>当运行容器时，使用的 Docker 镜像不在本地仓库中，Docker 就会从默认的 Docker 仓库中下载该镜像。一般是从 Docker 官方提供的 Docker Hub 仓库中下载。</p>
<p>下面来学习关于 Docker 镜像的相关操作。</p>
<h3 id="镜像列表" tabindex="-1"><a class="header-anchor" href="#镜像列表" aria-hidden="true">#</a> 镜像列表</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">docker</span> images
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="@source/../assets/docker-object/2024-01-11-12-46-05.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<ul>
<li>REPOSITORY：表示镜像的仓库源</li>
<li>TAG：镜像的标签, 同一仓库源可以有多个 TAG，代表这个仓库源的不同个版本</li>
<li>IMAGE ID：镜像ID</li>
<li>CREATED：镜像创建时间</li>
<li>SIZE：镜像大小</li>
</ul>
<h3 id="查找镜像" tabindex="-1"><a class="header-anchor" href="#查找镜像" aria-hidden="true">#</a> 查找镜像</h3>
<div class="hint-container warning">
<p class="hint-container-title">注意</p>
<p>本小节以查找 Redis 镜像为例做演示说明，其他镜像的操作同理。</p>
</div>
<ol>
<li><strong>在 Docker Hub查找</strong></li>
</ol>
<p>使用 Docker Hub 中提供的查找功能：<a href="https://hub.docker.com/search?q=redis&amp;type=image" target="_blank" rel="noopener noreferrer">https://hub.docker.com/search?q=redis&amp;type=image<ExternalLinkIcon/></a></p>
<p>这里就已经找到了 Redis 的镜像信息</p>
<figure><img src="@source/../assets/docker-object/2024-01-11-12-50-27.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>可以查看 Redis 镜像的各种版本信息。</p>
<figure><img src="@source/../assets/docker-object/2024-01-11-12-51-01.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<ol start="2">
<li><strong>使用 Docker Search查找</strong></li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">docker</span> search redis
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="@source/../assets/docker-object/2024-01-11-12-53-30.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<ul>
<li>NAME: 镜像仓库源的名称</li>
<li>DESCRIPTION: 镜像的描述</li>
<li>OFFICIAL: 是否 docker 官方发布</li>
<li>STARS: 类似 Github 里面的 star，表示点赞、喜欢的意思。</li>
<li>AUTOMATED: 自动构建。</li>
</ul>
<ol start="3">
<li><strong>使用 Docker Desktop 查找</strong></li>
</ol>
<figure><img src="@source/../assets/docker-object/2024-01-11-12-58-09.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>直接在 Docker Desktop 中搜索即可。</p>
<h3 id="拉取镜像" tabindex="-1"><a class="header-anchor" href="#拉取镜像" aria-hidden="true">#</a> 拉取镜像</h3>
<p>拉取镜像即从 Docker 仓库中拉取 Docker 镜像，本质上就是从远程的仓库中下载镜像到本地。</p>
<blockquote>
<p>这里仍以 Redis 为样例进行编写，其他镜像的拉取同理。</p>
</blockquote>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">docker</span> pull redis
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="@source/../assets/docker-object/2024-01-11-13-05-39.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>这里默认拉取的是 Redis 的最新版本，如果要是想拉取指定版本时可以进行如下执行，如拉取 redis7.0</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">docker</span> pull redis:7.0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="@source/../assets/docker-object/2024-01-11-13-07-55.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h3 id="删除镜像" tabindex="-1"><a class="header-anchor" href="#删除镜像" aria-hidden="true">#</a> 删除镜像</h3>
<p>这里我们演示删除之前下载的那个 Hello-World 镜像</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">docker</span> rmi hello-world
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="@source/../assets/docker-object/2024-01-11-21-37-45.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>这里如果使用了该镜像创建了容器，那么就会报错。</p>
<figure><img src="@source/../assets/docker-object/2024-01-11-21-40-04.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>如果出现这种情况，就说明我们使用了该镜像创建了容器，那么就必须先删除使用该镜像的所有容器，才能够删除该镜像。</p>
<ul>
<li>先查看 Docker 容器</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">docker</span> <span class="token function">ps</span> <span class="token parameter variable">-a</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="@source/../assets/docker-object/2024-01-11-21-41-56.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<ul>
<li>然后删除 Docker 容器</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">docker</span> <span class="token function">rm</span> 8c0dde3e3fb4
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="@source/../assets/docker-object/2024-01-11-21-43-29.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>使用的是 Docker 容器的 ID 删除。</p>
<ul>
<li>删除 Docker 镜像</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">docker</span> rmi hello-world
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="@source/../assets/docker-object/2024-01-11-21-44-36.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<div class="hint-container tip">
<p class="hint-container-title">提示</p>
<p>如果一个镜像创建了多个容器，那么在删除该镜像之前，必须删除所有使用该镜像的容器，才能够删除该镜像。</p>
</div>
<h3 id="更新镜像" tabindex="-1"><a class="header-anchor" href="#更新镜像" aria-hidden="true">#</a> 更新镜像</h3>
<p>Dokcer 镜像的更新就是在目前运行的 Docker 容器上进行修改，然后将更新后的 Docker 容器的所有内容，导出为一个 Docker 镜像，随后就可以使用该镜像创建 Docker 容器。</p>
<ol>
<li>先下载一个 Ubuntu20.04 镜像</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">docker</span> pull ubuntu:20.04
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="@source/../assets/docker-object/2024-01-11-22-00-32.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<ol start="2">
<li>创建一个该镜像的容器</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-t</span> <span class="token parameter variable">-i</span> ubuntu:20.04
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="@source/../assets/docker-object/2024-01-11-22-05-03.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<ol start="3">
<li>在该容器内运行 <code v-pre>apt-get update</code> 指令，更新 ubuntu 系统，更新后 <code v-pre>exit</code> 退出这个容器到我们本地的命令控制端。</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">apt-get</span> update
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="@source/../assets/docker-object/2024-01-11-22-08-00.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<ol start="4">
<li>提交容器副本</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">docker</span> commit <span class="token parameter variable">-m</span><span class="token operator">=</span><span class="token string">"update ubuntu20.04"</span> <span class="token parameter variable">-a</span><span class="token operator">=</span><span class="token string">"CoderMast"</span> 13999fa6f4f6 codermast/ubuntu:latest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="@source/../assets/docker-object/2024-01-11-22-11-50.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>各个参数说明：</p>
<ul>
<li>
<p>-m: 提交的描述信息</p>
</li>
<li>
<p>-a: 指定镜像作者</p>
</li>
<li>
<p>13999fa6f4f6：容器 ID</p>
</li>
<li>
<p>codermast/ubuntu:latest: 指定要创建的目标镜像名</p>
</li>
</ul>
<ol start="5">
<li>查看镜像列表</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">docker</span> images
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="@source/../assets/docker-object/2024-01-11-22-12-38.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>这里可以看到已经创建成功了，并且大小和之前的不一样了。</p>
<ol start="6">
<li>使用该镜像创建一个容器</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-t</span> <span class="token parameter variable">-i</span> codermast/ubuntu:latest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="@source/../assets/docker-object/2024-01-11-22-13-37.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h3 id="生成镜像" tabindex="-1"><a class="header-anchor" href="#生成镜像" aria-hidden="true">#</a> 生成镜像</h3>
<h3 id="镜像标签" tabindex="-1"><a class="header-anchor" href="#镜像标签" aria-hidden="true">#</a> 镜像标签</h3>
<p>我们可以使用 <code v-pre>docker tag</code> 命令为镜像添加一个新的标签。</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">docker</span> tag e650c5f208da codermast/ubuntu:v1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>e650c5f208da：为镜像的 ID</li>
<li>codermast/ubuntu:v1：Tag 名</li>
</ul>
<figure><img src="@source/../assets/docker-object/2024-01-11-22-21-04.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>此时我们在创建 Docker 容器时，既可以使用 <code v-pre>codermast/ubuntu:latest</code> 也可以使用 <code v-pre>codermast/ubuntu:v1</code>。</p>
<p>Tag 可以看做是给镜像起别名，其本质的镜像 ID 不变，具体底层就是同一个镜像的不同引用而已。</p>
<h3 id="镜像导入和导出" tabindex="-1"><a class="header-anchor" href="#镜像导入和导出" aria-hidden="true">#</a> 镜像导入和导出</h3>
<ol>
<li>镜像导出</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">docker</span> save <span class="token operator">></span> codermast-ubuntu-latest.tar e650c5f208da
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>codermast-ubuntu-latest.tar：要导出的文件名</li>
<li>e650c5f208da：要导出的镜像 ID</li>
</ul>
<figure><img src="@source/../assets/docker-object/2024-01-11-22-28-13.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<ol start="2">
<li>镜像导入</li>
</ol>
<p>在镜像导入之前，为了方便观察，先删除掉该镜像。</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">docker</span> load <span class="token operator">&lt;</span> codermast-ubuntu-latest.tar
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>codermast-ubuntu-latest.tar：为要导入的文件名。</li>
</ul>
<figure><img src="@source/../assets/docker-object/2024-01-11-22-36-56.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<div class="hint-container warning">
<p class="hint-container-title">注意</p>
<ul>
<li>若是只想备份images，使用save、load即可</li>
<li>若是在启动容器后，容器内容有变化，需要备份，则使用export、import</li>
</ul>
</div>
<h2 id="docker容器" tabindex="-1"><a class="header-anchor" href="#docker容器" aria-hidden="true">#</a> Docker容器</h2>
<p>在上面的 Docker 镜像的相关操作中，我们或多或少的了解和学习了一些 Docker 容器的相关操作。</p>
<h3 id="容器启动" tabindex="-1"><a class="header-anchor" href="#容器启动" aria-hidden="true">#</a> 容器启动</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-it</span> codermast/ubuntu:latest /bin/bash
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>-it 可以连写的，表示 -i -t</li>
<li>-t: 在新容器内指定一个伪终端或终端。</li>
<li>-i: 允许你对容器内的标准输入 (STDIN) 进行交互</li>
<li>codermast/ubuntu:latest：镜像名称</li>
</ul>
<figure><img src="@source/../assets/docker-object/2024-01-11-22-41-48.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h3 id="容器查看" tabindex="-1"><a class="header-anchor" href="#容器查看" aria-hidden="true">#</a> 容器查看</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">docker</span> <span class="token function">ps</span> <span class="token parameter variable">-a</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>-a 表示 all，即查看所有容器</li>
</ul>
<figure><img src="@source/../assets/docker-object/2024-01-11-22-46-01.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h3 id="容器再启动" tabindex="-1"><a class="header-anchor" href="#容器再启动" aria-hidden="true">#</a> 容器再启动</h3>
<p>我们看到，刚才 <code v-pre>codermast/ubuntu:latest</code> 的实例<code v-pre>d3a11e669e88</code> 已经停止了<code v-pre>Exited (0) 4 seconds ago</code>，我们重启这个实例</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">docker</span> start d3a11e669e88
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="@source/../assets/docker-object/2024-01-11-22-48-13.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h3 id="容器停止和重启" tabindex="-1"><a class="header-anchor" href="#容器停止和重启" aria-hidden="true">#</a> 容器停止和重启</h3>
<ul>
<li>容器停止</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">docker</span> stop d3a11e669e88
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>容器重启</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">docker</span> restart d3a11e669e88
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="@source/../assets/docker-object/2024-01-11-22-50-38.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h3 id="后台模式与进入" tabindex="-1"><a class="header-anchor" href="#后台模式与进入" aria-hidden="true">#</a> 后台模式与进入</h3>
<p>在使用 -d 参数创建容器时，容器启动后会进入后台，那么此时我们怎么进入容器呢？</p>
<ul>
<li>使用 `docker attach [容器ID]</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">docker</span> attach d3a11e669e88
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="@source/../assets/docker-object/2024-01-11-23-10-50.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<ul>
<li><code v-pre>docker exec -i -t [容器ID] /bin/bash</code></li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-i</span> <span class="token parameter variable">-t</span> d3a11e669e88 /bin/bash
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="@source/../assets/docker-object/2024-01-11-23-14-38.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<div class="hint-container warning">
<p class="hint-container-title">注意</p>
<ul>
<li>
<p><code v-pre>docker attach</code> 在退出容器终端后，容器会停止运行。</p>
</li>
<li>
<p><code v-pre>docker exec</code> 在退出容器终端后，不会导致容器的停止。</p>
</li>
</ul>
<p>✅ 推荐大家使用 <code v-pre>docker exec</code></p>
</div>
<h3 id="容器导出和导入" tabindex="-1"><a class="header-anchor" href="#容器导出和导入" aria-hidden="true">#</a> 容器导出和导入</h3>
<h3 id="强制停止容器" tabindex="-1"><a class="header-anchor" href="#强制停止容器" aria-hidden="true">#</a> 强制停止容器</h3>
<h3 id="清理停止的容器" tabindex="-1"><a class="header-anchor" href="#清理停止的容器" aria-hidden="true">#</a> 清理停止的容器</h3>
<h3 id="容器别名及操作" tabindex="-1"><a class="header-anchor" href="#容器别名及操作" aria-hidden="true">#</a> 容器别名及操作</h3>
<h3 id="容器错误日志" tabindex="-1"><a class="header-anchor" href="#容器错误日志" aria-hidden="true">#</a> 容器错误日志</h3>
<h2 id="docker仓库" tabindex="-1"><a class="header-anchor" href="#docker仓库" aria-hidden="true">#</a> Docker仓库</h2>
</div></template>


