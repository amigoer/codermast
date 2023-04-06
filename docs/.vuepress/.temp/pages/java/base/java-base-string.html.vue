<template><div><h1 id="java基础-6-string、stringbuilder、stringbuffer" tabindex="-1"><a class="header-anchor" href="#java基础-6-string、stringbuilder、stringbuffer" aria-hidden="true">#</a> Java基础 - 6.String、StringBuilder、StringBuffer</h1>
<h2 id="💥string" tabindex="-1"><a class="header-anchor" href="#💥string" aria-hidden="true">#</a> 💥String</h2>
<h3 id="_1️⃣创建字符串" tabindex="-1"><a class="header-anchor" href="#_1️⃣创建字符串" aria-hidden="true">#</a> 1️⃣创建字符串</h3>
<p>  创建字符串的方式有很多种，这里我们只对部分进行介绍：</p>
<ol>
<li>直接赋值</li>
</ol>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token class-name">String</span> str <span class="token operator">=</span> <span class="token string">"Hello World!"</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="2">
<li>new String对象进行创建</li>
</ol>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token class-name">String</span> str <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span><span class="token string">"Hello World!"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="3">
<li>使用字符数组进行创建</li>
</ol>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">char</span><span class="token punctuation">[</span><span class="token punctuation">]</span> arr <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token char">'H'</span><span class="token punctuation">,</span><span class="token char">'e'</span><span class="token punctuation">,</span><span class="token char">'l'</span><span class="token punctuation">,</span><span class="token char">'l'</span><span class="token punctuation">,</span><span class="token char">'o'</span><span class="token punctuation">,</span><span class="token char">' '</span><span class="token punctuation">,</span><span class="token char">'W'</span><span class="token punctuation">,</span><span class="token char">'o'</span><span class="token punctuation">,</span><span class="token char">'r'</span><span class="token punctuation">,</span><span class="token char">'l'</span><span class="token punctuation">,</span><span class="token char">'d'</span><span class="token punctuation">,</span><span class="token char">'!'</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> str <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>  这里创建的三种字符串所打印输出的值均为<code v-pre>Hello World!</code></p>
<ol start="4">
<li>创建格式化的字符串</li>
</ol>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token class-name">String</span> str<span class="token punctuation">;</span>
str <span class="token operator">=</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">format</span><span class="token punctuation">(</span><span class="token string">"我的年龄为 "</span> <span class="token operator">+</span>
                   <span class="token string">"%d, 我的体重为 "</span> <span class="token operator">+</span>
                   <span class="token string">" %f, 我的名字为 "</span> <span class="token operator">+</span>
                   <span class="token string">" %s"</span><span class="token punctuation">,</span> intValue<span class="token punctuation">,</span> floatValue<span class="token punctuation">,</span> stringVaule<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>这里的用法和格式化输出是类似的。</p>
</blockquote>
<h3 id="_2️⃣连接字符串" tabindex="-1"><a class="header-anchor" href="#_2️⃣连接字符串" aria-hidden="true">#</a> 2️⃣连接字符串</h3>
<p>连接字符串有两种方式：</p>
<ol>
<li>使用concat方法</li>
</ol>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>str1<span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span>str2<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p>即将str1和str2连接起来。</p>
</blockquote>
<ol start="2">
<li>使用 + 连接</li>
</ol>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>str1 <span class="token operator">+</span> str2<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p>功能和方法一相同，一般在使用中这种方式最为常见。</p>
</blockquote>
<p>对于字符串的加运算，当编译成 class 文件时，会自动编译为 StringBuffer 来进行字符串的连接操作。</p>
<p>同时对于字符串常量池：</p>
<p>当一个字符串是一个字面量时，它会被放到一个常量池中，等待复用。</p>
<h3 id="_3️⃣字符串的存储" tabindex="-1"><a class="header-anchor" href="#_3️⃣字符串的存储" aria-hidden="true">#</a> 3️⃣字符串的存储</h3>
<p>  直接向String对象通过字面量的形式赋值，也就是第一种方式，这样所创建的字符串其本质是存储在公共池，而后面的几种方式是存储在堆，所以这里的在比较的时候会出现下面这种情况：</p>
<blockquote>
<p>str1 == str2 为 true
str1 == string1 为 fasle
string1 == string2 为 false</p>
</blockquote>
<p>这里的string1和string2是对象进行比较，在java中，对象之间要相等，其内容必须一致，而且其哈希值也必须一致，也就是存储的地址是相同的。</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token class-name">String</span> str1 <span class="token operator">=</span> <span class="token string">"Hello World!"</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> str2 <span class="token operator">=</span> <span class="token string">"Hello World!"</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> str3 <span class="token operator">=</span> <span class="token string">"Hello World!"</span><span class="token punctuation">;</span>

