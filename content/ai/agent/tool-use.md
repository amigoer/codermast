---
title: "工具调用"
description: "AI Agent 工具调用：Function Calling、Tool Use 原理与实践"
---

## 什么是工具调用

工具调用（Tool Use / Function Calling）是 AI Agent 最核心的能力之一。它允许大语言模型在推理过程中**调用外部工具**来获取信息、执行操作、与外部系统交互，从而突破纯文本生成的局限。

简单来说，工具调用让 LLM 从一个"只会说话"的模型，变成一个"能动手做事"的 Agent。

```
用户: "北京今天天气怎么样？"
        │
        ▼
   ┌──────────┐
   │   LLM    │  ← 模型判断需要调用天气工具
   └────┬─────┘
        │
        ▼  生成结构化工具调用请求
   ┌──────────────────────────┐
   │ get_weather(city="北京")  │
   └────────────┬─────────────┘
                │
                ▼  系统执行工具调用
   ┌──────────────────────────┐
   │ 天气 API 返回：晴，25°C   │
   └────────────┬─────────────┘
                │
                ▼  将结果反馈给 LLM
   ┌──────────┐
   │   LLM    │  ← 模型根据工具结果生成回复
   └────┬─────┘
        │
        ▼
用户: "北京今天天气晴朗，气温 25°C，适合户外活动。"
```

## 工具调用的工作原理

工具调用的完整流程分为以下几个步骤：

1. **工具定义**：开发者定义可用工具的名称、描述和参数 Schema
2. **模型决策**：LLM 根据用户输入和工具描述，决定是否需要调用工具，以及调用哪个工具
3. **结构化输出**：模型生成符合 Schema 的工具调用请求（JSON 格式）
4. **工具执行**：应用层解析请求并实际执行工具
5. **结果回传**：将工具执行结果作为新的上下文传回模型
6. **最终生成**：模型结合工具结果生成最终回复

<Warning>
模型本身**并不执行**工具调用，它只是生成结构化的调用请求。实际的工具执行由应用层代码负责。这是很多初学者容易混淆的地方。
</Warning>

## 工具定义：JSON Schema

无论使用哪个 LLM 提供商，工具定义的核心都是使用 JSON Schema 来描述工具的参数。一个好的工具定义包含：

- **名称（name）**：简洁明确的工具标识
- **描述（description）**：详细说明工具的用途和使用场景
- **参数（parameters）**：使用 JSON Schema 定义输入参数

```json
{
  "name": "search_database",
  "description": "在公司内部数据库中搜索员工信息。当用户询问关于员工、部门或组织结构相关问题时使用此工具。",
  "parameters": {
    "type": "object",
    "properties": {
      "query": {
        "type": "string",
        "description": "搜索关键词，如员工姓名、工号或部门名称"
      },
      "department": {
        "type": "string",
        "description": "按部门筛选，可选",
        "enum": ["engineering", "marketing", "sales", "hr"]
      },
      "limit": {
        "type": "integer",
        "description": "返回结果的最大数量，默认为 10",
        "default": 10
      }
    },
    "required": ["query"]
  }
}
```

<Tip>
工具的 **description** 字段非常重要——它直接影响模型能否正确选择和使用工具。描述应该包含：这个工具做什么、什么情况下应该使用、输入输出是什么格式。
</Tip>

## OpenAI Function Calling 实践

OpenAI 是最早推出 Function Calling 功能的 LLM 提供商之一。以下是完整的实践示例：

