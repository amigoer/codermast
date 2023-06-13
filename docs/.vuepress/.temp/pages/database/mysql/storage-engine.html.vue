<template><div><h1 id="mysql进阶-存储引擎" tabindex="-1"><a class="header-anchor" href="#mysql进阶-存储引擎" aria-hidden="true">#</a> MySQL进阶 - 存储引擎</h1>
<h2 id="mysql的体系结构" tabindex="-1"><a class="header-anchor" href="#mysql的体系结构" aria-hidden="true">#</a> MySQL的体系结构</h2>
<figure><img src="@source/../../assets/storage-engine/2023-04-10-18-34-31.png" alt="MySQL的体系结构示意图" tabindex="0" loading="lazy"><figcaption>MySQL的体系结构示意图</figcaption></figure>
<ul>
<li>
<p>连接层
连接层处于MySQL体系结构中的最上层，是一些客户端和链接服务，主要完成一些类似于连接处理、授权认证、以及相关的安全方案。服务器也会为安全接入的每个客户端验证它所具有的操作权限。</p>
</li>
<li>
<p>服务层
服务层处于MySQL体系结构中的第二层，主要完成大多书的核心服务功能，如SQL接口，并完成缓存的查询，SQL的分析和优化，部分内置函数的执行。所有存储引擎的功能也在这一层实现，如 过程、函数等。</p>
</li>
<li>
<p>引擎层</p>
</li>
</ul>
<p>引擎层处于MySQL体系结构中的第三层，真正的负责了MySQL中数据的存储和提取，服务器通过API和存储引擎进行通信。不同的存储引擎具有不同的功能，这样我们可以根据自己的需要，来选取合适的存储引擎。</p>
<ul>
<li>存储层
存储层位于MySQL结构体系的最底层，主要是将数据存储在文件系统之上，完成与存储引擎的交互。</li>
</ul>
<h2 id="存储引擎简介" tabindex="-1"><a class="header-anchor" href="#存储引擎简介" aria-hidden="true">#</a> 存储引擎简介</h2>
<p>存储引擎就是存储数据、建立索引、更新/查询数据等技术的实现方式，存储引擎是基于表的，而不是基于库的，所以存储引擎也可以被称为表的类型。</p>
<p>也就是说，同一个数据库的不同表可以选择不同的存储引擎。</p>
<ul>
<li>查看支持的存储引擎</li>
</ul>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">SHOW</span> ENGINES<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="@source/../../assets/storage-engine/2023-04-10-18-50-36.png" alt="存储引擎列表" tabindex="0" loading="lazy"><figcaption>存储引擎列表</figcaption></figure>
<ul>
<li>创建一张表并且指定引擎</li>
</ul>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">create</span> <span class="token keyword">table</span> users<span class="token punctuation">(</span>
    id <span class="token keyword">int</span> <span class="token keyword">primary</span> <span class="token keyword">key</span> <span class="token keyword">auto_increment</span><span class="token punctuation">,</span>
    username <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token keyword">engine</span><span class="token operator">=</span><span class="token keyword">InnoDB</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>该SQL代表的意思是：创建一张名为users的表，其中有id和username两个字段，并且设置存储引擎为InnoDB</p>
