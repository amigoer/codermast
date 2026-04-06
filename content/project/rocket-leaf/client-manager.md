---
title: RocketMQ 客户端管理器
description: AdminClientManager 的多客户端池、默认连接懒加载、自动重连重试的设计与实现。
---

## 为什么需要一个 Manager

Rocket-Leaf 支持同时配置**多个 RocketMQ 集群**，用户随时切换。如果每次业务调用都 `admin.NewClient(...)`，会有两个问题：

1. **连接开销高**：NameServer 握手、路由拉取都不便宜，频繁建连会让 UI 卡顿
2. **难以管理生命周期**：切换集群时要显式关闭旧连接，否则连接泄露

所以需要一个**带缓存、带生命周期管理的 Client 池**。

## 数据结构

```go
type AdminClientManager struct {
    mu                       sync.RWMutex
    clients                  map[string]*admin.Client // key: NameServer 地址
    defaultConn              string                   // 默认连接的 NameServer 地址
    defaultClientInitializer func() error             // 默认连接懒初始化器
}

var clientManager = &AdminClientManager{
    clients: make(map[string]*admin.Client),
}

func GetClientManager() *AdminClientManager {
    return clientManager
}
```

关键字段：

- `clients` 按 NameServer 地址缓存客户端，同一个地址永远只有一个活跃连接
- `defaultConn` 记录当前默认连接，避免每次查询都去遍历 map
- `defaultClientInitializer` 是一个**回调函数**，由 `ConnectionService` 注入，实现懒加载

## 创建连接

```go
func (m *AdminClientManager) CreateClient(nameServer string, timeout time.Duration,
    enableACL bool, accessKey, secretKey string) (*admin.Client, error) {
    m.mu.Lock()
    defer m.mu.Unlock()

    // 如果已存在，先关闭旧客户端（避免重复连接）
    if oldClient, exists := m.clients[nameServer]; exists {
        oldClient.Close()
    }

    options := []admin.Option{
        admin.WithNameServers([]string{nameServer}),
        admin.WithTimeout(timeout),
    }
    if enableACL {
        if strings.TrimSpace(accessKey) == "" || strings.TrimSpace(secretKey) == "" {
            return nil, fmt.Errorf("启用 ACL 时 AccessKey/SecretKey 不能为空")
        }
        options = append(options, admin.WithACL(accessKey, secretKey))
    }

    client, err := admin.NewClient(options...)
    if err != nil {
        return nil, fmt.Errorf("创建客户端失败: %w", err)
    }
    if err := client.Start(); err != nil {
        return nil, fmt.Errorf("启动客户端失败: %w", err)
    }

    // 关键：验证连接可用性
    ctx, cancel := context.WithTimeout(context.Background(), timeout)
    defer cancel()
    if _, err := client.ExamineBrokerClusterInfo(ctx); err != nil {
        client.Close()
        return nil, fmt.Errorf("无法连接到 NameServer: %w", err)
    }

    log.Printf("[ClientManager] 连接 NameServer 成功: %s", nameServer)
    m.clients[nameServer] = client
    return client, nil
}
```

几个细节值得注意：

### 1. 覆盖式替换

如果同一个 NameServer 已经有客户端，先 `Close()` 再创建新的。这样调用方可以**无脑调用 `CreateClient`** 来"重连"，不需要自己先判断再删除。

### 2. 同步验证连接

`admin.NewClient` + `Start()` 只是初始化，**不代表能连上**。真正检验网络的是 `ExamineBrokerClusterInfo`：

```go
if _, err := client.ExamineBrokerClusterInfo(ctx); err != nil {
    client.Close()  // 关键：验证失败要清理资源
    return nil, fmt.Errorf("无法连接到 NameServer: %w", err)
}
```

对用户而言，"连接成功"的定义就是**能拿到集群信息**。把这一步提前到 `CreateClient` 里，后续业务操作就不会再在意"到底连上了没"。

### 3. 错误包装

`fmt.Errorf("...: %w", err)` 使用 `%w` 占位符保留原始 error 链，调用方可以用 `errors.Is` / `errors.As` 去判断底层错误类型。

## 懒加载默认连接

Rocket-Leaf 启动时**不立刻**连接任何集群。如果每次开启 App 都要等待几秒网络握手，体验会很差。

懒加载通过一个回调函数实现：

```go
// main.go 中注入
rocketmq.GetClientManager().
    SetDefaultClientInitializer(connectionService.ConnectDefault)
```

`ConnectDefault` 会：

1. 读取本地配置里 `IsDefault == true` 的连接
2. 调用 `CreateClient` 建立连接
3. 通过 `SetDefaultConnection` 把默认连接标记过去

### 触发时机

业务 service 需要客户端时，调用的是 `GetDefaultClient`：

```go
func (m *AdminClientManager) GetDefaultClient() (*admin.Client, error) {
    m.mu.RLock()
    defaultConn := m.defaultConn
    client, exists := m.clients[defaultConn]
    initializer := m.defaultClientInitializer
    m.mu.RUnlock()

    // 场景一：已经有客户端，直接返回
    if defaultConn != "" && exists {
        return client, nil
    }

    // 场景二：还没初始化，调用 initializer
    if initializer != nil {
        if err := initializer(); err != nil {
            return nil, fmt.Errorf("初始化默认连接失败: %w", err)
        }
        m.mu.RLock()
        defaultConn = m.defaultConn
        client, exists = m.clients[defaultConn]
        m.mu.RUnlock()
        if defaultConn != "" && exists {
            return client, nil
        }
    }

    if defaultConn == "" {
        return nil, fmt.Errorf("未设置默认连接")
    }
    return nil, fmt.Errorf("默认连接客户端不存在: %s", defaultConn)
}
```

