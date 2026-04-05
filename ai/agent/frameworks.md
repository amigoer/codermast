---
title: "Agent 框架"
description: "主流 Agent 框架：LangChain、LlamaIndex、AutoGen、CrewAI"
---

## 框架概览

随着 AI Agent 技术的快速发展，社区涌现出多种 Agent 开发框架。选择合适的框架可以大幅提升开发效率。下表对主流框架进行对比：

| 框架 | 核心定位 | 编程语言 | Agent 模式 | 学习曲线 | 社区活跃度 |
|------|---------|---------|-----------|---------|-----------|
| **LangChain / LangGraph** | 通用 Agent 编排 | Python, JS/TS | 单/多 Agent，图状态机 | 中等 | 非常高 |
| **LlamaIndex** | 数据驱动 Agent | Python, JS/TS | 单 Agent，数据查询 | 中等 | 高 |
| **AutoGen** | 多 Agent 对话 | Python, .NET | 多 Agent 协作 | 较高 | 高 |
| **CrewAI** | 角色化团队协作 | Python | 多 Agent，角色扮演 | 较低 | 中高 |
| **Dify** | 低代码/可视化 | Python (后端) | 可视化 Agent 构建 | 低 | 高 |

## LangChain 与 LangGraph

### LangChain 简介

LangChain 是最早也是最知名的 LLM 应用开发框架之一。它提供了丰富的抽象层来简化与大语言模型的交互。

**核心概念**：

- **Model**：对 LLM 的统一封装，支持 OpenAI、Anthropic、本地模型等
- **Prompt Template**：可复用的提示词模板
- **Chain**：将多个组件串联成处理流水线
- **Tool**：供 Agent 调用的外部工具
- **Memory**：对话历史和状态管理

<Note>
LangChain 在早期版本中使用 `AgentExecutor` 来运行 Agent，但现在官方推荐使用 **LangGraph** 来构建更灵活的 Agent 工作流。LangGraph 是 LangChain 生态的一部分，专注于状态化、可控的 Agent 编排。
</Note>

### LangGraph 核心架构

LangGraph 采用**有向图（Directed Graph）**的方式来定义 Agent 的工作流。每个节点是一个处理步骤，边定义了状态转移的条件。

```
┌───────┐     ┌───────────┐     ┌──────────┐
│ START  │────▶│  Agent 节点 │────▶│ 工具调用？ │
└───────┘     └───────────┘     └────┬─────┘
                    ▲                │
                    │           ┌────┴────┐
                    │           ▼         ▼
                    │     ┌──────┐   ┌──────┐
                    │     │ 工具  │   │ END  │
                    │     │ 执行  │   └──────┘
                    │     └──┬───┘
                    │        │
                    └────────┘
```

**LangGraph 的关键概念**：

- **State（状态）**：在图中流转的数据结构，所有节点共享并修改同一个状态
- **Node（节点）**：执行具体逻辑的函数，接收状态并返回更新后的状态
- **Edge（边）**：连接节点，可以是固定路径或条件分支
- **Checkpointing**：内置状态持久化，支持中断和恢复

### LangGraph 代码示例

以下是使用 LangGraph 构建一个带有工具调用能力的简单 Agent：

```python
from typing import Annotated, TypedDict
from langgraph.graph import StateGraph, START, END
from langgraph.graph.message import add_messages
from langgraph.prebuilt import ToolNode, tools_condition
from langchain_openai import ChatOpenAI
from langchain_core.tools import tool

# 1. 定义状态
class AgentState(TypedDict):
    messages: Annotated[list, add_messages]

# 2. 定义工具
@tool
def search_web(query: str) -> str:
    """搜索互联网获取最新信息"""
    # 实际项目中调用搜索 API
    return f"搜索 '{query}' 的结果：这里是搜索到的相关信息..."

@tool
def calculator(expression: str) -> str:
    """计算数学表达式"""
    try:
        result = eval(expression)
        return f"计算结果：{result}"
    except Exception as e:
        return f"计算错误：{e}"

# 3. 配置模型
tools = [search_web, calculator]
llm = ChatOpenAI(model="gpt-4o").bind_tools(tools)

# 4. 定义节点
def agent_node(state: AgentState):
    response = llm.invoke(state["messages"])
    return {"messages": [response]}

# 5. 构建图
graph = StateGraph(AgentState)
graph.add_node("agent", agent_node)
graph.add_node("tools", ToolNode(tools))

# 6. 定义边
graph.add_edge(START, "agent")
graph.add_conditional_edges("agent", tools_condition)
graph.add_edge("tools", "agent")

# 7. 编译并运行
app = graph.compile()

# 使用 Agent
result = app.invoke({
    "messages": [("user", "帮我计算 (125 * 37) + 892 的结果")]
})
print(result["messages"][-1].content)
```

