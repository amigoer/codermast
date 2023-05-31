<template><div><h1 id="redis实战-商户查询缓存" tabindex="-1"><a class="header-anchor" href="#redis实战-商户查询缓存" aria-hidden="true">#</a> Redis实战 - 商户查询缓存</h1>
<div class="hint-container tip">
<p class="hint-container-title">缓存</p>
<p>缓存就是数据交换的缓冲区（Cache），是存储数据的临时地方，一般读写性能比较高。</p>
<ul>
<li>例如</li>
</ul>
<ol>
<li>内存是硬盘的缓存</li>
<li>cache 是内存的缓存</li>
</ol>
<ul>
<li>作用</li>
</ul>
<ol>
<li>降低后端负载</li>
<li>提高读写效率，降低响应时间</li>
</ol>
<ul>
<li>成本</li>
</ul>
<ol>
<li>数据一致性成本</li>
<li>代码维护成本</li>
</ol>
</div>
<h2 id="缓存更新策略" tabindex="-1"><a class="header-anchor" href="#缓存更新策略" aria-hidden="true">#</a> 缓存更新策略</h2>
<table>
<thead>
<tr>
<th style="text-align:center"></th>
<th style="text-align:center">内存淘汰</th>
<th style="text-align:center">超时剔除</th>
<th style="text-align:center">主动更新</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">说明</td>
<td style="text-align:center">不用自己维护，利用 Redis 的内存淘汰机制，当内存不足时自动淘汰部分数据。下次查询时更新缓存</td>
<td style="text-align:center">给缓存数据添加TTL时间，到期后自动删除缓存。下次查询时更新缓存。</td>
<td style="text-align:center">编写业务逻辑，在修改数据库的同时，更新缓存。</td>
</tr>
<tr>
<td style="text-align:center">一致性</td>
<td style="text-align:center">差</td>
<td style="text-align:center">一般</td>
<td style="text-align:center">好</td>
</tr>
<tr>
<td style="text-align:center">维护成本</td>
<td style="text-align:center">无</td>
<td style="text-align:center">低</td>
<td style="text-align:center">高</td>
</tr>
</tbody>
</table>
<p><strong>业务场景：</strong></p>
<ul>
<li>低一致性需求：数据的变化频率低，使用内存淘汰机制。例如：店铺类型的查询缓存。</li>
<li>高一致性需求：数据经常发生改变，主动更新，并以超时剔除作为兜底方案。例如：店铺详情查询的缓存。</li>
</ul>
<h3 id="主动更新策略" tabindex="-1"><a class="header-anchor" href="#主动更新策略" aria-hidden="true">#</a> 主动更新策略</h3>
<ol>
<li>
<p><strong>Cache Aside Pattern</strong>：由缓存的调用者，在更新数据库的同时更新缓存。</p>
</li>
<li>
<p>Read/Write Through Pattern：缓存和数据库整合为一个服务，由服务来维护一致性。调用者调用该服务，无需关心缓存一致性问题。</p>
</li>
<li>
<p>Write Behind Caching Pattern：调用者只操作缓存，由其他线程异步的将缓存数据持久化到数据库，保证最终一致。</p>
</li>
</ol>
<blockquote>
<p>一般情况下都使用第一种方法，可控性更高。</p>
</blockquote>
<p>在操作缓存时，数据库发生修改则直接删除对应的缓存，待查询时再创建缓存。</p>
<ul>
<li>单体系统，将缓存和数据库操作放在同一个事务内。</li>
<li>分布式系统，使用TCC等分布式事务方案。</li>
</ul>
<p>先操作数据库，在删除缓存。</p>
<h2 id="缓存穿透" tabindex="-1"><a class="header-anchor" href="#缓存穿透" aria-hidden="true">#</a> 缓存穿透</h2>
<p>缓存穿透是指客户端请求的数据在缓存中和数据库中都不存在，这样缓存永远不会生效，这些请求都会打到数据库。如请求不存在的数据，则 Redis 缓存中不存在，数据库中也不存在，频繁请求，造成资源的浪费。</p>
<p>解决这种问题的方法有两种：</p>
<ul>
<li>缓存空对象
<ul>
<li>优点：实现简单，维护方便</li>
<li>缺点：1. 额外的内存消耗。 2. 可能造成短期的不一致</li>
</ul>
</li>
<li>布隆过滤
<ul>
<li>优点：内存占用小，没有多余的key</li>
<li>缺点：1. 实现复杂 2. 存在误判可能</li>
</ul>
</li>
</ul>
<h2 id="实现api" tabindex="-1"><a class="header-anchor" href="#实现api" aria-hidden="true">#</a> 实现API</h2>
<figure><img src="@source/../assets/merchant-query-cache/2023-05-30-21-08-29.png" alt="缓存作用模型" tabindex="0" loading="lazy"><figcaption>缓存作用模型</figcaption></figure>
<figure><img src="@source/../assets/merchant-query-cache/2023-05-30-21-09-21.png" alt="根据ID查询商铺缓存流程" tabindex="0" loading="lazy"><figcaption>根据ID查询商铺缓存流程</figcaption></figure>
<h3 id="缓存商铺信息" tabindex="-1"><a class="header-anchor" href="#缓存商铺信息" aria-hidden="true">#</a> 缓存商铺信息</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">Result</span> <span class="token function">queryById</span><span class="token punctuation">(</span><span class="token class-name">Long</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">ValueOperations</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">></span></span> valueOps <span class="token operator">=</span> redisTemplate<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 1. 从 Redis 查询商铺缓存</span>
    <span class="token class-name">String</span> shopJson <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">)</span> valueOps<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token class-name">RedisConstants</span><span class="token punctuation">.</span><span class="token constant">CACHE_SHOP_KEY</span> <span class="token operator">+</span> id<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 2. 判断缓存是否命中</span>
    <span class="token comment">// 2.1 缓存命中，则直接返回商铺信息</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">StrUtil</span><span class="token punctuation">.</span><span class="token function">isNotBlank</span><span class="token punctuation">(</span>shopJson<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//log.info("缓存命中，输出缓存......");</span>
        <span class="token class-name">Shop</span> shop <span class="token operator">=</span> <span class="token class-name">JSONUtil</span><span class="token punctuation">.</span><span class="token function">toBean</span><span class="token punctuation">(</span>shopJson<span class="token punctuation">,</span> <span class="token class-name">Shop</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token class-name">Result</span><span class="token punctuation">.</span><span class="token function">ok</span><span class="token punctuation">(</span>shop<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 2.2 缓存未命中，则根据 id 查询数据库</span>
    <span class="token class-name">Shop</span> shopById <span class="token operator">=</span> <span class="token function">getById</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 2.2.1 商户不存在则返回 404</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>shopById <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">Result</span><span class="token punctuation">.</span><span class="token function">fail</span><span class="token punctuation">(</span><span class="token string">"404"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 2.2.2 商户存在则将商铺数据写入 Redis 中，并返回</span>
    <span class="token class-name">String</span> shopByIdJson <span class="token operator">=</span> <span class="token class-name">JSONUtil</span><span class="token punctuation">.</span><span class="token function">toJsonStr</span><span class="token punctuation">(</span>shopById<span class="token punctuation">)</span><span class="token punctuation">;</span>

    valueOps<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token class-name">RedisConstants</span><span class="token punctuation">.</span><span class="token constant">CACHE_SHOP_KEY</span> <span class="token operator">+</span> id<span class="token punctuation">,</span>shopByIdJson<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//log.info("缓存未命中，输出数据库......");</span>

    <span class="token keyword">return</span> <span class="token class-name">Result</span><span class="token punctuation">.</span><span class="token function">ok</span><span class="token punctuation">(</span>shopById<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="缓存商铺类型" tabindex="-1"><a class="header-anchor" href="#缓存商铺类型" aria-hidden="true">#</a> 缓存商铺类型</h3>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token class-name">Result</span> <span class="token function">queryTypeList</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">ValueOperations</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">></span></span> valueOps <span class="token operator">=</span> redisTemplate<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 1. 查询缓存是否存在</span>
    <span class="token class-name">String</span> shopTypeList  <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">)</span> valueOps<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token class-name">RedisConstants</span><span class="token punctuation">.</span><span class="token constant">CACHE_SHOP_KEY</span> <span class="token operator">+</span> <span class="token string">"list"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">ShopType</span><span class="token punctuation">></span></span> list <span class="token operator">=</span> <span class="token class-name">JSONUtil</span><span class="token punctuation">.</span><span class="token function">toList</span><span class="token punctuation">(</span>shopTypeList<span class="token punctuation">,</span> <span class="token class-name">ShopType</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 1.1 不为空时，缓存命中，直接返回</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">StrUtil</span><span class="token punctuation">.</span><span class="token function">isNotBlank</span><span class="token punctuation">(</span>shopTypeList<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//log.info("缓存命中，输出缓存....");</span>
        <span class="token keyword">return</span> <span class="token class-name">Result</span><span class="token punctuation">.</span><span class="token function">ok</span><span class="token punctuation">(</span>list<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 缓存未命中，则查询数据库</span>
    list <span class="token operator">=</span> <span class="token function">query</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">orderByAsc</span><span class="token punctuation">(</span><span class="token string">"sort"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">list</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 判断数据库中是否存在</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>list<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">Result</span><span class="token punctuation">.</span><span class="token function">fail</span><span class="token punctuation">(</span><span class="token string">"数据为空！"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 存在，则添加缓存并返回</span>
    <span class="token class-name">String</span> listJson <span class="token operator">=</span> <span class="token class-name">JSONUtil</span><span class="token punctuation">.</span><span class="token function">toJsonStr</span><span class="token punctuation">(</span>list<span class="token punctuation">)</span><span class="token punctuation">;</span>
    valueOps<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token class-name">RedisConstants</span><span class="token punctuation">.</span><span class="token constant">CACHE_SHOP_KEY</span> <span class="token operator">+</span> <span class="token string">"list"</span><span class="token punctuation">,</span>listJson<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//log.info("缓存未命中，输出数据库....");</span>

    <span class="token keyword">return</span> <span class="token class-name">Result</span><span class="token punctuation">.</span><span class="token function">ok</span><span class="token punctuation">(</span>list<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="更新商铺信息" tabindex="-1"><a class="header-anchor" href="#更新商铺信息" aria-hidden="true">#</a> 更新商铺信息</h3>
<p>在更新商铺信息后，需要删除 Redis 中对应的缓存，再下一次访问时重新添加缓存。</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Transactional</span>
<span class="token keyword">public</span> <span class="token class-name">Result</span> <span class="token function">update</span><span class="token punctuation">(</span><span class="token class-name">Shop</span> shop<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 1. 判断数据是否存在</span>
    <span class="token class-name">Long</span> id <span class="token operator">=</span> shop<span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>id <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">Result</span><span class="token punctuation">.</span><span class="token function">fail</span><span class="token punctuation">(</span><span class="token string">"店铺ID不能为空！"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 2. 更新数据库</span>
    <span class="token function">updateById</span><span class="token punctuation">(</span>shop<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 3. 删除缓存</span>
    redisTemplate<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span><span class="token class-name">RedisConstants</span><span class="token punctuation">.</span><span class="token constant">CACHE_SHOP_KEY</span> <span class="token operator">+</span> id<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token class-name">Result</span><span class="token punctuation">.</span><span class="token function">ok</span><span class="token punctuation">(</span><span class="token string">"更新成功！"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


