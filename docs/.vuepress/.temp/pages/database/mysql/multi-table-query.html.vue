<template><div><h1 id="mysql基础-多表查询" tabindex="-1"><a class="header-anchor" href="#mysql基础-多表查询" aria-hidden="true">#</a> MySQL基础 - 多表查询</h1>
<h2 id="多表关系" tabindex="-1"><a class="header-anchor" href="#多表关系" aria-hidden="true">#</a> 多表关系</h2>
<div class="hint-container tip">
<p class="hint-container-title">提示</p>
<p>在正式学习数据库的多表查询之前，我们需要了解到需要多表查询的场景，以及有哪些多表查询的情况，也就是数据表之间的关系。</p>
</div>
<h3 id="一对一" tabindex="-1"><a class="header-anchor" href="#一对一" aria-hidden="true">#</a> 一对一</h3>
<p>一对一关系是我们比较常见的关系，比如数据表A中的一条值对应数据表B中的一条值，这种情况经常用于多表的拆分。例如将最常用的字段抽取出来，使得提高查询的效率。</p>
<div class="hint-container info">
<p class="hint-container-title">实现</p>
<p>在任意一方加入外键，关联另外一方的主键，并且设置唯一约束(UNIQUE)。</p>
</div>
<h3 id="一对多" tabindex="-1"><a class="header-anchor" href="#一对多" aria-hidden="true">#</a> 一对多</h3>
<p>一对多的关系也可以看作多对一，就看你是从那个视角去看待这段关系。例如，一个部门下有多个员工，但是一个员工只能属于一个部门，这种关系就是一对多关系。</p>
<div class="hint-container info">
<p class="hint-container-title">实现</p>
<p>在多的一方建立外键，指向的一的一方的主键。</p>
</div>
<h3 id="多对多" tabindex="-1"><a class="header-anchor" href="#多对多" aria-hidden="true">#</a> 多对多</h3>
<p>这种关系也是我们经常遇到的一种关系，如学生和课程之间的关系，一个学生可以选择多门课程，而一门课程中也可以有多个学生，这就是一种多对多的关系.</p>
<div class="hint-container info">
<p class="hint-container-title">实现</p>
<p>这种关系的实现相对来说较为复杂，需要我们建立一张中间表，这张中间表的字段最少包含了两个外键，关联了两方多的主键，从而确保多对多的关系。</p>
</div>
<h2 id="多表查询" tabindex="-1"><a class="header-anchor" href="#多表查询" aria-hidden="true">#</a> 多表查询</h2>
<p>多表查询是指从多张数据表中查询数据。然而在多表查询之前，我们首先需要了解一个简单的概念：笛卡尔积。</p>
<div class="hint-container note">
<p class="hint-container-title">笛卡尔积</p>
<p>笛卡尔积是指在数学中，两个集合A和B的所有组合情况。在多表查询时，需要消除无效的笛卡尔积。</p>
</div>
<p>例如，我们在连接查询的时候，不指定条件列表，则查询出来的数据是两张表的笛卡尔积组合。即按行将两张表排列组合，一共有 表a的行数 * 表b的行数 个值。</p>
<h3 id="内连接" tabindex="-1"><a class="header-anchor" href="#内连接" aria-hidden="true">#</a> 内连接</h3>
<p>相当于查询数据表A、B之间的交集部分。内连接分为两种类型<Badge text="隐式内连接" type="info" />和<Badge text="显式内连接" type="info" />。</p>
<figure><img src="@source/../../assets/multi-table-query/2023-04-10-15-22-40.png" alt="内连接" tabindex="0" loading="lazy"><figcaption>内连接</figcaption></figure>
<ul>
<li>隐式内连接</li>
</ul>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span> 字段列表 <span class="token keyword">FROM</span> 表<span class="token number">1</span><span class="token punctuation">,</span>表<span class="token number">2</span> <span class="token keyword">WHERE</span> 条件列表<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>显示内连接</li>
</ul>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span> 字段列表 <span class="token keyword">FROM</span> 表<span class="token number">1</span> <span class="token punctuation">[</span><span class="token keyword">INNER</span><span class="token punctuation">]</span> <span class="token keyword">JOIN</span> 表<span class="token number">2</span> <span class="token keyword">ON</span> 连接条件<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="外连接" tabindex="-1"><a class="header-anchor" href="#外连接" aria-hidden="true">#</a> 外连接</h3>
<p>外连接有两种情况，左外连接和右外连接。</p>
<ul>
<li>左外连接：查询左表的所有数据，以及两张表交集部分的数据。</li>
</ul>
<figure><img src="@source/../../assets/multi-table-query/2023-04-10-15-33-53.png" alt="左外连接" tabindex="0" loading="lazy"><figcaption>左外连接</figcaption></figure>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span> 字段列表 <span class="token keyword">FROM</span> 表<span class="token number">1</span> <span class="token keyword">LEFT</span> <span class="token punctuation">[</span><span class="token keyword">OUTER</span><span class="token punctuation">]</span> <span class="token keyword">JOIN</span> 表<span class="token number">2</span> <span class="token keyword">ON</span> 连接条件<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>右外连接：查询右表的所有数据，以及两张表交集部分的数据。</li>
</ul>
<figure><img src="@source/../../assets/multi-table-query/2023-04-10-15-34-28.png" alt="右外连接" tabindex="0" loading="lazy"><figcaption>右外连接</figcaption></figure>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span> 字段列表 <span class="token keyword">FROM</span> 表<span class="token number">1</span> <span class="token keyword">RIGHT</span> <span class="token punctuation">[</span><span class="token keyword">OUTER</span><span class="token punctuation">]</span> <span class="token keyword">JOIN</span> 表<span class="token number">2</span> <span class="token keyword">ON</span> 连接条件<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="自连接" tabindex="-1"><a class="header-anchor" href="#自连接" aria-hidden="true">#</a> 自连接</h3>
<p>自连接顾名思义就是自己连接自己，当前表与自身的连接查询，是通过将一张表复制成两张，将这两张表进行连接查询，自连接查询必须使用表别名。</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span> 字段列表 <span class="token keyword">FROM</span> 表A 别名A <span class="token keyword">JOIN</span> 表A 别名B <span class="token keyword">ON</span> 条件列表 <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="hint-container tip">
<p class="hint-container-title">注意</p>
<ul>
<li>自连接是不区分左连接和右连接的，因为两张表的是完全相同的，无论将哪张表放在左边，其结果都是相同的。</li>
<li>自连接可以是内连接，也可以是外连接查询。</li>
</ul>
</div>
<h3 id="联合查询" tabindex="-1"><a class="header-anchor" href="#联合查询" aria-hidden="true">#</a> 联合查询</h3>
<p>对于union查询，就是把多次查询的结果合并起来，形成一个新的查询结果集。</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span> 字段列表 <span class="token keyword">FROM</span> 表<span class="token number">1</span> 表<span class="token number">2</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token keyword">UNION</span> <span class="token punctuation">[</span><span class="token keyword">ALL</span><span class="token punctuation">]</span>
<span class="token keyword">SELECT</span> 字段列表 <span class="token keyword">FROM</span> 表A 表B <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container info">
<p class="hint-container-title">注意</p>
<ul>
<li>对于联合查询而言，多张表的列数必须保持一致，字段类型也需要保持一致。</li>
<li>union all 会讲全部的数据直接合并在一起，而 union 会将数据合并后去重。</li>
</ul>
</div>
<h3 id="子查询" tabindex="-1"><a class="header-anchor" href="#子查询" aria-hidden="true">#</a> 子查询</h3>
<p>子查询又称为嵌套查询，即在SQL语句中嵌套使用SELECT语句，一次SELECT的返回集又称为了另外一个SELECT的数据集。</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> table1 <span class="token keyword">WHERE</span> column1 <span class="token operator">=</span> <span class="token punctuation">(</span>
    <span class="token keyword">SELECT</span> column1 <span class="token keyword">FROM</span> table2
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container warning">
<p class="hint-container-title">提示</p>
<p>子查询的外部可以是INSERT、DELETE、UPDATE、SELECT操作中的任意一个。</p>
</div>
<p>根据子查询的结果不同，分为：</p>
<ul>
<li>标量子查询（子查询的结果为单个值）</li>
<li>列子查询（子查询的结果为一列）</li>
<li>行子查询（子查询的结果为一行）</li>
<li>表子查询（子查询的结果为多行多列）</li>
</ul>
<h4 id="标量子查询" tabindex="-1"><a class="header-anchor" href="#标量子查询" aria-hidden="true">#</a> 标量子查询</h4>
<p>标量子查询指的是<code v-pre>子查询</code>的返回的结果是一行一列的一个值，如数字、字符串、日期等简单的形式。</p>
<p>常用的操作符号：=、!=、&gt;、&gt;=、 &lt; 、&lt;=</p>
<h4 id="列子查询" tabindex="-1"><a class="header-anchor" href="#列子查询" aria-hidden="true">#</a> 列子查询</h4>
<p>列子查询指的是<code v-pre>子查询</code>的返回结果是一列，可以是多行的数据集。</p>
<p>常用的操作符： IN、NOT IN、ANY、SOME、ALL</p>
<table>
<thead>
<tr>
<th style="text-align:center">操作符</th>
<th style="text-align:center">描述</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">IN</td>
<td style="text-align:center">在指定的集合范围之内，多选一</td>
</tr>
<tr>
<td style="text-align:center">NOT IN</td>
<td style="text-align:center">不在指定的集合范围内</td>
</tr>
<tr>
<td style="text-align:center">ANY</td>
<td style="text-align:center">子查询的返回列表中，有任意一个满足即可</td>
</tr>
<tr>
<td style="text-align:center">SOME</td>
<td style="text-align:center">与ANY等同，使用SOME的地方均可以使用ANY</td>
</tr>
<tr>
<td style="text-align:center">ALL</td>
<td style="text-align:center">子查询的返回列表的所有值都必须满足</td>
</tr>
</tbody>
</table>
<h4 id="行子查询" tabindex="-1"><a class="header-anchor" href="#行子查询" aria-hidden="true">#</a> 行子查询</h4>
<p>行子查询指的是<code v-pre>子查询</code>返回的结果是一行，可以是多列的数据集。</p>
<p>常用的操作符：=、!= 、IN、NOT IN</p>
<h4 id="表子查询" tabindex="-1"><a class="header-anchor" href="#表子查询" aria-hidden="true">#</a> 表子查询</h4>
<p>表子查询指的是<code v-pre>子查询</code>返回的结果是多行多列的数据集。</p>
<p>常用的操作符：IN</p>
</div></template>


