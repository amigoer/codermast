<template><div><h1 id="redis实战-短信登录" tabindex="-1"><a class="header-anchor" href="#redis实战-短信登录" aria-hidden="true">#</a> Redis实战 - 短信登录</h1>
<h2 id="api" tabindex="-1"><a class="header-anchor" href="#api" aria-hidden="true">#</a> API</h2>
<p>在实现之间我们需要先通过阅读源代码或者查看文档方式，了解这个功能所需要实现的 API 接口。</p>
<p>前端访问的 URL 地址：<code v-pre>/login.html</code></p>
<p>具体调用的是<code v-pre>com/hmdp/controller/UserController.java</code>控制器类中的方法，我们实现即可。</p>
<h3 id="发送短信验证码" tabindex="-1"><a class="header-anchor" href="#发送短信验证码" aria-hidden="true">#</a> 发送短信验证码</h3>
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
<h3 id="短信验证码注册、登录" tabindex="-1"><a class="header-anchor" href="#短信验证码注册、登录" aria-hidden="true">#</a> 短信验证码注册、登录</h3>
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
<h3 id="校验登录状态" tabindex="-1"><a class="header-anchor" href="#校验登录状态" aria-hidden="true">#</a> 校验登录状态</h3>
<table>
<thead>
<tr>
<th style="text-align:center">请求方式</th>
<th style="text-align:center"><code v-pre>GET</code></th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">请求路径</td>
<td style="text-align:center"><code v-pre>/user/me</code></td>
</tr>
<tr>
<td style="text-align:center">请求参数</td>
<td style="text-align:center"><code v-pre>null</code></td>
</tr>
<tr>
<td style="text-align:center">返回值</td>
<td style="text-align:center">用户对象信息</td>
</tr>
<tr>
<td style="text-align:center">方法名</td>
<td style="text-align:center"><code v-pre>me</code></td>
</tr>
</tbody>
</table>
<h2 id="基于-session-实现" tabindex="-1"><a class="header-anchor" href="#基于-session-实现" aria-hidden="true">#</a> 基于 Session 实现</h2>
<p>基于 Session 的实现我们主要是实现这三个部分：</p>
<figure><img src="@source/../assets/message-login/2023-05-20-15-54-56.png" alt="基于 Session 实现" tabindex="0" loading="lazy"><figcaption>基于 Session 实现</figcaption></figure>
<h3 id="发送短信验证码-1" tabindex="-1"><a class="header-anchor" href="#发送短信验证码-1" aria-hidden="true">#</a> 发送短信验证码</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">Result</span> <span class="token function">senCode</span><span class="token punctuation">(</span><span class="token class-name">String</span> phone<span class="token punctuation">,</span> <span class="token class-name">HttpSession</span> session<span class="token punctuation">)</span> <span class="token punctuation">{</span>

    <span class="token comment">// 1. 校验手机号是否符合</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">RegexUtils</span><span class="token punctuation">.</span><span class="token function">isPhoneInvalid</span><span class="token punctuation">(</span>phone<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 2. 如果不符合，则返回失败</span>
        <span class="token keyword">return</span> <span class="token class-name">Result</span><span class="token punctuation">.</span><span class="token function">fail</span><span class="token punctuation">(</span><span class="token string">"手机号格式错误！"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 3. 手机号格式正确，则生成验证码</span>
    <span class="token class-name">String</span> code <span class="token operator">=</span> <span class="token class-name">RandomUtil</span><span class="token punctuation">.</span><span class="token function">randomNumbers</span><span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 4. 发送验证码</span>
    log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"手机验证码为："</span> <span class="token operator">+</span> code<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 5. 将验证码存放到 session 中</span>
    session<span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">"login:code:"</span> <span class="token operator">+</span> phone<span class="token punctuation">,</span>code<span class="token punctuation">)</span><span class="token punctuation">;</span>


    <span class="token comment">// 6. 返回信息</span>
    <span class="token keyword">return</span> <span class="token class-name">Result</span><span class="token punctuation">.</span><span class="token function">ok</span><span class="token punctuation">(</span><span class="token string">"发送成功"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="短信验证码注册、登录-1" tabindex="-1"><a class="header-anchor" href="#短信验证码注册、登录-1" aria-hidden="true">#</a> 短信验证码注册、登录</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">Result</span> <span class="token function">login</span><span class="token punctuation">(</span><span class="token class-name">LoginFormDTO</span> loginForm<span class="token punctuation">,</span> <span class="token class-name">HttpSession</span> session<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 1. 准备信息</span>
    <span class="token class-name">String</span> loginPhone <span class="token operator">=</span> loginForm<span class="token punctuation">.</span><span class="token function">getPhone</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> cacheCode <span class="token operator">=</span> loginForm<span class="token punctuation">.</span><span class="token function">getCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> code <span class="token operator">=</span> session<span class="token punctuation">.</span><span class="token function">getAttribute</span><span class="token punctuation">(</span><span class="token string">"login:code:"</span> <span class="token operator">+</span> loginPhone<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 2. 校验手机号</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">RegexUtils</span><span class="token punctuation">.</span><span class="token function">isPhoneInvalid</span><span class="token punctuation">(</span>loginPhone<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">Result</span><span class="token punctuation">.</span><span class="token function">fail</span><span class="token punctuation">(</span><span class="token string">"手机号格式不符合！"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


    <span class="token comment">// 3. 校验验证码</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>cacheCode<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>code<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">Result</span><span class="token punctuation">.</span><span class="token function">fail</span><span class="token punctuation">(</span><span class="token string">"验证码错误！"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 4. 查询数据库</span>
    <span class="token class-name">User</span> user <span class="token operator">=</span> <span class="token function">query</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">eq</span><span class="token punctuation">(</span><span class="token string">"phone"</span><span class="token punctuation">,</span> loginPhone<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">one</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 5. 用户不存在则注册并登陆</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>user <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        user <span class="token operator">=</span> <span class="token function">createUserByPhone</span><span class="token punctuation">(</span>loginPhone<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 6. 用户存在则直接登录，即将用户信息存储至 session 中</span>

    <span class="token comment">// 6.1 随机生成用户登录令牌 Token</span>
    <span class="token class-name">String</span> token <span class="token operator">=</span> <span class="token constant">UUID</span><span class="token punctuation">.</span><span class="token function">randomUUID</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 6.2 将 User 对象转化为 UserDTO 存储</span>
    <span class="token class-name">UserDTO</span> userDTO <span class="token operator">=</span> <span class="token class-name">BeanUtil</span><span class="token punctuation">.</span><span class="token function">copyProperties</span><span class="token punctuation">(</span>user<span class="token punctuation">,</span> <span class="token class-name">UserDTO</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>


    <span class="token comment">// 完整的登录 token</span>
    <span class="token class-name">String</span> tokenKey <span class="token operator">=</span> <span class="token string">"login:token:"</span> <span class="token operator">+</span> token<span class="token punctuation">;</span>
    
    <span class="token comment">// 存储至 session</span>
    session<span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span>tokenKey<span class="token punctuation">,</span>userDTO<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> <span class="token class-name">Result</span><span class="token punctuation">.</span><span class="token function">ok</span><span class="token punctuation">(</span>token<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="校验登录状态-1" tabindex="-1"><a class="header-anchor" href="#校验登录状态-1" aria-hidden="true">#</a> 校验登录状态</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">Result</span> <span class="token function">me</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token class-name">UserDTO</span> userDTO <span class="token operator">=</span> <span class="token class-name">UserHolder</span><span class="token punctuation">.</span><span class="token function">getUser</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token class-name">Result</span><span class="token punctuation">.</span><span class="token function">ok</span><span class="token punctuation">(</span>userDTO<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="基于-redis-实现" tabindex="-1"><a class="header-anchor" href="#基于-redis-实现" aria-hidden="true">#</a> 基于 Redis 实现</h2>
<figure><img src="@source/../assets/message-login/2023-05-30-20-10-56.png" alt="基于 Redis 实现" tabindex="0" loading="lazy"><figcaption>基于 Redis 实现</figcaption></figure>
<h3 id="发送验证码" tabindex="-1"><a class="header-anchor" href="#发送验证码" aria-hidden="true">#</a> 发送验证码</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">Result</span> <span class="token function">senCode</span><span class="token punctuation">(</span><span class="token class-name">String</span> phone<span class="token punctuation">,</span> <span class="token class-name">HttpSession</span> session<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">ValueOperations</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">></span></span> stringOps <span class="token operator">=</span> redisTemplate<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 1. 校验手机号是否符合</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">RegexUtils</span><span class="token punctuation">.</span><span class="token function">isPhoneInvalid</span><span class="token punctuation">(</span>phone<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 2. 如果不符合，则返回失败</span>
        <span class="token keyword">return</span> <span class="token class-name">Result</span><span class="token punctuation">.</span><span class="token function">fail</span><span class="token punctuation">(</span><span class="token string">"手机号格式错误！"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 3. 手机号格式正确，则生成验证码</span>
    <span class="token class-name">String</span> code <span class="token operator">=</span> <span class="token class-name">RandomUtil</span><span class="token punctuation">.</span><span class="token function">randomNumbers</span><span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 4. 发送验证码</span>
    log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">"手机验证码为："</span> <span class="token operator">+</span> code<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 5. 将验证码存放到 Redis 中，并设置 2 分钟有效期</span>
    stringOps<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token class-name">RedisConstants</span><span class="token punctuation">.</span><span class="token constant">LOGIN_CODE_KEY</span> <span class="token operator">+</span> phone<span class="token punctuation">,</span> code<span class="token punctuation">,</span> <span class="token class-name">RedisConstants</span><span class="token punctuation">.</span><span class="token constant">LOGIN_CODE_TTL</span><span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">MINUTES</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 6. 返回信息</span>
    <span class="token keyword">return</span> <span class="token class-name">Result</span><span class="token punctuation">.</span><span class="token function">ok</span><span class="token punctuation">(</span><span class="token string">"发送成功"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="短信验证码注册、登录-2" tabindex="-1"><a class="header-anchor" href="#短信验证码注册、登录-2" aria-hidden="true">#</a> 短信验证码注册、登录</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">Result</span> <span class="token function">login</span><span class="token punctuation">(</span><span class="token class-name">LoginFormDTO</span> loginForm<span class="token punctuation">,</span> <span class="token class-name">HttpSession</span> session<span class="token punctuation">)</span> <span class="token punctuation">{</span>

    <span class="token class-name">ValueOperations</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">></span></span> stringOps <span class="token operator">=</span> redisTemplate<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">HashOperations</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">></span></span> hashOps <span class="token operator">=</span> redisTemplate<span class="token punctuation">.</span><span class="token function">opsForHash</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 1. 准备信息</span>
    <span class="token class-name">String</span> loginPhone <span class="token operator">=</span> loginForm<span class="token punctuation">.</span><span class="token function">getPhone</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> cacheCode <span class="token operator">=</span> loginForm<span class="token punctuation">.</span><span class="token function">getCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">String</span> code <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">)</span> stringOps<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token class-name">RedisConstants</span><span class="token punctuation">.</span><span class="token constant">LOGIN_CODE_KEY</span> <span class="token operator">+</span> loginPhone<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 2. 校验手机号</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">RegexUtils</span><span class="token punctuation">.</span><span class="token function">isPhoneInvalid</span><span class="token punctuation">(</span>loginPhone<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">Result</span><span class="token punctuation">.</span><span class="token function">fail</span><span class="token punctuation">(</span><span class="token string">"手机号格式不符合！"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 3. 校验验证码</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>cacheCode<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>code<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">Result</span><span class="token punctuation">.</span><span class="token function">fail</span><span class="token punctuation">(</span><span class="token string">"验证码错误！"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 4. 查询数据库</span>
    <span class="token class-name">User</span> user <span class="token operator">=</span> <span class="token function">query</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">eq</span><span class="token punctuation">(</span><span class="token string">"phone"</span><span class="token punctuation">,</span> loginPhone<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">one</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 5. 用户不存在则注册并登陆</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>user <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        user <span class="token operator">=</span> <span class="token function">createUserByPhone</span><span class="token punctuation">(</span>loginPhone<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 6. 用户存在则直接登录，即将用户信息存储至 Redis 中</span>

    <span class="token comment">// 6.1 随机生成用户登录令牌 Token</span>
    <span class="token class-name">String</span> token <span class="token operator">=</span> <span class="token constant">UUID</span><span class="token punctuation">.</span><span class="token function">randomUUID</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 6.2 将 User 对象转化为 Hash 存储</span>
    <span class="token class-name">UserDTO</span> userDTO <span class="token operator">=</span> <span class="token class-name">BeanUtil</span><span class="token punctuation">.</span><span class="token function">copyProperties</span><span class="token punctuation">(</span>user<span class="token punctuation">,</span> <span class="token class-name">UserDTO</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">></span></span> userMap <span class="token operator">=</span> <span class="token class-name">BeanUtil</span><span class="token punctuation">.</span><span class="token function">beanToMap</span><span class="token punctuation">(</span>userDTO<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 完整的登录 token</span>
    <span class="token class-name">String</span> tokenKey <span class="token operator">=</span> <span class="token class-name">RedisConstants</span><span class="token punctuation">.</span><span class="token constant">LOGIN_USER_KEY</span> <span class="token operator">+</span> token<span class="token punctuation">;</span>
    <span class="token comment">// 存入 redis</span>
    hashOps<span class="token punctuation">.</span><span class="token function">putAll</span><span class="token punctuation">(</span>tokenKey<span class="token punctuation">,</span> userMap<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 设置有效期</span>
    redisTemplate<span class="token punctuation">.</span><span class="token function">expire</span><span class="token punctuation">(</span>tokenKey<span class="token punctuation">,</span><span class="token class-name">RedisConstants</span><span class="token punctuation">.</span><span class="token constant">LOGIN_USER_TTL</span><span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">MINUTES</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> <span class="token class-name">Result</span><span class="token punctuation">.</span><span class="token function">ok</span><span class="token punctuation">(</span>token<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="校验登录状态-2" tabindex="-1"><a class="header-anchor" href="#校验登录状态-2" aria-hidden="true">#</a> 校验登录状态</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">Result</span> <span class="token function">me</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token class-name">UserDTO</span> userDTO <span class="token operator">=</span> <span class="token class-name">UserHolder</span><span class="token punctuation">.</span><span class="token function">getUser</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token class-name">Result</span><span class="token punctuation">.</span><span class="token function">ok</span><span class="token punctuation">(</span>userDTO<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="更新-redis-中的有效期" tabindex="-1"><a class="header-anchor" href="#更新-redis-中的有效期" aria-hidden="true">#</a> 更新 Redis 中的有效期</h2>
<p>在 session 中，用户的操作会更新有效时间，而在 Redis 中需要我们手动更新。</p>
<p>这里我们可以在拦截器中进行更新，每当用户发起请求时，我们就可以更新其的有效时间。这里使用两个拦截器进行实现</p>
<ul>
<li>RefreshInterceptor 刷新拦截器</li>
<li>LoginInterceptor 登录拦截器</li>
</ul>
<p>刷新拦截器负责用户登录刷新 Redis 中对应信息的有效期，而登录拦截器校验用户是否登录。</p>
<p>刷新拦截器需要先执行，拦截所有路径。登录拦截器后执行，只拦截制定路径。</p>
</div></template>


