<template><div><h1 id="redis原理-通信协议resp" tabindex="-1"><a class="header-anchor" href="#redis原理-通信协议resp" aria-hidden="true">#</a> Redis原理 - 通信协议RESP</h1>
<h2 id="resp协议" tabindex="-1"><a class="header-anchor" href="#resp协议" aria-hidden="true">#</a> RESP协议</h2>
<p>Redis 是一个 CS 架构的软件，通信一般分两步（不包括pipeline 和 PubSub）：</p>
<ol>
<li>客户端（client）向服务端（server）发送一条命令</li>
<li>服务端解析并执行命令，返回响应结果给客户端</li>
</ol>
<p>因此客户端发送命令的格式、服务端响应结果的格式必须有一个规范，这个规范就是通信协议。</p>
<div class="hint-container note">
<p class="hint-container-title">CS架构</p>
<p>CS架构一般指服务器-客户机。 服务器-客户机，即Client-Server(C/S)结构。C/S结构通常采取两层结构。服务器负责数据的管理，客户机负责完成与用户的交互任务。</p>
<p><a href="https://baike.baidu.com/item/%E6%9C%8D%E5%8A%A1%E5%99%A8-%E5%AE%A2%E6%88%B7%E6%9C%BA?fromtitle=CS%E6%9E%B6%E6%9E%84&amp;fromid=7859292&amp;fromModule=lemma_search-box" target="_blank" rel="noopener noreferrer">百度百科-CS架构<ExternalLinkIcon/></a></p>
</div>
<p>而在 Redis 中采用的是 RESP 协议（Redis Sericlization Protocol）协议：</p>
<ul>
<li>Redis 1.2 版本引入了 RESP 协议</li>
<li>Redis 2.0 版本中成为与 Redis 服务端通信的标准，成为 RESP 2</li>
<li>Resis 6.0 版本中，从 RESP2 升级到了 RESP3 协议，增加了更多数据类型并且支持 6.0 的新特性——客户端缓存</li>
</ul>
<p>但是目前，默认使用的还是 RESP2 协议，也是我们需要重点掌握的协议。</p>
<p>在 RESP 中，通过首字节的字符来区分不同数据类型，常用的数据类型包括5种：</p>
<ul>
<li>单行字符串：首字节是 ‘+’，后面跟上单行字符串，以CRLF（&quot;\r\n&quot;）结尾，例如返回“OK”：&quot;+OK\r\n&quot;</li>
<li>错误(Errors)：首字节是 '-'，与单行字符串格式一样，只是字符串是异常信息，例如：&quot;-Error message\r\n&quot;</li>
<li>数值：首字节是 ':' ，后面跟上数字格式的字符串，以 CRLF 结尾。例如：&quot;:10\r\n&quot;</li>
<li>多行字符串：首字节是 '$'，表示二进制安全的字符串，最大支持 512 MB
<ul>
<li>如果大小为0，则代表空字符串：&quot;$0\r\n\r\n&quot;</li>
<li>如果大小为-1，则代表不存在：&quot;$-1\r\n&quot;</li>
</ul>
</li>
</ul>
<blockquote>
<p>这种方式通过记录字符串长度，来达到存储特殊字符的字符串的目的。例如存储 <code v-pre>hello</code>字符串，底层存储为：&quot;$5\r\nhello\r\n&quot;</p>
</blockquote>
<ul>
<li>数组：首字节是 '*'，后面跟上数组元素个数，再跟上元素，元素数据类型不限，可以是上述所有类型，还可以是数组。例如：</li>
</ul>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>*4\r\n
$3\r\nset\r\n
$4\r\nname\r\n
$6\r\n小鹏\r\n
*2\r\n$3\r\nage\r\n:10\r\n
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>中文字符，一个占3个字节。</p>
<h2 id="自定义客户端" tabindex="-1"><a class="header-anchor" href="#自定义客户端" aria-hidden="true">#</a> 自定义客户端</h2>
<p>基于 Socket 自定义 Redis 客户端。</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">MyRedisClient</span><span class="token punctuation">{</span>
    <span class="token keyword">static</span> <span class="token class-name">Socket</span> s<span class="token punctuation">;</span>
    <span class="token keyword">static</span> <span class="token class-name">PrintWriter</span> writer<span class="token punctuation">;</span>
    <span class="token keyword">static</span> <span class="token class-name">BufferedReader</span> reader<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token comment">// 1.建立连接</span>
            <span class="token class-name">String</span> host <span class="token operator">=</span> <span class="token string">"127.0.0.1"</span><span class="token punctuation">;</span>
            <span class="token keyword">int</span> port <span class="token operator">=</span> <span class="token number">6379</span><span class="token punctuation">;</span>
            s <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Socket</span><span class="token punctuation">(</span>host<span class="token punctuation">,</span> port<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 2.获取输出流、输入流</span>
            writer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PrintWriter</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">OutputStreamWriter</span><span class="token punctuation">(</span>s<span class="token punctuation">.</span><span class="token function">getOutputStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">StandardCharsets</span><span class="token punctuation">.</span><span class="token constant">UTF_8</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            reader <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BufferedReader</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">InputStreamReader</span><span class="token punctuation">(</span>s<span class="token punctuation">.</span><span class="token function">getInputStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">StandardCharsets</span><span class="token punctuation">.</span><span class="token constant">UTF_8</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">// 3.发出请求</span>
            <span class="token comment">// 3.1.获取授权 auth codermast</span>
            <span class="token function">sendRequest</span><span class="token punctuation">(</span><span class="token string">"auth"</span><span class="token punctuation">,</span> <span class="token string">"codermast"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">Object</span> obj <span class="token operator">=</span> <span class="token function">handleResponse</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"obj = "</span> <span class="token operator">+</span> obj<span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">// 3.2.set name 小鹏</span>
            <span class="token function">sendRequest</span><span class="token punctuation">(</span><span class="token string">"set"</span><span class="token punctuation">,</span> <span class="token string">"name"</span><span class="token punctuation">,</span> <span class="token string">"小鹏"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 4.解析响应</span>
            obj <span class="token operator">=</span> <span class="token function">handleResponse</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"obj = "</span> <span class="token operator">+</span> obj<span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">// 3.2.set name 小鹏</span>
            <span class="token function">sendRequest</span><span class="token punctuation">(</span><span class="token string">"get"</span><span class="token punctuation">,</span> <span class="token string">"name"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 4.解析响应</span>
            obj <span class="token operator">=</span> <span class="token function">handleResponse</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"obj = "</span> <span class="token operator">+</span> obj<span class="token punctuation">)</span><span class="token punctuation">;</span>

            <span class="token comment">// 3.2.set name 小鹏</span>
            <span class="token function">sendRequest</span><span class="token punctuation">(</span><span class="token string">"mget"</span><span class="token punctuation">,</span> <span class="token string">"name"</span><span class="token punctuation">,</span> <span class="token string">"num"</span><span class="token punctuation">,</span> <span class="token string">"msg"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 4.解析响应</span>
            obj <span class="token operator">=</span> <span class="token function">handleResponse</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"obj = "</span> <span class="token operator">+</span> obj<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IOException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
            <span class="token comment">// 5.释放连接</span>
            <span class="token keyword">try</span> <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>reader <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> reader<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>writer <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> writer<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>s <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> s<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IOException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">Object</span> <span class="token function">handleResponse</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
        <span class="token comment">// 读取首字节</span>
        <span class="token keyword">int</span> prefix <span class="token operator">=</span> reader<span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 判断数据类型标示</span>
        <span class="token keyword">switch</span> <span class="token punctuation">(</span>prefix<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">case</span> <span class="token char">'+'</span><span class="token operator">:</span> <span class="token comment">// 单行字符串，直接读一行</span>
                <span class="token keyword">return</span> reader<span class="token punctuation">.</span><span class="token function">readLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">case</span> <span class="token char">'-'</span><span class="token operator">:</span> <span class="token comment">// 异常，也读一行</span>
                <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span>reader<span class="token punctuation">.</span><span class="token function">readLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">case</span> <span class="token char">':'</span><span class="token operator">:</span> <span class="token comment">// 数字</span>
                <span class="token keyword">return</span> <span class="token class-name">Long</span><span class="token punctuation">.</span><span class="token function">parseLong</span><span class="token punctuation">(</span>reader<span class="token punctuation">.</span><span class="token function">readLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">case</span> <span class="token char">'$'</span><span class="token operator">:</span> <span class="token comment">// 多行字符串</span>
                <span class="token comment">// 先读长度</span>
                <span class="token keyword">int</span> len <span class="token operator">=</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token function">parseInt</span><span class="token punctuation">(</span>reader<span class="token punctuation">.</span><span class="token function">readLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>len <span class="token operator">==</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>len <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token keyword">return</span> <span class="token string">""</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                <span class="token comment">// 再读数据,读len个字节。我们假设没有特殊字符，所以读一行（简化）</span>
                <span class="token keyword">return</span> reader<span class="token punctuation">.</span><span class="token function">readLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">case</span> <span class="token char">'*'</span><span class="token operator">:</span>
                <span class="token keyword">return</span> <span class="token function">readBulkString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">default</span><span class="token operator">:</span>
                <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span><span class="token string">"错误的数据格式！"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">Object</span> <span class="token function">readBulkString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
        <span class="token comment">// 获取数组大小</span>
        <span class="token keyword">int</span> len <span class="token operator">=</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token function">parseInt</span><span class="token punctuation">(</span>reader<span class="token punctuation">.</span><span class="token function">readLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>len <span class="token operator">&lt;=</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// 定义集合，接收多个元素</span>
        <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">></span></span> list <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span>len<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 遍历，依次读取每个元素</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> len<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            list<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token function">handleResponse</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> list<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// set name 小鹏</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">sendRequest</span><span class="token punctuation">(</span><span class="token class-name">String</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        writer<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"*"</span> <span class="token operator">+</span> args<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">String</span> arg <span class="token operator">:</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            writer<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"$"</span> <span class="token operator">+</span> arg<span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token class-name">StandardCharsets</span><span class="token punctuation">.</span><span class="token constant">UTF_8</span><span class="token punctuation">)</span><span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">;</span>
            writer<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>arg<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        writer<span class="token punctuation">.</span><span class="token function">flush</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


