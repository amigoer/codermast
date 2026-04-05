---
title: "MCP Server 开发"
description: "MCP Server 开发指南：资源、工具、提示词的实现"
---

## 概述

MCP Server 是 MCP 架构中的核心组件，负责向 AI 应用暴露工具、资源和提示词模板等能力。本文将以 **Python SDK** 为主要示例，带你从零开始开发一个完整的 MCP Server。

<Note>
MCP 官方提供了 Python 和 TypeScript 两种 SDK。本文以 Python SDK 为主进行讲解，TypeScript SDK 的 API 设计基本一致。
</Note>

## 环境准备

### 安装 Python SDK

推荐使用 Python 3.10 及以上版本。通过 pip 或 uv 安装 MCP Python SDK：

```bash
# 使用 pip
pip install mcp

# 使用 uv（推荐）
uv add mcp
```

### 项目结构

一个典型的 MCP Server 项目结构如下：

```
my-mcp-server/
├── pyproject.toml
├── README.md
└── src/
    └── my_mcp_server/
        ├── __init__.py
        └── server.py
```

## 创建基本 Server

### 最简 Server 示例

使用 MCP Python SDK 的高级 API（`FastMCP`），只需几行代码就能创建一个 MCP Server：

```python
from mcp.server.fastmcp import FastMCP

# 创建 MCP Server 实例
mcp = FastMCP("my-server")

# 定义一个工具
@mcp.tool()
def hello(name: str) -> str:
    """向指定的人打招呼"""
    return f"你好，{name}！欢迎使用 MCP。"

# 启动 Server
if __name__ == "__main__":
    mcp.run()
```

运行这个脚本后，一个支持 stdio 传输的 MCP Server 就启动了。

## 实现 Tools（工具）

Tools 是 MCP Server 最常用的能力，允许 AI 模型通过 Server 执行具体操作。

### 基本工具定义

使用 `@mcp.tool()` 装饰器即可定义工具。SDK 会自动从函数签名和类型注解中提取参数的 JSON Schema：

```python
from mcp.server.fastmcp import FastMCP

mcp = FastMCP("tools-demo")

@mcp.tool()
def add(a: float, b: float) -> float:
    """计算两个数的和"""
    return a + b

@mcp.tool()
def multiply(a: float, b: float) -> float:
    """计算两个数的乘积"""
    return a * b
```

<Tip>
函数的 docstring 会被用作工具的描述信息，这对 AI 模型理解工具用途至关重要。请务必编写清晰准确的 docstring。
</Tip>

### 使用 Pydantic 模型定义复杂参数

对于参数结构较复杂的工具，可以使用 Pydantic 模型：

```python
from pydantic import BaseModel, Field
from mcp.server.fastmcp import FastMCP

mcp = FastMCP("complex-tools")

class QueryParams(BaseModel):
    sql: str = Field(description="SQL 查询语句")
    database: str = Field(default="main", description="目标数据库")
    limit: int = Field(default=100, description="最大返回行数")

@mcp.tool()
def query_database(params: QueryParams) -> str:
    """执行数据库查询"""
    # 实际的数据库查询逻辑
    return f"查询 {params.database}: {params.sql} (限制 {params.limit} 行)"
```

### 异步工具

MCP SDK 原生支持异步函数：

```python
import httpx
from mcp.server.fastmcp import FastMCP

mcp = FastMCP("async-tools")

@mcp.tool()
async def fetch_url(url: str) -> str:
    """获取指定 URL 的内容"""
    async with httpx.AsyncClient() as client:
        response = await client.get(url)
        return response.text[:2000]  # 限制返回长度
```

### 错误处理

工具函数中抛出的异常会被 SDK 捕获并返回给 Client。建议使用有意义的错误信息：

```python
@mcp.tool()
def divide(a: float, b: float) -> float:
    """计算两个数的商"""
    if b == 0:
        raise ValueError("除数不能为零")
    return a / b
```

## 实现 Resources（资源）

Resources 用于向 AI 模型暴露数据内容，让模型获取必要的上下文信息。

### 静态资源

