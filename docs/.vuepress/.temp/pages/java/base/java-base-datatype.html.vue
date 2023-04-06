<template><div><h1 id="java基础-3-数据类型" tabindex="-1"><a class="header-anchor" href="#java基础-3-数据类型" aria-hidden="true">#</a> Java基础 - 3.数据类型</h1>
<h2 id="💓内置数据类型" tabindex="-1"><a class="header-anchor" href="#💓内置数据类型" aria-hidden="true">#</a> 💓内置数据类型</h2>
<p>Java语言提供了八种基本类型。六种数字类型（四个整数型，两个浮点型），一种字符类型，还有一种布尔型。</p>
<blockquote>
<p>实际上，JAVA中还存在另外一种基本类型 void，它也有对应的包装类 java.lang.Void，不过我们无法直接对它们进行操作。</p>
</blockquote>
<h3 id="_1️⃣byte-字节型" tabindex="-1"><a class="header-anchor" href="#_1️⃣byte-字节型" aria-hidden="true">#</a> 1️⃣byte：(字节型)</h3>
<ul>
<li>byte 数据类型是8位、有符号的，以二进制补码表示的整数；</li>
<li>最小值是 -128（-2^7）；</li>
<li>最大值是 127（2^7-1）；</li>
<li>默认值是 0；</li>
<li>byte 类型用在大型数组中节约空间，主要代替整数，因为 byte 变量占用的空间只有 int 类型的四分之一；</li>
</ul>
<blockquote>
<p>例子：byte a = 100，byte b = -50。</p>
</blockquote>
<h3 id="_2️⃣short-短整型" tabindex="-1"><a class="header-anchor" href="#_2️⃣short-短整型" aria-hidden="true">#</a> 2️⃣short：(短整型)</h3>
<ul>
<li>short 数据类型是 16 位、有符号的以二进制补码表示的整数</li>
<li>最小值是 -32768（-2^15）；</li>
<li>最大值是 32767（2^15 - 1）；</li>
<li>Short 数据类型也可以像 byte 那样节省空间。一个short变量是int型变量所占空间的二分之一；</li>
<li>默认值是 0；</li>
</ul>
<blockquote>
<p>例子：short s = 1000，short r = -20000。</p>
</blockquote>
<h3 id="_3️⃣int-整型" tabindex="-1"><a class="header-anchor" href="#_3️⃣int-整型" aria-hidden="true">#</a> 3️⃣int：(整型)</h3>
<ul>
<li>int 数据类型是32位、有符号的以二进制补码表示的整数；</li>
<li>最小值是 -2,147,483,648（-2^31）；</li>
<li>最大值是 2,147,483,647（2^31 - 1）；</li>
<li>一般地整型变量默认为 int 类型；</li>
<li>默认值是 0 ；</li>
</ul>
<blockquote>
<p>例子：int a = 100000, int b = -200000。</p>
</blockquote>
<h3 id="_4️⃣long-长整型" tabindex="-1"><a class="header-anchor" href="#_4️⃣long-长整型" aria-hidden="true">#</a> 4️⃣long：(长整型)</h3>
<ul>
<li>long 数据类型是 64 位、有符号的以二进制补码表示的整数；</li>
<li>最小值是 -9,223,372,036,854,775,808（-2^63）；</li>
<li>最大值是 9,223,372,036,854,775,807（2^63 -1）；</li>
<li>这种类型主要使用在需要比较大整数的系统上；</li>
<li>默认值是 0L；</li>
</ul>
<blockquote>
<p>例子： long a = 100000L，Long b = -200000L。
&quot;L&quot;理论上不分大小写，但是若写成&quot;l&quot;容易与数字&quot;1&quot;混淆，不容易分辩。所以最好大写。</p>
</blockquote>
<h3 id="_5️⃣float-单精度浮点型" tabindex="-1"><a class="header-anchor" href="#_5️⃣float-单精度浮点型" aria-hidden="true">#</a> 5️⃣float：(单精度浮点型)</h3>
<ul>
<li>float 数据类型是单精度、32位、符合IEEE 754标准的浮点数；</li>
<li>float 在储存大型浮点数组的时候可节省内存空间；</li>
<li>默认值是 0.0f；</li>
<li>浮点数不能用来表示精确的值，如货币；</li>
</ul>
<blockquote>
<p>例子：float f1 = 234.5f。</p>
</blockquote>
<h3 id="_6️⃣double-双精度浮点型" tabindex="-1"><a class="header-anchor" href="#_6️⃣double-双精度浮点型" aria-hidden="true">#</a> 6️⃣double：(双精度浮点型)</h3>
<ul>
<li>double 数据类型是双精度、64 位、符合 IEEE 754 标准的浮点数；</li>
<li>浮点数的默认类型为 double 类型；</li>
<li>double类型同样不能表示精确的值，如货币；</li>
<li>默认值是 0.0d；</li>
</ul>
<p>举个例子</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">double</span>   d1  <span class="token operator">=</span> <span class="token number">7D</span> <span class="token punctuation">;</span>
<span class="token keyword">double</span>   d2  <span class="token operator">=</span> <span class="token number">7.</span><span class="token punctuation">;</span> 
<span class="token keyword">double</span>   d3  <span class="token operator">=</span>  <span class="token number">8.0</span><span class="token punctuation">;</span> 
<span class="token keyword">double</span>   d4  <span class="token operator">=</span>  <span class="token number">8.D</span><span class="token punctuation">;</span> 
<span class="token keyword">double</span>   d5  <span class="token operator">=</span>  <span class="token number">12.9867</span><span class="token punctuation">;</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>7 是一个 int 字面量，而 7D，7. 和 8.0 是 double 字面量。
这里是可以使用7这个int类型的字面量进行double类型的变量进行赋值，这里面会有隐式的数据类型转换。</p>
</blockquote>
<h3 id="_7️⃣boolean-布尔型" tabindex="-1"><a class="header-anchor" href="#_7️⃣boolean-布尔型" aria-hidden="true">#</a> 7️⃣boolean：(布尔型)</h3>
<ul>
<li>boolean数据类型表示一位的信息；</li>
<li>只有两个取值：true 和 false；</li>
<li>这种类型只作为一种标志来记录 true/false 情况；</li>
<li>默认值是 false；</li>
</ul>
<blockquote>
<p>例子：boolean one = true。</p>
</blockquote>
<h3 id="_8️⃣char-字符型" tabindex="-1"><a class="header-anchor" href="#_8️⃣char-字符型" aria-hidden="true">#</a> 8️⃣char：(字符型)</h3>
<ul>
<li>char 类型是一个单一的 16 位 Unicode 字符；</li>
<li>最小值是 \u0000（十进制等效值为 0）；</li>
<li>最大值是 \uffff（即为 65535）；</li>
<li>char 数据类型可以储存任何字符；</li>
</ul>
<blockquote>
<p>例子：char letter = 'A';。</p>
</blockquote>
<h2 id="💖引用数据类型" tabindex="-1"><a class="header-anchor" href="#💖引用数据类型" aria-hidden="true">#</a> 💖引用数据类型</h2>
<ul>
<li>在Java中，引用类型的变量非常类似于C/C++的指针。引用类型指向一个对象，指向对象的变量是引 用变量。这些变量在声明时被指定为一个特定的类型，比如 <code v-pre>String</code>、<code v-pre>Scanner</code> 等。变量一旦声明后，类型就不能被改变了。</li>
<li>对象、数组都是引用数据类型。</li>
<li>所有引用类型的默认值都是null。即为空，为空的对象不能调用任何属性和方法，否则会出现空指针异常。</li>
<li>一个引用变量可以用来引用任何与之兼容的类型。</li>
</ul>
<blockquote>
<p>例子：Dog dog = new Dog();</p>
</blockquote>
<h2 id="❤️‍🔥常量" tabindex="-1"><a class="header-anchor" href="#❤️‍🔥常量" aria-hidden="true">#</a> ❤️‍🔥常量</h2>
<p>常量是在程序中，经过首次初始化以后，在程序运行阶段是不能再更改的一类数据。需要使用<code v-pre>final</code>关键字进行修饰。如果是常量，我们通常使用全部<code v-pre>大写</code>的标识符。</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">final</span> <span class="token keyword">int</span> <span class="token constant">MAX_VALUE</span> <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>字符常量需要使用单引号引起来，且只能存储一个字符，如：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">char</span> c <span class="token operator">=</span> <span class="token char">'A'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>字符串常量是需要使用双引号引起来，如：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token class-name">String</span> str <span class="token operator">=</span> <span class="token string">"Hello World!"</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>字符常量和字符串常量都可以使用Unicode字符，也支持混用，如：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">char</span> c <span class="token operator">=</span> <span class="token char">'\u0001'</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> str <span class="token operator">=</span> <span class="token string">"32\u0001"</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="🤎特殊字符" tabindex="-1"><a class="header-anchor" href="#🤎特殊字符" aria-hidden="true">#</a> 🤎特殊字符</h2>
<table>
<thead>
<tr>
<th style="text-align:left">符号</th>
<th style="text-align:left">字符含义</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">\n</td>
<td style="text-align:left">换行 (0x0a)</td>
</tr>
<tr>
<td style="text-align:left">\r</td>
<td style="text-align:left">回车 (0x0d)</td>
</tr>
<tr>
<td style="text-align:left">\f</td>
<td style="text-align:left">换页符(0x0c)</td>
</tr>
<tr>
<td style="text-align:left">\b</td>
<td style="text-align:left">退格 (0x08)</td>
</tr>
<tr>
<td style="text-align:left">\0</td>
<td style="text-align:left">空字符 (0x0)</td>
</tr>
<tr>
<td style="text-align:left">\s</td>
<td style="text-align:left">空格 (0x20)</td>
</tr>
<tr>
<td style="text-align:left">\t</td>
<td style="text-align:left">制表符</td>
</tr>
<tr>
<td style="text-align:left">&quot;</td>
<td style="text-align:left">双引号</td>
</tr>
<tr>
<td style="text-align:left">'</td>
<td style="text-align:left">单引号</td>
</tr>
<tr>
<td style="text-align:left">\</td>
<td style="text-align:left">反斜杠</td>
</tr>
<tr>
<td style="text-align:left">\ddd</td>
<td style="text-align:left">八进制字符 (ddd)</td>
</tr>
<tr>
<td style="text-align:left">\uxxxx</td>
<td style="text-align:left">16进制Unicode字符 (xxxx)</td>
</tr>
</tbody>
</table>
<h2 id="💙n进制表示" tabindex="-1"><a class="header-anchor" href="#💙n进制表示" aria-hidden="true">#</a> 💙N进制表示</h2>
<p>在我们生活中，使用的进制是10进制，但是在计算机中最常用的是2进制和8进制、16进制等，在默认情况下对整型变量的赋值时，默认是使用的10进制，我们也可以直接使用n进制对变量赋值。</p>
<p><code v-pre>byte</code>、<code v-pre>int</code>、<code v-pre>long</code>、和<code v-pre>short</code>都可以用十进制、16进制以及8进制的方式来表示。</p>
<p>当使用字面量的时候，前缀 0 表示 8 进制，而前缀 0x 代表 16 进制, 例如：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">int</span> a <span class="token operator">=</span> <span class="token number">12</span><span class="token punctuation">;</span>		<span class="token comment">// 10进制</span>
<span class="token keyword">int</span> b <span class="token operator">=</span> <span class="token number">0144</span><span class="token punctuation">;</span>	<span class="token comment">// 8进制</span>
<span class="token keyword">int</span> c <span class="token operator">=</span> <span class="token number">0x64</span><span class="token punctuation">;</span>	<span class="token comment">// 16进制</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="💦类型转换" tabindex="-1"><a class="header-anchor" href="#💦类型转换" aria-hidden="true">#</a> 💦类型转换</h2>
<h3 id="❣️自动类型转换" tabindex="-1"><a class="header-anchor" href="#❣️自动类型转换" aria-hidden="true">#</a> ❣️自动类型转换</h3>
<p>  整型、实型（常量）、字符型数据可以混合运算。运算中，不同类型的数据先转化为同一类型，然后进行运算。
  必须满足转换前的数据类型的位数要低于转换后的数据类型。</p>
