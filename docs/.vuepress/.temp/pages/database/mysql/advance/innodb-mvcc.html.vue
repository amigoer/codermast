<template><div><h1 id="mvcc多版本并发控制" tabindex="-1"><a class="header-anchor" href="#mvcc多版本并发控制" aria-hidden="true">#</a> MVCC多版本并发控制</h1>
<h2 id="概念介绍" tabindex="-1"><a class="header-anchor" href="#概念介绍" aria-hidden="true">#</a> 概念介绍</h2>
<h3 id="mvcc" tabindex="-1"><a class="header-anchor" href="#mvcc" aria-hidden="true">#</a> MVCC</h3>
<p>MVCC全称为Multi-Version Concurrency Control，多版本并发控制。指维护一个数据的多个版本，使得读写操作没有冲突，快照读为MySQL实现MVCC提供了一个非阻塞读功能。MVCC的具体实现，还需要依赖于数据库记录中的三个隐藏字段、undo log 日志、readView。</p>
<h3 id="当前读" tabindex="-1"><a class="header-anchor" href="#当前读" aria-hidden="true">#</a> 当前读</h3>
<p>读取的是记录的最新版本，读取时还要保证其他并发事务不能修改当前记录，会对读取的记录进行加锁。对于我们日常的操作，如：
select ... lock in share mode （共享锁），select ... for update 、insert、delete（排他锁）都是一种当前读。</p>
<h3 id="快照读" tabindex="-1"><a class="header-anchor" href="#快照读" aria-hidden="true">#</a> 快照读</h3>
<p>简单的select语句（不加锁）就是快照读，快照读读取的是记录数据的可见版本，有可能是历史数据，不加锁，是非阻塞读。</p>
<ul>
<li>Read Commit：每次select，都生成一个快照读。</li>
<li>Repeated Read：开启事务后第一个select语句才是快照读的地方。</li>
<li>Serializable：快照读会退化为当前读。</li>
</ul>
<h2 id="实现原理" tabindex="-1"><a class="header-anchor" href="#实现原理" aria-hidden="true">#</a> 实现原理</h2>
<p>记录中的隐藏字段分别为：DB_TRX_ID、DB_ROLL_PTR、DB_ROW_ID。</p>
<table>
<thead>
<tr>
<th style="text-align:center">隐藏字段</th>
<th style="text-align:center">含义</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">DB_TRX_ID</td>
<td style="text-align:center">最近修改事务的ID，记录插入这条记录或最后一次修改该记录的事务ID</td>
</tr>
<tr>
<td style="text-align:center">DB_ROLL_PTR</td>
<td style="text-align:center">回滚指针，指向这条记录的上一个版本，用于配合undo log，指向上一个版本</td>
</tr>
<tr>
<td style="text-align:center">DB_ROW_ID</td>
<td style="text-align:center">隐藏主键，如果表结构没有指定主键，将会生成该隐藏字段</td>
</tr>
</tbody>
</table>
<div class="hint-container tip">
<p class="hint-container-title">ibd2sdi指令</p>
<p>ibd2sdi指令可以查看ibd文件，语法如下：</p>
<p><code v-pre>ibd2sdi 'filename.ibd'</code></p>
</div>
<h2 id="undo-log" tabindex="-1"><a class="header-anchor" href="#undo-log" aria-hidden="true">#</a> Undo Log</h2>
<p>回滚日志，在insert、update、delete的时候产生的便于数据回滚的日志。</p>
<p>当insert的时候，产生的 undo log 日志只在回滚时需要，在事务提交后，可以被立即删除。</p>
<p>而update、delete的时候，产生的 undo log 日志不仅在回滚时需要，在快照读时也需要，不会立刻被删除。</p>
<h2 id="undo-log-版本链" tabindex="-1"><a class="header-anchor" href="#undo-log-版本链" aria-hidden="true">#</a> Undo Log 版本链</h2>
<p>在并发访问的情况下，有多个事务需要对同一个数据进行操作，此时则在Undo Log 中记录下每一次操作的原数据，作为事务在未提交情况下回滚的依据。</p>
<p>不同事务或者相同事务对同一条数据记录进行操作，会导致该记录的 Undo Log 生成一条记录版本链条，链表的头部是最新的旧数据，链表的尾部是最早的旧数据。</p>
<p>具体的事务回滚，不单单依赖Undo Log，还依靠ReadView。Undo Log记录事务回滚的数据，ReadView决定回滚到哪个链条节点。</p>
<h2 id="readview-读视图" tabindex="-1"><a class="header-anchor" href="#readview-读视图" aria-hidden="true">#</a> ReadView 读视图</h2>
<p>Read View 读视图是快照读SQL执行时MVCC提取数据的依据，记录并维护系统当前活跃的事务（未提交）ID。</p>
<p>ReadView中包含了4个核心字段：</p>
<table>
<thead>
<tr>
<th style="text-align:center">字段</th>
<th style="text-align:center">含义</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">m_ids</td>
<td style="text-align:center">当前活跃的事务ID集合</td>
</tr>
<tr>
<td style="text-align:center">min_trx_id</td>
<td style="text-align:center">最小活跃事务ID</td>
</tr>
<tr>
<td style="text-align:center">max_trx_id</td>
<td style="text-align:center">预分配事务ID，当前最大事务ID+1（因为事务ID是自增的）</td>
</tr>
<tr>
<td style="text-align:center">creator_trx_id</td>
<td style="text-align:center">ReadView创建者的事务ID</td>
</tr>
</tbody>
</table>
</div></template>