<span class="token class-name">String</span> string1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span><span class="token string">"Hello World!"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">String</span> string2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span><span class="token string">"Hello World!"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="@source/../assets/java-base-string/2023-04-06-22-41-06.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h3 id="_4️⃣字符串的更改" tabindex="-1"><a class="header-anchor" href="#_4️⃣字符串的更改" aria-hidden="true">#</a> 4️⃣字符串的更改</h3>
<p>  需要注意的是，字符串是不可更改的，我们平时所接触的更改只是将对象引用指向另外一个字符串对象，从而实现了更改的效果，但是本质上的字符串是没有进行更改的。</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token class-name">String</span> str1 <span class="token operator">=</span> <span class="token string">"Google"</span><span class="token punctuation">;</span>
str1 <span class="token operator">=</span> <span class="token string">"Baidu"</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="@source/../assets/java-base-string/2023-04-06-22-41-59.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>  那么这里为什么是不可修改的呢？我们在JDK中找到了答案：</p>
<figure><img src="@source/../assets/java-base-string/2023-04-06-22-41-36.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>  实际上String字符串在底层是以一个字符数组进行存储的，并且通过final关键字进行修饰，所以不可更改。</p>
<h3 id="_5️⃣字符串api" tabindex="-1"><a class="header-anchor" href="#_5️⃣字符串api" aria-hidden="true">#</a> 5️⃣字符串API</h3>
<table>
<thead>
<tr>
<th style="text-align:left">SN(序号)</th>
<th style="text-align:left">方法描述</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">1</td>
<td style="text-align:left"><a href="https://www.runoob.com/java/java-string-charat.html" target="_blank" rel="noopener noreferrer">char charAt(int index)<ExternalLinkIcon/></a> 返回指定索引处的 char 值。</td>
</tr>
<tr>
<td style="text-align:left">2</td>
<td style="text-align:left"><a href="https://www.runoob.com/java/java-string-compareto.html" target="_blank" rel="noopener noreferrer">int compareTo(Object o)<ExternalLinkIcon/></a> 把这个字符串和另一个对象比较。</td>
</tr>
<tr>
<td style="text-align:left">3</td>
<td style="text-align:left"><a href="https://www.runoob.com/java/java-string-compareto.html" target="_blank" rel="noopener noreferrer">int compareTo(String anotherString)<ExternalLinkIcon/></a> 按字典顺序比较两个字符串。</td>
</tr>
<tr>
<td style="text-align:left">4</td>
<td style="text-align:left"><a href="https://www.runoob.com/java/java-string-comparetoignorecase.html" target="_blank" rel="noopener noreferrer">int compareToIgnoreCase(String str)<ExternalLinkIcon/></a> 按字典顺序比较两个字符串，不考虑大小写。</td>
</tr>
<tr>
<td style="text-align:left">5</td>
<td style="text-align:left"><a href="https://www.runoob.com/java/java-string-concat.html" target="_blank" rel="noopener noreferrer">String concat(String str)<ExternalLinkIcon/></a> 将指定字符串连接到此字符串的结尾。</td>
</tr>
<tr>
<td style="text-align:left">6</td>
<td style="text-align:left"><a href="https://www.runoob.com/java/java-string-contentequals.html" target="_blank" rel="noopener noreferrer">boolean contentEquals(StringBuffer sb)<ExternalLinkIcon/></a> 当且仅当字符串与指定的StringBuffer有相同顺序的字符时候返回真。</td>
</tr>
<tr>
<td style="text-align:left">7</td>
<td style="text-align:left">[static String copyValueOf(char<a href="https://www.runoob.com/java/java-string-copyvalueof.html" target="_blank" rel="noopener noreferrer">] data)<ExternalLinkIcon/></a> 返回指定数组中表示该字符序列的 String。</td>
</tr>
<tr>
<td style="text-align:left">8</td>
<td style="text-align:left">[static String copyValueOf(char<a href="https://www.runoob.com/java/java-string-copyvalueof.html" target="_blank" rel="noopener noreferrer">] data, int offset, int count)<ExternalLinkIcon/></a> 返回指定数组中表示该字符序列的 String。</td>
</tr>
<tr>
<td style="text-align:left">9</td>
<td style="text-align:left"><a href="https://www.runoob.com/java/java-string-endswith.html" target="_blank" rel="noopener noreferrer">boolean endsWith(String suffix)<ExternalLinkIcon/></a> 测试此字符串是否以指定的后缀结束。</td>
</tr>
<tr>
<td style="text-align:left">10</td>
<td style="text-align:left"><a href="https://www.runoob.com/java/java-string-equals.html" target="_blank" rel="noopener noreferrer">boolean equals(Object anObject)<ExternalLinkIcon/></a> 将此字符串与指定的对象比较。</td>
</tr>
<tr>
<td style="text-align:left">11</td>
<td style="text-align:left"><a href="https://www.runoob.com/java/java-string-equalsignorecase.html" target="_blank" rel="noopener noreferrer">boolean equalsIgnoreCase(String anotherString)<ExternalLinkIcon/></a> 将此 String 与另一个 String 比较，不考虑大小写。</td>
</tr>
<tr>
<td style="text-align:left">12</td>
<td style="text-align:left">[byte<a href="https://www.runoob.com/java/java-string-getbytes.html" target="_blank" rel="noopener noreferrer">] getBytes()<ExternalLinkIcon/></a>  使用平台的默认字符集将此 String 编码为 byte 序列，并将结果存储到一个新的 byte 数组中。</td>
</tr>
<tr>
<td style="text-align:left">13</td>
<td style="text-align:left">[byte<a href="https://www.runoob.com/java/java-string-getbytes.html" target="_blank" rel="noopener noreferrer">] getBytes(String charsetName)<ExternalLinkIcon/></a> 使用指定的字符集将此 String 编码为 byte 序列，并将结果存储到一个新的 byte 数组中。</td>
</tr>
<tr>
<td style="text-align:left">14</td>
<td style="text-align:left">[void getChars(int srcBegin, int srcEnd, char<a href="https://www.runoob.com/java/java-string-getchars.html" target="_blank" rel="noopener noreferrer">] dst, int dstBegin)<ExternalLinkIcon/></a> 将字符从此字符串复制到目标字符数组。</td>
</tr>
<tr>
<td style="text-align:left">15</td>
<td style="text-align:left"><a href="https://www.runoob.com/java/java-string-hashcode.html" target="_blank" rel="noopener noreferrer">int hashCode()<ExternalLinkIcon/></a> 返回此字符串的哈希码。</td>
</tr>
<tr>
<td style="text-align:left">16</td>
<td style="text-align:left"><a href="https://www.runoob.com/java/java-string-indexof.html" target="_blank" rel="noopener noreferrer">int indexOf(int ch)<ExternalLinkIcon/></a> 返回指定字符在此字符串中第一次出现处的索引。</td>
</tr>
<tr>
<td style="text-align:left">17</td>
<td style="text-align:left"><a href="https://www.runoob.com/java/java-string-indexof.html" target="_blank" rel="noopener noreferrer">int indexOf(int ch, int fromIndex)<ExternalLinkIcon/></a> 返回在此字符串中第一次出现指定字符处的索引，从指定的索引开始搜索。</td>
</tr>
<tr>
<td style="text-align:left">18</td>
<td style="text-align:left"><a href="https://www.runoob.com/java/java-string-indexof.html" target="_blank" rel="noopener noreferrer">int indexOf(String str)<ExternalLinkIcon/></a>  返回指定子字符串在此字符串中第一次出现处的索引。</td>
</tr>
<tr>
<td style="text-align:left">19</td>
<td style="text-align:left"><a href="https://www.runoob.com/java/java-string-indexof.html" target="_blank" rel="noopener noreferrer">int indexOf(String str, int fromIndex)<ExternalLinkIcon/></a> 返回指定子字符串在此字符串中第一次出现处的索引，从指定的索引开始。</td>
</tr>
<tr>
<td style="text-align:left">20</td>
<td style="text-align:left"><a href="https://www.runoob.com/java/java-string-intern.html" target="_blank" rel="noopener noreferrer">String intern()<ExternalLinkIcon/></a>  返回字符串对象的规范化表示形式。</td>
</tr>
<tr>
<td style="text-align:left">21</td>
<td style="text-align:left"><a href="https://www.runoob.com/java/java-string-lastindexof.html" target="_blank" rel="noopener noreferrer">int lastIndexOf(int ch)<ExternalLinkIcon/></a>  返回指定字符在此字符串中最后一次出现处的索引。</td>
</tr>
<tr>
<td style="text-align:left">22</td>
<td style="text-align:left"><a href="https://www.runoob.com/java/java-string-lastindexof.html" target="_blank" rel="noopener noreferrer">int lastIndexOf(int ch, int fromIndex)<ExternalLinkIcon/></a> 返回指定字符在此字符串中最后一次出现处的索引，从指定的索引处开始进行反向搜索。</td>
</tr>
<tr>
<td style="text-align:left">23</td>
<td style="text-align:left"><a href="https://www.runoob.com/java/java-string-lastindexof.html" target="_blank" rel="noopener noreferrer">int lastIndexOf(String str)<ExternalLinkIcon/></a> 返回指定子字符串在此字符串中最右边出现处的索引。</td>
</tr>
<tr>
<td style="text-align:left">24</td>
<td style="text-align:left"><a href="https://www.runoob.com/java/java-string-lastindexof.html" target="_blank" rel="noopener noreferrer">int lastIndexOf(String str, int fromIndex)<ExternalLinkIcon/></a>  返回指定子字符串在此字符串中最后一次出现处的索引，从指定的索引开始反向搜索。</td>
</tr>
<tr>
<td style="text-align:left">25</td>
<td style="text-align:left"><a href="https://www.runoob.com/java/java-string-length.html" target="_blank" rel="noopener noreferrer">int length()<ExternalLinkIcon/></a> 返回此字符串的长度。</td>
</tr>
<tr>
<td style="text-align:left">26</td>
<td style="text-align:left"><a href="https://www.runoob.com/java/java-string-matches.html" target="_blank" rel="noopener noreferrer">boolean matches(String regex)<ExternalLinkIcon/></a> 告知此字符串是否匹配给定的正则表达式。</td>
</tr>
<tr>
<td style="text-align:left">27</td>
<td style="text-align:left"><a href="https://www.runoob.com/java/java-string-regionmatches.html" target="_blank" rel="noopener noreferrer">boolean regionMatches(boolean ignoreCase, int toffset, String other, int ooffset, int len)<ExternalLinkIcon/></a> 测试两个字符串区域是否相等。</td>
</tr>
<tr>
<td style="text-align:left">28</td>
<td style="text-align:left"><a href="https://www.runoob.com/java/java-string-regionmatches.html" target="_blank" rel="noopener noreferrer">boolean regionMatches(int toffset, String other, int ooffset, int len)<ExternalLinkIcon/></a> 测试两个字符串区域是否相等。</td>
</tr>
<tr>
<td style="text-align:left">29</td>
<td style="text-align:left"><a href="https://www.runoob.com/java/java-string-replace.html" target="_blank" rel="noopener noreferrer">String replace(char oldChar, char newChar)<ExternalLinkIcon/></a> 返回一个新的字符串，它是通过用 newChar 替换此字符串中出现的所有 oldChar 得到的。</td>
</tr>
<tr>
<td style="text-align:left">30</td>
<td style="text-align:left"><a href="https://www.runoob.com/java/java-string-replaceall.html" target="_blank" rel="noopener noreferrer">String replaceAll(String regex, String replacement)<ExternalLinkIcon/></a> 使用给定的 replacement 替换此字符串所有匹配给定的正则表达式的子字符串。</td>
</tr>
<tr>
<td style="text-align:left">31</td>
<td style="text-align:left"><a href="https://www.runoob.com/java/java-string-replacefirst.html" target="_blank" rel="noopener noreferrer">String replaceFirst(String regex, String replacement)<ExternalLinkIcon/></a>  使用给定的 replacement 替换此字符串匹配给定的正则表达式的第一个子字符串。</td>
</tr>
<tr>
<td style="text-align:left">32</td>
<td style="text-align:left">[String<a href="https://www.runoob.com/java/java-string-split.html" target="_blank" rel="noopener noreferrer">] split(String regex)<ExternalLinkIcon/></a> 根据给定正则表达式的匹配拆分此字符串。</td>
</tr>
<tr>
<td style="text-align:left">33</td>
<td style="text-align:left">[String<a href="https://www.runoob.com/java/java-string-split.html" target="_blank" rel="noopener noreferrer">] split(String regex, int limit)<ExternalLinkIcon/></a> 根据匹配给定的正则表达式来拆分此字符串。</td>
</tr>
<tr>
<td style="text-align:left">34</td>
<td style="text-align:left"><a href="https://www.runoob.com/java/java-string-startswith.html" target="_blank" rel="noopener noreferrer">boolean startsWith(String prefix)<ExternalLinkIcon/></a> 测试此字符串是否以指定的前缀开始。</td>
</tr>
<tr>
<td style="text-align:left">35</td>
<td style="text-align:left"><a href="https://www.runoob.com/java/java-string-startswith.html" target="_blank" rel="noopener noreferrer">boolean startsWith(String prefix, int toffset)<ExternalLinkIcon/></a> 测试此字符串从指定索引开始的子字符串是否以指定前缀开始。</td>
</tr>
<tr>
<td style="text-align:left">36</td>
<td style="text-align:left"><a href="https://www.runoob.com/java/java-string-subsequence.html" target="_blank" rel="noopener noreferrer">CharSequence subSequence(int beginIndex, int endIndex)<ExternalLinkIcon/></a>  返回一个新的字符序列，它是此序列的一个子序列。</td>
</tr>
<tr>
<td style="text-align:left">37</td>
<td style="text-align:left"><a href="https://www.runoob.com/java/java-string-substring.html" target="_blank" rel="noopener noreferrer">String substring(int beginIndex)<ExternalLinkIcon/></a> 返回一个新的字符串，它是此字符串的一个子字符串。</td>
</tr>
<tr>
<td style="text-align:left">38</td>
<td style="text-align:left"><a href="https://www.runoob.com/java/java-string-substring.html" target="_blank" rel="noopener noreferrer">String substring(int beginIndex, int endIndex)<ExternalLinkIcon/></a> 返回一个新字符串，它是此字符串的一个子字符串。</td>
</tr>
<tr>
<td style="text-align:left">39</td>
<td style="text-align:left">[char<a href="https://www.runoob.com/java/java-string-tochararray.html" target="_blank" rel="noopener noreferrer">] toCharArray()<ExternalLinkIcon/></a> 将此字符串转换为一个新的字符数组。</td>
</tr>
<tr>
<td style="text-align:left">40</td>
<td style="text-align:left"><a href="https://www.runoob.com/java/java-string-tolowercase.html" target="_blank" rel="noopener noreferrer">String toLowerCase()<ExternalLinkIcon/></a> 使用默认语言环境的规则将此 String 中的所有字符都转换为小写。</td>
</tr>
<tr>
<td style="text-align:left">41</td>
<td style="text-align:left"><a href="https://www.runoob.com/java/java-string-tolowercase.html" target="_blank" rel="noopener noreferrer">String toLowerCase(Locale locale)<ExternalLinkIcon/></a>  使用给定 Locale 的规则将此 String 中的所有字符都转换为小写。</td>
</tr>
<tr>
<td style="text-align:left">42</td>
<td style="text-align:left"><a href="https://www.runoob.com/java/java-string-tostring.html" target="_blank" rel="noopener noreferrer">String toString()<ExternalLinkIcon/></a>  返回此对象本身（它已经是一个字符串！）。</td>
</tr>
<tr>
<td style="text-align:left">43</td>
<td style="text-align:left"><a href="https://www.runoob.com/java/java-string-touppercase.html" target="_blank" rel="noopener noreferrer">String toUpperCase()<ExternalLinkIcon/></a> 使用默认语言环境的规则将此 String 中的所有字符都转换为大写。</td>
</tr>
<tr>
<td style="text-align:left">44</td>
<td style="text-align:left"><a href="https://www.runoob.com/java/java-string-touppercase.html" target="_blank" rel="noopener noreferrer">String toUpperCase(Locale locale)<ExternalLinkIcon/></a> 使用给定 Locale 的规则将此 String 中的所有字符都转换为大写。</td>
</tr>
<tr>
<td style="text-align:left">45</td>
<td style="text-align:left"><a href="https://www.runoob.com/java/java-string-trim.html" target="_blank" rel="noopener noreferrer">String trim()<ExternalLinkIcon/></a> 返回字符串的副本，忽略前导空白和尾部空白。</td>
</tr>
<tr>
<td style="text-align:left">46</td>
<td style="text-align:left"><a href="https://www.runoob.com/java/java-string-valueof.html" target="_blank" rel="noopener noreferrer">static String valueOf(primitive data type x)<ExternalLinkIcon/></a> 返回给定data type类型x参数的字符串表示形式。</td>
</tr>
<tr>
<td style="text-align:left">47</td>
<td style="text-align:left"><a href="https://www.runoob.com/java/java-string-contains.html" target="_blank" rel="noopener noreferrer">contains(CharSequence chars)<ExternalLinkIcon/></a> 判断是否包含指定的字符系列。</td>
</tr>
<tr>
<td style="text-align:left">48</td>
<td style="text-align:left"><a href="https://www.runoob.com/java/java-string-isempty.html" target="_blank" rel="noopener noreferrer">isEmpty()<ExternalLinkIcon/></a> 判断字符串是否为空。</td>
</tr>
</tbody>
</table>
<blockquote>
<p>API资料来源于：菜鸟教程<a href="https://www.runoob.com/java/java-string.html" target="_blank" rel="noopener noreferrer">https://www.runoob.com/java/java-string.html<ExternalLinkIcon/></a></p>
</blockquote>
<h2 id="💦stringbuffer和stringbuilder" tabindex="-1"><a class="header-anchor" href="#💦stringbuffer和stringbuilder" aria-hidden="true">#</a> 💦StringBuffer和StringBuilder</h2>
<p>  当对字符串进行修改的时候，需要使用 StringBuffer 和 StringBuilder 类。</p>
<p>  和 String 类不同的是，StringBuffer 和 StringBuilder 类的对象能够被多次的修改，并且不产生新的未使用对象。</p>
<figure><img src="@source/../assets/java-base-string/2023-04-06-22-38-53.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<blockquote>
<p>String实现了charsequence接口，而StringBuilder和StringBuffer继承自AbstractStringBuilder类，AbstractStringBuilder不仅实现了charsequence接口，而且也实现了Appendable接口，所以能够进行修改。</p>
</blockquote>
<p>  在使用 StringBuffer 类时，每次都会对 StringBuffer 对象本身进行操作，而不是生成新的对象，所以如果需要对字符串进行修改推荐使用 StringBuffer。</p>
<p>  StringBuilder 类在 Java 5 中被提出，它和 StringBuffer 之间的最大不同在于 StringBuilder 的方法不是线程安全的（不能同步访问）。</p>
<p>  由于 StringBuilder 相较于 StringBuffer 有速度优势，所以多数情况下建议使用 StringBuilder 类。</p>
<h3 id="_1️⃣stringbuffer" tabindex="-1"><a class="header-anchor" href="#_1️⃣stringbuffer" aria-hidden="true">#</a> 1️⃣StringBuffer</h3>
<table>
<thead>
<tr>
<th style="text-align:left">序号</th>
<th style="text-align:left">方法描述</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">1</td>
<td style="text-align:left">int capacity() 返回当前容量。</td>
</tr>
<tr>
<td style="text-align:left">2</td>
<td style="text-align:left">char charAt(int index) 返回此序列中指定索引处的 <code v-pre>char</code> 值。</td>
</tr>
<tr>
<td style="text-align:left">3</td>
<td style="text-align:left">void ensureCapacity(int minimumCapacity) 确保容量至少等于指定的最小值。</td>
</tr>
<tr>
<td style="text-align:left">4</td>
<td style="text-align:left">void getChars(int srcBegin, int srcEnd, char[] dst, int dstBegin) 将字符从此序列复制到目标字符数组 <code v-pre>dst</code>。</td>
</tr>
<tr>
<td style="text-align:left">5</td>
<td style="text-align:left">int indexOf(String str) 返回第一次出现的指定子字符串在该字符串中的索引。</td>
</tr>
<tr>
<td style="text-align:left">6</td>
<td style="text-align:left">int indexOf(String str, int fromIndex) 从指定的索引处开始，返回第一次出现的指定子字符串在该字符串中的索引。</td>
</tr>
<tr>
<td style="text-align:left">7</td>
<td style="text-align:left">int lastIndexOf(String str) 返回最右边出现的指定子字符串在此字符串中的索引。</td>
</tr>
<tr>
<td style="text-align:left">8</td>
<td style="text-align:left">int lastIndexOf(String str, int fromIndex) 返回 String 对象中子字符串最后出现的位置。</td>
</tr>
<tr>
<td style="text-align:left">9</td>
<td style="text-align:left">int length()  返回长度（字符数）。</td>
</tr>
<tr>
<td style="text-align:left">10</td>
<td style="text-align:left">void setCharAt(int index, char ch) 将给定索引处的字符设置为 <code v-pre>ch</code>。</td>
</tr>
<tr>
<td style="text-align:left">11</td>
<td style="text-align:left">void setLength(int newLength) 设置字符序列的长度。</td>
</tr>
<tr>
<td style="text-align:left">12</td>
<td style="text-align:left">CharSequence subSequence(int start, int end) 返回一个新的字符序列，该字符序列是此序列的子序列。</td>
</tr>
<tr>
<td style="text-align:left">13</td>
<td style="text-align:left">String substring(int start) 返回一个新的 <code v-pre>String</code>，它包含此字符序列当前所包含的字符子序列。</td>
</tr>
<tr>
<td style="text-align:left">14</td>
<td style="text-align:left">String substring(int start, int end) 返回一个新的 <code v-pre>String</code>，它包含此序列当前所包含的字符子序列。</td>
</tr>
<tr>
<td style="text-align:left">15</td>
<td style="text-align:left">String toString() 返回此序列中数据的字符串表示形式。</td>
</tr>
</tbody>
</table>
<h3 id="_2️⃣stringbuilder" tabindex="-1"><a class="header-anchor" href="#_2️⃣stringbuilder" aria-hidden="true">#</a> 2️⃣StringBuilder</h3>
<table>
<thead>
<tr>
<th style="text-align:left">序号</th>
<th style="text-align:left">方法描述</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">1</td>
<td style="text-align:left">public StringBuffer append(String s) 将指定的字符串追加到此字符序列。</td>
</tr>
<tr>
<td style="text-align:left">2</td>
<td style="text-align:left">public StringBuffer reverse()  将此字符序列用其反转形式取代。</td>
</tr>
<tr>
<td style="text-align:left">3</td>
<td style="text-align:left">public delete(int start, int end) 移除此序列的子字符串中的字符。</td>
</tr>
<tr>
<td style="text-align:left">4</td>
<td style="text-align:left">public insert(int offset, int i) 将 <code v-pre>int</code> 参数的字符串表示形式插入此序列中。</td>
</tr>
<tr>
<td style="text-align:left">5</td>
<td style="text-align:left">insert(int offset, String str) 将 <code v-pre>str</code> 参数的字符串插入此序列中。</td>
</tr>
<tr>
<td style="text-align:left">6</td>
<td style="text-align:left">replace(int start, int end, String str) 使用给定 <code v-pre>String</code> 中的字符替换此序列的子字符串中的字符。</td>
</tr>
</tbody>
</table>
<ul>
<li>StringBuilder效率更高，但是不是线程安全的。</li>
<li>StringBuffer效率不是最高，但其是线程安全的</li>
</ul>
<h2 id="三者区别" tabindex="-1"><a class="header-anchor" href="#三者区别" aria-hidden="true">#</a> 三者区别</h2>
<p>String：字符串常量，字符串长度不可变。Java中String 是immutable（不可变）的。用于存放字符的数组被声明为final的，因此只能赋值一次，不可再更改。</p>
<p>StringBuffer：字符串变量（Synchronized，即线程安全）。如果要频繁对字符串内容进行修改，出于效率考虑最好使用 StringBuffer，如果想转成 String 类型，可以调用 StringBuffer 的 toString() 方法。Java.lang.StringBuffer 线程安全的可变字符序列。在任意时间点上它都包含某种特定的字符序列，但通过某些方法调用可以改变该序列的长度和内容。可将字符串缓冲区安全地用于多个线程。</p>
<p>StringBuilder：字符串变量（非线程安全）。在内部 StringBuilder 对象被当作是一个包含字符序列的变长数组。</p>
<p>基本原则：</p>
<ul>
<li>如果要操作少量的数据用 String ；</li>
<li>单线程操作大量数据用StringBuilder ；</li>
<li>多线程操作大量数据，用StringBuffer。</li>
</ul>
</div></template>


