<template><div><h1 id="redis进阶-redis哨兵" tabindex="-1"><a class="header-anchor" href="#redis进阶-redis哨兵" aria-hidden="true">#</a> Redis进阶 - Redis哨兵</h1>
<div class="hint-container warning">
<p class="hint-container-title">思考</p>
<p>slave 节点宕机恢复以后可以找 master 节点同步数据，那么 master 节点宕机怎么办？</p>
</div>
<h2 id="哨兵的作用和工作原理" tabindex="-1"><a class="header-anchor" href="#哨兵的作用和工作原理" aria-hidden="true">#</a> 哨兵的作用和工作原理</h2>
<h3 id="哨兵的作用" tabindex="-1"><a class="header-anchor" href="#哨兵的作用" aria-hidden="true">#</a> 哨兵的作用</h3>
<p>Redis 提供了哨兵（Sentinel）机制来实现主从集群的自动故障恢复。哨兵的结构和作用如下：</p>
<figure><img src="@source/../assets/redis-advance-sentinel/2023-06-26-23-47-32.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<ul>
<li><strong>监控</strong>：Sentinel 会不断检查您的 master 和 slave 是否按照预期工作</li>
<li><strong>自动故障恢复</strong>：如果 master 故障，Sentinel 会将一个 slave 提升为 master 。当故障实例恢复后也以新的 master 为主</li>
<li><strong>通知</strong>：Sentinel 充当 Redis 客户端的服务发现来源，当集群发生故障转移时，会将最新信息推送给 Redis 的客户端</li>
</ul>
<h3 id="服务状态监控" tabindex="-1"><a class="header-anchor" href="#服务状态监控" aria-hidden="true">#</a> 服务状态监控</h3>
<p>Sentinel 基于心跳机制监测服务状态，每隔 1 秒向集群的每个实例发送 ping 命令：</p>
<ul>
<li>
<p>主观下线：如果某 Sentinel 节点发现某实例未在规定时间响应，则认为该实例主观下线。</p>
</li>
<li>
<p>客观下线：若超过指定数量（quorum）的 sentinel 都认为该实例主观下线，则该实例客观下线。quorum 值最好超过 Sentinel 实例数量的一半。</p>
</li>
</ul>
<figure><img src="@source/../assets/redis-advance-sentinel/2023-06-26-23-56-21.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h3 id="选举新的master" tabindex="-1"><a class="header-anchor" href="#选举新的master" aria-hidden="true">#</a> 选举新的master</h3>
<p>一旦发现master 故障，sentinel 需要在 slave 中选择一个作为新的 master ，选择依据是这样：</p>
<ul>
<li>
<p>首先会判断 slave 节点与 master 节点断开的时间长短，如果超过指定值（down-after-milliseconds * 10）则会排除该 slave 节点</p>
</li>
<li>
<p>然后判断 slave 节点的 slave-priority值，越小优先级越高，如果是 0 则永不参与选举</p>
</li>
<li>
<p>如果 slave-prority 一样，则判断 slave 节点的 offset 值，越大则说明数据越新，优先级越高</p>
</li>
<li>
<p>最后是判断 slave 节点的运行 id 大小，越小优先级越高</p>
</li>
</ul>
<h3 id="实现故障转移" tabindex="-1"><a class="header-anchor" href="#实现故障转移" aria-hidden="true">#</a> 实现故障转移</h3>
<p>当选中了其中一个 slave 为新的 master 后（例如slave1），故障转移的步骤如下：</p>
<ol>
<li>
<p>sentinel 给备选的 slave1 节点发送 slaveof no one 命令，让该节点成为 master</p>
</li>
<li>
<p>sentinel 给所有其他 slave 发送 slaveof 192.168.150.101 7002 命令，让这些 slave 成为新 master 的从节点，开始从新的 master 上同步数据。</p>
</li>
<li>
<p>最后 sentinel 将故障节点标记为 slave，当故障节点恢复后会自动成为新的 master 的 slave 节点</p>
</li>
</ol>
<figure><img src="@source/../assets/redis-advance-sentinel/2023-06-27-00-11-32.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h3 id="小结" tabindex="-1"><a class="header-anchor" href="#小结" aria-hidden="true">#</a> 小结</h3>
<p><strong>Sentinel 的三个作用是什么？</strong></p>
<ul>
<li>监控</li>
<li>故障转移</li>
<li>通知</li>
</ul>
<p><strong>Sentinel 如何判断一个 Redis 实例是否健康？</strong></p>
<ul>
<li>
<p>每隔 1 秒发送一次 ping 命令，如果超过一定时间没有相向则认为是主观下线</p>
</li>
<li>
<p>如果大多数 sentinel 都认为实例主观下线，则判定服务下线</p>
</li>
</ul>
<p><strong>故障转移步骤有哪些？</strong></p>
<ul>
<li>首先选定一个 slave 作为新的 master，执行 slaveof no one</li>
<li>然后让所有节点都执行 slaveof 新master</li>
<li>修改故障节点配置，添加 slaveof 新master</li>
</ul>
<h2 id="搭建哨兵集群" tabindex="-1"><a class="header-anchor" href="#搭建哨兵集群" aria-hidden="true">#</a> 搭建哨兵集群</h2>
<h3 id="集群结构" tabindex="-1"><a class="header-anchor" href="#集群结构" aria-hidden="true">#</a> 集群结构</h3>
<p>这里我们搭建一个三节点形成的Sentinel集群，来监管之前的Redis主从集群。如图：</p>
<p>三个sentinel实例信息如下：</p>
<table>
<thead>
<tr>
<th style="text-align:center">节点</th>
<th style="text-align:center">IP</th>
<th style="text-align:center">PORT</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">s1</td>
<td style="text-align:center">192.168.150.101</td>
<td style="text-align:center">27001</td>
</tr>
<tr>
<td style="text-align:center">s2</td>
<td style="text-align:center">192.168.150.101</td>
<td style="text-align:center">27002</td>
</tr>
<tr>
<td style="text-align:center">s3</td>
<td style="text-align:center">192.168.150.101</td>
<td style="text-align:center">27003</td>
</tr>
</tbody>
</table>
<h3 id="准备实例和配置" tabindex="-1"><a class="header-anchor" href="#准备实例和配置" aria-hidden="true">#</a> 准备实例和配置</h3>
<p>要在同一台虚拟机开启3个实例，必须准备三份不同的配置文件和目录，配置文件所在目录也就是工作目录。</p>
<p>我们创建三个文件夹，名字分别叫s1、s2、s3：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 进入/tmp目录</span>
<span class="token builtin class-name">cd</span> /tmp
<span class="token comment"># 创建目录</span>
<span class="token function">mkdir</span> s1 s2 s3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后我们在s1目录创建一个sentinel.conf文件，添加下面的内容：</p>
<div class="language-ini line-numbers-mode" data-ext="ini"><pre v-pre class="language-ini"><code>port 27001
sentinel announce-ip 192.168.150.101
sentinel monitor mymaster 192.168.150.101 7001 2
sentinel down-after-milliseconds mymaster 5000
sentinel failover-timeout mymaster 60000
dir "/tmp/s1"
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><code v-pre>port 27001</code>：是当前sentinel实例的端口</li>
<li><code v-pre>sentinel monitor mymaster 192.168.150.101 7001 2</code>：指定主节点信息
<ul>
<li><code v-pre>mymaster</code>：主节点名称，自定义，任意写</li>
<li><code v-pre>192.168.150.101 7001</code>：主节点的ip和端口</li>
<li><code v-pre>2</code>：选举master时的quorum值</li>
</ul>
</li>
</ul>
<p>然后将s1/sentinel.conf文件拷贝到s2、s3两个目录中（在/tmp目录执行下列命令）：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 方式一：逐个拷贝</span>
<span class="token function">cp</span> s1/sentinel.conf s2
<span class="token function">cp</span> s1/sentinel.conf s3
<span class="token comment"># 方式二：管道组合命令，一键拷贝</span>
<span class="token builtin class-name">echo</span> s2 s3 <span class="token operator">|</span> <span class="token function">xargs</span> <span class="token parameter variable">-t</span> <span class="token parameter variable">-n</span> <span class="token number">1</span> <span class="token function">cp</span> s1/sentinel.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>修改s2、s3两个文件夹内的配置文件，将端口分别修改为27002、27003：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token parameter variable">-e</span> <span class="token string">'s/27001/27002/g'</span> <span class="token parameter variable">-e</span> <span class="token string">'s/s1/s2/g'</span> s2/sentinel.conf
<span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token parameter variable">-e</span> <span class="token string">'s/27001/27003/g'</span> <span class="token parameter variable">-e</span> <span class="token string">'s/s1/s3/g'</span> s3/sentinel.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="启动" tabindex="-1"><a class="header-anchor" href="#启动" aria-hidden="true">#</a> 启动</h3>
<p>为了方便查看日志，我们打开3个ssh窗口，分别启动3个redis实例，启动命令：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 第1个</span>
redis-sentinel s1/sentinel.conf
<span class="token comment"># 第2个</span>
redis-sentinel s2/sentinel.conf
<span class="token comment"># 第3个</span>
redis-sentinel s3/sentinel.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>启动后：</p>
<figure><img src="@source/../assets/redis-advance-sentinel/2023-06-27-21-40-52.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h3 id="测试" tabindex="-1"><a class="header-anchor" href="#测试" aria-hidden="true">#</a> 测试</h3>
<p>尝试让master节点7001宕机，查看sentinel日志：</p>
<figure><img src="@source/../assets/redis-advance-sentinel/2023-06-27-21-41-08.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>查看7003的日志：</p>
<figure><img src="@source/../assets/redis-advance-sentinel/2023-06-27-21-41-26.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>查看7002的日志：</p>
<figure><img src="@source/../assets/redis-advance-sentinel/2023-06-27-21-42-13.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h2 id="redistemplate连接集群" tabindex="-1"><a class="header-anchor" href="#redistemplate连接集群" aria-hidden="true">#</a> RedisTemplate连接集群</h2>
<p>在 Sentinel 集群监管下的 Redis 主从集群，其节点会因为自动故障转移而发生变化，Redis 的客户端必须感知这种变化，及时更新连接信息。Spring 的 RedisTemplate 底层利用 lettuce 实现了节点的感知和自动切换。</p>
<ol>
<li>引入 pom 文件</li>
</ol>
<div class="language-xml line-numbers-mode" data-ext="xml"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-data-redis<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2">
<li>配置文件</li>
</ol>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">redis</span><span class="token punctuation">:</span>
    <span class="token key atrule">sentinel</span><span class="token punctuation">:</span>
      <span class="token key atrule">master</span><span class="token punctuation">:</span> mymaster
      <span class="token key atrule">nodes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> 192.168.127.101<span class="token punctuation">:</span><span class="token number">27001</span>
      <span class="token punctuation">-</span> 192.168.127.101<span class="token punctuation">:</span><span class="token number">27002</span>
      <span class="token punctuation">-</span> 192.168.127.101<span class="token punctuation">:</span><span class="token number">27003</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3">
