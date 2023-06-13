<template><div><h1 id="redis客户端-redisserializer" tabindex="-1"><a class="header-anchor" href="#redis客户端-redisserializer" aria-hidden="true">#</a> Redis客户端 - RedisSerializer</h1>
<div class="hint-container note">
<p class="hint-container-title">前景回顾</p>
<p>在上一篇中，我们实现了一个简单的案例，操作一个 String 类型的数据，插入了一个 name = codermast 的数据到Redis。</p>
</div>
<p>使用redis-cli客户端连接对应的Redis服务器后，按道理来讲<code v-pre>get name</code>这个指令的返回结果应该是 <code v-pre>codermast</code></p>
<figure><img src="@source/../../assets/redistemplate-redis-serializer/2023-05-17-21-11-35.png" alt="redis-cli客户端查看" tabindex="0" loading="lazy"><figcaption>redis-cli客户端查看</figcaption></figure>
<p>返回的结果是无，这是为什么呢？使用可视化工具查看一下，看看到底数据是否存储在Redis服务器中。</p>
<figure><img src="@source/../../assets/redistemplate-redis-serializer/2023-05-17-21-11-13.png" alt="使用可视化工具查看" tabindex="0" loading="lazy"><figcaption>使用可视化工具查看</figcaption></figure>
<p>可以明显的看到，所存储的 key 之前加上了一段字符，但是从代码中看，存储的 key 为 &quot;name&quot;，但是实际存储的 key 是 <code v-pre>\xac\xed\x00\x05t\x00\x04name</code>，而且里面的 value 也做了同样的处理 <code v-pre>\xac\xed\x00\x05t\x00\x09codermast</code></p>
<p>出现这种现象的原因是什么呢？这是因为 RedisTemplate 在底层将数据序列化处理以后，才存储到 Redis 服务器中。</p>
<p>RedisTemplate 可以接收任意 Object 作为值写入 Redis ，只不过在写入之前会把 Object 序列化成为字节形式，默认是采用 JDK 序列化，得到的结果就如图所示。</p>
<div class="hint-container warning">
<p class="hint-container-title">缺点</p>
<ul>
<li>可读性差</li>
<li>资源占用高</li>
</ul>
</div>
<p>既然这样可读性又差，资源占用又高，那么如何解决这些问题呢？我们可以通过自定义 RedisTemplate 序列化的方式来解决。</p>
<h2 id="编写一个-redisconfig-配置类" tabindex="-1"><a class="header-anchor" href="#编写一个-redisconfig-配置类" aria-hidden="true">#</a> 编写一个 RedisConfig 配置类</h2>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RedisTemplate</span><span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">RedisTemplate</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">></span></span> <span class="token function">redisTemplate</span><span class="token punctuation">(</span><span class="token class-name">RedisConnectionFactory</span> factory<span class="token punctuation">)</span><span class="token punctuation">{</span>

        <span class="token comment">// 1.创建RedisTemplate对象</span>
        <span class="token class-name">RedisTemplate</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span> <span class="token punctuation">,</span><span class="token class-name">Object</span><span class="token punctuation">></span></span> redisTemplate <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">RedisTemplate</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 2.设置连接⼯⼚</span>
        redisTemplate<span class="token punctuation">.</span><span class="token function">setConnectionFactory</span><span class="token punctuation">(</span>factory<span class="token punctuation">)</span><span class="token punctuation">;</span>
        
        <span class="token comment">// 3.创建序列化对象</span>
        <span class="token class-name">StringRedisSerializer</span> stringRedisSerializer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringRedisSerializer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">GenericJackson2JsonRedisSerializer</span> genericJackson2JsonRedisSerializer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">GenericJackson2JsonRedisSerializer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        
        <span class="token comment">// 4.设置 key 和 hashKey 采⽤ String 的序列化⽅式</span>
        redisTemplate<span class="token punctuation">.</span><span class="token function">setKeySerializer</span><span class="token punctuation">(</span>stringRedisSerializer<span class="token punctuation">)</span><span class="token punctuation">;</span>
        redisTemplate<span class="token punctuation">.</span><span class="token function">setHashKeySerializer</span><span class="token punctuation">(</span>stringRedisSerializer<span class="token punctuation">)</span><span class="token punctuation">;</span>
        
        <span class="token comment">// 5.设置 value 和 hashValue 采⽤ json的 序列化⽅式</span>
        redisTemplate<span class="token punctuation">.</span><span class="token function">setValueSerializer</span><span class="token punctuation">(</span>genericJackson2JsonRedisSerializer<span class="token punctuation">)</span><span class="token punctuation">;</span>
        redisTemplate<span class="token punctuation">.</span><span class="token function">setHashValueSerializer</span><span class="token punctuation">(</span>genericJackson2JsonRedisSerializer<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">return</span> redisTemplate<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container warning">
<p class="hint-container-title">注意</p>
<p>我们自定义的配置类中，使用到了 Jackson 序列化类，所以在使用之前需要导入 jackson-datebind 这个依赖项。</p>
<div class="language-xml" data-ext="xml"><pre v-pre class="language-xml"><code><span class="token comment">&lt;!-- jackson-databind 依赖 --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.fasterxml.jackson.core<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>jackson-databind<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre></div></div>
<h2 id="自定义序列化方式" tabindex="-1"><a class="header-anchor" href="#自定义序列化方式" aria-hidden="true">#</a> 自定义序列化方式</h2>
<p>自定义的序列化方式也加进去了对引用类型的序列化，我们来实际测试一下。</p>
<ul>
<li>编写一个 User 类</li>
</ul>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Data</span>
<span class="token keyword">public</span> <span class="token class-name">User</span><span class="token punctuation">{</span>
    <span class="token class-name">Integer</span> age<span class="token punctuation">;</span>
    <span class="token class-name">String</span> name<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>类中属性需要给出 set 和 get方法</p>
</blockquote>
<ul>
<li>将 User 对象存储至 Redis</li>
</ul>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">void</span> <span class="token function">testObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token class-name">User</span> user <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    user<span class="token punctuation">.</span><span class="token function">setAge</span><span class="token punctuation">(</span><span class="token number">18</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    user<span class="token punctuation">.</span><span class="token function">setName</span><span class="token punctuation">(</span><span class="token string">"codermast"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 插入一条 Object 类型的数据</span>
    redisTemplate<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">"user"</span><span class="token punctuation">,</span>user<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 获取一条 Object 类型的数据</span>
    <span class="token class-name">User</span> user_coder <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">User</span><span class="token punctuation">)</span>redisTemplate<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">"user"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>user_coder<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="@source/../../assets/redistemplate-redis-serializer/2023-05-17-22-23-46.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>虽然 JSON 的序列化方式可以满足我们存储对象的需求，为了在反序列化时知道对象的类型，将对象的类路径地址也序列化进 JSON 结果中，存入 Redis ，会带来额外的资源消耗。</p>
<p>针对如图所示的特殊情况，类路径地址比我们真实的数据内容还大，造成了极大的资源浪费。</p>
<h2 id="优化自定义序列化" tabindex="-1"><a class="header-anchor" href="#优化自定义序列化" aria-hidden="true">#</a> 优化自定义序列化</h2>
<p>为了节省内存空间，通常情况下不会使用 JSON 序列化器来处理 Value ，而是统一使用 String 序列化器，要求只能存储 String 类型的 key 和 value。当要存储 Java 对象时，手动完成对象的序列化和反序列化。</p>
<figure><img src="@source/../../assets/redistemplate-redis-serializer/2023-05-17-22-31-37.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>Spring 默认提供了一个 StringRedisTemplate 类，它的 key 和 value 的序列化方式默认就是 String 方式，省去了我们自定义的 RedisTemplate 的过程。</p>
<p>现在在存储数据之前需要进行手动序列化，在获取数据以后，需要手动反序列化对象。</p>
<h2 id="小结" tabindex="-1"><a class="header-anchor" href="#小结" aria-hidden="true">#</a> 小结</h2>
<p>RedisTemplate 的两种序列化实践方案</p>
<ol>
<li>方案一
<ul>
<li>自定义RedisTemplate</li>
<li>修改RedisTemplate 的序列化器为 GenericJackson2JsonRedisSerializer</li>
</ul>
</li>
<li>方案二
<ul>
<li>使用 StringRedisTemplate</li>
<li>写入 Redis 之前，将对象手动序列化为 JSON</li>
<li>读取数据以后，将 JSON 手动反序列化为对象</li>
</ul>
</li>
</ol>
<div class="hint-container tip">
<p class="hint-container-title">提示</p>
<p>上述仅说明了操作 String 类型的数据，操作 Hash、List、Set、SortedSet类型时，使用对应的 ops 对象即可操作。</p>
</div>
</div></template>


