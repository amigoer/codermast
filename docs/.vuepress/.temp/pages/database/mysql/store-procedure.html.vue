<template><div><h1 id="mysql进阶-存储过程" tabindex="-1"><a class="header-anchor" href="#mysql进阶-存储过程" aria-hidden="true">#</a> MySQL进阶 - 存储过程</h1>
<h2 id="介绍" tabindex="-1"><a class="header-anchor" href="#介绍" aria-hidden="true">#</a> 介绍</h2>
<p>存储过程是事先经过编译并且存储在数据库中的一段SQL语句的集合，调用存储过程可以简化应用开发人员的很多工作，减少数据在数据库和应用服务器之间的传输，对于提高数据处理的效率是有好处的。</p>
<p>存储过程思想上很简单，就是数据库SQL语言层面的代码封装与重用。</p>
<div class="hint-container info">
<p class="hint-container-title">个人理解</p>
<p>这里我个人理解的是 类似于 编程语言中的函数，将一些语句封装起来，直接进行函数的调用即可。</p>
</div>
<p>特点</p>
<ul>
<li>封装、复用</li>
<li>可以接收参数，也可以返回数据</li>
<li>减少网络交互，效率提升</li>
</ul>
<h2 id="基本语法" tabindex="-1"><a class="header-anchor" href="#基本语法" aria-hidden="true">#</a> 基本语法</h2>
<ul>
<li>创建</li>
</ul>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token keyword">PROCEDURE</span> 存储过程名称<span class="token punctuation">(</span><span class="token punctuation">[</span>参数列表<span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token keyword">BEGIN</span>
    <span class="token comment">-- SQL语句</span>
<span class="token keyword">END</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container danger">
<p class="hint-container-title">注意</p>
<p>在命令行中，执行创建存储过程的SQL时，需要通过关键字delimiter指定SQL语句的结束符。</p>
<p>例如：delimiter $$ ，即定义为 $$ 为结束标识符。</p>
<p>则此时不会以默认的 ; 为结束标识符，而是我们设置的$$，但是存储过程中的SQL语句，还是以 ; 为结束符号。</p>
</div>
<ul>
<li>调用</li>
</ul>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">CALL</span> 名称<span class="token punctuation">(</span><span class="token punctuation">[</span>参数列表<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>查看</li>
</ul>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token comment">-- 查询指定数据库的存储过程及状态信息</span>
<span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> INFORMATION_SCHEMA_ROUTINES <span class="token keyword">WHERE</span> ROUTINE_SCHEMA <span class="token operator">=</span> <span class="token string">'xxx'</span>；
<span class="token comment">-- 查询某个存储过程的定义</span>
<span class="token keyword">SHOW</span> <span class="token keyword">CREATE</span> <span class="token keyword">PROCEDURE</span> 存储过程名称<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>删除</li>
</ul>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">DROP</span> <span class="token keyword">PROCEDURE</span> <span class="token punctuation">[</span><span class="token keyword">IF</span> <span class="token keyword">EXISTS</span><span class="token punctuation">]</span> 存储过程名称<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="变量" tabindex="-1"><a class="header-anchor" href="#变量" aria-hidden="true">#</a> 变量</h2>
<h3 id="系统变量" tabindex="-1"><a class="header-anchor" href="#系统变量" aria-hidden="true">#</a> 系统变量</h3>
<p>系统变量是MySQL服务器提供，不是用户定义的，属于服务器层面。分为全面变量(<code v-pre>GLOBAL</code>)、会话变量(<code v-pre>SESSION</code>)。</p>
<ul>
<li>查看系统变量</li>
</ul>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token comment">-- 查看所有系统变量</span>
<span class="token keyword">SHOW</span> <span class="token punctuation">[</span><span class="token keyword">SESSION</span> <span class="token operator">|</span> <span class="token keyword">GLOBAL</span><span class="token punctuation">]</span> VARIABLES<span class="token punctuation">;</span>

<span class="token comment">-- 可以通过LIKE模糊匹配的方式查找变量</span>
<span class="token keyword">SHOW</span> <span class="token punctuation">[</span><span class="token keyword">SESSION</span> <span class="token operator">|</span> <span class="token keyword">GLOBAL</span><span class="token punctuation">]</span> VARIABLES <span class="token operator">LIKE</span> <span class="token string">'.....'</span><span class="token punctuation">;</span>