<li>修改配置类，实现读写分离</li>
</ol>
<blockquote>
<p>这个方法写在项目启动类中。</p>
</blockquote>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">// 常规写法</span>
<span class="token annotation punctuation">@Bean</span> 
<span class="token keyword">public</span> <span class="token class-name">LettuceClientConfigurationBuilderCustomizer</span> <span class="token function">lettuceClientConfigurationBuilderCustomizer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">return</span> clientConfigurationBuilder <span class="token operator">-></span> clientConfigurationBuilder<span class="token punctuation">.</span><span class="token function">readFrom</span><span class="token punctuation">(</span><span class="token class-name">ReadFrom</span><span class="token punctuation">.</span><span class="token constant">REPLICA_PREFERRED</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// 匿名内部类的简写</span>
<span class="token annotation punctuation">@Bean</span>
<span class="token keyword">public</span> <span class="token class-name">LettuceClientConfigurationBuilderCustomizer</span> <span class="token function">lettuceClientConfigurationBuilderCustomizer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">customize</span><span class="token punctuation">(</span><span class="token class-name">LettuceClientConfiguration<span class="token punctuation">.</span>LettuceClientConfigurationbuilder</span> clientConfigurationBuilder<span class="token punctuation">)</span><span class="token punctuation">{</span>
        clientConfigurationBuilder<span class="token punctuation">.</span><span class="token function">readFrom</span><span class="token punctuation">(</span><span class="token class-name">ReadFrom</span><span class="token punctuation">.</span><span class="token constant">REPLICA_PREFERRED</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4">
<li>控制器 Controller 类</li>
</ol>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@RestController</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RedisController</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">StringRedisTemplate</span> stringRedisTemplate<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/set/{key}/{value}"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">setKey</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span><span class="token punctuation">(</span><span class="token string">"key"</span><span class="token punctuation">)</span> <span class="token class-name">String</span> key<span class="token punctuation">,</span> <span class="token annotation punctuation">@PathVariable</span><span class="token punctuation">(</span><span class="token string">"value"</span><span class="token punctuation">)</span> <span class="token class-name">String</span> value<span class="token punctuation">)</span><span class="token punctuation">{</span>
        stringRedisTemplate<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token string">"success"</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@GetMapping</span><span class="token punctuation">(</span><span class="token string">"/get/{key}"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getKey</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span><span class="token punctuation">(</span><span class="token string">"key"</span><span class="token punctuation">)</span><span class="token class-name">String</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> value <span class="token operator">=</span> stringRedisTemplate<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> value<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="5">
<li>测试访问</li>
</ol>
<ul>
<li>添加：<a href="http://localhost:8080/set/name/codermast/" target="_blank" rel="noopener noreferrer">http://localhost:8080/set/name/codermast/<ExternalLinkIcon/></a></li>
<li>查询：<a href="http://localhost:8080/get/name/" target="_blank" rel="noopener noreferrer">http://localhost:8080/get/name/<ExternalLinkIcon/></a></li>
</ul>
</div></template>


