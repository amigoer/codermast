---
 order : 9
---
# Redis入门 - Jdies快速入门

## 简介

Jedis is a Java client for Redis designed for performance and ease of use.

Jedis是Redis 的 Java 客户端，专为性能和易用性而设计。

## 官方地址

Jedis的官方地址：https://github.com/redis/jedis

## 快速入门

1. 新建一个Maven工程并引入以下依赖

```xml
<!--引入Jedis依赖-->
<dependency>
    <groupId>redis.clients</groupId>
    <artifactId>jedis</artifactId>
    <version>4.2.0</version>
</dependency>

<!--引入单元测试依赖-->
<dependency>
    <groupId>org.junit.jupiter</groupId>
    <artifactId>junit-jupiter</artifactId>
    <version>5.8.2</version>
    <scope>test</scope>
</dependency>
```

2. 编写测试类并与Redis建立连接
```java
private Jedis jedis;

@BeforeEach //被该注解修饰的方法每次执行其他方法前自动执行
void setUp(){
    // 1. 获取连接
    jedis = new Jedis("192.168.230.88",6379);
    // 2. 设置密码
    jedis.auth("codermast");
    // 3. 选择库（默认是下标为0的库）
    jedis.select(0);
}
```
3. 编写一个操作数据的方法（这里以操作String类型为例）

```java
@Test
public void testString(){
    // 1.往redis中存放一条String类型的数据并获取返回结果
    String result = jedis.set("url", "https://www.codermast.com");
    System.out.println("result = " + result);

    // 2.从redis中获取一条数据
    String url = jedis.get("url");
    System.out.println("url = " + url);
}
```
4. 最后编写一个释放资源的方法

```java
    @AfterEach //被该注解修饰的方法会在每次执行其他方法后执行
    void tearDown(){
        // 1.如果jedis被使用过，则释放资源
        if (jedis != null){
            jedis.close();
        }
    }
```
5. 执行testString()方法后测试结果。

```
result = OK
url = https://www.codermast.com
```
