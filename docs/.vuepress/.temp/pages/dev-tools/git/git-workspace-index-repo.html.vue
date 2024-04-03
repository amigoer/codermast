<template><div><h1 id="git-工作原理" tabindex="-1"><a class="header-anchor" href="#git-工作原理" aria-hidden="true">#</a> Git 工作原理</h1>
<figure><img src="@source/../assets/git-pro/2024-04-03-12-40-18.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<ul>
<li>Workspace：工作区</li>
<li>Index / Stage：暂存区</li>
<li>Repository：仓库区（或本地仓库）</li>
<li>Remote：远程仓库</li>
</ul>
<p>Git 一般的工作原理为：</p>
<ol>
<li>克隆 Git 资源或创建版本库为本地工作区 workspace</li>
<li>在本地工作区上进行二次创作</li>
<li>将创作后的内容 add 添加到 index 暂存区</li>
<li>将 index 暂存区的内容 commit 提交到仓库区 repository</li>
<li>将本地仓库区的内容 push 推送到远程仓库 remote</li>
</ol>
</div></template>


