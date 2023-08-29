<template><div><h1 id="_455-分发饼干" tabindex="-1"><a class="header-anchor" href="#_455-分发饼干" aria-hidden="true">#</a> 455.分发饼干</h1>
<h2 id="题目描述" tabindex="-1"><a class="header-anchor" href="#题目描述" aria-hidden="true">#</a> 题目描述</h2>
<p>假设你是一位很棒的家长，想要给你的孩子们一些小饼干。但是，每个孩子最多只能给一块饼干。</p>
<p>对每个孩子 i，都有一个胃口值 g[i]，这是能让孩子们满足胃口的饼干的最小尺寸；并且每块饼干 j，都有一个尺寸 s[j] 。如果 s[j] &gt;= g[i]，我们可以将这个饼干 j 分配给孩子 i ，这个孩子会得到满足。你的目标是尽可能满足越多数量的孩子，并输出这个最大数值。</p>
<p>示例 1:</p>
<p>输入: g = [1,2,3], s = [1,1]<br>
输出: 1<br>
解释:<br>
你有三个孩子和两块小饼干，3个孩子的胃口值分别是：1,2,3。<br>
虽然你有两块小饼干，由于他们的尺寸都是1，你只能让胃口值是1的孩子满足。<br>
所以你应该输出1。<br>
示例 2:</p>
<p>输入: g = [1,2], s = [1,2,3]<br>
输出: 2<br>
解释:<br>
你有两个孩子和三块小饼干，2个孩子的胃口值分别是1,2。<br>
你拥有的饼干数量和尺寸都足以让所有孩子满足。<br>
所以你应该输出2</p>
<h2 id="思路分析" tabindex="-1"><a class="header-anchor" href="#思路分析" aria-hidden="true">#</a> 思路分析</h2>
<ol>
<li>题目中的要求是尽可能满足更多的孩子，那么最好的情况就是使用最小的饼干，去尽可能的优先满足胃口较小的孩子。</li>
<li>我们将饼干大小和孩子胃口进行排序。</li>
<li>从最小的饼干开始，判断是否能满足目前尚未满足的胃口最小的孩子，如果可以，则使用该饼干，不能满足时，需要更换更大的饼干。</li>
</ol>
<blockquote>
<p>这里也可以逆向思维，优先用最大的饼干满足胃口最大的孩子，道理是一样的，这里就不做过多赘述。</p>
</blockquote>
<h2 id="题目地址" tabindex="-1"><a class="header-anchor" href="#题目地址" aria-hidden="true">#</a> 题目地址</h2>
<p><a href="https://leetcode.cn/problems/assign-cookies/solution/leetcode-455fen-fa-bing-gan-tan-xin-suan-jmzk/" target="_blank" rel="noopener noreferrer">Leetcode 455.分发饼干<ExternalLinkIcon/></a></p>
<h2 id="代码示例" tabindex="-1"><a class="header-anchor" href="#代码示例" aria-hidden="true">#</a> 代码示例</h2>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">findContentChildren</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> g<span class="token punctuation">,</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> s<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">sort</span><span class="token punctuation">(</span>g<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">sort</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> j <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

        <span class="token keyword">int</span> ret <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span><span class="token punctuation">(</span>i <span class="token operator">&lt;</span> g<span class="token punctuation">.</span>length <span class="token operator">&amp;&amp;</span> j <span class="token operator">&lt;</span> s<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>s<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">>=</span> g<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                i<span class="token operator">++</span><span class="token punctuation">;</span>
                ret<span class="token operator">++</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>                
            j<span class="token operator">++</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> ret<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


