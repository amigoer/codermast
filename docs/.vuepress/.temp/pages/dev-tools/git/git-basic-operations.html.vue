<template><div><h1 id="git-创建" tabindex="-1"><a class="header-anchor" href="#git-创建" aria-hidden="true">#</a> Git 创建</h1>
<h2 id="创建版本库" tabindex="-1"><a class="header-anchor" href="#创建版本库" aria-hidden="true">#</a> 创建版本库</h2>
<p>在 Git 上创建版本库有两种方式，一种是直接拷贝远程 Git 仓库到本地，另外一种是我们自己创建本地的版本库。</p>
<ul>
<li>拷贝远程仓库</li>
</ul>
<p>拷贝远程仓库时我们需要知道远程仓库的URL地址，直接使用如下命令即可，默认是拷贝到当前目录下。</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">git</span> clone <span class="token punctuation">[</span>远程仓库 URL<span class="token punctuation">]</span> <span class="token punctuation">[</span>名称<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>执行完上述步骤后，Git 会克隆远程仓库到本地，并在当前目录下创建一个与远程仓库同名的文件夹。</p>
<p>git clone 命令会自动将远程仓库的所有分支和历史记录复制到本地，你可以使用其他 Git 命令（如 git checkout、git pull 等）在本地仓库进行操作。</p>
<p>默认情况下，Git 会按照你提供的 URL 所指向的项目的名称创建你的本地项目目录。 通常就是该 URL 最后一个 / 之后的项目名称。如果你想要一个不一样的名字， 你可以在该命令后加上你想要的名称。</p>
<ul>
<li>创建本地仓库</li>
</ul>
<p>在当前执行目录下初始化仓库，即创建一个新的代码仓库，既可以在空目录下初始化，也可以在已有内容的目录下初始化。</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">git</span> init
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>下面我们来创建一个 CoderMast-Git 的工作目录。</p>
<ol>
<li>创建 CoderMast-Git 文件夹</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">mkdir</span> CoderMast-Git
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>可以使用<code v-pre>ls -a</code> 来查看该目录是否创建成功。</p>
<ol start="2">
<li>进入该目录</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token builtin class-name">cd</span> CoderMast-Git
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="3">
<li>初始化仓库</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">git</span> init
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>初始化完成后提示 <code v-pre>Initialized empty Git repository in /Users/codermast/DevProjects/CoderMast-Git/.git/</code> ，会帮我们在当前目录下创建一个 <code v-pre>.git</code> 的文件夹，这个目录是隐藏的，我们可以使用 <code v-pre>ls -a</code> 来查看。</p>
<p><code v-pre>.git</code> 这个子目录就是你的 Git 仓库了，所有有关你的此项目的所有内容和元数据都存放在这里。</p>
<p>经过以上步骤，就创建好了一个本地工作仓库。</p>
<div class="hint-container warning">
<p class="hint-container-title">注意</p>
<p>如果你使用 Windows 系统，为了避免遇到各种莫名其妙的问题，请确保目录名（包括父目录）不包含中文。</p>
</div>
<h2 id="提交与修改" tabindex="-1"><a class="header-anchor" href="#提交与修改" aria-hidden="true">#</a> 提交与修改</h2>
<h2 id="" tabindex="-1"><a class="header-anchor" href="#" aria-hidden="true">#</a> </h2>
</div></template>


