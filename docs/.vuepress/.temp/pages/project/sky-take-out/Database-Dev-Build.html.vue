<template><div><h1 id="数据库环境搭建" tabindex="-1"><a class="header-anchor" href="#数据库环境搭建" aria-hidden="true">#</a> 数据库环境搭建</h1>
<ol>
<li>修改数据库配置信息</li>
</ol>
<p>修改 <code v-pre>sky-server/src/main/resources/application-dev.yml</code> 文件内的数据库配置信息为自己的信息。</p>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">driver-class-name</span><span class="token punctuation">:</span> com.mysql.cj.jdbc.Driver
<span class="token key atrule">host</span><span class="token punctuation">:</span> localhost
<span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">3306</span>
<span class="token key atrule">database</span><span class="token punctuation">:</span> sky_take_out  <span class="token comment"># 数据库名称</span>
<span class="token key atrule">username</span><span class="token punctuation">:</span> codermast <span class="token comment"># 数据库账号</span>
<span class="token key atrule">password</span><span class="token punctuation">:</span> <span class="token number">123456</span>    <span class="token comment"># 数据库密码</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2">
<li>导入数据信息</li>
</ol>
<p>执行 <code v-pre>sky-sql/sky.sql</code> 这个 SQL 文件内的 SQL 语句即可。</p>
<p>这个 SQL 文件可以在该项目的 Github 仓库内找到，另外也可以在后端环境搭建章节中的资料下载中下载。</p>
<p>这里再附上下载链接，和后端环境搭建中的下载文件是相同的。</p>
<div class="hint-container tip">
<p class="hint-container-title">百度网盘</p>
<p>下载链接: <a href="https://pan.baidu.com/s/1ISkop_BXuCCCWQTr3ynuRA?pwd=sbcw" target="_blank" rel="noopener noreferrer">https://pan.baidu.com/s/1ISkop_BXuCCCWQTr3ynuRA?pwd=sbcw<ExternalLinkIcon/></a> 提取码: sbcw</p>
</div>
</div></template>


