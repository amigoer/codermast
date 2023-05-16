<template><div><h1 id="mysql基础-sql基础语法" tabindex="-1"><a class="header-anchor" href="#mysql基础-sql基础语法" aria-hidden="true">#</a> MySQL基础 - SQL基础语法</h1>
<h2 id="通用语法" tabindex="-1"><a class="header-anchor" href="#通用语法" aria-hidden="true">#</a> 通用语法</h2>
<ol>
<li>SQL语句可以单行或者多行书写，以分号结尾。</li>
<li>SQL语句可以使用空格/缩进符来增强语句的可读性。</li>
<li>MySQL数据库的SQL语言不区分大小写，关键字建议使用大写。</li>
<li>注释</li>
</ol>
<div class="hint-container info">
<p class="hint-container-title">注释</p>
<ul>
<li>单行注释：-- 注释内容 或者 # 注释内容(MySQL特有的语法)</li>
<li>多行注释：使用/* 注释内容 */</li>
</ul>
</div>
<h2 id="sql分类" tabindex="-1"><a class="header-anchor" href="#sql分类" aria-hidden="true">#</a> SQL分类</h2>
<ul>
<li>DDL</li>
</ul>
<p>Data Definition Language 数据定义语言，用来定义数据库对象（数据库、数据表、字段）</p>
<ul>
<li>DML</li>
</ul>
<p>Data Manipulation Language 数据操作语言，用来对数据库表中的数据进行增删改</p>
<ul>
<li>DQL</li>
</ul>
<p>Data Query Language 数据查询语言，用来对数据库中的数据进行查询操作</p>
<ul>
<li>DCL</li>
</ul>
<p>Data Control Language 数据控制语言，用来创建数据库用户、控制数据表的访问权限</p>
<h2 id="ddl语句" tabindex="-1"><a class="header-anchor" href="#ddl语句" aria-hidden="true">#</a> DDL语句</h2>
<h3 id="数据库操作" tabindex="-1"><a class="header-anchor" href="#数据库操作" aria-hidden="true">#</a> 数据库操作</h3>
<ul>
<li>
<p>查询</p>
<ol>
<li>查询所有数据库</li>
</ol>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">SHOW</span> <span class="token keyword">DATABASES</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="2">
<li>查询当前数据库</li>
</ol>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span> <span class="token keyword">DATABASE</span><span class="token punctuation">(</span><span class="token punctuation">)</span>:
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>创建</p>
</li>
</ul>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token keyword">DATABASE</span> <span class="token punctuation">[</span><span class="token keyword">IF</span> <span class="token operator">NOT</span> <span class="token keyword">EXISTS</span><span class="token punctuation">]</span> 数据库名 <span class="token punctuation">[</span>DEFULT <span class="token keyword">CHARSET</span> 字符集<span class="token punctuation">]</span> <span class="token punctuation">[</span><span class="token keyword">COLLATE</span> 排序规则<span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>删除</li>
</ul>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">DROP</span> <span class="token keyword">DATABASE</span> <span class="token punctuation">[</span><span class="token keyword">IF</span> <span class="token keyword">EXISTS</span><span class="token punctuation">]</span> 数据库名<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>使用</li>
</ul>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">USE</span> 数据库名<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="数据表操作" tabindex="-1"><a class="header-anchor" href="#数据表操作" aria-hidden="true">#</a> 数据表操作</h3>
<ul>
<li>
<p>查询</p>
<ol>
<li>查询当前数据库的所有表</li>
</ol>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">SHOW</span> <span class="token keyword">TABLES</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="2">
<li>查询表结构</li>
</ol>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">DESC</span> 表名<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="3">
<li>查询指定表的建表语句</li>
</ol>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">SHOW</span> <span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> 表名<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>创建</p>
</li>
</ul>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> 表名<span class="token punctuation">(</span>
    字段<span class="token number">1</span> 字段<span class="token number">1</span>类型 <span class="token punctuation">[</span><span class="token keyword">COMMENT</span> 字段<span class="token number">1</span>注释<span class="token punctuation">]</span><span class="token punctuation">,</span>
    字段<span class="token number">2</span> 字段<span class="token number">2</span>类型 <span class="token punctuation">[</span><span class="token keyword">COMMENT</span> 字段<span class="token number">2</span>注释<span class="token punctuation">]</span><span class="token punctuation">,</span>
    字段<span class="token number">3</span> 字段<span class="token number">3</span>类型 <span class="token punctuation">[</span><span class="token keyword">COMMENT</span> 字段<span class="token number">3</span>注释<span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
    字段n 字段n类型 <span class="token punctuation">[</span><span class="token keyword">COMMENT</span> 字段n注释<span class="token punctuation">]</span>
<span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token keyword">COMMENT</span> 表注释<span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container tip">
<p class="hint-container-title">提示</p>
<p><code v-pre>[]</code>代表可选参数，并且最后一个字段后没有<mark>逗号</mark>，最后以分号结尾。</p>
</div>
<ul>
<li>
<p>删除</p>
<ol>
<li>删除表</li>
</ol>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">DROP</span> <span class="token keyword">TABLE</span> <span class="token punctuation">[</span><span class="token keyword">IF</span> <span class="token keyword">EXISTS</span><span class="token punctuation">]</span>表名；
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="2">
<li>删除指定数据表，并且重新创建该表</li>
</ol>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">TRUNCATE</span> <span class="token keyword">TABLE</span> 表名<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="hint-container info">
<p class="hint-container-title">说明</p>
<p>删除数据表后，会讲数据表内的所有数据清空。这里的功能可以看作，将数据表内的所有数据全部清空。但是实际上的操作流程是将表删除，然后重新创建。而<code v-pre>DELETE * FROM 表名</code>语句能够将所有的数据清空，但是例如字段自增的序号和建立的一些索引等是不会被清除的。</p>
</div>
</li>
<li>
<p>修改</p>
<ol>
<li>修改表名</li>
</ol>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">ALTER</span> <span class="token keyword">TABLE</span> 旧表名 <span class="token keyword">RENAME</span> <span class="token punctuation">[</span><span class="token keyword">TO</span><span class="token punctuation">]</span> 新表名<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="hint-container tip">
<p class="hint-container-title">提示</p>
<p>这里的[TO]是可有可无的，没有也不会对SQL语句造成歧义，影响功能，写上以后会使SQL的可读性更高。</p>
</div>
<ol start="2">
<li>修改表字符集</li>
</ol>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">ALTER</span> <span class="token keyword">TABLE</span> 表名 <span class="token punctuation">[</span><span class="token keyword">DEFAULT</span><span class="token punctuation">]</span> <span class="token keyword">CHARACTER</span> <span class="token keyword">SET</span> 字符集名 <span class="token punctuation">[</span><span class="token keyword">DEFAULT</span><span class="token punctuation">]</span> <span class="token keyword">COLLATE</span> 校对规则名<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="3">
<li>表内字段修改</li>
</ol>
<div class="hint-container info">
<p class="hint-container-title">说明</p>
<p>由于对表字段的修改，也可以归纳为字段操作，且其操作较多，就将其全部归纳到字段操作里。即下一小节。</p>
</div>
</li>
</ul>
<h3 id="字段操作" tabindex="-1"><a class="header-anchor" href="#字段操作" aria-hidden="true">#</a> 字段操作</h3>
<ol>
<li>添加字段<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">ALTER</span> <span class="token keyword">TABLE</span> 表名 <span class="token keyword">ADD</span> 字段名 字段数据类型<span class="token punctuation">(</span>长度<span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token keyword">COMMENT</span> 字段注释<span class="token punctuation">]</span><span class="token punctuation">[</span>约束<span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="2">
<li>删除字段</li>
</ol>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">ALTER</span> <span class="token keyword">TABLE</span> 表名 <span class="token keyword">DROP</span> 字段名<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="3">
<li>
<p>修改字段</p>
<ul>
<li>修改数据类型</li>
</ul>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">ALTER</span> <span class="token keyword">TABlE</span> 表名 <span class="token keyword">MODIFY</span> 字段名 新数据类型<span class="token punctuation">(</span>长度<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>修改字段名称和字段类型</li>
</ul>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">ALTER</span> <span class="token keyword">TABlE</span> 表名 CHANGE 旧字段名 新字段名 数据类型<span class="token punctuation">(</span>长度<span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token keyword">COMMENT</span> 字段注释<span class="token punctuation">]</span><span class="token punctuation">[</span>约束<span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
</ol>
</li>
</ol>
<h2 id="dml语句" tabindex="-1"><a class="header-anchor" href="#dml语句" aria-hidden="true">#</a> DML语句</h2>
<div class="hint-container tip">
<p class="hint-container-title">说明</p>
<p>理论上讲DML数据操作语言，应该包含增、删、改、查4个部分，但是由于数据查询的操作使用频繁，且种类繁多，我们将其抽取出来，单独作为一个章节，为DQL进行说明，这里就只了解增、删、改这三个操作。</p>
</div>
<h3 id="添加数据" tabindex="-1"><a class="header-anchor" href="#添加数据" aria-hidden="true">#</a> 添加数据</h3>
<ol>
<li>给指定字段添加数据</li>
</ol>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> 表名 <span class="token punctuation">(</span>字段<span class="token number">1</span><span class="token punctuation">,</span>字段<span class="token number">2</span><span class="token punctuation">,</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">,</span>字段n<span class="token punctuation">)</span> <span class="token keyword">VALUES</span> <span class="token punctuation">(</span>值<span class="token number">1</span><span class="token punctuation">,</span>值<span class="token number">2</span><span class="token punctuation">,</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">,</span>值n<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="2">
<li>给全部字段添加数据</li>
</ol>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> 表名 <span class="token keyword">VALUES</span> <span class="token punctuation">(</span>值<span class="token number">1</span><span class="token punctuation">,</span>值<span class="token number">2</span><span class="token punctuation">,</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">,</span>值n<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="3">
<li>批量添加数据</li>
</ol>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token comment">-- 指定字段添加数据</span>
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> 表名 <span class="token punctuation">(</span>字段<span class="token number">1</span><span class="token punctuation">,</span>字段<span class="token number">2</span><span class="token punctuation">,</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">,</span>字段n<span class="token punctuation">)</span> <span class="token keyword">VALUES</span> <span class="token punctuation">(</span>值<span class="token number">1</span><span class="token punctuation">,</span>值<span class="token number">2</span><span class="token punctuation">,</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">,</span>值n<span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">,</span><span class="token punctuation">(</span>值<span class="token number">1</span><span class="token punctuation">,</span>值<span class="token number">2</span><span class="token punctuation">,</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">,</span>值n<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">-- 全部字段添加数据</span>
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> 表名 <span class="token keyword">VALUES</span> <span class="token punctuation">(</span>值<span class="token number">1</span><span class="token punctuation">,</span>值<span class="token number">2</span><span class="token punctuation">,</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">,</span>值n<span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">,</span><span class="token punctuation">(</span>值<span class="token number">1</span><span class="token punctuation">,</span>值<span class="token number">2</span><span class="token punctuation">,</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">,</span>值n<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container danger">
<p class="hint-container-title">注意</p>
<ul>
<li>插入数据时指定的字段顺序需要于值的顺序是一一对应的</li>
<li>字符串和日期型数据应该包含在引号之中</li>
<li>插入的数据大小，应该在字段数据类型的规定范围以内</li>
</ul>
</div>
<h3 id="修改数据" tabindex="-1"><a class="header-anchor" href="#修改数据" aria-hidden="true">#</a> 修改数据</h3>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">UPDATE</span> 表名 <span class="token keyword">SET</span> 字段名<span class="token number">1</span>  <span class="token operator">=</span> 值<span class="token number">1</span><span class="token punctuation">,</span>字段名<span class="token number">2</span> <span class="token operator">=</span> 值<span class="token number">2</span><span class="token punctuation">,</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> <span class="token punctuation">[</span><span class="token keyword">WHERE</span> 条件<span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="hint-container danger">
<p class="hint-container-title">危险警告</p>
<p>涉及的数据的修改时，需要严格谨慎检查自己的SQL语句，这里修改数据的筛选条件可有可无，但是没有筛选条件时则会修改整张表的所有数据。</p>
</div>
<h3 id="删除数据" tabindex="-1"><a class="header-anchor" href="#删除数据" aria-hidden="true">#</a> 删除数据</h3>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">DELETE</span> <span class="token keyword">FROM</span> 表名 <span class="token punctuation">[</span><span class="token keyword">WHERE</span> 条件<span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="hint-container danger">
<p class="hint-container-title">危险警告</p>
<ul>
<li>涉及的数据的删除时，和前面的数据修改相同，需要严格谨慎检查自己的SQL语句，这里删除数据的筛选条件可有可无，但是没有筛选条件时则会删除整张表的所有数据。</li>
<li>DELETE语句只能按行删除数据，不能只删除某一个字段的值，不过可以使用UPDATE语句来进行修改。</li>
</ul>
</div>
<h2 id="dql语句" tabindex="-1"><a class="header-anchor" href="#dql语句" aria-hidden="true">#</a> DQL语句</h2>
<h3 id="dql语法" tabindex="-1"><a class="header-anchor" href="#dql语法" aria-hidden="true">#</a> DQL语法</h3>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span> 
    字段列表
<span class="token keyword">FROM</span>
    表名
<span class="token keyword">WHERE</span>
    条件列表
<span class="token keyword">GROUP</span> <span class="token keyword">BY</span>
    分组字段列表
<span class="token keyword">HAVING</span>
    分组后条件列表
<span class="token keyword">ORDER</span> <span class="token keyword">BY</span>
    排序字段列表
<span class="token keyword">LIMIT</span>
    分页参数
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="查询类型" tabindex="-1"><a class="header-anchor" href="#查询类型" aria-hidden="true">#</a> 查询类型</h3>
<ul>
<li>基本查询</li>
<li>条件查询（WHERE）</li>
<li>聚合查询（count、max、min、avg、sum）</li>
<li>分组查询（GROUP BY）</li>
<li>排序查询（ORDER BY）</li>
<li>分页查询（LIMIT）</li>
</ul>
<h3 id="基本查询" tabindex="-1"><a class="header-anchor" href="#基本查询" aria-hidden="true">#</a> 基本查询</h3>
<ol>
<li>查询多个字段</li>
</ol>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token comment">-- 指定字段</span>
<span class="token keyword">SELECT</span> 字段<span class="token number">1</span><span class="token punctuation">,</span>字段<span class="token number">2</span><span class="token punctuation">,</span>字段<span class="token number">3</span><span class="token punctuation">,</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> <span class="token keyword">FROM</span> 表名<span class="token punctuation">;</span>
<span class="token comment">-- 所有字段</span>
<span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> 表名<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2">
<li>设置别名</li>
</ol>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span> 字段<span class="token number">1</span> <span class="token punctuation">[</span><span class="token keyword">AS</span> 别名<span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span>字段<span class="token number">2</span> <span class="token punctuation">[</span><span class="token keyword">AS</span> 别名<span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">,</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> <span class="token keyword">FROM</span> 表名<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="3">
<li>去除重复记录</li>
</ol>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span> <span class="token keyword">DISTINCT</span> 字段列表 <span class="token keyword">FROM</span> 表名<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="条件查询" tabindex="-1"><a class="header-anchor" href="#条件查询" aria-hidden="true">#</a> 条件查询</h3>
<ol>
<li>语法</li>
</ol>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span> 字段列表 <span class="token keyword">FROM</span> 表名 <span class="token keyword">WHERE</span> 条件列表<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="2">
<li>条件</li>
</ol>
<table>
<thead>
<tr>
<th style="text-align:center">运算符</th>
<th style="text-align:center">功能</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">&gt;</td>
<td style="text-align:center">大于</td>
</tr>
<tr>
<td style="text-align:center">&gt;=</td>
<td style="text-align:center">大于等于</td>
</tr>
<tr>
<td style="text-align:center">&lt;</td>
<td style="text-align:center">小于</td>
</tr>
<tr>
<td style="text-align:center">&lt;=</td>
<td style="text-align:center">小于等于</td>
</tr>
<tr>
<td style="text-align:center">&lt;&gt;或者!=</td>
<td style="text-align:center">不等于</td>
</tr>
<tr>
<td style="text-align:center">BETWEEN...AND...</td>
<td style="text-align:center">在某个范围之内,包含临界值</td>
</tr>
<tr>
<td style="text-align:center">IN(...)</td>
<td style="text-align:center">在in之后的列表中，多选之</td>
</tr>
<tr>
<td style="text-align:center">LIKE 占位符</td>
<td style="text-align:center">模糊匹配(_匹配单个字符，%匹配任意个字符)</td>
</tr>
<tr>
<td style="text-align:center">IS NULL</td>
<td style="text-align:center">是否为NULL</td>
</tr>
<tr>
<td style="text-align:center">AND 或者 &amp;&amp;</td>
<td style="text-align:center">并且(同时成立)</td>
</tr>
<tr>
<td style="text-align:center">OR 或者 ||</td>
<td style="text-align:center">或者(成立任意一个即可)</td>
</tr>
<tr>
<td style="text-align:center">NOT 或者 !</td>
<td style="text-align:center">非，不是</td>
</tr>
</tbody>
</table>
<h3 id="聚合查询" tabindex="-1"><a class="header-anchor" href="#聚合查询" aria-hidden="true">#</a> 聚合查询</h3>
<h4 id="聚合函数" tabindex="-1"><a class="header-anchor" href="#聚合函数" aria-hidden="true">#</a> 聚合函数</h4>
<ol>
<li>介绍
将一列数据作为一个整体，进行纵向计算</li>
<li>常见的聚合函数</li>
</ol>
<table>
<thead>
<tr>
<th style="text-align:center">函数</th>
<th style="text-align:center">功能</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">count</td>
<td style="text-align:center">统计数量</td>
</tr>
<tr>
<td style="text-align:center">max</td>
<td style="text-align:center">最大值</td>
</tr>
<tr>
<td style="text-align:center">min</td>
<td style="text-align:center">最小值</td>
</tr>
<tr>
<td style="text-align:center">avg</td>
<td style="text-align:center">平均值</td>
</tr>
<tr>
<td style="text-align:center">sum</td>
<td style="text-align:center">求和</td>
</tr>
</tbody>
</table>
<ol start="3">
<li>语法</li>
</ol>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span> 聚合函数<span class="token punctuation">(</span>字段列表<span class="token punctuation">)</span> <span class="token keyword">FROM</span> 表名<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="hint-container tip">
<p class="hint-container-title">注意</p>
<p>null值不参与所有聚合函数运算。</p>
</div>
<h3 id="分组查询" tabindex="-1"><a class="header-anchor" href="#分组查询" aria-hidden="true">#</a> 分组查询</h3>
<ol>
<li>语法</li>
</ol>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span> 字段列表 <span class="token keyword">FROM</span> 表名 <span class="token punctuation">[</span><span class="token keyword">WHERE</span> 条件列表<span class="token punctuation">]</span> <span class="token keyword">GROUP</span> <span class="token keyword">BY</span> 分组字段名 <span class="token punctuation">[</span><span class="token keyword">HAVING</span> 分组后的过滤条件<span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="2">
<li>WHERE 和 HAVING 区别
执行时机不同：where是分组之前进行过滤，不符合where条件的不参与分组，而having是在分组之后进行过滤。
判断条件不同：where不能对聚合函数进行判断，而having可以。</li>
</ol>
<div class="hint-container info">
<p class="hint-container-title">注意</p>
<ul>
<li>执行顺序：where &gt;  聚合函数 &gt; having</li>
<li>分组以后，查询的字段一般为聚合函数和分组字段，查询其他字段无任何意义</li>
</ul>
</div>
<h3 id="排序查询" tabindex="-1"><a class="header-anchor" href="#排序查询" aria-hidden="true">#</a> 排序查询</h3>
<ol>
<li>语法</li>
</ol>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span> 字段列表 <span class="token keyword">FROM</span> 表名 <span class="token keyword">ORDER</span> <span class="token keyword">BY</span> 字段<span class="token number">1</span> <span class="token punctuation">[</span>排序方式<span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span>字段<span class="token number">2</span> <span class="token punctuation">[</span>排序方式<span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">,</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="2">
<li>排序方式</li>
</ol>
<ul>
<li>ASC : 升序(默认值)</li>
<li>DESC : 降序</li>
</ul>
<div class="hint-container info">
<p class="hint-container-title">提示</p>
<p>如果是多字段排序，只有当第一个字段的值相同时，才会根据第二个字段比较，以此类推。</p>
</div>
<h3 id="分页查询" tabindex="-1"><a class="header-anchor" href="#分页查询" aria-hidden="true">#</a> 分页查询</h3>
<ol>
<li>语法</li>
</ol>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span> 字段列表 <span class="token keyword">FROM</span> 表名 <span class="token keyword">LIMIT</span> 起始索引<span class="token punctuation">,</span>查询记录数<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="hint-container warning">
<p class="hint-container-title">注意</p>
<ul>
<li>起始索引从0开始，起始索引 = (查询的页码 - 1) * 每页显示的记录数</li>
<li>分页查询是数据库的方言，不同的数据库拥有不同的语法实现，MySQL中使用的是LIMIT子句实现</li>
<li>如果查询的是第一页数据，起始索引可以省略，直接简写为LIMIT 查询记录数，如LIMIT 10。</li>
</ul>
</div>
<h3 id="执行顺序" tabindex="-1"><a class="header-anchor" href="#执行顺序" aria-hidden="true">#</a> 执行顺序</h3>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span>  <span class="token comment">-- 5</span>
    字段列表
<span class="token keyword">FROM</span>    <span class="token comment">-- 1</span>
    表名
<span class="token keyword">WHERE</span>   <span class="token comment">-- 2</span>
    条件列表
<span class="token keyword">GROUP</span> <span class="token keyword">BY</span><span class="token comment">-- 3</span>
    分组字段列表
<span class="token keyword">HAVING</span>  <span class="token comment">-- 4</span>
    分组后条件列表
<span class="token keyword">ORDER</span> <span class="token keyword">BY</span><span class="token comment">-- 6</span>
    排序字段列表
<span class="token keyword">LIMIT</span>   <span class="token comment">-- 7</span>
    分页参数
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="dcl语句" tabindex="-1"><a class="header-anchor" href="#dcl语句" aria-hidden="true">#</a> DCL语句</h2>
<p>DCL全称为Data Control Language(数据控制语言)，用来管理数据库 用户，控制数据库的访问权限。</p>
<h3 id="用户控制" tabindex="-1"><a class="header-anchor" href="#用户控制" aria-hidden="true">#</a> 用户控制</h3>
<ol>
<li>查询用户</li>
</ol>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">USE</span> mysql<span class="token punctuation">;</span>
<span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> <span class="token keyword">user</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2">
<li>创建用户</li>
</ol>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token keyword">USER</span> <span class="token string">'用户名'</span><span class="token variable">@'主机名'</span> IDENTIFIED <span class="token keyword">BY</span> ‘密码’<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="3">
<li>删除用户</li>
</ol>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">DROP</span> <span class="token keyword">USER</span> ‘<span class="token string">'用户名'</span><span class="token variable">@'主机名'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="4">
<li>修改用户</li>
</ol>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">ALTER</span> <span class="token keyword">USER</span> <span class="token string">'用户名'</span><span class="token variable">@'主机名'</span> IDENTIFIED <span class="token keyword">WITH</span> mysql_native_password <span class="token keyword">BY</span> ‘新密码’<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="hint-container tip">
<p class="hint-container-title">注意</p>
<ul>
<li>在MySQL数据库中，所有的用户信息和用户权限信息都存储于mysql数据库内的表中。</li>
<li>主机名可以使用 % 通配。</li>
<li>这类SQL开发人员操作的比较少，通常是DBA(Database Adminstrator数据库管理员)使用</li>
</ul>
</div>
<h3 id="权限控制" tabindex="-1"><a class="header-anchor" href="#权限控制" aria-hidden="true">#</a> 权限控制</h3>
<p>MySQL中定义了很多种权限，但是常用的就以下几种：</p>
<table>
<thead>
<tr>
<th style="text-align:center">权限</th>
<th style="text-align:center">说明</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">ALL、ALL PRIVILEGES</td>
<td style="text-align:center">所有权限</td>
</tr>
<tr>
<td style="text-align:center">SELECT</td>
<td style="text-align:center">查询数据权限</td>
</tr>
<tr>
<td style="text-align:center">INSERT</td>
<td style="text-align:center">插入数据权限</td>
</tr>
<tr>
<td style="text-align:center">UPDATE</td>
<td style="text-align:center">更新数据权限</td>
</tr>
<tr>
<td style="text-align:center">DELETE</td>
<td style="text-align:center">删除数据权限</td>
</tr>
<tr>
<td style="text-align:center">ALTER</td>
<td style="text-align:center">修改表权限</td>
</tr>
<tr>
<td style="text-align:center">DROP</td>
<td style="text-align:center">删除数据库/数据表权限</td>
</tr>
<tr>
<td style="text-align:center">CREATE</td>
<td style="text-align:center">创建数据库/数据表权限</td>
</tr>
</tbody>
</table>
<ol>
<li>查询权限</li>
</ol>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">SHOW</span> GRANTS <span class="token keyword">FOR</span> <span class="token string">'用户名'</span><span class="token variable">@'主机名'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="2">
<li>授予权限</li>
</ol>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">GRANT</span> 权限列表 <span class="token keyword">ON</span> 数据库名<span class="token punctuation">.</span>表名 <span class="token keyword">TO</span> <span class="token string">'用户名'</span><span class="token variable">@'主机名'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="3">
<li>撤销权限</li>
</ol>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">REVOKE</span> 权限列表 <span class="token keyword">ON</span> 数据库名<span class="token punctuation">.</span>表名 <span class="token keyword">FROM</span> <span class="token string">'用户名'</span><span class="token variable">@'主机名'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="hint-container info">
<p class="hint-container-title">提示</p>
<ul>
<li>多个权限之间，使用逗号分隔</li>
<li>授权时，数据库名和表名可以使用 * 进行通配，代表所有。</li>
</ul>
</div>
</div></template>


