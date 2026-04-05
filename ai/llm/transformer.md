---
title: "Transformer 架构"
description: "Transformer 架构详解：自注意力机制、位置编码、多头注意力"
---

## 为什么需要 Transformer

在 Transformer 出现之前，自然语言处理主要依赖 RNN（循环神经网络）及其变体 LSTM、GRU。这些模型存在几个关键问题：

- **顺序计算瓶颈**：RNN 必须按时间步逐个处理序列中的 Token，无法并行化，训练速度慢
- **长距离依赖困难**：即使有 LSTM 的门控机制，当序列很长时，模型仍然难以捕捉首尾之间的依赖关系
- **梯度消失/爆炸**：在反向传播过程中，梯度经过多步传递后容易变得极小或极大

2017 年，Google 的研究团队在论文 *"Attention is All You Need"* 中提出了 Transformer 架构，完全抛弃了循环结构，仅依靠注意力机制来建模序列中的依赖关系。

<Note>
Transformer 的核心创新在于：通过自注意力机制让序列中的每个位置都能直接关注到其他所有位置，从而彻底解决了长距离依赖问题，同时实现了高度并行化计算。
</Note>

## 整体架构

Transformer 采用经典的 **Encoder-Decoder（编码器-解码器）** 结构：

```
输入序列 → [Encoder × N] → 编码表示 → [Decoder × N] → 输出序列
```

架构示意图：

```
┌─────────────────────────────────────────────────────┐
│                    Decoder × N                       │
│  ┌───────────────────────────────────────────────┐  │
│  │          Feed-Forward Network                  │  │
│  ├───────────────────────────────────────────────┤  │
│  │     Cross-Attention (Q from Decoder,           │  │
│  │                      K,V from Encoder)         │  │
│  ├───────────────────────────────────────────────┤  │
│  │     Masked Self-Attention                      │  │
│  └───────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────┤
│                    Encoder × N                       │
│  ┌───────────────────────────────────────────────┐  │
│  │          Feed-Forward Network                  │  │
│  ├───────────────────────────────────────────────┤  │
│  │          Self-Attention                        │  │
│  └───────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────┤
│         Input Embedding + Positional Encoding        │
└─────────────────────────────────────────────────────┘
```

在原始论文中，Encoder 和 Decoder 各由 6 层堆叠而成。不过，现代大语言模型大多只使用 Decoder 部分（如 GPT 系列），或只使用 Encoder 部分（如 BERT）。

| 架构类型 | 代表模型 | 适用场景 |
|----------|---------|----------|
| Encoder-only | BERT, RoBERTa | 文本分类、NER、语义理解 |
| Decoder-only | GPT, Claude, Llama | 文本生成、对话、代码 |
| Encoder-Decoder | T5, BART | 翻译、摘要 |

## 自注意力机制（Self-Attention）

自注意力机制是 Transformer 的核心组件，它让序列中的每个 Token 都能"关注"到序列中所有其他 Token。

### 计算过程

给定输入序列的嵌入矩阵 **X**（形状为 `[seq_len, d_model]`），自注意力的计算步骤如下：

**第一步：生成 Q、K、V 矩阵**

通过三个可学习的线性变换，将输入映射为 Query（查询）、Key（键）和 Value（值）：

```
Q = X × W_Q    # Query 矩阵
K = X × W_K    # Key 矩阵
V = X × W_V    # Value 矩阵
```

**第二步：计算注意力分数**

使用 Q 和 K 的点积计算相似度，然后除以缩放因子 √d_k：

```
Attention Score = (Q × K^T) / √d_k
```

这里 d_k 是 Key 的维度。除以 √d_k 的目的是防止点积值过大导致 Softmax 梯度消失。

**第三步：应用 Softmax**

对注意力分数进行 Softmax 归一化，得到注意力权重：

```
Attention Weights = Softmax(Attention Score)
```

**第四步：加权求和**

用注意力权重对 V 进行加权求和：

```
Output = Attention Weights × V
```

完整的公式可以写成：

```
Attention(Q, K, V) = Softmax(Q × K^T / √d_k) × V
```

### 直觉理解

可以用一个类比来理解 Q、K、V：

- **Query（查询）**：相当于"我在找什么信息"
- **Key（键）**：相当于"我有什么信息可以提供"
- **Value（值）**：相当于"我实际的信息内容"

注意力分数就是 Query 和 Key 的匹配程度，分数越高，对应的 Value 在输出中占的比重就越大。

### PyTorch 实现

```python
import torch
import torch.nn as nn
import torch.nn.functional as F
import math

class SelfAttention(nn.Module):
    def __init__(self, d_model):
        super().__init__()
        self.d_model = d_model
        self.W_Q = nn.Linear(d_model, d_model)
        self.W_K = nn.Linear(d_model, d_model)
        self.W_V = nn.Linear(d_model, d_model)

    def forward(self, x, mask=None):
        # x: [batch_size, seq_len, d_model]
        Q = self.W_Q(x)
        K = self.W_K(x)
        V = self.W_V(x)

        # 计算注意力分数
        d_k = Q.size(-1)
        scores = torch.matmul(Q, K.transpose(-2, -1)) / math.sqrt(d_k)

        # 可选：应用掩码（用于 Decoder 的因果注意力）
        if mask is not None:
            scores = scores.masked_fill(mask == 0, float('-inf'))

        # Softmax 归一化
        attn_weights = F.softmax(scores, dim=-1)

        # 加权求和
        output = torch.matmul(attn_weights, V)
        return output
```

