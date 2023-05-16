<template><div><h1 id="数据类型及其操作指令" tabindex="-1"><a class="header-anchor" href="#数据类型及其操作指令" aria-hidden="true">#</a> 数据类型及其操作指令</h1>
<h2 id="通用指令" tabindex="-1"><a class="header-anchor" href="#通用指令" aria-hidden="true">#</a> 通用指令</h2>
<p>在正式介绍Redis数据结构及其操作指令之前，我们需要先掌握一些最基础的通用指令。</p>
<p>这些都是Redis操作过程中的一些常见指令</p>
<table>
<thead>
<tr>
<th style="text-align:center">指令</th>
<th style="text-align:center">描述</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">keys</td>
<td style="text-align:center">查看符合模板的所有key，不建议在⽣产环境设备上使⽤</td>
</tr>
<tr>
<td style="text-align:center">del</td>
<td style="text-align:center">删除⼀个指定的key</td>
</tr>
<tr>
<td style="text-align:center">esists</td>
<td style="text-align:center">判断key是否存在</td>
</tr>
<tr>
<td style="text-align:center">expire</td>
<td style="text-align:center">给⼀个key设置有效期，有效期到期时该key会被⾃动删除</td>
</tr>
<tr>
<td style="text-align:center">ttl</td>
<td style="text-align:center">查看⼀个KEY的剩余有效期</td>
</tr>
<tr>
<td style="text-align:center">quit</td>
<td style="text-align:center">退出</td>
</tr>
<tr>
<td style="text-align:center">shutdown</td>
<td style="text-align:center">关闭服务器</td>
</tr>
<tr>
<td style="text-align:center">select [0-15]</td>
<td style="text-align:center">选择指定的数据库</td>
</tr>
</tbody>
</table>
<div class="hint-container tip">
<p class="hint-container-title">help指令</p>
<p>可以通过 help [command]可以查看⼀个命令的具体⽤法！</p>
<p>例如查看set指令的帮助文档：<code v-pre>help set</code></p>
</div>
<h2 id="数据结构" tabindex="-1"><a class="header-anchor" href="#数据结构" aria-hidden="true">#</a> 数据结构</h2>
<p>Redis支持五种数据类型：string（字符串），hash（哈希），list（列表），set（集合）及zset(sorted set：有序集合)。</p>
<h3 id="string-字符串" tabindex="-1"><a class="header-anchor" href="#string-字符串" aria-hidden="true">#</a> String 字符串</h3>
<p>string 是 redis 最基本的数据类型，可以理解成与 Memcached 一模一样的类型，一个 key 对应一个 value。</p>
<p>string 类型是二进制安全的。意思是 redis 的 string 可以包含任何数据。比如jpg图片或者序列化的对象。</p>
<p>string 类型是 Redis 最基本的数据类型，string 类型的值最大能存储 512MB。</p>
<h3 id="hash-哈希" tabindex="-1"><a class="header-anchor" href="#hash-哈希" aria-hidden="true">#</a> Hash 哈希</h3>
<h3 id="list-列表" tabindex="-1"><a class="header-anchor" href="#list-列表" aria-hidden="true">#</a> List 列表</h3>
<h3 id="set-集合" tabindex="-1"><a class="header-anchor" href="#set-集合" aria-hidden="true">#</a> Set 集合</h3>
<h3 id="zset-有序集合" tabindex="-1"><a class="header-anchor" href="#zset-有序集合" aria-hidden="true">#</a> Zset 有序集合</h3>
</div></template>


