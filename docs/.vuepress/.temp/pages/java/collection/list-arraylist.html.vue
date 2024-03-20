<template><div><h1 id="collection-arraylist-源码解析" tabindex="-1"><a class="header-anchor" href="#collection-arraylist-源码解析" aria-hidden="true">#</a> Collection - ArrayList 源码解析</h1>
<figure><img src="@source/../assets/list-arraylist/2024-03-20-12-47-16.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h2 id="介绍" tabindex="-1"><a class="header-anchor" href="#介绍" aria-hidden="true">#</a> 介绍</h2>
<p>ArrayList 是 List 接口基于数组的一个实现类，故其是一个顺序集合，放入元素的顺序和实际存储的顺序是相同的，并且可以动态修改，与普通数组的区别就是它是没有固定大小的限制，我们可以添加或删除元素。</p>
<p>ArrayList 继承了 AbstractList ，并实现了 List 接口。</p>
<h2 id="使用" tabindex="-1"><a class="header-anchor" href="#使用" aria-hidden="true">#</a> 使用</h2>
<p>ArrayList 位于 java.util 包下，语法格式如下：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">></span></span> list <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 由于 ArrayList 是 List 接口的实现类，故常常这样使用</span>
<span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">E</span><span class="token punctuation">></span></span> list <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>E : 代表想要存进 ArrayList 中的数据类型，只能是引用类型，想存基本数据类型时，使用其包装类即可。</li>
</ul>
<p>由于无法对 ArrayList 中的底层数组进行操作，想要操作时只能通过引用去调用对应的方法进行操作。常见的方法有：</p>
<ul>
<li>add()：增加一个元素</li>
<li>addAll()：增加多个元素</li>
<li>set()：修改元素</li>
<li>remove()：删除一个元素</li>
<li>get()：获取指定位置的元素</li>
<li>toArray()：获取一个转换数组</li>
<li>sort()：排序</li>
<li>size()：计算大小</li>
<li>isEmpty()：判断是否为空</li>
</ul>
<h2 id="arraylist实现" tabindex="-1"><a class="header-anchor" href="#arraylist实现" aria-hidden="true">#</a> ArrayList实现</h2>
<h3 id="底层存储" tabindex="-1"><a class="header-anchor" href="#底层存储" aria-hidden="true">#</a> 底层存储</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * The array buffer into which the elements of the ArrayList are stored.
 * The capacity of the ArrayList is the length of this array buffer. Any
 * empty ArrayList with elementData == DEFAULTCAPACITY_EMPTY_ELEMENTDATA
 * will be expanded to DEFAULT_CAPACITY when the first element is added.
 */</span>
<span class="token comment">// non-private to simplify nested class access</span>
<span class="token keyword">transient</span> <span class="token class-name">Object</span><span class="token punctuation">[</span><span class="token punctuation">]</span> elementData<span class="token punctuation">;</span> 

<span class="token doc-comment comment">/**
 * The size of the ArrayList (the number of elements it contains).
 *
 * <span class="token keyword">@serial</span>
 */</span>
<span class="token keyword">private</span> <span class="token keyword">int</span> size<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由 ArrayList 的源码不难看出，其底层本质上还是一个数组，只不过提供了一些封装了各种操作该数组的方法，并且维护好了各项数据。</p>
<h3 id="构造方法" tabindex="-1"><a class="header-anchor" href="#构造方法" aria-hidden="true">#</a> 构造方法</h3>
<p>ArrayList 集合提供了三个构造方法：分别是 无参构造法、指定容量的构造法、指定内容的构造法。</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * Default initial capacity.
 */</span>
<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">int</span> <span class="token constant">DEFAULT_CAPACITY</span> <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
 * Constructs an empty list with the specified initial capacity.
 *
 * <span class="token keyword">@param</span>  <span class="token parameter">initialCapacity</span>  the initial capacity of the list
 * <span class="token keyword">@throws</span> <span class="token reference"><span class="token class-name">IllegalArgumentException</span></span> if the specified initial capacity
 *         is negative
 */</span>
