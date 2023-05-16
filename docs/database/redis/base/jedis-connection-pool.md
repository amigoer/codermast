---
order : 10
---
# Redis入门 - Jedis连接池

Jedis本身是线程不安全的，并且频繁的创建和销毁连接会有性能损耗，因此我们使用Jedis连接池代替Jedis的直接连接方式。

- 配置Jedis连接池

```java
public class JedisConnectionFactory{
    private static final JedisPool jedisPool;

    static {
        JedisPoolConfig jedisPollConfig = new JedisPoolConfig();

        // 最大连接，这里设置为 8
        jedisPollConfig.setMaxTotal(8);
        // 最大空闲连接，这里设置为 8
        jedisPollConfig.setMaxIdle(8);
        // 最小空闲连接，这里设置为 0 
        jedisPollConfig.setMaxIdle(0);
        // 设置最长等待时间，单位 ms
        jedisPollConfig.setMaxWaitMillis(200);

        jedisPool = new JedisPool(jedisPoolConfig,"192.168.100.100",6379,1000,"codermast");
    }

    // 获取Jedis对象
    public static Jedis getJedis(){
        return jedisPool.getResource();
    }
}
```