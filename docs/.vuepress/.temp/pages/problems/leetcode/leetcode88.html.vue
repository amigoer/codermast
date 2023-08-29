<template><div><h1 id="_88-合并两个有序数组" tabindex="-1"><a class="header-anchor" href="#_88-合并两个有序数组" aria-hidden="true">#</a> 88.合并两个有序数组</h1>
<h2 id="题目介绍" tabindex="-1"><a class="header-anchor" href="#题目介绍" aria-hidden="true">#</a> 题目介绍</h2>
<p>给你两个按 非递减顺序 排列的整数数组 nums1 和 nums2，另有两个整数 m 和 n ，分别表示 nums1 和 nums2 中的元素数目。</p>
<p>请你 合并 nums2 到 nums1 中，使合并后的数组同样按 非递减顺序 排列。</p>
<p>注意：最终，合并后数组不应由函数返回，而是存储在数组 nums1 中。为了应对这种情况，nums1 的初始长度为 m + n，其中前 m 个元素表示应合并的元素，后 n 个元素为 0 ，应忽略。nums2 的长度为 n 。</p>
<p>示例 1：</p>
<p>输入：nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3<br>
输出：[1,2,2,3,5,6]<br>
解释：需要合并 [1,2,3] 和 [2,5,6] 。<br>
合并结果是 [1,2,2,3,5,6] ，其中斜体加粗标注的为 nums1 中的元素。<br>
示例 2：</p>
<p>输入：nums1 = [1], m = 1, nums2 = [], n = 0<br>
输出：[1]<br>
解释：需要合并 [1] 和 [] 。<br>
合并结果是 [1] 。<br>
示例 3：</p>
<p>输入：nums1 = [0], m = 0, nums2 = [1], n = 1<br>
输出：[1]<br>
解释：需要合并的数组是 [] 和 [1] 。<br>
合并结果是 [1] 。<br>
注意，因为 m = 0 ，所以 nums1 中没有元素。nums1 中仅存的 0 仅仅是为了确保合并结果可以顺利存放到 nums1 中。</p>
<p>提示：</p>
<p>nums1.length == m + n<br>
nums2.length == n<br>
0 &lt;= m, n &lt;= 200<br>
1 &lt;= m + n &lt;= 200<br>
-109 &lt;= nums1[i], nums2[j] &lt;= 109</p>
<p>进阶：你可以设计实现一个时间复杂度为 O(m + n) 的算法解决此问题吗？</p>
<h2 id="题目地址" tabindex="-1"><a class="header-anchor" href="#题目地址" aria-hidden="true">#</a> 题目地址</h2>
<p><a href="https://leetcode.cn/problems/merge-sorted-array" target="_blank" rel="noopener noreferrer">https://leetcode.cn/problems/merge-sorted-array<ExternalLinkIcon/></a></p>
<h2 id="题解" tabindex="-1"><a class="header-anchor" href="#题解" aria-hidden="true">#</a> 题解</h2>
<ul>
<li>解法1：合并后排序</li>
</ul>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">merge</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> nums1<span class="token punctuation">,</span> <span class="token keyword">int</span> m<span class="token punctuation">,</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> nums2<span class="token punctuation">,</span> <span class="token keyword">int</span> n<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> m<span class="token punctuation">;</span>i<span class="token operator">&lt;</span>nums1<span class="token punctuation">.</span>length<span class="token punctuation">;</span>i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            nums1<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> nums2<span class="token punctuation">[</span>i <span class="token operator">-</span> m<span class="token punctuation">]</span><span class="token punctuation">;</span> 
        <span class="token punctuation">}</span>
        <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">sort</span><span class="token punctuation">(</span>nums1<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>解法2：正向双指针</li>
