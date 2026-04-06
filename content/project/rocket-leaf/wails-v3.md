---
title: Wails v3 入门
description: Wails v3 的核心概念、Service 绑定机制，以及 Rocket-Leaf 是如何用它把 Go 后端和 React 前端打通的。
---

## 为什么选 Wails 而不是 Electron

|  | Electron | Wails v3 |
| -- | -------- | -------- |
| 后端语言 | Node.js | Go |
| 体积 | ~100MB 起 | 单二进制，通常 10~20MB |
| 内存 | 100MB+ | 数十 MB |
| WebView | 内置 Chromium | 系统 WebView（macOS WebKit / Win WebView2 / Linux WebKitGTK） |
| 前后端通信 | `ipcMain.handle` / `ipcRenderer.invoke` 手写桥接 | 结构体方法自动生成 TS 绑定 |

Wails 用 Go 的并发能力来处理业务逻辑，UI 由前端 WebView 渲染，两者之间的 RPC **完全由 Wails CLI 自动生成**，不需要手写任何消息协议。

## 核心概念

### Application

`application.New(options)` 创建一个 App 实例，是一切的入口：

```go
// main.go
app := application.New(application.Options{
    Name:        "rocket-leaf",
    Description: "RocketMQ 跨平台轻量级管理客户端",
    Services: []application.Service{
        application.NewService(connectionService),
        application.NewService(clusterService),
        // ...
    },
    Assets: application.AssetOptions{
        Handler: application.AssetFileServerFS(assets),
    },
})
```

### Service

Service 是**被前端直接调用的 Go 对象**。Wails 会反射每个 service 的公开方法，生成对应的 TypeScript 绑定。Rocket-Leaf 注册了 7 个 service：

```go
Services: []application.Service{
    application.NewService(connectionService), // 连接管理
    application.NewService(clusterService),    // 集群状态
    application.NewService(topicService),      // Topic 管理
    application.NewService(consumerService),   // 消费者组
    application.NewService(messageService),    // 消息查询
    application.NewService(settingsService),   // 设置
    application.NewService(aclService),        // ACL 管理
},
```

::note{title="命名约定"}
Go 里导出的方法必须首字母大写；生成的 TS 绑定保留原名。因此前端调用 `ConnectionService.GetConnections()`，后端就必须写 `func (s *ConnectionService) GetConnections()`。
::

### Assets

前端打包产物通过 Go 的 `embed` 包嵌入到二进制里，这样最终只输出**一个可执行文件**：

```go
//go:embed all:frontend/dist
var assets embed.FS
```

`all:` 前缀告诉 embed 包括所有文件（包括 `_` 或 `.` 开头的）。Wails 启动时把这份 `fs.FS` 作为 WebView 的资源根目录。

## Rocket-Leaf 的启动流程

```mermaid
flowchart TD
  Start[main()] --> Init[init() 初始化加密密钥]
  Init --> NewServices[实例化 7 个 Service]
  NewServices --> SetInit[设置默认连接懒加载器]
  SetInit --> NewApp[application.New]
  NewApp --> Register[注册 Services / Assets]
  Register --> Run[app.Run 启动窗口]
  Run --> Loop[事件循环]
```

关键代码（节选）：

```go
func init() {
    // 1. 先初始化加密密钥（后续 service 读取配置时需要）
    configDir, _ := os.UserConfigDir()
    crypto.InitKey(filepath.Join(configDir, "rocket-leaf"))

    // 2. 实例化 service，注意依赖顺序
    settingsService = service.NewSettingsService()
    connectionService = service.NewConnectionService(settingsService)
    clusterService = service.NewClusterService(connectionService, settingsService)
    // ...

    // 3. 把"连接默认客户端"的能力注入到 ClientManager
    rocketmq.GetClientManager().
        SetDefaultClientInitializer(connectionService.ConnectDefault)
}
```

::note{title="为什么用 init()"}
`init()` 里完成"无侧效的初始化"（加载配置、密钥、实例化 service），`main()` 里只负责 Wails 生命周期。这样即使有多个 `main` 包也能复用 `init` 的逻辑；也让 `main()` 的代码更聚焦于窗口与事件。
::

## 前端调用后端

自动生成的绑定文件位于 `frontend/bindings/rocket-leaf/internal/service/`。前端再做一层封装：

```ts
// frontend/src/api/connection.ts
import * as ConnectionService from '../../bindings/rocket-leaf/internal/service/connectionservice.js'

export async function getConnections(): Promise<(Connection | null)[]> {
  try {
    return await ConnectionService.GetConnections()
  } catch (e) {
    console.error('GetConnections', e)
    throw e
  }
}
```

为什么还要再包一层？原因有三：

1. **统一错误处理**：所有 API 调用都走相同的 `try/catch` + 日志逻辑
2. **简化命名**：`import * as` 保留了 Go 的命名风格，再包一层可以导出更符合 JS 习惯的 `camelCase`
3. **方便 mock**：测试时只需替换 `api/*`，不用碰 bindings

## 自动生成 vs 手写契约

Wails 的 bindings **不需要手动维护**。每次 `wails3 dev` 都会重新生成；你新增一个 Go 方法，几秒后前端就能直接调用：

```go
// 只要在 service 上加方法
func (s *ConnectionService) Ping(id int) (string, error) {
    return "pong", nil
}
```

```ts
// 前端立即可用，且类型签名自动推导
import * as ConnectionService from '.../connectionservice.js'
const resp: string = await ConnectionService.Ping(1)
```

相比之下，Electron 里你要手写 `ipcMain.handle('ping', ...)`、再在前端 `ipcRenderer.invoke('ping', 1)`，还要自己定义类型。

## 常见问题

::note{title="如何在 Go 里给前端推送事件"}
Wails 提供 `app.Events.Emit(name, data)` 和前端侧的 `Events.On(name, cb)` 做双向事件。Rocket-Leaf 暂时没用到，但连接状态变化是个典型场景：连接断开时 emit 一次，前端立刻感知并刷新状态。
::

::note{title="方法返回 error 会怎么样"}
Go 侧返回 `(T, error)` 时，错误会在前端以 `Promise.reject` 抛出。所以前端 `try/catch` 就能拿到。Rocket-Leaf 的 `api/*` 层用 `console.error` 统一打点。
::

下一章我们深入 service 分层，看看业务层是怎么组织的。
