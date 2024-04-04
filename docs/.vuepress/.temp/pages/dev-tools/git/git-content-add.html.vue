<template><div><h1 id="git-仓库内容操作" tabindex="-1"><a class="header-anchor" href="#git-仓库内容操作" aria-hidden="true">#</a> Git 仓库内容操作</h1>
<h2 id="添加文件" tabindex="-1"><a class="header-anchor" href="#添加文件" aria-hidden="true">#</a> 添加文件</h2>
<p>使用如下指令将工作区的文件添加到暂存区，告诉 Git 在下次 commit 时哪些文件做出了修改。</p>
<blockquote>
<p>commit 指令详看后续</p>
</blockquote>
<ul>
<li>添加一个或多个文件到暂存区：</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">git</span> <span class="token function">add</span> <span class="token punctuation">[</span>file1<span class="token punctuation">]</span> <span class="token punctuation">[</span>file2<span class="token punctuation">]</span> <span class="token punctuation">..</span>.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>添加指定目录到暂存区</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">git</span> <span class="token function">add</span> <span class="token punctuation">[</span>dir<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>添加当前目录下的所有文件到暂存区</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">git</span> <span class="token function">add</span> <span class="token builtin class-name">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="" tabindex="-1"><a class="header-anchor" href="#" aria-hidden="true">#</a> </h2>
</div></template>


