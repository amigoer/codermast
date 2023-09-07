<template><div><h1 id="java-基础语法" tabindex="-1"><a class="header-anchor" href="#java-基础语法" aria-hidden="true">#</a> Java 基础语法</h1>
<p>一个Java程序可以认为是一系列对象的集合，而这些对象通过调用彼此的方法来协同工作。下面简要介绍下类、对象、方法和实例变量的概念。</p>
<ul>
<li>
<p>对象：对象是类的一个实例，有状态和行为。例如，一条狗是一个对象，它的状态有：颜色、名字、品种；行为有：摇尾巴、叫、吃等。</p>
</li>
<li>
<p>类：类是一个模板，它描述一类对象的行为和状态。</p>
</li>
<li>
<p>方法：方法就是行为，一个类可以有很多方法。逻辑运算、数据修改以及所有动作都是在方法中完成的。</p>
</li>
<li>
<p>实例变量：每个对象都有独特的实例变量，对象的状态由这些实例变量的值决定。</p>
</li>
</ul>
<h2 id="快速入门" tabindex="-1"><a class="header-anchor" href="#快速入门" aria-hidden="true">#</a> 快速入门</h2>
<p>下面是一个最简单的 Java 程序，它的功能是输出 <code v-pre>Hello World</code> 这个字符串。</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">HelloWorld</span><span class="token punctuation">{</span>
    <span class="token comment">// 输出 Hello World 字符串</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Hello World"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="代码运行" tabindex="-1"><a class="header-anchor" href="#代码运行" aria-hidden="true">#</a> 代码运行</h2>
<p>对于我们写好的 Java 程序，我们需要对其进行保存、编译和运行，运行完成后我们才能看到运行的结果。</p>
<p>下面将逐步介绍如何保存、编译以及运行这个程序：</p>
<ol>
<li>打开代码编辑器，把上面的代码添加进去；</li>
<li>把文件名保存为：HelloWorld.java；</li>
<li>打开 cmd 命令窗口，进入目标文件所在的位置；</li>
<li>在命令行窗口输入 <code v-pre>javac HelloWorld.java</code> 按下回车键编译代码。如果代码没有错误，cmd 命令提示符会进入下一行（假设环境变量都设置好了）。</li>
<li>再键输入 <code v-pre>java HelloWorld</code> 按下回车键就可以运行程序了</li>
<li>你将会在窗口看到 <code v-pre>Hello World</code></li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># javac 编译</span>
$ javac HelloWorld.java

<span class="token comment"># java 运行</span>
$ <span class="token function">java</span> HelloWorld 

