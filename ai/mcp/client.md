---
title: "MCP Client 开发"
description: "MCP Client 开发指南：连接、调用、集成"
---

## 概述

MCP Client 是 AI 应用（Host）与 MCP Server 之间的桥梁。如果你正在构建自己的 AI 应用并希望接入 MCP 生态，就需要实现 MCP Client。本文将详细介绍如何使用 Python 和 TypeScript SDK 开发 MCP Client，以及如何将 MCP 集成到你的 AI 应用中。

## 连接到 MCP Server

### Python Client 基本示例

```python
from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client

async def main():
    # 定义 Server 启动参数
    server_params = StdioServerParameters(
        command="python",
        args=["path/to/server.py"],
        env={"MCP_ROOT_DIR": "/tmp/data"},
    )

    # 建立连接
    async with stdio_client(server_params) as (read, write):
        async with ClientSession(read, write) as session:
            # 初始化连接（协议握手）
            await session.initialize()

            # 现在可以与 Server 交互了
            print("已连接到 MCP Server")
```

<Note>
`session.initialize()` 是必须的第一步调用。在初始化过程中，Client 和 Server 会交换协议版本和能力信息，完成协议握手。
</Note>

### 连接到 HTTP + SSE Server

```python
from mcp import ClientSession
from mcp.client.sse import sse_client

async def connect_remote():
    async with sse_client("http://localhost:8080/mcp") as (read, write):
        async with ClientSession(read, write) as session:
            await session.initialize()
            print("已连接到远程 MCP Server")
```

### TypeScript Client 基本示例

```typescript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const transport = new StdioClientTransport({
  command: "python",
  args: ["path/to/server.py"],
});

const client = new Client({
  name: "my-app",
  version: "1.0.0",
});

await client.connect(transport);
console.log("已连接到 MCP Server");
```

## 发现 Server 能力

连接建立后，Client 可以查询 Server 提供的所有能力：

### 列出可用工具

```python
async with ClientSession(read, write) as session:
    await session.initialize()

    # 获取所有工具列表
    tools_result = await session.list_tools()

    for tool in tools_result.tools:
        print(f"工具: {tool.name}")
        print(f"  描述: {tool.description}")
        print(f"  参数: {tool.inputSchema}")
        print()
```

### 列出可用资源

```python
    # 获取所有资源列表
    resources_result = await session.list_resources()

    for resource in resources_result.resources:
        print(f"资源: {resource.name} ({resource.uri})")
        print(f"  描述: {resource.description}")
        print(f"  类型: {resource.mimeType}")
```

### 列出提示词模板

```python
    # 获取所有提示词模板
    prompts_result = await session.list_prompts()

    for prompt in prompts_result.prompts:
        print(f"提示词: {prompt.name}")
        print(f"  描述: {prompt.description}")
        print(f"  参数: {prompt.arguments}")
```

## 调用工具

工具调用是 MCP Client 最核心的操作：

```python
from mcp.types import TextContent

async with ClientSession(read, write) as session:
    await session.initialize()

    # 调用工具
    result = await session.call_tool(
        name="query_database",
        arguments={
            "sql": "SELECT * FROM users WHERE age > 18",
            "limit": 10,
        },
    )

    # 处理返回结果
    for content in result.content:
        if isinstance(content, TextContent):
            print(f"结果: {content.text}")
```

### TypeScript 中调用工具

```typescript
const result = await client.callTool({
  name: "query_database",
  arguments: {
    sql: "SELECT * FROM users WHERE age > 18",
    limit: 10,
  },
});

for (const content of result.content) {
  if (content.type === "text") {
    console.log(`结果: ${content.text}`);
  }
}
```

## 读取资源

```python
async with ClientSession(read, write) as session:
    await session.initialize()

    # 读取静态资源
    resource = await session.read_resource("db://schema")
    for content in resource.contents:
        print(f"资源内容: {content.text}")

    # 读取动态资源（资源模板）
    resource = await session.read_resource("users://001/profile")
    for content in resource.contents:
        print(f"用户资料: {content.text}")
```

## 使用提示词模板

```python
async with ClientSession(read, write) as session:
    await session.initialize()

    # 获取填充后的提示词
    prompt_result = await session.get_prompt(
        name="code_review",
        arguments={
            "language": "python",
            "code": "def add(a, b): return a + b",
        },
    )

    # prompt_result.messages 包含可以直接发送给 AI 模型的消息
    for message in prompt_result.messages:
        print(f"[{message.role}] {message.content.text}")
```

