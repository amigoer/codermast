<template><div><h1 id="java基础-4-变量类型、修饰符、运算符" tabindex="-1"><a class="header-anchor" href="#java基础-4-变量类型、修饰符、运算符" aria-hidden="true">#</a> Java基础 - 4.变量类型、修饰符、运算符</h1>
<p>  在Java中变量分为三种类型：</p>
<ol>
<li>类变量：独立于方法之外的变量，用 <code v-pre>static</code>关键字修饰。</li>
<li>对象变量：独立于方法之外的变量。</li>
<li>局部变量：存在于类中方法之内的变量。</li>
</ol>
<p>在Java语言中，所有的变量在使用前必须声明。声明变量的基本格式如下：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>type identifier <span class="token operator">=</span> value<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li><code v-pre>type</code>：数据类型</li>
<li><code v-pre>identifier</code>：变量名称</li>
<li><code v-pre>value</code>：变量值</li>
</ul>
<blockquote>
<p>这里需要明确的是，Java中是支持同时定义和初始化多个变量的，前提是变量的数据类型一致，变量类型只需要声明一次，变量之前使用<code v-pre>,</code>逗号隔开。</p>
</blockquote>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>type identifier1 <span class="token operator">=</span> value<span class="token punctuation">,</span> identifier2 <span class="token operator">=</span> value<span class="token punctuation">[</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p>类变量和实例变量又叫做全局变量，指在类中的任意地方尽可以使用。局部变量只能在当前方法内调用。</p>
</blockquote>
<h2 id="_1️⃣类变量" tabindex="-1"><a class="header-anchor" href="#_1️⃣类变量" aria-hidden="true">#</a> 1️⃣类变量</h2>
<ol>
<li>概念：类变量又叫静态变量，存在于类中方法以外的变量，需要使用<code v-pre>static</code>关键字进行声明，但必须在方法之外。无论一个类创建了多少个对象，类只拥有类变量的一份拷贝。即所有创建的对象共享该变量。</li>
<li>创建：在类首次加载时会进行创建，后续不再创建。</li>
<li>生命周期：静态变量在第一次被访问时创建，在程序结束时销毁。</li>
<li>访问方式：静态变量可以通过：<code v-pre>ClassName.VariableName</code>的方式访问。</li>
<li>静态变量除了被声明为常量外很少使用，静态变量是指声明为public/private，final 和 static 类型的变量。使用<code v-pre>final</code>定义的静态变量初始化后不可改变。</li>
<li>存储位置：静态变量储存在静态存储区。经常被声明为常量，很少单独使用 <code v-pre>static</code> 声明变量。</li>
<li>与实例变量具有相似的可见性。但为了对类的使用者可见，大多数静态变量声明为 public 类型。</li>
<li>默认值和实例变量相似。数值型变量默认值是 0，布尔型默认值是 false，引用类型默认值是 null。变量的值可以在声明的时候指定，也可以在构造方法中指定。此外，静态变量还可以在静态语句块中初始化。</li>
<li>类变量被声明为 <code v-pre>public static final</code> 类型时，类变量名称一般使用大写字母。</li>
<li>如果静态变量不是 <code v-pre>public</code> 和 <code v-pre>final</code> 类型，其命名方式与实例变量以及局部变量的命名方式一致。</li>
</ol>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Dog</span><span class="token punctuation">{</span>
	<span class="token keyword">static</span> <span class="token class-name">String</span> name <span class="token operator">=</span> <span class="token string">"xiaohei"</span><span class="token punctuation">;</span>
	<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span><span class="token punctuation">{</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token class-name">Dog</span><span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2️⃣对象变量" tabindex="-1"><a class="header-anchor" href="#_2️⃣对象变量" aria-hidden="true">#</a> 2️⃣对象变量</h2>
<ol>
<li>概念：对象变量又叫实例变量，存在于类中，但在方法、构造方法和代码块以外的变量，不能使用<code v-pre>static</code>关键字进行修饰。</li>
<li>创建：在对象被实例化的时候进行创建，而且每个对象中的属性变量值互不干扰。</li>
<li>生命周期：在对象实例化时创建，在对象的销毁时销毁。</li>
<li>当一个对象被实例化之后，每个实例变量的值就跟着确定；</li>
<li>实例变量的值应该至少被一个方法、构造方法或者语句块引用，使得外部6能够通过这些方式获取实例变量信息；一般情况下将实例变量设置为私有，通过<code v-pre>get</code>和<code v-pre>set</code>方法进行使用和设置。</li>
<li>实例变量可以声明在使用前或者使用后；</li>
<li>访问修饰符可以修饰实例变量；</li>
<li>实例变量对于类中的方法、构造方法或者语句块是可见的。一般情况下应该把实例变量设为私有。通过使用访问修饰符可以使实例变量对子类可见；</li>
<li>实例变量具有默认值。数值型变量的默认值是0，布尔型变量的默认值是false，引用类型变量的默认值是null。变量的值可以在声明时指定，也可以在构造方法中指定；</li>
<li>实例变量可以直接通过变量名访问。但在静态方法以及其他类中，就应该使用完全限定名：<code v-pre>ObejectReference.VariableName</code>。通过对象的引用来访问。</li>
</ol>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Dog</span><span class="token punctuation">{</span>
	<span class="token class-name">String</span> name <span class="token operator">=</span> <span class="token string">"xiaohei"</span><span class="token punctuation">;</span>
	<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span><span class="token punctuation">{</span>
		<span class="token class-name">Dog</span> dog <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Dog</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>dog<span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3️⃣局部变量" tabindex="-1"><a class="header-anchor" href="#_3️⃣局部变量" aria-hidden="true">#</a> 3️⃣局部变量</h2>
<ol>
<li>概念：存在于类中的<mark>方法</mark>、<mark>构造方法</mark>或者<mark>语句块</mark>之中的变量。</li>
<li>创建：在方法、构造方法、或者语句块被执行的时候创建。</li>
<li>生命周期：在方法、构造方法、或者语句块被执行的时候创建，当它们执行完成后，变量将会被销毁；</li>
<li>访问修饰符不能用于局部变量；</li>
<li>局部变量是在栈上分配的，因为其是通过方法和语句块进行调用的。</li>
<li>局部变量没有默认值，所以局部变量被声明后，必须经过初始化，才可以使用。可以先进行定义，不初始化，等到使用的时候再进行初始化。</li>
</ol>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Dog</span><span class="token punctuation">{</span>
	<span class="token keyword">static</span> <span class="token class-name">String</span> name <span class="token operator">=</span> <span class="token string">"xiaohei"</span><span class="token punctuation">;</span>
	<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span><span class="token punctuation">{</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token class-name">Dog</span><span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	
	<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">seaHello</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
		<span class="token class-name">String</span> str <span class="token operator">=</span> <span class="token string">"Hello"</span><span class="token punctuation">;</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="🎈修饰符" tabindex="-1"><a class="header-anchor" href="#🎈修饰符" aria-hidden="true">#</a> 🎈修饰符</h1>
<blockquote>
<p>修饰符用来定义类、方法或者变量，通常放在语句的最前端。
  在Java中修饰符分为两种类型：</p>
</blockquote>
<ol>
<li>访问修饰符</li>
<li>非访问修饰符</li>
</ol>
<h2 id="❤️访问修饰符" tabindex="-1"><a class="header-anchor" href="#❤️访问修饰符" aria-hidden="true">#</a> ❤️访问修饰符</h2>
<ol>
<li>
<p><code v-pre>default</code> (即默认，什么也不写）: 在同一包内可见，不使用任何修饰符。使用对象：类、接口、变量、方法。</p>
</li>
<li>
<p><code v-pre>private</code> : 在同一类内可见。使用对象：变量、方法。 注意：不能修饰类（外部类）</p>
</li>
<li>
<p><code v-pre>public</code> : 对所有类可见。使用对象：类、接口、变量、方法</p>
</li>
<li>
<p><code v-pre>protected</code> : 对同一包内的类和所有子类可见。使用对象：变量、方法。 注意：不能修饰类（外部类）。</p>
</li>
</ol>
<table>
<thead>
<tr>
<th style="text-align:left">修饰符</th>
<th style="text-align:left">当前类</th>
<th style="text-align:left">同一包内</th>
<th style="text-align:left">子孙类(同一包)</th>
<th style="text-align:left">子孙类(不同包)</th>
<th style="text-align:left">其他包</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><code v-pre>public</code></td>
<td style="text-align:left">Y</td>
<td style="text-align:left">Y</td>
<td style="text-align:left">Y</td>
<td style="text-align:left">Y</td>
<td style="text-align:left">Y</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>protected</code></td>
<td style="text-align:left">Y</td>
<td style="text-align:left">Y</td>
<td style="text-align:left">Y</td>
<td style="text-align:left">Y/N</td>
<td style="text-align:left">N</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>default</code></td>
<td style="text-align:left">Y</td>
<td style="text-align:left">Y</td>
<td style="text-align:left">Y</td>
<td style="text-align:left">N</td>
<td style="text-align:left">N</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>private</code></td>
<td style="text-align:left">Y</td>
<td style="text-align:left">N</td>
<td style="text-align:left">N</td>
<td style="text-align:left">N</td>
<td style="text-align:left">N</td>
</tr>
</tbody>
</table>
<h3 id="_1️⃣default-默认" tabindex="-1"><a class="header-anchor" href="#_1️⃣default-默认" aria-hidden="true">#</a> 1️⃣Default(默认)</h3>
<ul>
<li>使用默认访问修饰符声明的变量和方法，对同一个包内的类是可见的。</li>
<li>接口里的变量都隐式声明为 <code v-pre>public static final</code>,而接口里的方法默认情况下访问权限为 <code v-pre>public</code>。</li>
</ul>
<h3 id="_2️⃣private-私有" tabindex="-1"><a class="header-anchor" href="#_2️⃣private-私有" aria-hidden="true">#</a> 2️⃣Private(私有)</h3>
<ul>
<li>
<p>私有访问修饰符是最严格的访问级别，所以被声明为 <code v-pre>private</code> 的方法、变量和构造方法只能被所属类访问，并且类和接口不能声明为 <code v-pre>private</code>。</p>
</li>
<li>
<p>声明为私有访问类型的变量只能通过类中公共的 <code v-pre>get </code>方法被外部类访问，通过set方法被外部类修改。</p>
</li>
<li>
<p>该访问修饰符的使用主要用来隐藏类的实现细节和保护类的数据。</p>
</li>
</ul>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">class</span> <span class="token class-name">Dog</span><span class="token punctuation">{</span>
	<span class="token keyword">private</span> <span class="token class-name">String</span> name <span class="token operator">=</span> <span class="token string">"小黑"</span><span class="token punctuation">;</span>
	
	<span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
		<span class="token keyword">return</span> name<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setName</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span><span class="token punctuation">{</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3️⃣public-公共" tabindex="-1"><a class="header-anchor" href="#_3️⃣public-公共" aria-hidden="true">#</a> 3️⃣Public(公共)</h3>
<ul>
<li>被声明为<code v-pre> public</code> 的类、方法、构造方法和接口能够被任何其他类访问。</li>
<li>如果几个相互访问的 <code v-pre>public</code> 类分布在不同的包中，则需要导入相应 <code v-pre>public </code>类所在的包。</li>
<li>由于类的继承性，类所有的公有方法和变量都能被其子类继承。</li>
</ul>
<h3 id="_4️⃣protected-保护" tabindex="-1"><a class="header-anchor" href="#_4️⃣protected-保护" aria-hidden="true">#</a> 4️⃣Protected(保护)</h3>
<ul>
<li><code v-pre>protected </code>需要从两个点来说明：</li>
</ul>
<ol>
<li>
<p>子类与基类在同一包中：被声明为 <code v-pre>protected </code>的变量、方法和构造器能被同一个包中的任何其他类访问；</p>
</li>
<li>
<p>子类与基类不在同一包中：那么在子类中，子类实例可以访问其从基类继承而来的 <code v-pre>protected </code>方法，而不能访问基类实例的<code v-pre>protected</code>方法。</p>
</li>
</ol>
<ul>
<li><code v-pre>protected</code> 可以修饰数据成员，构造方法，方法成员，不能修饰类（内部类除外）。</li>
<li>接口及接口的成员变量和成员方法不能声明为 <code v-pre>protected</code>。</li>
</ul>
<h3 id="✨访问控制和继承" tabindex="-1"><a class="header-anchor" href="#✨访问控制和继承" aria-hidden="true">#</a> ✨访问控制和继承</h3>
<p>请注意以下方法继承的规则：</p>
<ul>
<li>
<p>父类中声明为 public 的方法在子类中也必须为 public。</p>
</li>
<li>
<p>父类中声明为 protected 的方法在子类中要么声明为 protected，要么声明为 public，不能声明为 private。</p>
</li>
<li>
<p>父类中声明为 private 的方法，不能够被子类继承。</p>
</li>
</ul>
<h2 id="💙非访问修饰符" tabindex="-1"><a class="header-anchor" href="#💙非访问修饰符" aria-hidden="true">#</a> 💙非访问修饰符</h2>
<ul>
<li>
<p>static 修饰符，用来修饰类方法和类变量。</p>
</li>
<li>
<p>final 修饰符，用来修饰类、方法和变量，final 修饰的类不能够被继承，修饰的方法不能被继承类重新定义，修饰的变量为常量，是不可修改的。</p>
</li>
<li>
<p>abstract 修饰符，用来创建抽象类和抽象方法。</p>
</li>
<li>
<p>synchronized 和 volatile 修饰符，主要用于线程的编程。</p>
</li>
</ul>
<h3 id="_1️⃣static" tabindex="-1"><a class="header-anchor" href="#_1️⃣static" aria-hidden="true">#</a> 1️⃣Static</h3>
<ul>
<li>
<p>静态变量：static 关键字用来声明独立于对象的静态变量，无论一个类实例化多少对象，它的静态变量只有一份拷贝。 静态变量也被称为类变量。局部变量不能被声明为 static 变量。</p>
</li>
<li>
<p>静态方法：static 关键字用来声明独立于对象的静态方法。静态方法不能使用类的非静态变量。静态方法从参数列表得到数据，然后计算这些数据。</p>
</li>
</ul>
<p>对类变量和方法的访问可以直接使用 <code v-pre>classname.variablename </code>和 <code v-pre>classname.methodname</code> 的方式访问。</p>
<h3 id="_2️⃣final" tabindex="-1"><a class="header-anchor" href="#_2️⃣final" aria-hidden="true">#</a> 2️⃣Final</h3>
<ol>
<li>final 变量：</li>
</ol>
<ul>
<li>final 表示&quot;最后的、最终的&quot;含义，变量一旦赋值后，不能被重新赋值。被 final 修饰的实例变量必须显式指定初始值。</li>
<li>final 修饰符通常和 static 修饰符一起使用来创建类常量。</li>
</ul>
<ol start="2">
<li>final 方法</li>
</ol>
<ul>
<li>父类中的 final 方法可以被子类继承，但是不能被子类重写。</li>
<li>声明 final 方法的主要目的是防止该方法的内容被修改。</li>
</ul>
<ol start="3">
<li>final 类</li>
</ol>
<ul>
<li>final 类不能被继承，没有类能够继承 final 类的任何特性。</li>
</ul>
<h3 id="_3️⃣abstract" tabindex="-1"><a class="header-anchor" href="#_3️⃣abstract" aria-hidden="true">#</a> 3️⃣Abstract</h3>
<ol>
<li>抽象类</li>
</ol>
<ul>
<li>
<p>抽象类不能用来实例化对象，声明抽象类的唯一目的是为了将来对该类进行扩充。</p>
</li>
<li>
<p>一个类不能同时被 abstract 和 final 修饰。如果一个类包含抽象方法，那么该类一定要声明为抽象类，否则将出现编译错误。</p>
</li>
<li>
<p>抽象类可以包含<mark>抽象方法</mark>和<mark>非抽象方法</mark>。</p>
</li>
</ul>
<ol start="2">
<li>抽象方法</li>
</ol>
<ul>
<li>
<p>抽象方法是一种没有任何实现的方法，该方法的具体实现由子类提供。</p>
</li>
<li>
<p>抽象方法不能被声明成 final 和 static。</p>
</li>
<li>
<p>任何继承抽象类的子类必须实现父类的<mark>所有</mark>抽象方法，除非该子类也是抽象类。</p>
</li>
<li>
<p>如果一个类包含若干个抽象方法，那么该类必须声明为抽象类。抽象类可以不包含抽象方法。但是包含抽象方法的一定是抽象类。</p>
</li>
<li>
<p>抽象方法的声明以分号结尾。不用具体的实现。如：<code v-pre>public abstract sample();</code>。</p>
</li>
</ul>
<h3 id="_4️⃣synchronized" tabindex="-1"><a class="header-anchor" href="#_4️⃣synchronized" aria-hidden="true">#</a> 4️⃣Synchronized</h3>
<ul>
<li>synchronized 关键字声明的方法同一时间只能被一个线程访问。</li>
<li>synchronized 修饰符可以应用于四个访问修饰符。</li>
</ul>
<h3 id="_5️⃣transient" tabindex="-1"><a class="header-anchor" href="#_5️⃣transient" aria-hidden="true">#</a> 5️⃣Transient</h3>
<ul>
<li>
<p>序列化的对象包含被 transient 修饰的实例变量时，java 虚拟机(JVM)跳过该特定的变量。</p>
</li>
<li>
<p>该修饰符包含在定义变量的语句中，用来预处理类和变量的数据类型。</p>
</li>
</ul>
<h3 id="_6️⃣volatile" tabindex="-1"><a class="header-anchor" href="#_6️⃣volatile" aria-hidden="true">#</a> 6️⃣Volatile</h3>
<ul>
<li>
<p>volatile 修饰的成员变量在每次被线程访问时，都强制从共享内存中重新读取该成员变量的值。而且，当成员变量发生变化时，会强制线程将变化值回写到共享内存。这样在任何时刻，两个不同的线程总是看到某个成员变量的同一个值。</p>
</li>
<li>
<p>一个 volatile 对象引用可能是 null。</p>
</li>
</ul>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Dog</span> <span class="token keyword">implements</span> <span class="token class-name">Runnable</span>
<span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">volatile</span> <span class="token keyword">boolean</span> active<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        active <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>active<span class="token punctuation">)</span> <span class="token comment">// 第一行</span>
        <span class="token punctuation">{</span>
            <span class="token comment">// 代码</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">stop</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        active <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span> <span class="token comment">// 第二行</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>  在这段代码中，在一个线程调用<code v-pre>run</code>方法时，再让另外一个线程调用<code v-pre>stop</code>方法。此时如果没有使用<code v-pre>volatile</code>声明变量<code v-pre>active</code>，那么由于一个线程中的<code v-pre>run</code>方法先进行调用，那么会一直循环下去。
  但由于使用了<code v-pre>volatile</code>声明变量，那么此时每次进行循环的时候都会从内存中重新读取<code v-pre>active</code>的值，那么此时循环就会停止。</p>
</blockquote>
<h1 id="🎗️运算符" tabindex="-1"><a class="header-anchor" href="#🎗️运算符" aria-hidden="true">#</a> 🎗️运算符</h1>
<ol>
<li>算术运算符</li>
<li>关系运算符</li>
<li>位运算符</li>
<li>逻辑运算符</li>
<li>赋值运算符</li>
<li>其他运算符</li>
</ol>
<h2 id="_1️⃣算术运算符" tabindex="-1"><a class="header-anchor" href="#_1️⃣算术运算符" aria-hidden="true">#</a> 1️⃣算术运算符</h2>
<p>算术运算符用在数学表达式中，它们的作用和在数学中的作用一样。下表列出了所有的算术运算符。</p>
<blockquote>
<p>这里取A = 10，B = 20</p>
</blockquote>
<table>
<thead>
<tr>
<th style="text-align:left">操作符</th>
<th style="text-align:left">描述</th>
<th style="text-align:left">例子</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">+</td>
<td style="text-align:left">加法 - 相加运算符两侧的值</td>
<td style="text-align:left">A + B 等于 30</td>
</tr>
<tr>
<td style="text-align:left">-</td>
<td style="text-align:left">减法 - 左操作数减去右操作数</td>
<td style="text-align:left">A – B 等于 -10</td>
</tr>
<tr>
<td style="text-align:left">*</td>
<td style="text-align:left">乘法 - 相乘操作符两侧的值</td>
<td style="text-align:left">A * B等于200</td>
</tr>
<tr>
<td style="text-align:left">/</td>
<td style="text-align:left">除法 - 左操作数除以右操作数</td>
<td style="text-align:left">B / A等于2</td>
</tr>
<tr>
<td style="text-align:left">％</td>
<td style="text-align:left">取余 - 左操作数除以右操作数的余数</td>
<td style="text-align:left">B%A等于0</td>
</tr>
<tr>
<td style="text-align:left">++</td>
<td style="text-align:left">自增: 操作数的值增加1</td>
<td style="text-align:left">B++ 或 ++B 等于 21</td>
</tr>
<tr>
<td style="text-align:left">--</td>
<td style="text-align:left">自减: 操作数的值减少1</td>
<td style="text-align:left">B-- 或 --B 等于 19</td>
</tr>
</tbody>
</table>
<blockquote>
<p>这里的运算规则和数学中一致，我们重点需要了解的是自增和自减。</p>
</blockquote>
<p>这里的自增和自减分为两种情况，是增加的先后不同，这里执行完成以后的值虽然都相同，但是实际上本质有所区别。这里使用自增进行进一步解释，自减同理。</p>
<ul>
<li>A++
是有返回值的，返回值为10，A++的具体执行为，先返回A的值，然后再自增。</li>
<li>++A
++A也是有返回值的，返回值为11，++A的具体执行为，先进行自增操作，再返回A的值，即返回11。</li>
</ul>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">int</span> a <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">,</span>b <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 10</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 10</span>
    <span class="token keyword">int</span> i <span class="token operator">=</span> a<span class="token operator">++</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> j <span class="token operator">=</span> <span class="token operator">++</span>b<span class="token punctuation">;</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 11</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 11</span>

    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 10</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>j<span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 11</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://img-blog.csdnimg.cn/384fccf199f749ae8af49457c9f60c09.png" alt="在这里插入图片描述" tabindex="0" loading="lazy"><figcaption>在这里插入图片描述</figcaption></figure>
<blockquote>
<p>这里的执行结果和我们的结论是完全符合的。</p>
</blockquote>
<h2 id="_2️⃣关系运算符" tabindex="-1"><a class="header-anchor" href="#_2️⃣关系运算符" aria-hidden="true">#</a> 2️⃣关系运算符</h2>
<blockquote>
<p>取A == 10 ，B == 20；</p>
</blockquote>
<table>
<thead>
<tr>
<th style="text-align:left">运算符</th>
<th style="text-align:left">描述</th>
<th style="text-align:left">例子</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">==</td>
<td style="text-align:left">检查如果两个操作数的值是否相等，如果相等则条件为真。</td>
<td style="text-align:left">（A == B）为假。</td>
</tr>
<tr>
<td style="text-align:left">!=</td>
<td style="text-align:left">检查如果两个操作数的值是否相等，如果值不相等则条件为真。</td>
<td style="text-align:left">(A != B) 为真。</td>
</tr>
<tr>
<td style="text-align:left">&gt;</td>
<td style="text-align:left">检查左操作数的值是否大于右操作数的值，如果是那么条件为真。</td>
<td style="text-align:left">（A&gt; B）为假。</td>
</tr>
<tr>
<td style="text-align:left">&lt;</td>
<td style="text-align:left">检查左操作数的值是否小于右操作数的值，如果是那么条件为真。</td>
<td style="text-align:left">（A &lt;B）为真。</td>
</tr>
<tr>
<td style="text-align:left">&gt;=</td>
<td style="text-align:left">检查左操作数的值是否大于或等于右操作数的值，如果是那么条件为真。</td>
<td style="text-align:left">（A&gt; = B）为假。</td>
</tr>
<tr>
<td style="text-align:left">&lt;=</td>
<td style="text-align:left">检查左操作数的值是否小于或等于右操作数的值，如果是那么条件为真。</td>
<td style="text-align:left">（A &lt;= B）为真。</td>
</tr>
</tbody>
</table>
<h2 id="_3️⃣位运算符" tabindex="-1"><a class="header-anchor" href="#_3️⃣位运算符" aria-hidden="true">#</a> 3️⃣位运算符</h2>
<p>  Java定义了位运算符，应用于整数类型(int)，长整型(long)，短整型(short)，字符型(char)，和字节型(byte)等类型。位运算符作用在所有的位上，并且按位运算。
  在这里需要注意数据大小的截断和提升，在截断是是去掉高位，提升时符号位不变，其余为用0填充。</p>
<blockquote>
<p>这里假设A = 12 即 0000 1100 ，B = 6 即 0000 0110；</p>
</blockquote>
<table>
<thead>
<tr>
<th style="text-align:left">操作符</th>
<th style="text-align:left">描述</th>
<th style="text-align:left">例子</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">＆</td>
<td style="text-align:left">如果相对应位都是1，则结果为1，否则为0</td>
<td style="text-align:left">（A＆B），得到 4，即0000 0100</td>
</tr>
<tr>
<td style="text-align:left">|</td>
<td style="text-align:left">如果相对应位都是 0，则结果为 0，否则为 1</td>
<td style="text-align:left">（A | B）得到14，即 0000 1110</td>
</tr>
<tr>
<td style="text-align:left">^</td>
<td style="text-align:left">如果相对应位值相同，则结果为0，否则为1</td>
<td style="text-align:left">（A ^ B）得到10，即 0000 1010</td>
</tr>
<tr>
<td style="text-align:left">〜</td>
<td style="text-align:left">按位取反运算符翻转操作数的每一位，即0变成1，1变成0。</td>
<td style="text-align:left">（〜A）得到-12，即1111 0011</td>
</tr>
<tr>
<td style="text-align:left">&lt;&lt;</td>
<td style="text-align:left">按位左移运算符。左操作数按位左移右操作数指定的位数。</td>
<td style="text-align:left">A &lt;&lt; 2得到48，即 0011 0000</td>
</tr>
<tr>
<td style="text-align:left">&gt;&gt;</td>
<td style="text-align:left">按位右移运算符。左操作数按位右移右操作数指定的位数。</td>
<td style="text-align:left">A &gt;&gt; 2得到3即 0000 0011</td>
</tr>
<tr>
<td style="text-align:left">&gt;&gt;&gt;</td>
<td style="text-align:left">按位右移补零操作符。左操作数的值按右操作数指定的位数右移，移动得到的空位以零填充。</td>
<td style="text-align:left">A&gt;&gt;&gt;2得到 6 即0000 0110</td>
</tr>
</tbody>
</table>
<h2 id="_4️⃣逻辑运算符" tabindex="-1"><a class="header-anchor" href="#_4️⃣逻辑运算符" aria-hidden="true">#</a> 4️⃣逻辑运算符</h2>
<blockquote>
<p>假设布尔变量A为真，变量B为假</p>
</blockquote>
<table>
<thead>
<tr>
<th style="text-align:left">操作符</th>
<th style="text-align:left">描述</th>
<th style="text-align:left">例子</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">&amp;&amp;</td>
<td style="text-align:left">称为逻辑与运算符。当且仅当两个操作数都为真，条件才为真。</td>
<td style="text-align:left">（A &amp;&amp; B）为假。</td>
</tr>
<tr>
<td style="text-align:left">| |</td>
<td style="text-align:left">称为逻辑或操作符。如果任何两个操作数任何一个为真，条件为真。</td>
<td style="text-align:left">（A | | B）为真。</td>
</tr>
<tr>
<td style="text-align:left">！</td>
<td style="text-align:left">称为逻辑非运算符。用来反转操作数的逻辑状态。如果条件为true，则逻辑非运算符将得到false。</td>
<td style="text-align:left">！（A &amp;&amp; B）为真。</td>
</tr>
</tbody>
</table>
<p>  在这里会出现一种短路的情况：</p>
<ul>
<li>逻辑与：当前面的一个表达式为false，这个时候已经能够确定返回值，那么就不会执行第二个表达式。</li>
<li>逻辑或：当前面的一个表达式为true，这个时候已经能够确定返回值，那么就不会执行第二个表达式。</li>
</ul>
<h2 id="_5️⃣赋值运算符" tabindex="-1"><a class="header-anchor" href="#_5️⃣赋值运算符" aria-hidden="true">#</a> 5️⃣赋值运算符</h2>
<table>
<thead>
<tr>
<th style="text-align:left">操作符</th>
<th style="text-align:left">描述</th>
<th style="text-align:left">例子</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">=</td>
<td style="text-align:left">简单的赋值运算符，将右操作数的值赋给左侧操作数</td>
<td style="text-align:left">C = A + B将把A + B得到的值赋给C</td>
</tr>
<tr>
<td style="text-align:left">+ =</td>
<td style="text-align:left">加和赋值操作符，它把左操作数和右操作数相加赋值给左操作数</td>
<td style="text-align:left">C + = A等价于C = C + A</td>
</tr>
<tr>
<td style="text-align:left">- =</td>
<td style="text-align:left">减和赋值操作符，它把左操作数和右操作数相减赋值给左操作数</td>
<td style="text-align:left">C - = A等价于C = C - A</td>
</tr>
<tr>
<td style="text-align:left">* =</td>
<td style="text-align:left">乘和赋值操作符，它把左操作数和右操作数相乘赋值给左操作数</td>
<td style="text-align:left">C * = A等价于C = C * A</td>
</tr>
<tr>
<td style="text-align:left">/ =</td>
<td style="text-align:left">除和赋值操作符，它把左操作数和右操作数相除赋值给左操作数</td>
<td style="text-align:left">C / = A，C 与 A 同类型时等价于 C = C / A</td>
</tr>
<tr>
<td style="text-align:left">（％）=</td>
<td style="text-align:left">取模和赋值操作符，它把左操作数和右操作数取模后赋值给左操作数</td>
<td style="text-align:left">C％= A等价于C = C％A</td>
</tr>
<tr>
<td style="text-align:left">&lt;&lt; =</td>
<td style="text-align:left">左移位赋值运算符</td>
<td style="text-align:left">C &lt;&lt; = 2等价于C = C &lt;&lt; 2</td>
</tr>
<tr>
<td style="text-align:left">&gt;&gt; =</td>
<td style="text-align:left">右移位赋值运算符</td>
<td style="text-align:left">C &gt;&gt; = 2等价于C = C &gt;&gt; 2</td>
</tr>
<tr>
<td style="text-align:left">＆=</td>
<td style="text-align:left">按位与赋值运算符</td>
<td style="text-align:left">C＆= 2等价于C = C＆2</td>
</tr>
<tr>
<td style="text-align:left">^ =</td>
<td style="text-align:left">按位异或赋值操作符</td>
<td style="text-align:left">C ^ = 2等价于C = C ^ 2</td>
</tr>
<tr>
<td style="text-align:left">| =</td>
<td style="text-align:left">按位或赋值操作符</td>
<td style="text-align:left">C | = 2等价于C = C | 2</td>
</tr>
</tbody>
</table>
<h2 id="_6️⃣条件运算符" tabindex="-1"><a class="header-anchor" href="#_6️⃣条件运算符" aria-hidden="true">#</a> 6️⃣条件运算符（?:）</h2>
<p>  条件运算符也被称为三元运算符。该运算符有3个操作数，并且需要判断布尔表达式的值。该运算符的主要是决定哪个值应该赋值给变量。</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code>variable x <span class="token operator">=</span> <span class="token punctuation">(</span>expression<span class="token punctuation">)</span> <span class="token operator">?</span> value1 <span class="token operator">:</span> value2<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>  如果<code v-pre>expression</code>为真，则返回<code v-pre>value1</code>否则返回<code v-pre>value2</code>;</p>
<h2 id="_7️⃣instanceof-运算符" tabindex="-1"><a class="header-anchor" href="#_7️⃣instanceof-运算符" aria-hidden="true">#</a> 7️⃣instanceof 运算符</h2>
<p>  该运算符用于操作对象实例，检查该对象是否是一个特定类型（类类型或接口类型）。</p>
<p>instanceof运算符使用格式如下：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token punctuation">(</span> <span class="token class-name">Object</span> reference variable <span class="token punctuation">)</span> <span class="token keyword">instanceof</span>  <span class="token punctuation">(</span><span class="token keyword">class</span><span class="token operator">/</span><span class="token keyword">interface</span> type<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>  如果运算符左侧变量所指的对象，是操作符右侧类或接口(class/interface)的一个对象，那么结果为真。</p>
<blockquote>
<p>即判断一个对象是不是这个类，通常使用在对象的强制类型转换时。</p>
</blockquote>
<h2 id="_8️⃣运算符的优先级" tabindex="-1"><a class="header-anchor" href="#_8️⃣运算符的优先级" aria-hidden="true">#</a> 8️⃣运算符的优先级</h2>
<p>  当多个运算符出现在一个表达式中，谁先谁后呢？这就涉及到运算符的优先级别的问题。在一个多运算符的表达式中，运算符优先级不同会导致最后得出的结果差别甚大。</p>
<table>
<thead>
<tr>
<th style="text-align:left">类别</th>
<th style="text-align:left">操作符</th>
<th style="text-align:left">关联性</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">后缀</td>
<td style="text-align:left">() [] . (点操作符)</td>
<td style="text-align:left">左到右</td>
</tr>
<tr>
<td style="text-align:left">一元</td>
<td style="text-align:left">expr++ expr--</td>
<td style="text-align:left">从左到右</td>
</tr>
<tr>
<td style="text-align:left">一元</td>
<td style="text-align:left">++expr --expr + - ～ ！</td>
<td style="text-align:left">从右到左</td>
</tr>
<tr>
<td style="text-align:left">乘性</td>
<td style="text-align:left">* /％</td>
<td style="text-align:left">左到右</td>
</tr>
<tr>
<td style="text-align:left">加性</td>
<td style="text-align:left">+ -</td>
<td style="text-align:left">左到右</td>
</tr>
<tr>
<td style="text-align:left">移位</td>
<td style="text-align:left">&gt;&gt; &gt;&gt;&gt;  &lt;&lt;</td>
<td style="text-align:left">左到右</td>
</tr>
<tr>
<td style="text-align:left">关系</td>
<td style="text-align:left">&gt; &gt;= &lt; &lt;=</td>
<td style="text-align:left">左到右</td>
</tr>
<tr>
<td style="text-align:left">相等</td>
<td style="text-align:left">== !=</td>
<td style="text-align:left">左到右</td>
</tr>
<tr>
<td style="text-align:left">按位与</td>
<td style="text-align:left">＆</td>
<td style="text-align:left">左到右</td>
</tr>
<tr>
<td style="text-align:left">按位异或</td>
<td style="text-align:left">^</td>
<td style="text-align:left">左到右</td>
</tr>
<tr>
<td style="text-align:left">按位或</td>
<td style="text-align:left">|</td>
<td style="text-align:left">左到右</td>
</tr>
<tr>
<td style="text-align:left">逻辑与</td>
<td style="text-align:left">&amp;&amp;</td>
<td style="text-align:left">左到右</td>
</tr>
<tr>
<td style="text-align:left">逻辑或</td>
<td style="text-align:left">| |</td>
<td style="text-align:left">左到右</td>
</tr>
<tr>
<td style="text-align:left">条件</td>
<td style="text-align:left">？：</td>
<td style="text-align:left">从右到左</td>
</tr>
<tr>
<td style="text-align:left">赋值</td>
<td style="text-align:left">= + = - = * = / =％= &gt;&gt; = &lt;&lt; =＆= ^ = | =</td>
<td style="text-align:left">从右到左</td>
</tr>
<tr>
<td style="text-align:left">逗号</td>
<td style="text-align:left">，</td>
<td style="text-align:left">左到右</td>
</tr>
</tbody>
</table>
</div></template>


