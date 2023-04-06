<template><div><h1 id="_509-斐波那契数" tabindex="-1"><a class="header-anchor" href="#_509-斐波那契数" aria-hidden="true">#</a> 509. 斐波那契数</h1>
<h2 id="题目描述" tabindex="-1"><a class="header-anchor" href="#题目描述" aria-hidden="true">#</a> 题目描述</h2>
<p>斐波那契数 （通常用 F(n) 表示）形成的序列称为 斐波那契数列 。该数列由 0 和 1 开始，后面的每一项数字都是前面两项数字的和。也就是：</p>
<p>F(0) = 0，F(1) = 1
F(n) = F(n - 1) + F(n - 2)，其中 n &gt; 1
给定 n ，请计算 F(n) 。</p>
<p>示例 1：</p>
<p>输入：n = 2
输出：1
解释：F(2) = F(1) + F(0) = 1 + 0 = 1</p>
<p>示例 2：
输入：n = 3
输出：2
解释：F(3) = F(2) + F(1) = 1 + 1 = 2</p>
<p>示例 3：
输入：n = 4
输出：3
解释：F(4) = F(3) + F(2) = 2 + 1 = 3</p>
<p>提示：
0 &lt;= n &lt;= 30</p>
<h2 id="题目地址" tabindex="-1"><a class="header-anchor" href="#题目地址" aria-hidden="true">#</a> 题目地址</h2>
<p><a href="https://leetcode-cn.com/problems/fibonacci-number/" target="_blank" rel="noopener noreferrer">LeetCode509. 斐波那契数<ExternalLinkIcon/></a></p>
<h2 id="解题思路" tabindex="-1"><a class="header-anchor" href="#解题思路" aria-hidden="true">#</a> 解题思路</h2>
<p>在解题之前，我们需要了解什么是斐波那契数列 👉 <a href="https://baike.baidu.com/item/%E6%96%90%E6%B3%A2%E9%82%A3%E5%A5%91%E6%95%B0%E5%88%97/99145" target="_blank" rel="noopener noreferrer">点我查看<ExternalLinkIcon/></a></p>
<p>由定义可知，从第三个数开始，其值为前两个数值之和，即F(n) = F(n - 1) + F(n - 2)。并且给定了F(0)和F(1)的初始值，那么我们可以进行分解。</p>
<p>要求F(n) 则需要先求F(n - 1) 和 F(n - 2);</p>
<p>要求F(n - 1) 则需要先求F(n - 1 - 1) 和 F(n - 1 - 2);</p>
<p>...以此类推</p>
<p>要求F(2) 则需要先求F(1) 和 F(0);</p>
<p>此时的F(1) 和 F(0)都是已知条件，则可以求的结果。</p>
<h3 id="方法1️⃣-递归法" tabindex="-1"><a class="header-anchor" href="#方法1️⃣-递归法" aria-hidden="true">#</a> 方法1️⃣：递归法</h3>
<h4 id="代码code" tabindex="-1"><a class="header-anchor" href="#代码code" aria-hidden="true">#</a> 代码Code</h4>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">// 递归法</span>
<span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">fib</span><span class="token punctuation">(</span><span class="token keyword">int</span> n<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 退出递归的条件</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>n <span class="token operator">&lt;</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> n<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token function">fib</span><span class="token punctuation">(</span>n <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token function">fib</span><span class="token punctuation">(</span>n <span class="token operator">-</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="复杂度分析" tabindex="-1"><a class="header-anchor" href="#复杂度分析" aria-hidden="true">#</a> 复杂度分析</h4>
<ul>
<li>
<p>时间复杂度：O(2 ^ n)。</p>
</li>
<li>
<p>空间复杂度：O(n)。</p>
</li>
</ul>
<h3 id="方法2️⃣-动态规划法1-使用dp数组进行记录" tabindex="-1"><a class="header-anchor" href="#方法2️⃣-动态规划法1-使用dp数组进行记录" aria-hidden="true">#</a> 方法2️⃣：动态规划法1：（使用dp数组进行记录）</h3>
<h4 id="代码code-1" tabindex="-1"><a class="header-anchor" href="#代码code-1" aria-hidden="true">#</a> 代码Code</h4>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">// 动态规划法1：（使用dp数组进行记录）</span>
<span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">fib</span><span class="token punctuation">(</span><span class="token keyword">int</span> n<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>n <span class="token operator">&lt;</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> n<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// dp[i] 记录的是 第 i 个斐波那契数</span>
    <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> dp <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span>n <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

    <span class="token comment">// 数组初始化： dp[0] = 0;dp[1] = 1;</span>
    dp<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    dp<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>

    <span class="token comment">// 确定遍历顺序 ： n 从小到大遍历</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> dp<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 递推公式 ： dp[i] = dp[i - 1] + dp[i - 2]</span>
        dp<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> dp<span class="token punctuation">[</span>i <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">+</span> dp<span class="token punctuation">[</span>i <span class="token operator">-</span> <span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 举例推导dp数组</span>
    <span class="token comment">// 0 1 1 2 3 5 8 13 21</span>
    <span class="token keyword">return</span> dp<span class="token punctuation">[</span>n<span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="复杂度分析-1" tabindex="-1"><a class="header-anchor" href="#复杂度分析-1" aria-hidden="true">#</a> 复杂度分析</h4>
<ul>
<li>
<p>时间复杂度：O(n)。</p>
</li>
<li>
<p>空间复杂度：O(n)。</p>
</li>
</ul>
<h3 id="方法3️⃣-动态规划法2-使用dp数组进行记录" tabindex="-1"><a class="header-anchor" href="#方法3️⃣-动态规划法2-使用dp数组进行记录" aria-hidden="true">#</a> 方法3️⃣：动态规划法2：（使用dp数组进行记录）</h3>
<h4 id="代码code-2" tabindex="-1"><a class="header-anchor" href="#代码code-2" aria-hidden="true">#</a> 代码Code</h4>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">// 动态规划法2：仅维护两个需要递推的数值，不需要记录整个dp数组（优化）</span>
<span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">fib</span><span class="token punctuation">(</span><span class="token keyword">int</span> n<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>n <span class="token operator">&lt;</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> n<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 定义 dp 数组</span>
    <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> dp <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

    <span class="token comment">// dp 数组的初始化</span>
    <span class="token comment">// dp[0] = 0; int 数组初始化会将所有的元素默认初始化为 0</span>
    dp<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>

    <span class="token comment">// 循环 n - 1 次即可得到第 n 个斐波那契数</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> n <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> num <span class="token operator">=</span> dp<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">+</span> dp<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    dp<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> dp<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    dp<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> num<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> dp<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="复杂度分析-2" tabindex="-1"><a class="header-anchor" href="#复杂度分析-2" aria-hidden="true">#</a> 复杂度分析</h4>
<ul>
<li>
<p>时间复杂度：O(n)。</p>
</li>
<li>
<p>空间复杂度：O(1)。</p>
</li>
</ul>
</div></template>


