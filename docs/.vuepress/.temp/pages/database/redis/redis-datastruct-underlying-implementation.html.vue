<template><div><h1 id="redis原理-数据结构的底层实现" tabindex="-1"><a class="header-anchor" href="#redis原理-数据结构的底层实现" aria-hidden="true">#</a> Redis原理 - 数据结构的底层实现</h1>
<h2 id="动态字符串sds" tabindex="-1"><a class="header-anchor" href="#动态字符串sds" aria-hidden="true">#</a> 动态字符串SDS</h2>
<h3 id="基本概念" tabindex="-1"><a class="header-anchor" href="#基本概念" aria-hidden="true">#</a> 基本概念</h3>
<p>Redis 中保存的 Key 是字符串，Value 往往是字符串或者字符串的集合。可见字符串是 Redis 中最常见的一种数据结构。</p>
<p>Redis 是使用 C 语言来编写的，C 语言中也有字符串，但是 Redis 中并没有直接使用 C 语言的字符串，这是因为 C 语言中字符串存在着很多的问题：</p>
<ul>
<li>获取字符串长度需要进行运算</li>
<li>非二进制安全，不能包含特殊字符</li>
</ul>
<blockquote>
<p>因为C字符串以空字符作为字符串结束的标识，而对于一些二进制文件（如图片等），内容可能包括空字符串，因此C字符串无法正确存取；而所有 SDS 的API 都是以处理二进制的方式来处理 buf 里面的元素，并且 SDS 不是以空字符串来判断是否结束，而是以 len 属性表示的长度来判断字符串是否结束。</p>
</blockquote>
<ul>
<li>不可修改，C 语言的字符串实质为字符数组，以<code v-pre>\0</code>结尾。</li>
</ul>
<p>为了解决以上问题，Redis 自己构建了一种新的字符串结构，称为简单动态字符串（Simple Dynamic String），简称为SDS</p>
<h3 id="底层实现" tabindex="-1"><a class="header-anchor" href="#底层实现" aria-hidden="true">#</a> 底层实现</h3>
<p>SDS 在 Redis 中的实现在 <code v-pre>/src/sds.h</code>、<code v-pre>/src/sds.c</code> 文件中，具体的核心实现如下：</p>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token comment">/* Note: sdshdr5 is never used, we just access the flags byte directly.
 * However is here to document the layout of type 5 SDS strings. */</span>
