<template><div><h1 id="_1646-获取生成数组中的最大值" tabindex="-1"><a class="header-anchor" href="#_1646-获取生成数组中的最大值" aria-hidden="true">#</a> 1646. 获取生成数组中的最大值</h1>
<h2 id="题目介绍" tabindex="-1"><a class="header-anchor" href="#题目介绍" aria-hidden="true">#</a> 题目介绍</h2>
<p>给你一个整数 n 。按下述规则生成一个长度为 n + 1 的数组 nums ：</p>
<p>nums[0] = 0<br>
nums[1] = 1<br>
当 2 &lt;= 2 * i &lt;= n 时，nums[2 * i] = nums[i]<br>
当 2 &lt;= 2 * i + 1 &lt;= n 时，nums[2 * i + 1] = nums[i] + nums[i + 1]<br>
返回生成数组 nums 中的 最大 值。</p>
<h2 id="题目地址" tabindex="-1"><a class="header-anchor" href="#题目地址" aria-hidden="true">#</a> 题目地址</h2>
<p><a href="https://leetcode-cn.com/problems/get-maximum-in-generated-array/" target="_blank" rel="noopener noreferrer">1646. 获取生成数组中的最大值<ExternalLinkIcon/></a></p>
<h2 id="解题思路" tabindex="-1"><a class="header-anchor" href="#解题思路" aria-hidden="true">#</a> 解题思路</h2>
<p>  题目中已经给定了nums数组的两个初始值，并且给定了相关的递推公式，我们直接在一层for循环中进行模拟填数，直接将数组的数据填写。</p>
<h2 id="代码" tabindex="-1"><a class="header-anchor" href="#代码" aria-hidden="true">#</a> 代码</h2>
<h3 id="方法1️⃣-模拟法" tabindex="-1"><a class="header-anchor" href="#方法1️⃣-模拟法" aria-hidden="true">#</a> 方法1️⃣：模拟法</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">getMaximumGenerated</span><span class="token punctuation">(</span><span class="token keyword">int</span> n<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>n <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 定义所需填充数组</span>
    <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> nums <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span>n <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    
    <span class="token comment">// 初始化默认值</span>
    nums<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    nums<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
    
    <span class="token comment">// 记录最大值</span>
    <span class="token keyword">int</span> max <span class="token operator">=</span> nums<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

    <span class="token comment">// 循环遍历</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>i <span class="token operator">&lt;=</span> n<span class="token punctuation">;</span>i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token number">2</span> <span class="token operator">&lt;=</span> <span class="token number">2</span> <span class="token operator">*</span> i <span class="token operator">&amp;&amp;</span> <span class="token number">2</span> <span class="token operator">*</span> i <span class="token operator">&lt;=</span> n<span class="token punctuation">)</span><span class="token punctuation">{</span>
            nums<span class="token punctuation">[</span><span class="token number">2</span> <span class="token operator">*</span> i<span class="token punctuation">]</span> <span class="token operator">=</span> nums<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token number">2</span> <span class="token operator">&lt;=</span> <span class="token number">2</span> <span class="token operator">*</span> i <span class="token operator">+</span> <span class="token number">1</span> <span class="token operator">&amp;&amp;</span> <span class="token number">2</span> <span class="token operator">*</span> i <span class="token operator">+</span> <span class="token number">1</span> <span class="token operator">&lt;=</span> n<span class="token punctuation">)</span><span class="token punctuation">{</span>
            nums<span class="token punctuation">[</span><span class="token number">2</span> <span class="token operator">*</span> i <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> nums<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">+</span> nums<span class="token punctuation">[</span>i <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        max <span class="token operator">=</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span>max<span class="token punctuation">,</span>nums<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> max<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="复杂度分析" tabindex="-1"><a class="header-anchor" href="#复杂度分析" aria-hidden="true">#</a> 复杂度分析</h3>
<ul>
<li>时间复杂度：O(n)</li>
<li>空间复杂度：O(n)</li>
</ul>
</div></template>


