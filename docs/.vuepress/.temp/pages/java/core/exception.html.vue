<template><div><h1 id="java核心-异常" tabindex="-1"><a class="header-anchor" href="#java核心-异常" aria-hidden="true">#</a> Java核心 - 异常</h1>
<figure><img src="@source/../assets/exception/2024-03-20-20-54-35.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<blockquote>
<p>上图中的继承关系，只罗列了常用的几个异常和错误，大体结构如此。</p>
</blockquote>
<h2 id="概述" tabindex="-1"><a class="header-anchor" href="#概述" aria-hidden="true">#</a> 概述</h2>
<p>异常是程序中的一些错误，但并不是所有的错误都是异常，其中有些错误是可以处理的，有些是不可以处理的。异常主要分为：Error（错误） 和 Exception（异常）。</p>
<h2 id="层次结构" tabindex="-1"><a class="header-anchor" href="#层次结构" aria-hidden="true">#</a> 层次结构</h2>
<p><strong>Throwable</strong></p>
<p>Throwable 是 Java 中所有错误与异常的超类，包含了两个子类：Error（错误）和 Exception（异常），通常情况下用于指示发生了异常情况。</p>
<p><strong>Error</strong></p>
<p>Error 类及其子类，是程序中无法处理的错误，表示运行应用程序中出现了严重的错误。</p>
<p>此类错误一般表示代码运行时 JVM 出现问题。通常有 Virtual MachineError（虚拟机运行错误）、NoClassDefFoundError（类定义错误）等。比如 OutOfMemoryError：内存不足错误；StackOverflowError：栈溢出错误。此类错误发生时，JVM 将终止线程。</p>
<p>这些错误是不受检异常，非代码性错误。因此，当此类错误发生时，应用程序不应该去处理此类错误。按照 Java 惯例，我们是不应该实现任何新的 Error 子类的！</p>
<p><strong>Exception</strong></p>
<p>Exception 及其子类，是程序本身可以捕获并且处理的异常。Exception 主要分为两种类型：RuntimeException（运行时异常） 和 编译时异常（非运行时异常）。</p>
<ul>
<li>运行时异常：</li>
</ul>
<p>运行时异常都是 RuntimeException 类或其子类，这些异常是不检查异常，程序中可以对其进行捕获处理，也可以不做任何处理，这些异常一般都是因为程序逻辑错误，程序应该从逻辑角度尽可能避免这类异常的发生。</p>
<p>运行时异常的特点是 Java 译器不会检查它，也就是说，当程序中可能出现这类异常，即使没有用 try-catch 语句捕获它，也没有用 throws 子句声明抛出它，也会编译通过。</p>
<ul>
<li>非运行时异常：</li>
</ul>
<p>非运行时异常是 RuntimeException 以外的异常，类型上都属于 Exception 类及其子类。从程序语法角度讲是必须进行处理的异常，如果不处理，程序就不能编译通过。如 IOException、SQLException 等以及用户自定义的 Exception 异常，一般情况下不自定义检查异常。</p>
<h2 id="异常基础" tabindex="-1"><a class="header-anchor" href="#异常基础" aria-hidden="true">#</a> 异常基础</h2>
<h3 id="异常关键字" tabindex="-1"><a class="header-anchor" href="#异常关键字" aria-hidden="true">#</a> 异常关键字</h3>
<ul>
<li>try – 用于监听。将要被监听的代码(可能抛出异常的代码)放在try语句块之内，当try语句块内发生异常时，异常就被抛出。</li>
<li>catch – 用于捕获异常。catch用来捕获try语句块中发生的异常。</li>
<li>finally – finally语句块总是会被执行。它主要用于回收在try块里打开的物力资源(如数据库连接、网络连接和磁盘文件)。只有finally块，执行完成之后，才会回来执行try或者catch块中的return或者throw语句，如果finally中使用了return或者throw等终止方法的语句，则就不会跳回执行，直接停止。</li>
<li>throw – 用于抛出异常。</li>
<li>throws – 用在方法签名中，用于声明该方法可能抛出的异常。</li>
</ul>
<h3 id="异常声明" tabindex="-1"><a class="header-anchor" href="#异常声明" aria-hidden="true">#</a> 异常声明</h3>
<p>在 Java 中大部分的功能语句都是在方法中执行，如果方法内的某条语句可能会出现异常，但是并没有进行捕获处理，那么就需要将异常传递给上层处理，对该方法进行异常的声明。使用 throws 关键字声明，多个异常使用 <code v-pre>,</code> 隔开。用法如下：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span><span class="token punctuation">,</span> <span class="token class-name">FileNotFoundException</span><span class="token punctuation">{</span> 
    <span class="token comment">// main thread statemenets ....</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="异常抛出" tabindex="-1"><a class="header-anchor" href="#异常抛出" aria-hidden="true">#</a> 异常抛出</h3>
<p>在当前方法中抛出一个异常可以使用 throw 关键字，通常情况下，当代码执行到某个条件下无法继续正常执行时，可以使用 throw 关键字抛出异常，以告知调用者当前的程序状态。</p>
<p>如下所示，当 num &lt; 0 时，抛出一个 IllegalArgumentException 异常。</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">checkNumber</span><span class="token punctuation">(</span><span class="token keyword">int</span> num<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>num <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalArgumentException</span><span class="token punctuation">(</span><span class="token string">"Number must be positive"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>大部分情况下都不需要手动抛出异常，因为Java的大部分方法要么已经处理异常，要么已声明异常。所以一般都是捕获异常或者再往上抛。</p>
<h3 id="异常捕获" tabindex="-1"><a class="header-anchor" href="#异常捕获" aria-hidden="true">#</a> 异常捕获</h3>
<p>在发生异常时不仅仅可以进行异常的声明，一些能够被处理的异常可以通过捕获进行处理，从而不交给上层。</p>
<p>常见的异常捕获方式有：</p>
<ul>
<li><strong>try-catch</strong></li>
</ul>
<p>在一个 try-catch 代码块中，可以捕获多个异常，并且根据异常的不同类型，做出不同的处理方式。用法如下：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">try</span> <span class="token punctuation">{</span>
    <span class="token comment">// statement</span>
<span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">FileNotFoundException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// handle FileNotFoundException</span>
<span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IOException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// handle IOException</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同一个 catch 也可以捕获多种类型异常，用 | 隔开</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">try</span> <span class="token punctuation">{</span>
    <span class="token comment">// statement</span>
<span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">FileNotFoundException</span> e <span class="token operator">|</span> <span class="token class-name">UnknownHostException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// handle FileNotFoundException or UnknownHostException</span>
<span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IOException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// handle IOException</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><strong>try-catch-finally</strong></li>
</ul>
<p>有时我们需要在捕获到异常并且处理结束后，关闭某些资源。这时可以使用 try-catch-finally 代码块。</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">try</span> <span class="token punctuation">{</span>                        
    <span class="token comment">// statement                </span>
<span class="token punctuation">}</span> <span class="token keyword">catch</span><span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>   
    <span class="token comment">// handle Exception   </span>
