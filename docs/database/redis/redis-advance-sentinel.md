---
order : 15
---
# Redis进阶 - Redis哨兵

::: warning 思考
slave 节点宕机恢复以后可以找 master 节点同步数据，那么 master 节点宕机怎么办？
:::

## 哨兵的作用和工作原理

### 哨兵的作用

Redis 提供了哨兵（Sentinel）机制来实现主从集群的自动故障恢复。哨兵的结构和作用如下：

![](../../../assets/redis-advance-sentinel/2023-06-26-23-47-32.png)

- **监控**：Sentinel 会不断检查您的 master 和 slave 是否按照预期工作
- **自动故障恢复**：如果 master 故障，Sentinel 会将一个 slave 提升为 master 。当故障实例恢复后也以新的 master 为主
- **通知**：Sentinel 充当 Redis 客户端的服务发现来源，当集群发生故障转移时，会将最新信息推送给 Redis 的客户端

### 服务状态监控

Sentinel 基于心跳机制监测服务状态，每隔 1 秒向集群的每个实例发送 ping 命令：

- 主观下线：如果某 Sentinel 节点发现某实例未在规定时间响应，则认为该实例主观下线。

- 客观下线：若超过指定数量（quorum）的 sentinel 都认为该实例主观下线，则该实例客观下线。quorum 值最好超过 Sentinel 实例数量的一半。

![](../../../assets/redis-advance-sentinel/2023-06-26-23-56-21.png)


### 选举新的master

一旦发现master 故障，sentinel 需要在 slave 中选择一个作为新的 master ，选择依据是这样：

- 首先会判断 slave 节点与 master 节点断开的时间长短，如果超过指定值（down-after-milliseconds * 10）则会排除该 slave 节点

- 然后判断 slave 节点的 slave-priority值，越小优先级越高，如果是 0 则永不参与选举

- 如果 slave-prority 一样，则判断 slave 节点的 offset 值，越大则说明数据越新，优先级越高

- 最后是判断 slave 节点的运行 id 大小，越小优先级越高


### 实现故障转移

当选中了其中一个 slave 为新的 master 后（例如slave1），故障转移的步骤如下：

1. sentinel 给备选的 slave1 节点发送 slaveof no one 命令，让该节点成为 master

2. sentinel 给所有其他 slave 发送 slaveof 192.168.150.101 7002 命令，让这些 slave 成为新 master 的从节点，开始从新的 master 上同步数据。

3. 最后 sentinel 将故障节点标记为 slave，当故障节点恢复后会自动成为新的 master 的 slave 节点

![](../../../assets/redis-advance-sentinel/2023-06-27-00-11-32.png)

### 小结

**Sentinel 的三个作用是什么？**

- 监控
- 故障转移
- 通知

**Sentinel 如何判断一个 Redis 实例是否健康？**

- 每隔 1 秒发送一次 ping 命令，如果超过一定时间没有相向则认为是主观下线

- 如果大多数 sentinel 都认为实例主观下线，则判定服务下线

**故障转移步骤有哪些？**

- 首先选定一个 slave 作为新的 master，执行 slaveof no one
- 然后让所有节点都执行 slaveof 新master
- 修改故障节点配置，添加 slaveof 新master

## 搭建哨兵集群


## RedisTemplate连接集群