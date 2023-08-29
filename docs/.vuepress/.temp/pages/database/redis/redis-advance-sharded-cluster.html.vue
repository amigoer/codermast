<template><div><h1 id="redis进阶-redis分片集群" tabindex="-1"><a class="header-anchor" href="#redis进阶-redis分片集群" aria-hidden="true">#</a> Redis进阶 - Redis分片集群</h1>
<h2 id="搭建分片集群" tabindex="-1"><a class="header-anchor" href="#搭建分片集群" aria-hidden="true">#</a> 搭建分片集群</h2>
<p>主从和哨兵可以解决高可用、高并发读的问题。但是依然有两个问题没有解决：</p>
<ul>
<li>海量数据存储问题</li>
<li>高并发写的问题</li>
</ul>
<p>使用分片集群可以解决上述问题，分片集群特征：</p>
<ul>
<li>集群中有多个 master，每个 master 保存不同数据</li>
<li>每个 master 都可以有多个 slave 节点</li>
<li>master 之间通过 ping 监测彼此健康状态</li>
<li>客户端请求可以访问集群任意节点，最终都会被转发到正确节点</li>
</ul>
<h3 id="集群结构" tabindex="-1"><a class="header-anchor" href="#集群结构" aria-hidden="true">#</a> 集群结构</h3>
<p>分片集群需要的节点数量较多，这里我们搭建一个最小的分片集群，包含3个master节点，每个master包含一个slave节点，结构如下：</p>
<figure><img src="@source/../assets/redis-advance-sharded-cluster/2023-06-27-22-13-33.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>这里我们会在同一台虚拟机中开启6个redis实例，模拟分片集群，信息如下：</p>
<table>
<thead>
<tr>
<th style="text-align:center">IP</th>
<th style="text-align:center">PORT</th>
<th style="text-align:center">角色</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">192.168.150.101</td>
<td style="text-align:center">7001</td>
<td style="text-align:center">master</td>
</tr>
<tr>
<td style="text-align:center">192.168.150.101</td>
<td style="text-align:center">7002</td>
<td style="text-align:center">master</td>
</tr>
<tr>
<td style="text-align:center">192.168.150.101</td>
<td style="text-align:center">7003</td>
<td style="text-align:center">master</td>
</tr>
<tr>
<td style="text-align:center">192.168.150.101</td>
<td style="text-align:center">8001</td>
<td style="text-align:center">slave</td>
</tr>
<tr>
<td style="text-align:center">192.168.150.101</td>
<td style="text-align:center">8002</td>
<td style="text-align:center">slave</td>
</tr>
<tr>
<td style="text-align:center">192.168.150.101</td>
<td style="text-align:center">8003</td>
<td style="text-align:center">slave</td>
</tr>
</tbody>
</table>
<h3 id="准备实例和配置" tabindex="-1"><a class="header-anchor" href="#准备实例和配置" aria-hidden="true">#</a> 准备实例和配置</h3>
<p>删除之前的7001、7002、7003这几个目录，重新创建出7001、7002、7003、8001、8002、8003目录：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 进入/tmp目录</span>
<span class="token builtin class-name">cd</span> /tmp
<span class="token comment"># 删除旧的，避免配置干扰</span>
<span class="token function">rm</span> <span class="token parameter variable">-rf</span> <span class="token number">7001</span> <span class="token number">7002</span> <span class="token number">7003</span>
<span class="token comment"># 创建目录</span>
<span class="token function">mkdir</span> <span class="token number">7001</span> <span class="token number">7002</span> <span class="token number">7003</span> <span class="token number">8001</span> <span class="token number">8002</span> <span class="token number">8003</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在/tmp下准备一个新的redis.conf文件，内容如下：</p>
<div class="language-ini line-numbers-mode" data-ext="ini"><pre v-pre class="language-ini"><code>port 6379
<span class="token comment"># 开启集群功能</span>
cluster-enabled yes
<span class="token comment"># 集群的配置文件名称，不需要我们创建，由redis自己维护</span>
cluster-config-file /tmp/6379/nodes.conf
<span class="token comment"># 节点心跳失败的超时时间</span>
cluster-node-timeout 5000
<span class="token comment"># 持久化文件存放目录</span>
dir /tmp/6379
<span class="token comment"># 绑定地址</span>
bind 0.0.0.0
<span class="token comment"># 让redis后台运行</span>
daemonize yes
<span class="token comment"># 注册的实例ip</span>
replica-announce-ip 192.168.150.101
<span class="token comment"># 保护模式</span>
protected-mode no
<span class="token comment"># 数据库数量</span>
databases 1
<span class="token comment"># 日志</span>
logfile /tmp/6379/run.log
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>将这个文件拷贝到每个目录下：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 进入/tmp目录</span>
<span class="token builtin class-name">cd</span> /tmp
<span class="token comment"># 执行拷贝</span>
<span class="token builtin class-name">echo</span> <span class="token number">7001</span> <span class="token number">7002</span> <span class="token number">7003</span> <span class="token number">8001</span> <span class="token number">8002</span> <span class="token number">8003</span> <span class="token operator">|</span> <span class="token function">xargs</span> <span class="token parameter variable">-t</span> <span class="token parameter variable">-n</span> <span class="token number">1</span> <span class="token function">cp</span> redis.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>修改每个目录下的redis.conf，将其中的6379修改为与所在目录一致：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 进入/tmp目录</span>
<span class="token builtin class-name">cd</span> /tmp
<span class="token comment"># 修改配置文件</span>
<span class="token builtin class-name">printf</span> <span class="token string">'%s\n'</span> <span class="token number">7001</span> <span class="token number">7002</span> <span class="token number">7003</span> <span class="token number">8001</span> <span class="token number">8002</span> <span class="token number">8003</span> <span class="token operator">|</span> <span class="token function">xargs</span> -I<span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token parameter variable">-t</span> <span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">'s/6379/{}/g'</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>/redis.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="启动" tabindex="-1"><a class="header-anchor" href="#启动" aria-hidden="true">#</a> 启动</h3>
<p>因为已经配置了后台启动模式，所以可以直接启动服务：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 进入/tmp目录</span>
<span class="token builtin class-name">cd</span> /tmp
<span class="token comment"># 一键启动所有服务</span>
<span class="token builtin class-name">printf</span> <span class="token string">'%s\n'</span> <span class="token number">7001</span> <span class="token number">7002</span> <span class="token number">7003</span> <span class="token number">8001</span> <span class="token number">8002</span> <span class="token number">8003</span> <span class="token operator">|</span> <span class="token function">xargs</span> -I<span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token parameter variable">-t</span> redis-server <span class="token punctuation">{</span><span class="token punctuation">}</span>/redis.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过ps查看状态：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">ps</span> <span class="token parameter variable">-ef</span> <span class="token operator">|</span> <span class="token function">grep</span> redis
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>发现服务都已经正常启动：</p>
<figure><img src="@source/../assets/redis-advance-sharded-cluster/2023-06-27-22-23-50.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>如果要关闭所有进程，可以执行命令：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">ps</span> <span class="token parameter variable">-ef</span> <span class="token operator">|</span> <span class="token function">grep</span> redis <span class="token operator">|</span> <span class="token function">awk</span> <span class="token string">'{print $2}'</span> <span class="token operator">|</span> <span class="token function">xargs</span> <span class="token function">kill</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>或者（推荐这种方式）：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token builtin class-name">printf</span> <span class="token string">'%s\n'</span> <span class="token number">7001</span> <span class="token number">7002</span> <span class="token number">7003</span> <span class="token number">8001</span> <span class="token number">8002</span> <span class="token number">8003</span> <span class="token operator">|</span> <span class="token function">xargs</span> -I<span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token parameter variable">-t</span> redis-cli <span class="token parameter variable">-p</span> <span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token function">shutdown</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="创建集群" tabindex="-1"><a class="header-anchor" href="#创建集群" aria-hidden="true">#</a> 创建集群</h3>
<p>虽然服务启动了，但是目前每个服务之间都是独立的，没有任何关联。</p>
<p>我们需要执行命令来创建集群，在Redis5.0之前创建集群比较麻烦，5.0之后集群管理命令都集成到了redis-cli中。</p>
<ol>
<li>Redis5.0之前</li>
</ol>
<p>Redis5.0之前集群命令都是用redis安装包下的src/redis-trib.rb来实现的。因为redis-trib.rb是有ruby语言编写的所以需要安装ruby环境。</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 安装依赖</span>
yum <span class="token parameter variable">-y</span> <span class="token function">install</span> zlib ruby rubygems
gem <span class="token function">install</span> redis
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后通过命令来管理集群：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 进入redis的src目录</span>
<span class="token builtin class-name">cd</span> /tmp/redis-6.2.4/src
<span class="token comment"># 创建集群</span>
./redis-trib.rb create <span class="token parameter variable">--replicas</span> <span class="token number">1</span> <span class="token number">192.168</span>.150.101:7001 <span class="token number">192.168</span>.150.101:7002 <span class="token number">192.168</span>.150.101:7003 <span class="token number">192.168</span>.150.101:8001 <span class="token number">192.168</span>.150.101:8002 <span class="token number">192.168</span>.150.101:8003
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2">
<li>Redis5.0以后</li>
</ol>
<p>我们使用的是Redis6.2.4版本，集群管理以及集成到了redis-cli中，格式如下：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>redis-cli <span class="token parameter variable">--cluster</span> create --cluster-replicas <span class="token number">1</span> <span class="token number">192.168</span>.150.101:7001 <span class="token number">192.168</span>.150.101:7002 <span class="token number">192.168</span>.150.101:7003 <span class="token number">192.168</span>.150.101:8001 <span class="token number">192.168</span>.150.101:8002 <span class="token number">192.168</span>.150.101:8003
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>命令说明：</p>
<ul>
<li><code v-pre>redis-cli --cluster</code>或者<code v-pre>./redis-trib.rb</code>：代表集群操作命令</li>
<li><code v-pre>create</code>：代表是创建集群</li>
<li><code v-pre>--replicas 1</code>或者<code v-pre>--cluster-replicas 1</code> ：指定集群中每个master的副本个数为1，此时<code v-pre>节点总数 ÷ (replicas + 1)</code> 得到的就是master的数量。因此节点列表中的前n个就是master，其它节点都是slave节点，随机分配到不同master</li>
</ul>
<p>运行后的样子：</p>
<figure><img src="@source/../assets/redis-advance-sharded-cluster/2023-06-27-22-23-28.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>这里输入yes，则集群开始创建：</p>
<figure><img src="@source/../assets/redis-advance-sharded-cluster/2023-06-27-22-23-12.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>通过命令可以查看集群状态：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>redis-cli <span class="token parameter variable">-p</span> <span class="token number">7001</span> cluster nodes
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="@source/../assets/redis-advance-sharded-cluster/2023-06-27-22-22-54.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h3 id="测试" tabindex="-1"><a class="header-anchor" href="#测试" aria-hidden="true">#</a> 测试</h3>
<p>尝试连接7001节点，存储一个数据：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 连接</span>
redis-cli <span class="token parameter variable">-p</span> <span class="token number">7001</span>
<span class="token comment"># 存储数据</span>
<span class="token builtin class-name">set</span> num <span class="token number">123</span>
<span class="token comment"># 读取数据</span>
get num
<span class="token comment"># 再次存储</span>
<span class="token builtin class-name">set</span> a <span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>结果悲剧了：</p>
<figure><img src="@source/../assets/redis-advance-sharded-cluster/2023-06-27-22-22-08.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>集群操作时，需要给<code v-pre>redis-cli</code>加上<code v-pre>-c</code>参数才可以：</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>redis-cli <span class="token parameter variable">-c</span> <span class="token parameter variable">-p</span> <span class="token number">7001</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这次可以了：</p>
<figure><img src="@source/../assets/redis-advance-sharded-cluster/2023-06-27-22-21-27.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h2 id="散列插槽" tabindex="-1"><a class="header-anchor" href="#散列插槽" aria-hidden="true">#</a> 散列插槽</h2>
<p>Redis 会把每一个 master 节点映射到 0~16383 共 16384 个插槽（hash slot）上，查看集群信息时就能看到：</p>
<p>数据 key 不是与节点绑定，而是与插槽绑定。Redis 会根据 key 的有小部分计算插槽值，分两种情况：</p>
<ul>
<li>key 中包含 <code v-pre>{}</code> ，且<code v-pre>{}</code>中至少包含 1 个字符，<code v-pre>{}</code>中的部分是有效部分</li>
<li>key 中不包含 <code v-pre>{}</code>，整个 key 都是有效部分</li>
</ul>
<p>::: 例如<br>
key 是 num，那么就根据 num 计算，如果是 {itcast}num，则根据 itcast 计算。计算方式是利用 CRC16 算法得到一个 hash 值，然后对 16384 取余，得到的结果就是 slot 值。<br>
:::</p>
<p><strong>Redis如何判断某个 key 应该在哪个实例？</strong></p>
<ul>
<li>将 16384 个插槽分配到不同的实例</li>
<li>根据 key 的有效部分计算哈希值，对 16384 取余</li>
<li>余数作为插槽，寻找插槽所在实例即可</li>
</ul>
<p><strong>如何将同一类数据固定的保存在同一个 Redis 实例？</strong></p>
<ul>
<li>这一类数据使用相同的有效部分，例如 key 都以 { typeid } 为前缀</li>
</ul>
<h2 id="集群伸缩" tabindex="-1"><a class="header-anchor" href="#集群伸缩" aria-hidden="true">#</a> 集群伸缩</h2>
<p>集群伸缩就是集群节点能够动态的增加和减少，并且在集群伸缩的同时，也伴随着槽位及槽位中数据在节点之间的移动。</p>
<p>redis-cli --cluster 提供了很多操作集群的命令，可以通过<code v-pre>redis-cli --cluster help</code>指令查看。</p>
<p><strong>向集群中添加一个新 master 节点，并存储 num = 1000 ：</strong></p>
<ol>
<li>启动一个新的 Redis 实例，端口为 7004</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 创建实例目录</span>
<span class="token function">mkdir</span> <span class="token number">7004</span>
<span class="token comment"># 创建 redis 服务</span>
<span class="token function">sed</span> <span class="token parameter variable">-i</span> s/6379/7004/g <span class="token number">7004</span>/redis.conf
<span class="token comment"># 运行 redis 服务</span>
redis-server <span class="token number">7004</span>/redis.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2">
<li>添加 7004 到之前的集群，并作为一个 master 节点</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>redis-cli <span class="token parameter variable">--cluster</span> add-node <span class="token number">192.168</span>.150.101:7004 <span class="token number">192.168</span>.150.101:7001
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="3">
<li>给 7004 节点分配插槽，使得 num 这个 key 可以存储到 7004 实例</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># 重新分片</span>
redis-cli <span class="token parameter variable">--cluster</span> reshard <span class="token number">192.168</span>.150.101:7001
<span class="token comment"># 移动 3000 个插槽</span>
How many slots <span class="token keyword">do</span> you want to move <span class="token punctuation">(</span>from <span class="token number">1</span> to <span class="token number">16384</span><span class="token punctuation">)</span>? <span class="token number">3000</span>
<span class="token comment"># 接收插槽的 ID</span>
What is the receiving <span class="token function">node</span> ID? 「这里输入 <span class="token number">7001</span> 的 ID 即可」
<span class="token comment"># 使用 done 结束</span>
<span class="token comment"># 是否确认移动</span>
Do you want to proceed with the proposed rehard plan <span class="token punctuation">(</span>yes/no<span class="token punctuation">)</span>? <span class="token function">yes</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="故障转移" tabindex="-1"><a class="header-anchor" href="#故障转移" aria-hidden="true">#</a> 故障转移</h2>
<p>当集群中有一个 master 宕机会发生什么？</p>
<ol>
<li>
<p>首先是该实例与其他实例失去连接</p>
</li>
<li>
<p>然后是疑似宕机</p>
</li>
<li>
<p>最后是确定下线，自动提升一个 slave 为新的 master</p>
</li>
</ol>
<blockquote>
<p>这里选取 slave 的方式是根据 offset 偏移量和 id 进行筛选</p>
</blockquote>
<p><strong>数据迁移</strong></p>
<p>利用 cluster failover 命令可以手动让集群中的某个 master 宕机，切换到执行 cluster failover 命令的这个 slave 节点，实现无感知的数据迁移。具体的流程如下：</p>
<figure><img src="@source/../assets/redis-advance-sharded-cluster/2023-06-29-17-47-24.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>手动的 Failover 支持三种不同模式：</p>
<ul>
<li>缺省：默认的流程</li>
<li>force：省略的对 offset 的一致性校验</li>
<li>takeover：直接执行第 5 步，忽略数据一致性、忽略 master 状态和其他 master 的意见</li>
</ul>
<h2 id="redistemplate访问分片集群" tabindex="-1"><a class="header-anchor" href="#redistemplate访问分片集群" aria-hidden="true">#</a> RedisTemplate访问分片集群</h2>
<p>RedisTemplate 底层同样基于 lettuce 实现了分片集群的支持，而使用的步骤与哨兵模式基本一致：</p>
<ol>
<li>
<p>引入 redis 的 starter 依赖</p>
</li>
<li>
<p>配置分片集群地址</p>
</li>
<li>
<p>配置读写分离</p>
</li>
</ol>
<p>与哨兵模式相比，其中只有分片集群的配置方式略有差异，如下:</p>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">redis</span><span class="token punctuation">:</span>
    <span class="token key atrule">cluster</span><span class="token punctuation">:</span>
      <span class="token key atrule">nodes</span><span class="token punctuation">:</span>    <span class="token comment"># 指定分片集群的每一个节点信息</span>
        <span class="token punctuation">-</span> 192.168.150.101<span class="token punctuation">:</span><span class="token number">7001</span>
        <span class="token punctuation">-</span> 192.168.150.101<span class="token punctuation">:</span><span class="token number">7002</span>
        <span class="token punctuation">-</span> 192.168.150.101<span class="token punctuation">:</span><span class="token number">7003</span>
        <span class="token punctuation">-</span> 192.168.150.101<span class="token punctuation">:</span><span class="token number">8001</span>
        <span class="token punctuation">-</span> 192.168.150.101<span class="token punctuation">:</span><span class="token number">8002</span>
        <span class="token punctuation">-</span> 192.168.150.101<span class="token punctuation">:</span><span class="token number">8003</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