<span class="token comment">-- 查看指定变量的值</span>
<span class="token keyword">SELECT</span> @@<span class="token punctuation">[</span><span class="token keyword">SESSION</span><span class="token punctuation">.</span> <span class="token operator">|</span> <span class="token keyword">GLOBAL</span><span class="token punctuation">.</span><span class="token punctuation">]</span>系统变量名<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>设置系统变量</li>
</ul>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">SET</span> <span class="token punctuation">[</span><span class="token keyword">SESSION</span> <span class="token operator">|</span> <span class="token keyword">GLOBAL</span><span class="token punctuation">]</span> 系统变量名 <span class="token operator">=</span> 值<span class="token punctuation">;</span>
<span class="token keyword">SET</span> @@<span class="token punctuation">[</span><span class="token keyword">SESSION</span><span class="token punctuation">.</span> <span class="token operator">|</span> <span class="token keyword">GLOBAL</span><span class="token punctuation">.</span><span class="token punctuation">]</span>系统变量名 <span class="token operator">=</span> 值<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container danger">
<p class="hint-container-title">注意</p>
<p>如果没有指定SESSION | GLOBAL，默认是SESSION，会话变量。</p>
<p>MySQL服务重新启动之后，所设置的全局参数会失效，要想不失效，可以在 <code v-pre>/etc/my.cnf</code> 中配置。</p>
</div>
<h3 id="用户自定义变量" tabindex="-1"><a class="header-anchor" href="#用户自定义变量" aria-hidden="true">#</a> 用户自定义变量</h3>
<p>用户自定义变量是用户根据需要自己定义的变量，用户变量不用提前声明，在用的时候直接用&quot;@变量名&quot; 使用就可以。其作用域为当前的连接。</p>
<ul>
<li>赋值</li>
</ul>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token comment">-- 使用SET</span>
<span class="token keyword">SET</span> <span class="token variable">@var_name</span> <span class="token operator">=</span> expr<span class="token punctuation">[</span><span class="token punctuation">,</span><span class="token variable">@var_name</span> <span class="token operator">=</span> expr<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">;</span>
<span class="token keyword">SET</span> <span class="token variable">@var_name</span> :<span class="token operator">=</span> expr<span class="token punctuation">[</span><span class="token punctuation">,</span><span class="token variable">@var_name</span> :<span class="token operator">=</span> expr<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">;</span>
<span class="token comment">-- 使用SELECT</span>
<span class="token keyword">SELECT</span> <span class="token variable">@var_anme</span> :<span class="token operator">=</span> expr <span class="token punctuation">[</span><span class="token punctuation">,</span><span class="token variable">@var_name</span> :<span class="token operator">=</span> expr<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">;</span>
<span class="token keyword">SELECT</span> 字段名 <span class="token keyword">INTO</span> <span class="token variable">@var_name</span> <span class="token keyword">FROM</span> 表名<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container info">
<p class="hint-container-title">提示</p>
<p>在赋值时我们能看到有两种写法， <code v-pre>=</code> 和 <code v-pre>:=</code> 。这两个实际上没有区别，但是在MySQL中，判断相等的运算符是 <code v-pre>=</code> 而不是 <code v-pre>==</code> ，这就容易造成混淆，所以推荐使用 <code v-pre>:=</code></p>
</div>
<ul>
<li>使用</li>
</ul>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">SELECT</span> <span class="token variable">@var_name</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="hint-container danger">
<p class="hint-container-title">注意</p>
<p>用户定义的变量无需对其进行声明或者初始化，只不过获取到的值为NULL</p>
</div>
<h3 id="局部变量" tabindex="-1"><a class="header-anchor" href="#局部变量" aria-hidden="true">#</a> 局部变量</h3>
<p>局部变量是根据需要定义的在局部生效的变量，访问之前，需要使用<code v-pre>DECLARE</code>声明，可以作存储过程内的局部变量和输入参数，局部变量的范围是在其内声明的BEGIN......END块。</p>
<ul>
<li>声明</li>
</ul>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">DECLARE</span> 变量名 变量类型 <span class="token punctuation">[</span><span class="token keyword">DEFAULT</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>变量类型就是数据库字段类型:INT、BIGINT、CHAR、VARCHAR、DATE、TIME等。</p>
<ul>
<li>赋值</li>
</ul>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">SET</span> 变量名 <span class="token operator">=</span> 值<span class="token punctuation">;</span>
<span class="token keyword">SET</span> 变量名 :<span class="token operator">=</span> 值<span class="token punctuation">;</span>
<span class="token keyword">SELECT</span> 字段名 <span class="token keyword">INTO</span> 变量名 <span class="token keyword">FROM</span> 表名 <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="if判断" tabindex="-1"><a class="header-anchor" href="#if判断" aria-hidden="true">#</a> IF判断</h2>
<ul>
<li>语法</li>
</ul>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">IF</span> 条件<span class="token number">1</span> <span class="token keyword">THEN</span>
    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token keyword">ELSEIF</span> 条件<span class="token number">2</span> <span class="token keyword">THEN</span>   <span class="token comment">-- 可选</span>
    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token keyword">ELSE</span>               <span class="token comment">-- 可选</span>
    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token keyword">END</span> <span class="token keyword">IF</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="参数" tabindex="-1"><a class="header-anchor" href="#参数" aria-hidden="true">#</a> 参数</h2>
<table>
<thead>
<tr>
<th style="text-align:center">类型</th>
<th style="text-align:center">含义</th>
<th style="text-align:center">备注</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">IN</td>
<td style="text-align:center">该类参数作为输入，也就是需要调用时传入值</td>
<td style="text-align:center">默认</td>
</tr>
<tr>
<td style="text-align:center">OUT</td>
<td style="text-align:center">该类参数作为输出，也就是该参数可以作为返回值</td>
<td style="text-align:center"></td>
</tr>
<tr>
<td style="text-align:center">INOUT</td>
<td style="text-align:center">既可以作为输入参数，也可以作为输出参数</td>
<td style="text-align:center"></td>
</tr>
</tbody>
</table>
<ul>
<li>用法</li>
</ul>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token keyword">PROCEDURE</span> 存储过程名称<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token operator">IN</span><span class="token operator">/</span><span class="token keyword">OUT</span><span class="token operator">/</span><span class="token keyword">INOUT</span> 参数名 参数类型<span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token keyword">BEGIN</span>
    <span class="token comment">-- SQL语句</span>
<span class="token keyword">END</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="case" tabindex="-1"><a class="header-anchor" href="#case" aria-hidden="true">#</a> case</h2>
<ul>
<li>语法1</li>
</ul>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">CASE</span> case_value
    <span class="token keyword">WHEN</span> when_value1 <span class="token keyword">THEN</span> statement_list1
    <span class="token punctuation">[</span><span class="token keyword">WHEN</span> when_value2 <span class="token keyword">THEN</span> statement_list2<span class="token punctuation">]</span>
    <span class="token punctuation">[</span><span class="token keyword">ELSE</span> statement_list<span class="token punctuation">]</span>
<span class="token keyword">END</span> <span class="token keyword">CASE</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>语法2</li>
</ul>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">CASE</span> 
    <span class="token keyword">WHEN</span> search_condition1 <span class="token keyword">THEN</span> statement_list1
    <span class="token punctuation">[</span><span class="token keyword">WHEN</span> search_condition2 <span class="token keyword">THEN</span> statement_list2<span class="token punctuation">]</span>
    <span class="token punctuation">[</span><span class="token keyword">ELSE</span> statement_list<span class="token punctuation">]</span>
<span class="token keyword">END</span> <span class="token keyword">CASE</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="循环" tabindex="-1"><a class="header-anchor" href="#循环" aria-hidden="true">#</a> 循环</h2>
<h3 id="while循环" tabindex="-1"><a class="header-anchor" href="#while循环" aria-hidden="true">#</a> WHILE循环</h3>
<p>while循环时有条件的循环控制语句。满足条件后，再执行循环体中的SQL语句，具体语法为：</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token comment">-- 先判定条件，如果条件为true，则执行逻辑，否则，不执行逻辑</span>
<span class="token keyword">WHILE</span> 条件 <span class="token keyword">DO</span>
    <span class="token comment">-- SQL逻辑</span>
<span class="token keyword">END</span> <span class="token keyword">WHILE</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="repeat循环" tabindex="-1"><a class="header-anchor" href="#repeat循环" aria-hidden="true">#</a> REPEAT循环</h3>
<p>repeat是有条件的循环控制语句，当满足条件的时候推出循环。具体语法为：</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token comment">-- 先执行一次逻辑，然后判定逻辑是否满足，如果满足，则退出。如果不满足，则继续下一次循环。</span>
<span class="token keyword">REPEAT</span>
    <span class="token keyword">SQL</span>逻辑
    UNTIL条件
<span class="token keyword">END</span> <span class="token keyword">REPEAT</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container info">
<p class="hint-container-title">提示</p>
<p>类似于编程语言中的 do ... while() 循环，但是repeat是满足条件则推出和do while刚好相反。</p>
</div>
<h3 id="loop循环" tabindex="-1"><a class="header-anchor" href="#loop循环" aria-hidden="true">#</a> LOOP循环</h3>
<p>Loop实现简单的循环，如果不在SQL逻辑中增加退出循环的条件，可以用其来实现简单的死循环。loop可以配合以下两个语句使用：</p>
<ul>
<li>LEAVE : 必须用在循环中，退出循环。</li>
<li>ITERATE : 必须用在循环中，作用是跳过当前循环剩下的语句，直接进入下一次循环。</li>
</ul>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token punctuation">[</span>begin_lable:<span class="token punctuation">]</span> <span class="token keyword">LOOP</span>
    <span class="token keyword">SQL</span>逻辑
<span class="token keyword">END</span> <span class="token keyword">LOOP</span> <span class="token punctuation">[</span>end_lable<span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token comment">-- 退出指定标记的循环体</span>
<span class="token keyword">LEAVE</span> lable<span class="token punctuation">;</span>

<span class="token comment">-- 直接进入下一次循环</span>
<span class="token keyword">ITERATE</span> lable<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container info">
<p class="hint-container-title">提示</p>
<p><code v-pre>leave</code>和<code v-pre>iterate</code>相当于编程语言中的 <code v-pre>break</code>和<code v-pre>continue</code>关键字的用法。</p>
</div>
<h2 id="游标" tabindex="-1"><a class="header-anchor" href="#游标" aria-hidden="true">#</a> 游标</h2>
<p>游标CURSOR是用来存储查询结果的数据类型，在存储过程和函数中可以使用游标对结果集进行循环的处理。游标的使用包括游标的声明、OPEN、FETCH和CLOSE，其语法如下：</p>
<ul>
<li>声明游标</li>
</ul>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code>DECLEAR 游标名称 <span class="token keyword">CURSOR</span> <span class="token keyword">FOR</span> 查询语句<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>打开游标</li>
</ul>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">OPEN</span> 游标名称<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>获取游标记录</li>
</ul>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">FETCH</span> 游标名称 <span class="token keyword">INTO</span> 变量<span class="token punctuation">[</span><span class="token punctuation">,</span>变量<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>关闭游标</li>
</ul>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">CLOSE</span> 游标名称<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="条件处理程序" tabindex="-1"><a class="header-anchor" href="#条件处理程序" aria-hidden="true">#</a> 条件处理程序</h2>
<p>条件处理程序Handler可以用来定义在流程控制结构执行过程中遇到问题时相应的处理步骤。具体语法为：</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">DECLARE</span> handler_action <span class="token keyword">HANDLER</span> <span class="token keyword">FOR</span> condition_value <span class="token punctuation">[</span><span class="token punctuation">,</span>condition_value<span class="token punctuation">]</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> statement<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>handler_action
<ul>
<li>CONTINUE:继续执行当前程序</li>
<li>EXIT:终止执行当前程序</li>
</ul>
</li>
<li>condition_value
<ul>
<li>SQLSTATE sqlstate_value:状态码，如02000</li>
<li>SQLWARNING:所有以01开头的SQLSTATE代码的简写</li>
<li>NOT FOUND:所有以02开头的SQLSTATE代码的简写</li>
<li>SQLEXCEPTION:所有没有被SQLWARNING或者NOT FOUND捕获的SQLSTATE代码的简写</li>
</ul>
</li>
</ul>
<h2 id="存储函数" tabindex="-1"><a class="header-anchor" href="#存储函数" aria-hidden="true">#</a> 存储函数</h2>
<p>存储函数就是有返回值的存储过程，存储函数的参数只能是IN类型的，具体语法如下：</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token keyword">FUNCTION</span> 存储函数名称<span class="token punctuation">(</span><span class="token punctuation">[</span>参数列表<span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token keyword">RETURNS</span> <span class="token keyword">type</span> <span class="token punctuation">[</span>characteristic <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">]</span>
<span class="token keyword">BEGIN</span>
    <span class="token comment">-- SQL语句</span>
    <span class="token keyword">RETURN</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">;</span>
<span class="token keyword">END</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>characteristic说明：</p>
<ul>
<li>DETERMINSRIC：相同的输入参数总是产生相同的结果</li>
<li>NO SQL：不包含SQL语句</li>
<li>READS SQL DATA：包含读取数据的语句，但不包含写入数据的语句、</li>
</ul>
<div class="hint-container warning">
<p class="hint-container-title">比较</p>
<p>存储函数就是必须有返回值的存储过程，存储过程的范围 &gt; 存储函数的范围。</p>
<p>存储函数是通过函数调用，而存储过程是使用<code v-pre>call</code>调用</p>
</div>
</div></template>


