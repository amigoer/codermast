<template><div><h1 id="第二章-线性表" tabindex="-1"><a class="header-anchor" href="#第二章-线性表" aria-hidden="true">#</a> 第二章 线性表</h1>
<h2 id="_2-1线性表的定义和基本操作" tabindex="-1"><a class="header-anchor" href="#_2-1线性表的定义和基本操作" aria-hidden="true">#</a> 2.1线性表的定义和基本操作</h2>
<h3 id="_2-1-1定义" tabindex="-1"><a class="header-anchor" href="#_2-1-1定义" aria-hidden="true">#</a> 2.1.1定义</h3>
<p>线性表是具有相同数据类型的n个数据元素的有限集序列，其中n为表长，当n=0时线性表是一个空表。若用L命名线性表，其一般表示为：L = ( a<sub>1</sub> ,a<sub>2</sub> ,...,a<sub>i</sub> ,a<sub>i+1</sub> ,...,a<sub>n</sub> )</p>
<h3 id="_2-1-2基本操作" tabindex="-1"><a class="header-anchor" href="#_2-1-2基本操作" aria-hidden="true">#</a> 2.1.2基本操作</h3>
<ul>
<li><code v-pre>InitList(&amp;L)</code>:初始化表，构造一个空的线性表。</li>
<li><code v-pre>Length(L)</code>:求表长，返回线性表L的长度，即L中元素的个数。</li>
<li><code v-pre>LocateElem(L,e)</code>:按值查找操作，在表L中查找具有给定关键字值的元素。</li>
<li><code v-pre>GetElem(L,i)</code>:按位查找操作。获取表L中第i个位置的数据元素的值。</li>
<li><code v-pre>ListInsert(&amp;L,i,e)</code>:插入操作，在表L中的第i个位置上插入指定的元素e.</li>
<li><code v-pre>ListDelete(&amp;L,i,&amp;e)</code>:删除操作，删除表L中的第i个位置的元素，并用e返回删除元素的值。</li>
<li><code v-pre>PrintList(L)</code>:输出操作，按前后顺序输出线性表L的所有元素值。</li>
<li><code v-pre>Empty(L)</code>:判空操作，若L表为空，则返回True，否则返回false。</li>
<li><code v-pre>DestroyList(&amp;L)</code>:销毁操作，销毁线性表，并释放线性表L所占用的内存空间。</li>
</ul>
<h2 id="_2-2线性表的顺序表示" tabindex="-1"><a class="header-anchor" href="#_2-2线性表的顺序表示" aria-hidden="true">#</a> 2.2线性表的顺序表示</h2>
<h2 id="_2-3线性表的链式表示" tabindex="-1"><a class="header-anchor" href="#_2-3线性表的链式表示" aria-hidden="true">#</a> 2.3线性表的链式表示</h2>
</div></template>