## 将 MCP 集成到 AI 应用

下面是一个完整的示例，展示如何将 MCP Client 集成到基于 Claude API 的 AI 应用中：

```python
import asyncio
import json
from anthropic import Anthropic
from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client

class MCPChatApp:
    """集成了 MCP 的 AI 聊天应用"""

    def __init__(self):
        self.anthropic = Anthropic()
        self.sessions: dict[str, ClientSession] = {}
        self.available_tools = []

    async def connect_server(self, name: str, command: str, args: list[str]):
        """连接到一个 MCP Server"""
        server_params = StdioServerParameters(command=command, args=args)

        # 注意：实际使用中需要管理连接的生命周期
        read, write = await stdio_client(server_params).__aenter__()
        session = await ClientSession(read, write).__aenter__()
        await session.initialize()

        self.sessions[name] = session

        # 获取该 Server 的工具列表
        tools_result = await session.list_tools()
        for tool in tools_result.tools:
            self.available_tools.append({
                "name": tool.name,
                "description": tool.description,
                "input_schema": tool.inputSchema,
                "_server": name,  # 记录工具所属的 Server
            })

        print(f"已连接 Server '{name}'，发现 {len(tools_result.tools)} 个工具")

    def _get_claude_tools(self) -> list[dict]:
        """将 MCP 工具格式转换为 Claude API 的 tools 格式"""
        return [
            {
                "name": tool["name"],
                "description": tool["description"],
                "input_schema": tool["input_schema"],
            }
            for tool in self.available_tools
        ]

    def _find_server_for_tool(self, tool_name: str) -> str:
        """查找工具所属的 Server"""
        for tool in self.available_tools:
            if tool["name"] == tool_name:
                return tool["_server"]
        raise ValueError(f"未找到工具: {tool_name}")

    async def chat(self, user_message: str) -> str:
        """处理用户消息，支持工具调用"""
        messages = [{"role": "user", "content": user_message}]

        while True:
            # 调用 Claude API
            response = self.anthropic.messages.create(
                model="claude-sonnet-4-20250514",
                max_tokens=4096,
                tools=self._get_claude_tools(),
                messages=messages,
            )

            # 检查是否需要调用工具
            if response.stop_reason == "tool_use":
                # 提取工具调用请求
                assistant_content = response.content
                messages.append({"role": "assistant", "content": assistant_content})

                tool_results = []
                for block in assistant_content:
                    if block.type == "tool_use":
                        # 通过 MCP 调用工具
                        server_name = self._find_server_for_tool(block.name)
                        session = self.sessions[server_name]

                        result = await session.call_tool(
                            name=block.name,
                            arguments=block.input,
                        )

                        tool_results.append({
                            "type": "tool_result",
                            "tool_use_id": block.id,
                            "content": result.content[0].text
                                if result.content else "无结果",
                        })

                messages.append({"role": "user", "content": tool_results})
            else:
                # 模型直接返回了文本回复
                final_text = ""
                for block in response.content:
                    if hasattr(block, "text"):
                        final_text += block.text
                return final_text

async def main():
    app = MCPChatApp()

    # 连接 MCP Server
    await app.connect_server(
        name="filesystem",
        command="python",
        args=["filesystem_server.py"],
    )

    # 进行对话
    response = await app.chat("请列出 Documents 目录下的所有文件")
    print(response)

if __name__ == "__main__":
    asyncio.run(main())
```

<Warning>
上面的示例为了简洁省略了连接生命周期管理。在生产环境中，你需要正确处理连接的创建和销毁，建议使用 async context manager 来管理。
</Warning>

## 配置文件格式

大多数支持 MCP 的应用（如 Claude Desktop）使用 JSON 配置文件来管理 MCP Server 连接。以下是配置文件的完整格式说明：

### claude_desktop_config.json

```json
{
  "mcpServers": {
    "server-name": {
      "command": "可执行命令",
      "args": ["参数1", "参数2"],
      "env": {
        "ENV_VAR": "值"
      }
    }
  }
}
```