## 多头注意力（Multi-Head Attention）

单个注意力头只能关注一种模式的依赖关系。多头注意力通过并行运行多个注意力头，让模型同时学习不同类型的注意力模式。

### 工作原理

```
MultiHead(Q, K, V) = Concat(head_1, head_2, ..., head_h) × W_O

其中 head_i = Attention(Q × W_Q_i, K × W_K_i, V × W_V_i)
```

例如，在原始 Transformer 中：

- `d_model = 512`（模型维度）
- `h = 8`（注意力头数）
- `d_k = d_v = d_model / h = 64`（每个头的维度）

<Tip>
不同的注意力头可以学习关注不同的语言特征：有的头关注语法结构，有的头关注语义关系，有的头关注位置关系。这种分工使模型的表达能力大大增强。
</Tip>

### PyTorch 实现

```python
class MultiHeadAttention(nn.Module):
    def __init__(self, d_model, num_heads):
        super().__init__()
        assert d_model % num_heads == 0

        self.d_model = d_model
        self.num_heads = num_heads
        self.d_k = d_model // num_heads

        self.W_Q = nn.Linear(d_model, d_model)
        self.W_K = nn.Linear(d_model, d_model)
        self.W_V = nn.Linear(d_model, d_model)
        self.W_O = nn.Linear(d_model, d_model)

    def forward(self, x, mask=None):
        batch_size, seq_len, _ = x.size()

        # 线性变换后拆分为多头
        Q = self.W_Q(x).view(batch_size, seq_len, self.num_heads, self.d_k).transpose(1, 2)
        K = self.W_K(x).view(batch_size, seq_len, self.num_heads, self.d_k).transpose(1, 2)
        V = self.W_V(x).view(batch_size, seq_len, self.num_heads, self.d_k).transpose(1, 2)
        # 形状: [batch_size, num_heads, seq_len, d_k]

        # 计算注意力
        scores = torch.matmul(Q, K.transpose(-2, -1)) / math.sqrt(self.d_k)
        if mask is not None:
            scores = scores.masked_fill(mask == 0, float('-inf'))
        attn_weights = F.softmax(scores, dim=-1)
        context = torch.matmul(attn_weights, V)

        # 合并多头
        context = context.transpose(1, 2).contiguous().view(batch_size, seq_len, self.d_model)
        output = self.W_O(context)
        return output
```

## 位置编码（Positional Encoding）

由于自注意力机制本身不包含位置信息（它对 Token 的顺序不敏感），Transformer 需要额外注入位置信息。

### 正弦位置编码

原始论文使用固定的正弦和余弦函数来生成位置编码：

```
PE(pos, 2i)   = sin(pos / 10000^(2i/d_model))
PE(pos, 2i+1) = cos(pos / 10000^(2i/d_model))
```

其中 `pos` 是位置索引，`i` 是维度索引。

这种编码的优点：

- 每个位置都有唯一的编码
- 可以表达相对位置关系（通过三角函数的性质）
- 理论上可以扩展到任意长度

### 旋转位置编码（RoPE）

现代大模型普遍采用旋转位置编码（Rotary Position Embedding），由苏剑林提出。RoPE 将位置信息融入到注意力计算中，通过对 Q 和 K 向量进行旋转变换来编码位置：

```python
def apply_rope(x, cos, sin):
    """应用旋转位置编码"""
    # x: [batch_size, seq_len, num_heads, d_k]
    x1, x2 = x[..., ::2], x[..., 1::2]  # 拆分为奇偶维度
    # 旋转变换
    rotated = torch.cat([-x2, x1], dim=-1)
    return x * cos + rotated * sin
```

RoPE 的优势在于它天然支持相对位置编码，且在外推长度（处理比训练时更长的序列）方面表现更好。Llama、Qwen、DeepSeek 等主流开源模型都使用了 RoPE。

<Note>
位置编码的选择直接影响模型处理长序列的能力。许多扩展上下文窗口的技术（如 ALiBi、YaRN、NTK-aware 插值）本质上都是对位置编码的改进。
</Note>

## 前馈神经网络（Feed-Forward Network）

Transformer 的每一层都包含一个前馈神经网络（FFN），位于注意力层之后：

```
FFN(x) = W_2 × Activation(W_1 × x + b_1) + b_2
```

原始 Transformer 使用 ReLU 激活函数，现代模型通常使用 SwiGLU 或 GELU：

```python
# SwiGLU FFN（LLaMA、Qwen 等使用）
class SwiGLU_FFN(nn.Module):
    def __init__(self, d_model, d_ff):
        super().__init__()
        self.w1 = nn.Linear(d_model, d_ff, bias=False)
        self.w2 = nn.Linear(d_ff, d_model, bias=False)
        self.w3 = nn.Linear(d_model, d_ff, bias=False)

    def forward(self, x):
        return self.w2(F.silu(self.w1(x)) * self.w3(x))
```