<span class="token keyword">public</span> <span class="token class-name">ArrayList</span><span class="token punctuation">(</span><span class="token keyword">int</span> initialCapacity<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>initialCapacity <span class="token operator">></span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>elementData <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Object</span><span class="token punctuation">[</span>initialCapacity<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>initialCapacity <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>elementData <span class="token operator">=</span> <span class="token constant">EMPTY_ELEMENTDATA</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalArgumentException</span><span class="token punctuation">(</span><span class="token string">"Illegal Capacity: "</span><span class="token operator">+</span>
                                            initialCapacity<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token doc-comment comment">/**
 * Constructs an empty list with an initial capacity of ten.
 */</span>
<span class="token keyword">public</span> <span class="token class-name">ArrayList</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>elementData <span class="token operator">=</span> <span class="token constant">DEFAULTCAPACITY_EMPTY_ELEMENTDATA</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token doc-comment comment">/**
 * Constructs a list containing the elements of the specified
 * collection, in the order they are returned by the collection's
 * iterator.
 *
 * <span class="token keyword">@param</span> <span class="token parameter">c</span> the collection whose elements are to be placed into this list
 * <span class="token keyword">@throws</span> <span class="token reference"><span class="token class-name">NullPointerException</span></span> if the specified collection is null
 */</span>
<span class="token keyword">public</span> <span class="token class-name">ArrayList</span><span class="token punctuation">(</span><span class="token class-name">Collection</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span> <span class="token keyword">extends</span> <span class="token class-name">E</span><span class="token punctuation">></span></span> c<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Object</span><span class="token punctuation">[</span><span class="token punctuation">]</span> a <span class="token operator">=</span> c<span class="token punctuation">.</span><span class="token function">toArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>size <span class="token operator">=</span> a<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>c<span class="token punctuation">.</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token class-name">ArrayList</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            elementData <span class="token operator">=</span> a<span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            elementData <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">copyOf</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> size<span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token comment">// replace with empty array.</span>
        elementData <span class="token operator">=</span> <span class="token constant">EMPTY_ELEMENTDATA</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container tip">
<p class="hint-container-title">默认容量</p>
<p>由该部分的源码可以看出，初始化时如果未指定容量，则默认的容量大小为10；</p>
</div>
<h3 id="add方法" tabindex="-1"><a class="header-anchor" href="#add方法" aria-hidden="true">#</a> add方法</h3>
<p>ArrayList 中提供了 4 个 add 方法，具体如下：</p>
<table>
<thead>
<tr>
<th style="text-align:center">方法名</th>
<th style="text-align:center">功能</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">public boolean add(E e)</td>
<td style="text-align:center">实现的 List 接口内的 add 方法，添加并判断是否添加成功</td>
</tr>
<tr>
<td style="text-align:center">public void add(E e)</td>
<td style="text-align:center">添加元素 e 到列表的末尾</td>
</tr>
<tr>
<td style="text-align:center">public void add(int index, E element)</td>
<td style="text-align:center">添加元素 element 到数组的 index 位置</td>
</tr>
<tr>
<td style="text-align:center">public boolean addAll(Collection&lt;? extends E&gt; c)</td>
<td style="text-align:center">将指定集合 c 中的元素依次添加到列表的末尾</td>
</tr>
<tr>
<td style="text-align:center">public boolean addAll(int index, Collection&lt;? extends E&gt; c)</td>
<td style="text-align:center">将指定集合 c 中的元素依次添加到列表的 index 位置</td>
</tr>
</tbody>
</table>
<figure><img src="@source/../assets/list-arraylist/2024-03-20-15-26-29.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * Appends the specified element to the end of this list.
 *
 * <span class="token keyword">@param</span> <span class="token parameter">e</span> element to be appended to this list
 * <span class="token keyword">@return</span> <span class="token punctuation">{</span><span class="token keyword">@code</span> <span class="token code-section"><span class="token code language-java"><span class="token boolean">true</span></span></span><span class="token punctuation">}</span> (as specified by <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token class-name">Collection</span><span class="token punctuation">#</span><span class="token field">add</span></span><span class="token punctuation">}</span>)
 */</span>
<span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token class-name">E</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    modCount<span class="token operator">++</span><span class="token punctuation">;</span>
    <span class="token function">add</span><span class="token punctuation">(</span>e<span class="token punctuation">,</span> elementData<span class="token punctuation">,</span> size<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">int</span> index<span class="token punctuation">,</span> <span class="token class-name">E</span> element<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">rangeCheckForAdd</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">checkForComodification</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    root<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>offset <span class="token operator">+</span> index<span class="token punctuation">,</span> element<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">updateSizeAndModCount</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token class-name">E</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">checkForComodification</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> i <span class="token operator">=</span> cursor<span class="token punctuation">;</span>
        <span class="token class-name">ArrayList</span><span class="token punctuation">.</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>i<span class="token punctuation">,</span> e<span class="token punctuation">)</span><span class="token punctuation">;</span>
        cursor <span class="token operator">=</span> i <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
        lastRet <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
        expectedModCount <span class="token operator">=</span> modCount<span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IndexOutOfBoundsException</span> ex<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">ConcurrentModificationException</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token doc-comment comment">/**
 * Appends all of the elements in the specified collection to the end of
 * this list, in the order that they are returned by the
 * specified collection's Iterator.  The behavior of this operation is
 * undefined if the specified collection is modified while the operation
 * is in progress.  (This implies that the behavior of this call is
 * undefined if the specified collection is this list, and this
 * list is nonempty.)
 *
 * <span class="token keyword">@param</span> <span class="token parameter">c</span> collection containing elements to be added to this list
 * <span class="token keyword">@return</span> <span class="token punctuation">{</span><span class="token keyword">@code</span> <span class="token code-section"><span class="token code language-java"><span class="token boolean">true</span></span></span><span class="token punctuation">}</span> if this list changed as a result of the call
 * <span class="token keyword">@throws</span> <span class="token reference"><span class="token class-name">NullPointerException</span></span> if the specified collection is null
 */</span>
<span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">addAll</span><span class="token punctuation">(</span><span class="token class-name">Collection</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span> <span class="token keyword">extends</span> <span class="token class-name">E</span><span class="token punctuation">></span></span> c<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Object</span><span class="token punctuation">[</span><span class="token punctuation">]</span> a <span class="token operator">=</span> c<span class="token punctuation">.</span><span class="token function">toArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    modCount<span class="token operator">++</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> numNew <span class="token operator">=</span> a<span class="token punctuation">.</span>length<span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>numNew <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token class-name">Object</span><span class="token punctuation">[</span><span class="token punctuation">]</span> elementData<span class="token punctuation">;</span>
    <span class="token keyword">final</span> <span class="token keyword">int</span> s<span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>numNew <span class="token operator">></span> <span class="token punctuation">(</span>elementData <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>elementData<span class="token punctuation">)</span><span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token punctuation">(</span>s <span class="token operator">=</span> size<span class="token punctuation">)</span><span class="token punctuation">)</span>
        elementData <span class="token operator">=</span> <span class="token function">grow</span><span class="token punctuation">(</span>s <span class="token operator">+</span> numNew<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">arraycopy</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> elementData<span class="token punctuation">,</span> s<span class="token punctuation">,</span> numNew<span class="token punctuation">)</span><span class="token punctuation">;</span>
    size <span class="token operator">=</span> s <span class="token operator">+</span> numNew<span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token doc-comment comment">/**
 * Inserts all of the elements in the specified collection into this
 * list, starting at the specified position.  Shifts the element
 * currently at that position (if any) and any subsequent elements to
 * the right (increases their indices).  The new elements will appear
 * in the list in the order that they are returned by the
 * specified collection's iterator.
 *
 * <span class="token keyword">@param</span> <span class="token parameter">index</span> index at which to insert the first element from the
 *              specified collection
 * <span class="token keyword">@param</span> <span class="token parameter">c</span> collection containing elements to be added to this list
 * <span class="token keyword">@return</span> <span class="token punctuation">{</span><span class="token keyword">@code</span> <span class="token code-section"><span class="token code language-java"><span class="token boolean">true</span></span></span><span class="token punctuation">}</span> if this list changed as a result of the call
 * <span class="token keyword">@throws</span> <span class="token reference"><span class="token class-name">IndexOutOfBoundsException</span></span> <span class="token punctuation">{</span><span class="token keyword">@inheritDoc</span><span class="token punctuation">}</span>
 * <span class="token keyword">@throws</span> <span class="token reference"><span class="token class-name">NullPointerException</span></span> if the specified collection is null
 */</span>
<span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">addAll</span><span class="token punctuation">(</span><span class="token keyword">int</span> index<span class="token punctuation">,</span> <span class="token class-name">Collection</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span> <span class="token keyword">extends</span> <span class="token class-name">E</span><span class="token punctuation">></span></span> c<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">rangeCheckForAdd</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">Object</span><span class="token punctuation">[</span><span class="token punctuation">]</span> a <span class="token operator">=</span> c<span class="token punctuation">.</span><span class="token function">toArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    modCount<span class="token operator">++</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> numNew <span class="token operator">=</span> a<span class="token punctuation">.</span>length<span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>numNew <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token class-name">Object</span><span class="token punctuation">[</span><span class="token punctuation">]</span> elementData<span class="token punctuation">;</span>
    <span class="token keyword">final</span> <span class="token keyword">int</span> s<span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>numNew <span class="token operator">></span> <span class="token punctuation">(</span>elementData <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>elementData<span class="token punctuation">)</span><span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token punctuation">(</span>s <span class="token operator">=</span> size<span class="token punctuation">)</span><span class="token punctuation">)</span>
        elementData <span class="token operator">=</span> <span class="token function">grow</span><span class="token punctuation">(</span>s <span class="token operator">+</span> numNew<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">int</span> numMoved <span class="token operator">=</span> s <span class="token operator">-</span> index<span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>numMoved <span class="token operator">></span> <span class="token number">0</span><span class="token punctuation">)</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">arraycopy</span><span class="token punctuation">(</span>elementData<span class="token punctuation">,</span> index<span class="token punctuation">,</span>
                            elementData<span class="token punctuation">,</span> index <span class="token operator">+</span> numNew<span class="token punctuation">,</span>
                            numMoved<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">arraycopy</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> elementData<span class="token punctuation">,</span> index<span class="token punctuation">,</span> numNew<span class="token punctuation">)</span><span class="token punctuation">;</span>
    size <span class="token operator">=</span> s <span class="token operator">+</span> numNew<span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="get方法" tabindex="-1"><a class="header-anchor" href="#get方法" aria-hidden="true">#</a> get方法</h3>
<p>ArrayList 中 get 方法只有一种实现：public E get(int index) 获取指定下标的元素</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * Returns the element at the specified position in this list.
 *
 * <span class="token keyword">@param</span>  <span class="token parameter">index</span> index of the element to return
 * <span class="token keyword">@return</span> the element at the specified position in this list
 * <span class="token keyword">@throws</span> <span class="token reference"><span class="token class-name">IndexOutOfBoundsException</span></span> <span class="token punctuation">{</span><span class="token keyword">@inheritDoc</span><span class="token punctuation">}</span>
 */</span>
<span class="token keyword">public</span> <span class="token class-name">E</span> <span class="token function">get</span><span class="token punctuation">(</span><span class="token keyword">int</span> index<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">rangeCheck</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> <span class="token function">elementData</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="set方法" tabindex="-1"><a class="header-anchor" href="#set方法" aria-hidden="true">#</a> set方法</h3>
<p>set 方法的功能为，修改指定下标的元素为 element。</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * Replaces the element at the specified position in this list with
 * the specified element.
 *
 * <span class="token keyword">@param</span> <span class="token parameter">index</span> index of the element to replace
 * <span class="token keyword">@param</span> <span class="token parameter">element</span> element to be stored at the specified position
 * <span class="token keyword">@return</span> the element previously at the specified position
 * <span class="token keyword">@throws</span> <span class="token reference"><span class="token class-name">IndexOutOfBoundsException</span></span> <span class="token punctuation">{</span><span class="token keyword">@inheritDoc</span><span class="token punctuation">}</span>
 */</span>
<span class="token keyword">public</span> <span class="token class-name">E</span> <span class="token function">set</span><span class="token punctuation">(</span><span class="token keyword">int</span> index<span class="token punctuation">,</span> <span class="token class-name">E</span> element<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">rangeCheck</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">E</span> oldValue <span class="token operator">=</span> <span class="token function">elementData</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span><span class="token punctuation">;</span>
    elementData<span class="token punctuation">[</span>index<span class="token punctuation">]</span> <span class="token operator">=</span> element<span class="token punctuation">;</span>
    <span class="token keyword">return</span> oldValue<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="remove方法" tabindex="-1"><a class="header-anchor" href="#remove方法" aria-hidden="true">#</a> remove方法</h3>
<p>ArrayList 中的 remove 方法有两个实现：</p>
<ul>
<li>public E remove(int index)：删除指定下标的元素</li>
<li>public boolean remove(Object o)：删除第一个匹配成功的指定对象</li>
</ul>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * Removes the element at the specified position in this list.
 * Shifts any subsequent elements to the left (subtracts one from their
 * indices).
 *
 * <span class="token keyword">@param</span> <span class="token parameter">index</span> the index of the element to be removed
 * <span class="token keyword">@return</span> the element that was removed from the list
 * <span class="token keyword">@throws</span> <span class="token reference"><span class="token class-name">IndexOutOfBoundsException</span></span> <span class="token punctuation">{</span><span class="token keyword">@inheritDoc</span><span class="token punctuation">}</span>
 */</span>
<span class="token keyword">public</span> <span class="token class-name">E</span> <span class="token function">remove</span><span class="token punctuation">(</span><span class="token keyword">int</span> index<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">rangeCheck</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span><span class="token punctuation">;</span>

    modCount<span class="token operator">++</span><span class="token punctuation">;</span>
    <span class="token class-name">E</span> oldValue <span class="token operator">=</span> <span class="token function">elementData</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">int</span> numMoved <span class="token operator">=</span> size <span class="token operator">-</span> index <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>numMoved <span class="token operator">></span> <span class="token number">0</span><span class="token punctuation">)</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span><span class="token function">arraycopy</span><span class="token punctuation">(</span>elementData<span class="token punctuation">,</span> index<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">,</span> elementData<span class="token punctuation">,</span> index<span class="token punctuation">,</span>
                            numMoved<span class="token punctuation">)</span><span class="token punctuation">;</span>
    elementData<span class="token punctuation">[</span><span class="token operator">--</span>size<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span> <span class="token comment">// clear to let GC do its work</span>

    <span class="token keyword">return</span> oldValue<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token doc-comment comment">/**
 * Removes the first occurrence of the specified element from this list,
 * if it is present.  If the list does not contain the element, it is
 * unchanged.  More formally, removes the element with the lowest index
 * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>tt</span><span class="token punctuation">></span></span><span class="token code-section"><span class="token line"><span class="token code language-java">i</span></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>tt</span><span class="token punctuation">></span></span> such that
 * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>tt</span><span class="token punctuation">></span></span><span class="token code-section"><span class="token line"><span class="token code language-java"><span class="token punctuation">(</span>o<span class="token operator">==</span><span class="token keyword">null</span></span><span class="token entity named-entity" title="&nbsp;">&amp;nbsp;</span><span class="token code language-java"><span class="token operator">?</span></span><span class="token entity named-entity" title="&nbsp;">&amp;nbsp;</span><span class="token code language-java"><span class="token function">get</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token operator">==</span><span class="token keyword">null</span></span><span class="token entity named-entity" title="&nbsp;">&amp;nbsp;</span><span class="token code language-java"><span class="token operator">:</span></span><span class="token entity named-entity" title="&nbsp;">&amp;nbsp;</span><span class="token code language-java">o<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token function">get</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>tt</span><span class="token punctuation">></span></span>
 * (if such an element exists).  Returns <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>tt</span><span class="token punctuation">></span></span><span class="token code-section"><span class="token line"><span class="token code language-java"><span class="token boolean">true</span></span></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>tt</span><span class="token punctuation">></span></span> if this list
 * contained the specified element (or equivalently, if this list
 * changed as a result of the call).
 *
 * <span class="token keyword">@param</span> <span class="token parameter">o</span> element to be removed from this list, if present
 * <span class="token keyword">@return</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>tt</span><span class="token punctuation">></span></span><span class="token code-section"><span class="token line"><span class="token code language-java"><span class="token boolean">true</span></span></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>tt</span><span class="token punctuation">></span></span> if this list contained the specified element
 */</span>
<span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">remove</span><span class="token punctuation">(</span><span class="token class-name">Object</span> o<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>o <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> index <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> index <span class="token operator">&lt;</span> size<span class="token punctuation">;</span> index<span class="token operator">++</span><span class="token punctuation">)</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>elementData<span class="token punctuation">[</span>index<span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token function">fastRemove</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> index <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> index <span class="token operator">&lt;</span> size<span class="token punctuation">;</span> index<span class="token operator">++</span><span class="token punctuation">)</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>o<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>elementData<span class="token punctuation">[</span>index<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token function">fastRemove</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="自动扩容" tabindex="-1"><a class="header-anchor" href="#自动扩容" aria-hidden="true">#</a> 自动扩容</h3>
<p>每次向数组中添加元素时，都会去检查添加元素的个数是否会超过当前数组的长度，如果超出，数组则会进行扩容，直到满足添加数据的需求为止。ArrayList 中的扩容是通过 ensureCapacity(int minCapacity) 方法，实际执行扩容的过程是通过调用 grow(int minCapacity) 方法来实现的。每次扩容后会变为原来容量的 1.5 倍。</p>
<p><strong>扩容过程为：</strong></p>
<ol>
<li>当添加元素时，首先会检查当前数组的容量是否足够存放新元素。如果容量不够，则会执行扩容操作。</li>
<li>扩容操作会创建一个新的数组，通常是原来容量的 1.5 倍大小。</li>
<li>然后将原数组中的元素复制到新数组中。</li>
<li>最后，将新数组设置为 ArrayList 的内部数组，以替代原来的数组。</li>
</ol>
<figure><img src="@source/../assets/list-arraylist/2024-03-20-15-26-41.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * Increases the capacity of this <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>tt</span><span class="token punctuation">></span></span><span class="token code-section"><span class="token line"><span class="token code language-java"><span class="token class-name">ArrayList</span></span></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>tt</span><span class="token punctuation">></span></span> instance, if
 * necessary, to ensure that it can hold at least the number of elements
 * specified by the minimum capacity argument.
 *
 * <span class="token keyword">@param</span>   <span class="token parameter">minCapacity</span>   the desired minimum capacity
 */</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">ensureCapacity</span><span class="token punctuation">(</span><span class="token keyword">int</span> minCapacity<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> minExpand <span class="token operator">=</span> <span class="token punctuation">(</span>elementData <span class="token operator">!=</span> <span class="token constant">DEFAULTCAPACITY_EMPTY_ELEMENTDATA</span><span class="token punctuation">)</span>
        <span class="token comment">// any size if not default element table</span>
        <span class="token operator">?</span> <span class="token number">0</span>
        <span class="token comment">// larger than default for default empty table. It's already</span>
        <span class="token comment">// supposed to be at default size.</span>
        <span class="token operator">:</span> <span class="token constant">DEFAULT_CAPACITY</span><span class="token punctuation">;</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>minCapacity <span class="token operator">></span> minExpand<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">ensureExplicitCapacity</span><span class="token punctuation">(</span>minCapacity<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">ensureCapacityInternal</span><span class="token punctuation">(</span><span class="token keyword">int</span> minCapacity<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">ensureExplicitCapacity</span><span class="token punctuation">(</span><span class="token function">calculateCapacity</span><span class="token punctuation">(</span>elementData<span class="token punctuation">,</span> minCapacity<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">ensureExplicitCapacity</span><span class="token punctuation">(</span><span class="token keyword">int</span> minCapacity<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    modCount<span class="token operator">++</span><span class="token punctuation">;</span>

    <span class="token comment">// overflow-conscious code</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>minCapacity <span class="token operator">-</span> elementData<span class="token punctuation">.</span>length <span class="token operator">></span> <span class="token number">0</span><span class="token punctuation">)</span>
        <span class="token function">grow</span><span class="token punctuation">(</span>minCapacity<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token doc-comment comment">/**
 * Increases the capacity to ensure that it can hold at least the
 * number of elements specified by the minimum capacity argument.
 *
 * <span class="token keyword">@param</span> <span class="token parameter">minCapacity</span> the desired minimum capacity
 */</span>
<span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">grow</span><span class="token punctuation">(</span><span class="token keyword">int</span> minCapacity<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// overflow-conscious code</span>
    <span class="token keyword">int</span> oldCapacity <span class="token operator">=</span> elementData<span class="token punctuation">.</span>length<span class="token punctuation">;</span>
    <span class="token keyword">int</span> newCapacity <span class="token operator">=</span> oldCapacity <span class="token operator">+</span> <span class="token punctuation">(</span>oldCapacity <span class="token operator">>></span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>newCapacity <span class="token operator">-</span> minCapacity <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span>
        newCapacity <span class="token operator">=</span> minCapacity<span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>newCapacity <span class="token operator">-</span> <span class="token constant">MAX_ARRAY_SIZE</span> <span class="token operator">></span> <span class="token number">0</span><span class="token punctuation">)</span>
        newCapacity <span class="token operator">=</span> <span class="token function">hugeCapacity</span><span class="token punctuation">(</span>minCapacity<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// minCapacity is usually close to size, so this is a win:</span>
    elementData <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">copyOf</span><span class="token punctuation">(</span>elementData<span class="token punctuation">,</span> newCapacity<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


