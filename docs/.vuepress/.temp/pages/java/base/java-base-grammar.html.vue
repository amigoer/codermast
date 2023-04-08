<template><div><h1 id="基本概念" tabindex="-1"><a class="header-anchor" href="#基本概念" aria-hidden="true">#</a> 基本概念</h1>
<div class="hint-container tip">
<p class="hint-container-title">学习之前</p>
<p>在正式学习Java之前，我们首先需要了解一些基本的概念，如类和对象，局部变量和全局变量也叫属性，还有一些方法。</p>
</div>
<h2 id="❤️类" tabindex="-1"><a class="header-anchor" href="#❤️类" aria-hidden="true">#</a> ❤️类</h2>
<blockquote>
<p>类是一个模板，它描述一类对象的行为和状态。</p>
</blockquote>
<p>  举个我们生活中的例子，如：汽车，其实就只是一个模板而已，具体的汽车类型可以进行详细的分类，轿车、越野车、货车等等具体的实现，而汽车只是说明主要包含了那些，但是并没有将其实现。
  又如动物，具体以后就是猫、狗、鸡、鸭等具体的动物，这里的动物就可以看做一个类。</p>
<h2 id="💛对象" tabindex="-1"><a class="header-anchor" href="#💛对象" aria-hidden="true">#</a> 💛对象</h2>
<blockquote>
<p>对象是类的一个实例，有状态和行为。</p>
</blockquote>
<p>  对象就是类的实例化，如一条狗就是一个动物的实例化对象。对象拥有一些属性，这些值来决定对象的状态。如狗的大小，体重，长度都可以来决定这个狗的一些状态。</p>
<h2 id="💚属性" tabindex="-1"><a class="header-anchor" href="#💚属性" aria-hidden="true">#</a> 💚属性</h2>
<blockquote>
<p>每个对象都有独特的属性变量，对象的状态由这些实例变量的值决定。</p>
</blockquote>
<h2 id="💙标识符" tabindex="-1"><a class="header-anchor" href="#💙标识符" aria-hidden="true">#</a> 💙标识符</h2>
<p>Java的所有组成部分，都需要有名称。如类需要类名，方法需要方法名，变量需要变量名，这些部分需要遵守一下命名规则：</p>
<ol>
<li>不能使用纯数字进行命名。</li>
<li>必须以英文字母或者<code v-pre>$</code>或<code v-pre>_</code>开头。</li>
<li>首字母以后可以使用英文字母或<code v-pre>$</code>、<code v-pre>_</code>和数字的任意组合。</li>
<li>Java中的所有关键字不能作为标识符。</li>
<li>标识符是区分大小写的。</li>
</ol>
<h2 id="💜修饰符" tabindex="-1"><a class="header-anchor" href="#💜修饰符" aria-hidden="true">#</a> 💜修饰符</h2>
<p>Java可以使用修饰符来修饰类中方法和属性。主要有两类修饰符：</p>
<ul>
<li>访问控制修饰符 : <code v-pre>default</code>, <code v-pre>public</code> , <code v-pre>protected</code>, <code v-pre>private</code></li>
<li>非访问控制修饰符 : <code v-pre>final</code>, <code v-pre>abstract</code>, <code v-pre>static</code>, <code v-pre>synchronized</code></li>
</ul>
<h2 id="🤎变量" tabindex="-1"><a class="header-anchor" href="#🤎变量" aria-hidden="true">#</a> 🤎变量</h2>
<p>Java中变量分为三种类型：</p>
<ul>
<li>类属性（静态使用static关键字，通过类或者对象引用都可以调用）</li>
<li>对象属性（非静态，只能通过对象引用来调用）</li>
<li>局部变量</li>
</ul>
<blockquote>
<p>变量的生命周期为：从定义开始到当前范围内的下一个<code v-pre>}</code>结束</p>
</blockquote>
<h2 id="🖤数组" tabindex="-1"><a class="header-anchor" href="#🖤数组" aria-hidden="true">#</a> 🖤数组</h2>
<p>数组是储存在堆上的对象，可以保存多个同类型变量。数组内相邻的两个元素在内存中的地址也是相邻的。</p>
<blockquote>
<p>如：int[] arr = new int[2];即定义一个大小为2的整型数组。</p>
</blockquote>
<h2 id="🤍枚举" tabindex="-1"><a class="header-anchor" href="#🤍枚举" aria-hidden="true">#</a> 🤍枚举</h2>
<p>枚举限制变量只能是预先设定好的值。使用枚举可以减少代码中的 bug。</p>
<blockquote>
<p>如在选择性别时，只能有两个值，这时通常可以使用枚举。</p>
</blockquote>
<h2 id="💔关键字" tabindex="-1"><a class="header-anchor" href="#💔关键字" aria-hidden="true">#</a> 💔关键字</h2>
<p>关键字是Java程序内置的一些有特殊含义的关键字。</p>
<blockquote>
<p>注意：Java 的 null 不是关键字，类似于 true 和 false，它是一个字面常量，不允许作为标识符使用。</p>
</blockquote>
<table>
<thead>
<tr>
<th><strong>关键字</strong></th>
<th><strong>含义</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td>abstract</td>
<td>表明类或者成员方法具有抽象属性</td>
</tr>
<tr>
<td>assert</td>
<td>断言，用来进行程序调试</td>
</tr>
<tr>
<td>boolean</td>
<td>基本数据类型之一，声明布尔类型的关键字</td>
</tr>
<tr>
<td>break</td>
<td>提前跳出一个块</td>
</tr>
<tr>
<td>byte</td>
<td>基本数据类型之一，字节类型</td>
</tr>
<tr>
<td>case</td>
<td>用在switch语句之中，表示其中的一个分支</td>
</tr>
<tr>
<td>catch</td>
<td>用在异常处理中，用来捕捉异常</td>
</tr>
<tr>
<td>char</td>
<td>基本数据类型之一，字符类型</td>
</tr>
<tr>
<td>class</td>
<td>声明一个类</td>
</tr>
<tr>
<td>const</td>
<td>保留关键字，没有具体含义</td>
</tr>
<tr>
<td>continue</td>
<td>回到一个块的开始处</td>
</tr>
<tr>
<td>default</td>
<td>默认，例如，用在switch语句中，表明一个默认的分支。Java8 中也作用于声明接口函数的默认实现</td>
</tr>
<tr>
<td>do</td>
<td>用在do-while循环结构中</td>
</tr>
<tr>
<td>double</td>
<td>基本数据类型之一，双精度浮点数类型</td>
</tr>
<tr>
<td>else</td>
<td>用在条件语句中，表明当条件不成立时的分支</td>
</tr>
<tr>
<td>enum</td>
<td>枚举</td>
</tr>
<tr>
<td>extends</td>
<td>表明一个类型是另一个类型的子类型。对于类，可以是另一个类或者抽象类；对于接口，可以是另一个接口</td>
</tr>
<tr>
<td>final</td>
<td>用来说明最终属性，表明一个类不能派生出子类，或者成员方法不能被覆盖，或者成员域的值不能被改变，用来定义常量</td>
</tr>
<tr>
<td>finally</td>
<td>用于处理异常情况，用来声明一个基本肯定会被执行到的语句块</td>
</tr>
<tr>
<td>float</td>
<td>基本数据类型之一，单精度浮点数类型</td>
</tr>
<tr>
<td>for</td>
<td>一种循环结构的引导词</td>
</tr>
<tr>
<td>goto</td>
<td>保留关键字，没有具体含义</td>
</tr>
<tr>
<td>if</td>
<td>条件语句的引导词</td>
</tr>
<tr>
<td>implements</td>
<td>表明一个类实现了给定的接口</td>
</tr>
<tr>
<td>import</td>
<td>表明要访问指定的类或包</td>
</tr>
<tr>
<td>instanceof</td>
<td>用来测试一个对象是否是指定类型的实例对象</td>
</tr>
<tr>
<td>int</td>
<td>基本数据类型之一，整数类型</td>
</tr>
<tr>
<td>interface</td>
<td>接口</td>
</tr>
<tr>
<td>long</td>
<td>基本数据类型之一，长整数类型</td>
</tr>
<tr>
<td>native</td>
<td>用来声明一个方法是由与计算机相关的语言（如C/C++/FORTRAN语言）实现的</td>
</tr>
<tr>
<td>new</td>
<td>用来创建新实例对象</td>
</tr>
<tr>
<td>package</td>
<td>包</td>
</tr>
<tr>
<td>private</td>
<td>一种访问控制方式：私用模式</td>
</tr>
<tr>
<td>protected</td>
<td>一种访问控制方式：保护模式</td>
</tr>
<tr>
<td>public</td>
<td>一种访问控制方式：共用模式</td>
</tr>
<tr>
<td>return</td>
<td>从成员方法中返回数据</td>
</tr>
<tr>
<td>short</td>
<td>基本数据类型之一,短整数类型</td>
</tr>
<tr>
<td>static</td>
<td>表明具有静态属性</td>
</tr>
<tr>
<td>strictfp</td>
<td>用来声明FP_strict（单精度或双精度浮点数）表达式遵循IEEE 754算术规范</td>
</tr>
<tr>
<td>super</td>
<td>表明当前对象的父类型的引用或者父类型的构造方法</td>
</tr>
<tr>
<td>switch</td>
<td>分支语句结构的引导词</td>
</tr>
<tr>
<td>synchronized</td>
<td>表明一段代码需要同步执行</td>
</tr>
<tr>
<td>this</td>
<td>指向当前实例对象的引用</td>
</tr>
<tr>
<td>throw</td>
<td>抛出一个异常</td>
</tr>
<tr>
<td>throws</td>
<td>声明在当前定义的成员方法中所有需要抛出的异常</td>
</tr>
<tr>
<td>transient</td>
<td>声明不用序列化的成员域</td>
</tr>
<tr>
<td>try</td>
<td>尝试一个可能抛出异常的程序块</td>
</tr>
<tr>
<td>void</td>
<td>声明当前成员方法没有返回值</td>
</tr>
<tr>
<td>volatile</td>
<td>表明两个或者多个变量必须同步地发生变化</td>
</tr>
<tr>
<td>while</td>
<td>用在循环结构中</td>
</tr>
</tbody>
</table>
<h2 id="❤️‍🔥注释" tabindex="-1"><a class="header-anchor" href="#❤️‍🔥注释" aria-hidden="true">#</a> ❤️‍🔥注释</h2>
<p>和其他编程语言一样，Java中也可包含程序注释。在编译阶段，注释会被编译器忽视。</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">HelloWorld</span> <span class="token punctuation">{</span>
   <span class="token comment">/* 这是第一个Java程序
    * 它将输出 Hello World
    * 这是一个多行注释的示例
    */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span><span class="token punctuation">{</span>
       <span class="token comment">// 这是单行注释的示例</span>
       <span class="token comment">/* 这个也是单行注释的示例 */</span>
       <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Hello World"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="💗方法" tabindex="-1"><a class="header-anchor" href="#💗方法" aria-hidden="true">#</a> 💗方法</h2>
<p>编写 Java 程序时，应注意以下几点：</p>
<ol>
<li>大小写敏感：Java 是大小写敏感的，这就意味着标识符 Hello 与 hello 是不同的。</li>
<li>类名：对于所有的类来说，类名的首字母应该大写。如果类名由若干单词组成，那么每个单词的首字母应该大写，例如 MyFirstJavaClass 。</li>
<li>方法名：所有的方法名都应该以小写字母开头。如果方法名含有若干单词，则后面的每个单词首字母大写。</li>
<li>源文件名：源文件名必须和类名相同。当保存文件的时候，你应该使用类名作为文件名保存（切记 Java 是大小写敏感的），文件名的后缀为 .java。（如果文件名和类名不相同则会导致编译错误）。</li>
<li>主方法入口：所有的 Java 程序由 public static void main(String[] args) 方法开始执行。
<img src="@source/../assets/java-base-grammar/2023-04-06-22-06-43.png" alt="main方法" loading="lazy"></li>
</ol>
<h3 id="❣️概念" tabindex="-1"><a class="header-anchor" href="#❣️概念" aria-hidden="true">#</a> ❣️概念</h3>
<p>  在Java程序中，大部分功能的实现是基于方法进行实现的，方法必须经过调用才能执行，一般情况下程序起始的方法名为main。</p>
<ul>
<li>代码实现</li>
</ul>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Main</span><span class="token punctuation">{</span>
	<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span><span class="token punctuation">{</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Hello World!"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="💖组成部分" tabindex="-1"><a class="header-anchor" href="#💖组成部分" aria-hidden="true">#</a> 💖组成部分</h3>
<blockquote>
<p>在Java中，方法是由以下几部分组成而来的。</p>
</blockquote>
<ul>
<li>访问修饰符：<code v-pre>public</code>、<code v-pre>protect</code>、<code v-pre>private</code>、<code v-pre>default</code>(默认也可以省略不写)</li>
<li>关键词</li>
<li>返回值类型</li>
<li>方法名称</li>
<li>参数列表</li>
<li>方法体：即实现方法功能的语句。</li>
</ul>
</div></template>


