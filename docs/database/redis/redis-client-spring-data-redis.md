---
order : 11
---
# Redis客户端 - SpringDataRedis

## 介绍

SpringData 是 Spring 中操作数据的模块，包含对各种数据库的集成，其中对 Redis 的集成模块就叫做 SpringDataRedis，官网地址：https://spring.io/prohects/spring-data-redis

- 提供了对不同 Redis 客户端的整合 （Lettuce 和 Jedis）
- 提供了 RedisTemplate 统一 API 来操作Redis
- 支持 Redis 的发布订阅模型
- 支持 Redis 哨兵和 Redis 集群
- 支持基于 Lettuce 的响应式编程
- 支持基于 JDK、JSON、字符串、Spring对象的数据序列化和反序列化
- 支持基于 Redis 的 JDKCollection 实现

## 操作API

SpringDataRedis 中提供了 RedisTemplate 工具类，其中封装了各种对 Redis 的操作。并且将不同数据类型的操作API封装到了不同的类型中：

|API|返回值类型|说明|
|:---:|:---:|:---:|
|`redisTemplate.opsForValue()`|`ValueOperations`|操作`String`类型数据|
|`redisTemplate.opsForHash()`|`HashOperations`|操作`Hash`类型数据|
|`redisTemplate.opsForList()`|`ListOperations`|操作`List`类型数据|
|`redisTemplate.opsForSet()`|`SetOperations`|操作`Set`类型数据|
|`redisTemplate.opsForZSet()`|`ZSetOperations`|操作`SortedSet`类型数据|
|`redisTemplate`||通用命令|

::: tip 使用说明
我们在操作对应的 Redis 数据时，根据数据类型的不同获取对应的操作对象，如操作 String 类型时，则调用 `redisTemplate.opsForValue()` 方法，获取一个 `ValueOperations` 对象，来操作 `String` 类型的数据。
:::

## Spring Boot 中使用

1. 引入依赖
```xml
<!--Redis依赖-->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>

<!--连接池依赖-->
<dependency>
    <groupId>org.apache.commons<groupId>
    <artifactId>commons-pool2</artifactId>
</dependency>
```

2. 配置文件

```yml
spring :
  redis :
      host : 192.168.100.100
      port : 6379
      password : codermast
      lettuce : 
        pool : 
          max-active : 8 # 最大的连接数
          max-idle : 8   # 最大空闲连接
          min-idle : 0   # 最小空闲连接
          max-wait : 100 # 连接等待时间
```

3. 获取 RedisTemplate 对象

```java
@Autowired
private RedisTemplate redisTemplate;
```
> 在 Spring Boot 框架中，使用自动注入获取对象

4. 编写测试类

```java
@SpringBootTest
public class RedisTest {

    @Autowired
    private RedisTemplate redisTemplate;

    @Test
    void testString(){
        // 插入一条 String 类型的数据
        redisTemplate.opsForValue().set("name","codermast");

        // 获取一条 String 类型的数据
        Object name = redisTemplate.opsForValue().get("name");

        System.out.println("我的名字是：" + name);
    }
}
```

5. 运行查看结果

```text
我的名字是：codermast
```