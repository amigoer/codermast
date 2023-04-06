<template><div><h1 id="_746-使用最小花费爬楼梯" tabindex="-1"><a class="header-anchor" href="#_746-使用最小花费爬楼梯" aria-hidden="true">#</a> 746. 使用最小花费爬楼梯</h1>
<h2 id="题目描述" tabindex="-1"><a class="header-anchor" href="#题目描述" aria-hidden="true">#</a> 题目描述</h2>
<p>给你一个整数数组 cost ，其中 cost[i] 是从楼梯第 i 个台阶向上爬需要支付的费用。一旦你支付此费用，即可选择向上爬一个或者两个台阶。</p>
<p>你可以选择从下标为 0 或下标为 1 的台阶开始爬楼梯。</p>
<p>请你计算并返回达到楼梯顶部的最低花费。</p>
<p>示例 1：</p>
<p>输入：cost = [10,15,20]
输出：15
解释：你将从下标为 1 的台阶开始。</p>
<ul>
<li>支付 15 ，向上爬两个台阶，到达楼梯顶部。
总花费为 15 。
示例 2：</li>
</ul>
<p>输入：cost = [1,100,1,1,1,100,1,1,100,1]
输出：6
解释：你将从下标为 0 的台阶开始。</p>
<ul>
<li>支付 1 ，向上爬两个台阶，到达下标为 2 的台阶。</li>
<li>支付 1 ，向上爬两个台阶，到达下标为 4 的台阶。</li>
<li>支付 1 ，向上爬两个台阶，到达下标为 6 的台阶。</li>
<li>支付 1 ，向上爬一个台阶，到达下标为 7 的台阶。</li>
<li>支付 1 ，向上爬两个台阶，到达下标为 9 的台阶。</li>
<li>支付 1 ，向上爬一个台阶，到达楼梯顶部。
总花费为 6 。</li>
</ul>
<p>提示：</p>
<p>2 &lt;= cost.length &lt;= 1000
0 &lt;= cost[i] &lt;= 999</p>
<h2 id="题目地址" tabindex="-1"><a class="header-anchor" href="#题目地址" aria-hidden="true">#</a> 题目地址</h2>
<p><a href="https://leetcode-cn.com/problems/min-cost-climbing-stairs/" target="_blank" rel="noopener noreferrer">Leetcode 746. 使用最小花费爬楼梯<ExternalLinkIcon/></a></p>
<h2 id="解题思路" tabindex="-1"><a class="header-anchor" href="#解题思路" aria-hidden="true">#</a> 解题思路</h2>
<p>  由题目可得，我们需要得到到达楼梯顶部的时候，所需要支付的最小体力花费。我们在支付完对应的花费后，可以选择向上两个台阶或者一个台阶。</p>
<p>  此时的最优解即这两个台阶中的一个最小值，此时到达该阶梯的最小花费即为上一步的最小花费加上此步骤的最优解即最小花费。</p>
<p>  递推公式有两种：</p>
<ul>
<li>dp[i] = Math.min(dp[i - 1],dp[i - 2]) + cost[i];</li>
<li>dp[i] = Math.min(dp[i - 1] + cost[i - 1],dp[i - 2] + cost[i - 2]);</li>
</ul>
<p>  在递推公式中，我们需要知道dp[i - 1] 和 dp[i - 2]两个的数值，即该阶梯前两个阶梯的最小花费。
即此时 i 最小等于 2 ，那么就需要进行第一个和第二个阶梯的初始化。
  dp[0] = cost[0];</p>
<p>  dp[1] = cost[1];</p>
<p>  dp[2] = Math.min(dp[0],dp[1]) + cost[2];</p>
<p>  ......</p>
<p>  dp[i - 1] = Math.min(dp[i - 2],dp[i - 3]) + cost[i - 1];</p>
<p>  dp[i] = Math.min(dp[i - 1],dp[i - 2]) + cost[i];</p>
<div class="hint-container tip">
<p class="hint-container-title">注意</p>
<p>需要注意的是：此时的dp[dp.length - 1]即dp数组的最后一个数并不一定是最小的花费，因为我们一次可以跨一个台阶或者两个台阶，即最小值为Math.min(dp[dp.length - 1], dp[dp.length - 2])</p>
</div>
<h2 id="代码实现" tabindex="-1"><a class="header-anchor" href="#代码实现" aria-hidden="true">#</a> 代码实现</h2>
<h3 id="方法1-动态规划" tabindex="-1"><a class="header-anchor" href="#方法1-动态规划" aria-hidden="true">#</a> 方法1：动态规划</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">// 动态规划法1：使用dp数组记录每一步所需要花费的最小体力</span>
<span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">minCostClimbingStairs</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> cost<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>cost<span class="token punctuation">.</span>length <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> cost<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 定义 dp 数组</span>
    <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> dp <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span>cost<span class="token punctuation">.</span>length<span class="token punctuation">]</span><span class="token punctuation">;</span>

    <span class="token comment">// 初始化 dp 数组</span>
    dp<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> cost<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    dp<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> cost<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token comment">// 递推公式 ： dp[i] = Math.min(dp[i - 1],dp[i - 2]) + cost[i];</span>

    <span class="token comment">// dp[i] : 到达第 i 个阶梯所的最小花费</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> dp<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        dp<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">min</span><span class="token punctuation">(</span>dp<span class="token punctuation">[</span>i <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span> dp<span class="token punctuation">[</span>i <span class="token operator">-</span> <span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">+</span> cost<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">min</span><span class="token punctuation">(</span>dp<span class="token punctuation">[</span>dp<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span> dp<span class="token punctuation">[</span>dp<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="复杂度分析" tabindex="-1"><a class="header-anchor" href="#复杂度分析" aria-hidden="true">#</a> 复杂度分析：</h3>
<ul>
<li>时间复杂度：O(n)</li>
<li>空间复杂度：O(n)</li>
</ul>
<h3 id="方法2-动态规划-优化版" tabindex="-1"><a class="header-anchor" href="#方法2-动态规划-优化版" aria-hidden="true">#</a> 方法2：动态规划(优化版)</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">// 动态规划法2：将dp数组进行优化</span>
<span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">minCostClimbingStairs2</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> cost<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>cost<span class="token punctuation">.</span>length <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> cost<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 定义 dp 数组</span>
    <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> dp <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">int</span><span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

    <span class="token comment">// 初始化 dp 数组</span>
    dp<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> cost<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    dp<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> cost<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token comment">// 递推公式 ： dp[1] = Math.min(num,dp[0]) + cost[i];</span>

    <span class="token comment">// dp[i] : 到达第 i 个阶梯所的最小花费</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> cost<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> num <span class="token operator">=</span> dp<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        dp<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">=</span> dp<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        dp<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">min</span><span class="token punctuation">(</span>num<span class="token punctuation">,</span> dp<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">+</span> cost<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">min</span><span class="token punctuation">(</span>dp<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> dp<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="复杂度分析-1" tabindex="-1"><a class="header-anchor" href="#复杂度分析-1" aria-hidden="true">#</a> 复杂度分析：</h3>
<ul>
<li>时间复杂度：O(n)</li>
<li>空间复杂度：O(1)</li>
</ul>
</div></template>


