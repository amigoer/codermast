<template><div><h1 id="redis实战-短信登录" tabindex="-1"><a class="header-anchor" href="#redis实战-短信登录" aria-hidden="true">#</a> Redis实战 - 短信登录</h1>
<h2 id="api" tabindex="-1"><a class="header-anchor" href="#api" aria-hidden="true">#</a> API</h2>
<p>在实现之间我们需要先通过阅读源代码或者查看文档方式，了解这个功能所需要实现的 API 接口。</p>
<p>前端访问的 URL 地址：<code v-pre>/login.html</code></p>
<p>具体调用的是<code v-pre>com/hmdp/controller/UserController.java</code>控制器类中的方法，我们实现即可。</p>
<h2 id="基于-session-实现" tabindex="-1"><a class="header-anchor" href="#基于-session-实现" aria-hidden="true">#</a> 基于 Session 实现</h2>
<p>基于 Session 的实现我们主要是实现这三个部分：</p>
<ul>
<li>发送短信验证码</li>
</ul>
<div class="hint-container tip">
<p class="hint-container-title">接口信息</p>
<table>
<thead>
<tr>
<th style="text-align:center">请求方式</th>
<th style="text-align:center"><code v-pre>POST</code></th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">请求路径</td>
<td style="text-align:center"><code v-pre>/user/code</code></td>
</tr>
<tr>
<td style="text-align:center">请求参数</td>
<td style="text-align:center"><code v-pre>phone</code>手机号</td>
</tr>
<tr>
<td style="text-align:center">返回值</td>
<td style="text-align:center"><code v-pre>null</code></td>
</tr>
<tr>
<td style="text-align:center">方法名</td>
<td style="text-align:center"><code v-pre>sendCode</code></td>
</tr>
</tbody>
</table>
</div>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 发送手机验证码
 */</span>
<span class="token keyword">public</span> <span class="token class-name">Result</span> <span class="token function">senCode</span><span class="token punctuation">(</span><span class="token class-name">String</span> phone<span class="token punctuation">,</span> <span class="token class-name">HttpSession</span> session<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 1. 校验手机号是否符合</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">RegexUtils</span><span class="token punctuation">.</span><span class="token function">isPhoneInvalid</span><span class="token punctuation">(</span>phone<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">// 2. 如果不符合，则返回失败</span>
        <span class="token keyword">return</span> <span class="token class-name">Result</span><span class="token punctuation">.</span><span class="token function">fail</span><span class="token punctuation">(</span><span class="token string">"手机号格式错误！"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 3. 手机号格式正确</span>
    <span class="token comment">// 4. 生成验证码</span>
    <span class="token class-name">String</span> code <span class="token operator">=</span> <span class="token class-name">RandomUtil</span><span class="token punctuation">.</span><span class="token function">randomNumbers</span><span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 5. 发送验证码</span>
    log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"手机验证码为："</span> <span class="token operator">+</span> code<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 6. 返回信息</span>
    <span class="token keyword">return</span> <span class="token class-name">Result</span><span class="token punctuation">.</span><span class="token function">ok</span><span class="token punctuation">(</span><span class="token string">"发送成功"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>短信验证码注册、登录</li>
</ul>
<div class="hint-container tip">
<p class="hint-container-title">接口信息</p>
<table>
<thead>
<tr>
<th style="text-align:center">请求方式</th>
<th style="text-align:center"><code v-pre>POST</code></th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">请求路径</td>
<td style="text-align:center"><code v-pre>/user/login</code></td>
</tr>
<tr>
<td style="text-align:center">请求参数</td>
<td style="text-align:center">1. <code v-pre>phone</code> 手机号<br />2. <code v-pre>code</code> 验证码</td>
</tr>
<tr>
<td style="text-align:center">返回值</td>
<td style="text-align:center"><code v-pre>null</code></td>
</tr>
<tr>
<td style="text-align:center">方法名</td>
<td style="text-align:center"><code v-pre>login</code></td>
</tr>
</tbody>
</table>
</div>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token doc-comment comment">/**
 * 登录功能
 * <span class="token keyword">@param</span> <span class="token parameter">loginForm</span> 登录参数，包含手机号、验证码；或者手机号、密码
 */</span>
<span class="token annotation punctuation">@PostMapping</span><span class="token punctuation">(</span><span class="token string">"/login"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token class-name">Result</span> <span class="token function">login</span><span class="token punctuation">(</span><span class="token annotation punctuation">@RequestBody</span> <span class="token class-name">LoginFormDTO</span> loginForm<span class="token punctuation">,</span> <span class="token class-name">HttpSession</span> session<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">// TODO 实现登录功能</span>
    <span class="token keyword">return</span> <span class="token class-name">Result</span><span class="token punctuation">.</span><span class="token function">fail</span><span class="token punctuation">(</span><span class="token string">"功能未完成"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>校验登录状态</li>
</ul>
<figure><img src="@source/../assets/message-login/2023-05-20-15-54-56.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h2 id="基于-redis-实现" tabindex="-1"><a class="header-anchor" href="#基于-redis-实现" aria-hidden="true">#</a> 基于 Redis 实现</h2>
</div></template>


