<template><div><h1 id="java-基础概念及语法" tabindex="-1"><a class="header-anchor" href="#java-基础概念及语法" aria-hidden="true">#</a> Java - 基础概念及语法</h1>
<h2 id="注释" tabindex="-1"><a class="header-anchor" href="#注释" aria-hidden="true">#</a> 注释</h2>
<ol>
<li>单行注释</li>
</ol>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">// 单行注释</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="2">
<li>多行注释</li>
</ol>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">/*
    多行注释
 */</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3">
<li>文档注释</li>
</ol>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">/*
*   文档注释
*   通常包含 类、方法、字段的描述信息
*/</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container note">
<p class="hint-container-title">小知识</p>
<p>注释仅在编写阶段可见，编译后注释会被编译器完全去除。</p>
</div>
<h2 id="命名规范" tabindex="-1"><a class="header-anchor" href="#命名规范" aria-hidden="true">#</a> 命名规范</h2>
<ol>
<li>
<p>局部变量命名：小驼峰命名法</p>
</li>
<li>
<p>全局变量命名：小驼峰命名法</p>
</li>
<li>
<p>常量命名：全部大写，蛇形命名法</p>
</li>
<li>
<p>方法命名：小驼峰命名法</p>
</li>
<li>
<p>类命名：大驼峰命名法</p>
</li>
</ol>
<div class="hint-container warning">
<p class="hint-container-title">命名要求</p>
<ul>
<li>不能以保留关键字为名称</li>
<li>不能以数字开头</li>
<li>不能以特殊字符开头</li>
<li>严格区分大小写</li>
<li>仅能包括合法的特殊字符</li>
</ul>
</div>
<h2 id="数据类型" tabindex="-1"><a class="header-anchor" href="#数据类型" aria-hidden="true">#</a> 数据类型</h2>
<p>Java 中数据类型分 基础数据类型 和 引用数据类型 两种类型。</p>
<p>其中基础数据类型主要有boolean(1B)、byte(1B)、char(2B)、short(2B)、int(4B)、long(8B)、float(8B)、double(16B)，最常见的引用数据类型就是 String 字符串类型和数组类型，自定义的类型多为引用数据类型。</p>
<p>Java 给基本数据类型提供了对应的包装类，基本数据类型与其包装类型之间的赋值使用自动装箱和拆箱完成，例如：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">// 源代码</span>
<span class="token class-name">Integer</span> a <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>  <span class="token comment">// 装箱</span>
<span class="token keyword">int</span> b <span class="token operator">=</span> a<span class="token punctuation">;</span>      <span class="token comment">// 拆箱</span>

<span class="token comment">// 反编译</span>
<span class="token class-name">Integer</span> a <span class="token operator">=</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> b <span class="token operator">=</span> a<span class="token punctuation">.</span><span class="token function">intValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container tip">
<p class="hint-container-title">装箱拆箱</p>
<ul>
<li>拆箱：包装类型——&gt;基础类型</li>
<li>装箱：基础类型——&gt;包装类型<br>
所谓自动拆箱装箱，就是JDK帮我们在 基础类型 和 引用类型 之间进行转化，本质就是自动调一些方法。</li>
</ul>
</div>
<h2 id="运算符" tabindex="-1"><a class="header-anchor" href="#运算符" aria-hidden="true">#</a> 运算符</h2>
<ul>
<li>算术运算符：<code v-pre>+</code>、<code v-pre>-</code>、<code v-pre>*</code>、<code v-pre>/</code>、<code v-pre>%</code>、<code v-pre>++</code>、<code v-pre>--</code>等</li>
<li>关系运算符：<code v-pre>==</code>、<code v-pre>&gt;=</code>、<code v-pre>&lt;=</code>、<code v-pre>&gt;</code>、<code v-pre>&lt;</code>、<code v-pre>!=</code></li>
<li>位运算符：<code v-pre>&amp;</code>、<code v-pre>|</code>、<code v-pre>^</code>、<code v-pre>~</code>、<code v-pre>&lt;&lt;</code>、<code v-pre>&gt;&gt;</code>、<code v-pre>&gt;&gt;&gt;</code></li>
<li>逻辑运算符：<code v-pre>&amp;&amp;</code>、<code v-pre>||</code>、<code v-pre>!</code></li>
<li>赋值运算符：<code v-pre>=</code>、<code v-pre>+=</code>、<code v-pre>-=</code>、<code v-pre>*=</code>、<code v-pre>/=</code>、<code v-pre>%=</code>、<code v-pre>&lt;&lt;=</code>、<code v-pre>&gt;&gt;</code>=、<code v-pre>＆=</code>、<code v-pre>^=</code>、<code v-pre>|=</code></li>
<li>其他运算符：<code v-pre>instanceof</code>、<code v-pre>，</code></li>
</ul>
<h2 id="条件语句" tabindex="-1"><a class="header-anchor" href="#条件语句" aria-hidden="true">#</a> 条件语句</h2>
<h3 id="if语句" tabindex="-1"><a class="header-anchor" href="#if语句" aria-hidden="true">#</a> if语句</h3>
<ol>
<li>if</li>
</ol>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">if</span> <span class="token punctuation">(</span>布尔表达式<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 布尔表达式为真时，执行这里的语句</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2">
<li>if...else...</li>
</ol>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">if</span> <span class="token punctuation">(</span>布尔表达式<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 布尔表达式为真时，执行这里的语句</span>
<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token comment">// 布尔表达式为否时，执行这里的语句</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3">
<li>if...else if...else</li>
</ol>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">if</span> <span class="token punctuation">(</span>布尔表达式 <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token comment">// 布尔表达式 1的值为 true 执行这里的代码</span>
<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>布尔表达式 <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
   <span class="token comment">// 如果布尔表达式 2的值为true执行这里的代码</span>