各字段说明：

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `command` | string | 是（stdio） | 启动 Server 的命令 |
| `args` | string[] | 否 | 命令行参数 |
| `env` | object | 否 | 环境变量 |
| `url` | string | 是（HTTP） | 远程 Server 的 URL |

### 常见配置示例

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/Users/me/docs"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_xxxxxxxxxxxx"
      }
    },
    "postgres": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-postgres",
        "postgresql://user:pass@localhost/mydb"
      ]
    },
    "custom-python-server": {
      "command": "python",
      "args": ["/path/to/my_server.py"]
    },
    "remote-server": {
      "url": "http://mcp.example.com:8080/mcp"
    }
  }
}
```

<Tip>
配置文件中的环境变量建议使用系统的 keychain 或 secrets manager 来管理，避免在配置文件中明文存储密码和 Token。
</Tip>

## 错误处理

在与 MCP Server 交互时，可能遇到多种错误情况。良好的错误处理对于构建健壮的 AI 应用至关重要：

### 连接错误

```python
from mcp.client.stdio import stdio_client
import asyncio

async def safe_connect(server_params):
    try:
        async with stdio_client(server_params) as (read, write):
            async with ClientSession(read, write) as session:
                await session.initialize()
                return session
    except FileNotFoundError:
        print(f"错误：找不到命令 '{server_params.command}'")
        print("请确认 Server 程序已安装且路径正确")
    except ConnectionError as e:
        print(f"连接失败: {e}")
    except TimeoutError:
        print("连接超时，请检查 Server 是否正常运行")
```

### 工具调用错误

```python
async def safe_call_tool(session, tool_name, arguments):
    try:
        result = await session.call_tool(name=tool_name, arguments=arguments)

        # 检查是否返回了错误
        if result.isError:
            print(f"工具执行失败: {result.content[0].text}")
            return None

        return result
    except Exception as e:
        print(f"调用工具 '{tool_name}' 时发生异常: {e}")
        return None
```

### 重连机制

```python
import asyncio

class ResilientMCPClient:
    """支持自动重连的 MCP Client"""

    def __init__(self, server_params, max_retries=3):
        self.server_params = server_params
        self.max_retries = max_retries
        self.session = None

    async def ensure_connected(self):
        """确保连接可用，如果断开则自动重连"""
        if self.session is not None:
            return

        for attempt in range(self.max_retries):
            try:
                # 建立新连接
                self._stdio = await stdio_client(
                    self.server_params
                ).__aenter__()
                read, write = self._stdio
                self.session = await ClientSession(
                    read, write
                ).__aenter__()
                await self.session.initialize()
                print(f"连接成功（第 {attempt + 1} 次尝试）")
                return
            except Exception as e:
                print(f"连接失败（第 {attempt + 1} 次）: {e}")
                if attempt < self.max_retries - 1:
                    await asyncio.sleep(2 ** attempt)  # 指数退避

        raise ConnectionError(f"经过 {self.max_retries} 次尝试后仍无法连接")
```

## 多 Server 管理

在实际应用中，你通常需要同时连接多个 MCP Server：

```python
class MultiServerManager:
    """管理多个 MCP Server 连接"""

    def __init__(self):
        self.servers: dict[str, ClientSession] = {}
        self.tool_registry: dict[str, str] = {}  # tool_name -> server_name

    async def add_server(self, name: str, server_params):
        """添加并连接一个 Server"""
        async with stdio_client(server_params) as (read, write):
            async with ClientSession(read, write) as session:
                await session.initialize()
                self.servers[name] = session

                # 注册该 Server 的所有工具
                tools = await session.list_tools()
                for tool in tools.tools:
                    if tool.name in self.tool_registry:
                        print(f"警告：工具 '{tool.name}' 存在名称冲突")
                    self.tool_registry[tool.name] = name

    async def call_tool(self, tool_name: str, arguments: dict):
        """自动路由工具调用到对应的 Server"""
        server_name = self.tool_registry.get(tool_name)
        if not server_name:
            raise ValueError(f"未找到工具: {tool_name}")

        session = self.servers[server_name]
        return await session.call_tool(name=tool_name, arguments=arguments)

    def get_all_tools(self) -> list[dict]:
        """获取所有 Server 的工具列表"""
        # 用于构建发送给 AI 模型的 tools 参数
        all_tools = []
        for server_name, session in self.servers.items():
            # 从缓存中获取工具信息
            pass
        return all_tools
