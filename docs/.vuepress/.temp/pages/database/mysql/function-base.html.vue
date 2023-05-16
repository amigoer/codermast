<template><div><h1 id="mysql基础-函数" tabindex="-1"><a class="header-anchor" href="#mysql基础-函数" aria-hidden="true">#</a> MySQL基础 - 函数</h1>
<div class="hint-container info">
<p class="hint-container-title">函数</p>
<p>函数是一段可以直接被另一段程序调用的程序或者代码。</p>
</div>
<h2 id="字符串函数" tabindex="-1"><a class="header-anchor" href="#字符串函数" aria-hidden="true">#</a> 字符串函数</h2>
<p>MySQL中内置了很多的字符串函数，常用的几个如下所示:</p>
<table>
<thead>
<tr>
<th style="text-align:center">函数</th>
<th style="text-align:center">功能</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">CONCAT(S1,S2,...,Sn)</td>
<td style="text-align:center">字符串拼接，将S1、S2、...、Sn按照顺序拼接成一个字符串</td>
</tr>
<tr>
<td style="text-align:center">LOWER(str)</td>
<td style="text-align:center">将字符串str全部转成小写</td>
</tr>
<tr>
<td style="text-align:center">UPPER(str)</td>
<td style="text-align:center">将字符串str全部转成大写</td>
</tr>
<tr>
<td style="text-align:center">LPAD(str,n,pad)</td>
<td style="text-align:center">左填充，用字符串pad对str的左边进行填充，达到n个字符串长度</td>
</tr>
<tr>
<td style="text-align:center">RPAD(str,n,pad)</td>
<td style="text-align:center">右填充，用字符串pad对str的右边进行填充，达到n个字符串长度</td>
</tr>
<tr>
<td style="text-align:center">TRIM(str)</td>
<td style="text-align:center">去掉字符串头部和尾部的空格</td>
</tr>
<tr>
<td style="text-align:center">SUBSTRING(str,start,len)</td>
<td style="text-align:center">返回字符串str从start位置开始的len个长度的字符串</td>
</tr>
</tbody>
</table>
<h2 id="数值函数" tabindex="-1"><a class="header-anchor" href="#数值函数" aria-hidden="true">#</a> 数值函数</h2>
<table>
<thead>
<tr>
<th style="text-align:center">函数</th>
<th style="text-align:center">功能</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">CEIL(x)</td>
<td style="text-align:center">向上取整</td>
</tr>
<tr>
<td style="text-align:center">FLOOR(x)</td>
<td style="text-align:center">向下取整</td>
</tr>
<tr>
<td style="text-align:center">MOD(x,y)</td>
<td style="text-align:center">x对y取模，x%y</td>
</tr>
<tr>
<td style="text-align:center">RAND()</td>
<td style="text-align:center">返回0～1之间的随机数</td>
</tr>
<tr>
<td style="text-align:center">ROUND(x,y)</td>
<td style="text-align:center">求参数x的四舍五入值，保留y位小数</td>
</tr>
</tbody>
</table>
<h2 id="日期函数" tabindex="-1"><a class="header-anchor" href="#日期函数" aria-hidden="true">#</a> 日期函数</h2>
<table>
<thead>
<tr>
<th style="text-align:center">函数</th>
<th style="text-align:center">功能</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">CURDATE()</td>
<td style="text-align:center">返回当前日期</td>
</tr>
<tr>
<td style="text-align:center">CURTIME()</td>
<td style="text-align:center">返回当前时间</td>
</tr>
<tr>
<td style="text-align:center">NOW()</td>
<td style="text-align:center">返回当前日期和时间</td>
</tr>
<tr>
<td style="text-align:center">YEAR(date)</td>
<td style="text-align:center">获取指定日期date的年份</td>
</tr>
<tr>
<td style="text-align:center">MONTH(date)</td>
<td style="text-align:center">获取指定日期date的月份</td>
</tr>
<tr>
<td style="text-align:center">DAY(date)</td>
<td style="text-align:center">获取指定日期date的天数</td>
</tr>
<tr>
<td style="text-align:center">DATE_ADD(date,INTERVAL expr type)</td>
<td style="text-align:center">返回一个日期/时间值加上一个时间间隔expr后的时间值</td>
</tr>
<tr>
<td style="text-align:center">DATEDIFF(date1,date2)</td>
<td style="text-align:center">返回起始时间date1和结束时间 date2 之间相差的天数</td>
</tr>
</tbody>
</table>
<h2 id="流程函数" tabindex="-1"><a class="header-anchor" href="#流程函数" aria-hidden="true">#</a> 流程函数</h2>
<p>流程函数也是很常用的一类函数，可以在SQL语句中实现条件筛选，从而提高语句的效率。</p>
<table>
<thead>
<tr>
<th style="text-align:center">函数</th>
<th style="text-align:center">功能</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">IF(value,t,f)</td>
<td style="text-align:center">如果value为true，则返回t，否则返回f</td>
</tr>
<tr>
<td style="text-align:center">IFNULL(value1,value2)</td>
<td style="text-align:center">如果value1不为null，则返回value1，否则返回value2</td>
</tr>
<tr>
<td style="text-align:center">CASE WHEN [val1] THEN [res1] WHEN [val2] THEN [res2]... ELSE [defult] END</td>
<td style="text-align:center">如果val1为true，则返回res1，如果val2为true，则返回res2，...，否则返回defult</td>
</tr>
<tr>
<td style="text-align:center">CASE [expr] WHEN [val1] THEN [res1] WHEN [val2] THEN [res2] ELSE [defult] END</td>
<td style="text-align:center">如果expr的值等于val1，返回res1，expr的值等于val2，返回res2，...，否则返回defult</td>
</tr>
</tbody>
</table>
</div></template>


