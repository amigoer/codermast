<template><div><h1 id="spring-面向切面aop" tabindex="-1"><a class="header-anchor" href="#spring-面向切面aop" aria-hidden="true">#</a> Spring - 面向切面AOP</h1>
<h2 id="场景模拟" tabindex="-1"><a class="header-anchor" href="#场景模拟" aria-hidden="true">#</a> 场景模拟</h2>
<p>还是老规矩，为了避免和之前的项目冲突，我们这里创建一个新的子模块 <code v-pre>spring6-aop</code></p>
<ul>
<li>声明计算器接口 Calculator</li>
</ul>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">Calculator</span> <span class="token punctuation">{</span>
    
    <span class="token keyword">int</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">int</span> i<span class="token punctuation">,</span> <span class="token keyword">int</span> j<span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    <span class="token keyword">int</span> <span class="token function">sub</span><span class="token punctuation">(</span><span class="token keyword">int</span> i<span class="token punctuation">,</span> <span class="token keyword">int</span> j<span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    <span class="token keyword">int</span> <span class="token function">mul</span><span class="token punctuation">(</span><span class="token keyword">int</span> i<span class="token punctuation">,</span> <span class="token keyword">int</span> j<span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    <span class="token keyword">int</span> <span class="token function">div</span><span class="token punctuation">(</span><span class="token keyword">int</span> i<span class="token punctuation">,</span> <span class="token keyword">int</span> j<span class="token punctuation">)</span><span class="token punctuation">;</span>
    
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>创建一般实现类</li>
</ul>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CalculatorImpl</span> <span class="token keyword">implements</span> <span class="token class-name">Calculator</span> <span class="token punctuation">{</span>
    
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">int</span> i<span class="token punctuation">,</span> <span class="token keyword">int</span> j<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    
        <span class="token keyword">int</span> result <span class="token operator">=</span> i <span class="token operator">+</span> j<span class="token punctuation">;</span>
    
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"方法内部 result = "</span> <span class="token operator">+</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
    
        <span class="token keyword">return</span> result<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">sub</span><span class="token punctuation">(</span><span class="token keyword">int</span> i<span class="token punctuation">,</span> <span class="token keyword">int</span> j<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    
        <span class="token keyword">int</span> result <span class="token operator">=</span> i <span class="token operator">-</span> j<span class="token punctuation">;</span>
    
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"方法内部 result = "</span> <span class="token operator">+</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
    
        <span class="token keyword">return</span> result<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">mul</span><span class="token punctuation">(</span><span class="token keyword">int</span> i<span class="token punctuation">,</span> <span class="token keyword">int</span> j<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    
        <span class="token keyword">int</span> result <span class="token operator">=</span> i <span class="token operator">*</span> j<span class="token punctuation">;</span>
    
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"方法内部 result = "</span> <span class="token operator">+</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
    
        <span class="token keyword">return</span> result<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">div</span><span class="token punctuation">(</span><span class="token keyword">int</span> i<span class="token punctuation">,</span> <span class="token keyword">int</span> j<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    
        <span class="token keyword">int</span> result <span class="token operator">=</span> i <span class="token operator">/</span> j<span class="token punctuation">;</span>
    
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"方法内部 result = "</span> <span class="token operator">+</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
    
        <span class="token keyword">return</span> result<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>创建带日志功能的实现类</li>
</ul>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CalculatorLogImpl</span> <span class="token keyword">implements</span> <span class="token class-name">Calculator</span> <span class="token punctuation">{</span>
    
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">int</span> i<span class="token punctuation">,</span> <span class="token keyword">int</span> j<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"[日志] add 方法开始了，参数是："</span> <span class="token operator">+</span> i <span class="token operator">+</span> <span class="token string">","</span> <span class="token operator">+</span> j<span class="token punctuation">)</span><span class="token punctuation">;</span>
    
        <span class="token keyword">int</span> result <span class="token operator">=</span> i <span class="token operator">+</span> j<span class="token punctuation">;</span>
    
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"方法内部 result = "</span> <span class="token operator">+</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
    
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"[日志] add 方法结束了，结果是："</span> <span class="token operator">+</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
    
        <span class="token keyword">return</span> result<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">sub</span><span class="token punctuation">(</span><span class="token keyword">int</span> i<span class="token punctuation">,</span> <span class="token keyword">int</span> j<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"[日志] sub 方法开始了，参数是："</span> <span class="token operator">+</span> i <span class="token operator">+</span> <span class="token string">","</span> <span class="token operator">+</span> j<span class="token punctuation">)</span><span class="token punctuation">;</span>
    
        <span class="token keyword">int</span> result <span class="token operator">=</span> i <span class="token operator">-</span> j<span class="token punctuation">;</span>
    
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"方法内部 result = "</span> <span class="token operator">+</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
    
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"[日志] sub 方法结束了，结果是："</span> <span class="token operator">+</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
    
        <span class="token keyword">return</span> result<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">mul</span><span class="token punctuation">(</span><span class="token keyword">int</span> i<span class="token punctuation">,</span> <span class="token keyword">int</span> j<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"[日志] mul 方法开始了，参数是："</span> <span class="token operator">+</span> i <span class="token operator">+</span> <span class="token string">","</span> <span class="token operator">+</span> j<span class="token punctuation">)</span><span class="token punctuation">;</span>
    
        <span class="token keyword">int</span> result <span class="token operator">=</span> i <span class="token operator">*</span> j<span class="token punctuation">;</span>
    
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"方法内部 result = "</span> <span class="token operator">+</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
    
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"[日志] mul 方法结束了，结果是："</span> <span class="token operator">+</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
    
        <span class="token keyword">return</span> result<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">div</span><span class="token punctuation">(</span><span class="token keyword">int</span> i<span class="token punctuation">,</span> <span class="token keyword">int</span> j<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"[日志] div 方法开始了，参数是："</span> <span class="token operator">+</span> i <span class="token operator">+</span> <span class="token string">","</span> <span class="token operator">+</span> j<span class="token punctuation">)</span><span class="token punctuation">;</span>
    
        <span class="token keyword">int</span> result <span class="token operator">=</span> i <span class="token operator">/</span> j<span class="token punctuation">;</span>
    
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"方法内部 result = "</span> <span class="token operator">+</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
    
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"[日志] div 方法结束了，结果是："</span> <span class="token operator">+</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
    
        <span class="token keyword">return</span> result<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container warning">
<p class="hint-container-title">提出问题</p>
<p><strong>①现有代码缺陷</strong></p>
<p>针对带日志功能的实现类，我们发现有如下缺陷：</p>
<ul>
<li>对核心业务功能有干扰，导致程序员在开发核心业务功能时分散了精力</li>
<li>附加功能分散在各个业务功能方法中，不利于统一维护</li>
</ul>
<p><strong>②解决思路</strong></p>
<p>解决这两个问题，核心就是：解耦。我们需要把附加功能从业务功能代码中抽取出来。</p>
<p><strong>③困难</strong></p>
<p>解决问题的困难：要抽取的代码在方法内部，靠以前把子类中的重复代码抽取到父类的方式没法解决。所以需要引入新的技术。</p>
</div>
</div></template>


