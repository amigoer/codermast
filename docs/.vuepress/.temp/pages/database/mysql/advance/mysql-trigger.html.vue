<template><div><h1 id="触发器" tabindex="-1"><a class="header-anchor" href="#触发器" aria-hidden="true">#</a> 触发器</h1>
<h2 id="介绍" tabindex="-1"><a class="header-anchor" href="#介绍" aria-hidden="true">#</a> 介绍</h2>
<p>触发器是于表有关的数据库对象，指在insert、update、delete之前或者之后，触发并执行触发器中定义的SQL语句集合。触发器的这种特性可以与协助应用在数据库端确保数据的完整性，日志记录，数据校验等操作。</p>
<p>使用别名OLD和NEW来引用触发器中发生变化的记录内容，这与其他的数据库是相似的。现在触发器还只支持行级触发，不支持语句级触发。</p>
<div class="hint-container note">
<p class="hint-container-title">举例</p>
<p>语句级触发：执行一次SQL，触发器会触发一次，无论影响多少行。
行级触发：如一个SQL语句更新了3行数据，则触发器会触发三次。</p>
</div>
<h2 id="类型" tabindex="-1"><a class="header-anchor" href="#类型" aria-hidden="true">#</a> 类型</h2>
<table>
<thead>
<tr>
<th style="text-align:center">触发器类型</th>
<th style="text-align:center">NEW和OLD</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">INSERT型触发器</td>
<td style="text-align:center">NEW表示将要或者已经新增的数据</td>
</tr>
<tr>
<td style="text-align:center">UPDATE型触发器</td>
<td style="text-align:center">OLD表示修改之前的数据，NEW表示将要或已经修改后的数据</td>
</tr>
<tr>
<td style="text-align:center">DELETE型触发器</td>
<td style="text-align:center">OLD表示将要或者已经删除的数据</td>
</tr>
</tbody>
</table>
<h2 id="语法" tabindex="-1"><a class="header-anchor" href="#语法" aria-hidden="true">#</a> 语法</h2>
<ul>
<li>创建</li>
</ul>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token keyword">TRIGGER</span> trigger_name
BEFORE<span class="token operator">/</span><span class="token keyword">AFTER</span> <span class="token keyword">INSERT</span><span class="token operator">/</span><span class="token keyword">UPDATE</span><span class="token operator">/</span><span class="token keyword">DELETE</span>
<span class="token keyword">ON</span> tbl_name <span class="token keyword">FOR EACH ROW</span> <span class="token comment">-- 行级触发器</span>
<span class="token keyword">BEGIN</span>
    trigger_stmt<span class="token punctuation">;</span>
<span class="token keyword">END</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>查看</li>
</ul>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">SHOW</span> TRIGGERS<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>删除</li>
</ul>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token comment">-- 如果没有指定schema_name，默认为当前数据库</span>
<span class="token keyword">DROP</span> <span class="token keyword">TRIGGER</span> <span class="token punctuation">[</span>schema_name<span class="token punctuation">.</span><span class="token punctuation">]</span>trigger_name<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


