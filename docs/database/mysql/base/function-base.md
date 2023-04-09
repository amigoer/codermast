---
order : 3
---
# 函数

::: info 函数
函数是一段可以直接被另一段程序调用的程序或者代码。
:::

## 字符串函数
MySQL中内置了很多的字符串函数，常用的几个如下所示:

|函数|功能|
|:---:|:---:|
|CONCAT(S1,S2,...,Sn)|字符串拼接，将S1、S2、...、Sn按照顺序拼接成一个字符串|
|LOWER(str) | 将字符串str全部转成小写|
|UPPER(str) | 将字符串str全部转成大写|
|LPAD(str,n,pad)|左填充，用字符串pad对str的左边进行填充，达到n个字符串长度|
|RPAD(str,n,pad)|右填充，用字符串pad对str的右边进行填充，达到n个字符串长度|
|TRIM(str)|去掉字符串头部和尾部的空格|
|SUBSTRING(str,start,len)|返回字符串str从start位置开始的len个长度的字符串|

## 数值函数
|函数|功能|
|:---:|:---:|
|CEIL(x)|向上取整|
|FLOOR(x)|向下取整|
|MOD(x,y)|x对y取模，x%y|
|RAND()|返回0～1之间的随机数|
|ROUND(x,y)|求参数x的四舍五入值，保留y位小数|


## 日期函数
|函数|功能|
|:---:|:---:|
|CURDATE()|返回当前日期|
|CURTIME()|返回当前时间|
|NOW()|返回当前日期和时间|
|YEAR(date)|获取指定日期date的年份|
|MONTH(date)|获取指定日期date的月份|
|DAY(date)|获取指定日期date的天数|
|DATE_ADD(date,INTERVAL expr type)|返回一个日期/时间值加上一个时间间隔expr后的时间值|
|DATEDIFF(date1,date2)|返回起始时间date1和结束时间 date2 之间相差的天数|
## 流程函数
流程函数也是很常用的一类函数，可以在SQL语句中实现条件筛选，从而提高语句的效率。
|函数|功能|
|:---:|:---:|
|IF(value,t,f)|如果value为true，则返回t，否则返回f|
|IFNULL(value1,value2)|如果value1不为null，则返回value1，否则返回value2|
|CASE WHEN [val1] THEN [res1] WHEN [val2] THEN [res2]... ELSE [defult] END|如果val1为true，则返回res1，如果val2为true，则返回res2，...，否则返回defult|
|CASE [expr] WHEN [val1] THEN [res1] WHEN [val2] THEN [res2] ELSE [defult] END|如果expr的值等于val1，返回res1，expr的值等于val2，返回res2，...，否则返回defult| 