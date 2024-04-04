---
order : 7
---
# Set - HashSet源码解析

::: tip 写在前面
本篇主要是对 Java 中 HashSet 的源码解析，在 Java 中这两种的实现方式是类似的，HashSet 的底层存储还是使用的 HashMap，仅仅通过方法的包装来实现 Set 接口，故本篇不再赘述 HashMap 的底层存储逻辑，详情请看[《Map - HashMap源码解析》](https://www.codermast.com/java/collection/map-hashmap.html)。
:::

## 介绍