::note{title="依赖反转"}
这里是典型的**依赖反转**：`rocketmq` 包本身**不知道** `ConnectionService` 的存在，它只是持有一个 `func() error` 回调。`main.go` 在启动阶段把 `ConnectionService.ConnectDefault` 塞进去，完成了运行时的依赖装配。

好处：`rocketmq` 包可以独立测试、独立复用，而不会被业务逻辑污染。
::

### 锁的使用

`GetDefaultClient` 在读-写-再读的过程中**不能一直持有写锁**，否则 `initializer` 内部再加写锁会自锁。所以代码的模式是：

1. `RLock()` 读状态 → `RUnlock()`
2. 在锁外调用 `initializer()`
3. 再 `RLock()` 读一次状态

这是多线程代码里常见的"double-checked locking"变体。

## 测试连接

`TestConnection` 用来在用户点击"测试"按钮时做一次性的连通性检查，**不会**把客户端缓存下来：

```go
func (m *AdminClientManager) TestConnection(...) error {
    // ... options ...
    client, err := admin.NewClient(options...)
    if err != nil {
        return fmt.Errorf("创建测试客户端失败: %w", err)
    }
    defer client.Close()  // 注意：用完就关

    if err := client.Start(); err != nil {
        return fmt.Errorf("启动测试客户端失败: %w", err)
    }

    ctx, cancel := context.WithTimeout(context.Background(), timeout)
    defer cancel()

    _, err = client.ExamineBrokerClusterInfo(ctx)
    return err
}
```

`defer client.Close()` 确保无论成功失败都会释放资源。这是 Go 里资源清理的标准写法。

## 自动重连重试

RocketMQ 的长连接偶尔会被 NAT、防火墙、Broker 重启等因素切断。Rocket-Leaf 用一个通用的 `executeWithClientRetry` 函数处理这种场景：

```go
// internal/service/client_retry.go
func executeWithClientRetry(client *admin.Client, call func(*admin.Client) error) error {
    err := call(client)
    if err == nil {
        return nil
    }
    if !isRetryableNetworkError(err) {
        return err  // 非网络错误，直接返回
    }

    manager := rocketmq.GetClientManager()
    defaultNameServer := strings.TrimSpace(manager.GetDefaultConnection())
    if defaultNameServer == "" {
        return err
    }

    log.Printf("[Service] 检测到连接异常，准备重连默认连接并重试: %v", err)

    // 移除旧默认客户端，触发后续懒加载重新建立连接
    manager.RemoveClient(defaultNameServer)

    retryClient, reconnectErr := manager.GetDefaultClient()
    if reconnectErr != nil {
        return fmt.Errorf("请求失败: %w；自动重连失败: %v", err, reconnectErr)
    }

    return call(retryClient)
}
```

### 网络错误识别

没有通用的错误类型可以表示"连接断了"，只能按关键字匹配：

```go
func isRetryableNetworkError(err error) bool {
    if err == nil {
        return false
    }
    errMsg := strings.ToLower(err.Error())
    indicators := []string{
        "broken pipe",
        "connection reset by peer",
        "use of closed network connection",
        "connection refused",
        "no route to host",
        "network is unreachable",
        "i/o timeout",
        "eof",
        "发送数据失败",
        "所有 nameserver 请求失败",
    }
    for _, indicator := range indicators {
        if strings.Contains(errMsg, indicator) {
            return true
        }
    }
    return false
}
```

::warning{title="字符串匹配的代价"}
按错误消息匹配的做法不够严谨 —— 上游库改动错误文案就会悄悄失效。更健壮的方式是 `errors.As` 到具体的 `*net.OpError` 等结构体。这里用字符串匹配是为了兼容 `rocketmq-admin-go` 里包装过的中文错误，是一种工程取舍。
::

### 调用方式

业务 service 调用时只要包一层：

```go
func (s *TopicService) GetTopics() ([]*model.Topic, error) {
    client, err := rocketmq.GetClientManager().GetDefaultClient()
    if err != nil {
        return nil, err
    }
    var topics []*model.Topic
    err = executeWithClientRetry(client, func(c *admin.Client) error {
        result, cErr := c.FetchAllTopicList(context.Background())
        if cErr != nil {
            return cErr
        }
        topics = convertTopics(result)
        return nil
    })
    return topics, err
}
```

- `executeWithClientRetry` 只尝试**一次**重连，避免出现无限重试
- 重连后用的是**新的 client**，旧的 client 在 `RemoveClient` 里已经被 `Close()`
- 非网络错误（例如权限不足、参数错误）会**直接**返回，不浪费一次重连

## 关闭资源

```go
func (m *AdminClientManager) CloseAll() {
    m.mu.Lock()
    defer m.mu.Unlock()
    for nameServer, client := range m.clients {
        client.Close()
        delete(m.clients, nameServer)
    }
    m.defaultConn = ""
}
```

应用退出时调用 `CloseAll`，确保所有 goroutine 正常结束、TCP 连接被释放。这一步在桌面应用里很容易被忽略，但对保持良好的系统状态很重要。

## 设计小结

| 问题 | 解决思路 |
| ---- | -------- |
| 多集群切换 | 按 NameServer 地址的客户端池 |
| 启动慢 | 默认连接懒加载，首次访问时才连 |
| 连接验证 | `CreateClient` 里同步调用 `ExamineBrokerClusterInfo` |
| 依赖方向 | `rocketmq` 不依赖 service，通过回调注入 |
| 线程安全 | `sync.RWMutex`，注意锁外调用 initializer |
| 连接断线 | `executeWithClientRetry` 按错误文本识别 + 单次重连 |
| 资源泄露 | 覆盖时 `Close`，失败时 `Close`，退出时 `CloseAll` |

下一章看敏感信息加密存储的实现。
