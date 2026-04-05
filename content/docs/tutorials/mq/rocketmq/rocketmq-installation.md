---
title: "RocketMQ 安装部署"
---

# RocketMQ 安装部署

## Docker 安装（推荐）

```yaml
version: '3'
services:
  namesrv:
    image: apache/rocketmq:5.1.3
    container_name: rmqnamesrv
    ports:
      - "9876:9876"
    command: sh mqnamesrv
    environment:
      - JAVA_OPT_EXT=-Xms256m -Xmx256m

  broker:
    image: apache/rocketmq:5.1.3
    container_name: rmqbroker
    ports:
      - "10909:10909"
      - "10911:10911"
      - "10912:10912"
    depends_on:
      - namesrv
    command: sh mqbroker -n namesrv:9876
    environment:
      - JAVA_OPT_EXT=-Xms512m -Xmx512m

  dashboard:
    image: apacherocketmq/rocketmq-dashboard:latest
    container_name: rocketmq-dashboard
    ports:
      - "8080:8080"
    depends_on:
      - namesrv
    environment:
      - JAVA_OPTS=-Drocketmq.namesrv.addr=namesrv:9876
```

启动：

```bash
docker-compose up -d
```

访问管理界面：`http://localhost:8080`

## Linux 安装

```bash
# 下载
wget https://dist.apache.org/repos/dist/release/rocketmq/5.1.3/rocketmq-all-5.1.3-bin-release.zip
unzip rocketmq-all-5.1.3-bin-release.zip
cd rocketmq-all-5.1.3-bin-release

# 启动 NameServer
nohup sh bin/mqnamesrv &
tail -f ~/logs/rocketmqlogs/namesrv.log

# 启动 Broker
nohup sh bin/mqbroker -n localhost:9876 &
tail -f ~/logs/rocketmqlogs/broker.log

# 关闭
sh bin/mqshutdown broker
sh bin/mqshutdown namesrv
```

## 常用命令

```bash
# 创建 Topic
sh bin/mqadmin updateTopic -n localhost:9876 -t TestTopic -c DefaultCluster

# 查看 Topic 列表
sh bin/mqadmin topicList -n localhost:9876

# 查看消费进度
sh bin/mqadmin consumerProgress -n localhost:9876 -g test-consumer-group

# 按消息 ID 查询
sh bin/mqadmin queryMsgById -n localhost:9876 -i <msgId>
```

## Broker 配置

常用配置 `broker.conf`：

```properties
brokerName=broker-a
brokerClusterName=DefaultCluster
brokerRole=ASYNC_MASTER          # ASYNC_MASTER, SYNC_MASTER, SLAVE
flushDiskType=ASYNC_FLUSH        # ASYNC_FLUSH, SYNC_FLUSH
namesrvAddr=localhost:9876
listenPort=10911
storePathRootDir=/data/rocketmq/store
fileReservedTime=48              # 消息保留时间（小时）
```
