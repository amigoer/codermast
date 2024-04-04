<template><div><h1 id="git-仓库内容操作" tabindex="-1"><a class="header-anchor" href="#git-仓库内容操作" aria-hidden="true">#</a> Git 仓库内容操作</h1>
<h2 id="添加文件到暂存区" tabindex="-1"><a class="header-anchor" href="#添加文件到暂存区" aria-hidden="true">#</a> 添加文件到暂存区</h2>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="查看仓库状态" tabindex="-1"><a class="header-anchor" href="#查看仓库状态" aria-hidden="true">#</a> 查看仓库状态</h2>
<p>在使用添加指令向暂存区添加文件后，可以使用如下指令来查看仓库当前状态，可以查看在上次提交之后是否对文件有修改。</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">git</span> status
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>该命令显示如下信息：</p>
<ul>
<li>当前分支的名称。</li>
<li>当前分支与远程分支的关系（例如，是否是最新的）。</li>
<li>未暂存的修改：显示已修改但尚未使用 git add 添加到暂存区的文件列表。</li>
<li>未跟踪的文件：显示尚未纳入版本控制的新文件列表。</li>
</ul>
<p>根据该指令通常可以判断当前工作目录中的文件状态，并采取适当的操作。</p>
<p>可以加上 <code v-pre>-s</code> 参数来获取简短的输出信息</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">git</span> status <span class="token parameter variable">-s</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="比较文件的不同" tabindex="-1"><a class="header-anchor" href="#比较文件的不同" aria-hidden="true">#</a> 比较文件的不同</h2>
<p>当工作区的内容提交到暂存区后，对工作区文件做出了修改，这时我们如果想对比具体修改了哪些部分，可以使用如下指令</p>
<ul>
<li>查看文件 file 工作区和暂存区的差别</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">git</span> <span class="token function">diff</span> <span class="token punctuation">[</span>file<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>显示暂存区和上一次提交 commit 的差别</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 两种写法均可</span>
<span class="token function">git</span> <span class="token function">diff</span> <span class="token parameter variable">--cached</span> <span class="token punctuation">[</span>file<span class="token punctuation">]</span>
<span class="token function">git</span> <span class="token function">diff</span> <span class="token parameter variable">--staged</span> <span class="token punctuation">[</span>file<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>显示两次提交之间的差异</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">git</span> <span class="token function">diff</span> <span class="token punctuation">[</span>first-branch<span class="token punctuation">]</span><span class="token punctuation">..</span>.<span class="token punctuation">[</span>second-branch<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="提交暂存区到本地仓库" tabindex="-1"><a class="header-anchor" href="#提交暂存区到本地仓库" aria-hidden="true">#</a> 提交暂存区到本地仓库</h2>
<p>前面使用 <code v-pre>git add</code> 指令将工作区文件添加到暂存区，但并没有实质的将文件添加到本地仓库，可以使用如下指令将文件从暂存区添加到本地仓库。</p>
<ul>
<li>提交暂存区中所有文件到本地仓库</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token punctuation">[</span>message<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>其中 message 是本次提交的一些备注信息。</p>
<ul>
<li>提交暂存区的指定文件到本地仓库</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">git</span> commit <span class="token punctuation">[</span>file1<span class="token punctuation">]</span> <span class="token punctuation">[</span>file2<span class="token punctuation">]</span> <span class="token punctuation">..</span>. <span class="token parameter variable">-m</span> <span class="token punctuation">[</span>-a<span class="token punctuation">]</span> <span class="token punctuation">[</span>message<span class="token punctuation">]</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这里如果使用了 <code v-pre>-a</code> 参数，就代表直接将工作区文件提交到本地仓库。</p>
<h2 id="回退版本" tabindex="-1"><a class="header-anchor" href="#回退版本" aria-hidden="true">#</a> 回退版本</h2>
<p>常常在项目版本控制的过程中，我们无意的提交了一些还尚未完成的版本，这时就需要使用到版本回退，使用如下指令可以指定退回某一次提交的版本，语法如下所示</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">git</span> reset <span class="token punctuation">[</span>--soft <span class="token operator">|</span> <span class="token parameter variable">--mixed</span> <span class="token operator">|</span> --hard<span class="token punctuation">]</span> <span class="token punctuation">[</span>HEAD<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li><code v-pre>--mixed</code> 为默认，可以不用带该参数，用于重置暂存区的文件与上一次的提交(commit)保持一致，工作区文件内容保持不变。</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token variable"><span class="token variable">`</span><span class="token function">git</span> reset <span class="token punctuation">[</span>HEAD<span class="token punctuation">]</span><span class="token variable">`</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li><code v-pre>--soft</code> 参数用于回退到某个版本：</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">git</span> reset <span class="token parameter variable">--soft</span> HEAD
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li><code v-pre>--hard</code> 参数撤销工作区中所有未提交的修改内容，将暂存区与工作区都回到上一次版本，并删除之前的所有信息提交</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">git</span> reset <span class="token parameter variable">--hard</span> HEAD
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="hint-container danger">
<p class="hint-container-title">警告</p>
<p>谨慎使用 –-hard 参数，它会删除回退点之前的所有信息。</p>
</div>
<div class="hint-container tip">
<p class="hint-container-title">HEAD 说明</p>
<ul>
<li>
<p><code v-pre>HEAD</code> 表示当前版本</p>
</li>
<li>
<p><code v-pre>HEAD^</code> 上一个版本</p>
</li>
<li>
<p><code v-pre>HEAD^^</code> 上上一个版本</p>
</li>
<li>
<p><code v-pre>HEAD^^^</code> 上上上一个版本</p>
</li>
<li>
<p><code v-pre>HEAD~0</code> 表示当前版本</p>
</li>
<li>
<p><code v-pre>HEAD~1</code> 上一个版本</p>
</li>
<li>
<p><code v-pre>HEAD^2</code> 上上一个版本</p>
</li>
<li>
<p><code v-pre>HEAD^3</code> 上上上一个版本</p>
</li>
</ul>
</div>
<h2 id="删除暂存区和工作区文件" tabindex="-1"><a class="header-anchor" href="#删除暂存区和工作区文件" aria-hidden="true">#</a> 删除暂存区和工作区文件</h2>
<p>git rm 命令用于删除文件。</p>
<p>如果只是简单地从工作目录中手工删除文件，运行 git status 时就会在 Changes not staged for commit 的提示。</p>
<ul>
<li>将文件从暂存区和工作区中删除</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">git</span> <span class="token function">rm</span> <span class="token punctuation">[</span>-f<span class="token punctuation">]</span> <span class="token operator">&lt;</span>file<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果删除之前修改过并且已经放到暂存区域的话，则必须要用强制删除选项 -f。</p>
<ul>
<li>仅将文件从暂存区删除，而保留工作区</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">git</span> <span class="token function">rm</span> <span class="token parameter variable">--cached</span> <span class="token operator">&lt;</span>file<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>该指令把文件从暂存区域移除，但仍然保留在当前工作目录中，换句话说，仅是从跟踪清单中删除，使用 <code v-pre>--cached</code> 选项即可</p>
<ul>
<li>递归删除【与Linux中类似】</li>
</ul>
<p>可以递归删除，即如果后面跟的是一个目录做为参数，则会递归删除整个目录中的所有子目录和文件</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">git</span> <span class="token function">rm</span> –r <span class="token punctuation">[</span>dir<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>该语句会删除 dir 目录下的所有文件和子目录。</p>
<h2 id="移动或重命名工作区文件" tabindex="-1"><a class="header-anchor" href="#移动或重命名工作区文件" aria-hidden="true">#</a> 移动或重命名工作区文件</h2>
<ul>
<li>移动或重命名一个文件、目录或软连接</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">git</span> <span class="token function">mv</span> <span class="token punctuation">[</span>file<span class="token punctuation">]</span> <span class="token punctuation">[</span>newfile<span class="token punctuation">]</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>如果新文件名已经存在，但还是要重命名它，可以使用 -f 参数：</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">git</span> <span class="token function">mv</span> <span class="token parameter variable">-f</span> <span class="token punctuation">[</span>file<span class="token punctuation">]</span> <span class="token punctuation">[</span>newfile<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="恢复或撤销文件的更改" tabindex="-1"><a class="header-anchor" href="#恢复或撤销文件的更改" aria-hidden="true">#</a> 恢复或撤销文件的更改</h2>
<p>该命令作用包括还原文件到最新提交的状态、丢弃未暂存的更改、丢弃已暂存但未提交的更改等。</p>
<ul>
<li>还原文件到最新提交的状态</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">git</span> restore <span class="token operator">&lt;</span>file<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>该命令可以将指定文件 &lt;file&gt; 恢复到最新的提交状态，丢弃所有未提交的更改</p>
<ul>
<li>还原文件到暂存区的状态</li>
</ul>
<p>如果你已经使用 git add 将文件添加到暂存区，但希望撤销这些更改，可以使用这个命令：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">git</span> restore <span class="token parameter variable">--staged</span> <span class="token operator">&lt;</span>file<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>以上命令将文件 &lt;file&gt; 恢复到暂存区的状态，但不影响工作目录中的文件。</p>
<ul>
<li>还原全部更改</li>
</ul>
<p>以下命令将还原所有未提交的更改，包括工作目录和暂存区的更改：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">git</span> restore <span class="token builtin class-name">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>使用这个命令要谨慎，因为它会清除所有未提交的修改。</p>
<ul>
<li>还原文件到指定提交的状态</li>
</ul>
<p>如果你想将文件 &lt;file&gt; 恢复到特定提交 &lt;commit&gt; 的状态，可以使用以下命令：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">git</span> restore <span class="token parameter variable">--source</span><span class="token operator">=</span><span class="token operator">&lt;</span>commit<span class="token operator">></span> <span class="token operator">&lt;</span>file<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这个命令在需要查看历史状态或将文件还原到历史版本时非常有用。</p>
<ul>
<li>交互式还原</li>
</ul>
<p>以下命令允许你以交互方式选择要还原或保留的更改：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">git</span> restore <span class="token parameter variable">-i</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>执行这个命令它会打开一个交互式界面，让你选择如何处理每个更改。</p>
<p>git restore 的目标是提供一种更直观、易于理解的方式来管理文件的状态，它的引入使得 Git 用户能够更容易地处理不同阶段的更改，从而提高了工作流的效率。</p>
<div class="hint-container warning">
<p class="hint-container-title">注意</p>
<p>git restore 是 Git 2.23 版本引入的一个命令，如果你使用的是较早版本的 Git，可能无法使用 git restore 命令，但你仍然可以使用 git checkout 等命令来进行类似的操作。</p>
</div>
</div></template>