Hello World
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="基本语法" tabindex="-1"><a class="header-anchor" href="#基本语法" aria-hidden="true">#</a> 基本语法</h2>
<p>编写 Java 程序时，应注意以下几点：</p>
<ul>
<li>大小写敏感：Java 是大小写敏感的，这就意味着标识符 Hello 与 hello 是不同的。</li>
<li>类名：对于所有的类来说，类名的首字母应该大写。如果类名由若干单词组成，那么每个单词的首字母应该大写，例如 MyFirstJavaClass 。</li>
<li>方法名：所有的方法名都应该以小写字母开头。如果方法名含有若干单词，则后面的每个单词首字母大写。</li>
<li>源文件名：源文件名必须和类名相同。当保存文件的时候，你应该使用类名作为文件名保存（切记 Java 是大小写敏感的），文件名的后缀为 .java。（如果文件名和类名不相同则会导致编译错误）。</li>
<li>主方法入口：所有的 Java 程序由 <code v-pre>public static void main(String[] args)</code> 方法开始执行。</li>
</ul>
<figure><img src="@source/../assets/java-basic-syntax/2023-08-31-19-38-41.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h2 id="标识符" tabindex="-1"><a class="header-anchor" href="#标识符" aria-hidden="true">#</a> 标识符</h2>
<p>Java 所有的组成部分都需要名字。类名、变量名以及方法名都被称为标识符。</p>
<p>关于 Java 标识符，有以下几点需要注意：</p>
<ul>
<li>所有的标识符都应该以字母（A-Z 或者 a-z）,美元符（$）、或者下划线（_）开始</li>
<li>首字符之后可以是字母（A-Z 或者 a-z）,美元符（$）、下划线（_）或数字的任何字符组合</li>
<li>关键字不能用作标识符</li>
<li>标识符是大小写敏感的</li>
<li>合法标识符举例：age、$salary、_value、__1_value</li>
<li>非法标识符举例：123abc、-salary</li>
</ul>
<h2 id="修饰符" tabindex="-1"><a class="header-anchor" href="#修饰符" aria-hidden="true">#</a> 修饰符</h2>
<p>像其他语言一样，Java可以使用修饰符来修饰类中方法和属性。主要有两类修饰符：</p>
<ul>
<li>访问控制修饰符 : default, public , protected, private</li>
<li>非访问控制修饰符 : final, abstract, static, synchronized<br>
在后面的章节中我们会深入讨论 Java 修饰符。</li>
</ul>
<p>Java 变量<br>
Java 中主要有如下几种类型的变量<br>
局部变量<br>
类变量（静态变量）<br>
成员变量（非静态变量）<br>
Java 数组<br>
数组是储存在堆上的对象，可以保存多个同类型变量。在后面的章节中，我们将会学到如何声明、构造以及初始化一个数组。</p>
<p>Java 枚举<br>
Java 5.0引入了枚举，枚举限制变量只能是预先设定好的值。使用枚举可以减少代码中的 bug。</p>
<p>例如，我们为果汁店设计一个程序，它将限制果汁为小杯、中杯、大杯。这就意味着它不允许顾客点除了这三种尺寸外的果汁。</p>
<p>实例<br>
class FreshJuice {<br>
enum FreshJuiceSize{ SMALL, MEDIUM , LARGE }<br>
FreshJuiceSize size;<br>
}</p>
<p>public class FreshJuiceTest {<br>
public static void main(String[] args){<br>
FreshJuice juice = new FreshJuice();<br>
juice.size = FreshJuice.FreshJuiceSize.MEDIUM  ;<br>
}<br>
}<br>
注意：枚举可以单独声明或者声明在类里面。方法、变量、构造函数也可以在枚举中定义。</p>
<p>Java 关键字<br>
下面列出了 Java 关键字。这些保留字不能用于常量、变量、和任何标识符的名称。</p>
<p>类别	关键字	说明<br>
访问控制	private	私有的<br>
protected	受保护的<br>
public	公共的<br>
default	默认<br>
类、方法和变量修饰符	abstract	声明抽象<br>
class	类<br>
extends	扩充、继承<br>
final	最终值、不可改变的<br>
implements	实现（接口）<br>
interface	接口<br>
native	本地、原生方法（非 Java 实现）<br>
new	创建<br>
static	静态<br>
strictfp	严格浮点、精准浮点<br>
synchronized	线程、同步<br>
transient	短暂<br>
volatile	易失<br>
程序控制语句	break	跳出循环<br>
case	定义一个值以供 switch 选择<br>
continue	继续<br>
do	运行<br>
else	否则<br>
for	循环<br>
if	如果<br>
instanceof	实例<br>
return	返回<br>
switch	根据值选择执行<br>
while	循环<br>
错误处理	assert	断言表达式是否为真<br>
catch	捕捉异常<br>
finally	有没有异常都执行<br>
throw	抛出一个异常对象<br>
throws	声明一个异常可能被抛出<br>
try	捕获异常<br>
包相关	import	引入<br>
package	包<br>
基本类型	boolean	布尔型<br>
byte	字节型<br>
char	字符型<br>
double	双精度浮点<br>
float	单精度浮点<br>
int	整型<br>
long	长整型<br>
short	短整型<br>
变量引用	super	父类、超类<br>
this	本类<br>
void	无返回值<br>
保留关键字	goto	是关键字，但不能使用<br>
const	是关键字，但不能使用<br>
注意：Java 的 null 不是关键字，类似于 true 和 false，它是一个字面常量，不允许作为标识符使用。</p>
<p>Java注释<br>
类似于 C/C++、Java 也支持单行以及多行注释。注释中的字符将被 Java 编译器忽略。</p>
<p>public class HelloWorld {<br>
/* 这是第一个Java程序<br>
* 它将输出 Hello World<br>
* 这是一个多行注释的示例<br>
<em>/<br>
public static void main(String[] args){<br>
// 这是单行注释的示例<br>
/</em> 这个也是单行注释的示例 */<br>
System.out.println(&quot;Hello World&quot;);<br>
}<br>
}<br>
Java 空行<br>
空白行或者有注释的行，Java 编译器都会忽略掉。</p>
<p>继承<br>
在 Java 中，一个类可以由其他类派生。如果你要创建一个类，而且已经存在一个类具有你所需要的属性或方法，那么你可以将新创建的类继承该类。</p>
<p>利用继承的方法，可以重用已存在类的方法和属性，而不用重写这些代码。被继承的类称为超类（super class），派生类称为子类（sub class）。</p>
<p>接口<br>
在 Java 中，接口可理解为对象间相互通信的协议。接口在继承中扮演着很重要的角色。</p>
<p>接口只定义派生要用到的方法，但是方法的具体实现完全取决于派生类。</p>
</div></template>