<span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
    <span class="token comment">// must excute statement</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行顺序：</p>
<ul>
<li>首先执行 try 代码块内的语句
<ul>
<li>发生异常时：执行完 catch 内的语句</li>
<li>未发生异常时：跳过 catch 代码块</li>
</ul>
</li>
<li>最后执行 finally 内的语句</li>
</ul>
<div class="hint-container warning">
<p class="hint-container-title">注意</p>
<p>这里要注意的是，try 代码块的执行过程中，一旦发生异常，转而执行 catch 内的代码，此时 try 发生异常之后的代码是不会被执行的。</p>
</div>
<ul>
<li><strong>try-finally</strong></li>
</ul>
<p>在特定的情况下，我们也可以直接使用 try-finally。try 块中引起异常，异常代码之后的语句不再执行，直接执行finally语句。 try块没有引发异常，则执行完try块就执行finally语句。</p>
<p>try-finally可用在不需要捕获异常的代码，可以保证资源在使用后被关闭。例如IO流中执行完相应操作后，关闭相应资源；使用Lock对象保证线程同步，通过finally可以保证锁会被释放；数据库连接代码时，关闭连接操作等等。</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">//以Lock加锁为例，演示try-finally</span>
<span class="token class-name">ReentrantLock</span> lock <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ReentrantLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">try</span> <span class="token punctuation">{</span>
    <span class="token comment">//需要加锁的代码</span>
<span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
    lock<span class="token punctuation">.</span><span class="token function">unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//保证锁一定被释放</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container tip">
<p class="hint-container-title">finally遇见如下情况不会执行</p>
<ul>
<li>在前面的代码中用了System.exit()退出程序。</li>
<li>finally语句块中发生了异常。</li>
<li>程序所在的线程死亡。</li>
<li>关闭CPU。</li>
</ul>
</div>
<ul>
<li><strong>try-with-resource</strong></li>
</ul>
<p>finally 中的 close 方法也可能抛出 IOException, 从而覆盖了原始异常。JAVA 7 提供了更优雅的方式来实现资源的自动释放，自动释放的资源需要是实现了 AutoCloseable 接口的类。</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">private</span>  <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">tryWithResourceTest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">Scanner</span> scanner <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Scanner</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">FileInputStream</span><span class="token punctuation">(</span><span class="token string">"c:/abc"</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token string">"UTF-8"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">// code</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IOException</span> e<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">// handle exception</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>Scanner</li>
</ul>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">final</span> <span class="token keyword">class</span> <span class="token class-name">Scanner</span> <span class="token keyword">implements</span> <span class="token class-name">Iterator</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span></span><span class="token punctuation">,</span> <span class="token class-name">Closeable</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">Closeable</span> <span class="token keyword">extends</span> <span class="token class-name">AutoCloseable</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>try 代码块退出时，会自动调用 scanner.close 方法，和把 scanner.close 方法放在 finally 代码块中不同的是，若 scanner.close 抛出异常，则会被抑制，抛出的仍然为原始异常。被抑制的异常会由 addSusppressed 方法添加到原来的异常，如果想要获取被抑制的异常列表，可以调用 getSuppressed 方法来获取。</p>
<h3 id="异常自定义" tabindex="-1"><a class="header-anchor" href="#异常自定义" aria-hidden="true">#</a> 异常自定义</h3>
<p>习惯上，定义一个异常类应包含两个构造函数，一个无参构造函数和一个带有详细描述信息的构造函数（Throwable 的 toString 方法会打印这些详细信息，调试时很有用）。</p>
<p>下面是一个简单的自定义异常类：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyException</span> <span class="token keyword">extends</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">MyException</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span> <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token class-name">MyException</span><span class="token punctuation">(</span><span class="token class-name">String</span> msg<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span>msg<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container warning">
<p class="hint-container-title">注意</p>
<p>Java 中需要我们自定义的绝大多数都是 Exception，Error 一般不能自己解决，故不需要自定义。</p>
</div>
</div></template>


