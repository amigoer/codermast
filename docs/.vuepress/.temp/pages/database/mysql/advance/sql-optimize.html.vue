<template><div><h1 id="sql优化" tabindex="-1"><a class="header-anchor" href="#sql优化" aria-hidden="true">#</a> SQL优化</h1>
<h2 id="insert优化" tabindex="-1"><a class="header-anchor" href="#insert优化" aria-hidden="true">#</a> insert优化</h2>
<h3 id="批量插入" tabindex="-1"><a class="header-anchor" href="#批量插入" aria-hidden="true">#</a> 批量插入</h3>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">insert</span> <span class="token keyword">into</span> table_name <span class="token keyword">values</span> <span class="token punctuation">(</span>values_list<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>一次性可以插入多个数据，来减少多次请求带来的性能消耗，但是一次性插入的数据量不建议超过500-1000条。</p>
<h3 id="手动提交事务" tabindex="-1"><a class="header-anchor" href="#手动提交事务" aria-hidden="true">#</a> 手动提交事务</h3>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">start</span> <span class="token keyword">transaction</span><span class="token punctuation">;</span>
<span class="token keyword">insert</span> <span class="token keyword">into</span> table_name <span class="token keyword">values</span> <span class="token punctuation">(</span>values_list1<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">insert</span> <span class="token keyword">into</span> table_name <span class="token keyword">values</span> <span class="token punctuation">(</span>values_list2<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">insert</span> <span class="token keyword">into</span> table_name <span class="token keyword">values</span> <span class="token punctuation">(</span>values_list3<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">commit</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在多次数据插入时，可以手动开启事务，将数据分组提交。</p>
<h3 id="主键顺序插入" tabindex="-1"><a class="header-anchor" href="#主键顺序插入" aria-hidden="true">#</a> 主键顺序插入</h3>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>主键乱序：8 5 3 6 9 4 2 1 7 10
主键有序：1 2 3 4 5 6 7 8 9 10
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container info">
<p class="hint-container-title">提示</p>
<p>主键有序插入比主键乱序插入的速度要快，这是由于MySQL底层的数据结构造成的，我们在下一章节的主键优化里详细说明。</p>
</div>
<h3 id="大批量数据插入" tabindex="-1"><a class="header-anchor" href="#大批量数据插入" aria-hidden="true">#</a> 大批量数据插入</h3>
<p>如果一次性需要插入大量的数据，使用insert语句插入的性能不高，此时可以使用MySQL提供的load指令进行插入。</p>
<p>load指令可以将文件内的数据，一次性加载进数据库内。</p>
<p>具体操作如下：</p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token comment">-- 客户端连接服务端时，加上参数 --local-infile</span>
mysql <span class="token comment">--local-infile -u root -p</span>
<span class="token comment">-- 设置全局参数为local_infile = 1，开启从本地加载文件导入数据库的开关</span>
<span class="token keyword">set</span> <span class="token keyword">global</span> local_infile <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token comment">-- 执行load指令，将准备好的数据加载到数据表内</span>
<span class="token keyword">load</span> <span class="token keyword">data</span> <span class="token keyword">local</span> <span class="token keyword">infile</span> <span class="token string">'file_path'</span> <span class="token keyword">into</span> <span class="token keyword">table</span> <span class="token identifier"><span class="token punctuation">`</span>table_name<span class="token punctuation">`</span></span> <span class="token keyword">fields</span> <span class="token keyword">terminated</span> <span class="token keyword">by</span> <span class="token string">'split_char'</span> <span class="token keyword">lines</span> <span class="token keyword">terminated</span> <span class="token keyword">by</span> <span class="token string">'line_break'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container note">
<p class="hint-container-title">参数说明</p>
<ul>
<li>file_path : 存储数据文件的路径地址</li>
<li>table_name : 要插入数据的数据表名称</li>
<li>split_char : 行内数据字段分隔符号</li>
<li>line_break : 换行分隔符，即以什么标准判断数据行之间的分隔。</li>
</ul>
</div>
<h2 id="primery-key优化" tabindex="-1"><a class="header-anchor" href="#primery-key优化" aria-hidden="true">#</a> primery key优化</h2>
<h3 id="数据的组织方式" tabindex="-1"><a class="header-anchor" href="#数据的组织方式" aria-hidden="true">#</a> 数据的组织方式</h3>
<p>在InnoDB存储引擎中，表数据都是根据主键顺序组织存放的，这种存储方式的表称为索引组织表（index organized table IOT）。</p>
<p>而InnoDB存储引擎中，默认的聚集索引就是主键索引。</p>
<figure><img src="@source/../assets/sql-optimize/2023-04-14-10-17-09.png" alt="逻辑存储结构" tabindex="0" loading="lazy"><figcaption>逻辑存储结构</figcaption></figure>
<div class="hint-container info">
<p class="hint-container-title">参数说明</p>
<ul>
<li>TableSpace：表空间，内存储的是segment段</li>
<li>Segment：段，其存储的是extent区</li>
<li>Extent：区，其存储的是page页【固定1M】</li>
<li>Page：页，其内存储的是row行【固定16k】</li>
<li>Row：行，其内存储的是数据行
这里的Extent和Page的空间大小是固定的，每个Extent区占据1M，每个Page页占据16K，则一个extent内包含了64个page</li>
</ul>
</div>
<h3 id="页分裂" tabindex="-1"><a class="header-anchor" href="#页分裂" aria-hidden="true">#</a> 页分裂</h3>
<p>页可以为空，也可以填充一半，也可以填充100%。每个页包含了 2 - N 行数据，如果一行的数据过大，会行溢出，根据主键排序。</p>
<p>我们分别从 主键顺序插入 和 主键乱序插入 这两个角度来探究这个问题：</p>
<ul>
<li>
<p>主键顺序插入
主键顺序插入数据，由于数据在页内存储会根据主键排序，那么此时所有的数据在页内都会顺序排列，页内剩余空间不足时，则开启下一个页，尽可能的保证了空间的利用率。也不存在数据的移动问题。</p>
</li>
<li>
<p>主键乱序插入
同理，数据按主键排序，那么在主键乱序插入一组数据以后，此时页内的数据是有序的，但是如果下一次想要插入的数据主键不为最大值，那么此时需要将数据插入到页中，而不是直接添加到页尾，则此时需要进行数据的移动。</p>
</li>
</ul>
<figure><img src="@source/../assets/sql-optimize/2023-04-14-10-29-31.png" alt="主键乱序插入" tabindex="0" loading="lazy"><figcaption>主键乱序插入</figcaption></figure>
<ol>
<li>先开启一个新的数据页，page3
<img src="@source/../assets/sql-optimize/2023-04-14-10-34-34.png" alt="开辟新的数据页" loading="lazy"></li>
<li>将page1中50%的位置，将后半段数据移动到page3
<img src="@source/../assets/sql-optimize/2023-04-14-10-35-08.png" alt="移动page1中一半的数据" loading="lazy"></li>
<li>将主键为50的这行数据，插入到page3的末尾。
<img src="@source/../assets/sql-optimize/2023-04-14-10-32-55.png" alt="将数据插入到page3末尾" loading="lazy"></li>
<li>由于要保证page之间有序，还需要调整页间指针的方向，调整为 page1 -&gt; page3 -&gt; page2
<img src="@source/../assets/sql-optimize/2023-04-14-10-33-44.png" alt="调整页间指针" loading="lazy"></li>
<li>此时则完成了数据的插入。</li>
</ol>
<div class="hint-container tip">
<p class="hint-container-title">小知识</p>
<p>我们将这种页面分裂的现象，叫做页分裂。那么在插入时会伴随页分裂，则相同的在数据删除时，就会出现页合并。</p>
</div>
<h3 id="页合并" tabindex="-1"><a class="header-anchor" href="#页合并" aria-hidden="true">#</a> 页合并</h3>
<p>当删除一行记录时，实际上并没有将记录值物理删除，只是记录被标记（flaged）为删除并且他的空间变得允许被其他记录值重新声明。当页中删除的记录达到MERGE_THRESHOLD(默认为页的50%)，innoDB会开始寻找最靠近的页（前或后）看看是否可以将两个页合并以优化空间使用。</p>
<div class="hint-container info">
<p class="hint-container-title">小贴士</p>
<p>MERGE_THRESHOLD：合并页的阀值，可以自己设置，在创建表或者创建索引时指定。</p>
</div>
<h3 id="主键设计原则" tabindex="-1"><a class="header-anchor" href="#主键设计原则" aria-hidden="true">#</a> 主键设计原则</h3>
<ul>
<li>满足业务需求的情况下，尽量降低主键的长度。</li>
<li>插入数据时，尽量使用顺序插入，选择使用AUTO_INCREMENT自增主键。</li>
<li>尽量不要使用UUID做主键或者是其他自然主键，如身份证号。</li>
<li>业务操作时避免对主键的修改。</li>
</ul>
<h2 id="order-by优化" tabindex="-1"><a class="header-anchor" href="#order-by优化" aria-hidden="true">#</a> order by优化</h2>
<h2 id="group-by优化" tabindex="-1"><a class="header-anchor" href="#group-by优化" aria-hidden="true">#</a> group by优化</h2>
<h2 id="limit优化" tabindex="-1"><a class="header-anchor" href="#limit优化" aria-hidden="true">#</a> limit优化</h2>
<h2 id="count优化" tabindex="-1"><a class="header-anchor" href="#count优化" aria-hidden="true">#</a> count优化</h2>
<h2 id="update优化" tabindex="-1"><a class="header-anchor" href="#update优化" aria-hidden="true">#</a> update优化</h2>
</div></template>


