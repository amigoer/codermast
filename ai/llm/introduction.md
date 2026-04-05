---
title: "大模型概述"
description: "大语言模型发展历程、核心能力与主流模型对比"
---

## 什么是大语言模型

大语言模型（Large Language Model，简称 LLM）是一类基于深度学习的自然语言处理模型，通过在海量文本数据上进行预训练，学会了语言的统计规律和语义表达能力。这类模型通常拥有数十亿甚至数千亿个参数，能够理解和生成自然语言文本。

与传统的 NLP 模型不同，LLM 具备以下显著特征：

- **涌现能力（Emergent Abilities）**：当模型规模达到一定程度后，会自发地展现出小模型不具备的能力，如逻辑推理、数学计算、代码生成等
- **上下文学习（In-Context Learning）**：无需额外训练，仅通过在提示词中提供少量示例，模型就能理解任务要求并给出正确回答
- **通用性**：一个模型可以处理多种类型的任务，包括翻译、摘要、问答、编程等

<Note>
LLM 的核心思想并不复杂——通过预测下一个 Token 来生成文本。但正是这种看似简单的训练目标，在足够大的数据和模型规模下，产生了令人惊叹的智能表现。
</Note>

## 发展历程

大语言模型的发展经历了几个重要阶段：

### 早期探索（2017-2019）

- **2017 年**：Google 发表论文 *"Attention is All You Need"*，提出 Transformer 架构，奠定了所有现代大模型的基础
- **2018 年**：OpenAI 发布 GPT-1（1.17 亿参数），首次验证了"预训练 + 微调"的范式
- **2018 年**：Google 发布 BERT，开创了双向预训练语言模型的先河
- **2019 年**：OpenAI 发布 GPT-2（15 亿参数），展示了更强的文本生成能力

### 规模化发展（2020-2022）

- **2020 年**：OpenAI 发布 GPT-3（1750 亿参数），证明了"规模定律"（Scaling Law）的有效性
- **2021 年**：Google 发布 PaLM，参数量达到 5400 亿
- **2022 年**：Meta 发布 LLaMA 系列开源模型，推动了开源社区的繁荣

### 爆发期（2022 至今）

- **2022 年 11 月**：OpenAI 发布 ChatGPT，LLM 正式走入大众视野
- **2023 年**：GPT-4 发布，多模态能力大幅提升；Claude、Gemini 等竞品相继推出
- **2024 年**：开源模型快速追赶，Llama 3、Qwen2、DeepSeek-V2 等模型性能不断突破
- **2025 年**：推理模型（如 OpenAI o1/o3、Claude Opus、DeepSeek-R1）成为新趋势，模型能力从单纯的文本生成拓展到深度推理

## 主流模型对比

下表列出了截至 2025 年的主流大语言模型：

| 模型 | 开发者 | 参数量 | 开源 | 主要特点 |
|------|--------|--------|------|----------|
| GPT-4o | OpenAI | 未公开 | 否 | 多模态、推理能力强、生态成熟 |
| Claude 3.5/4 | Anthropic | 未公开 | 否 | 长上下文、编程能力出色、安全性高 |
| Gemini 2.0 | Google | 未公开 | 否 | 多模态原生、搜索集成 |
| Llama 3 | Meta | 8B/70B/405B | 是 | 开源标杆、社区活跃 |
| Qwen2.5 | 阿里巴巴 | 0.5B-72B | 是 | 中文能力强、工具调用支持好 |
| DeepSeek-V3 | DeepSeek | 671B (MoE) | 是 | MoE 架构、性价比高 |
| DeepSeek-R1 | DeepSeek | 671B (MoE) | 是 | 推理能力强、思维链 |
| Mistral Large | Mistral AI | 未公开 | 部分 | 欧洲团队、多语言 |
| Yi-Lightning | 零一万物 | 未公开 | 部分 | 中文优化、速度快 |

<Tip>
选择模型时需要综合考虑：任务类型、预算、延迟要求、数据隐私等因素。对于大多数开发场景，建议先用闭源 API 快速验证想法，再根据需要切换到开源模型自行部署。
</Tip>

## 核心能力

现代大语言模型具备多种核心能力：

### 文本生成与理解

这是 LLM 最基础的能力，包括：

- 文章撰写、内容改写、翻译
- 文本摘要、信息提取
- 情感分析、文本分类

### 逻辑推理

较强的模型能够进行多步推理：

- 数学问题求解
- 逻辑推演与分析
- 常识推理

### 代码能力

LLM 在编程领域表现尤为突出：

- 代码生成与补全
- Bug 修复与代码审查
- 多语言代码转换
- 单元测试生成

### 多模态能力

最新一代模型普遍支持：

- 图像理解与描述
- 文档/图表解析
- 视觉推理

## Token 与上下文窗口

### 什么是 Token

Token 是 LLM 处理文本的基本单位。模型不直接处理文字，而是将文本分割成一系列 Token 后再进行计算。

```
# 英文示例
"Hello, world!" → ["Hello", ",", " world", "!"]  # 4 个 Token

# 中文示例
"你好世界" → ["你好", "世界"]  # 2 个 Token（取决于分词器）
```

不同模型使用不同的分词器（Tokenizer），常见的有：

- **BPE（Byte-Pair Encoding）**：GPT 系列使用
- **SentencePiece**：Llama、Qwen 等使用
- **WordPiece**：BERT 使用