```python
from mcp.server.fastmcp import FastMCP

mcp = FastMCP("resources-demo")

@mcp.resource("config://app-settings")
def get_app_settings() -> str:
    """返回应用配置信息"""
    return """
    {
        "app_name": "MyApp",
        "version": "1.0.0",
        "debug": false,
        "database_url": "postgresql://localhost/mydb"
    }
    """
```

### 动态资源（资源模板）

使用 URI 模板可以定义动态资源，根据参数返回不同的内容：

```python
@mcp.resource("users://{user_id}/profile")
def get_user_profile(user_id: str) -> str:
    """获取用户资料"""
    # 实际应用中从数据库查询
    users = {
        "001": {"name": "张三", "role": "admin"},
        "002": {"name": "李四", "role": "developer"},
    }
    user = users.get(user_id, {"name": "未知", "role": "guest"})
    return str(user)
```

### 二进制资源

对于图片、PDF 等二进制内容，返回 bytes 类型即可：

```python
@mcp.resource("images://logo.png")
def get_logo() -> bytes:
    """返回应用 Logo"""
    with open("assets/logo.png", "rb") as f:
        return f.read()
```

## 实现 Prompts（提示词模板）

Prompts 允许 Server 提供预定义的提示词模板，帮助用户更高效地使用 AI。

```python
from mcp.server.fastmcp import FastMCP
from mcp.types import TextContent

mcp = FastMCP("prompts-demo")

@mcp.prompt()
def code_review(language: str, code: str) -> str:
    """代码审查提示词模板"""
    return f"""请对以下 {language} 代码进行审查，重点关注：
1. 代码质量和可读性
2. 潜在的 Bug 和安全隐患
3. 性能优化建议
4. 最佳实践遵循情况

代码：
```{language}
{code}
```

请用中文给出详细的审查意见。"""

@mcp.prompt()
def sql_expert(table_schema: str, question: str) -> str:
    """SQL 查询生成模板"""
    return f"""你是一位 SQL 专家。根据以下数据库表结构，生成满足需求的 SQL 查询语句。

表结构：
{table_schema}

需求：{question}

请生成优化的 SQL 查询，并解释查询逻辑。"""
```

<Note>
Prompt 模板返回的字符串会作为用户消息发送给 AI 模型。你也可以返回更复杂的消息结构，包含多轮对话上下文。
</Note>

## 传输配置

### stdio 传输（默认）

默认情况下，`mcp.run()` 使用 stdio 传输方式。这是最简单的方式，适合本地使用：

```python
if __name__ == "__main__":
    mcp.run()  # 默认使用 stdio
```

### HTTP + SSE 传输

如果需要远程访问，可以使用 HTTP + SSE 传输：

```python
if __name__ == "__main__":
    mcp.run(transport="sse", host="0.0.0.0", port=8080)
```

## 完整示例：文件系统 MCP Server

下面是一个功能完整的文件系统 MCP Server，支持文件的读取、写入、列出目录等操作：