```python
import json
from openai import OpenAI

client = OpenAI()

# 1. 定义工具
tools = [
    {
        "type": "function",
        "function": {
            "name": "get_weather",
            "description": "获取指定城市的当前天气信息",
            "parameters": {
                "type": "object",
                "properties": {
                    "city": {
                        "type": "string",
                        "description": "城市名称，如 北京、上海"
                    },
                    "unit": {
                        "type": "string",
                        "enum": ["celsius", "fahrenheit"],
                        "description": "温度单位"
                    }
                },
                "required": ["city"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "search_products",
            "description": "在商品数据库中搜索产品信息",
            "parameters": {
                "type": "object",
                "properties": {
                    "keyword": {
                        "type": "string",
                        "description": "搜索关键词"
                    },
                    "category": {
                        "type": "string",
                        "description": "商品类别"
                    },
                    "max_price": {
                        "type": "number",
                        "description": "最高价格"
                    }
                },
                "required": ["keyword"]
            }
        }
    }
]

# 2. 实际的工具实现
def get_weather(city: str, unit: str = "celsius") -> dict:
    """实际调用天气 API"""
    # 这里替换为真实的 API 调用
    return {
        "city": city,
        "temperature": 25,
        "unit": unit,
        "condition": "晴"
    }

def search_products(keyword: str, category: str = None, max_price: float = None) -> list:
    """实际查询商品数据库"""
    # 这里替换为真实的数据库查询
    return [
        {"name": f"{keyword}商品A", "price": 99.0, "category": category or "通用"},
        {"name": f"{keyword}商品B", "price": 199.0, "category": category or "通用"}
    ]

# 工具名称到函数的映射
tool_functions = {
    "get_weather": get_weather,
    "search_products": search_products,
}

# 3. 发送请求
messages = [
    {"role": "user", "content": "北京今天天气怎么样？另外帮我搜一下价格在500以内的机械键盘"}
]

response = client.chat.completions.create(
    model="gpt-4o",
    messages=messages,
    tools=tools,
    tool_choice="auto"  # 让模型自行决定是否调用工具
)

# 4. 处理工具调用
assistant_message = response.choices[0].message
messages.append(assistant_message)

if assistant_message.tool_calls:
    for tool_call in assistant_message.tool_calls:
        function_name = tool_call.function.name
        arguments = json.loads(tool_call.function.arguments)

        # 执行工具
        result = tool_functions[function_name](**arguments)

        # 将结果回传
        messages.append({
            "role": "tool",
            "tool_call_id": tool_call.id,
            "content": json.dumps(result, ensure_ascii=False)
        })

    # 5. 让模型根据工具结果生成最终回复
    final_response = client.chat.completions.create(
        model="gpt-4o",
        messages=messages,
        tools=tools
    )
    print(final_response.choices[0].message.content)
```

<Note>
OpenAI 支持**并行工具调用**——模型可以在一次回复中生成多个工具调用请求（如上例中同时查天气和搜商品），应用层需要逐一执行并将所有结果回传。
</Note>

## Anthropic Tool Use 实践

Anthropic 的 Claude 模型提供了类似但格式略有不同的工具调用 API：

```python
import anthropic
import json

client = anthropic.Anthropic()

# 1. 定义工具
tools = [
    {
        "name": "get_stock_price",
        "description": "获取指定股票的实时价格。输入股票代码（如 AAPL、GOOGL），返回当前价格和涨跌幅。",
        "input_schema": {
            "type": "object",
            "properties": {
                "symbol": {
                    "type": "string",
                    "description": "股票代码，如 AAPL、TSLA、GOOGL"
                }
            },
            "required": ["symbol"]
        }
    },
    {
        "name": "calculate",
        "description": "执行数学计算。支持基本运算和常用数学函数。",
        "input_schema": {
            "type": "object",
            "properties": {
                "expression": {
                    "type": "string",
                    "description": "数学表达式，如 '2 + 3 * 4' 或 'sqrt(144)'"
                }
            },
            "required": ["expression"]
        }
    }
]

# 2. 工具实现
def get_stock_price(symbol: str) -> dict:
    # 替换为真实 API 调用
    return {"symbol": symbol, "price": 178.52, "change": "+1.23%"}

def calculate(expression: str) -> str:
    import math
    try:
        # 安全的数学计算环境
        allowed = {"sqrt": math.sqrt, "sin": math.sin, "cos": math.cos,
                   "pi": math.pi, "e": math.e, "abs": abs, "pow": pow}
        result = eval(expression, {"__builtins__": {}}, allowed)
        return str(result)
    except Exception as e:
        return f"计算错误: {e}"

tool_functions = {
    "get_stock_price": get_stock_price,
    "calculate": calculate,
}

# 3. 对话循环
messages = [
    {"role": "user", "content": "帮我查一下苹果公司的股价，然后计算如果买100股需要多少钱"}
]

# 循环处理，直到模型不再需要调用工具
while True:
    response = client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=4096,
        tools=tools,
        messages=messages
    )

    # 检查是否有工具调用
    if response.stop_reason == "tool_use":
        # 将助手回复添加到消息中
        messages.append({"role": "assistant", "content": response.content})

        # 处理所有工具调用
        tool_results = []
        for block in response.content:
            if block.type == "tool_use":
                result = tool_functions[block.name](**block.input)
                tool_results.append({
                    "type": "tool_result",
                    "tool_use_id": block.id,
                    "content": json.dumps(result, ensure_ascii=False)
                })

        messages.append({"role": "user", "content": tool_results})
    else:
        # 模型生成了最终回复
        final_text = "".join(
            block.text for block in response.content if hasattr(block, "text")
        )
        print(final_text)
        break
```