<Note>
一个经验法则：英文中 1 个 Token 大约等于 0.75 个单词（即 4 个字符）；中文中 1 个 Token 大约对应 1-2 个汉字。但具体取决于所使用的分词器。
</Note>

### 上下文窗口（Context Window）

上下文窗口是模型在一次对话中能处理的最大 Token 数量。它决定了模型能"看到"多少内容。

| 模型 | 上下文窗口 |
|------|-----------|
| GPT-4o | 128K tokens |
| Claude 3.5 Sonnet | 200K tokens |
| Gemini 2.0 | 1M tokens |
| Llama 3 (405B) | 128K tokens |
| Qwen2.5 | 128K tokens |
| DeepSeek-V3 | 128K tokens |

上下文窗口越大，模型能处理越长的文档和对话历史，但也意味着更高的计算成本和延迟。

## 关键参数详解

在调用 LLM API 时，有几个核心参数直接影响生成结果的质量和风格：

### Temperature（温度）

Temperature 控制输出的随机性，取值范围通常为 `0` 到 `2`：

- **低温度（0-0.3）**：输出更确定、更保守，适合代码生成、事实性问答
- **中温度（0.5-0.7）**：平衡创造性和准确性，适合大多数通用场景
- **高温度（0.8-1.5）**：输出更多样化、更有创意，适合创意写作、头脑风暴

```python
# Temperature 对比示例
# temperature=0.1 → "北京是中国的首都。"
# temperature=1.0 → "北京，这座承载了千年历史的古都，如今作为中国的首都..."
```

### Top-p（核采样）

Top-p 也叫 Nucleus Sampling，它从概率累积达到 p 的最小 Token 集合中进行采样：

- **top_p=0.1**：只从概率最高的少数 Token 中选择
- **top_p=0.9**：从覆盖 90% 概率质量的 Token 集合中选择
- **top_p=1.0**：考虑所有 Token（默认值）

<Warning>
通常建议只调整 `temperature` 或 `top_p` 中的一个，同时调整两个参数可能导致不可预期的结果。
</Warning>

### 其他常见参数

| 参数 | 说明 | 典型值 |
|------|------|--------|
| `max_tokens` | 最大生成 Token 数 | 1024-4096 |
| `stop` | 停止生成的标记序列 | `["\n\n"]` |
| `frequency_penalty` | 降低重复 Token 的概率 | 0-2 |
| `presence_penalty` | 鼓励模型讨论新话题 | 0-2 |
| `system` | 系统提示词，定义模型行为 | 自定义文本 |

## API 调用基础

大多数 LLM 提供 HTTP API 接口，以下是常见的调用方式：

### OpenAI 兼容接口

目前大多数模型提供商都兼容 OpenAI 的 API 格式，这已成为事实上的行业标准：

```python
from openai import OpenAI

client = OpenAI(
    api_key="your-api-key",
    base_url="https://api.openai.com/v1"  # 可替换为其他提供商的地址
)

response = client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {"role": "system", "content": "你是一个有帮助的助手。"},
        {"role": "user", "content": "请解释什么是 Transformer 架构？"}
    ],
    temperature=0.7,
    max_tokens=1024
)

print(response.choices[0].message.content)
```

### Anthropic Claude API

Claude 有自己的 API 格式：

```python
import anthropic

client = anthropic.Anthropic(api_key="your-api-key")

message = client.messages.create(
    model="claude-sonnet-4-20250514",
    max_tokens=1024,
    system="你是一个有帮助的助手。",
    messages=[
        {"role": "user", "content": "请解释什么是 Transformer 架构？"}
    ]
)

print(message.content[0].text)
```

### 流式输出

对于较长的回复，通常使用流式输出（Streaming）来提升用户体验：

```python
# OpenAI 兼容的流式调用
stream = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": "写一首关于编程的诗"}],
    stream=True
)

for chunk in stream:
    if chunk.choices[0].delta.content:
        print(chunk.choices[0].delta.content, end="")
```

<Tip>
如果你刚开始接触 LLM 开发，建议从 OpenAI 兼容格式的 API 入手。许多国内提供商（如阿里云百炼、DeepSeek、智谱 AI）都支持这个格式，切换模型非常方便。
</Tip>

## 模型选型建议

根据不同的使用场景，以下是一些选型参考：

| 场景 | 推荐模型 | 理由 |
|------|----------|------|
| 快速原型验证 | GPT-4o / Claude Sonnet | API 接入简单、效果好 |
| 代码辅助开发 | Claude Sonnet / GPT-4o | 编程能力强 |
| 中文内容生成 | Qwen2.5 / DeepSeek-V3 | 中文优化好、性价比高 |
| 数据隐私敏感 | Llama 3 / Qwen2.5 本地部署 | 数据不出本地 |
| 长文档处理 | Claude / Gemini | 超长上下文支持 |
| 复杂推理任务 | Claude Opus / o3 / DeepSeek-R1 | 推理能力最强 |
| 预算有限 | DeepSeek-V3 / Qwen2.5 | 开源免费或 API 价格低 |

## 小结

大语言模型正在深刻改变软件开发和各行各业。作为开发者，理解 LLM 的基本原理、能力边界和使用方式，是利用好这项技术的第一步。后续章节将深入探讨 Transformer 架构原理、模型微调技术以及本地部署方案。
