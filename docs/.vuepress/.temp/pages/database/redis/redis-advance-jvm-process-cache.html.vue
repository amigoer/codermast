<template><div><h1 id="redis进阶-jvm进程缓存" tabindex="-1"><a class="header-anchor" href="#redis进阶-jvm进程缓存" aria-hidden="true">#</a> Redis进阶 - JVM进程缓存</h1>
<p><strong>传统缓存的问题</strong></p>
<p>传统的缓存策略一般是请求到达 Tomcat 后，先查询 Redis ，如果未命中则查询数据库，存在下面的问题：</p>
<ul>
<li>请求要经过 Tomcat 处理，Tomcat 的性能成为整个系统的瓶颈</li>
<li>Redis 缓存失效时，会对数据库产生冲击</li>
</ul>
<figure><img src="@source/../assets/redis-advance-multi-level-cache/2023-06-29-17-58-08.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p><strong>多级缓存方案</strong></p>
<p>多级缓存就是充分利用请求处理的每个环节，分别添加缓存，减轻 Tomcat 压力，提升服务性能：</p>
<figure><img src="@source/../assets/redis-advance-multi-level-cache/2023-06-29-18-03-03.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
</div></template>