## 两种 API 的对比

| 特性 | OpenAI | Anthropic |
|------|--------|-----------|
| **工具定义字段** | `parameters` | `input_schema` |
| **工具调用标识** | `tool_calls` 列表 | `content` 中的 `tool_use` 块 |
| **结果回传角色** | `role: "tool"` | `role: "user"` 中嵌套 `tool_result` |
| **停止原因** | `finish_reason: "tool_calls"` | `stop_reason: "tool_use"` |
| **并行调用** | 支持 | 支持 |
| **流式输出** | 支持 | 支持 |

## 错误处理

工具调用中的错误处理至关重要。常见的错误场景和处理策略：

```python
def safe_tool_execution(tool_name: str, arguments: dict, tool_functions: dict) -> str:
    """安全的工具执行封装"""
    try:
        # 检查工具是否存在
        if tool_name not in tool_functions:
            return json.dumps({
                "error": f"未知工具: {tool_name}",
                "available_tools": list(tool_functions.keys())
            })

        # 执行工具（设置超时）
        import signal

        def timeout_handler(signum, frame):
            raise TimeoutError("工具执行超时")

        signal.signal(signal.SIGALRM, timeout_handler)
        signal.alarm(30)  # 30 秒超时

        result = tool_functions[tool_name](**arguments)

        signal.alarm(0)  # 取消超时
        return json.dumps(result, ensure_ascii=False)

    except TypeError as e:
        # 参数类型错误
        return json.dumps({
            "error": f"参数错误: {e}",
            "hint": "请检查参数类型和必填项"
        })

    except TimeoutError:
        return json.dumps({
            "error": "工具执行超时，请稍后重试"
        })

    except Exception as e:
        # 兜底异常处理
        return json.dumps({
            "error": f"工具执行失败: {type(e).__name__}: {e}"
        })
```

<Warning>
永远不要将工具执行中的原始异常堆栈直接暴露给终端用户或模型。应该将错误封装为结构化的错误信息，既方便模型理解和重试，也避免泄露系统内部信息。
</Warning>

## 工具设计最佳实践

### 1. 工具粒度适中

```python
# 不好：工具粒度太大，做了太多事情
@tool
def manage_user(action, user_id, name, email, role, department):
    """管理用户的所有操作"""
    ...

# 好：拆分为职责单一的小工具
@tool
def get_user(user_id: str) -> dict:
    """根据用户 ID 查询用户信息"""
    ...

@tool
def update_user_email(user_id: str, new_email: str) -> dict:
    """更新指定用户的邮箱地址"""
    ...

@tool
def assign_user_role(user_id: str, role: str) -> dict:
    """为用户分配角色权限"""
    ...
```

### 2. 描述要详细且准确

```python
# 不好：描述模糊
@tool
def search(q: str):
    """搜索"""
    ...

# 好：描述清晰，说明使用场景
@tool
def search_documentation(query: str, language: str = "zh"):
    """在官方技术文档中搜索信息。
    当用户询问 API 用法、配置参数、最佳实践等技术问题时使用。
    返回最相关的文档片段和链接。
    """
    ...
```

### 3. 返回结构化结果

```python
# 不好：返回非结构化文本
def get_order(order_id):
    return f"订单{order_id}状态：已发货，预计明天到达"

# 好：返回结构化数据
def get_order(order_id: str) -> dict:
    return {
        "order_id": order_id,
        "status": "shipped",
        "estimated_delivery": "2025-03-15",
        "tracking_number": "SF1234567890",
        "items": [{"name": "机械键盘", "quantity": 1, "price": 399.0}]
    }
```

### 4. 参数使用枚举约束

