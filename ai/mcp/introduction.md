---
title: "MCP 概述"
description: "Model Context Protocol 协议概述：架构、核心概念、应用场景"
---

## 什么是 MCP

MCP（Model Context Protocol，模型上下文协议）是由 Anthropic 于 2024 年 11 月正式发布的一项开放标准协议。它的核心目标是 **标准化 AI 模型与外部工具、数据源之间的交互方式**，就像 USB-C 统一了各种设备的充电和数据传输接口一样，MCP 为 AI 应用提供了统一的"插件协议"。

在 MCP 出现之前，每个 AI 应用想要接入外部工具（如数据库、文件系统、API 服务等），都需要开发者为每个工具单独编写集成代码。这导致了大量的重复工作和碎片化的生态。

<Note>
MCP 是一个开放协议，不局限于 Claude 或 Anthropic 的产品。任何 AI 模型和应用都可以实现 MCP 协议来获得统一的工具调用能力。
</Note>

## 为什么需要 MCP

### 传统方式的痛点

在没有 MCP 之前，AI 应用接入外部工具通常面临以下问题：

| 问题 | 描述 |
|------|------|
| **N x M 集成问题** | N 个 AI 应用要接入 M 个工具，需要 N x M 个适配器 |
| **重复开发** | 每个应用都需要独立实现工具调用逻辑 |
| **缺乏标准** | 不同应用的工具接口格式各不相同 |
| **维护困难** | 工具 API 变更时需要更新所有接入方 |
| **安全性参差不齐** | 各实现的安全机制和权限控制不统一 |

### MCP 的解决方案

MCP 将 N x M 的问题简化为 N + M：

```
传统方式：                     MCP 方式：
AI App 1 ──→ Tool A           AI App 1 ──┐
AI App 1 ──→ Tool B                       ├──→ MCP ──→ Tool A (MCP Server)
AI App 2 ──→ Tool A                       │           Tool B (MCP Server)
AI App 2 ──→ Tool B           AI App 2 ──┘           Tool C (MCP Server)
AI App 1 ──→ Tool C
AI App 2 ──→ Tool C
```

每个工具只需实现一次 MCP Server，每个 AI 应用只需实现一次 MCP Client，即可实现全面互通。

## 架构设计

MCP 采用经典的 **客户端-服务器（Client-Server）** 架构，包含三个核心角色：

### Host（宿主应用）

Host 是面向用户的 AI 应用程序，比如 Claude Desktop、Cursor、VS Code 等。Host 负责：

- 管理 MCP Client 的生命周期
- 控制权限和安全策略
- 提供用户交互界面
- 协调 AI 模型与 MCP Client 之间的通信

### Client（客户端）

Client 由 Host 创建，负责与 MCP Server 建立一对一的连接。Client 的职责包括：

- 与 Server 进行协议协商（capability negotiation）
- 转发请求和响应
- 管理通信会话

### Server（服务器）

Server 是工具和数据的提供方，向 Client 暴露特定的能力。每个 Server 通常专注于一个特定的领域，例如文件系统操作、数据库查询、Git 操作等。

```
┌─────────────────────────────────────────┐
│              Host (AI 应用)               │
│                                         │
│  ┌──────────┐  ┌──────────┐             │
│  │ MCP      │  │ MCP      │   AI Model  │
│  │ Client A │  │ Client B │   ◄──────►  │
│  └────┬─────┘  └────┬─────┘             │
└───────┼──────────────┼──────────────────┘
        │              │
        ▼              ▼
  ┌──────────┐   ┌──────────┐
  │ MCP      │   │ MCP      │
  │ Server A │   │ Server B │
  │ (文件系统)│   │ (数据库)  │
  └──────────┘   └──────────┘
```

## 核心概念

MCP 协议定义了四种核心原语（Primitives），用于描述 Server 可以提供的能力：

### Resources（资源）

Resources 是 Server 暴露给 Client 的数据内容，类似于 REST API 中的 GET 端点。资源使用 URI 进行标识，可以包含文本或二进制数据。

```json
{
  "uri": "file:///home/user/documents/report.pdf",
  "name": "年度报告",
  "mimeType": "application/pdf",
  "description": "2024 年度销售报告"
}
```

资源的特点：
- **只读性**：资源用于向模型提供上下文信息
- **URI 标识**：每个资源都有唯一的 URI
- **支持订阅**：Client 可以订阅资源变化通知

### Tools（工具）

Tools 是 Server 暴露的可执行功能，类似于 REST API 中的 POST 端点。工具是 MCP 中最核心的能力，允许 AI 模型通过 Server 执行具体操作。

```json
{
  "name": "query_database",
  "description": "执行 SQL 查询并返回结果",
  "inputSchema": {
    "type": "object",
    "properties": {
      "sql": {
        "type": "string",
        "description": "要执行的 SQL 语句"
      },
      "database": {
        "type": "string",
        "description": "目标数据库名称"
      }
    },
    "required": ["sql"]
  }
}
```

<Warning>
Tools 的调用通常需要用户确认（Human-in-the-loop），因为工具操作可能会对外部系统产生实际影响，比如写入数据库、发送邮件等。
</Warning>

### Prompts（提示词模板）

Prompts 是 Server 预定义的可复用提示词模板，帮助用户更高效地与 AI 交互。

