<template><div><h1 id="redis原理-redis网络模型" tabindex="-1"><a class="header-anchor" href="#redis原理-redis网络模型" aria-hidden="true">#</a> Redis原理 - Redis网络模型</h1>
<p><strong>Redis 到底是单线程还是多线程？</strong></p>
<ul>
<li>如果仅仅针对 Redis 的核心业务部分（命令处理部分），则是单线程</li>
<li>如果针对 Redis 整体，那么就是多线程</li>
</ul>
<p><strong>在 Redis 的版本迭代过程中，在两个重要的时间节点上引入了多线程的支持：</strong></p>
<ul>
<li>Redis v4.0：引入多线程异步处理一些耗时较长的任务，例如异步删除命令 unlike</li>
<li>Redis v6.0：在核心网络模型中引入多线程，进一步提高对多核 CPU 的利用率</li>
</ul>
<p><strong>为什么Redis要选择单线程?</strong></p>
<ul>
<li>抛开持久化不谈，Redis是纯内存操作，执行速度非常快，它的性能瓶颈是网络延迟而不是执行速度，因此多线程并不会带来巨大的性能提升。</li>
<li>多线程会导致过多的上下文切换，带来不必要的开销</li>
<li>引入多线程会面临线程安全问题，必然要引入线程锁这样的安全手段，实现复杂度增高，而且性能也会大打折扣</li>
</ul>
</div></template>