<Tip>
LangGraph 的核心优势在于**可控性**。通过显式定义图结构，开发者能够精确控制 Agent 的执行流程，添加人工审批节点、设置超时、限制工具调用次数等。
</Tip>

## LlamaIndex Agents

LlamaIndex 最初以 RAG（检索增强生成）著称，后来扩展出了 Agent 能力。它的 Agent 特别擅长**数据查询和知识密集型任务**。

### 核心特点

- **数据连接器**：支持 PDF、数据库、API 等多种数据源
- **索引结构**：多种索引类型优化不同查询模式
- **查询引擎**：将数据检索能力封装为 Agent 可调用的工具

```python
from llama_index.core.agent import ReActAgent
from llama_index.llms.openai import OpenAI
from llama_index.core.tools import QueryEngineTool, FunctionTool

# 将索引查询引擎包装为工具
query_tool = QueryEngineTool.from_defaults(
    query_engine=index.as_query_engine(),
    name="knowledge_base",
    description="查询内部知识库获取公司文档信息"
)

# 自定义函数工具
def send_email(to: str, subject: str, body: str) -> str:
    """发送邮件通知"""
    # 实际邮件发送逻辑
    return f"邮件已发送至 {to}"

email_tool = FunctionTool.from_defaults(fn=send_email)

# 创建 ReAct Agent
agent = ReActAgent.from_tools(
    tools=[query_tool, email_tool],
    llm=OpenAI(model="gpt-4o"),
    verbose=True
)

response = agent.chat("查询最新的项目报告并发送给团队负责人")
```

<Note>
如果你的 Agent 核心需求是与大量数据交互（文档问答、知识库检索等），LlamaIndex 是比 LangChain 更专注的选择。
</Note>

## AutoGen

AutoGen 是微软推出的多 Agent 对话框架，核心理念是让多个 Agent 通过**结构化对话**协作完成任务。

### 核心概念

- **ConversableAgent**：可对话的 Agent 基类
- **AssistantAgent**：基于 LLM 的助手 Agent
- **UserProxyAgent**：代表用户的 Agent，可执行代码
- **GroupChat**：多 Agent 群聊机制

```python
from autogen import AssistantAgent, UserProxyAgent, GroupChat, GroupChatManager

# 创建多个专业 Agent
coder = AssistantAgent(
    name="Coder",
    system_message="你是一位 Python 专家，负责编写高质量代码。",
    llm_config={"model": "gpt-4o"}
)

reviewer = AssistantAgent(
    name="Reviewer",
    system_message="你是一位代码审查专家，负责审查代码质量和安全性。",
    llm_config={"model": "gpt-4o"}
)

# 用户代理（可执行代码）
user_proxy = UserProxyAgent(
    name="User",
    human_input_mode="NEVER",
    code_execution_config={"work_dir": "workspace"}
)

# 创建群聊
group_chat = GroupChat(
    agents=[user_proxy, coder, reviewer],
    messages=[],
    max_round=10
)

manager = GroupChatManager(groupchat=group_chat)

# 发起任务
user_proxy.initiate_chat(
    manager,
    message="编写一个 Python 脚本来分析 CSV 文件中的销售数据并生成图表"
)
```

### AutoGen 适用场景

- 需要多个"角色"协作的复杂任务
- 代码生成 + 执行 + 审查的迭代流程
- 模拟真实团队的工作流程

## CrewAI

CrewAI 专注于**角色扮演式**的多 Agent 协作，灵感来源于真实团队的分工模式。

### 核心概念

- **Agent**：具有特定角色、目标和背景的智能体
- **Task**：具体的任务定义，包含描述和期望输出
- **Crew**：Agent 团队，定义协作流程
- **Process**：任务执行模式（顺序或层级）

