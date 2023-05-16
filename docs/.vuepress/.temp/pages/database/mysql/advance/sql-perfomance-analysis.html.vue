<template><div><h1 id="mysql进阶-sql性能分析" tabindex="-1"><a class="header-anchor" href="#mysql进阶-sql性能分析" aria-hidden="true">#</a> MySQL进阶 - SQL性能分析</h1>
<h2 id="sql执行频率" tabindex="-1"><a class="header-anchor" href="#sql执行频率" aria-hidden="true">#</a> SQL执行频率</h2>
<p>MySQL客户端连接成功后，通过 SHOW [session | global] status 命令可以查看服务器状态信息。</p>
<p>通过如下指令，可以查看当前数据库的INSERT、SELECT、UPDATE、DELETE操作的访问频次：</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">SHOW</span> <span class="token keyword">GLOBAL</span> <span class="token keyword">STATUS</span> <span class="token operator">LIKE</span> <span class="token string">"Com_______"</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p>需要注意的是，这里一共有7个空格。</p>
</blockquote>
<p>这里查询完成以后就能够看到增删改查的执行次数。</p>
<ul>
<li>Com_insert：插入</li>
<li>Com_update：更新</li>
<li>Com_select：查询</li>
<li>Com_delete：删除</li>
</ul>
<figure><img src="@source/../assets/mysql-index/2023-04-11-21-41-30.png" alt="性能查询" tabindex="0" loading="lazy"><figcaption>性能查询</figcaption></figure>
<p>我们可以根据这个数据来判断我们主要对那些操作进行优化。</p>
<h2 id="慢查询日志" tabindex="-1"><a class="header-anchor" href="#慢查询日志" aria-hidden="true">#</a> 慢查询日志</h2>
<p>慢查询日志记录了所有执行时间超过指定参数(long_query_time，单位：秒，默认10秒)的所有SQL语句的日志。</p>
<p>MySQL中默认不开启慢查询日志，开启的话需要在MySQL的配置文件（/etc/my.cnf）中配置如下信息：</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token comment">-- 开启MySQL中的慢查询</span>
slow_query_log <span class="token operator">=</span> <span class="token number">1</span>
<span class="token comment">-- 设置慢查询的	时间为2秒钟，SQL语句执行超过两秒，则会被视为慢查询，记录慢查询日志</span>
long_query_time <span class="token operator">=</span> <span class="token number">2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置完毕以后，通过以下指令重新启动MySQL服务器进行测试，查看慢日志文件中记录的信息<code v-pre>/var/lib/mysql/localhost-slow.log</code></p>
<div class="hint-container info">
<p class="hint-container-title">功能</p>
<p>慢查询日志主要就是为了记录那些查询时间较长的SQL语句，方便于我们的优化。</p>
</div>
<div class="hint-container note">
<p class="hint-container-title">前景提要</p>
<p>通过慢查询日志，我们能够找到查询时间较低的SQL，但是有时候我们对于SQL已经优化到了极致，由于数据量的巨大，无法再压缩SQL的执行时间，或者有些SQL本应该很快执行完毕，但是仍耗费了很长时间，而耗费的时间又在我们慢日志统计时间的临界值，而这类SQL是非常需要我们进行优化的。这两种情况时，需要优化的没有被统计，而无法优化的又被统计到，那么此时慢查询就无法满足我们的需求，这时候就需要使用Profile分析。</p>
</div>
<h2 id="profile分析" tabindex="-1"><a class="header-anchor" href="#profile分析" aria-hidden="true">#</a> Profile分析</h2>
<p>show profiles分析能够在做SQL优化时帮助我们了解时间都耗费到哪去了。通过have_profiling参数，能够看到当前MySQL是否支持profile操作：</p>
<ul>
<li>查看是否支持profile</li>
</ul>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span> @<span class="token variable">@have_profiling</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>默认情况下profile是关闭的，可以通过 set 语句在 globle|session 级别开启profiling;</p>
<ul>
<li>开启profile</li>
</ul>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">set</span> <span class="token punctuation">[</span><span class="token keyword">session</span><span class="token operator">|</span>globle<span class="token punctuation">]</span> profile <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>查看每一条执行过的SQL语句的耗时情况</li>
</ul>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">show</span> profiles<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>查看指定query_id 的SQL语句各个阶段的耗时情况</li>
</ul>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code>shwo profile <span class="token keyword">for</span> query query_id<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>查看指定query_id 的SQL语句的CPU的使用情况</li>
</ul>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">show</span> profile cpu <span class="token keyword">for</span> query query_id<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="explain执行计划" tabindex="-1"><a class="header-anchor" href="#explain执行计划" aria-hidden="true">#</a> explain执行计划</h2>
<div class="hint-container note">
<p class="hint-container-title">前景提要</p>
<p>前面我们了解的几种方法要么通过SQL的执行频率，要么通过SQL的执行时间来判断SQL是否需要优化，而这些方式并不能够真正的评判一条SQL的性能。</p>
</div>
<p>explain 或者 desc 命令获取MySQL如何执行SELECT语句的信息，包括SELETC语句执行过程中表如何连接和连接的顺序。</p>
<ul>
<li>语法</li>
</ul>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token comment">-- 直接在SELECT语句之前加上关键字 explain 或者 desc</span>
<span class="token keyword">EXPLAIN</span> <span class="token keyword">SELECT</span> 字段列表 <span class="token keyword">FROM</span> 表名 <span class="token keyword">WHERE</span> 条件列表<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>explain执行计划各字段的含义：</p>
<ul>
<li>
<p><strong>id</strong>
SELECT 查询的序列号，表示查询中执行 SELECT 子句或者是操作表的顺序（id相同，执行顺序从上到下；id不同，值越大，越先执行）。</p>
</li>
<li>
<p>select_type
表示SELECT的类型，常见的取值有SIMPLE（简单表，即不使用表连接或者子查询）、PRIMARY（主查询，即外层的查询）、UNION（UNION中的第二个或者后面的查询语句）、SUBQUERY（SELECT/WHERE之后包含了子查询）等。</p>
</li>
<li>
<p><strong>type</strong>【重要】
表示连接类型，性能由好到差的连接类型为：NULL、system、const、eq_ref、ref、range、index、all。</p>
</li>
<li>
<p>possible_key
显示可能应用到这张表上的索引，一个或者多个。</p>
</li>
<li>
<p>key
实际使用的索引，如果为NULL，则表示没有使用索引。</p>
</li>
<li>
<p>key_len
表示索引中使用的字节数，该值为索引字段最大可能长度，并非实际使用长度，再不损失精度的前提下，长度越短越小。</p>
</li>
<li>
<p>rows
MySQL认为必须要执行查询的行数，在innodb引擎的表中，是一个估计值，可能并不总是准确的。</p>
</li>
<li>
<p>filtered
表示查询返回结果的行数占需要的读取行数的百分比，filtered的值越大越好。</p>
</li>
<li>
<p>extra
备注信息，一般为NULL。</p>
</li>
</ul>
</div></template>


