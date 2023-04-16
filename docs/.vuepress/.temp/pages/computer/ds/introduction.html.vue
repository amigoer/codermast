<template><div><h1 id="第一章-绪论" tabindex="-1"><a class="header-anchor" href="#第一章-绪论" aria-hidden="true">#</a> 第一章 绪论</h1>
<h2 id="_1-1数据结构的基本概念" tabindex="-1"><a class="header-anchor" href="#_1-1数据结构的基本概念" aria-hidden="true">#</a> 1.1数据结构的基本概念</h2>
<h3 id="_1-1-1基本概念和术语" tabindex="-1"><a class="header-anchor" href="#_1-1-1基本概念和术语" aria-hidden="true">#</a> 1.1.1基本概念和术语</h3>
<ol>
<li>数据</li>
</ol>
<p>数据是信息的载体，是描述客观事物属性的数、字符及所有能输入到计算机中并被计算机程序识别和处理的符号的集合。数据是计算机程序加工的原料。</p>
<ol start="2">
<li>数据元素</li>
</ol>
<p>数据元素是数据的基本单位，通常作为一个整体进行考虑和处理。一个数据元素可由若干数据项组成，数据项是构成数据元素的不可分隔的最小单位。</p>
<ol start="3">
<li>数据对象</li>
</ol>
<p>数据对象是具有相同性质的数据元素的集合，是数据的一个子集。</p>
<ol start="4">
<li>数据类型</li>
</ol>
<p>数据类型是一个值的集合和定义在此集合上的一组操作的总称。</p>
<ul>
<li>原子类型：其值不可再分的数据类型。</li>
<li>结构类型：其值可以再分解为若干成分（分量）的数据结构。</li>
<li>抽象数据类型：抽象数据组织及与之相关的操作。</li>
</ul>
<ol start="5">
<li>数据结构</li>
</ol>
<p>数据结构是相互之间存在的一种或者多种特定关系的数据元素的集合。数据之间并不是单独存在的，是存在一定关系的，这种关系就叫做数据结构。</p>
<p>数据结构包含三个方面：</p>
<ul>
<li>逻辑结构</li>
<li>存储结构</li>
<li>数据的运算</li>
</ul>
<h3 id="_1-1-2数据结构的三要素" tabindex="-1"><a class="header-anchor" href="#_1-1-2数据结构的三要素" aria-hidden="true">#</a> 1.1.2数据结构的三要素</h3>
<ol>
<li>
<p>数据的逻辑结构</p>
<ul>
<li>线性结构</li>
<li>非线性结构</li>
</ul>
</li>
</ol>
<p><img src="@source/../assets/introduction/2023-04-16-18-09-50.png" alt="数据的逻辑结构" loading="lazy">
2. 数据的存储结构</p>
<ul>
<li>顺序存储</li>
<li>链式存储</li>
<li>索引存储</li>
<li>散列存储</li>
</ul>
<ol start="3">
<li>数据的运算</li>
</ol>
<p>施加在数据上的运算包括运算的定义和实现。运算的定义是针对逻辑结构的，指出运算的工能，运算的实现是针对存储结构的，指出运算的具体操作步骤。</p>
<h2 id="_1-2算法和算法评价" tabindex="-1"><a class="header-anchor" href="#_1-2算法和算法评价" aria-hidden="true">#</a> 1.2算法和算法评价</h2>
<h3 id="_1-2-1算法的基本概念" tabindex="-1"><a class="header-anchor" href="#_1-2-1算法的基本概念" aria-hidden="true">#</a> 1.2.1算法的基本概念</h3>
<p>算法Algorithm是对特定问题求解步骤的一种描述，它是指令的有限序列，其中的每条指令表示一个或者多个操作。</p>
<ol>
<li>有穷性：一个算法必须总在执行有穷步之后结束，且每一步都可以在有限的时间内完成。</li>
<li>确定性：算法中每条指令必须有确切的含义，对于相同的输入只能得到相同的输出结果。</li>
<li>可行性：算法中描述的操作都可以通过已经实现的基本运算执行有限次来实现。</li>
<li>输入：一个算法的输入数据。</li>
<li>输出：算法执行后的输出数据。</li>
</ol>
<p>一个好的算法应该考虑以下目标：</p>
<ol>
<li>正确性</li>
<li>可读性</li>
<li>健壮性</li>
<li>效率与低存储量需求</li>
</ol>
<h3 id="_1-2-2算法效率的度量" tabindex="-1"><a class="header-anchor" href="#_1-2-2算法效率的度量" aria-hidden="true">#</a> 1.2.2算法效率的度量</h3>
<h4 id="时间复杂度" tabindex="-1"><a class="header-anchor" href="#时间复杂度" aria-hidden="true">#</a> 时间复杂度</h4>
<p>一个语句在算法中被重复执行的次数。算法中所有语句的频度之和为T(n)，它是该算法问题规模n的函数，时间复杂度主要分析T(n)的数量级。</p>
<center >T(n) = O(f(n)) </center>
<p>时间复杂度一般取最高数量级。</p>
<div class="hint-container note">
<p class="hint-container-title">例如</p>
<p>f(n) = a<em>n<sup>3</sup>+b</em>n<sup>2</sup>+c*n的时间复杂度为O(n<sup>3</sup>)</p>
</div>
<p>复杂情况下的时间复杂度的衡量：</p>
<ol>
<li>加法规则</li>
</ol>
<center> T(n) = T~1~(n) + T~2~(n) = O(f(n)) + O(g(n)) = O(max(f(n),g(n))) </center>
<ol start="2">
<li>乘法规则</li>
</ol>
<center> T(n) = T~1~(n) * T~2~(n) = O(f(n)) * O(g(n)) = O(f(n)*g(n)) </center>
<p>常见的渐进复杂度为:</p>
<center> O(1) &lt; O(log~2~n) &lt; O(n) &lt; O(nLog~2~n) &lt; O(n^2^) &lt; O(2^n^) &lt; O(n!) &lt; O(n^n^) </center>
<h4 id="空间复杂度" tabindex="-1"><a class="header-anchor" href="#空间复杂度" aria-hidden="true">#</a> 空间复杂度</h4>
<p>算法的空间复杂度S(n)定义为该算法所耗费的存储空间，它是问题规模n的函数。</p>
<center> S(n) = O(g(n)) </center>
<p>算法原地工作是值算法所需要的辅助空间为常量，即O(1)</p>
</div></template>


