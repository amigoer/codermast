<template><div><h1 id="_3-线性表" tabindex="-1"><a class="header-anchor" href="#_3-线性表" aria-hidden="true">#</a> 3.线性表</h1>
<h2 id="线性表定义和操作" tabindex="-1"><a class="header-anchor" href="#线性表定义和操作" aria-hidden="true">#</a> 线性表定义和操作</h2>
<div class="hint-container info">
<p class="hint-container-title">线性表</p>
<p>线性表是具有相同数据类型的n个数据元素的有限集序列，其中n为表长，当n=0时线性表是一个空表。若用L命名线性表，其一般表示为：L = ( a<sub>1</sub> ,a<sub>2</sub> ,...,a<sub>i</sub> ,a<sub>i+1</sub> ,...,a<sub>n</sub> )</p>
</div>
<p><strong>线性表的基本操作：</strong></p>
<ul>
<li><code v-pre>InitList(&amp;L)</code>:初始化表，构造一个空的线性表。</li>
<li><code v-pre>Length(L)</code>:求表长，返回线性表L的长度，即L中元素的个数。</li>
<li><code v-pre>LocateElem(L,e)</code>:按值查找操作，在表L中查找具有给定关键字值的元素。</li>
<li><code v-pre>GetElem(L,i)</code>:按位查找操作。获取表L中第i个位置的数据元素的值。</li>
<li><code v-pre>ListInsert(&amp;L,i,e)</code>:插入操作，在表L中的第i个位置上插入指定的元素e.</li>
<li><code v-pre>ListDelete(&amp;L,i,&amp;e)</code>:删除操作，删除表L中的第i个位置的元素，并用e返回删除元素的值。</li>
<li><code v-pre>PrintList(L)</code>:输出操作，按前后顺序输出线性表L的所有元素值。</li>
<li><code v-pre>Empty(L)</code>:判空操作，若L表为空，则返回True，否则返回false。</li>
<li><code v-pre>DestroyList(&amp;L)</code>:销毁操作，销毁线性表，并释放线性表L所占用的内存空间。</li>
</ul>
<h2 id="顺序表" tabindex="-1"><a class="header-anchor" href="#顺序表" aria-hidden="true">#</a> 顺序表</h2>
<div class="hint-container info">
<p class="hint-container-title">顺序表</p>
<p>线性表的顺序结构又称为顺序表，他是用一组地址连续的存储单元依次存储线性表中的数据元素，从而使得逻辑上相邻的两个元素在物理上也相邻。</p>
</div>
<p><strong>线性表的顺序存储类型描述：</strong></p>
<p>ElemType 是线性表的元素类型</p>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">MaxSize</span> <span class="token expression"><span class="token number">50</span>  </span><span class="token comment">// 定义线性表的最大容量</span></span>
<span class="token keyword">typedef</span> <span class="token keyword">struct</span><span class="token punctuation">{</span>
    ElemType data<span class="token punctuation">[</span>MaxSize<span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// 顺序表的元素</span>
    <span class="token keyword">int</span> length<span class="token punctuation">;</span> <span class="token comment">// 顺序表当前的长度</span>
<span class="token punctuation">}</span>SqList<span class="token punctuation">;</span>    <span class="token comment">// 顺序表的类型定义</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>顺序表的特点</p>
<ul>
<li>顺序表中元素的逻辑顺序和实际的物理顺序相同，所以插入和删除操作需要移动大量元素。</li>
<li>顺序表中第一个元素存储在线性表的起始位置，第 i 个元素的存储位置后面紧接着存储的是第 i + 1 个元素，称 i 为元素 ai 在线性表中的位序。</li>
<li>顺序表最重要的特点是支持随机访问，即通过首地址和元素需要可在 O(1) 时间内找到指定的元素。</li>
<li>通常情况下使用数组来表述线性表的顺序存储结构。</li>
<li>顺序表的存储密度高，每个结点只存储数据元素。</li>
</ul>
<div class="hint-container warning">
<p class="hint-container-title">注意</p>
<p>线性表中元素的位序是从 1 开始的，而数组中元素的下标是从 0 开始的。</p>
</div>
<p><strong>顺序表上基本操作的实现：</strong></p>
<div class="hint-container note">
<p class="hint-container-title">说明</p>
<p>这里实现了顺序表的插入、删除、按值查询、按序号查询操作的算法。</p>
</div>
<ul>
<li>插入操作</li>
</ul>
<p>在顺序表 L 的第 i 个位置插入新元素 e 。若 i 的位置不合法，则返回 fasle，表示插入失败。否则将第 i 个元素及其后的所有元素依次往后移动一个位置，腾出一个空位置插入新元素 e，顺序表长度增加 1 ，插入成功，返回 true。</p>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code>bool <span class="token function">ListInsert</span><span class="token punctuation">(</span>SqList <span class="token operator">&amp;</span>L<span class="token punctuation">,</span> <span class="token keyword">int</span> i<span class="token punctuation">,</span> ElemType e<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">// 判断 i 的范围是否合法</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>i <span class="token operator">&lt;</span> <span class="token number">1</span> <span class="token operator">||</span> i <span class="token operator">>=</span> L<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> false<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 当存储空间已满时，则无法插入</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>L<span class="token punctuation">.</span>length <span class="token operator">>=</span> MaxSize<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> false<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 将第 i 个元素及之后的元素后移</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> j <span class="token operator">=</span> L<span class="token punctuation">.</span>length<span class="token punctuation">;</span> j <span class="token operator">>=</span> i<span class="token punctuation">;</span> j<span class="token operator">--</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        L<span class="token punctuation">.</span>data<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">=</span> L<span class="token punctuation">.</span>data<span class="token punctuation">[</span>j <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 在位置 i 处放入 e</span>
    L<span class="token punctuation">.</span>data<span class="token punctuation">[</span>i <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> e<span class="token punctuation">;</span>

    <span class="token comment">// 线性表长度加 1</span>
    L<span class="token punctuation">.</span>length <span class="token operator">++</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> true<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>删除操作</li>
</ul>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code>bool <span class="token function">ListDelete</span><span class="token punctuation">(</span>SqList <span class="token operator">&amp;</span>L<span class="token punctuation">,</span> <span class="token keyword">int</span> i<span class="token punctuation">,</span> ElemType <span class="token operator">&amp;</span>e<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">// 判断 i 的位置是否合法</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>i <span class="token operator">&lt;</span> <span class="token number">1</span> <span class="token operator">||</span> i <span class="token operator">>=</span> L<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> false<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 将被删除的元素赋值给 e</span>
    e <span class="token operator">=</span> L<span class="token punctuation">.</span>data<span class="token punctuation">[</span>i <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

    <span class="token comment">// 将第 i 个位置后的元素前移</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> j <span class="token operator">=</span> i<span class="token punctuation">;</span> j <span class="token operator">&lt;</span> L<span class="token punctuation">.</span>length<span class="token punctuation">;</span> j <span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        L<span class="token punctuation">.</span>data<span class="token punctuation">[</span>j <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> L<span class="token punctuation">.</span>data<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 线性表长度 减1</span>
    L<span class="token punctuation">.</span>length <span class="token operator">--</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> true<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>
<p>按值查询</p>
</li>
<li>
<p>按序号查询</p>
</li>
</ul>
<h2 id="单链表" tabindex="-1"><a class="header-anchor" href="#单链表" aria-hidden="true">#</a> 单链表</h2>
<ul>
<li>单链表</li>
</ul>
<h2 id="双链表" tabindex="-1"><a class="header-anchor" href="#双链表" aria-hidden="true">#</a> 双链表</h2>
<ul>
<li>双链表</li>
</ul>
<h2 id="循环链表" tabindex="-1"><a class="header-anchor" href="#循环链表" aria-hidden="true">#</a> 循环链表</h2>
<ul>
<li>循环链表</li>
</ul>
<h2 id="静态链表" tabindex="-1"><a class="header-anchor" href="#静态链表" aria-hidden="true">#</a> 静态链表</h2>
<ul>
<li>静态链表</li>
</ul>
<h2 id="顺序表与链表的比较和选择" tabindex="-1"><a class="header-anchor" href="#顺序表与链表的比较和选择" aria-hidden="true">#</a> 顺序表与链表的比较和选择</h2>
</div></template>