```

## TypeScript 完整示例

以下是使用 TypeScript SDK 开发 MCP Client 的完整示例：

```typescript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { SSEClientTransport } from "@modelcontextprotocol/sdk/client/sse.js";

class MCPClientApp {
  private client: Client;

  constructor() {
    this.client = new Client({
      name: "my-ai-app",
      version: "1.0.0",
    });
  }

  async connectStdio(command: string, args: string[]) {
    const transport = new StdioClientTransport({ command, args });
    await this.client.connect(transport);
    console.log("已通过 stdio 连接");
  }

  async connectSSE(url: string) {
    const transport = new SSEClientTransport(new URL(url));
    await this.client.connect(transport);
    console.log("已通过 SSE 连接");
  }

  async discoverCapabilities() {
    const tools = await this.client.listTools();
    console.log("可用工具:", tools.tools.map((t) => t.name));

    const resources = await this.client.listResources();
    console.log("可用资源:", resources.resources.map((r) => r.uri));

    const prompts = await this.client.listPrompts();
    console.log("可用提示词:", prompts.prompts.map((p) => p.name));
  }

  async callTool(name: string, args: Record<string, unknown>) {
    const result = await this.client.callTool({ name, arguments: args });
    return result;
  }

  async readResource(uri: string) {
    const result = await this.client.readResource({ uri });
    return result;
  }

  async close() {
    await this.client.close();
  }
}

// 使用示例
async function main() {
  const app = new MCPClientApp();

  await app.connectStdio("python", ["path/to/server.py"]);
  await app.discoverCapabilities();

  const result = await app.callTool("list_directory", { path: "." });
  console.log("目录内容:", result);

  await app.close();
}

main().catch(console.error);
```

## 最佳实践

### 1. 工具选择策略

当连接多个 Server 后，你的应用可能拥有大量可用工具。需要合理策略来管理：

```python
def filter_relevant_tools(all_tools: list, user_message: str) -> list:
    """根据用户消息筛选相关工具，避免 token 浪费"""
    # 简单的关键词匹配策略
    keywords = {
        "文件": ["list_directory", "read_file", "write_file"],
        "数据库": ["query", "describe_table"],
        "搜索": ["search_files", "web_search"],
    }

    relevant = set()
    for keyword, tools in keywords.items():
        if keyword in user_message:
            relevant.update(tools)

    # 如果没有匹配到关键词，返回所有工具
    if not relevant:
        return all_tools

    return [t for t in all_tools if t["name"] in relevant]
```

### 2. 连接池管理

对于高并发场景，建议实现连接池：

- 预创建多个 Client 连接
- 使用信号量控制并发调用数
- 实现健康检查和自动重连

### 3. 安全建议

- **最小权限原则** - 只连接必要的 MCP Server
- **输入验证** - 在将 AI 模型的工具调用请求转发给 Server 之前，进行参数验证
- **Human-in-the-loop** - 对于危险操作（如文件写入、数据修改），在执行前要求用户确认
- **日志审计** - 记录所有工具调用日志，便于问题排查和安全审计

### 4. 性能优化

- **缓存工具列表** - `list_tools()` 的结果在 Server 不变的情况下可以缓存
- **超时设置** - 为每个工具调用设置合理的超时时间
- **并行调用** - 当 AI 模型需要同时调用多个工具时，使用 `asyncio.gather` 并行执行

```python
import asyncio

async def parallel_tool_calls(session, calls: list[tuple[str, dict]]):
    """并行执行多个工具调用"""
    tasks = [
        session.call_tool(name=name, arguments=args)
        for name, args in calls
    ]
    results = await asyncio.gather(*tasks, return_exceptions=True)
    return results
```

<Note>
并行调用多个工具时要注意资源竞争问题。如果多个工具操作同一个资源（如同一个文件或数据库表），可能需要串行执行以避免冲突。
</Note>

## 下一步

掌握了 MCP Client 开发后，你可以：

- 参考 [MCP 官方文档](https://modelcontextprotocol.io) 了解协议的完整规范
- 浏览 [MCP Server 仓库](https://github.com/modelcontextprotocol/servers) 发现社区贡献的 Server
- 结合 MCP Server 开发指南，构建自己的端到端 AI 应用
