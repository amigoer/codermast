<template><div><h1 id="锁" tabindex="-1"><a class="header-anchor" href="#锁" aria-hidden="true">#</a> 锁</h1>
<h2 id="介绍" tabindex="-1"><a class="header-anchor" href="#介绍" aria-hidden="true">#</a> 介绍</h2>
<p>锁是计算机协调多个进程或线程并发访问某一资源的机制。在数据库中，除了传统的计算机资源(CPU、RAM、I/O)的争用以外，数据也是一种供许多用户共享的资源。如何保证数据并发访问的一致性、有效性是所有数据库必须解决的一个问题，锁冲突也是影响数据库并发访问性能的一个重要因素。从这个角度来说，锁对数据库而言显得尤其重要，也更加复杂。</p>
<h2 id="全局锁" tabindex="-1"><a class="header-anchor" href="#全局锁" aria-hidden="true">#</a> 全局锁</h2>
<h3 id="介绍-1" tabindex="-1"><a class="header-anchor" href="#介绍-1" aria-hidden="true">#</a> 介绍</h3>
<p>全局锁就是对整个数据库实例加锁，加锁后整个实例就处于只读状态，后续的DML的写语句，DDL语句，已经更新操作的事务提交语句都将被阻塞。</p>
<p>其典型的使用场景是做全库的逻辑备份，对所有的表进行锁定，从而获取一致性视图，保证数据的完整性。</p>
<h3 id="一致性数据备份" tabindex="-1"><a class="header-anchor" href="#一致性数据备份" aria-hidden="true">#</a> 一致性数据备份</h3>
<ol>
<li>加锁</li>
</ol>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code>flush <span class="token keyword">tables</span> <span class="token keyword">with</span> <span class="token keyword">read</span> <span class="token keyword">lock</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="2">
<li>备份</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>mysqldump <span class="token parameter variable">-uroot</span> <span class="token parameter variable">-p1234</span> tb_user <span class="token operator">></span> tb_user.sql<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p>注意：这并不是一条SQL语句！</p>
</blockquote>
<ol start="3">
<li>解锁</li>
</ol>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">unlock</span> <span class="token keyword">tables</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="特点" tabindex="-1"><a class="header-anchor" href="#特点" aria-hidden="true">#</a> 特点</h3>
<p>数据库中加全局锁，是一个比较重的操作，存在以下问题：</p>
<ol>
<li>如果在主库上备份，那么在备份期间都不能执行更新，业务基本上就完全停止。</li>
<li>如果在从库上备份，那么在备份期间从库不能执行主库同步过来的二进制日志（binlog），会导致主从延迟。</li>
</ol>
<p>在InnoDB引擎中，我们可以在备份时加上参数 <code v-pre>--single-transaction</code>参数来完成不加锁的一致性数据备份。</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>mysaldump --single-transaction <span class="token parameter variable">-uroot</span> <span class="token parameter variable">-p1234</span> tb_user <span class="token operator">></span> tb_user.sql
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="表级锁" tabindex="-1"><a class="header-anchor" href="#表级锁" aria-hidden="true">#</a> 表级锁</h2>
<h3 id="介绍-2" tabindex="-1"><a class="header-anchor" href="#介绍-2" aria-hidden="true">#</a> 介绍</h3>
<p>表级锁，每次操作锁住整张表。锁定力度大，发生锁冲突的概率最高，并发度最低。应用在MyISAM、InnoDB、BDB等存储引擎中。</p>
<p>对于表级锁，主要分为以下三种类型：</p>
<ol>
<li>表锁</li>
<li>元数据锁（meta data lock，MDL）</li>
<li>意向锁</li>
</ol>
<h3 id="表锁" tabindex="-1"><a class="header-anchor" href="#表锁" aria-hidden="true">#</a> 表锁</h3>
<ul>
<li>分类
对于表锁，又可以分为两类：</li>
</ul>
<ol>
<li>表共享读锁（read lock）</li>
<li>表独占写锁（write lock）</li>
</ol>
<ul>
<li>语法</li>
</ul>
<ol>
<li>加锁：</li>
</ol>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">lock</span> <span class="token keyword">tables</span> 表名 <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> <span class="token keyword">read</span><span class="token operator">/</span><span class="token keyword">write</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="2">
<li>释放锁</li>
</ol>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">unlock</span> <span class="token keyword">tables</span> <span class="token operator">/</span> 客户端断开连接
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="hint-container tip">
<p class="hint-container-title">注意</p>
<p>读锁不会阻塞其他客户端的读，但是会阻塞写。写锁既会阻塞其他客户端的读，又会阻塞其他客户端的读。</p>
</div>
<h3 id="元数据锁" tabindex="-1"><a class="header-anchor" href="#元数据锁" aria-hidden="true">#</a> 元数据锁</h3>
<p>MDL加锁过程是系统自动控制，无需显示使用，在访问一张表的时候会自动加上。MDL锁主要作用是维护元数据的数据一致性，在表上有活动事务的时候，不可以对元数据进行写入操作。为了避免DML与DDL冲突，保证读写的正确性。</p>
<p>在MySQL5.5中引入了MDL，当对一张表进行增删改查的时候，加MDL读锁(共享)；当对表结构进行变更操作的时候，加MDL写锁（排他）。</p>
<table>
<thead>
<tr>
<th style="text-align:center">对应SQL</th>
<th style="text-align:center">锁类型</th>
<th style="text-align:center">说明</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">lock table xxx read / write</td>
<td style="text-align:center">SHARED_READ_ONLY / SHARED_NO_READ_WRITE</td>
<td style="text-align:center"></td>
</tr>
<tr>
<td style="text-align:center">select 、 select ... lock in share mode</td>
<td style="text-align:center">SHARED_READ</td>
<td style="text-align:center">与SHARED_READ、SHARED_WRITE兼容，与EXCLUSIVE</td>
</tr>
<tr>
<td style="text-align:center">insert 、 update 、delete 、 select ... for update</td>
<td style="text-align:center">SHARED_WRITE</td>
<td style="text-align:center">与SHARED_READ、SHARED_WRITE兼容，与EXCLUSIVE</td>
</tr>
<tr>
<td style="text-align:center">alter table ...</td>
<td style="text-align:center">EXCLUSIVE</td>
<td style="text-align:center">与其他的MDL都互斥</td>
</tr>
</tbody>
</table>
<p>查看元数据锁：</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">select</span> object_type<span class="token punctuation">,</span>object_schema<span class="token punctuation">,</span>object_name<span class="token punctuation">,</span>lock_type<span class="token punctuation">,</span>lock_duration <span class="token keyword">from</span> performance_schema<span class="token punctuation">.</span>metadate_locks<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="意向锁" tabindex="-1"><a class="header-anchor" href="#意向锁" aria-hidden="true">#</a> 意向锁</h3>
<p>为了避免DML在执行时，加的行锁与表锁的冲突，在InnoDB中引入了意向锁，使得表锁不用检查每行数据是否加锁，使用意向锁来减少表锁的检查。</p>
<ol>
<li>意向共享锁（IS）：</li>
</ol>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">select</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> <span class="token keyword">lock</span> <span class="token operator">in</span> <span class="token keyword">share</span> <span class="token keyword">mode</span> <span class="token identifier"><span class="token punctuation">`</span><span class="token punctuation">`</span><span class="token punctuation">`</span>
与表锁共享锁 read 兼容，与表锁排他锁 write 互斥。

2. 意向排他锁（IX）：
``<span class="token punctuation">`</span></span><span class="token keyword">sql</span>
<span class="token keyword">insert</span>、<span class="token keyword">update</span>、<span class="token keyword">delete</span>、<span class="token keyword">select</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> <span class="token keyword">for</span> <span class="token keyword">update</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>与表锁共享锁 read 及排他锁 write 都互斥。意向锁之间不会互斥。</p>
<p>通过以下SQL，查看意向锁及行锁的加锁情况。</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">select</span> object_schema<span class="token punctuation">,</span>object_name<span class="token punctuation">,</span>index_name<span class="token punctuation">,</span>lock_type<span class="token punctuation">,</span>lock_mode<span class="token punctuation">,</span>lock_data <span class="token keyword">from</span> performance_schema<span class="token punctuation">.</span>data_locks<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="行级锁" tabindex="-1"><a class="header-anchor" href="#行级锁" aria-hidden="true">#</a> 行级锁</h2>
</div></template>