```json
{
  "name": "code_review",
  "description": "代码审查提示词模板",
  "arguments": [
    {
      "name": "language",
      "description": "编程语言",
      "required": true
    },
    {
      "name": "code",
      "description": "需要审查的代码",
      "required": true
    }
  ]
}
```

### Sampling（采样）

Sampling 允许 Server 反向请求 Client（通过 Host）调用 AI 模型来完成推理任务。这使得 MCP Server 可以实现更复杂的 AI 代理工作流。

```
Server ──请求采样──→ Client ──调用模型──→ AI Model
                                           │
Server ◄──返回结果──  Client ◄──模型响应──┘
```

<Tip>
Sampling 是 MCP 协议中较为高级的特性。在大多数场景下，使用 Resources 和 Tools 就足以满足需求。
</Tip>

## 通信机制

MCP 基于 **JSON-RPC 2.0** 协议进行消息传递，支持两种传输方式：

### stdio（标准输入输出）

适用于本地运行的 MCP Server。Client 通过启动子进程的方式运行 Server，利用标准输入（stdin）和标准输出（stdout）进行通信。

**优点：**
- 配置简单，无需网络
- 安全性高，通信不经过网络
- 适合本地开发和桌面应用

**适用场景：** Claude Desktop、Cursor 等本地 AI 应用

### HTTP + SSE（Streamable HTTP）

适用于远程部署的 MCP Server。Client 通过 HTTP 请求发送消息，Server 通过 Server-Sent Events（SSE）推送响应和通知。

**优点：**
- 支持远程部署
- 可以多个 Client 连接同一个 Server
- 适合云端服务和团队共享

**适用场景：** 远程 MCP Server、企业级部署

```python
# stdio 传输示例配置
{
    "mcpServers": {
        "filesystem": {
            "command": "npx",
            "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/dir"]
        }
    }
}

# HTTP + SSE 传输示例配置
{
    "mcpServers": {
        "remote-server": {
            "url": "http://localhost:8080/mcp"
        }
    }
}
```

## MCP 与 Function Calling 的比较

很多开发者会将 MCP 与大模型的 Function Calling 能力进行比较。它们虽然目标相似，但定位不同：

| 维度 | Function Calling | MCP |
|------|-----------------|-----|
| **定位** | 模型能力 | 应用层协议 |
| **标准化** | 各模型厂商格式不同 | 统一开放标准 |
| **工具发现** | 需要手动在 prompt 中声明 | 动态发现服务器能力 |
| **生态复用** | 每次都需重新实现 | 一次实现，到处复用 |
| **通信方式** | 通过 API 调用 | 支持 stdio / HTTP 多种传输 |
| **能力范围** | 仅限工具调用 | 资源、工具、提示词、采样 |
| **安全控制** | 应用自行实现 | 协议层面的权限机制 |

<Note>
MCP 和 Function Calling 并不冲突。实际上，MCP 可以看作是 Function Calling 的上层标准化封装。AI 模型在 MCP 流程中仍然使用 Function Calling 的能力来决定调用哪个工具。
</Note>

## 生态与应用

MCP 发布以来，已经获得了广泛的行业支持：

### 已支持 MCP 的 AI 应用

- **Claude Desktop** - Anthropic 官方桌面客户端，最早支持 MCP
- **Cursor** - AI 代码编辑器，深度集成 MCP
- **VS Code (GitHub Copilot)** - 通过 Copilot 扩展支持 MCP
- **Windsurf** - AI 编程助手
- **Zed** - 现代代码编辑器
- **Continue** - 开源 AI 编码助手

### 官方和社区 MCP Server

Anthropic 及社区已经提供了大量开箱即用的 MCP Server：

| Server | 功能 |
|--------|------|
| `@modelcontextprotocol/server-filesystem` | 文件系统操作 |
| `@modelcontextprotocol/server-github` | GitHub API 操作 |
| `@modelcontextprotocol/server-postgres` | PostgreSQL 数据库查询 |
| `@modelcontextprotocol/server-slack` | Slack 消息管理 |
| `@modelcontextprotocol/server-memory` | 知识图谱记忆 |
| `@modelcontextprotocol/server-puppeteer` | 浏览器自动化 |

<Tip>
你可以在 [MCP Server Registry](https://github.com/modelcontextprotocol/servers) 找到更多社区贡献的 MCP Server，也可以开发自己的 Server 贡献给社区。
</Tip>

## 对开发者的意义

### 工具开发者

如果你是工具或服务的开发者，实现一个 MCP Server 意味着你的工具可以被所有支持 MCP 的 AI 应用无缝使用，大幅扩大了工具的用户群。

### AI 应用开发者

如果你在构建 AI 应用，只需实现一次 MCP Client，即可接入整个 MCP 生态中的所有工具，无需为每个工具单独开发适配层。

### 最终用户

用户可以通过简单的配置文件，为自己的 AI 助手添加各种能力，而无需等待应用开发者逐一集成。

## 快速体验

最快速体验 MCP 的方式是使用 Claude Desktop 配合社区 MCP Server。编辑 Claude Desktop 的配置文件：

**macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`

**Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/Users/yourname/Documents"
      ]
    }
  }
}
```

重启 Claude Desktop 后，你就可以让 Claude 直接读取和操作你指定目录中的文件了。

## 下一步

了解了 MCP 的基本概念后，你可以继续深入学习：

- **MCP Server 开发** - 学习如何开发自己的 MCP Server，暴露自定义的工具和资源
- **MCP Client 开发** - 学习如何在自己的 AI 应用中集成 MCP Client