```python
import os
from pathlib import Path
from mcp.server.fastmcp import FastMCP

mcp = FastMCP("filesystem-server")

# 配置允许访问的根目录
ALLOWED_ROOT = Path(os.environ.get("MCP_ROOT_DIR", os.path.expanduser("~/Documents")))

def _validate_path(path: str) -> Path:
    """验证路径安全性，防止目录遍历攻击"""
    resolved = (ALLOWED_ROOT / path).resolve()
    if not str(resolved).startswith(str(ALLOWED_ROOT.resolve())):
        raise ValueError(f"访问被拒绝：路径 {path} 超出了允许的根目录范围")
    return resolved

@mcp.resource("fs://root")
def get_root_info() -> str:
    """返回根目录信息"""
    return f"当前根目录: {ALLOWED_ROOT}"

@mcp.tool()
def list_directory(path: str = ".") -> str:
    """列出指定目录下的文件和子目录"""
    target = _validate_path(path)
    if not target.is_dir():
        raise ValueError(f"{path} 不是一个目录")

    entries = []
    for entry in sorted(target.iterdir()):
        entry_type = "📁" if entry.is_dir() else "📄"
        size = entry.stat().st_size if entry.is_file() else 0
        entries.append(f"{entry_type} {entry.name}  ({size} bytes)")

    return "\n".join(entries) if entries else "（空目录）"

@mcp.tool()
def read_file(path: str) -> str:
    """读取文件内容（仅支持文本文件）"""
    target = _validate_path(path)
    if not target.is_file():
        raise ValueError(f"{path} 不是一个文件")

    return target.read_text(encoding="utf-8")

@mcp.tool()
def write_file(path: str, content: str) -> str:
    """写入内容到文件（会覆盖已有内容）"""
    target = _validate_path(path)
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(content, encoding="utf-8")
    return f"已成功写入文件: {path} ({len(content)} 字符)"

@mcp.tool()
def search_files(pattern: str, path: str = ".") -> str:
    """在目录中搜索匹配指定模式的文件"""
    target = _validate_path(path)
    matches = list(target.rglob(pattern))

    if not matches:
        return f"未找到匹配 '{pattern}' 的文件"

    results = []
    for match in matches[:50]:  # 限制结果数量
        rel_path = match.relative_to(ALLOWED_ROOT)
        results.append(str(rel_path))

    return "\n".join(results)

if __name__ == "__main__":
    mcp.run()
```

<Warning>
文件系统 Server 需要特别注意安全性。务必验证所有路径参数，防止目录遍历攻击，并限制可访问的目录范围。
</Warning>

## 完整示例：数据库查询 MCP Server

以下示例实现了一个 SQLite 数据库查询 Server：

```python
import sqlite3
import json
from pathlib import Path
from mcp.server.fastmcp import FastMCP

mcp = FastMCP("database-server")

DB_PATH = Path(os.environ.get("MCP_DB_PATH", "data.db"))

def get_connection() -> sqlite3.Connection:
    """获取数据库连接"""
    conn = sqlite3.connect(str(DB_PATH))
    conn.row_factory = sqlite3.Row
    return conn

@mcp.resource("db://schema")
def get_schema() -> str:
    """获取数据库表结构"""
    conn = get_connection()
    cursor = conn.execute(
        "SELECT sql FROM sqlite_master WHERE type='table' ORDER BY name"
    )
    schemas = [row[0] for row in cursor.fetchall() if row[0]]
    conn.close()
    return "\n\n".join(schemas)

@mcp.resource("db://tables")
def list_tables() -> str:
    """列出所有数据表"""
    conn = get_connection()
    cursor = conn.execute(
        "SELECT name FROM sqlite_master WHERE type='table' ORDER BY name"
    )
    tables = [row[0] for row in cursor.fetchall()]
    conn.close()
    return json.dumps(tables, ensure_ascii=False)

@mcp.tool()
def query(sql: str, limit: int = 100) -> str:
    """执行只读 SQL 查询（仅支持 SELECT 语句）"""
    # 安全检查：仅允许 SELECT 语句
    sql_stripped = sql.strip().upper()
    if not sql_stripped.startswith("SELECT"):
        raise ValueError("仅允许执行 SELECT 查询语句")

    conn = get_connection()
    try:
        cursor = conn.execute(f"{sql} LIMIT {limit}")
        columns = [desc[0] for desc in cursor.description]
        rows = cursor.fetchall()

        result = {
            "columns": columns,
            "rows": [dict(row) for row in rows],
            "row_count": len(rows),
        }
        return json.dumps(result, ensure_ascii=False, indent=2)
    except sqlite3.Error as e:
        raise ValueError(f"SQL 执行错误: {e}")
    finally:
        conn.close()

@mcp.tool()
def describe_table(table_name: str) -> str:
    """获取指定表的详细结构信息"""
    conn = get_connection()
    try:
        cursor = conn.execute(f"PRAGMA table_info({table_name})")
        columns = cursor.fetchall()

        if not columns:
            raise ValueError(f"表 '{table_name}' 不存在")

        result = []
        for col in columns:
            result.append({
                "name": col[1],
                "type": col[2],
                "nullable": not col[3],
                "primary_key": bool(col[5]),
            })
        return json.dumps(result, ensure_ascii=False, indent=2)
    finally:
        conn.close()

@mcp.prompt()
def data_analysis(table_name: str, question: str) -> str:
    """数据分析提示词模板"""
    # 自动获取表结构作为上下文
    conn = get_connection()
    cursor = conn.execute(
        f"SELECT sql FROM sqlite_master WHERE type='table' AND name=?",
        (table_name,)
    )
    row = cursor.fetchone()
    conn.close()

    schema = row[0] if row else "未找到表结构"

    return f"""你是一位数据分析专家。请根据以下信息进行分析：

表结构：
{schema}

分析需求：{question}

请先生成合适的 SQL 查询，然后使用 query 工具执行查询，最后对结果进行分析和可视化建议。"""

if __name__ == "__main__":
    mcp.run()
```

