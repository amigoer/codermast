<template><div><h1 id="java基础-7-数组" tabindex="-1"><a class="header-anchor" href="#java基础-7-数组" aria-hidden="true">#</a> Java基础 - 7.数组</h1>
<p>数组是一种存储相同数据类型支持随机访问的数据集合。</p>
<ul>
<li>语法</li>
</ul>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token class-name">DataType</span><span class="token punctuation">[</span><span class="token punctuation">]</span> arrName <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DataType</span><span class="token punctuation">[</span>arrSize<span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token comment">// 或者</span>
<span class="token class-name">DataType</span> arrName<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DataType</span><span class="token punctuation">[</span>arrSize<span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// 不推荐</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol>
<li>数组的下标是从0开始到arr.length - 1;</li>
<li>数组是支持随机访问的，可以直接访问指定下标的数据。格式为 arr[index];</li>
</ol>
<blockquote>
<p>这里说的支持随机访问，是因为数组在内存中的存储是连续的，所以可以直接访问到需要的内存中。</p>
</blockquote>
<ol start="3">
<li>数组只能存储相同数据类型的数据。</li>
<li>数组在创建时就需要给定大小。</li>
</ol>
<h2 id="_1️⃣数组创建" tabindex="-1"><a class="header-anchor" href="#_1️⃣数组创建" aria-hidden="true">#</a> 1️⃣数组创建</h2>
<ol>
<li>直接创建赋值</li>
</ol>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> arr <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">,</span><span class="token number">5</span><span class="token punctuation">,</span><span class="token number">6</span><span class="token punctuation">,</span><span class="token number">7</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p>这种方式是直接对创建的数组进行赋值，适用于数据量少且简单的数组。</p>
</blockquote>
<ol start="2">
<li>创建后再赋值</li>
</ol>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> arr <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token number">5</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>i <span class="token operator">&lt;</span> arr<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i <span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> i <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>这种方式是对先创建好数组，再对数组进行赋值操作，适用数据量大的情况下。</p>
</blockquote>
<h2 id="_2️⃣数组处理" tabindex="-1"><a class="header-anchor" href="#_2️⃣数组处理" aria-hidden="true">#</a> 2️⃣数组处理</h2>
<p>一般对数组的操作就是循环，这里介绍两种循环的方式：</p>
<ul>
<li>for-i循环</li>
</ul>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>i<span class="token operator">&lt;</span>arr<span class="token punctuation">.</span>length<span class="token punctuation">;</span>i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token class-name">Value</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>for-each增强循环</li>
</ul>
<blockquote>
<p>这种情况多半使用在数组的遍历，不能够进行赋值操作。</p>
</blockquote>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Datatype</span> num <span class="token operator">:</span> arr<span class="token punctuation">)</span><span class="token punctuation">{</span>
	<span class="token comment">//statement</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里适用的情况是所有有顺序的集合结构，如链表、数组等...</p>
<h2 id="_3️⃣多维数组" tabindex="-1"><a class="header-anchor" href="#_3️⃣多维数组" aria-hidden="true">#</a> 3️⃣多维数组</h2>
<p>多维数组实际上可以看作是一维数组，原理都是一致的。</p>
<p>把一个n维度的数组，看作一维数组的话，其数组元素为n - 1维度的数组，依次类推。</p>
<p>初始化方式和一维数组一致，这里不做过多的赘述。</p>
<p>需要了解的是，数组在初始化的时候需要给定数组大小，那么对于多维数组而言，只需要给定其n - 1维度数组的个数即可。</p>
<p>一般最常用的是二维数组，多维以上很少使用。</p>
<h2 id="💦arrays类" tabindex="-1"><a class="header-anchor" href="#💦arrays类" aria-hidden="true">#</a> 💦Arrays类</h2>
<p>java.util.Arrays 类能方便地操作数组，它提供的所有方法都是静态的。</p>
<p>具有以下功能：</p>
<ul>
<li>给数组赋值：通过 fill 方法。</li>
<li>对数组排序：通过 sort 方法,按升序。</li>
<li>比较数组：通过 equals 方法比较数组中元素值是否相等。</li>
<li>查找数组元素：通过 binarySearch 方法能对排序好的数组进行二分查找法操作。</li>
</ul>
<p>具体说明请查看下表：</p>
<table>
<thead>
<tr>
<th style="text-align:left">序号</th>
<th style="text-align:left">方法和说明</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">1</td>
<td style="text-align:left"><strong>public static int binarySearch(Object[] a, Object key)</strong> 用二分查找算法在给定数组中搜索给定值的对象(Byte,Int,double等)。数组在调用前必须排序好的。如果查找值包含在数组中，则返回搜索键的索引；否则返回 (-(<em>插入点</em>) - 1)。</td>
</tr>
<tr>
<td style="text-align:left">2</td>
<td style="text-align:left"><strong>public static boolean equals(long[] a, long[] a2)</strong> 如果两个指定的 long 型数组彼此<em>相等</em>，则返回 true。如果两个数组包含相同数量的元素，并且两个数组中的所有相应元素对都是相等的，则认为这两个数组是相等的。换句话说，如果两个数组以相同顺序包含相同的元素，则两个数组是相等的。同样的方法适用于所有的其他基本数据类型（Byte，short，Int等）。</td>
</tr>
<tr>
<td style="text-align:left">3</td>
<td style="text-align:left"><strong>public static void fill(int[] a, int val)</strong> 将指定的 int 值分配给指定 int 型数组指定范围中的每个元素。同样的方法适用于所有的其他基本数据类型（Byte，short，Int等）。</td>
</tr>
<tr>
<td style="text-align:left">4</td>
<td style="text-align:left"><strong>public static void sort(Object[] a)</strong> 对指定对象数组根据其元素的自然顺序进行升序排列。同样的方法适用于所有的其他基本数据类型（Byte，short，Int等）。</td>
</tr>
</tbody>
</table>
<blockquote>
<p>对于更多的Arrays类的方法可以参考JDK8的官方文档进行查阅。
这里的数据来源于：菜鸟教程</p>
</blockquote>
</div></template>