</blockquote>
<h2 id="存储引擎特点" tabindex="-1"><a class="header-anchor" href="#存储引擎特点" aria-hidden="true">#</a> 存储引擎特点</h2>
<h3 id="innodb" tabindex="-1"><a class="header-anchor" href="#innodb" aria-hidden="true">#</a> InnoDB</h3>
<ol>
<li>
<p>介绍
InnoDB是一种兼顾高可靠性和高性能的通用存储引擎，在MySQL5.5以后，InnoDB是默认的MySQL存储引擎。</p>
</li>
<li>
<p>特点</p>
</li>
</ol>
<ul>
<li>DML操作遵循ACID模型，支持事务</li>
<li>行级锁，提高并发访问性能</li>
<li>支持外键FOREIGN KEY约束，保证数据的完整性和正确性</li>
</ul>
<ol start="3">
<li>文件
<code v-pre>xxx.ibd</code>：xxx代表的是数据表名，InnoDB引擎的每张表都会对应这样一个表空间文件，存储该表的表架构(frm、sdi)、数据和索引。</li>
</ol>
<p>参数：<code v-pre>innodb_file_per_table</code></p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">show</span> variables <span class="token operator">like</span> <span class="token string">'innodb_file_per_table'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="4">
<li>
<p>优点：提供良好的事务管理、崩溃修复能力和并发控制。</p>
</li>
<li>
<p>缺点：读写效率稍差，空间占用比较大。</p>
</li>
</ol>
<h3 id="myisam" tabindex="-1"><a class="header-anchor" href="#myisam" aria-hidden="true">#</a> MyISAM</h3>
<ol>
<li>
<p>介绍
MyISAM是MySQL早期的默认存储引擎。</p>
</li>
<li>
<p>特点</p>
</li>
</ol>
<ul>
<li>不支持事务，不支持外键</li>
<li>支持表锁，但不支持行锁</li>
<li>访问速度快</li>
</ul>
<ol start="3">
<li>文件</li>
</ol>
<ul>
<li>xxx.sdi：存储表结构信息</li>
<li>xxx.MYD：存储数据</li>
<li>xxx.MYI：存储索引</li>
</ul>
<h3 id="memory" tabindex="-1"><a class="header-anchor" href="#memory" aria-hidden="true">#</a> Memory</h3>
<ol>
<li>介绍
Memory存储引擎的表数据存储在内存中，由于受到硬件问题、断电问题的影响，只能将这些表作为临时表或者缓存使用。</li>
<li>特点</li>
</ol>
<ul>
<li>存放在内存中，访问速度快</li>
<li>支持Hash索引(<Badge text="默认" type="danger" />)</li>
</ul>
<ol start="3">
<li>文件
xxx.sdi：存储表结构信息，只有这一个，索引和数据均存储在内存中。</li>
</ol>
<table>
<thead>
<tr>
<th style="text-align:center">特点</th>
<th style="text-align:center">InnoDB</th>
<th style="text-align:center">MyISAM</th>
<th style="text-align:center">Memory</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">存储限制</td>
<td style="text-align:center">64TB</td>
<td style="text-align:center">有</td>
<td style="text-align:center">有</td>
</tr>
<tr>
<td style="text-align:center">事务安全</td>
<td style="text-align:center">支持</td>
<td style="text-align:center">-</td>
<td style="text-align:center">-</td>
</tr>
<tr>
<td style="text-align:center">锁机制</td>
<td style="text-align:center">行锁</td>
<td style="text-align:center">表锁</td>
<td style="text-align:center">表锁</td>
</tr>
<tr>
<td style="text-align:center">B+tree索引</td>
<td style="text-align:center">支持</td>
<td style="text-align:center">支持</td>
<td style="text-align:center">支持</td>
</tr>
<tr>
<td style="text-align:center">Hash索引</td>
<td style="text-align:center">-</td>
<td style="text-align:center">-</td>
<td style="text-align:center">支持</td>
</tr>
<tr>
<td style="text-align:center">全文索引</td>
<td style="text-align:center">支持<Badge text="(5.6版本以后)" type="danger" /></td>
<td style="text-align:center">支持</td>
<td style="text-align:center">-</td>
</tr>
<tr>
<td style="text-align:center">空间使用</td>
<td style="text-align:center">高</td>
<td style="text-align:center">低</td>
<td style="text-align:center">N/A</td>
</tr>
<tr>
<td style="text-align:center">内存使用</td>
<td style="text-align:center">高</td>
<td style="text-align:center">低</td>
<td style="text-align:center">中等</td>
</tr>
<tr>
<td style="text-align:center">批量插入速度</td>
<td style="text-align:center">低</td>
<td style="text-align:center">高</td>
<td style="text-align:center">高</td>
</tr>
<tr>
<td style="text-align:center">支持外键</td>
<td style="text-align:center">支持</td>
<td style="text-align:center">-</td>
<td style="text-align:center">-</td>
</tr>
</tbody>
</table>
<h2 id="存储引擎选择" tabindex="-1"><a class="header-anchor" href="#存储引擎选择" aria-hidden="true">#</a> 存储引擎选择</h2>
<p>在选择存储引擎时，应该根据应用系统的特点选择合适的存储引擎。对于复杂的应用系统，还可以根据实际情况选择多种存储引擎进行组合。</p>
<ul>
<li>
<p>InnoDB : 是Mysql的默认存储引擎，支持事务、外键。如果应用对事务的完整性有比较高的要求，在并发条件下要求数据的一致性，数据操作除了插入和查询之外，还包含很多的更新、删除操作，那么InnoDB存储引擎是比较合适的选择。</p>
</li>
<li>
<p>MyISAM ： 如果应用是以读操作和插入操作为主，只有很少的更新和删除操作，并且对事务的完整性、并发性要求不是很高，那么选择这个存储引擎是非常合适的。</p>
</li>
<li>
<p>Memory：将所有数据保存在内存中，访问速度快，通常用于临时表及缓存。MEMORY的缺陷就是对表的大小有限制，太大的表无法缓存在内存中，而且无法保障数据的安全性。但更多时候选择Redis数据库。</p>
</li>
</ul>
</div></template>