<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>布尔表达式 <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
   <span class="token comment">// 如果布尔表达式 3的值为true执行这里的代码</span>
<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
   <span class="token comment">// 如果以上布尔表达式都不为true执行这里的代码</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container tip">
<p class="hint-container-title">提示</p>
<p>if 语句可以无限嵌套使用，if...else if...else...也可以无限个条件使用。</p>
</div>
<h3 id="switch语句" tabindex="-1"><a class="header-anchor" href="#switch语句" aria-hidden="true">#</a> switch语句</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">switch</span> <span class="token punctuation">(</span>表达式<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> value1 <span class="token operator">:</span>
       <span class="token comment">// 表达式的值 == value1，则执行这里的语句</span>
       <span class="token keyword">break</span><span class="token punctuation">;</span> <span class="token comment">//可选</span>
    <span class="token keyword">case</span> value2 <span class="token operator">:</span>
       <span class="token comment">// 表达式的值 == value2，则执行这里的语句</span>
       <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token comment">// case 语句无限使用</span>
    <span class="token keyword">default</span> <span class="token operator">:</span> <span class="token comment">//可选</span>
       <span class="token comment">// 如果都不匹配的话，则执行这里的语句</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container warning">
<p class="hint-container-title">注意</p>
<p>这里要注意的是，如果不在每个 case 语句中的最后一行写上 break 语句，那么执行完不会退出 switch 语句，而是从该位置继续往后执行。</p>
</div>
<h2 id="循环语句" tabindex="-1"><a class="header-anchor" href="#循环语句" aria-hidden="true">#</a> 循环语句</h2>
<h3 id="for循环" tabindex="-1"><a class="header-anchor" href="#for循环" aria-hidden="true">#</a> for循环</h3>
<ol>
<li>基本 for 循环</li>
</ol>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">for</span> <span class="token punctuation">(</span> 初始化语句<span class="token punctuation">;</span> 条件语句<span class="token punctuation">;</span> 更新语句<span class="token punctuation">;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 这里是循环要执行的语句</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2">
<li>增强 for 循环</li>
</ol>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">ElemType</span> elem <span class="token operator">:</span> 集合<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">// 这里是循环要执行的语句</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container tip">
<p class="hint-container-title">提示</p>
<p>增强的 for 循环只适用于遍历集合。</p>
</div>
<h3 id="while循环" tabindex="-1"><a class="header-anchor" href="#while循环" aria-hidden="true">#</a> while循环</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">while</span> <span class="token punctuation">(</span>布尔表达式<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 布尔表达式的值为 true，则循环执行这里的语句</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="do-while循环" tabindex="-1"><a class="header-anchor" href="#do-while循环" aria-hidden="true">#</a> do...while循环</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">do</span> <span class="token punctuation">{</span>
    <span class="token comment">// 循环体内要执行的语句。</span>
<span class="token punctuation">}</span> <span class="token keyword">while</span> <span class="token punctuation">(</span>布尔表达式<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该循环执行时，会先执行一次循环体内的语句，然后才进行判断循环。</p>
<div class="hint-container tip">
<p class="hint-container-title">关键字说明</p>
<ul>
<li>break; 退出当前循环</li>
<li>continue; 继续当前循环</li>
</ul>
</div>
</div></template>