<blockquote>
<p>如 <code v-pre>int</code> + <code v-pre>byte</code> = <code v-pre>int</code></p>
</blockquote>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">int</span> a <span class="token operator">=</span> <span class="token number">128</span><span class="token punctuation">;</span>
<span class="token keyword">byte</span> b <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token comment">// 自动类型转换</span>
a <span class="token operator">+</span> b <span class="token operator">=</span> <span class="token number">11</span><span class="token punctuation">;</span> <span class="token comment">// 这里的11的类型为 int 类型</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>  数据类型转换必须满足如下规则：</p>
<ol>
<li>
<p>不能对boolean类型进行类型转换。</p>
</li>
<li>
<p>不能把对象类型转换成不相关类的对象。</p>
</li>
<li>
<p>在把容量大的类型转换为容量小的类型时必须使用强制类型转换。</p>
</li>
<li>
<p>转换过程中可能导致溢出或损失精度。精度损失不是四舍五入，而是直接把小数部分的精度直接丢弃。</p>
</li>
</ol>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">// 强制类型转换</span>
<span class="token comment">// 从大类型转换到小类型</span>
<span class="token keyword">int</span> a <span class="token operator">=</span> <span class="token number">200</span><span class="token punctuation">;</span>
<span class="token keyword">byte</span> c <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">byte</span><span class="token punctuation">)</span>a<span class="token punctuation">;</span>
<span class="token comment">// 因为byte类型的数据范围为[-128,127]</span>
<span class="token comment">// 那么这里的 c = 127;这里就出现了截断。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="5">
<li>浮点数到整数的转换是通过舍弃小数得到，而不是四舍五入。</li>
</ol>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">double</span> d <span class="token operator">=</span> <span class="token number">3.14</span><span class="token punctuation">;</span>
<span class="token keyword">double</span> c <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">2.15</span><span class="token punctuation">;</span>
<span class="token keyword">int</span> a <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span>d<span class="token punctuation">;</span>	<span class="token comment">// 这里的a = 3;</span>
<span class="token keyword">int</span> b <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span>c<span class="token punctuation">;</span> <span class="token comment">// 这里的b = -2;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="💖强制类型转换" tabindex="-1"><a class="header-anchor" href="#💖强制类型转换" aria-hidden="true">#</a> 💖强制类型转换</h3>
<p>  在了解强制数据类型的转换时，需要注意的是数据的容量即数据的范围，如果小类型向大类型转换时，这里会有类型的提升；而大类型向小类型转换时，会出现数值溢出的情况，那么这个时候会进行数据的截断。</p>
<ol>
<li>
<p>转换的数据类型必须是兼容的。</p>
</li>
<li>
<p>格式：<code v-pre>(type)value type</code>是要强制类型转换后的数据类型 实例：</p>
</li>
</ol>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">int</span> a <span class="token operator">=</span> <span class="token number">200</span><span class="token punctuation">;</span>
<span class="token keyword">byte</span> b <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span>a<span class="token punctuation">;</span>
<span class="token comment">// 这里b的值为127</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>隐含强制类型转换</p>
<ol>
<li>
<p>整数的默认类型是 int。</p>
</li>
<li>
<p>小数默认是 double 类型浮点型，在定义 float 类型时必须在数字后面跟上 F 或者 f。</p>
</li>
</ol>
<h2 id="装箱和拆箱" tabindex="-1"><a class="header-anchor" href="#装箱和拆箱" aria-hidden="true">#</a> 装箱和拆箱</h2>
<p>Java为8种基本数据类型都提供了对应的包装类</p>
<table>
<thead>
<tr>
<th style="text-align:center">基本类型</th>
<th style="text-align:center">包装类名</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">char</td>
<td style="text-align:center">Character</td>
</tr>
<tr>
<td style="text-align:center">byte</td>
<td style="text-align:center">Byte</td>
</tr>
<tr>
<td style="text-align:center">short</td>
<td style="text-align:center">Short</td>
</tr>
<tr>
<td style="text-align:center">int</td>
<td style="text-align:center">Integer</td>
</tr>
<tr>
<td style="text-align:center">long</td>
<td style="text-align:center">Long</td>
</tr>
<tr>
<td style="text-align:center">float</td>
<td style="text-align:center">Float</td>
</tr>
<tr>
<td style="text-align:center">double</td>
<td style="text-align:center">Double</td>
</tr>
<tr>
<td style="text-align:center">boolean</td>
<td style="text-align:center">Boolean</td>
</tr>
</tbody>
</table>
<ul>
<li>
<p>装箱：基本数据类型的字面量复制给包装类型的对象</p>
</li>
<li>
<p>拆箱：包装类型的值赋值给了基本数据类型的变量</p>
</li>
</ul>
<div class="hint-container info">
<p class="hint-container-title">注意</p>
<p>装箱和拆箱的操作是自动进行的，可以直接进行赋值。</p>
</div>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token class-name">Integer</span> b <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span> <span class="token comment">// 装箱</span>
<span class="token keyword">int</span> a <span class="token operator">=</span> b<span class="token punctuation">;</span>      <span class="token comment">// 拆箱</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


