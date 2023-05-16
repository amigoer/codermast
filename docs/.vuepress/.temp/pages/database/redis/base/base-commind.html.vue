<template><div><h1 id="redis入门-基础通用指令" tabindex="-1"><a class="header-anchor" href="#redis入门-基础通用指令" aria-hidden="true">#</a> Redis入门 - 基础通用指令</h1>
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
</div></template>


