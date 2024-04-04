<template><div><h1 id="git-远程管理" tabindex="-1"><a class="header-anchor" href="#git-远程管理" aria-hidden="true">#</a> Git 远程管理</h1>
<h2 id="远程仓库操作" tabindex="-1"><a class="header-anchor" href="#远程仓库操作" aria-hidden="true">#</a> 远程仓库操作</h2>
<p>对于远程仓库的操作，Git 提供了 <code v-pre>git remote</code> 命令，用于用于管理 Git 仓库中的远程仓库。</p>
<p>以下是 git remote 命令的常见用法：</p>
<ul>
<li>列出当前仓库中已配置的远程仓库</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">git</span> remote 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>列出当前仓库中已配置的远程仓库，并显示它们的 URL</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">git</span> remote <span class="token parameter variable">-v</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>添加一个新的远程仓库。指定一个远程仓库的名称和 URL，将其添加到当前仓库中</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">git</span> remote <span class="token function">add</span> <span class="token operator">&lt;</span>remote_name<span class="token operator">></span> <span class="token operator">&lt;</span>remote_url<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>将已配置的远程仓库重命名。</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">git</span> remote <span class="token function">rename</span> <span class="token operator">&lt;</span>old_name<span class="token operator">></span> <span class="token operator">&lt;</span>new_name<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>从当前仓库中删除指定的远程仓库</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">git</span> remote remove <span class="token operator">&lt;</span>remote_name<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>修改指定远程仓库的 URL</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">git</span> remote set-url <span class="token operator">&lt;</span>remote_name<span class="token operator">></span> <span class="token operator">&lt;</span>new_url<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>显示指定远程仓库的详细信息，包括 URL 和跟踪分支。</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">git</span> remote show <span class="token operator">&lt;</span>remote_name<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="从远程获取代码库" tabindex="-1"><a class="header-anchor" href="#从远程获取代码库" aria-hidden="true">#</a> 从远程获取代码库</h2>
<p>从远程仓库获取代码库到本地需要两步，首先获取远程分支数据，然后将本地分支没有的数据进行合并。</p>
<ol>
<li>获取远程分支数据</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">git</span> fetch <span class="token operator">&lt;</span>remote-branch-name<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>该指令是获取远程分支 remote-branch-name 中本地分支没有的数据，仅限于获取，对本地分支不做任何更改。</p>
<ol start="2">
<li>合并远程分支数据到本地</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">git</span> merge <span class="token punctuation">[</span>remote-branch-name<span class="token punctuation">]</span>/<span class="token punctuation">[</span>local-branch-name<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>该指令是在获取远程分支数据后，将本地分支没有的数据合并到本地分支，即使用远程数据覆盖本地数据。</p>
<h2 id="下载远程代码并合并" tabindex="-1"><a class="header-anchor" href="#下载远程代码并合并" aria-hidden="true">#</a> 下载远程代码并合并</h2>
<p>Git 上提供了 <code v-pre>git pull</code> 命令，用于从远程获取代码并合并本地的版本。</p>
<p>git pull 其实就是 git fetch 和 git merge FETCH_HEAD 的简写。</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">git</span> pull <span class="token operator">&lt;</span>远程主机名<span class="token operator">></span> <span class="token operator">&lt;</span>远程分支名<span class="token operator">></span>:<span class="token operator">&lt;</span>本地分支名<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>该指令的功能就是将远程主机上的远程分支拉过来，与本地分支进行合并。</p>
<p>如果是远程分支和当前分支进行合并，则可以省略本地分支名。</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">git</span> pull <span class="token operator">&lt;</span>远程主机名<span class="token operator">></span> <span class="token operator">&lt;</span>远程分支名<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="上传远程代码并合并" tabindex="-1"><a class="header-anchor" href="#上传远程代码并合并" aria-hidden="true">#</a> 上传远程代码并合并</h2>
<p>Git 上提供了 <code v-pre>git push</code> 命令，用于从将本地的分支版本上传到远程并合并。</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">git</span> push <span class="token operator">&lt;</span>远程主机名<span class="token operator">></span> <span class="token operator">&lt;</span>本地分支名<span class="token operator">></span>:<span class="token operator">&lt;</span>远程分支名<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果本地分支名与远程分支名相同，则可以省略冒号和远程分支名</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">git</span> push <span class="token operator">&lt;</span>远程主机名<span class="token operator">></span> <span class="token operator">&lt;</span>本地分支名<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果本地分支和远程分支内容有差异，但又要强制推送可以使用 --force 参数</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">git</span> push <span class="token parameter variable">--force</span> <span class="token operator">&lt;</span>远程主机名<span class="token operator">></span> <span class="token operator">&lt;</span>本地分支名<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>删除远程分支</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">git</span> push <span class="token operator">&lt;</span>远程主机名<span class="token operator">></span> <span class="token parameter variable">--delete</span> <span class="token operator">&lt;</span>本地分支名<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></div></template>


