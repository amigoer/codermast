<template><div><h1 id="final关键字的用法及加载时机" tabindex="-1"><a class="header-anchor" href="#final关键字的用法及加载时机" aria-hidden="true">#</a> Final关键字的用法及加载时机</h1>
<h2 id="修饰变量" tabindex="-1"><a class="header-anchor" href="#修饰变量" aria-hidden="true">#</a> 修饰变量</h2>
<p>final关键字修饰变量表示该变量一经初始化，则无法被修改。</p>
<ul>
<li>基本类型和String类型：这类一般都是通过字面量进行赋值，一经初始化无法改变。</li>
<li>其他引用类型：这种类型我们无法改变常量指向的引用，但是仍然可以改变引用指向的对象，即引用指向的地址。</li>
</ul>
<h3 id="静态常量和对象常量" tabindex="-1"><a class="header-anchor" href="#静态常量和对象常量" aria-hidden="true">#</a> 静态常量和对象常量</h3>
<p>这里根据是否被static修饰可以将常量分为两类：</p>
<ol>
<li><strong>被final和static关键字同时修饰的变量</strong></li>
</ol>
<p>被final和static同时修饰的变量，我们称为静态常量，需要在类加载的时候进行初始化</p>
<ol start="2">
<li><strong>仅被final关键字修饰的变量</strong></li>
</ol>
<p>仅被final修饰的变量，我们称为对象常量，需要在实例化的时候进行初始化</p>
<h3 id="常量的初始化方式" tabindex="-1"><a class="header-anchor" href="#常量的初始化方式" aria-hidden="true">#</a> 常量的初始化方式</h3>
<h4 id="静态常量" tabindex="-1"><a class="header-anchor" href="#静态常量" aria-hidden="true">#</a> 静态常量</h4>
<ol>
<li>声明时初始化</li>
</ol>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">int</span> age <span class="token operator">=</span> <span class="token number">18</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="2">
<li>构造方法初始化</li>
</ol>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Main</span><span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">int</span> age<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        age <span class="token operator">=</span> <span class="token number">18</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><pre><code>3. 静态代码块初始化
</code></pre>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Main</span><span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">int</span> age<span class="token punctuation">;</span>

    <span class="token keyword">static</span><span class="token punctuation">{</span>
        age <span class="token operator">=</span> <span class="token number">18</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="对象常量" tabindex="-1"><a class="header-anchor" href="#对象常量" aria-hidden="true">#</a> 对象常量</h4>
<ol>
<li>声明时初始化</li>
</ol>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">final</span> <span class="token keyword">int</span> age <span class="token operator">=</span> <span class="token number">18</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="2">
<li>构造方法初始化</li>
</ol>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Main</span><span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">final</span> <span class="token keyword">int</span> age<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">Main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        age <span class="token operator">=</span> <span class="token number">18</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3">
<li>构造代码块初始化</li>
</ol>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Main</span><span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">final</span> <span class="token keyword">int</span> age<span class="token punctuation">;</span>
    <span class="token punctuation">{</span>
        age <span class="token operator">=</span> <span class="token number">18</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="常量的初始化过程" tabindex="-1"><a class="header-anchor" href="#常量的初始化过程" aria-hidden="true">#</a> 常量的初始化过程</h3>
<ul>
<li>final修饰的实例属性，在实例创建的时候才会赋值。</li>
<li>static修饰的类属性，在类加载的准备阶段赋初值，初始化阶段赋值。</li>
<li>static+final修饰的String类型或者基本类型常量，JVM规范是在初始化阶段赋值，但是HotSpot VM直接在准备阶段就赋值了，这里是通过字段的ConstantValue属性进行判断的。</li>
<li>static+final修饰的其他引用类型常量，赋值步骤和第二点的流程是一样的。</li>
</ul>
<blockquote>
<p>这里参考的是Archie_java这位大佬的文章进行总结的，<a href="https://blog.csdn.net/qq_43842093/article/details/122144825" target="_blank" rel="noopener noreferrer">你知道Java中final和static修饰的变量是在什么时候赋值的吗？_final修饰的变量什么时候赋值<ExternalLinkIcon/></a></p>
</blockquote>
<h3 id="constantvalue属性" tabindex="-1"><a class="header-anchor" href="#constantvalue属性" aria-hidden="true">#</a> ConstantValue属性</h3>
<p>final static修饰的成员变量只有在其类型为ConstantValue时才会在准备阶段被赋予具体值。什么时候会将字段加上ConstantValue属性呢？</p>
<p>ConstantValue需要满足2个条件：</p>
<ol>
<li>类型为基本类型或者String</li>
<li>并且使用字面量的形式赋值</li>
</ol>
<blockquote>
<p>必须是8种基本类型或者String类型，并且必须是通过字面量进行赋值，此时才会加上ConstantValue属性。</p>
</blockquote>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Main</span> <span class="token punctuation">{</span>
    <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">Node</span><span class="token punctuation">{</span>
        <span class="token keyword">int</span> val<span class="token punctuation">;</span>
        <span class="token class-name">Node</span> left<span class="token punctuation">;</span>
        <span class="token class-name">Node</span> right<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 使用字面量对int类型的常量进行赋值</span>
    <span class="token keyword">public</span> <span class="token keyword">final</span> <span class="token keyword">int</span> id <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>
    <span class="token comment">// 调用方法的返回值对int类型的常量进行赋值</span>
    <span class="token keyword">public</span> <span class="token keyword">final</span> <span class="token keyword">int</span> age <span class="token operator">=</span> <span class="token function">getAge</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 使用字面量对String类型的常量进行赋值</span>
    <span class="token keyword">public</span> <span class="token keyword">final</span> <span class="token class-name">String</span> address <span class="token operator">=</span> <span class="token string">"陕西省西安市"</span><span class="token punctuation">;</span>
    <span class="token comment">// 调用方法的返回值对String类型的常量进行赋值</span>
    <span class="token keyword">public</span> <span class="token keyword">final</span> <span class="token class-name">String</span> name <span class="token operator">=</span> <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 使用字面量对Node类型的常量进行赋值</span>
    <span class="token keyword">public</span> <span class="token keyword">final</span> <span class="token class-name">Node</span> root <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Node</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 调用方法的返回值对String类型的常量进行赋值</span>
    <span class="token keyword">public</span> <span class="token keyword">final</span> <span class="token class-name">Node</span> left <span class="token operator">=</span> <span class="token function">getNode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">getAge</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token number">18</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">"Hello Codermast!"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">Node</span> <span class="token function">getNode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Node</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们对于这个类使用<code v-pre>javap -verbose className</code>指令查看字节码文件</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>Classfile /Users/codermast/IdeaProjects/Demo/src/main/java/finalKeyword/Main.class
  Last modified <span class="token number">2023</span>年3月29日<span class="token punctuation">;</span> size <span class="token number">891</span> bytes
  SHA-256 checksum 0af0e202c117c2964acccd6eec3a5c4823a29c14bff3fc896f9e926a5edee590
  Compiled from <span class="token string">"Main.java"</span>
public class finalKeyword.Main
  minor version: <span class="token number">0</span>
  major version: <span class="token number">63</span>
  flags: <span class="token punctuation">(</span>0x0021<span class="token punctuation">)</span> ACC_PUBLIC, ACC_SUPER
  this_class: <span class="token comment">#8                          // finalKeyword/Main</span>
  super_class: <span class="token comment">#2                         // java/lang/Object</span>
  interfaces: <span class="token number">0</span>, fields: <span class="token number">6</span>, methods: <span class="token number">4</span>, attributes: <span class="token number">3</span>
Constant pool:
   <span class="token comment">#1 = Methodref          #2.#3          // java/lang/Object."&lt;init>":()V</span>
   <span class="token comment">#2 = Class              #4             // java/lang/Object</span>
   <span class="token comment">#3 = NameAndType        #5:#6          // "&lt;init>":()V</span>
   <span class="token comment">#4 = Utf8               java/lang/Object</span>
   <span class="token comment">#5 = Utf8               &lt;init></span>
   <span class="token comment">#6 = Utf8               ()V</span>
   <span class="token comment">#7 = Fieldref           #8.#9          // finalKeyword/Main.id:I</span>
   <span class="token comment">#8 = Class              #10            // finalKeyword/Main</span>
   <span class="token comment">#9 = NameAndType        #11:#12        // id:I</span>
  <span class="token comment">#10 = Utf8               finalKeyword/Main</span>
  <span class="token comment">#11 = Utf8               id</span>
  <span class="token comment">#12 = Utf8               I</span>
  <span class="token comment">#13 = Methodref          #8.#14         // finalKeyword/Main.getAge:()I</span>
  <span class="token comment">#14 = NameAndType        #15:#16        // getAge:()I</span>
  <span class="token comment">#15 = Utf8               getAge</span>
  <span class="token comment">#16 = Utf8               ()I</span>
  <span class="token comment">#17 = Fieldref           #8.#18         // finalKeyword/Main.age:I</span>
  <span class="token comment">#18 = NameAndType        #19:#12        // age:I</span>
  <span class="token comment">#19 = Utf8               age</span>
  <span class="token comment">#20 = String             #21            // 陕西省西安市</span>
  <span class="token comment">#21 = Utf8               陕西省西安市</span>
  <span class="token comment">#22 = Fieldref           #8.#23         // finalKeyword/Main.address:Ljava/lang/String;</span>
  <span class="token comment">#23 = NameAndType        #24:#25        // address:Ljava/lang/String;</span>
  <span class="token comment">#24 = Utf8               address</span>
  <span class="token comment">#25 = Utf8               Ljava/lang/String;</span>
  <span class="token comment">#26 = Methodref          #8.#27         // finalKeyword/Main.getName:()Ljava/lang/String;</span>
  <span class="token comment">#27 = NameAndType        #28:#29        // getName:()Ljava/lang/String;</span>
  <span class="token comment">#28 = Utf8               getName</span>
  <span class="token comment">#29 = Utf8               ()Ljava/lang/String;</span>
  <span class="token comment">#30 = Fieldref           #8.#31         // finalKeyword/Main.name:Ljava/lang/String;</span>
  <span class="token comment">#31 = NameAndType        #32:#25        // name:Ljava/lang/String;</span>
  <span class="token comment">#32 = Utf8               name</span>
  <span class="token comment">#33 = Class              #34            // finalKeyword/Main$Node</span>
  <span class="token comment">#34 = Utf8               finalKeyword/Main$Node</span>
  <span class="token comment">#35 = Methodref          #33.#3         // finalKeyword/Main$Node."&lt;init>":()V</span>
  <span class="token comment">#36 = Fieldref           #8.#37         // finalKeyword/Main.root:LfinalKeyword/Main$Node;</span>
  <span class="token comment">#37 = NameAndType        #38:#39        // root:LfinalKeyword/Main$Node;</span>
  <span class="token comment">#38 = Utf8               root</span>
  <span class="token comment">#39 = Utf8               LfinalKeyword/Main$Node;</span>
  <span class="token comment">#40 = Methodref          #8.#41         // finalKeyword/Main.getNode:()LfinalKeyword/Main$Node;</span>
  <span class="token comment">#41 = NameAndType        #42:#43        // getNode:()LfinalKeyword/Main$Node;</span>
  <span class="token comment">#42 = Utf8               getNode</span>
  <span class="token comment">#43 = Utf8               ()LfinalKeyword/Main$Node;</span>
  <span class="token comment">#44 = Fieldref           #8.#45         // finalKeyword/Main.left:LfinalKeyword/Main$Node;</span>
  <span class="token comment">#45 = NameAndType        #46:#39        // left:LfinalKeyword/Main$Node;</span>
  <span class="token comment">#46 = Utf8               left</span>
  <span class="token comment">#47 = String             #48            // Hello Codermast!</span>
  <span class="token comment">#48 = Utf8               Hello Codermast!</span>
  <span class="token comment">#49 = Utf8               ConstantValue</span>
  <span class="token comment">#50 = Integer            10</span>
  <span class="token comment">#51 = Utf8               Code</span>
  <span class="token comment">#52 = Utf8               LineNumberTable</span>
  <span class="token comment">#53 = Utf8               SourceFile</span>
  <span class="token comment">#54 = Utf8               Main.java</span>
  <span class="token comment">#55 = Utf8               NestMembers</span>
  <span class="token comment">#56 = Utf8               InnerClasses</span>
  <span class="token comment">#57 = Utf8               Node</span>
<span class="token punctuation">{</span>
  public final int <span class="token function">id</span><span class="token punctuation">;</span>
    descriptor: I
    flags: <span class="token punctuation">(</span>0x0011<span class="token punctuation">)</span> ACC_PUBLIC, ACC_FINAL
    ConstantValue: int <span class="token number">10</span>

  public final int age<span class="token punctuation">;</span>
    descriptor: I
    flags: <span class="token punctuation">(</span>0x0011<span class="token punctuation">)</span> ACC_PUBLIC, ACC_FINAL

  public final java.lang.String address<span class="token punctuation">;</span>
    descriptor: Ljava/lang/String<span class="token punctuation">;</span>
    flags: <span class="token punctuation">(</span>0x0011<span class="token punctuation">)</span> ACC_PUBLIC, ACC_FINAL
    ConstantValue: String 陕西省西安市

  public final java.lang.String name<span class="token punctuation">;</span>
    descriptor: Ljava/lang/String<span class="token punctuation">;</span>
    flags: <span class="token punctuation">(</span>0x0011<span class="token punctuation">)</span> ACC_PUBLIC, ACC_FINAL

  public final finalKeyword.Main<span class="token variable">$Node</span> root<span class="token punctuation">;</span>
    descriptor: LfinalKeyword/Main<span class="token variable">$Node</span><span class="token punctuation">;</span>
    flags: <span class="token punctuation">(</span>0x0011<span class="token punctuation">)</span> ACC_PUBLIC, ACC_FINAL

  public final finalKeyword.Main<span class="token variable">$Node</span> left<span class="token punctuation">;</span>
    descriptor: LfinalKeyword/Main<span class="token variable">$Node</span><span class="token punctuation">;</span>
    flags: <span class="token punctuation">(</span>0x0011<span class="token punctuation">)</span> ACC_PUBLIC, ACC_FINAL

  public finalKeyword.Main<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    descriptor: <span class="token punctuation">(</span><span class="token punctuation">)</span>V
    flags: <span class="token punctuation">(</span>0x0001<span class="token punctuation">)</span> ACC_PUBLIC
    Code:
      <span class="token assign-left variable">stack</span><span class="token operator">=</span><span class="token number">3</span>, <span class="token assign-left variable">locals</span><span class="token operator">=</span><span class="token number">1</span>, <span class="token assign-left variable">args_size</span><span class="token operator">=</span><span class="token number">1</span>
         <span class="token number">0</span>: aload_0
         <span class="token number">1</span>: invokespecial <span class="token comment">#1                  // Method java/lang/Object."&lt;init>":()V</span>
         <span class="token number">4</span>: aload_0
         <span class="token number">5</span>: bipush        <span class="token number">10</span>
         <span class="token number">7</span>: putfield      <span class="token comment">#7                  // Field id:I</span>
        <span class="token number">10</span>: aload_0
        <span class="token number">11</span>: aload_0
        <span class="token number">12</span>: invokevirtual <span class="token comment">#13                 // Method getAge:()I</span>
        <span class="token number">15</span>: putfield      <span class="token comment">#17                 // Field age:I</span>
        <span class="token number">18</span>: aload_0
        <span class="token number">19</span>: ldc           <span class="token comment">#20                 // String 陕西省西安市</span>
        <span class="token number">21</span>: putfield      <span class="token comment">#22                 // Field address:Ljava/lang/String;</span>
        <span class="token number">24</span>: aload_0
        <span class="token number">25</span>: aload_0
        <span class="token number">26</span>: invokevirtual <span class="token comment">#26                 // Method getName:()Ljava/lang/String;</span>
        <span class="token number">29</span>: putfield      <span class="token comment">#30                 // Field name:Ljava/lang/String;</span>
        <span class="token number">32</span>: aload_0
        <span class="token number">33</span>: new           <span class="token comment">#33                 // class finalKeyword/Main$Node</span>
        <span class="token number">36</span>: dup
        <span class="token number">37</span>: invokespecial <span class="token comment">#35                 // Method finalKeyword/Main$Node."&lt;init>":()V</span>
        <span class="token number">40</span>: putfield      <span class="token comment">#36                 // Field root:LfinalKeyword/Main$Node;</span>
        <span class="token number">43</span>: aload_0
        <span class="token number">44</span>: aload_0
        <span class="token number">45</span>: invokevirtual <span class="token comment">#40                 // Method getNode:()LfinalKeyword/Main$Node;</span>
        <span class="token number">48</span>: putfield      <span class="token comment">#44                 // Field left:LfinalKeyword/Main$Node;</span>
        <span class="token number">51</span>: <span class="token builtin class-name">return</span>
      LineNumberTable:
        line <span class="token number">3</span>: <span class="token number">0</span>
        line <span class="token number">11</span>: <span class="token number">4</span>
        line <span class="token number">13</span>: <span class="token number">10</span>
        line <span class="token number">16</span>: <span class="token number">18</span>
        line <span class="token number">18</span>: <span class="token number">24</span>
        line <span class="token number">21</span>: <span class="token number">32</span>
        line <span class="token number">23</span>: <span class="token number">43</span>

  public int getAge<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    descriptor: <span class="token punctuation">(</span><span class="token punctuation">)</span>I
    flags: <span class="token punctuation">(</span>0x0001<span class="token punctuation">)</span> ACC_PUBLIC
    Code:
      <span class="token assign-left variable">stack</span><span class="token operator">=</span><span class="token number">1</span>, <span class="token assign-left variable">locals</span><span class="token operator">=</span><span class="token number">1</span>, <span class="token assign-left variable">args_size</span><span class="token operator">=</span><span class="token number">1</span>
         <span class="token number">0</span>: bipush        <span class="token number">18</span>
         <span class="token number">2</span>: ireturn
      LineNumberTable:
        line <span class="token number">26</span>: <span class="token number">0</span>

  public java.lang.String getName<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    descriptor: <span class="token punctuation">(</span><span class="token punctuation">)</span>Ljava/lang/String<span class="token punctuation">;</span>
    flags: <span class="token punctuation">(</span>0x0001<span class="token punctuation">)</span> ACC_PUBLIC
    Code:
      <span class="token assign-left variable">stack</span><span class="token operator">=</span><span class="token number">1</span>, <span class="token assign-left variable">locals</span><span class="token operator">=</span><span class="token number">1</span>, <span class="token assign-left variable">args_size</span><span class="token operator">=</span><span class="token number">1</span>
         <span class="token number">0</span>: ldc           <span class="token comment">#47                 // String Hello Codermast!</span>
         <span class="token number">2</span>: areturn
      LineNumberTable:
        line <span class="token number">30</span>: <span class="token number">0</span>

  public finalKeyword.Main<span class="token variable">$Node</span> getNode<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    descriptor: <span class="token punctuation">(</span><span class="token punctuation">)</span>LfinalKeyword/Main<span class="token variable">$Node</span><span class="token punctuation">;</span>
    flags: <span class="token punctuation">(</span>0x0001<span class="token punctuation">)</span> ACC_PUBLIC
    Code:
      <span class="token assign-left variable">stack</span><span class="token operator">=</span><span class="token number">2</span>, <span class="token assign-left variable">locals</span><span class="token operator">=</span><span class="token number">1</span>, <span class="token assign-left variable">args_size</span><span class="token operator">=</span><span class="token number">1</span>
         <span class="token number">0</span>: new           <span class="token comment">#33                 // class finalKeyword/Main$Node</span>
         <span class="token number">3</span>: dup
         <span class="token number">4</span>: invokespecial <span class="token comment">#35                 // Method finalKeyword/Main$Node."&lt;init>":()V</span>
         <span class="token number">7</span>: areturn
      LineNumberTable:
        line <span class="token number">34</span>: <span class="token number">0</span>
<span class="token punctuation">}</span>
SourceFile: <span class="token string">"Main.java"</span>
NestMembers:
  finalKeyword/Main<span class="token variable">$Node</span>
InnerClasses:
  static <span class="token comment">#57= #33 of #8;                  // Node=class finalKeyword/Main$Node of class finalKeyword/Main</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们能够明显的看到只有</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">final</span> <span class="token keyword">int</span> id <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>
<span class="token keyword">public</span> <span class="token keyword">final</span> <span class="token class-name">String</span> address <span class="token operator">=</span> <span class="token string">"陕西省西安市"</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这两个字段被加上了ConstrantValue属性，也就是只有这两个属性在初始化时直接进行赋值。</p>
<h2 id="修饰方法" tabindex="-1"><a class="header-anchor" href="#修饰方法" aria-hidden="true">#</a> 修饰方法</h2>
<p>final关键字修饰方法，则表明该方法无法被子类重写，但是可以被子类继承子类也可以调用该方法。</p>
<h2 id="修饰类" tabindex="-1"><a class="header-anchor" href="#修饰类" aria-hidden="true">#</a> 修饰类</h2>
<p>final关键字修饰类，则表明该类无法被继承，如我们经常使用的java.lang.String类就是如此。</p>
</div></template>


