<template><div><h1 id="_62-不同路径" tabindex="-1"><a class="header-anchor" href="#_62-不同路径" aria-hidden="true">#</a> 62.不同路径</h1>
<h2 id="题目描述" tabindex="-1"><a class="header-anchor" href="#题目描述" aria-hidden="true">#</a> 题目描述</h2>
<p>一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为 “Start” ）。</p>
<p>机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为 “Finish” ）。</p>
<p>问总共有多少条不同的路径？</p>
<p>示例 1：</p>
<p>输入：m = 3, n = 7
输出：28
示例 2：</p>
<p>输入：m = 3, n = 2
输出：3
解释：
从左上角开始，总共有 3 条路径可以到达右下角。</p>
<ol>
<li>向右 -&gt; 向下 -&gt; 向下</li>
<li>向下 -&gt; 向下 -&gt; 向右</li>
<li>向下 -&gt; 向右 -&gt; 向下
示例 3：</li>
</ol>
<p>输入：m = 7, n = 3
输出：28
示例 4：</p>
<p>输入：m = 3, n = 3
输出：6</p>
<p>提示：</p>
<p>1 &lt;= m, n &lt;= 100
题目数据保证答案小于等于 2 * 109</p>
<h2 id="题目地址" tabindex="-1"><a class="header-anchor" href="#题目地址" aria-hidden="true">#</a> 题目地址</h2>
<p><a href="https://leetcode.cn/problems/unique-paths/solution/dong-tai-gui-hua-dpmiao-jie-bu-tong-lu-j-61ut/" target="_blank" rel="noopener noreferrer">Leetcode 62. 不同路径<ExternalLinkIcon/></a></p>
<h2 id="思路解析" tabindex="-1"><a class="header-anchor" href="#思路解析" aria-hidden="true">#</a> 思路解析</h2>
<ol>
<li>首先从题目中可知，机器人仅能向右或者向下移动一个单位，则可以推断到达任何一的网格之中仅有两种方式。
<ul>
<li>从上边网格向下移动</li>
<li>从左边网格向右移动</li>
</ul>
</li>
<li>对于所有的网格就只有这两种方式到达，但有的网格只有这两种方式的其中一个，故此需要判断边界条件。
<ul>
<li>当走到第一行时，仅能从左边网格向右移动。</li>
<li>当走到第一列时，仅能从上边网格向下移动。</li>
<li>其他网格，既能从上边网格向下移动，又能从左边网格向右移动。</li>
</ul>
</li>
<li>所有网格我们分成了3个类型，当计算移动到一个网格的路径时需要依赖<strong>到达上边网格的路径数</strong> ，<strong>到达左边网格的路径数</strong>这两个数值。</li>
<li>递推公式为：到达当前网格的路径数 = <strong>到达上边网格的路径数</strong> + <strong>到达左边网格的路径数</strong></li>
<li>故此我们从 [0][0] 位置开始循环，可以按行S形遍历，也可以按列S型遍历，注意边界控制即可。</li>
</ol>
<h2 id="代码示例" tabindex="-1"><a class="header-anchor" href="#代码示例" aria-hidden="true">#</a> 代码示例</h2>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Solution</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">uniquePaths</span><span class="token punctuation">(</span><span class="token keyword">int</span> m<span class="token punctuation">,</span> <span class="token keyword">int</span> n<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">]</span> grid <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span>m<span class="token punctuation">]</span><span class="token punctuation">[</span>n<span class="token punctuation">]</span><span class="token punctuation">;</span>

        <span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> j <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        grid<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>

        <span class="token keyword">while</span><span class="token punctuation">(</span>i <span class="token operator">&lt;</span> m <span class="token operator">&amp;&amp;</span> j <span class="token operator">&lt;</span> n<span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">int</span> left <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
            <span class="token keyword">int</span> up <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

            <span class="token comment">// 此时必然有上和左</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>i <span class="token operator">!=</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> j <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                left <span class="token operator">=</span> grid<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">[</span>j <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
                up <span class="token operator">=</span> grid<span class="token punctuation">[</span>i <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token comment">// 此时仅有上</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>i <span class="token operator">!=</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> j <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                up <span class="token operator">=</span> grid<span class="token punctuation">[</span>i <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            <span class="token comment">// 此时仅有左</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>i <span class="token operator">==</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> j <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                left <span class="token operator">=</span> grid<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">[</span>j <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>

            grid<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">=</span> left <span class="token operator">+</span> up <span class="token operator">+</span> grid<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">;</span>

            j<span class="token operator">++</span><span class="token punctuation">;</span>

            <span class="token keyword">if</span> <span class="token punctuation">(</span>j <span class="token operator">%</span> n <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                j <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
                i <span class="token operator">++</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> grid<span class="token punctuation">[</span>m <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">[</span>n <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