</ul>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">merge</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> nums1<span class="token punctuation">,</span> <span class="token keyword">int</span> m<span class="token punctuation">,</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> nums2<span class="token punctuation">,</span> <span class="token keyword">int</span> n<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> j <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> arr <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span>m <span class="token operator">+</span> n<span class="token punctuation">]</span><span class="token punctuation">;</span>

        <span class="token keyword">int</span> index <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

        <span class="token keyword">while</span> <span class="token punctuation">(</span>i <span class="token operator">&lt;</span> m <span class="token operator">||</span> j <span class="token operator">&lt;</span> n<span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>i <span class="token operator">==</span> m<span class="token punctuation">)</span><span class="token punctuation">{</span>
                arr<span class="token punctuation">[</span>index<span class="token punctuation">]</span> <span class="token operator">=</span> nums2<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">;</span>
                j <span class="token operator">++</span><span class="token punctuation">;</span>
                index <span class="token operator">++</span><span class="token punctuation">;</span>
                <span class="token keyword">continue</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            <span class="token keyword">if</span><span class="token punctuation">(</span>j <span class="token operator">==</span> n<span class="token punctuation">)</span><span class="token punctuation">{</span>
                arr<span class="token punctuation">[</span>index<span class="token punctuation">]</span> <span class="token operator">=</span> nums1<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
                i <span class="token operator">++</span><span class="token punctuation">;</span>
                index <span class="token operator">++</span><span class="token punctuation">;</span>
                <span class="token keyword">continue</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            <span class="token keyword">if</span> <span class="token punctuation">(</span>nums1<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">&lt;</span> nums2<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                arr<span class="token punctuation">[</span>index<span class="token punctuation">]</span> <span class="token operator">=</span> nums1<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
                i <span class="token operator">++</span><span class="token punctuation">;</span>
                index <span class="token operator">++</span><span class="token punctuation">;</span>

            <span class="token punctuation">}</span><span class="token keyword">else</span> <span class="token punctuation">{</span>
                arr<span class="token punctuation">[</span>index<span class="token punctuation">]</span> <span class="token operator">=</span> nums2<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">;</span>
                j <span class="token operator">++</span><span class="token punctuation">;</span>
                index <span class="token operator">++</span><span class="token punctuation">;</span>

            <span class="token punctuation">}</span>

        <span class="token punctuation">}</span>

        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> k <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> k <span class="token operator">&lt;</span> nums1<span class="token punctuation">.</span>length<span class="token punctuation">;</span> k<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            nums1<span class="token punctuation">[</span>k<span class="token punctuation">]</span> <span class="token operator">=</span> arr<span class="token punctuation">[</span>k<span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>解法3：逆向双指针</li>
</ul>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">merge</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> nums1<span class="token punctuation">,</span> <span class="token keyword">int</span> m<span class="token punctuation">,</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> nums2<span class="token punctuation">,</span> <span class="token keyword">int</span> n<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> i <span class="token operator">=</span> m <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> j <span class="token operator">=</span> n <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> index <span class="token operator">=</span> m <span class="token operator">+</span> n <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>i <span class="token operator">>=</span> <span class="token number">0</span> <span class="token operator">||</span> j <span class="token operator">>=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>i <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                nums1<span class="token punctuation">[</span>index<span class="token punctuation">]</span> <span class="token operator">=</span> nums2<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">;</span>
                index <span class="token operator">--</span><span class="token punctuation">;</span>
                j <span class="token operator">--</span><span class="token punctuation">;</span>
                <span class="token keyword">continue</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            <span class="token keyword">if</span> <span class="token punctuation">(</span>j <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                nums1<span class="token punctuation">[</span>index<span class="token punctuation">]</span> <span class="token operator">=</span> nums1<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
                index <span class="token operator">--</span><span class="token punctuation">;</span>
                i <span class="token operator">--</span><span class="token punctuation">;</span>
                <span class="token keyword">continue</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            <span class="token keyword">if</span> <span class="token punctuation">(</span>nums1<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">></span> nums2<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                nums1<span class="token punctuation">[</span>index<span class="token punctuation">]</span> <span class="token operator">=</span> nums1<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
                index <span class="token operator">--</span><span class="token punctuation">;</span>
                i <span class="token operator">--</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token keyword">else</span> <span class="token punctuation">{</span>
                nums1<span class="token punctuation">[</span>index<span class="token punctuation">]</span> <span class="token operator">=</span> nums2<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">;</span>
                index <span class="token operator">--</span><span class="token punctuation">;</span>
                j <span class="token operator">--</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