<span class="token keyword">struct</span> <span class="token keyword">__attribute__</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>__packed__<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token class-name">sdshdr5</span> <span class="token punctuation">{</span>
    <span class="token keyword">unsigned</span> <span class="token keyword">char</span> flags<span class="token punctuation">;</span> <span class="token comment">/* 3 lsb of type, and 5 msb of string length */</span>
    <span class="token keyword">char</span> buf<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">struct</span> <span class="token keyword">__attribute__</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>__packed__<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token class-name">sdshdr8</span> <span class="token punctuation">{</span>
    <span class="token class-name">uint8_t</span> len<span class="token punctuation">;</span> <span class="token comment">/* used */</span>
    <span class="token class-name">uint8_t</span> alloc<span class="token punctuation">;</span> <span class="token comment">/* excluding the header and null terminator */</span>
    <span class="token keyword">unsigned</span> <span class="token keyword">char</span> flags<span class="token punctuation">;</span> <span class="token comment">/* 3 lsb of type, 5 unused bits */</span>
    <span class="token keyword">char</span> buf<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">struct</span> <span class="token keyword">__attribute__</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>__packed__<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token class-name">sdshdr16</span> <span class="token punctuation">{</span>
    <span class="token class-name">uint16_t</span> len<span class="token punctuation">;</span> <span class="token comment">/* used */</span>
    <span class="token class-name">uint16_t</span> alloc<span class="token punctuation">;</span> <span class="token comment">/* excluding the header and null terminator */</span>
    <span class="token keyword">unsigned</span> <span class="token keyword">char</span> flags<span class="token punctuation">;</span> <span class="token comment">/* 3 lsb of type, 5 unused bits */</span>
    <span class="token keyword">char</span> buf<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">struct</span> <span class="token keyword">__attribute__</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>__packed__<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token class-name">sdshdr32</span> <span class="token punctuation">{</span>
    <span class="token class-name">uint32_t</span> len<span class="token punctuation">;</span> <span class="token comment">/* used */</span>
    <span class="token class-name">uint32_t</span> alloc<span class="token punctuation">;</span> <span class="token comment">/* excluding the header and null terminator */</span>
    <span class="token keyword">unsigned</span> <span class="token keyword">char</span> flags<span class="token punctuation">;</span> <span class="token comment">/* 3 lsb of type, 5 unused bits */</span>
    <span class="token keyword">char</span> buf<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">struct</span> <span class="token keyword">__attribute__</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>__packed__<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token class-name">sdshdr64</span> <span class="token punctuation">{</span>
    <span class="token class-name">uint64_t</span> len<span class="token punctuation">;</span> <span class="token comment">/* used */</span>
    <span class="token class-name">uint64_t</span> alloc<span class="token punctuation">;</span> <span class="token comment">/* excluding the header and null terminator */</span>
    <span class="token keyword">unsigned</span> <span class="token keyword">char</span> flags<span class="token punctuation">;</span> <span class="token comment">/* 3 lsb of type, 5 unused bits */</span>
    <span class="token keyword">char</span> buf<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>
<Badge text="len" type="tip" vertical="middle" />：buf已保存的字符串字节数，不包含结束标示</li>
<li>
<Badge text="alloc" type="warning" vertical="middle" />：buf申请的总的字节数，不包含结束标志</li>
<li>
<Badge text="flags" type="info" vertical="middle" />：不同SDS的头类型，用来控制SDS的头大小</li>
<li>
<Badge text="buf" type="note" vertical="middle" />：实际存储的字符数组</li>
</ul>
<p><strong>标识符对应信息</strong></p>
<table>
<thead>
<tr>
<th style="text-align:center">标识信息</th>
<th style="text-align:center">对应值</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">SDS_TYPE_5</td>
<td style="text-align:center">0</td>
</tr>
<tr>
<td style="text-align:center">SDS_TYPE_8</td>
<td style="text-align:center">1</td>
</tr>
<tr>
<td style="text-align:center">SDS_TYPE_16</td>
<td style="text-align:center">2</td>
</tr>
<tr>
<td style="text-align:center">SDS_TYPE_32</td>
<td style="text-align:center">3</td>
</tr>
<tr>
<td style="text-align:center">SDS_TYPE_64</td>
<td style="text-align:center">4</td>
</tr>
</tbody>
</table>
<p>例如，一个包含字符串<code v-pre>name</code>的sds结构如下：</p>
<figure><img src="@source/../assets/redis-datastruct-underlying-implementation/2023-06-16-13-30-51.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h3 id="内存预分配" tabindex="-1"><a class="header-anchor" href="#内存预分配" aria-hidden="true">#</a> 内存预分配</h3>
<p>SDS 之所以叫做动态字符串，是因为其具备动态扩容的能力，例如一个内容为 “hi” 的 SDS</p>
<figure><img src="@source/../assets/redis-datastruct-underlying-implementation/2023-06-16-13-35-41.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>假如我们要给 SDS 追加一段字符串 “,Amy” ，这里因为空间不够，需要申请新的内存空间：</p>
<ul>
<li>如果新字符串小于 1M ，则新空间扩展后字符串长度的两倍 + 1</li>
<li>如果新字符串大于 1M ，则新空间为扩展后字符串长度 + 1M + 1。称为内存预分配</li>
</ul>
<figure><img src="@source/../assets/redis-datastruct-underlying-implementation/2023-06-16-13-38-27.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<div class="hint-container tip">
<p class="hint-container-title">优点</p>
<ol>
<li>获取字符串长度的时间复杂度为 O(1)</li>
<li>支持动态扩容</li>
<li>减少内存分配次数</li>
<li>二进制安全，字符串可存储特殊字符</li>
</ol>
</div>
<h3 id="sds小结" tabindex="-1"><a class="header-anchor" href="#sds小结" aria-hidden="true">#</a> SDS小结</h3>
<p>Redis的字符串表示为 SDS ，而不是 C 字符串（以\0结尾的char*）， 它是 Redis 底层所使用的字符串表示，它被用在几乎所有的 Redis 模块中。可以看如下对比：</p>
<figure><img src="@source/../assets/redis-datastruct-underlying-implementation/2023-06-16-13-40-37.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>一般来说，SDS 除了保存数据库中的字符串值以外，SDS 还可以作为缓冲区（buffer）：包括 AOF 模块中的AOF缓冲区以及客户端状态中的输入缓冲区。</p>
<h2 id="整数集intset" tabindex="-1"><a class="header-anchor" href="#整数集intset" aria-hidden="true">#</a> 整数集IntSet</h2>
<h3 id="基本概念-1" tabindex="-1"><a class="header-anchor" href="#基本概念-1" aria-hidden="true">#</a> 基本概念</h3>
<p>IntSet 是 Redis 中 Set 集合类型的一种实现方式，基于整数数组来实现，并且具备长度可变、有序等特征。</p>
<p>当一个集合只包含整数值元素，并且这个集合的元素数量不多时，Redis 就会使用整数集合作为集合键的底层实现。</p>
<p>为了方便查找，Redis 会将 IntSet 中所有的整数按照升序依次保存在 contents 数组中，结构图如下</p>
<figure><img src="@source/../assets/redis-datastruct-underlying-implementation/2023-06-16-16-33-35.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>现在数组中每个数字都保存在 int16_t 的范围内，因此采用的编码方式为 INTSET_ENC_INT16，每部分占用的字节大小为：</p>
<ul>
<li>encoding：4 字节</li>
<li>length：4 字节</li>
<li>contents：2 字节 * 3 = 6 字节</li>
<li>共计 4 + 4 + 6 = 16 字节</li>
</ul>
<h3 id="底层实现-1" tabindex="-1"><a class="header-anchor" href="#底层实现-1" aria-hidden="true">#</a> 底层实现</h3>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">typedef</span> <span class="token keyword">struct</span> <span class="token class-name">intset</span> <span class="token punctuation">{</span>
    <span class="token class-name">uint32_t</span> encoding<span class="token punctuation">;</span>
    <span class="token class-name">uint32_t</span> length<span class="token punctuation">;</span>
    <span class="token class-name">int8_t</span> contents<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> intset<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>
<Badge text="encoding" type="tip" vertical="middle" />：编码方式，支持存放 16 位、32 位、64 位整数<p><strong>其中的 encoding 包含三种模式，表示存储的整数大小不同：</strong></p>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token comment">/* Note that these encodings are ordered, so:
* INTSET_ENC_INT16 &lt; INTSET_ENC_INT32 &lt; INTSET_ENC_INT64. */</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">INTSET_ENC_INT16</span> <span class="token expression"><span class="token punctuation">(</span><span class="token keyword">sizeof</span><span class="token punctuation">(</span><span class="token class-name">int16_t</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">INTSET_ENC_INT32</span> <span class="token expression"><span class="token punctuation">(</span><span class="token keyword">sizeof</span><span class="token punctuation">(</span><span class="token class-name">int32_t</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">INTSET_ENC_INT64</span> <span class="token expression"><span class="token punctuation">(</span><span class="token keyword">sizeof</span><span class="token punctuation">(</span><span class="token class-name">int64_t</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>int16_t：2 字节整数，范围类似 Java 的 short</li>
<li>int32_t：4 字节整数，范围类似 Java 的 int</li>
<li>int64_t：8 字节整数，范围类似 Java 的 lang</li>
</ul>
</li>
<li>
<Badge text="length" type="warning" vertical="middle" />：元素个数</li>
<li>
<Badge text="contents[]" type="info" vertical="middle" />：整数数组，保存集合数据。指向实际存储数值的连续内存区域, 就是一个数组；整数集合的每个元素都是 contents 数组的一个数组项（item），各个项在数组中按值得大小从小到大有序排序，且数组中不包含任何重复项。（虽然 intset 结构将 contents 属性声明为 int8_t 类型的数组，但实际上 contents 数组并不保存任何 int8_t 类型的值，contents 数组的真正类型取决于 encoding 属性的值）</li>
</ul>
<h3 id="数组扩容" tabindex="-1"><a class="header-anchor" href="#数组扩容" aria-hidden="true">#</a> 数组扩容</h3>
<p>当在一个 int8 类型的整数集合中添加一个 int16 类型的数据元素，那么整个整数集合中的元素都会升级为 int16 类型，内存不够时还会进行扩容。具体的步骤如下：</p>
<ol>
<li>根据新元素的数据类型，改变编码方式。按照新的编码方式及元素的个数进行数组扩容</li>
<li>倒序依次将数组中的元素拷贝到扩容后的正确位置。倒序是为了防止正序拷贝时的数据覆盖，不会产生数据丢失。</li>
<li>把待添加的元素放入数组末尾</li>
<li>修改 encoding 信息，并将length + 1，维护好各项属性</li>
</ol>
<p><strong>底层实现</strong></p>
<ul>
<li>插入元素</li>
</ul>
<details class="hint-container details"><summary>代码详情</summary>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token comment">/* Insert an integer in the intset */</span>
intset <span class="token operator">*</span><span class="token function">intsetAdd</span><span class="token punctuation">(</span>intset <span class="token operator">*</span>is<span class="token punctuation">,</span> <span class="token class-name">int64_t</span> value<span class="token punctuation">,</span> <span class="token class-name">uint8_t</span> <span class="token operator">*</span>success<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 获取当前值编码</span>
    <span class="token class-name">uint8_t</span> valenc <span class="token operator">=</span> <span class="token function">_intsetValueEncoding</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 要插入的位置</span>
    <span class="token class-name">uint32_t</span> pos<span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>success<span class="token punctuation">)</span> <span class="token operator">*</span>success <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>

    <span class="token comment">// 判断编码是不是超过了当前 intset 的编码</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>valenc <span class="token operator">></span> <span class="token function">intrev32ifbe</span><span class="token punctuation">(</span>is<span class="token operator">-></span>encoding<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 超出编码，需要升级</span>
        <span class="token keyword">return</span> <span class="token function">intsetUpgradeAndAdd</span><span class="token punctuation">(</span>is<span class="token punctuation">,</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token comment">// 在当前 intset 中查找值与 value 一样的元素的角标 pos</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">intsetSearch</span><span class="token punctuation">(</span>is<span class="token punctuation">,</span>value<span class="token punctuation">,</span><span class="token operator">&amp;</span>pos<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 如果找到了，则无需插入，直接结束并返回失败</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>success<span class="token punctuation">)</span> <span class="token operator">*</span>success <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> is<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// 数组扩容</span>
        is <span class="token operator">=</span> <span class="token function">intsetResize</span><span class="token punctuation">(</span>is<span class="token punctuation">,</span><span class="token function">intrev32ifbe</span><span class="token punctuation">(</span>is<span class="token operator">-></span>length<span class="token punctuation">)</span><span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 移动数组中 pos 之后的元素到 pos + 1，给新元素腾出空间</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>pos <span class="token operator">&lt;</span> <span class="token function">intrev32ifbe</span><span class="token punctuation">(</span>is<span class="token operator">-></span>length<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token function">intsetMoveTail</span><span class="token punctuation">(</span>is<span class="token punctuation">,</span>pos<span class="token punctuation">,</span>pos<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 插入新元素</span>
    <span class="token function">_intsetSet</span><span class="token punctuation">(</span>is<span class="token punctuation">,</span>pos<span class="token punctuation">,</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
    is<span class="token operator">-></span>length <span class="token operator">=</span> <span class="token function">intrev32ifbe</span><span class="token punctuation">(</span><span class="token function">intrev32ifbe</span><span class="token punctuation">(</span>is<span class="token operator">-></span>length<span class="token punctuation">)</span><span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> is<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>
<ul>
<li>数组扩容</li>
</ul>
<details class="hint-container details"><summary>代码详情</summary>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token comment">/* Upgrades the intset to a larger encoding and inserts the given integer. */</span>
<span class="token keyword">static</span> intset <span class="token operator">*</span><span class="token function">intsetUpgradeAndAdd</span><span class="token punctuation">(</span>intset <span class="token operator">*</span>is<span class="token punctuation">,</span> <span class="token class-name">int64_t</span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 当前 intset 编码</span>
    <span class="token class-name">uint8_t</span> curenc <span class="token operator">=</span> <span class="token function">intrev32ifbe</span><span class="token punctuation">(</span>is<span class="token operator">-></span>encoding<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 新编码</span>
    <span class="token class-name">uint8_t</span> newenc <span class="token operator">=</span> <span class="token function">_intsetValueEncoding</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 元素个数</span>
    <span class="token keyword">int</span> length <span class="token operator">=</span> <span class="token function">intrev32ifbe</span><span class="token punctuation">(</span>is<span class="token operator">-></span>length<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 判断元素是大于 0 还是，小于 0。小于 0 插入队首，大于 0 插入队尾。</span>
    <span class="token keyword">int</span> prepend <span class="token operator">=</span> value <span class="token operator">&lt;</span> <span class="token number">0</span> <span class="token operator">?</span> <span class="token number">1</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">;</span>

    <span class="token comment">// 重置编码为新编码</span>
    is<span class="token operator">-></span>encoding <span class="token operator">=</span> <span class="token function">intrev32ifbe</span><span class="token punctuation">(</span>newenc<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 重置数组大小</span>
    is <span class="token operator">=</span> <span class="token function">intsetResize</span><span class="token punctuation">(</span>is<span class="token punctuation">,</span><span class="token function">intrev32ifbe</span><span class="token punctuation">(</span>is<span class="token operator">-></span>length<span class="token punctuation">)</span><span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 倒序遍历，逐个搬运元素到新的位置，_intsetGetEncoding按照旧编码方式查找旧元素</span>
    <span class="token keyword">while</span><span class="token punctuation">(</span>length<span class="token operator">--</span><span class="token punctuation">)</span>
        <span class="token comment">// _intsetSet按照新编码方式插入新元素</span>
        <span class="token function">_intsetSet</span><span class="token punctuation">(</span>is<span class="token punctuation">,</span>length<span class="token operator">+</span>prepend<span class="token punctuation">,</span><span class="token function">_intsetGetEncoded</span><span class="token punctuation">(</span>is<span class="token punctuation">,</span>length<span class="token punctuation">,</span>curenc<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 插入新元素，prepend 决定是插入队首，还是队尾</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>prepend<span class="token punctuation">)</span>
        <span class="token function">_intsetSet</span><span class="token punctuation">(</span>is<span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">,</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">else</span>
        <span class="token function">_intsetSet</span><span class="token punctuation">(</span>is<span class="token punctuation">,</span><span class="token function">intrev32ifbe</span><span class="token punctuation">(</span>is<span class="token operator">-></span>length<span class="token punctuation">)</span><span class="token punctuation">,</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 修改数组长度</span>
    is<span class="token operator">-></span>length <span class="token operator">=</span> <span class="token function">intrev32ifbe</span><span class="token punctuation">(</span><span class="token function">intrev32ifbe</span><span class="token punctuation">(</span>is<span class="token operator">-></span>length<span class="token punctuation">)</span><span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> is<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>
<ul>
<li>数组查询</li>
</ul>
<details class="hint-container details"><summary>代码详情</summary>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token comment">/* Search for the position of "value". Return 1 when the value was found and
 * sets "pos" to the position of the value within the intset. Return 0 when
 * the value is not present in the intset and sets "pos" to the position
 * where "value" can be inserted. */</span>
<span class="token keyword">static</span> <span class="token class-name">uint8_t</span> <span class="token function">intsetSearch</span><span class="token punctuation">(</span>intset <span class="token operator">*</span>is<span class="token punctuation">,</span> <span class="token class-name">int64_t</span> value<span class="token punctuation">,</span> <span class="token class-name">uint32_t</span> <span class="token operator">*</span>pos<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> min <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">,</span> max <span class="token operator">=</span> <span class="token function">intrev32ifbe</span><span class="token punctuation">(</span>is<span class="token operator">-></span>length<span class="token punctuation">)</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> mid <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token class-name">int64_t</span> cur <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>

    <span class="token comment">/* The value can never be found when the set is empty */</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">intrev32ifbe</span><span class="token punctuation">(</span>is<span class="token operator">-></span>length<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>pos<span class="token punctuation">)</span> <span class="token operator">*</span>pos <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token comment">/* Check for the case where we know we cannot find the value,
         * but do know the insert position. */</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>value <span class="token operator">></span> <span class="token function">_intsetGet</span><span class="token punctuation">(</span>is<span class="token punctuation">,</span>max<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>pos<span class="token punctuation">)</span> <span class="token operator">*</span>pos <span class="token operator">=</span> <span class="token function">intrev32ifbe</span><span class="token punctuation">(</span>is<span class="token operator">-></span>length<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>value <span class="token operator">&lt;</span> <span class="token function">_intsetGet</span><span class="token punctuation">(</span>is<span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>pos<span class="token punctuation">)</span> <span class="token operator">*</span>pos <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">while</span><span class="token punctuation">(</span>max <span class="token operator">>=</span> min<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        mid <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token keyword">unsigned</span> <span class="token keyword">int</span><span class="token punctuation">)</span>min <span class="token operator">+</span> <span class="token punctuation">(</span><span class="token keyword">unsigned</span> <span class="token keyword">int</span><span class="token punctuation">)</span>max<span class="token punctuation">)</span> <span class="token operator">>></span> <span class="token number">1</span><span class="token punctuation">;</span>
        cur <span class="token operator">=</span> <span class="token function">_intsetGet</span><span class="token punctuation">(</span>is<span class="token punctuation">,</span>mid<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>value <span class="token operator">></span> cur<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            min <span class="token operator">=</span> mid<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>value <span class="token operator">&lt;</span> cur<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            max <span class="token operator">=</span> mid<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token keyword">break</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>value <span class="token operator">==</span> cur<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>pos<span class="token punctuation">)</span> <span class="token operator">*</span>pos <span class="token operator">=</span> mid<span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>pos<span class="token punctuation">)</span> <span class="token operator">*</span>pos <span class="token operator">=</span> min<span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>
<div class="hint-container warning">
<p class="hint-container-title">思考</p>
<p><strong>在添加数据时会进行扩容操作，那么在删除数据时会进行缩容操作吗？那么如果删除掉刚加入的int16类型时，会不会做一个降级操作呢？</strong></p>
<p>答案：不会。主要还是减少开销的权衡。</p>
</div>
<h3 id="intset小结" tabindex="-1"><a class="header-anchor" href="#intset小结" aria-hidden="true">#</a> IntSet小结</h3>
<p>IntSet 可以看做是特殊的整数数组，具备一些特点：</p>
<ul>
<li>Redis 会确保 IntSet 中的元素唯一、有序</li>
<li>具备类型升级机制，可以节省内存空间</li>
<li>底层采用二分查找方式来查询</li>
</ul>
<h2 id="字典-哈希表dict" tabindex="-1"><a class="header-anchor" href="#字典-哈希表dict" aria-hidden="true">#</a> 字典/哈希表Dict</h2>
<h3 id="基本概念-2" tabindex="-1"><a class="header-anchor" href="#基本概念-2" aria-hidden="true">#</a> 基本概念</h3>
<p><strong>Dict</strong>
Dict 由三部分组成，分别是：哈希表（DictHashTable）、哈希节点（DictEntry）、字典（Dict）</p>
<p><strong>哈希算法</strong></p>
<p>Redis 计算哈希值和索引值方法如下：</p>
<ol>
<li>
<p>使用字典设置的哈希函数，计算键 key 的哈希值
<code v-pre>hash = dict-&gt;type-&gt;hashFunction(key);</code></p>
</li>
<li>
<p>使用哈希表的sizemask属性和第一步得到的哈希值，计算索引值
<code v-pre>index = hash &amp; dict-&gt;ht[x].sizemask;</code></p>
</li>
</ol>
<p><strong>哈希冲突</strong></p>
<p>哈希冲突（Hash Collision）是指在使用哈希表存储数据时，两个或多个不同的键（Key）被哈希函数映射到同一个位置的情况。这种情况会导致数据的存储和查找变得复杂，因此需要采取一些措施来解决哈希冲突。</p>
<p>Dict 中解决哈希冲的方法是 <mark>链地址法</mark>。</p>
<div class="hint-container note">
<p class="hint-container-title">其他办法</p>
<p>除了链地址法解决哈希冲突以外，还可以使用开放地址法、在哈希法、建立公共溢出区等方法解决。</p>
</div>
<h3 id="底层实现-2" tabindex="-1"><a class="header-anchor" href="#底层实现-2" aria-hidden="true">#</a> 底层实现</h3>
<ul>
<li>哈希表</li>
</ul>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">typedef</span> <span class="token keyword">struct</span> <span class="token class-name">dictht</span><span class="token punctuation">{</span>
    <span class="token comment">// entry 数组</span>
    <span class="token comment">// 数组中保存的是指向 entry 的指针</span>
    dictEntry <span class="token operator">*</span><span class="token operator">*</span>table<span class="token punctuation">;</span>
    <span class="token comment">// 哈希大小</span>
    <span class="token keyword">unsigned</span> <span class="token keyword">long</span> size<span class="token punctuation">;</span>
    <span class="token comment">// 哈希表大小的掩码，总等于 size - 1</span>
    <span class="token keyword">unsigned</span> <span class="token keyword">long</span> sizemask<span class="token punctuation">;</span>
    <span class="token comment">// entry 个数</span>
    <span class="token keyword">unsigned</span> <span class="token keyword">long</span> used<span class="token punctuation">;</span>
<span class="token punctuation">}</span> dictht<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>哈希节点</li>
</ul>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">typedef</span> <span class="token keyword">struct</span> <span class="token class-name">dictEntry</span> <span class="token punctuation">{</span>
    <span class="token keyword">void</span> <span class="token operator">*</span>key<span class="token punctuation">;</span>  <span class="token comment">// 键</span>
    <span class="token keyword">union</span> <span class="token punctuation">{</span>
        <span class="token keyword">void</span> <span class="token operator">*</span>val<span class="token punctuation">;</span>
        <span class="token class-name">uint64_t</span> u64<span class="token punctuation">;</span>
        <span class="token class-name">int64_t</span> s64<span class="token punctuation">;</span>
        <span class="token keyword">double</span> d<span class="token punctuation">;</span>
    <span class="token punctuation">}</span> v<span class="token punctuation">;</span>   <span class="token comment">// 值</span>
    <span class="token comment">// 下一个 Entry 的指针</span>
    <span class="token keyword">struct</span> <span class="token class-name">dictEntry</span> <span class="token operator">*</span>next<span class="token punctuation">;</span>
<span class="token punctuation">}</span> dictEntry<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当我们向 Dict 添加键值对时，Redis 首先根据 key 计算出 hash 值（h），然后利用 h &amp; sizemask 来计算元素应该存储到数组中的哪个索引位置。</p>
<ul>
<li>字典</li>
</ul>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">typedef</span> <span class="token keyword">struct</span> <span class="token class-name">dict</span><span class="token punctuation">{</span>
    <span class="token comment">// dict 类型，内置不同的 hash 函数</span>
    dictType <span class="token operator">*</span>type<span class="token punctuation">;</span>
    <span class="token comment">// 私有数组，在做特殊 hash 运算时使用</span>
    <span class="token keyword">void</span> <span class="token operator">*</span>privdata<span class="token punctuation">;</span>
    <span class="token comment">// 一个Dict包含两个哈希表，其中一个是当前数据，另一个一般是空，rehash时使用</span>
    dictht ht<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token comment">// rehash 的进度，-1 表示未进行</span>
    <span class="token keyword">long</span> rehashidx<span class="token punctuation">;</span>
    <span class="token comment">// rehash是否暂停，1则暂停，0则继续]</span>
    <span class="token class-name">int16_t</span> pauserehash<span class="token punctuation">;</span> 
<span class="token punctuation">}</span>dict<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="扩容收缩" tabindex="-1"><a class="header-anchor" href="#扩容收缩" aria-hidden="true">#</a> 扩容收缩</h3>
<p>当哈希表保存的键值对太多或者太少时，就要通过 rehash(重新散列）来对哈希表进行相应的扩展或者收缩。</p>
<p><strong>扩容</strong></p>
<p>Dict 中的 HashTable 就是数组结合单向链表的实现，当集合中元素较多时，必然导致哈希冲突增多，链表过长，则查询效率会大大降低。</p>
<p>Dict在每次新增键值对时都会检查负载因子，满足以下两种情况时会触发哈希表扩容：</p>
<ul>
<li>哈希表的 LocalFactor &gt;= 1，并且服务器没有执行 BGSAVE 或者 BGREWRITEAOF 等后台进程。</li>
<li>哈希表的 LocalFactor &gt; 5，无论是否在执行BGSAVE 命令或者 BGREWRITEAOF 命令。</li>
</ul>
<div class="hint-container info">
<p class="hint-container-title">负载因子</p>
<p>负载因子 = 哈希表已保存节点数量 / 哈希表大小。</p>
</div>
<p><strong>收缩</strong></p>
<p>Dict 除了扩容以外，每次删除元素时，也会对负载因子做检查，当 LocalFactor &lt; 0.1 时，会做哈希收缩。</p>
<p><strong>扩容收缩的具体步骤如下：</strong></p>
<ol>
<li>
<p>如果执行扩展操作，会基于原哈希表创建一个大小等于 <code v-pre>ht[0].used*2n</code> 的哈希表（也就是每次扩展都是根据原哈希表已使用的空间扩大一倍创建另一个哈希表）。相反如果执行的是收缩操作，每次收缩是根据已使用空间缩小一倍创建一个新的哈希表。</p>
</li>
<li>
<p>重新利用哈希算法，计算索引值，然后将键值对放到新的哈希表位置上。</p>
</li>
<li>
<p>所有键值对都迁徙完毕后，释放原哈希表的内存空间。</p>
</li>
</ol>
<h3 id="rehash" tabindex="-1"><a class="header-anchor" href="#rehash" aria-hidden="true">#</a> ReHash</h3>
<p>不管是扩容还是收缩，必定会创建新的哈希表，导致哈希表的 size 和 sizemask 变化，而 key 的查询与 sizemask 有关。因此必须对哈希表中的每一个 key 重新计算索引，插入新的哈希表，这个过程称为 rehash。具体的步骤如下。</p>
<ol>
<li>计算新hash表的realesize，值取决于当前要做的是扩容还是收缩：
<ul>
<li>如果是扩容，则新size为第一个大于等于<code v-pre>dict.ht[O].used + 1</code>的 <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msup><mn>2</mn><mi>n</mi></msup></mrow><annotation encoding="application/x-tex">2 ^ n</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6644em;"></span><span class="mord"><span class="mord">2</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.6644em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">n</span></span></span></span></span></span></span></span></span></span></span></li>
<li>如果是收缩，则新size为第一个大于等于<code v-pre>dict.ht[O].used</code>的<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msup><mn>2</mn><mi>n</mi></msup></mrow><annotation encoding="application/x-tex">2 ^ n</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6644em;"></span><span class="mord"><span class="mord">2</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.6644em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">n</span></span></span></span></span></span></span></span></span></span></span> (不得小于4)</li>
</ul>
</li>
<li>按照新的realeSize申请内存空间，创建<code v-pre>dictht</code>，并赋值给<code v-pre>dict.ht[1]</code></li>
<li>设置<code v-pre>dict.rehashidx=0</code>，标示开始<code v-pre>rehash</code></li>
<li>将 <code v-pre>dict.ht[O]</code> 中的每一个<code v-pre>dictEntry</code>都<code v-pre>rehash</code>到<code v-pre>dict.ht[1]</code></li>
<li>将 <code v-pre>dict.ht[1]</code> 赋值给<code v-pre>dict.ht[O]</code>，给 <code v-pre>dict.ht[1]</code> 初始化为空哈希表，释放原来的<code v-pre>dict.ht[O]</code>的内存</li>
</ol>
<p>Dict的 rehash 并不是一次性完成的，如果 Dict 中包含数百万的 entry ，要在一次 rehash 完成，极有可能导致主线程阻塞。因此 Dict 的 rehash 是分多次、渐进式的完成，因此称为渐进式 rehash。</p>
<ol>
<li>
<p>计算新hash表的realesize，值取决于当前要做的是扩容还是收缩：</p>
<ul>
<li>如果是扩容，则新size为第一个大于等于<code v-pre>dict.ht[O].used + 1</code>的 <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msup><mn>2</mn><mi>n</mi></msup></mrow><annotation encoding="application/x-tex">2 ^ n</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6644em;"></span><span class="mord"><span class="mord">2</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.6644em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">n</span></span></span></span></span></span></span></span></span></span></span></li>
<li>如果是收缩，则新size为第一个大于等于<code v-pre>dict.ht[O].used</code>的<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msup><mn>2</mn><mi>n</mi></msup></mrow><annotation encoding="application/x-tex">2 ^ n</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6644em;"></span><span class="mord"><span class="mord">2</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.6644em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">n</span></span></span></span></span></span></span></span></span></span></span> (不得小于4)</li>
</ul>
</li>
<li>
<p>按照新的realeSize申请内存空间，创建<code v-pre>dictht</code>，并赋值给<code v-pre>dict.ht[1]</code></p>
</li>
<li>
<p>设置<code v-pre>dict.rehashidx=0</code>，标示开始<code v-pre>rehash</code></p>
</li>
<li>
<p>每次执行新增、查询、修改、删除操作时，都检查一下<code v-pre>dict.rehashidx</code>是否大于-1，如果是则将<code v-pre>dict.ht[0].table[rehashid]</code>的<code v-pre>entry</code>链表rehash到<code v-pre>dictht[1]</code>，并且将<code v-pre>rehashidx++</code>。直至<code v-pre>dict.ht[0]</code>的所有数据都rehash到<code v-pre>dict.ht[1]</code></p>
</li>
<li>
<p>将 <code v-pre>dict.ht[1]</code> 赋值给<code v-pre>dict.ht[O]</code>，给 <code v-pre>dict.ht[1]</code> 初始化为空哈希表，释放原来的<code v-pre>dict.ht[O]</code>的内存</p>
</li>
<li>
<p>将rehashidx赋值为-1，代表rehash结束</p>
</li>
<li>
<p>在rehash过程中，新增操作，则直接写入<code v-pre>ht[1]</code>，查询、修改和删除则会在<code v-pre>dict,ht[0]</code>和<code v-pre>dict.ht[1]</code>依次查找并执行。这样可以确保<code v-pre>ht[0]</code>的数据只减不增，随着rehash最终为空</p>
</li>
</ol>
<p><strong>什么叫渐进式 rehash？</strong></p>
<p>也就是说扩容和收缩操作不是一次性、集中式完成的，而是分多次、渐进式完成的。如果保存在Redis中的键值对只有几个几十个，那么 rehash 操作可以瞬间完成，但是如果键值对有几百万，几千万甚至几亿，那么要一次性的进行 rehash，势必会造成 Redis 一段时间内不能进行别的操作。所以 Redis 采用渐进式 rehash，这样在进行渐进式 rehash 期间，字典的删除查找更新等操作可能会在两个哈希表上进行，第一个哈希表没有找到，就会去第二个哈希表上进行查找。但是进行增加操作，一定是在新的哈希表上进行的。</p>
<p>可以简单的理解为慢慢的将旧的哈希表，慢慢迁移到新的哈希表中。</p>
<h3 id="dict小结" tabindex="-1"><a class="header-anchor" href="#dict小结" aria-hidden="true">#</a> Dict小结</h3>
<p><strong>Dict的结构</strong></p>
<ul>
<li>
<p>类似java的HashTable，底层是数组加链表来解决哈希冲突</p>
</li>
<li>
<p>Dict包含两个哈希表，<code v-pre>ht[0]</code>平常用，<code v-pre>ht[1]</code>用来rehash</p>
</li>
</ul>
<p><strong>Dict的伸缩</strong></p>
<ul>
<li>当LoadFactor大于5或者LoadFactor大于1并且没有子进程任务时，Dict扩容</li>
<li>当LoadFactor小于0.1时，Dict收缩</li>
<li>扩容大小为第一个大于等于<code v-pre>used + 1</code>的<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msup><mn>2</mn><mi>n</mi></msup></mrow><annotation encoding="application/x-tex">2 ^ n</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6644em;"></span><span class="mord"><span class="mord">2</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.6644em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">n</span></span></span></span></span></span></span></span></span></span></span></li>
<li>收缩大小为第一个大于等于<code v-pre>used</code>的<span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msup><mn>2</mn><mi>n</mi></msup></mrow><annotation encoding="application/x-tex">2 ^ n</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="height:0.6644em;"></span><span class="mord"><span class="mord">2</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.6644em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">n</span></span></span></span></span></span></span></span></span></span></span></li>
<li>Dict采用渐进式rehash，每次访问Dict时执行一次rehash</li>
<li>rehash时<code v-pre>ht[0]</code>只减不增，新增操作只在<code v-pre>ht[1]</code>执行，其它操作在两个哈希表</li>
</ul>
<h2 id="压缩列表ziplist" tabindex="-1"><a class="header-anchor" href="#压缩列表ziplist" aria-hidden="true">#</a> 压缩列表ZipList</h2>
<p>ZipList 可以看做一种特殊的双端链表，由一系列特殊编码的连续内存块组成。可以在任意一端压入弹出操作，并且该操作的时间复杂度为 O(1)。</p>
<figure><img src="@source/../assets/redis-datastruct-underlying-implementation/2023-06-17-23-34-25.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<ul>
<li>
<Badge text="zlbytes" type="tip" vertical="middle" />：uint32_t类型，4字节，记录整个压缩列表所占用的字节数。</li>
<li>
<Badge text="zltail" type="info" vertical="middle" />：uint32_t类型，4字节，记录压缩列表表尾节点距离压缩列表的起始地址有多少字节，通过这个偏移量可以确定表尾节点的地址。</li>
<li>
<Badge text="zllen" type="warning" vertical="middle" />uint16_t类型，2字节，记录了压缩列表包含的节点数量，最大值为UINT16_MAX(65534)，如果超出这个数，此处会记录为65535，但是节点的真实数量需要进行遍历整个压缩列表才可以得出。</li>
<li>
<Badge text="entry" type="danger" vertical="middle" />：列表节点，长度不定，压缩列表的包含的各个节点，节点的长度由节点保存的内容决定。</li>
<li>
<Badge text="zlend" type="note" vertical="middle" />：uint8_t类型，1字节，特殊值 0xFF （10进制255），用于标记压缩列表的末端。</li>
</ul>
<h3 id="ziplistentry" tabindex="-1"><a class="header-anchor" href="#ziplistentry" aria-hidden="true">#</a> ZipListEntry</h3>
<p>ZipList 中的Entry 并不像普通链表那样记录前后节点的指针，因为记录两个指针要占用 16 个字节，浪费内存，而是采用了如下的结构：</p>
<figure><img src="@source/../assets/redis-datastruct-underlying-implementation/2023-06-17-23-49-54.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<ul>
<li>
<Badge text="previous_entry_length" type="tip" vertical="middle" />：前一节点的长度，占 1 个或者 5 个字节<ul>
<li>如果前一节点的长度小于 254 字节，则采用 1 个字节来保存和这个长度值</li>
<li>如果前一节点的长度大于 254 节点，则采用 5 个字节来保存这个长度值，第一个字节位 0xfe ，后四个字节才是真实长度数据。</li>
</ul>
</li>
<li>
<Badge text="encoding" type="info" vertical="middle" />：编码属性，用来记录 content 的数据类型（字符串还是整数）以及长度，占用 1 个、2 个或者 5 个字节。</li>
<li>
<Badge text="contents" type="danger" vertical="middle" />：负责保存节点的数据，可以是字符串或整数</li>
</ul>
<div class="hint-container note">
<p class="hint-container-title">为什么ZipList特别省内存</p>
<p>理解了 ZipList 的 Entry 结构，就很容易理解 ZipList 为什么节省内存。</p>
<ul>
<li>ziplist 节省内存是相对于普通的list来说的，如果是普通的数组，那么它每个元素占用的内存是一样的且取决于最大的那个元素（很明显它是需要预留空间的）</li>
<li>所以 ziplist 在设计时就很容易想到要尽量让每个元素按照实际的内容大小存储，所以增加 encoding 字段，针对不同的 encoding 来细化存储大小</li>
<li>这时候还需要解决的一个问题是遍历元素时如何定位下一个元素呢？在普通数组中每个元素定长，所以不需要考虑这个问题；但是 ziplist 中每个 data 占据的内存不一样，所以为了解决遍历，需要增加记录上一个元素的 length，所以增加了 prelen 字段。</li>
</ul>
</div>
<h3 id="encoding编码" tabindex="-1"><a class="header-anchor" href="#encoding编码" aria-hidden="true">#</a> Encoding编码</h3>
<p>ZipListEntry 中的 Encoding 编码分为字符串和整数两种类型：</p>
<ul>
<li>
<p>字符串：Encoding 是以 &quot;00&quot;、&quot;01&quot;、&quot;10&quot; 开头，则 content 为字符串类型</p>
<ul>
<li><code v-pre>|00pppppp|</code> ：此时encoding长度为1个字节，该字节的后六位表示entry中存储的string长度，因为是6位，所以entry中存储的string长度不能超过63；</li>
<li><code v-pre>|01pppppp|qqqqqqqq|</code> 此时encoding长度为两个字节；此时encoding的后14位用来存储string长度，长度不能超过16383；</li>
<li><code v-pre>|10000000|qqqqqqqq|rrrrrrrr|ssssssss|ttttttt|</code> 此时encoding长度为5个字节，后面的4个字节用来表示encoding中存储的字符串长度，长度不能超过2^32 - 1;</li>
</ul>
</li>
<li>
<p>整数：Encoding 是以 &quot;11&quot; 开头，则 content 为整数类型，且 encoding 固定只占用 1 个字节。</p>
<ul>
<li><code v-pre>11000000</code>：int16_t （2 bytes）</li>
<li><code v-pre>11010000</code>：int32_t （4 bytes）</li>
<li><code v-pre>11100000</code>：int64_t （8 bytes）</li>
<li><code v-pre>11110000</code>：24位有符号整数 （3 bytes）</li>
<li><code v-pre>11111110</code>：8 位有符号整数 （1 bytes）</li>
<li><code v-pre>1111xxxx</code>：直接在 xxxx 位置保存数值，范围从 0001~1101 减 1 后结果为实际值</li>
</ul>
</li>
<li>
<p><code v-pre>11111111</code> ： zlend</p>
</li>
</ul>
<h3 id="连锁更新问题" tabindex="-1"><a class="header-anchor" href="#连锁更新问题" aria-hidden="true">#</a> 连锁更新问题</h3>
<p>ZipListEntry 节点中保存前一个节点的大小长度，前一个节点长度小于254字节，则使用一个字节保存这个长度，如果大于等于254字节，则使用 5 个字节来保存这个长度。那么当一个节点数据发生变化时，恰好从 254 字节以下变到 254 字节以上，那么 previous_entry_length 属性从1个字节变为5个字节，由于 ZipList 中 Entry 节点是连续存在的，则需要将后续的所有节点进行移动。如果后续空间不足，还需要申请新的空间等问题。</p>
<p>ZipList 这种特殊情况下产生的连续多次空间扩展操作称之为 连锁更新 。新增删除都可能导致连锁更新的发生。ZipList 也不预留内存空间, 并且在移除结点后, 也是立即缩容, 这代表每次写操作都会进行内存分配操作.</p>
<h3 id="ziplist小结" tabindex="-1"><a class="header-anchor" href="#ziplist小结" aria-hidden="true">#</a> ZipList小结</h3>
<ol>
<li>压缩列表ZipList 可以看做一种连续内存空间的“双端链表”。</li>
<li>列表的节点之间并不是通过指针连接的，而是记录上一个节点和本节点长度来寻址，内存占用较低。</li>
<li>如果列表数据较多，导致链表过长，可能会影响查询效率。查询时只能进行遍历，O(n)</li>
<li>增或者删较大数据时有可能发生连续更新问题。</li>
</ol>
<div class="hint-container warning">
<p class="hint-container-title">思考</p>
<ul>
<li><strong>ZipList 虽然节省内存，但是申请内存必须是连续空间，如果内存占用较多，申请内存的效率很低。怎么办？</strong></li>
</ul>
<blockquote>
<p>为了缓解这个问题，我们必须限制 ZipList 的长度和 Entry 大小。</p>
</blockquote>
<ul>
<li><strong>我们要存储大量数据，超出了 ZipList 最佳的上限该怎么办？</strong></li>
</ul>
<blockquote>
<p>我们可以创建多个 ZipList 来分片存储数据。</p>
</blockquote>
<ul>
<li><strong>数据拆分存储以后比较分散，不方便管理和查找，这多个 ZipList 如何建立联系？</strong></li>
</ul>
<blockquote>
<p>Redis3.2版本引入了新的数据结构 QuickList ，它是一个双端链表，只不过链表中的每个节点都是一个 ZipList 。</p>
</blockquote>
</div>
<h2 id="快速列表quicklist" tabindex="-1"><a class="header-anchor" href="#快速列表quicklist" aria-hidden="true">#</a> 快速列表QuickList</h2>
<h3 id="基本概念-3" tabindex="-1"><a class="header-anchor" href="#基本概念-3" aria-hidden="true">#</a> 基本概念</h3>
<p>QuickList 这个结构是 Redis3.2 版本后新加的, 之前的版本是 list(即 LinkedList)， 用于 String 数据类型中。</p>
<p>QuickList 是一种以 ZipList 为结点的双端链表结构。 从宏观上看，QuickList是一个双向链表，从微观上看，QuickList 的每一个节点都是一个 ZipList。</p>
<figure><img src="@source/../assets/redis-datastruct-underlying-implementation/2023-06-18-21-18-50.png" alt="QuickList示意图" tabindex="0" loading="lazy"><figcaption>QuickList示意图</figcaption></figure>
<h3 id="底层实现-3" tabindex="-1"><a class="header-anchor" href="#底层实现-3" aria-hidden="true">#</a> 底层实现</h3>
<ul>
<li>quicklistNote</li>
</ul>
<details class="hint-container details"><summary>代码详情</summary>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">typedef</span> <span class="token keyword">struct</span> <span class="token class-name">quicklistNode</span> <span class="token punctuation">{</span>
    <span class="token keyword">struct</span> <span class="token class-name">quicklistNode</span> <span class="token operator">*</span>prev<span class="token punctuation">;</span>
    <span class="token keyword">struct</span> <span class="token class-name">quicklistNode</span> <span class="token operator">*</span>next<span class="token punctuation">;</span>
    <span class="token keyword">unsigned</span> <span class="token keyword">char</span> <span class="token operator">*</span>entry<span class="token punctuation">;</span>
    <span class="token class-name">size_t</span> sz<span class="token punctuation">;</span>             <span class="token comment">/* entry size in bytes */</span>
    <span class="token keyword">unsigned</span> <span class="token keyword">int</span> count <span class="token operator">:</span> <span class="token number">16</span><span class="token punctuation">;</span>     <span class="token comment">/* count of items in listpack */</span>
    <span class="token keyword">unsigned</span> <span class="token keyword">int</span> encoding <span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">;</span>   <span class="token comment">/* RAW==1 or LZF==2 */</span>
    <span class="token keyword">unsigned</span> <span class="token keyword">int</span> container <span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">;</span>  <span class="token comment">/* PLAIN==1 or PACKED==2 */</span>
    <span class="token keyword">unsigned</span> <span class="token keyword">int</span> recompress <span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">/* was this node previous compressed? */</span>
    <span class="token keyword">unsigned</span> <span class="token keyword">int</span> attempted_compress <span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">/* node can't compress; too small */</span>
    <span class="token keyword">unsigned</span> <span class="token keyword">int</span> dont_compress <span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">/* prevent compression of entry that will be used later */</span>
    <span class="token keyword">unsigned</span> <span class="token keyword">int</span> extra <span class="token operator">:</span> <span class="token number">9</span><span class="token punctuation">;</span> <span class="token comment">/* more bits to steal for future usage */</span>
<span class="token punctuation">}</span> quicklistNode<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>
<ul>
<li>quicklistLZF</li>
</ul>
<details class="hint-container details"><summary>代码详情</summary>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">typedef</span> <span class="token keyword">struct</span> <span class="token class-name">quicklistLZF</span> <span class="token punctuation">{</span>
    <span class="token class-name">size_t</span> sz<span class="token punctuation">;</span> <span class="token comment">/* LZF size in bytes*/</span>
    <span class="token keyword">char</span> compressed<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> quicklistLZF<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>
<ul>
<li>quicklistBookmark</li>
</ul>
<details class="hint-container details"><summary>代码详情</summary>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">typedef</span> <span class="token keyword">struct</span> <span class="token class-name">quicklistBookmark</span> <span class="token punctuation">{</span>
    quicklistNode <span class="token operator">*</span>node<span class="token punctuation">;</span>
    <span class="token keyword">char</span> <span class="token operator">*</span>name<span class="token punctuation">;</span>
<span class="token punctuation">}</span> quicklistBookmark<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>
<ul>
<li>quicklist</li>
</ul>
<details class="hint-container details"><summary>代码详情</summary>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">typedef</span> <span class="token keyword">struct</span> <span class="token class-name">quicklist</span> <span class="token punctuation">{</span>
    quicklistNode <span class="token operator">*</span>head<span class="token punctuation">;</span>
    quicklistNode <span class="token operator">*</span>tail<span class="token punctuation">;</span>
    <span class="token keyword">unsigned</span> <span class="token keyword">long</span> count<span class="token punctuation">;</span>        <span class="token comment">/* total count of all entries in all listpacks */</span>
    <span class="token keyword">unsigned</span> <span class="token keyword">long</span> len<span class="token punctuation">;</span>          <span class="token comment">/* number of quicklistNodes */</span>
    <span class="token keyword">signed</span> <span class="token keyword">int</span> fill <span class="token operator">:</span> QL_FILL_BITS<span class="token punctuation">;</span>       <span class="token comment">/* fill factor for individual nodes */</span>
    <span class="token keyword">unsigned</span> <span class="token keyword">int</span> compress <span class="token operator">:</span> QL_COMP_BITS<span class="token punctuation">;</span> <span class="token comment">/* depth of end nodes not to compress;0=off */</span>
    <span class="token keyword">unsigned</span> <span class="token keyword">int</span> bookmark_count<span class="token operator">:</span> QL_BM_BITS<span class="token punctuation">;</span>
    quicklistBookmark bookmarks<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> quicklist<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>
<ul>
<li>quicklistIter</li>
</ul>
<details class="hint-container details"><summary>代码详情</summary>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">typedef</span> <span class="token keyword">struct</span> <span class="token class-name">quicklistIter</span> <span class="token punctuation">{</span>
    quicklist <span class="token operator">*</span>quicklist<span class="token punctuation">;</span>
    quicklistNode <span class="token operator">*</span>current<span class="token punctuation">;</span>
    <span class="token keyword">unsigned</span> <span class="token keyword">char</span> <span class="token operator">*</span>zi<span class="token punctuation">;</span> <span class="token comment">/* points to the current element */</span>
    <span class="token keyword">long</span> offset<span class="token punctuation">;</span> <span class="token comment">/* offset in current listpack */</span>
    <span class="token keyword">int</span> direction<span class="token punctuation">;</span>
<span class="token punctuation">}</span> quicklistIter<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>
<ul>
<li>quicklistEntry</li>
</ul>
<details class="hint-container details"><summary>代码详情</summary>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">typedef</span> <span class="token keyword">struct</span> <span class="token class-name">quicklistEntry</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> quicklist <span class="token operator">*</span>quicklist<span class="token punctuation">;</span>
    quicklistNode <span class="token operator">*</span>node<span class="token punctuation">;</span>
    <span class="token keyword">unsigned</span> <span class="token keyword">char</span> <span class="token operator">*</span>zi<span class="token punctuation">;</span>
    <span class="token keyword">unsigned</span> <span class="token keyword">char</span> <span class="token operator">*</span>value<span class="token punctuation">;</span>
    <span class="token keyword">long</span> <span class="token keyword">long</span> longval<span class="token punctuation">;</span>
    <span class="token class-name">size_t</span> sz<span class="token punctuation">;</span>
    <span class="token keyword">int</span> offset<span class="token punctuation">;</span>
<span class="token punctuation">}</span> quicklistEntry<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>
<ul>
<li>
<Badge text="quicklistNode" type="tip" vertical="middle" />： 宏观上, quicklist是一个链表, 这个结构描述的就是链表中的结点. 它通过zl字段持有底层的ziplist. 简单来讲, 它描述了一个ziplist实例</li>
<li>
<Badge text="quicklistLZF" type="info" vertical="middle" />：ziplist是一段连续的内存, 用LZ4算法压缩后, 就可以包装成一个quicklistLZF结构. 是否压缩quicklist中的每个ziplist实例是一个可配置项. 若这个配置项是开启的, 那么quicklistNode.zl字段指向的就不是一个ziplist实例, 而是一个压缩后的quicklistLZF实例</li>
<li>
<Badge text="quicklistBookmark" type="note" vertical="middle" />：在quicklist尾部增加的一个书签，它只有在大量节点的多余内存使用量可以忽略不计的情况且确实需要分批迭代它们，才会被使用。当不使用它们时，它们不会增加任何内存开销。</li>
<li>
<Badge text="quicklist" type="danger" vertical="middle" />：这就是一个双链表的定义. head, tail分别指向头尾指针. len代表链表中的结点. count指的是整个quicklist中的所有ziplist中的entry的数目. fill字段影响着每个链表结点中ziplist的最大占用空间, compress影响着是否要对每个ziplist以LZ4算法进行进一步压缩以更节省内存空间.</li>
<li>
<Badge text="quicklistIter" type="warning" vertical="middle" />：是一个迭代器quicklistEntry是对ziplist中的entry概念的封装. </li>
<li>
<Badge text="quicklist" type="info" vertical="middle" />：作为一个封装良好的数据结构, 不希望使用者感知到其内部的实现, 所以需要把ziplist.entry的概念重新包装一下.</li>
</ul>
<h3 id="限制压缩" tabindex="-1"><a class="header-anchor" href="#限制压缩" aria-hidden="true">#</a> 限制压缩</h3>
<p><strong>限制</strong></p>
<p>为了避免 QuickList 中的每一个 ZipList 中 Entry 过多，Redis 提供了一个配置项：list-max-ziplist-size 来限制。</p>
<ul>
<li>如果值为正，则代表 ZipList 允许 Entry 个数的最大值</li>
<li>如果值为负，则代表 ZipList 的最大内存大小，分为5种情况：
<ul>
<li>-1 ：每个 ZipList 的内存占用不能超过 4 kb</li>
<li>-2 ：每个 ZipList 的内存占用不能超过 8 kb</li>
<li>-3 ：每个 ZipList 的内存占用不能超过 16 kb</li>
<li>-4 ：每个 ZipList 的内存占用不能超过 32 kb</li>
<li>-5 ：每个 ZipList 的内存占用不能超过 64 kb</li>
<li>默认值为 -2 ，可以使用 <code v-pre>config get list-max-ziplist-size</code>命令查看。</li>
</ul>
</li>
</ul>
<p><strong>压缩</strong></p>
<p>除了控制 ZipList 的大小，QuickList 还可以对节点的 ZipList 做压缩。通过配置项 list-compress-depth 来控制。因为链表一般都是从首尾访问较多，所以首尾是不压缩的。这个参数是控制首尾不压缩的节点个数：</p>
<ul>
<li>0 ：特殊值，代表不压缩</li>
<li>1 ：标示 QuickList 的首尾各有 1 个节点不压缩，中间节点压缩</li>
<li>2 ：标示 QuickList 的首尾各有 2 个节点不压缩，中间节点压缩</li>
<li>......依次类推</li>
<li>默认值为0，可以使用<code v-pre>config list-compress-depth</code>命令查看</li>
</ul>
<h3 id="quicklist小结" tabindex="-1"><a class="header-anchor" href="#quicklist小结" aria-hidden="true">#</a> QuickList小结</h3>
<ul>
<li>QuickList 是一个节点为 ZipList 的双端列表</li>
<li>节点采用 ZipList ，解决了传统链表的内存占用问题</li>
<li>控制 ZipList 大小，解决连续内存空间申请效率问题</li>
<li>中间节点可以压缩，进一步节省了内存</li>
</ul>
<h2 id="跳表skiplist" tabindex="-1"><a class="header-anchor" href="#跳表skiplist" aria-hidden="true">#</a> 跳表SkipList</h2>
<h3 id="基本概念-4" tabindex="-1"><a class="header-anchor" href="#基本概念-4" aria-hidden="true">#</a> 基本概念</h3>
<p>SkipList （跳表）首先是链表，但是与传统的链表相比有些差异：</p>
<ul>
<li>SkipList 中的元素按照升序进行排列存储</li>
<li>节点可能包含多个指针，指针的跨度不同，最多支持 32 级指针。</li>
</ul>
<blockquote>
<p>几级指针代表一次横跨几个节点。</p>
</blockquote>
<figure><img src="@source/../assets/redis-datastruct-underlying-implementation/2023-06-18-21-52-01.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<figure><img src="@source/../assets/redis-datastruct-underlying-implementation/2023-06-18-21-58-56.png" alt="SkipList内存结构" tabindex="0" loading="lazy"><figcaption>SkipList内存结构</figcaption></figure>
<h3 id="底层实现-4" tabindex="-1"><a class="header-anchor" href="#底层实现-4" aria-hidden="true">#</a> 底层实现</h3>
<ul>
<li>zskiplist</li>
</ul>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">typedef</span> <span class="token keyword">struct</span> <span class="token class-name">zskiplist</span> <span class="token punctuation">{</span>
    <span class="token keyword">struct</span> <span class="token class-name">zskiplistNode</span> <span class="token operator">*</span>header<span class="token punctuation">,</span> <span class="token operator">*</span>tail<span class="token punctuation">;</span>
    <span class="token keyword">unsigned</span> <span class="token keyword">long</span> length<span class="token punctuation">;</span>
    <span class="token keyword">int</span> level<span class="token punctuation">;</span>
<span class="token punctuation">}</span> zskiplist<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>zskiplistNode</li>
</ul>
<div class="language-c line-numbers-mode" data-ext="c"><pre v-pre class="language-c"><code><span class="token keyword">typedef</span> <span class="token keyword">struct</span> <span class="token class-name">zskiplistNode</span> <span class="token punctuation">{</span>
    sds ele<span class="token punctuation">;</span>
    <span class="token keyword">double</span> score<span class="token punctuation">;</span>
    <span class="token keyword">struct</span> <span class="token class-name">zskiplistNode</span> <span class="token operator">*</span>backward<span class="token punctuation">;</span>
    <span class="token keyword">struct</span> <span class="token class-name">zskiplistLevel</span> <span class="token punctuation">{</span>
        <span class="token keyword">struct</span> <span class="token class-name">zskiplistNode</span> <span class="token operator">*</span>forward<span class="token punctuation">;</span>
        <span class="token keyword">unsigned</span> <span class="token keyword">long</span> span<span class="token punctuation">;</span>
    <span class="token punctuation">}</span> level<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> zskiplistNode<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="skiplist小结" tabindex="-1"><a class="header-anchor" href="#skiplist小结" aria-hidden="true">#</a> SkipList小结</h3>
<ul>
<li>跳跃表是一个双向链表，每个节点都包含 score 和 ele 值</li>
<li>节点按照 score 值排序，score 值一样则按照 ele 字典排序</li>
<li>每个节点都可以包含多层指针，层数是 1 到 32 之间的随机数</li>
<li>不同层指针到下一个节点的跨度不同，层级越高，跨度越大</li>
<li>增删改查效率与红黑树基本一致，实现却更简单</li>
</ul>
</div></template>


