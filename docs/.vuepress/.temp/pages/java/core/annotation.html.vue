<template><div><h1 id="java核心-注解" tabindex="-1"><a class="header-anchor" href="#java核心-注解" aria-hidden="true">#</a> Java核心 - 注解</h1>
<h2 id="注解概述" tabindex="-1"><a class="header-anchor" href="#注解概述" aria-hidden="true">#</a> 注解概述</h2>
<p>注解是 JDK 5 开始引入的一个特性，用于对代码进行说明，可以对包、类、接口、字段、方法参数、局部变量等进行注解。主要有以下四种作用：</p>
<ol>
<li>生成文档，通过程序里标识的元数据生成 JavaDoc 文档。</li>
<li>编译检查，通过程序里标识的元数据让编译器在编译期间进行检查验证。</li>
<li>编译时动态处理，编译时通过代码里标识的元数据动态处理，例如动态生成代码。</li>
<li>运行时动态处理，运行时通过代码里标识的元数据动态处理，例如使用反射注入实例。</li>
</ol>
<p>这么说不够简单明了，常见的注解分类如下：</p>
<ul>
<li>内置注解：包括<code v-pre>@Override</code>、<code v-pre>@Deprecated</code>和<code v-pre>@SuppressWarnings</code>，分别用于标明重写某个方法、标明某个类或方法过时、标明要忽略的警告，用这些注解标明后编译器就会进行检查。</li>
<li>元注解：元注解是用于定义注解的注解，包括<code v-pre>@Retention</code>、<code v-pre>@Target</code>、<code v-pre>@Inherited</code>、<code v-pre>@Documented</code>，<code v-pre>@Retention</code>用于标明注解被保留的阶段，<code v-pre>@Target</code>用于标明注解使用的范围，<code v-pre>@Inherited</code>用于标明注解可继承，<code v-pre>@Documented</code>用于标明是否生成javadoc文档。</li>
<li>自定义注解：可以根据自己的需求定义注解，并可用元注解对自定义注解进行注解。</li>
</ul>
<p>注解就是 Java 代码里面的特殊标记，比如：@Override、@Test等，作用是让其他程序根据注解信息来决定怎么执行该程序。</p>
<p>注解可以用在类、构造器、方法、成员变量、参数等位置处</p>
<h2 id="内置注解" tabindex="-1"><a class="header-anchor" href="#内置注解" aria-hidden="true">#</a> 内置注解</h2>
<p>Java 1.5开始自带的标准注解，包括@Override、@Deprecated和@SuppressWarnings：</p>
<ul>
<li>@Override：表示当前的方法定义将覆盖父类中的方法</li>
<li>@Deprecated：表示代码被弃用，如果使用了被@Deprecated注解的代码则编译器将发出警告</li>
<li>@SuppressWarnings：表示关闭编译器警告信息</li>
</ul>
<h3 id="override注解" tabindex="-1"><a class="header-anchor" href="#override注解" aria-hidden="true">#</a> @Override注解</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Target</span><span class="token punctuation">(</span><span class="token class-name">ElementType</span><span class="token punctuation">.</span><span class="token constant">METHOD</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Retention</span><span class="token punctuation">(</span><span class="token class-name">RetentionPolicy</span><span class="token punctuation">.</span><span class="token constant">SOURCE</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token annotation punctuation">@interface</span> <span class="token class-name">Override</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从该注解的源码中不难看出，该注解作用在方法上，并且在编译时有效，在编译后的 class 文件中不存在。</p>
<p>这个注解的作用就是告诉编译器被修饰的方法是重写父类中的方法，编译器会根据此进行检查，如果发现父类中并不存在该方法，则会报错。</p>
<h3 id="deprecated注解" tabindex="-1"><a class="header-anchor" href="#deprecated注解" aria-hidden="true">#</a> @Deprecated注解</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Documented</span>
<span class="token annotation punctuation">@Retention</span><span class="token punctuation">(</span><span class="token class-name">RetentionPolicy</span><span class="token punctuation">.</span><span class="token constant">RUNTIME</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Target</span><span class="token punctuation">(</span>value<span class="token operator">=</span><span class="token punctuation">{</span><span class="token constant">CONSTRUCTOR</span><span class="token punctuation">,</span> <span class="token constant">FIELD</span><span class="token punctuation">,</span> <span class="token constant">LOCAL_VARIABLE</span><span class="token punctuation">,</span> <span class="token constant">METHOD</span><span class="token punctuation">,</span> <span class="token constant">PACKAGE</span><span class="token punctuation">,</span> <span class="token constant">PARAMETER</span><span class="token punctuation">,</span> <span class="token constant">TYPE</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token annotation punctuation">@interface</span> <span class="token class-name">Deprecated</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从该注解的源码中可以知道，它会被文档化，能够保留到运行时，能够修饰构造方法、属性、局部变量、方法、包、参数、类型。</p>
<p>这个注解的作用是告诉编译器被修饰的程序元素已被“废弃”，不再建议用户使用。</p>
<h3 id="suppresswarnings注解" tabindex="-1"><a class="header-anchor" href="#suppresswarnings注解" aria-hidden="true">#</a> @SuppressWarnings注解</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Target</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token constant">TYPE</span><span class="token punctuation">,</span> <span class="token constant">FIELD</span><span class="token punctuation">,</span> <span class="token constant">METHOD</span><span class="token punctuation">,</span> <span class="token constant">PARAMETER</span><span class="token punctuation">,</span> <span class="token constant">CONSTRUCTOR</span><span class="token punctuation">,</span> <span class="token constant">LOCAL_VARIABLE</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Retention</span><span class="token punctuation">(</span><span class="token class-name">RetentionPolicy</span><span class="token punctuation">.</span><span class="token constant">SOURCE</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token annotation punctuation">@interface</span> <span class="token class-name">SuppressWarnings</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">value</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个注解能修饰的程序元素包括类型、属性、方法、参数、构造器、局部变量，只能存活在源码时，取值为String[]。它的作用是告诉编译器忽略指定的警告信息，它可以取的值如下所示：</p>
<table>
<thead>
<tr>
<th style="text-align:center">参数</th>
<th style="text-align:center">作用</th>
<th style="text-align:center">原描述</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">all</td>
<td style="text-align:center">抑制所有警告</td>
<td style="text-align:center">to suppress all warnings</td>
</tr>
<tr>
<td style="text-align:center">boxing</td>
<td style="text-align:center">抑制装箱、拆箱操作时候的警告</td>
<td style="text-align:center">to suppress warnings relative to boxing/unboxing operations</td>
</tr>
<tr>
<td style="text-align:center">cast</td>
<td style="text-align:center">抑制映射相关的警告</td>
<td style="text-align:center">to suppress warnings relative to cast operations</td>
</tr>
<tr>
<td style="text-align:center">dep-ann</td>
<td style="text-align:center">抑制启用注释的警告</td>
<td style="text-align:center">to suppress warnings relative to deprecated annotation</td>
</tr>
<tr>
<td style="text-align:center">deprecation</td>
<td style="text-align:center">抑制过期方法警告</td>
<td style="text-align:center">to suppress warnings relative to deprecation</td>
</tr>
<tr>
<td style="text-align:center">fallthrough</td>
<td style="text-align:center">抑制确在switch中缺失breaks的警告</td>
<td style="text-align:center">to suppress warnings relative to missing breaks in switch statements</td>
</tr>
<tr>
<td style="text-align:center">finally</td>
<td style="text-align:center">抑制finally模块没有返回的警告</td>
<td style="text-align:center">to suppress warnings relative to finally block that don’t return</td>
</tr>
<tr>
<td style="text-align:center">hiding</td>
<td style="text-align:center">抑制与隐藏变数的区域变数相关的警告</td>
<td style="text-align:center">to suppress warnings relative to locals that hide variable（）</td>
</tr>
<tr>
<td style="text-align:center">incomplete-switch</td>
<td style="text-align:center">忽略没有完整的switch语句</td>
<td style="text-align:center">to suppress warnings relative to missing entries in a switch statement (enum case)</td>
</tr>
<tr>
<td style="text-align:center">nls</td>
<td style="text-align:center">忽略非nls格式的字符</td>
<td style="text-align:center">to suppress warnings relative to non-nls string literals</td>
</tr>
<tr>
<td style="text-align:center">null</td>
<td style="text-align:center">忽略对null的操作</td>
<td style="text-align:center">to suppress warnings relative to null analysis</td>
</tr>
<tr>
<td style="text-align:center">rawtype</td>
<td style="text-align:center">使用generics时忽略没有指定相应的类型</td>
<td style="text-align:center">to suppress warnings relative to un-specific types when using</td>
</tr>
<tr>
<td style="text-align:center">restriction</td>
<td style="text-align:center">抑制与使用不建议或禁止参照相关的警告</td>
<td style="text-align:center">to suppress warnings relative to usage of discouraged or</td>
</tr>
<tr>
<td style="text-align:center">serial</td>
<td style="text-align:center">忽略在serializable类中没有声明serialVersionUID变量</td>
<td style="text-align:center">to suppress warnings relative to missing serialVersionUID field for a serializable class</td>
</tr>
<tr>
<td style="text-align:center">static-access</td>
<td style="text-align:center">抑制不正确的静态访问方式警告</td>
<td style="text-align:center">to suppress warnings relative to incorrect static access</td>
</tr>
<tr>
<td style="text-align:center">synthetic-access</td>
<td style="text-align:center">抑制子类没有按最优方法访问内部类的警告</td>
<td style="text-align:center">to suppress warnings relative to unoptimized access from inner classes</td>
</tr>
<tr>
<td style="text-align:center">unchecked</td>
<td style="text-align:center">抑制没有进行类型检查操作的警告</td>
<td style="text-align:center">to suppress warnings relative to unchecked operations</td>
</tr>
<tr>
<td style="text-align:center">unqualified-field-access</td>
<td style="text-align:center">抑制没有权限访问的域的警告</td>
<td style="text-align:center">to suppress warnings relative to field access unqualified</td>
</tr>
<tr>
<td style="text-align:center">unused</td>
<td style="text-align:center">抑制没被使用过的代码的警告</td>
<td style="text-align:center">to suppress warnings relative to unused code</td>
</tr>
</tbody>
</table>
<h2 id="元注解" tabindex="-1"><a class="header-anchor" href="#元注解" aria-hidden="true">#</a> 元注解</h2>
<p>上述内置注解的定义中使用了一些元注解（注解类型进行注解的注解类），在JDK 1.5中提供了4个标准的元注解：<code v-pre>@Target</code>，<code v-pre>@Retention</code>，<code v-pre>@Documented</code>，<code v-pre>@Inherited</code>, 在JDK 1.8中提供了两个元注解 <code v-pre>@Repeatable</code> 和 <code v-pre>@Native</code>。</p>
<h3 id="target注解" tabindex="-1"><a class="header-anchor" href="#target注解" aria-hidden="true">#</a> @Target注解</h3>
<p><strong>Target 注解的作用是</strong>：描述注解的使用范围（即：被修饰的注解可以用在什么地方）。</p>
<p>Target注解用来说明那些被它所注解的注解类可修饰的对象范围：注解可以用于修饰 packages、types（类、接口、枚举、注解类）、类成员（方法、构造方法、成员变量、枚举值）、方法参数和本地变量（如循环变量、catch参数），在定义注解类时使用了@Target 能够更加清晰的知道它能够被用来修饰哪些对象，它的取值范围定义在ElementType 枚举中。</p>
<ul>
<li>@Target注解</li>
</ul>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Documented</span>
<span class="token annotation punctuation">@Retention</span><span class="token punctuation">(</span><span class="token class-name">RetentionPolicy</span><span class="token punctuation">.</span><span class="token constant">RUNTIME</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Target</span><span class="token punctuation">(</span><span class="token class-name">ElementType</span><span class="token punctuation">.</span><span class="token constant">ANNOTATION_TYPE</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token annotation punctuation">@interface</span> <span class="token class-name">Target</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * Returns an array of the kinds of elements an annotation type
     * can be applied to.
     * <span class="token keyword">@return</span> an array of the kinds of elements an annotation type
     * can be applied to
     */</span>
    <span class="token class-name">ElementType</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">value</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>ElementType</li>
</ul>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">enum</span> <span class="token class-name">ElementType</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/** Class, interface (including annotation type), or enum declaration */</span>
    <span class="token constant">TYPE</span><span class="token punctuation">,</span>

    <span class="token doc-comment comment">/** Field declaration (includes enum constants) */</span>
    <span class="token constant">FIELD</span><span class="token punctuation">,</span>

    <span class="token doc-comment comment">/** Method declaration */</span>
    <span class="token constant">METHOD</span><span class="token punctuation">,</span>

    <span class="token doc-comment comment">/** Formal parameter declaration */</span>
    <span class="token constant">PARAMETER</span><span class="token punctuation">,</span>

    <span class="token doc-comment comment">/** Constructor declaration */</span>
    <span class="token constant">CONSTRUCTOR</span><span class="token punctuation">,</span>

    <span class="token doc-comment comment">/** Local variable declaration */</span>
    <span class="token constant">LOCAL_VARIABLE</span><span class="token punctuation">,</span>

    <span class="token doc-comment comment">/** Annotation type declaration */</span>
    <span class="token constant">ANNOTATION_TYPE</span><span class="token punctuation">,</span>

    <span class="token doc-comment comment">/** Package declaration */</span>
    <span class="token constant">PACKAGE</span><span class="token punctuation">,</span>

    <span class="token doc-comment comment">/**
     * Type parameter declaration
     *
     * <span class="token keyword">@since</span> 1.8
     */</span>
    <span class="token constant">TYPE_PARAMETER</span><span class="token punctuation">,</span>

    <span class="token doc-comment comment">/**
     * Use of a type
     *
     * <span class="token keyword">@since</span> 1.8
     */</span>
    <span class="token constant">TYPE_USE</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="retention-retentiontarget注解" tabindex="-1"><a class="header-anchor" href="#retention-retentiontarget注解" aria-hidden="true">#</a> @Retention &amp; @RetentionTarget注解</h3>
<p>Reteniton注解的作用是：描述注解保留的时间范围（即：被描述的注解在它所修饰的类中可以被保留到何时） 。Reteniton注解用来限定那些被它所注解的注解类在注解到其他类上以后，可被保留到何时，一共有三种策略，定义在RetentionPolicy枚举中。</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">enum</span> <span class="token class-name">RetentionPolicy</span> <span class="token punctuation">{</span>
 
    <span class="token constant">SOURCE</span><span class="token punctuation">,</span>    <span class="token comment">// 源文件保留</span>
    <span class="token constant">CLASS</span><span class="token punctuation">,</span>       <span class="token comment">// 编译期保留，默认值</span>
    <span class="token constant">RUNTIME</span>   <span class="token comment">// 运行期保留，可通过反射去获取注解信息</span>
<span class="token punctuation">}</span>
为了验证应用了这三种策略的注解类有何区别，分别使用三种策略各定义一个注解类做测试。<span class="token annotation punctuation">@Retention</span><span class="token punctuation">(</span><span class="token class-name">RetentionPolicy</span><span class="token punctuation">.</span><span class="token constant">SOURCE</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token annotation punctuation">@interface</span> <span class="token class-name">SourcePolicy</span> <span class="token punctuation">{</span>
 
<span class="token punctuation">}</span>
<span class="token annotation punctuation">@Retention</span><span class="token punctuation">(</span><span class="token class-name">RetentionPolicy</span><span class="token punctuation">.</span><span class="token constant">CLASS</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token annotation punctuation">@interface</span> <span class="token class-name">ClassPolicy</span> <span class="token punctuation">{</span>
 
<span class="token punctuation">}</span>
<span class="token annotation punctuation">@Retention</span><span class="token punctuation">(</span><span class="token class-name">RetentionPolicy</span><span class="token punctuation">.</span><span class="token constant">RUNTIME</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token annotation punctuation">@interface</span> <span class="token class-name">RuntimePolicy</span> <span class="token punctuation">{</span>
 
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>用定义好的三个注解类分别去注解一个方法。</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RetentionTest</span> <span class="token punctuation">{</span>
 
	<span class="token annotation punctuation">@SourcePolicy</span>
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">sourcePolicy</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token punctuation">}</span>
 
	<span class="token annotation punctuation">@ClassPolicy</span>
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">classPolicy</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token punctuation">}</span>
 
	<span class="token annotation punctuation">@RuntimePolicy</span>
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">runtimePolicy</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过执行 javap -verbose RetentionTest命令获取到的RetentionTest 的 class 字节码内容如下。</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token punctuation">{</span>
  <span class="token keyword">public</span> <span class="token class-name"><span class="token namespace">retention<span class="token punctuation">.</span></span>RetentionTest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    flags<span class="token operator">:</span> <span class="token constant">ACC_PUBLIC</span>
    <span class="token class-name">Code</span><span class="token operator">:</span>
      stack<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">,</span> locals<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">,</span> args_size<span class="token operator">=</span><span class="token number">1</span>
         <span class="token number">0</span><span class="token operator">:</span> aload_0
         <span class="token number">1</span><span class="token operator">:</span> invokespecial #<span class="token number">1</span>                  <span class="token comment">// Method java/lang/Object."&lt;init>":()V</span>
         <span class="token number">4</span><span class="token operator">:</span> <span class="token keyword">return</span>
      <span class="token class-name">LineNumberTable</span><span class="token operator">:</span>
        line <span class="token number">3</span><span class="token operator">:</span> <span class="token number">0</span>

  <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">sourcePolicy</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    flags<span class="token operator">:</span> <span class="token constant">ACC_PUBLIC</span>
    <span class="token class-name">Code</span><span class="token operator">:</span>
      stack<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">,</span> locals<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">,</span> args_size<span class="token operator">=</span><span class="token number">1</span>
         <span class="token number">0</span><span class="token operator">:</span> <span class="token keyword">return</span>
      <span class="token class-name">LineNumberTable</span><span class="token operator">:</span>
        line <span class="token number">7</span><span class="token operator">:</span> <span class="token number">0</span>

  <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">classPolicy</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    flags<span class="token operator">:</span> <span class="token constant">ACC_PUBLIC</span>
    <span class="token class-name">Code</span><span class="token operator">:</span>
      stack<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">,</span> locals<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">,</span> args_size<span class="token operator">=</span><span class="token number">1</span>
         <span class="token number">0</span><span class="token operator">:</span> <span class="token keyword">return</span>
      <span class="token class-name">LineNumberTable</span><span class="token operator">:</span>
        line <span class="token number">11</span><span class="token operator">:</span> <span class="token number">0</span>
    <span class="token class-name">RuntimeInvisibleAnnotations</span><span class="token operator">:</span>
      <span class="token number">0</span><span class="token operator">:</span> #<span class="token function">11</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

  <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">runtimePolicy</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    flags<span class="token operator">:</span> <span class="token constant">ACC_PUBLIC</span>
    <span class="token class-name">Code</span><span class="token operator">:</span>
      stack<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">,</span> locals<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">,</span> args_size<span class="token operator">=</span><span class="token number">1</span>
         <span class="token number">0</span><span class="token operator">:</span> <span class="token keyword">return</span>
      <span class="token class-name">LineNumberTable</span><span class="token operator">:</span>
        line <span class="token number">15</span><span class="token operator">:</span> <span class="token number">0</span>
    <span class="token class-name">RuntimeVisibleAnnotations</span><span class="token operator">:</span>
      <span class="token number">0</span><span class="token operator">:</span> #<span class="token function">14</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从 RetentionTest 的字节码内容我们可以得出以下两点结论：编译器并没有记录下 sourcePolicy() 方法的注解信息；编译器分别使用了 RuntimeInvisibleAnnotations 和 RuntimeVisibleAnnotations 属性去记录了classPolicy()方法 和 runtimePolicy()方法 的注解信息；</p>
<h3 id="documented注解" tabindex="-1"><a class="header-anchor" href="#documented注解" aria-hidden="true">#</a> @Documented注解</h3>
<h3 id="inherited注解" tabindex="-1"><a class="header-anchor" href="#inherited注解" aria-hidden="true">#</a> @Inherited注解</h3>
<p>Inherited注解的作用：被它修饰的Annotation将具有继承性。如果某个类使用了被@Inherited修饰的Annotation，则其子类将自动具有该注解。</p>
<ul>
<li>定义<code v-pre>@Inherited</code>注解</li>
</ul>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Inherited</span>
<span class="token annotation punctuation">@Retention</span><span class="token punctuation">(</span><span class="token class-name">RetentionPolicy</span><span class="token punctuation">.</span><span class="token constant">RUNTIME</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Target</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token class-name">ElementType</span><span class="token punctuation">.</span><span class="token constant">TYPE</span><span class="token punctuation">,</span><span class="token class-name">ElementType</span><span class="token punctuation">.</span><span class="token constant">METHOD</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token annotation punctuation">@interface</span> <span class="token class-name">TestInheritedAnnotation</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> <span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">values</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> <span class="token function">number</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>使用这个注解</li>
</ul>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@TestInheritedAnnotation</span><span class="token punctuation">(</span>values <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token string">"value"</span><span class="token punctuation">}</span><span class="token punctuation">,</span> number <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Person</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Student</span> <span class="token keyword">extends</span> <span class="token class-name">Person</span><span class="token punctuation">{</span>
	<span class="token annotation punctuation">@Test</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">test</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">Class</span> clazz <span class="token operator">=</span> <span class="token class-name">Student</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">;</span>
        <span class="token class-name">Annotation</span><span class="token punctuation">[</span><span class="token punctuation">]</span> annotations <span class="token operator">=</span> clazz<span class="token punctuation">.</span><span class="token function">getAnnotations</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Annotation</span> annotation <span class="token operator">:</span> annotations<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>annotation<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>输出</li>
</ul>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token class-name"><span class="token namespace">xxxxxxx<span class="token punctuation">.</span></span>TestInheritedAnnotation</span><span class="token punctuation">(</span>values<span class="token operator">=</span><span class="token punctuation">[</span>value<span class="token punctuation">]</span><span class="token punctuation">,</span> number<span class="token operator">=</span><span class="token number">10</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>即使Student类没有显示地被注解 @TestInheritedAnnotation，但是它的父类 Person 被注解，而且 @TestInheritedAnnotation 被 @Inherited 注解，因此 @TestInheritedAnnotation 注解可以被继承，则 Student 类自动有了该注解。</p>
<h2 id="注解与反射接口" tabindex="-1"><a class="header-anchor" href="#注解与反射接口" aria-hidden="true">#</a> 注解与反射接口</h2>
<p>定义注解后，如何获取注解中的内容呢？反射包java.lang.reflect下的AnnotatedElement接口提供这些方法。这里注意：只有注解被定义为RUNTIME后，该注解才能是运行时可见，当class文件被装载时被保存在class文件中的Annotation才会被虚拟机读取。</p>
<p>AnnotatedElement 接口是所有程序元素（Class、Method和Constructor）的父接口，所以程序通过反射获取了某个类的AnnotatedElement对象之后，程序就可以调用该对象的方法来访问Annotation信息。我们看下具体的先关接口</p>
<ul>
<li><code v-pre>boolean isAnnotationPresent(Class&lt;?extends Annotation&gt; annotationClass)</code></li>
</ul>
<p>判断该程序元素上是否包含指定类型的注解，存在则返回true，否则返回false。注意：此方法会忽略注解对应的注解容器。</p>
<ul>
<li><code v-pre>&lt;T extends Annotation&gt; T getAnnotation(Class&lt;T&gt; annotationClass)</code></li>
</ul>
<p>返回该程序元素上存在的、指定类型的注解，如果该类型注解不存在，则返回null。</p>
<ul>
<li><code v-pre>Annotation[] getAnnotations()</code></li>
</ul>
<p>返回该程序元素上存在的所有注解，若没有注解，返回长度为0的数组。</p>
<ul>
<li><code v-pre>&lt;T extends Annotation&gt; T[] getAnnotationsByType(Class&lt;T&gt; annotationClass)</code></li>
</ul>
<p>返回该程序元素上存在的、指定类型的注解数组。没有注解对应类型的注解时，返回长度为0的数组。该方法的调用者可以随意修改返回的数组，而不会对其他调用者返回的数组产生任何影响。<code v-pre>getAnnotationsByType</code>方法与 <code v-pre>getAnnotation</code>的区别在于，<code v-pre>getAnnotationsByType</code>会检测注解对应的重复注解容器。若程序元素为类，当前类上找不到注解，且该注解为可继承的，则会去父类上检测对应的注解。</p>
<ul>
<li><code v-pre>&lt;T extends Annotation&gt; T getDeclaredAnnotation(Class&lt;T&gt; annotationClass)</code></li>
</ul>
<p>返回直接存在于此元素上的所有注解。与此接口中的其他方法不同，该方法将忽略继承的注释。如果没有注释直接存在于此元素上，则返回null</p>
<ul>
<li><code v-pre>&lt;T extends Annotation&gt; T[] getDeclaredAnnotationsByType(Class&lt;T&gt; annotationClass)</code></li>
</ul>
<p>返回直接存在于此元素上的所有注解。与此接口中的其他方法不同，该方法将忽略继承的注释</p>
<ul>
<li><code v-pre>Annotation[] getDeclaredAnnotations()</code></li>
</ul>
<p>返回直接存在于此元素上的所有注解及注解对应的重复注解容器。与此接口中的其他方法不同，该方法将忽略继承的注解。如果没有注释直接存在于此元素上，则返回长度为零的一个数组。该方法的调用者可以随意修改返回的数组，而不会对其他调用者返回的数组产生任何影响。</p>
<h2 id="自定义注解" tabindex="-1"><a class="header-anchor" href="#自定义注解" aria-hidden="true">#</a> 自定义注解</h2>
<h3 id="注解自定义语法" tabindex="-1"><a class="header-anchor" href="#注解自定义语法" aria-hidden="true">#</a> 注解自定义语法</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token annotation punctuation">@interface</span> 注解名称 <span class="token punctuation">{</span>
    <span class="token keyword">public</span> 属性类型 属性名称<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">default</span> 默认值<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面是一个自定义的注解 MyAnnotation：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token annotation punctuation">@interface</span> <span class="token class-name">MyAnnotation</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> <span class="token function">name</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">default</span> <span class="token string">"codermast"</span><span class="token punctuation">;</span>

    <span class="token keyword">boolean</span> <span class="token function">sex</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">default</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="注解使用语法" tabindex="-1"><a class="header-anchor" href="#注解使用语法" aria-hidden="true">#</a> 注解使用语法</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@MyAnnotation</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">"hello"</span><span class="token punctuation">,</span>sex <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AnnotationTest</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@MyAnnotation</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">"xiaoming"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// statement </span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="特殊属性" tabindex="-1"><a class="header-anchor" href="#特殊属性" aria-hidden="true">#</a> 特殊属性</h3>
<p>如果注解中只有一个属性且名叫 value 时，在使用时该属性的名称可以不写。</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">// 特殊注解</span>
<span class="token keyword">public</span> <span class="token annotation punctuation">@interface</span> <span class="token class-name">MyAnnotation1</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> <span class="token function">value</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 使用时</span>
<span class="token annotation punctuation">@MyAnnotation</span><span class="token punctuation">(</span><span class="token string">"CoderMast"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AnnotationTest</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container tip">
<p class="hint-container-title">注解f本质</p>
<ul>
<li>注解本质就是一个接口，Java 中所有注解都是继承了 Annotation 接口。</li>
<li>@注解(...)：其实就是一个接口的实现类对象，实现了该注解以及 Annotation 接口。</li>
</ul>
</div>
<h3 id="自定义注解实例" tabindex="-1"><a class="header-anchor" href="#自定义注解实例" aria-hidden="true">#</a> 自定义注解实例</h3>
<blockquote>
<p>当我们理解了内置注解, 元注解和获取注解的反射接口后，我们便可以开始自定义注解了。这个例子我把上述的知识点全部融入进来, 代码很简单：</p>
</blockquote>
<ul>
<li>定义自己的注解</li>
</ul>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>pdai<span class="token punctuation">.</span>java<span class="token punctuation">.</span>annotation</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">ElementType</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Retention</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">RetentionPolicy</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Target</span></span><span class="token punctuation">;</span>

<span class="token annotation punctuation">@Target</span><span class="token punctuation">(</span><span class="token class-name">ElementType</span><span class="token punctuation">.</span><span class="token constant">METHOD</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Retention</span><span class="token punctuation">(</span><span class="token class-name">RetentionPolicy</span><span class="token punctuation">.</span><span class="token constant">RUNTIME</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token annotation punctuation">@interface</span> <span class="token class-name">MyMethodAnnotation</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">title</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">default</span> <span class="token string">""</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">description</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">default</span> <span class="token string">""</span><span class="token punctuation">;</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>使用注解</li>
</ul>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>pdai<span class="token punctuation">.</span>java<span class="token punctuation">.</span>annotation</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>io<span class="token punctuation">.</span></span><span class="token class-name">FileNotFoundException</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Annotation</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span>reflect<span class="token punctuation">.</span></span><span class="token class-name">Method</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">ArrayList</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">List</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TestMethodAnnotation</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token annotation punctuation">@MyMethodAnnotation</span><span class="token punctuation">(</span>title <span class="token operator">=</span> <span class="token string">"toStringMethod"</span><span class="token punctuation">,</span> description <span class="token operator">=</span> <span class="token string">"override toString method"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">"Override toString method"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Deprecated</span>
    <span class="token annotation punctuation">@MyMethodAnnotation</span><span class="token punctuation">(</span>title <span class="token operator">=</span> <span class="token string">"old static method"</span><span class="token punctuation">,</span> description <span class="token operator">=</span> <span class="token string">"deprecated old static method"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">oldMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"old method, don't use it."</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@SuppressWarnings</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token string">"unchecked"</span><span class="token punctuation">,</span> <span class="token string">"deprecation"</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token annotation punctuation">@MyMethodAnnotation</span><span class="token punctuation">(</span>title <span class="token operator">=</span> <span class="token string">"test method"</span><span class="token punctuation">,</span> description <span class="token operator">=</span> <span class="token string">"suppress warning static method"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">genericsTest</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">FileNotFoundException</span> <span class="token punctuation">{</span>
        <span class="token class-name">List</span> l <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        l<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">"abc"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">oldMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>用反射接口获取注解信息</li>
</ul>
<p>在TestMethodAnnotation中添加Main方法进行测试：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token comment">// 获取所有methods</span>
        <span class="token class-name">Method</span><span class="token punctuation">[</span><span class="token punctuation">]</span> methods <span class="token operator">=</span> <span class="token class-name">TestMethodAnnotation</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">.</span><span class="token function">getClassLoader</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">loadClass</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token string">"com.pdai.java.annotation.TestMethodAnnotation"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">getMethods</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 遍历</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Method</span> method <span class="token operator">:</span> methods<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 方法上是否有MyMethodAnnotation注解</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>method<span class="token punctuation">.</span><span class="token function">isAnnotationPresent</span><span class="token punctuation">(</span><span class="token class-name">MyMethodAnnotation</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">try</span> <span class="token punctuation">{</span>
                    <span class="token comment">// 获取并遍历方法上的所有注解</span>
                    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Annotation</span> anno <span class="token operator">:</span> method<span class="token punctuation">.</span><span class="token function">getDeclaredAnnotations</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Annotation in Method '"</span>
                                <span class="token operator">+</span> method <span class="token operator">+</span> <span class="token string">"' : "</span> <span class="token operator">+</span> anno<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>

                    <span class="token comment">// 获取MyMethodAnnotation对象信息</span>
                    <span class="token class-name">MyMethodAnnotation</span> methodAnno <span class="token operator">=</span> method
                            <span class="token punctuation">.</span><span class="token function">getAnnotation</span><span class="token punctuation">(</span><span class="token class-name">MyMethodAnnotation</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

                    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>methodAnno<span class="token punctuation">.</span><span class="token function">title</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

                <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Throwable</span> ex<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    ex<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">SecurityException</span> <span class="token operator">|</span> <span class="token class-name">ClassNotFoundException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>测试的输出</li>
</ul>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token class-name">Annotation</span> in <span class="token class-name">Method</span> '<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token class-name"><span class="token namespace">com<span class="token punctuation">.</span>pdai<span class="token punctuation">.</span>java<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span>TestMethodAnnotation</span><span class="token punctuation">.</span><span class="token function">oldMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span>' <span class="token operator">:</span> <span class="token annotation punctuation">@java.lang.Deprecated</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token class-name">Annotation</span> in <span class="token class-name">Method</span> '<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token class-name"><span class="token namespace">com<span class="token punctuation">.</span>pdai<span class="token punctuation">.</span>java<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span>TestMethodAnnotation</span><span class="token punctuation">.</span><span class="token function">oldMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span>' <span class="token operator">:</span> <span class="token annotation punctuation">@com.pdai.java.annotation.MyMethodAnnotation</span><span class="token punctuation">(</span>title<span class="token operator">=</span>old <span class="token keyword">static</span> method<span class="token punctuation">,</span> description<span class="token operator">=</span>deprecated old <span class="token keyword">static</span> method<span class="token punctuation">)</span>
old <span class="token keyword">static</span> method
<span class="token class-name">Annotation</span> in <span class="token class-name">Method</span> '<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token class-name"><span class="token namespace">com<span class="token punctuation">.</span>pdai<span class="token punctuation">.</span>java<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span>TestMethodAnnotation</span><span class="token punctuation">.</span><span class="token function">genericsTest</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name"><span class="token namespace">java<span class="token punctuation">.</span>io<span class="token punctuation">.</span></span>FileNotFoundException</span>' <span class="token operator">:</span> <span class="token annotation punctuation">@com.pdai.java.annotation.MyMethodAnnotation</span><span class="token punctuation">(</span>title<span class="token operator">=</span>test method<span class="token punctuation">,</span> description<span class="token operator">=</span>suppress warning <span class="token keyword">static</span> method<span class="token punctuation">)</span>
test method
<span class="token class-name">Annotation</span> in <span class="token class-name">Method</span> '<span class="token keyword">public</span> <span class="token class-name"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span></span>String</span> <span class="token class-name"><span class="token namespace">com<span class="token punctuation">.</span>pdai<span class="token punctuation">.</span>java<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span>TestMethodAnnotation</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span>' <span class="token operator">:</span> <span class="token annotation punctuation">@com.pdai.java.annotation.MyMethodAnnotation</span><span class="token punctuation">(</span>title<span class="token operator">=</span>toStringMethod<span class="token punctuation">,</span> description<span class="token operator">=</span>override toString method<span class="token punctuation">)</span>
toStringMethod
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


