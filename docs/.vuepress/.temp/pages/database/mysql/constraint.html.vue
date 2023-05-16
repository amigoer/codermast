<template><div><h1 id="mysql基础-约束" tabindex="-1"><a class="header-anchor" href="#mysql基础-约束" aria-hidden="true">#</a> MySQL基础 - 约束</h1>
<h2 id="概念" tabindex="-1"><a class="header-anchor" href="#概念" aria-hidden="true">#</a> 概念</h2>
<p>约束是作用于表中字段上的规则，用于限制存储在表中的数据。</p>
<h2 id="目的" tabindex="-1"><a class="header-anchor" href="#目的" aria-hidden="true">#</a> 目的</h2>
<p>为了保证数据库中数据的正确、有效性和完整性。</p>
<h2 id="分类" tabindex="-1"><a class="header-anchor" href="#分类" aria-hidden="true">#</a> 分类</h2>
<table>
<thead>
<tr>
<th style="text-align:center">约束</th>
<th style="text-align:center">描述</th>
<th style="text-align:center">关键字</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">非空约束</td>
<td style="text-align:center">限制该字段的数据不能为null</td>
<td style="text-align:center">NOT NULL</td>
</tr>
<tr>
<td style="text-align:center">唯一约束</td>
<td style="text-align:center">保证该字段的所有数据都是唯一，不重复的</td>
<td style="text-align:center">UNIQUE</td>
</tr>
<tr>
<td style="text-align:center">主键约束</td>
<td style="text-align:center">主键是一行数据的唯一标识，要求非空且唯一</td>
<td style="text-align:center">PRIMARY KEY</td>
</tr>
<tr>
<td style="text-align:center">默认约束</td>
<td style="text-align:center">保存数据时，如果未指定该字段的值，则赋予该默认值</td>
<td style="text-align:center">DEFULT</td>
</tr>
<tr>
<td style="text-align:center">条件约束<Badge text="8.0.16版本以后" type="warning" /></td>
<td style="text-align:center">保证字段值满足指定的条件</td>
<td style="text-align:center">CHECK</td>
</tr>
<tr>
<td style="text-align:center">外键约束</td>
<td style="text-align:center">用来让两张表的数据之间建立连接，保证数据的一致性和完整性</td>
<td style="text-align:center">FOREIGN KEY</td>
</tr>
</tbody>
</table>
<div class="hint-container warning">
<p class="hint-container-title">注意</p>
<p>约束是作用于表中字段上的，可以在创建表/修改表的时候添加约束。</p>
</div>
<h2 id="外键约束" tabindex="-1"><a class="header-anchor" href="#外键约束" aria-hidden="true">#</a> 外键约束</h2>
<p>其他5种约束的适用方法较为简单，这里仅对外键约束做详细介绍。</p>
<h3 id="语法" tabindex="-1"><a class="header-anchor" href="#语法" aria-hidden="true">#</a> 语法</h3>
<ol>
<li>添加外键</li>
</ol>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token comment">-- 建表时添加外键</span>
<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> 表名<span class="token punctuation">(</span> 
    字段名 数据类型<span class="token punctuation">,</span>
     <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> 
    <span class="token punctuation">[</span><span class="token keyword">CONSTRAINT</span><span class="token punctuation">]</span> <span class="token punctuation">[</span>外键名称<span class="token punctuation">]</span> <span class="token keyword">FOREIGN</span> <span class="token keyword">KEY</span> <span class="token punctuation">(</span>外键字段名<span class="token punctuation">)</span> <span class="token keyword">REFERENCES</span> 主表 <span class="token punctuation">(</span>主表列名<span class="token punctuation">)</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">-- 建表后添加外键</span>
<span class="token keyword">ALTER</span> <span class="token keyword">TABLE</span> 表名 <span class="token keyword">ADD</span> <span class="token keyword">CONSTRAINT</span> 外键名称 <span class="token keyword">FOREIGN</span> <span class="token keyword">KEY</span> <span class="token punctuation">(</span>外键字段名<span class="token punctuation">)</span> <span class="token keyword">REFERENCES</span> 主表<span class="token punctuation">(</span>主表列名<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2">
<li>删除外键</li>
</ol>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">ALTER</span> <span class="token keyword">TABLE</span> 表名 <span class="token keyword">DROP</span> <span class="token keyword">FOREIGN</span> <span class="token keyword">KEY</span> 外键名称<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="删除-更新行为" tabindex="-1"><a class="header-anchor" href="#删除-更新行为" aria-hidden="true">#</a> 删除/更新行为</h3>
<p>添加了外键之后，再删除父表数据时产生的约束行为，我们就称为删除/更新行为。具体的删除/更新行
为有以下几种:</p>
<table>
<thead>
<tr>
<th style="text-align:center">行为</th>
<th style="text-align:center">说明</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">NO ACTION</td>
<td style="text-align:center">当在父表中删除/更新对应记录时，首先检查该记录是否有对应外键，如果有则不允许删除/更新。(与RESTRICT一致)默认行为</td>
</tr>
<tr>
<td style="text-align:center">RESTRICT</td>
<td style="text-align:center">当在父表中删除/更新对应记录时，首先检查该记录是否有对应外键，如果有则不允许删除/更新。(与NO ACTION一致)默认行为</td>
</tr>
<tr>
<td style="text-align:center">CASCADE</td>
<td style="text-align:center">当在父表中删除/更新对应记录时，首先检查该记录是否有对应外键，如果有，则也删除/更新外键在子表中的记录。</td>
</tr>
<tr>
<td style="text-align:center">SET NULL</td>
<td style="text-align:center">当在父表中删除对应记录时，首先检查该记录是否有对应外键，如果有则设置子表中该外键值为null（这就要求该外键允许取null）。</td>
</tr>
<tr>
<td style="text-align:center">SET DEFAULT</td>
<td style="text-align:center">父表有变更时，子表将外键列设置成一个默认的值(Innodb不支持)</td>
</tr>
</tbody>
</table>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">ALTER</span> <span class="token keyword">TABLE</span> 表名 <span class="token keyword">ADD</span> <span class="token keyword">CONSTRAINT</span> 外键名称 <span class="token keyword">FOREIGN</span> <span class="token keyword">KEY</span> <span class="token punctuation">(</span>外键字段<span class="token punctuation">)</span> <span class="token keyword">REFERENCES</span> 主表名 <span class="token punctuation">(</span>主表字段名<span class="token punctuation">)</span> <span class="token keyword">ON</span> <span class="token keyword">UPDATE</span> <span class="token keyword">CASCADE</span> <span class="token keyword">ON</span> <span class="token keyword">DELETE</span> <span class="token keyword">CASCADE</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></div></template>


