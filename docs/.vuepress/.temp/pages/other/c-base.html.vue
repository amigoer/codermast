<template><div><h1 id="c语言基础" tabindex="-1"><a class="header-anchor" href="#c语言基础" aria-hidden="true">#</a> C语言基础</h1>
<p>数据结构学习之前需要掌握的 C 语言基础：</p>
<ul>
<li>基本语法</li>
<li>判断语句</li>
<li>循环语句</li>
<li>结构体</li>
<li>指针</li>
</ul>
<h2 id="基本语法" tabindex="-1"><a class="header-anchor" href="#基本语法" aria-hidden="true">#</a> 基本语法</h2>
<ul>
<li>C 语言的关键字</li>
<li>注释</li>
<li>变量语法</li>
<li>函数</li>
</ul>
<div class="hint-container note">
<p class="hint-container-title">详情参考</p>
<p><a href="https://www.runoob.com/cprogramming/c-basic-syntax.html" target="_blank" rel="noopener noreferrer">https://www.runoob.com/cprogramming/c-basic-syntax.html<ExternalLinkIcon/></a></p>
</div>
<h2 id="判断语句" tabindex="-1"><a class="header-anchor" href="#判断语句" aria-hidden="true">#</a> 判断语句</h2>
<p>C 语言提供了以下类型的判断语句。点击链接查看每个语句的细节。</p>
<ul>
<li>if 语句</li>
</ul>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">if</span> <span class="token punctuation">(</span>exp1<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// exp2</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>上述代码的含义为：</strong> exp1 == true 时，执行 exp2 。</p>
<ul>
<li>if ... else ... 语句</li>
</ul>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">if</span> <span class="token punctuation">(</span>exp1<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">// exp2</span>
<span class="token punctuation">}</span><span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token comment">// exp3</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>上述代码的含义为：</strong> exp1 == true 时，执行 exp2，否则执行exp3。</p>
<ul>
<li>嵌套 if 语句</li>
</ul>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">if</span> <span class="token punctuation">(</span>exp1<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>exp2<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">// exp3</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>上述代码的含义为：</strong> exp1 == true 时，并且 exp2 == true，才执行exp3。</p>
<ul>
<li>switch 语句</li>
</ul>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">switch</span> <span class="token punctuation">(</span>value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> value1<span class="token operator">:</span>
        exp1<span class="token punctuation">;</span>
        <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token keyword">case</span> value2<span class="token operator">:</span>
        exp2<span class="token punctuation">;</span>
        <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token keyword">case</span> value3<span class="token operator">:</span>
        exp3<span class="token punctuation">;</span>
        <span class="token keyword">break</span><span class="token punctuation">;</span>    
    <span class="token keyword">case</span> value4<span class="token operator">:</span>
        exp4<span class="token punctuation">;</span>
        <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token keyword">default</span> <span class="token operator">:</span>
        exp5<span class="token punctuation">;</span>    
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>上述代码的含义为：</strong> value == value1 时，执行 exp1，并退出；value == value2 时，执行 exp2，依次类推，都不是时执行 default 分支，即执行 exp5。</p>
<ul>
<li>嵌套 switch 语句</li>
</ul>
<div class="hint-container info">
<p class="hint-container-title">相关信息</p>
<p>类似于 嵌套 if 语句，不做过多赘述。</p>
</div>
<ul>
<li>三目运算符</li>
</ul>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code>Exp1 <span class="token operator">?</span> Exp2 <span class="token operator">:</span> Exp3<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>上述代码的含义为：</strong> exp1 == true 时，则执行 exp2 语句，否则执行 exp3 语句。</p>
<div class="hint-container note">
<p class="hint-container-title">详情参考</p>
<p><a href="https://www.runoob.com/cprogramming/c-decision.html" target="_blank" rel="noopener noreferrer">https://www.runoob.com/cprogramming/c-decision.html<ExternalLinkIcon/></a></p>
</div>
<h2 id="循环语句" tabindex="-1"><a class="header-anchor" href="#循环语句" aria-hidden="true">#</a> 循环语句</h2>
<ul>
<li>for 循环</li>
</ul>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span> <span class="token punctuation">;</span> i <span class="token operator">++</span> <span class="token punctuation">)</span><span class="token punctuation">{</span>
   <span class="token function">statement</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>while 循环</li>
</ul>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token keyword">while</span> <span class="token punctuation">(</span> i <span class="token operator">&lt;</span> <span class="token number">10</span> <span class="token punctuation">)</span> <span class="token punctuation">{</span>
    i <span class="token operator">++</span><span class="token punctuation">;</span>
    <span class="token function">statement</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>do ... while 循环</li>
</ul>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token keyword">do</span><span class="token punctuation">{</span>
    i <span class="token operator">++</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token keyword">while</span><span class="token punctuation">(</span>i <span class="token operator">&lt;</span> <span class="token number">10</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>嵌套循环</li>
</ul>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">for</span><span class="token punctuation">(</span> <span class="token keyword">int</span> j <span class="token operator">=</span> <span class="token number">0</span> <span class="token punctuation">;</span> j <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> j <span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token function">statement</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container note">
<p class="hint-container-title">详情参考</p>
<p><a href="https://www.runoob.com/cprogramming/c-loops.html" target="_blank" rel="noopener noreferrer">https://www.runoob.com/cprogramming/c-loops.html<ExternalLinkIcon/></a></p>
</div>
<h2 id="结构体" tabindex="-1"><a class="header-anchor" href="#结构体" aria-hidden="true">#</a> 结构体</h2>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">struct</span> <span class="token class-name">tag</span> <span class="token punctuation">{</span>
    member<span class="token operator">-</span>list
    member<span class="token operator">-</span>list
    member<span class="token operator">-</span>list  
    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token punctuation">}</span> variable<span class="token operator">-</span>list <span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>结构体可以理解为构建一个新的类型，并可以用此类型构建对象。</strong></p>
<div class="hint-container warning">
<p class="hint-container-title">举例</p>
<p>举个简单的例子，我们可以构建一个名为 小狗 dog 的结构体，dog 结构体中包含了 小狗的名称、颜色、年龄等信息。即创建了一个 dog 的结构体。</p>
</div>
<h2 id="指针" tabindex="-1"><a class="header-anchor" href="#指针" aria-hidden="true">#</a> 指针</h2>
<p>指针也就是内存地址，指针变量是用来存放内存地址的变量。就像其他变量或常量一样，您必须在使用指针存储其他变量地址之前，对其进行声明。指针变量声明的一般形式为：</p>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code>type <span class="token operator">*</span>var_name<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>举个简单的例子，int i = 1 时，我们可以调用 i 来获取这个值，这时会自动找到 i 这个变量，然后找到 对应的存储位置，拿到存储位置以后，再去获取实际的值。这个存储位置就是指针。</p>
<div class="hint-container note">
<p class="hint-container-title">详情参考</p>
<p><a href="https://www.runoob.com/cprogramming/c-pointers.html" target="_blank" rel="noopener noreferrer">https://www.runoob.com/cprogramming/c-pointers.html<ExternalLinkIcon/></a></p>
</div>
</div></template>


