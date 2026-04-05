---
title: "RocketMQ 客户端使用"
---

# RocketMQ 客户端使用

## Go 客户端

### 安装

```bash
go get github.com/apache/rocketmq-client-go/v2
```

### 生产者

```go
package main

import (
    "context"
    "fmt"
    "github.com/apache/rocketmq-client-go/v2"
    "github.com/apache/rocketmq-client-go/v2/primitive"
    "github.com/apache/rocketmq-client-go/v2/producer"
)

func main() {
    p, _ := rocketmq.NewProducer(
        producer.WithNameServer([]string{"localhost:9876"}),
        producer.WithGroupName("go-producer-group"),
    )
    p.Start()
    defer p.Shutdown()

    msg := &primitive.Message{
        Topic: "TestTopic",
        Body:  []byte("Hello RocketMQ"),
    }
    msg.WithTag("TagA")

    result, err := p.SendSync(context.Background(), msg)
    if err != nil {
        fmt.Printf("发送失败: %v\n", err)
        return
    }
    fmt.Printf("发送成功: %s\n", result.MsgID)
}
```

### 消费者

```go
package main

import (
    "context"
    "fmt"
    "github.com/apache/rocketmq-client-go/v2"
    "github.com/apache/rocketmq-client-go/v2/consumer"
    "github.com/apache/rocketmq-client-go/v2/primitive"
    "os"
    "os/signal"
    "syscall"
)

func main() {
    c, _ := rocketmq.NewPushConsumer(
        consumer.WithNameServer([]string{"localhost:9876"}),
        consumer.WithGroupName("go-consumer-group"),
    )

    c.Subscribe("TestTopic", consumer.MessageSelector{},
        func(ctx context.Context, msgs ...*primitive.MessageExt) (consumer.ConsumeResult, error) {
            for _, msg := range msgs {
                fmt.Printf("收到消息: %s\n", string(msg.Body))
            }
            return consumer.ConsumeSuccess, nil
        })

    c.Start()
    defer c.Shutdown()

    sig := make(chan os.Signal, 1)
    signal.Notify(sig, syscall.SIGINT, syscall.SIGTERM)
    <-sig
}
```

### 顺序消息

```go
// 发送 - 相同 orderId 发到同一 Queue
selector := producer.NewHashQueueSelector()
result, _ := p.SendSync(context.Background(), msg,
    producer.WithQueueSelector(selector),
    producer.WithShardingKey(orderId))

// 消费 - 开启顺序消费
c, _ := rocketmq.NewPushConsumer(
    consumer.WithNameServer([]string{"localhost:9876"}),
    consumer.WithGroupName("order-consumer-group"),
    consumer.WithConsumerOrder(true),
)
```

### 延迟消息

```go
msg := &primitive.Message{
    Topic: "DelayTopic",
    Body:  []byte("延迟消息"),
}
// 延迟级别：1s 5s 10s 30s 1m 2m 3m 4m 5m 6m 7m 8m 9m 10m 20m 30m 1h 2h
msg.WithDelayTimeLevel(3)  // 10秒后投递
p.SendSync(context.Background(), msg)
```

### 事务消息

```go
type TransactionListener struct{}

func (t *TransactionListener) ExecuteLocalTransaction(msg *primitive.Message) primitive.LocalTransactionState {
    // 执行本地事务
    if doLocalTransaction() {
        return primitive.CommitMessageState
    }
    return primitive.RollbackMessageState
}

func (t *TransactionListener) CheckLocalTransaction(msg *primitive.MessageExt) primitive.LocalTransactionState {
    // 回查本地事务状态
    if checkTransactionStatus(msg.GetKeys()) {
        return primitive.CommitMessageState
    }
    return primitive.RollbackMessageState
}

// 创建事务生产者
p, _ := rocketmq.NewTransactionProducer(
    &TransactionListener{},
    producer.WithNameServer([]string{"localhost:9876"}),
    producer.WithGroupName("tx-producer-group"),
)
p.Start()
p.SendMessageInTransaction(context.Background(), msg)
```

---

## Java 客户端

### 依赖

```xml
<dependency>
    <groupId>org.apache.rocketmq</groupId>
    <artifactId>rocketmq-client</artifactId>
    <version>5.1.3</version>
</dependency>
```

### 生产者

```java
DefaultMQProducer producer = new DefaultMQProducer("producer-group");
producer.setNamesrvAddr("localhost:9876");
producer.start();

Message msg = new Message("TestTopic", "TagA", "Hello".getBytes());
SendResult result = producer.send(msg);
System.out.println(result.getMsgId());

producer.shutdown();
```

### 消费者

```java
DefaultMQPushConsumer consumer = new DefaultMQPushConsumer("consumer-group");
consumer.setNamesrvAddr("localhost:9876");
consumer.subscribe("TestTopic", "*");

consumer.registerMessageListener((MessageListenerConcurrently) (msgs, context) -> {
    for (MessageExt msg : msgs) {
        System.out.println(new String(msg.getBody()));
    }
    return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
});

consumer.start();
```

---

## Spring Boot

### 依赖

```xml
<dependency>
    <groupId>org.apache.rocketmq</groupId>
    <artifactId>rocketmq-spring-boot-starter</artifactId>
    <version>2.2.3</version>
</dependency>
```

### 配置

```yaml
rocketmq:
  name-server: localhost:9876
  producer:
    group: my-producer-group
```

### 生产者

```java
@Autowired
private RocketMQTemplate rocketMQTemplate;

// 同步发送
rocketMQTemplate.syncSend("TestTopic", message);

// 延迟发送
rocketMQTemplate.syncSend("TestTopic", msg, 3000, delayLevel);

// 顺序发送
rocketMQTemplate.syncSendOrderly("TestTopic", message, hashKey);
```

### 消费者

```java
@Component
@RocketMQMessageListener(topic = "TestTopic", consumerGroup = "spring-consumer-group")
public class SimpleConsumer implements RocketMQListener<String> {
    @Override
    public void onMessage(String message) {
        System.out.println("收到消息: " + message);
    }
}

// 顺序消费
@RocketMQMessageListener(
    topic = "OrderTopic",
    consumerGroup = "order-consumer-group",
    consumeMode = ConsumeMode.ORDERLY
)
```

---

## 发送方式对比

| 方式         | 可靠性 | 性能 | 适用场景     |
| :----------- | :----- | :--- | :----------- |
| **同步发送** | 高     | 一般 | 重要业务消息 |
| **异步发送** | 高     | 好   | 响应时间敏感 |
| **单向发送** | 低     | 最好 | 日志收集     |
