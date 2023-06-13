<template><div><h1 id="redis入门-redis-stream" tabindex="-1"><a class="header-anchor" href="#redis入门-redis-stream" aria-hidden="true">#</a> Redis入门 - Redis Stream</h1>
<p>Redis Stream 是 Redis 5.0 版本新增加的数据结构。</p>
<p>Redis Stream 主要用于消息队列（MQ，Message Queue），Redis 本身是有一个 Redis 发布订阅 (pub/sub) 来实现消息队列的功能，但它有个缺点就是消息无法持久化，如果出现网络断开、Redis 宕机等，消息就会被丢弃。</p>
<p>简单来说发布订阅 (pub/sub) 可以分发消息，但无法记录历史消息。</p>
<p>而 Redis Stream 提供了消息的持久化和主备复制功能，可以让任何客户端访问任何时刻的数据，并且能记住每一个客户端的访问位置，还能保证消息不丢失。</p>
<p>Redis Stream 的结构如下所示，它有一个消息链表，将所有加入的消息都串起来，每个消息都有一个唯一的 ID 和对应的内容：</p>
<figure><img src="@source/../assets/redis-stream/2023-05-17-01-01-53.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>每个 Stream 都有唯一的名称，它就是 Redis 的 key，在我们首次使用 xadd 指令追加消息时自动创建。</p>
<p>上图解析：</p>
<ul>
<li>Consumer Group ：消费组，使用 XGROUP CREATE 命令创建，一个消费组有多个消费者(Consumer)。</li>
<li>last_delivered_id ：游标，每个消费组会有个游标 last_delivered_id，任意一个消费者读取了消息都会使游标 last_delivered_id 往前移动。</li>
<li>pending_ids ：消费者(Consumer)的状态变量，作用是维护消费者的未确认的 id。 pending_ids 记录了当前已经被客户端读取的消息，但是还没有 ack (Acknowledge character：确认字符）。</li>
</ul>
<p><strong>消息队列相关命令：</strong></p>
<ul>
<li>XADD - 添加消息到末尾</li>
<li>XTRIM - 对流进行修剪，限制长度</li>
<li>XDEL - 删除消息</li>
<li>XLEN - 获取流包含的元素数量，即消息长度</li>
<li>XRANGE - 获取消息列表，会自动过滤已经删除的消息</li>
<li>XREVRANGE - 反向获取消息列表，ID 从大到小</li>
<li>XREAD - 以阻塞或非阻塞方式获取消息列表</li>
</ul>
<p><strong>消费者组相关命令：</strong></p>
<ul>
<li>XGROUP CREATE - 创建消费者组</li>
<li>XREADGROUP GROUP - 读取消费者组中的消息</li>
<li>XACK - 将消息标记为&quot;已处理&quot;</li>
<li>XGROUP SETID - 为消费者组设置新的最后递送消息ID</li>
<li>XGROUP DELCONSUMER - 删除消费者</li>
<li>XGROUP DESTROY - 删除消费者组</li>
<li>XPENDING - 显示待处理消息的相关信息</li>
<li>XCLAIM - 转移消息的归属权</li>
<li>XINFO - 查看流和消费者组的相关信息；</li>
<li>XINFO GROUPS - 打印消费者组的信息；</li>
<li>XINFO STREAM - 打印流信息</li>
</ul>
<h2 id="xadd" tabindex="-1"><a class="header-anchor" href="#xadd" aria-hidden="true">#</a> XADD</h2>
<p>使用 XADD 向队列添加消息，如果指定的队列不存在，则创建一个队列，XADD 语法格式：</p>
<p><code v-pre>XADD key ID field value [field value ...]</code></p>
<ul>
<li>key ：队列名称，如果不存在就创建</li>
<li>ID ：消息 id，我们使用 * 表示由 redis 生成，可以自定义，但是要自己保证递增性。</li>
<li>field value ： 记录。</li>
</ul>
<h2 id="xtrim" tabindex="-1"><a class="header-anchor" href="#xtrim" aria-hidden="true">#</a> XTRIM</h2>
<p>使用 XTRIM 对流进行修剪，限制长度， 语法格式：</p>
<p><code v-pre>XTRIM key MAXLEN [~] count</code></p>
<ul>
<li>key ：队列名称</li>
<li>MAXLEN ：长度</li>
<li>count ：数量</li>
</ul>
<h2 id="xdel" tabindex="-1"><a class="header-anchor" href="#xdel" aria-hidden="true">#</a> XDEL</h2>
<p>使用 XDEL 删除消息，语法格式：</p>
<p><code v-pre>XDEL key ID [ID ...]</code></p>
<ul>
<li>key：队列名称</li>
<li>ID ：消息 ID</li>
</ul>
<h2 id="xlen" tabindex="-1"><a class="header-anchor" href="#xlen" aria-hidden="true">#</a> XLEN</h2>
<p>使用 XLEN 获取流包含的元素数量，即消息长度，语法格式：</p>
<p><code v-pre>XLEN key</code></p>
<ul>
<li>key：队列名称</li>
</ul>
<h2 id="xrange" tabindex="-1"><a class="header-anchor" href="#xrange" aria-hidden="true">#</a> XRANGE</h2>
<p>使用 XRANGE 获取消息列表，会自动过滤已经删除的消息 ，语法格式：</p>
<p><code v-pre>XRANGE key start end [COUNT count]</code></p>
<ul>
<li>key ：队列名</li>
<li>start ：开始值， - 表示最小值</li>
<li>end ：结束值， + 表示最大值</li>
<li>count ：数量</li>
</ul>
<h2 id="xrevrange" tabindex="-1"><a class="header-anchor" href="#xrevrange" aria-hidden="true">#</a> XREVRANGE</h2>
<p>使用 XREVRANGE 获取消息列表，会自动过滤已经删除的消息 ，语法格式：</p>
<p><code v-pre>XREVRANGE key end start [COUNT count]</code></p>
<ul>
<li>key ：队列名</li>
<li>end ：结束值， + 表示最大值</li>
<li>start ：开始值， - 表示最小值</li>
<li>count ：数量</li>
</ul>
<h2 id="xread" tabindex="-1"><a class="header-anchor" href="#xread" aria-hidden="true">#</a> XREAD</h2>
<p>使用 XREAD 以阻塞或非阻塞方式获取消息列表 ，语法格式：</p>
<p><code v-pre>XREAD [COUNT count] [BLOCK milliseconds] STREAMS key [key ...] id [id ...]</code></p>
<ul>
<li>count ：数量</li>
<li>milliseconds ：可选，阻塞毫秒数，没有设置就是非阻塞模式</li>
<li>key ：队列名</li>
<li>id ：消息 ID</li>
</ul>
<h2 id="xgroup-create" tabindex="-1"><a class="header-anchor" href="#xgroup-create" aria-hidden="true">#</a> XGROUP CREATE</h2>
<p>使用 XGROUP CREATE 创建消费者组，语法格式：</p>
<p><code v-pre>XGROUP [CREATE key groupname id-or-$] [SETID key groupname id-or-$] [DESTROY key groupname] [DELCONSUMER key groupname consumername]</code></p>
<ul>
<li>key ：队列名称，如果不存在就创建</li>
<li>groupname ：组名。</li>
<li>$ ： 表示从尾部开始消费，只接受新消息，当前 Stream 消息会全部忽略。</li>
</ul>
<p><strong>从头开始消费:</strong></p>
<p><code v-pre>XGROUP CREATE mystream consumer-group-name 0-0 </code>
<strong>从尾部开始消费:</strong></p>
<p><code v-pre>XGROUP CREATE mystream consumer-group-name $</code></p>
<h2 id="xreadgroup-group" tabindex="-1"><a class="header-anchor" href="#xreadgroup-group" aria-hidden="true">#</a> XREADGROUP GROUP</h2>
<p>使用 XREADGROUP GROUP 读取消费组中的消息，语法格式：</p>
<p><code v-pre>XREADGROUP GROUP group consumer [COUNT count] [BLOCK milliseconds] [NOACK] STREAMS key [key ...] ID [ID ...]</code></p>
<ul>
<li>group ：消费组名</li>
<li>consumer ：消费者名。</li>
<li>count ： 读取数量。</li>
<li>milliseconds ： 阻塞毫秒数。</li>
<li>key ： 队列名。</li>
<li>ID ： 消息 ID。
<code v-pre>XREADGROUP GROUP consumer-group-name consumer-name COUNT 1 STREAMS mystream &gt;</code></li>
</ul>
</div></template>