```python
# 好：使用 enum 限制参数取值范围
{
    "name": "query_logs",
    "description": "查询系统日志",
    "parameters": {
        "type": "object",
        "properties": {
            "level": {
                "type": "string",
                "enum": ["DEBUG", "INFO", "WARNING", "ERROR", "CRITICAL"],
                "description": "日志级别"
            },
            "service": {
                "type": "string",
                "enum": ["api-gateway", "user-service", "order-service"],
                "description": "服务名称"
            }
        },
        "required": ["level"]
    }
}
```

### 5. 工具数量控制

| 工具数量 | 建议 |
|---------|------|
| 1-5 个 | 理想范围，模型选择准确率最高 |
| 6-15 个 | 可以接受，注意描述区分度 |
| 15-30 个 | 需要分类组织，考虑使用工具路由 |
| 30+ 个 | 应拆分为多个专业 Agent |

<Tip>
如果工具数量较多，可以实现一个"工具路由器"——先让模型选择工具类别，再在该类别内选择具体工具。这样能显著提高工具选择的准确率。
</Tip>

## 构建自定义工具

以下是一个完整的自定义工具构建示例，包含数据库查询和 API 调用：

```python
import httpx
import sqlite3
from typing import Optional

class ToolKit:
    """工具集封装"""

    def __init__(self, db_path: str, api_base: str):
        self.db_path = db_path
        self.api_base = api_base

    def query_database(self, sql: str, params: Optional[list] = None) -> dict:
        """执行 SQL 查询（只读）

        Args:
            sql: SELECT 查询语句
            params: 查询参数列表

        Returns:
            查询结果列表
        """
        if not sql.strip().upper().startswith("SELECT"):
            return {"error": "仅支持 SELECT 查询"}

        conn = sqlite3.connect(self.db_path)
        conn.row_factory = sqlite3.Row
        try:
            cursor = conn.execute(sql, params or [])
            rows = [dict(row) for row in cursor.fetchall()]
            return {"results": rows, "count": len(rows)}
        except sqlite3.Error as e:
            return {"error": f"查询失败: {e}"}
        finally:
            conn.close()

    def call_api(self, endpoint: str, method: str = "GET",
                 body: Optional[dict] = None) -> dict:
        """调用外部 REST API

        Args:
            endpoint: API 路径（如 /users/123）
            method: HTTP 方法（GET、POST、PUT、DELETE）
            body: 请求体（用于 POST/PUT）

        Returns:
            API 响应数据
        """
        url = f"{self.api_base}{endpoint}"
        try:
            with httpx.Client(timeout=10) as client:
                response = client.request(method, url, json=body)
                response.raise_for_status()
                return {"status": response.status_code, "data": response.json()}
        except httpx.TimeoutException:
            return {"error": "API 请求超时"}
        except httpx.HTTPStatusError as e:
            return {"error": f"API 错误: {e.response.status_code}"}

    def get_tool_definitions(self) -> list:
        """生成工具定义列表，供 LLM 使用"""
        return [
            {
                "name": "query_database",
                "description": "在内部数据库中执行 SQL 查询。仅支持 SELECT 语句。",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "sql": {"type": "string", "description": "SQL SELECT 查询语句"},
                        "params": {"type": "array", "items": {"type": "string"},
                                   "description": "查询参数"}
                    },
                    "required": ["sql"]
                }
            },
            {
                "name": "call_api",
                "description": "调用外部 REST API 获取或修改数据。",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "endpoint": {"type": "string", "description": "API 路径"},
                        "method": {"type": "string", "enum": ["GET", "POST", "PUT", "DELETE"]},
                        "body": {"type": "object", "description": "请求体"}
                    },
                    "required": ["endpoint"]
                }
            }
        ]
```

## 小结

工具调用是 AI Agent 从"对话系统"升级为"执行系统"的关键能力。掌握工具调用的核心要点：

1. **理解流程**：模型生成调用请求 → 应用层执行 → 结果回传模型
2. **精心定义**：好的工具描述和参数 Schema 是可靠调用的前提
3. **完善错误处理**：工具调用链路长，每个环节都需要异常兜底
4. **控制粒度**：工具职责单一、数量适中、描述清晰

在下一章的实战环节中，我们将把工具调用与 Agent 框架结合起来，构建一个完整的可运行的 AI Agent 系统。
