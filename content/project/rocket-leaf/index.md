---
title: 项目简介
description: Rocket-Leaf 是一款基于 Wails v3 构建的跨平台 RocketMQ 桌面管理客户端，Go 后端 + React 前端。本文档系列拆解它的架构与关键实现。
---

## 这是什么

[Rocket-Leaf](https://github.com/amigoer/rocket-leaf) 是一款用来管理 RocketMQ 集群的**本地桌面应用**，无需部署 Web 控制台或暴露管理端口，就能查看 Topic、消费者组、查询消息、发送测试消息以及观察集群健康状况。

- **开箱即用**：下载即可运行，支持 Windows / macOS / Linux
- **本地优先**：连接配置保存在本机，敏感字段加密存储
- **一体化打包**：Go 后端 + React 前端通过 Wails v3 打包成单一可执行文件

## 技术栈

| 层 | 技术选型 |
| -- | -------- |
| 桌面框架 | [Wails v3](https://wails.io/)（Go + 原生 WebView） |
| 后端语言 | Go 1.25 |
| RocketMQ 交互 | [amigoer/rocketmq-admin-go](https://github.com/amigoer/rocketmq-admin-go)、[apache/rocketmq-client-go](https://github.com/apache/rocketmq-client-go) |
| 前端框架 | React 19 + TypeScript + Vite |
| UI | TailwindCSS + shadcn/ui 风格组件 |
| 本地加密 | AES-256-GCM + SHA-256 字段派生密钥 |
| 构建 | Taskfile + Wails CLI |

## 为什么写这篇文档

Rocket-Leaf 整个项目涵盖了不少值得学习的工程实践：

1. **Wails v3 桌面开发**：Go 结构体直接绑定到前端调用，告别传统 Electron 的 IPC 样板代码
2. **服务层分层设计**：`model` / `rocketmq` / `service` 清晰分层，可复用的 RocketMQ 客户端管理器
3. **敏感信息加密落盘**：通过派生字段密钥对 AccessKey/SecretKey 做透明加解密，且兼容历史明文数据
4. **连接断线自动重试**：根据错误关键字识别网络断连，自动触发重连并重放请求
5. **React + 自动生成绑定**：前端调用后端时有完整的 TypeScript 类型，无需手写 RPC 契约

这套文档会按照"整体架构 → Wails v3 入门 → 后端分层 → 关键细节 → 前端结构"的顺序拆解，便于按需跳读。

## 文档索引

::card-group
::card{title="项目架构"}
从最上层视角看整个工程的目录布局、数据流向与核心模块划分。
::

::card{title="Wails v3 入门"}
介绍 Wails v3 的核心概念、Service 绑定机制与前端调用方式。
::

::card{title="后端分层设计"}
`model / rocketmq / service` 三层的职责与依赖关系，以及为什么这样拆。
::

::card{title="RocketMQ 客户端管理器"}
多 NameServer 客户端池、懒加载默认连接、自动重连的实现细节。
::

::card{title="连接信息加密存储"}
AES-256-GCM + 字段级密钥派生的实现，如何兼容历史明文数据。
::

::card{title="前端结构与类型绑定"}
React + Vite 目录结构、Wails 生成的 TS 绑定如何串联前后端。
::
::

## 如何使用这份文档

- 只想**复习**：挑选感兴趣的章节直接跳读，每篇都有可独立阅读的完整上下文
- 想**动手跑起来**：直接去 [GitHub 仓库](https://github.com/amigoer/rocket-leaf) 看 README，或从 [Releases](https://github.com/codermast/rocket-leaf/releases) 下载现成的二进制
- 想**改造一个自己的版本**：建议按文档顺序读完，再从 `main.go` 的 `init` 入手跟踪服务初始化链路