FFN 的中间维度 `d_ff` 通常是 `d_model` 的 4 倍（原始论文中 `d_model=512`，`d_ff=2048`）。FFN 被认为是模型存储"知识"的主要组件。

## Layer Normalization

Layer Normalization（层归一化）用于稳定训练过程，加速收敛。它对每个样本的每一层独立进行归一化：

```
LayerNorm(x) = γ × (x - μ) / (σ + ε) + β
```

其中 μ 和 σ 分别是均值和标准差，γ 和 β 是可学习参数。

### Pre-Norm vs Post-Norm

```
# Post-Norm（原始 Transformer）
x = LayerNorm(x + Sublayer(x))

# Pre-Norm（现代大模型主流选择）
x = x + Sublayer(LayerNorm(x))
```

现代大模型几乎都采用 Pre-Norm 方案，因为它在训练大模型时更稳定。部分模型（如 Llama）使用 RMSNorm 替代 LayerNorm，计算更高效：

```python
class RMSNorm(nn.Module):
    def __init__(self, d_model, eps=1e-6):
        super().__init__()
        self.weight = nn.Parameter(torch.ones(d_model))
        self.eps = eps

    def forward(self, x):
        rms = torch.sqrt(torch.mean(x ** 2, dim=-1, keepdim=True) + self.eps)
        return x / rms * self.weight
```

## 残差连接（Residual Connection）

每个子层（注意力层和 FFN）都使用残差连接，将输入直接加到输出上：

```
output = x + Sublayer(x)
```

残差连接的作用：

- 缓解深层网络的梯度消失问题
- 允许信息直接跳过某些层传递
- 使得训练非常深的网络成为可能（现代大模型可达 80+ 层）

## Decoder 的因果掩码

在 Decoder-only 的 LLM 中，一个关键设计是**因果掩码（Causal Mask）**。它确保在生成第 t 个 Token 时，模型只能看到位置 1 到 t-1 的 Token，而看不到未来的 Token：

```python
def create_causal_mask(seq_len):
    """创建因果掩码（下三角矩阵）"""
    mask = torch.tril(torch.ones(seq_len, seq_len))
    return mask

# 示例：seq_len=4
# [[1, 0, 0, 0],
#  [1, 1, 0, 0],
#  [1, 1, 1, 0],
#  [1, 1, 1, 1]]
```

在计算注意力分数时，被掩码位置的值设为负无穷，经过 Softmax 后变为 0，从而实现"看不到未来"的效果。

<Warning>
因果掩码是 LLM 自回归生成的基础。如果在训练中错误地暴露了未来信息（即数据泄露），模型会学到"作弊"的捷径，导致生成质量严重下降。
</Warning>

## KV Cache 优化

在自回归生成过程中，每生成一个新 Token，都需要重新计算整个序列的注意力。KV Cache 通过缓存已计算过的 Key 和 Value 矩阵来避免重复计算：

```python
# 无 KV Cache：每步都重算所有 Token 的 K、V
# 生成第 t 个 Token 时，计算量 = O(t × d_model)

# 有 KV Cache：只计算新 Token 的 K、V，复用之前的缓存
# 生成第 t 个 Token 时，计算量 = O(d_model)，但需要 O(t) 的内存
```

KV Cache 是现代 LLM 推理中最重要的优化之一，但它也带来了显存占用的挑战，尤其是在长上下文场景下。GQA（Grouped-Query Attention）和 MQA（Multi-Query Attention）等技术通过减少 KV 头数来降低缓存开销。

## 从论文到实践

*"Attention is All You Need"* 论文中的关键超参数：

| 参数 | 值 | 说明 |
|------|---|------|
| d_model | 512 | 模型维度 |
| d_ff | 2048 | FFN 中间维度 |
| h | 8 | 注意力头数 |
| N | 6 | Encoder/Decoder 层数 |
| d_k = d_v | 64 | 每个头的维度 |

而现代大模型的规模已经远超原始论文：

| 模型 | d_model | 层数 | 注意力头数 | 参数量 |
|------|---------|------|-----------|--------|
| GPT-3 | 12288 | 96 | 96 | 175B |
| Llama 3 70B | 8192 | 80 | 64 | 70B |
| Qwen2.5 72B | 8192 | 80 | 64 | 72B |

## 小结

Transformer 架构是现代所有大语言模型的基石。理解自注意力机制、多头注意力、位置编码等核心组件，有助于深入理解模型的工作原理，也为后续的模型微调和部署优化打下理论基础。

核心要点回顾：

- **自注意力机制**：让每个 Token 能关注序列中的所有其他 Token
- **多头注意力**：并行学习多种注意力模式
- **位置编码**：注入序列的位置信息
- **FFN**：存储知识的主要组件
- **残差连接 + Layer Norm**：保证深层网络的稳定训练
- **因果掩码**：实现自回归生成
