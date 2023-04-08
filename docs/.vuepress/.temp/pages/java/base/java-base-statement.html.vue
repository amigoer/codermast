<template><div><h1 id="流程控制" tabindex="-1"><a class="header-anchor" href="#流程控制" aria-hidden="true">#</a> 流程控制</h1>
<h2 id="💥条件语句" tabindex="-1"><a class="header-anchor" href="#💥条件语句" aria-hidden="true">#</a> 💥条件语句</h2>
<h3 id="_1️⃣单分支" tabindex="-1"><a class="header-anchor" href="#_1️⃣单分支" aria-hidden="true">#</a> 1️⃣单分支</h3>
<ul>
<li>语法：</li>
</ul>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">if</span> <span class="token punctuation">(</span>布尔表达式<span class="token punctuation">)</span><span class="token punctuation">{</span>
	<span class="token comment">// 如果布尔表达式为true将执行的语句</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>如果布尔表达式为 <code v-pre>true</code> 那么就执行里面的语句。否则不执行。</p>
</blockquote>
<h3 id="_2️⃣双分支" tabindex="-1"><a class="header-anchor" href="#_2️⃣双分支" aria-hidden="true">#</a> 2️⃣双分支</h3>
<ul>
<li>语法:</li>
</ul>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">if</span> <span class="token punctuation">(</span>布尔表达式<span class="token punctuation">)</span><span class="token punctuation">{</span>
	<span class="token comment">// 如果布尔表达式为true将执行的语句</span>
	<span class="token comment">// 语句1</span>
<span class="token punctuation">}</span><span class="token keyword">else</span> <span class="token punctuation">{</span>
	<span class="token comment">// 如果布尔表达式为false将执行的语句</span>
	<span class="token comment">// 语句2</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>如果布尔表达式为true 那么就执行语句1，否则执行 语句2</p>
</blockquote>
<h3 id="_3️⃣多分支" tabindex="-1"><a class="header-anchor" href="#_3️⃣多分支" aria-hidden="true">#</a> 3️⃣多分支</h3>
<ul>
<li>语法:</li>
</ul>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">if</span> <span class="token punctuation">(</span>布尔表达式<span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	<span class="token comment">// 如果布尔表达式1为true将执行的语句</span>
	<span class="token comment">// 语句1</span>
<span class="token punctuation">}</span><span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>布尔表达式<span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	<span class="token comment">// 如果布尔表达式2为true将执行的语句</span>
	<span class="token comment">// 语句2</span>
<span class="token punctuation">}</span><span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>布尔表达式<span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	<span class="token comment">// 如果布尔表达式3为true将执行的语句</span>
	<span class="token comment">// 语句3</span>