```python
from crewai import Agent, Task, Crew, Process

# 定义 Agent 角色
researcher = Agent(
    role="高级研究员",
    goal="深入研究给定主题并提供详尽的分析报告",
    backstory="你是一位经验丰富的技术研究员，擅长信息收集和分析",
    tools=[search_tool],
    verbose=True
)

writer = Agent(
    role="技术写作专家",
    goal="将研究结果转化为通俗易懂的技术文章",
    backstory="你是一位资深技术作家，擅长用简洁的语言解释复杂概念",
    verbose=True
)

# 定义任务
research_task = Task(
    description="研究 AI Agent 在企业落地中的最佳实践",
    expected_output="一份包含关键发现、案例分析和趋势预测的研究报告",
    agent=researcher
)

writing_task = Task(
    description="基于研究报告撰写一篇技术博客文章",
    expected_output="一篇 2000 字左右的技术博客，结构清晰，案例丰富",
    agent=writer
)

# 组建团队
crew = Crew(
    agents=[researcher, writer],
    tasks=[research_task, writing_task],
    process=Process.sequential,  # 顺序执行
    verbose=True
)

result = crew.kickoff()
```

<Tip>
CrewAI 的最大优势是**直觉性**——用「角色」「任务」「团队」这些概念来组织 Agent 系统，对非技术背景的产品经理和业务人员也非常友好。
</Tip>

## Dify

Dify 是一个开源的 LLM 应用开发平台，提供**可视化界面**来构建 Agent 和 AI 工作流。

### 核心特点

- **可视化编排**：通过拖拽节点构建 Agent 工作流
- **模型管理**：统一管理多个 LLM 提供商的模型
- **知识库管理**：内置 RAG 流水线，支持多种文档格式
- **API 发布**：一键将 Agent 发布为 API 服务
- **监控与日志**：内置运行日志和用量监控

```
┌─────────────────────────────────────┐
│         Dify 平台架构                │
│                                      │
│  ┌──────┐  ┌──────┐  ┌──────────┐  │
│  │ 聊天  │  │ Agent │  │ 工作流   │  │
│  │ 助手  │  │ 模式  │  │ 编排    │  │
│  └──┬───┘  └──┬───┘  └────┬─────┘  │
│     └─────────┴───────────┘         │
│              │                       │
│     ┌────────┴────────┐             │
│     │  模型提供商管理   │             │
│     │ OpenAI/Anthropic │             │
│     │ 本地模型/其他     │             │
│     └────────┬────────┘             │
│              │                       │
│     ┌────────┴────────┐             │
│     │  知识库 / 工具    │             │
│     └─────────────────┘             │
└─────────────────────────────────────┘
```

<Note>
Dify 适合**快速原型验证**和**非开发人员构建 AI 应用**。但对于需要高度定制化的复杂 Agent 系统，代码框架（如 LangGraph）仍然是更灵活的选择。
</Note>

## 如何选择框架

选择 Agent 框架需要根据具体场景和团队情况来判断：

### 决策指南

```
你的核心需求是什么？
│
├─ 快速原型验证 / 非开发者使用
│  └─▶ Dify
│
├─ 数据查询和知识库 Agent
│  └─▶ LlamaIndex
│
├─ 多 Agent 协作
│  ├─ 需要灵活的对话模式 → AutoGen
│  └─ 需要角色化团队协作 → CrewAI
│
└─ 通用 Agent 开发（推荐默认选择）
   └─▶ LangGraph
```

### 详细对比

| 考虑因素 | 推荐框架 | 原因 |
|---------|---------|------|
| **生产级应用** | LangGraph | 状态管理完善，可控性强 |
| **RAG 密集场景** | LlamaIndex | 数据连接和索引能力最强 |
| **快速搭建** | Dify / CrewAI | 上手成本低 |
| **代码生成场景** | AutoGen | 内置代码执行环境 |
| **企业私有部署** | Dify | 开源，支持私有化 |
| **最大灵活性** | LangGraph | 图编排支持任意工作流 |

<Warning>
框架发展非常快，API 变化频繁。建议始终参考各框架的**官方文档**获取最新用法。此外，不要过度依赖框架的高层抽象——理解底层原理（LLM 调用、工具调用、状态管理）才能在遇到问题时有效调试。
</Warning>

## 小结

当前 Agent 框架生态百花齐放，各有侧重。对于大多数开发者，建议从 **LangGraph** 入手——它提供了足够的灵活性和最活跃的社区支持。在后续章节中，我们将深入讲解工具调用机制，并使用 LangGraph 从零构建一个完整的 AI Agent 实战项目。