## 使用 MCP Inspector 测试

MCP Inspector 是官方提供的调试工具，可以直接与你的 MCP Server 进行交互测试：

```bash
# 安装 MCP Inspector
npx @modelcontextprotocol/inspector

# 测试你的 Server
npx @modelcontextprotocol/inspector python src/my_mcp_server/server.py
```

MCP Inspector 提供了一个 Web 界面，你可以：

- 查看 Server 暴露的所有 Tools、Resources 和 Prompts
- 手动调用工具并查看返回结果
- 测试资源的读取
- 验证参数的 JSON Schema

<Tip>
在开发过程中，建议始终使用 MCP Inspector 进行调试。它可以帮助你快速发现参数定义错误、返回格式问题等。
</Tip>

## 在 Claude Desktop 中配置

开发完成后，你可以将自己的 MCP Server 配置到 Claude Desktop 中使用。编辑配置文件：

**macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "my-filesystem": {
      "command": "python",
      "args": ["/path/to/src/filesystem_server.py"],
      "env": {
        "MCP_ROOT_DIR": "/Users/yourname/Documents"
      }
    },
    "my-database": {
      "command": "python",
      "args": ["/path/to/src/database_server.py"],
      "env": {
        "MCP_DB_PATH": "/path/to/data.db"
      }
    }
  }
}
```

## 部署建议

### 本地部署

本地部署使用 stdio 传输，是最简单的方式：

```bash
# 直接运行
python src/my_mcp_server/server.py

# 或者打包为可执行命令
pip install -e .
my-mcp-server
```

### 远程部署

远程部署使用 HTTP + SSE 传输，适合团队共享：

```python
# server.py
if __name__ == "__main__":
    mcp.run(transport="sse", host="0.0.0.0", port=8080)
```

```bash
# 使用 Docker 部署
docker build -t my-mcp-server .
docker run -p 8080:8080 my-mcp-server
```

### 发布到 PyPI

如果你希望社区可以方便地安装你的 MCP Server，可以将其发布到 PyPI：

```toml
# pyproject.toml
[project]
name = "my-mcp-server"
version = "0.1.0"
description = "一个自定义 MCP Server"
dependencies = ["mcp>=1.0.0"]

[project.scripts]
my-mcp-server = "my_mcp_server.server:main"
```

<Warning>
发布 MCP Server 前，请确保不会在代码中暴露敏感信息（如数据库密码、API 密钥等）。建议通过环境变量传递敏感配置。
</Warning>

## 最佳实践

1. **清晰的工具描述** - 为每个工具编写准确、详细的 docstring，这是 AI 模型决定是否调用工具的关键依据
2. **输入验证** - 严格验证所有输入参数，防止注入攻击和非法操作
3. **限制作用域** - 每个 Server 专注于一个领域，避免创建"万能" Server
4. **错误信息友好** - 返回有意义的错误信息，帮助 AI 模型理解失败原因并调整策略
5. **幂等设计** - 尽可能将工具设计为幂等的，避免重复调用产生副作用
6. **资源利用** - 善用 Resources 提供上下文，减少 AI 模型的猜测，提高工具调用准确率