<span class="token punctuation">}</span><span class="token keyword">else</span> <span class="token punctuation">{</span>
	<span class="token comment">// 如果布尔表达式1,2,3均为false将执行的语句</span>
	<span class="token comment">// 语句4</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>如果布尔表达式1为true 那么就执行语句1；如果布尔表达式2为true，那么执行语句2，依此类推，直到所有的语句都为 false，那么执行语句4；</p>
</blockquote>
<p>  这里需要了解的是，如果按照我们的表达式同时有两个或两个以上的语句都为true，那么谁在先就执行谁，一旦if语句进入执行，执行里面的语句后，则直接退出，后续语句不再进行执行。
  此外这里最后的else语句可以省略，即如果均不为true，则什么也不执行。
  条件语句是支持无限嵌套的，如：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">if</span>	<span class="token punctuation">(</span>布尔表达式<span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	<span class="token keyword">if</span>	<span class="token punctuation">(</span>布尔表达式<span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
		<span class="token comment">// 执行语句</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="✨循环语句" tabindex="-1"><a class="header-anchor" href="#✨循环语句" aria-hidden="true">#</a> ✨循环语句</h2>
<h3 id="_1️⃣for循环" tabindex="-1"><a class="header-anchor" href="#_1️⃣for循环" aria-hidden="true">#</a> 1️⃣For循环</h3>
<ul>
<li>语法</li>
</ul>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">for</span> <span class="token punctuation">(</span>变量初始化<span class="token punctuation">;</span>循环条件<span class="token punctuation">;</span>变量更新<span class="token punctuation">)</span><span class="token punctuation">{</span>
	<span class="token comment">// 循环语句</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>当循环条件为true时，则循环继续执行，否则退出循环。
在一次循环结束后，执行变量更新语句。</p>
</blockquote>
<h3 id="_2️⃣增强for循环" tabindex="-1"><a class="header-anchor" href="#_2️⃣增强for循环" aria-hidden="true">#</a> 2️⃣增强For循环</h3>
<p>  所谓增强For循环是Java5中引入的一种主要用于数组等数据结构遍历的循环。</p>
<ul>
<li>语法</li>
</ul>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">for</span> <span class="token punctuation">(</span>声明语句 <span class="token operator">:</span> 表达式<span class="token punctuation">)</span><span class="token punctuation">{</span>
	<span class="token comment">// 循环语句</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>这里的声明语句，内的变量为表达式的元素代表，会根据循环依次输出。
直到所有的元素均输出完毕后，循环结束。
一般适用于线性的有具体顺序的数据集合结构。</p>
</blockquote>
<h3 id="_3️⃣while循环" tabindex="-1"><a class="header-anchor" href="#_3️⃣while循环" aria-hidden="true">#</a> 3️⃣While循环</h3>
<ul>
<li>语法</li>
</ul>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">while</span><span class="token punctuation">(</span>布尔表达式<span class="token punctuation">)</span><span class="token punctuation">{</span>
	<span class="token comment">// Statement 执行语句</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>如果布尔表达式为true则开始循环，否则退出循环。</p>
</blockquote>
<h3 id="_4️⃣do-while循环" tabindex="-1"><a class="header-anchor" href="#_4️⃣do-while循环" aria-hidden="true">#</a> 4️⃣Do...While循环</h3>
<p>  Do...While循环和While循环比较相似，While循环会在开始循环之前进行条件判断，如果条件不满足， 则不会进行循环，但是Do...While循环是先进行一次循环，再做条件判断，即至少会循环一次。</p>
<ul>
<li>语法</li>
</ul>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">do</span><span class="token punctuation">{</span>
   <span class="token comment">//代码语句</span>
<span class="token punctuation">}</span><span class="token keyword">while</span><span class="token punctuation">(</span>布尔表达式<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>先执行一次代码语句，再进行布尔表达式的判断。如果为true，则循环继续，否则循环退出。</p>
</blockquote>
<h3 id="_5️⃣break关键字" tabindex="-1"><a class="header-anchor" href="#_5️⃣break关键字" aria-hidden="true">#</a> 5️⃣Break关键字</h3>
<p>  在循环中，我们除了当循环条件为false时跳出循环，还经常使用break语句跳出循环。</p>
<ul>
<li>
<p>break 主要用在循环语句或者 switch 语句中，用来跳出整个语句块。</p>
</li>
<li>
<p>break 跳出最里层的循环，并且继续执行该循环下面的语句。</p>
</li>
</ul>
<h3 id="_6️⃣continue关键字" tabindex="-1"><a class="header-anchor" href="#_6️⃣continue关键字" aria-hidden="true">#</a> 6️⃣Continue关键字</h3>
<p>  在循环中，我们除了当循环语句执行完后，继续循环，还可以直接进入下次循环，使用Continue关键字。</p>
<p>  continue 适用于任何循环控制结构中。作用是让程序立刻跳转到下一次循环的迭代。</p>
<ul>
<li>
<p>在 for 循环中，continue 语句使程序立即跳转到更新语句。</p>
</li>
<li>
<p>在 while 或者 do…while 循环中，程序立即跳转到布尔表达式的判断语句。</p>
</li>
</ul>
<h2 id="💦switch语句" tabindex="-1"><a class="header-anchor" href="#💦switch语句" aria-hidden="true">#</a> 💦Switch语句</h2>
<p>  switch case 语句判断一个变量与一系列值中某个值是否相等，每个值称为一个分支。也可以使用多条件if语句实现。</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">switch</span><span class="token punctuation">(</span>expression<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">case</span> value <span class="token operator">:</span>
       <span class="token comment">//语句</span>
       <span class="token keyword">break</span><span class="token punctuation">;</span> <span class="token comment">//可选</span>
    <span class="token keyword">case</span> value <span class="token operator">:</span>
       <span class="token comment">//语句</span>
       <span class="token keyword">break</span><span class="token punctuation">;</span> <span class="token comment">//可选</span>
    <span class="token comment">//你可以有任意数量的case语句</span>
    <span class="token keyword">default</span> <span class="token operator">:</span> <span class="token comment">//可选</span>
       <span class="token comment">//语句</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>如果expression等于case后的哪一个值，则执行里面的语句。</p>
</blockquote>
<ul>
<li>switch case 语句有如下规则：</li>
</ul>
<ol>
<li>
<p>switch 语句中的变量类型可以是： byte、short、int 或者 char。从 Java SE 7 开始，switch 支持字符串 String 类型了，同时 case 标签必须为字符串常量或字面量。</p>
</li>
<li>
<p>switch 语句可以拥有多个 case 语句。每个 case 后面跟一个要比较的值和冒号。</p>
</li>
<li>
<p>case 语句中的值的数据类型必须与变量的数据类型相同，而且只能是常量或者字面常量。</p>
</li>
<li>
<p>当变量的值与 case 语句的值相等时，那么 case 语句之后的语句开始执行，直到 break 语句出现才会跳出 switch 语句。</p>
</li>
<li>
<p>当遇到 break 语句时，switch 语句终止。程序跳转到 switch 语句后面的语句执行。case 语句不必须要包含 break 语句。如果没有 break 语句出现，程序会继续执行下一条 case 语句，直到出现 break 语句。</p>
</li>
<li>
<p>switch 语句可以包含一个 default 分支，该分支一般是 switch 语句的最后一个分支（可以在任何位置，但建议在最后一个）。default 在没有 case 语句的值和变量值相等的时候执行。default 分支不需要 break 语句。</p>
</li>
</ol>
</div></template>


