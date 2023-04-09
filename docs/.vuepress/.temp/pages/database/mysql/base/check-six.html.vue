<template><div><h1 id="约束" tabindex="-1"><a class="header-anchor" href="#约束" aria-hidden="true">#</a> 约束</h1>
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
</div></template>


