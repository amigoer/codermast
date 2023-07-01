---
order : 17
---
# Redis进阶 - JVM进程缓存

**传统缓存的问题**

传统的缓存策略一般是请求到达 Tomcat 后，先查询 Redis ，如果未命中则查询数据库，存在下面的问题：

- 请求要经过 Tomcat 处理，Tomcat 的性能成为整个系统的瓶颈
- Redis 缓存失效时，会对数据库产生冲击

![](../../../assets/redis-advance-multi-level-cache/2023-06-29-17-58-08.png)


**多级缓存方案**

多级缓存就是充分利用请求处理的每个环节，分别添加缓存，减轻 Tomcat 压力，提升服务性能：

![](../../../assets/redis-advance-multi-level-cache/2023-06-29-18-03-03.png)




