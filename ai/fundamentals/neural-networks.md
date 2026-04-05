---
title: "神经网络原理"
description: "神经网络架构：CNN、RNN、注意力机制"
---

## 概述

神经网络架构的设计决定了模型能处理什么类型的数据。不同的任务（图像、文本、序列）需要不同的网络结构。本文介绍三种最重要的神经网络架构：CNN、RNN 及其变体，以及注意力机制。

```
神经网络架构演进:

全连接网络 → CNN（图像） → RNN/LSTM（序列） → Attention → Transformer（通用）
```

## 卷积神经网络（CNN）

CNN 是处理图像数据的核心架构。其核心思想是利用**局部感受野**和**权重共享**来高效提取空间特征。

### 为什么需要 CNN

一张 224x224 的 RGB 图片有 224 × 224 × 3 = 150,528 个像素值。如果用全连接网络直接处理，第一个隐藏层（假设 1024 个神经元）就需要 1.5 亿个参数——计算量巨大且极易过拟合。

CNN 通过卷积操作解决了这个问题：

- **局部连接**：每个神经元只关注输入的一小块区域
- **权重共享**：同一个卷积核在整个图像上滑动，大幅减少参数量
- **平移不变性**：无论目标出现在图像的哪个位置，都能被检测到

### 卷积操作（Convolution）

卷积核（Filter/Kernel）是一个小矩阵，在输入图像上滑动，逐个位置计算点积，生成特征图（Feature Map）。

```
输入 (5×5)          卷积核 (3×3)        输出特征图 (3×3)
┌─┬─┬─┬─┬─┐        ┌─┬─┬─┐           ┌──┬──┬──┐
│1│0│1│0│1│        │1│0│1│           │ 4│ 3│ 4│
├─┼─┼─┼─┼─┤        ├─┼─┼─┤           ├──┼──┼──┤
│0│1│0│1│0│   *    │0│1│0│    =      │ 2│ 4│ 3│
├─┼─┼─┼─┼─┤        ├─┼─┼─┤           ├──┼──┼──┤
│1│0│1│0│1│        │1│0│1│           │ 4│ 3│ 4│
├─┼─┼─┼─┼─┤        └─┴─┴─┘           └──┴──┴──┘
│0│1│0│1│0│
├─┼─┼─┼─┼─┤
│1│0│1│0│1│
└─┴─┴─┴─┴─┘
```

关键参数：

| 参数 | 说明 | 影响 |
|------|------|------|
| kernel_size | 卷积核大小 | 感受野范围，常用 3×3、5×5 |
| stride | 滑动步长 | 步长越大，输出越小 |
| padding | 边缘填充 | 控制输出尺寸，`same` padding 保持尺寸不变 |
| out_channels | 卷积核数量 | 决定输出特征图的数量（通道数） |

```python
import torch.nn as nn

# 卷积层：输入 3 通道（RGB），输出 64 个特征图，3×3 卷积核
conv = nn.Conv2d(in_channels=3, out_channels=64, kernel_size=3, stride=1, padding=1)

# 输出尺寸计算：(输入尺寸 - kernel_size + 2 * padding) / stride + 1
# (224 - 3 + 2) / 1 + 1 = 224  (尺寸保持不变)
```

### 池化操作（Pooling）

池化层对特征图进行下采样，减少数据量并增强特征的鲁棒性。

- **最大池化（Max Pooling）**：取窗口内最大值，保留最显著的特征
- **平均池化（Average Pooling）**：取窗口内平均值，保留整体信息

```python
# 2×2 最大池化，步长为 2，将特征图尺寸减半
max_pool = nn.MaxPool2d(kernel_size=2, stride=2)

# 全局平均池化，将每个特征图压缩为一个值
global_avg_pool = nn.AdaptiveAvgPool2d(1)
```

### 经典 CNN 架构

| 架构 | 年份 | 层数 | 关键创新 |
|------|------|------|---------|
| LeNet-5 | 1998 | 5 | CNN 的开山之作 |
| AlexNet | 2012 | 8 | ReLU + Dropout，开启深度学习时代 |
| VGGNet | 2014 | 16/19 | 统一使用 3×3 小卷积核 |
| GoogLeNet | 2014 | 22 | Inception 模块，多尺度特征 |
| ResNet | 2015 | 50/101/152 | 残差连接，解决梯度消失 |
| EfficientNet | 2019 | 变化 | 统一缩放深度/宽度/分辨率 |

<Note>
ResNet 提出的残差连接（Skip Connection）是深度学习领域最重要的突破之一。它让梯度可以直接跳过若干层传播，从而训练数百层深的网络。这个思想至今仍被广泛使用（包括 Transformer）。
</Note>

### PyTorch 实现一个简单的 CNN

```python
import torch
import torch.nn as nn
import torch.nn.functional as F

class SimpleCNN(nn.Module):
    def __init__(self, num_classes=10):
        super().__init__()
        # 特征提取部分
        self.features = nn.Sequential(
            nn.Conv2d(1, 32, kernel_size=3, padding=1),   # 28×28×1 → 28×28×32
            nn.ReLU(),
            nn.MaxPool2d(2),                               # 28×28×32 → 14×14×32

            nn.Conv2d(32, 64, kernel_size=3, padding=1),   # 14×14×32 → 14×14×64
            nn.ReLU(),
            nn.MaxPool2d(2),                               # 14×14×64 → 7×7×64
        )
        # 分类部分
        self.classifier = nn.Sequential(
            nn.Flatten(),
            nn.Linear(64 * 7 * 7, 128),
            nn.ReLU(),
            nn.Dropout(0.5),
            nn.Linear(128, num_classes)
        )

    def forward(self, x):
        x = self.features(x)
        x = self.classifier(x)
        return x

model = SimpleCNN()
# 测试前向传播
sample = torch.randn(1, 1, 28, 28)
output = model(sample)
print(f"输出形状: {output.shape}")  # torch.Size([1, 10])
```

## 循环神经网络（RNN）

RNN 专为处理序列数据设计，通过隐藏状态在时间步之间传递信息，使网络具有"记忆"能力。

### 基本 RNN

在每个时间步 t，RNN 接收当前输入 x_t 和上一时刻的隐藏状态 h_(t-1)，计算新的隐藏状态：

$$h_t = tanh(W_{xh} x_t + W_{hh} h_{t-1} + b)$$

```
     h0      h1      h2      h3
     ↑       ↑       ↑       ↑
  ┌──┴──┐ ┌──┴──┐ ┌──┴──┐ ┌──┴──┐
  │ RNN │→│ RNN │→│ RNN │→│ RNN │→ ...
  └──┬──┘ └──┬──┘ └──┬──┘ └──┬──┘
     ↑       ↑       ↑       ↑
     x0      x1      x2      x3
   ("我")  ("喜欢") ("机器")  ("学习")
```

```python
import torch.nn as nn

# 基本 RNN
rnn = nn.RNN(input_size=128, hidden_size=256, num_layers=2, batch_first=True)

# 输入：batch_size=32, 序列长度=50, 每个 token 的维度=128
x = torch.randn(32, 50, 128)
output, hidden = rnn(x)

print(f"输出形状: {output.shape}")   # (32, 50, 256) - 每个时间步的隐藏状态
print(f"隐藏状态: {hidden.shape}")   # (2, 32, 256) - 最后时间步的隐藏状态
```

<Warning>
基本 RNN 存在严重的**梯度消失**问题：当序列很长时，早期时间步的信息在反向传播中逐渐衰减，导致模型无法学习长距离依赖。在实际应用中应使用 LSTM 或 GRU 替代。
</Warning>

### LSTM（长短期记忆网络）

LSTM 通过引入**门控机制**（遗忘门、输入门、输出门）和独立的细胞状态来解决长距离依赖问题。

```
细胞状态 C (信息高速公路，贯穿整个序列)
───────────────×─────────+──────────────→
              ↑         ↑
           遗忘门     输入门
           (forget)   (input)
              ↑         ↑
         ┌────┴─────────┴────┐
         │      LSTM Cell    │──→ h_t (输出门控制)
         └────────┬──────────┘
                  ↑
            [h_{t-1}, x_t]
```

三个门的作用：

| 门 | 功能 | 直觉理解 |
|----|------|---------|
| 遗忘门（Forget Gate） | 决定丢弃哪些旧信息 | "忘掉不重要的" |
| 输入门（Input Gate） | 决定存储哪些新信息 | "记住重要的新内容" |
| 输出门（Output Gate） | 决定输出哪些信息 | "挑选当前需要的" |

```python
# LSTM
lstm = nn.LSTM(input_size=128, hidden_size=256, num_layers=2,
               batch_first=True, dropout=0.2, bidirectional=True)

x = torch.randn(32, 50, 128)
output, (hidden, cell) = lstm(x)

# 双向 LSTM 的输出维度是 hidden_size × 2
print(f"输出形状: {output.shape}")   # (32, 50, 512)
print(f"隐藏状态: {hidden.shape}")   # (4, 32, 256) - 2 layers × 2 directions
```

### GRU（门控循环单元）

GRU 是 LSTM 的简化版本，将遗忘门和输入门合并为**更新门**，并引入**重置门**。参数更少，训练更快，效果通常与 LSTM 相当。

```python
# GRU
gru = nn.GRU(input_size=128, hidden_size=256, num_layers=2,
             batch_first=True, dropout=0.2)

x = torch.randn(32, 50, 128)
output, hidden = gru(x)
print(f"输出形状: {output.shape}")   # (32, 50, 256)
```

### RNN 变体对比

| 模型 | 参数量 | 长距离依赖 | 训练速度 | 推荐程度 |
|------|--------|-----------|---------|---------|
| Vanilla RNN | 少 | 差 | 快 | 不推荐 |
| LSTM | 多（4 倍于 RNN） | 好 | 慢 | 推荐 |
| GRU | 中（3 倍于 RNN） | 好 | 较快 | 推荐 |

<Tip>
在大多数场景下，GRU 和 LSTM 效果差异不大。如果计算资源有限或序列不太长，优先尝试 GRU；如果任务对长距离依赖很敏感（如长文档理解），LSTM 可能更稳健。
</Tip>

## 注意力机制（Attention Mechanism）

注意力机制是近年来最重要的深度学习创新，也是 Transformer 架构的核心。它允许模型在处理某个位置时，动态关注输入序列中最相关的部分。

### 为什么需要注意力

RNN/LSTM 通过固定长度的隐藏状态来压缩整个序列的信息，这成为信息瓶颈。对于长序列，早期的信息仍可能丢失。注意力机制让模型可以"直接回看"输入序列的任意位置。

### 注意力的计算过程

注意力的核心是三个概念：**Query（查询）**、**Key（键）**、**Value（值）**。

```
计算过程：
1. 计算 Query 和每个 Key 的相似度（点积）
2. 通过 Softmax 将相似度转为权重（和为 1）
3. 用权重对 Value 做加权求和，得到输出

Attention(Q, K, V) = softmax(Q × K^T / √d_k) × V
```

```python
import torch
import torch.nn.functional as F
import math

def scaled_dot_product_attention(query, key, value, mask=None):
    """缩放点积注意力"""
    d_k = query.size(-1)

    # 计算注意力分数
    scores = torch.matmul(query, key.transpose(-2, -1)) / math.sqrt(d_k)

    # 可选的掩码（用于解码器中屏蔽未来位置）
    if mask is not None:
        scores = scores.masked_fill(mask == 0, float('-inf'))

    # Softmax 归一化为权重
    attention_weights = F.softmax(scores, dim=-1)

    # 加权求和
    output = torch.matmul(attention_weights, value)
    return output, attention_weights

# 示例
seq_len, d_model = 10, 64
Q = torch.randn(1, seq_len, d_model)
K = torch.randn(1, seq_len, d_model)
V = torch.randn(1, seq_len, d_model)

output, weights = scaled_dot_product_attention(Q, K, V)
print(f"输出形状: {output.shape}")           # (1, 10, 64)
print(f"注意力权重形状: {weights.shape}")     # (1, 10, 10)
```

### 多头注意力（Multi-Head Attention）

多头注意力将 Q、K、V 分成多个"头"并行计算注意力，再拼接结果。这让模型能同时关注不同位置的不同类型信息。

```python
class MultiHeadAttention(nn.Module):
    def __init__(self, d_model=512, num_heads=8):
        super().__init__()
        self.num_heads = num_heads
        self.d_k = d_model // num_heads

        self.W_q = nn.Linear(d_model, d_model)
        self.W_k = nn.Linear(d_model, d_model)
        self.W_v = nn.Linear(d_model, d_model)
        self.W_o = nn.Linear(d_model, d_model)

    def forward(self, query, key, value, mask=None):
        batch_size = query.size(0)

        # 线性投影并拆分为多头
        Q = self.W_q(query).view(batch_size, -1, self.num_heads, self.d_k).transpose(1, 2)
        K = self.W_k(key).view(batch_size, -1, self.num_heads, self.d_k).transpose(1, 2)
        V = self.W_v(value).view(batch_size, -1, self.num_heads, self.d_k).transpose(1, 2)

        # 计算注意力
        output, _ = scaled_dot_product_attention(Q, K, V, mask)

        # 拼接多头结果
        output = output.transpose(1, 2).contiguous().view(batch_size, -1, self.num_heads * self.d_k)
        return self.W_o(output)

mha = MultiHeadAttention(d_model=512, num_heads=8)
x = torch.randn(2, 20, 512)  # batch=2, 序列长度=20, 维度=512
out = mha(x, x, x)           # 自注意力：Q=K=V
print(f"多头注意力输出: {out.shape}")  # (2, 20, 512)
```

<Note>
当 Query、Key、Value 来自同一个输入时，称为**自注意力（Self-Attention）**。自注意力让序列中的每个位置都能直接关注其他所有位置，克服了 RNN 需要逐步传递信息的限制。这是 Transformer 能够并行处理序列的关键。
</Note>

### 注意力的类型

| 类型 | Q / K / V 来源 | 应用场景 |
|------|----------------|---------|
| 自注意力 | 同一序列 | Transformer 编码器 |
| 交叉注意力 | Q 来自解码器，K/V 来自编码器 | 机器翻译、图像描述 |
| 因果注意力 | 同一序列 + 掩码 | GPT 等自回归模型 |

## 常见应用场景

### 图像分类（CNN）

```python
import torchvision.models as models

# 使用预训练的 ResNet-18 进行迁移学习
model = models.resnet18(pretrained=True)

# 冻结特征提取层
for param in model.parameters():
    param.requires_grad = False

# 替换最后的全连接层（适配自定义类别数）
model.fc = nn.Linear(model.fc.in_features, num_classes=5)

# 只训练新加的全连接层
optimizer = torch.optim.Adam(model.fc.parameters(), lr=0.001)
```

<Tip>
迁移学习是实际项目中最常用的方法。使用在 ImageNet 上预训练好的模型作为特征提取器，只需少量数据就能训练出效果不错的分类器。
</Tip>

### 文本分类（RNN / Attention）

```python
class TextClassifier(nn.Module):
    def __init__(self, vocab_size, embed_dim=128, hidden_dim=256, num_classes=4):
        super().__init__()
        self.embedding = nn.Embedding(vocab_size, embed_dim)
        self.lstm = nn.LSTM(embed_dim, hidden_dim, batch_first=True, bidirectional=True)
        self.classifier = nn.Linear(hidden_dim * 2, num_classes)

    def forward(self, x):
        embedded = self.embedding(x)                # (batch, seq_len, embed_dim)
        output, (hidden, _) = self.lstm(embedded)   # output: (batch, seq_len, hidden*2)

        # 取最后时间步的输出进行分类
        last_output = output[:, -1, :]
        return self.classifier(last_output)

model = TextClassifier(vocab_size=10000)
tokens = torch.randint(0, 10000, (16, 100))  # 16 个句子，每句 100 个 token
output = model(tokens)
print(f"分类输出: {output.shape}")  # (16, 4)
```

### 序列到序列（Seq2Seq）

Seq2Seq 模型将一个序列映射到另一个序列，典型应用包括机器翻译、文本摘要、对话系统等。

```
编码器 (Encoder)              解码器 (Decoder)
┌─────┐ ┌─────┐ ┌─────┐     ┌─────┐ ┌─────┐ ┌─────┐
│LSTM │→│LSTM │→│LSTM │──→──│LSTM │→│LSTM │→│LSTM │
└──┬──┘ └──┬──┘ └──┬──┘     └──┬──┘ └──┬──┘ └──┬──┘
   ↑       ↑       ↑           ↓       ↓       ↓
  "I"   "love"   "you"       "我"     "爱"    "你"
```

加入注意力机制后，解码器在生成每个词时可以动态关注编码器中最相关的部分，显著提升了翻译质量。

## 架构选型指南

| 任务类型 | 推荐架构 | 说明 |
|----------|---------|------|
| 图像分类 | CNN (ResNet, EfficientNet) | 成熟方案，预训练模型丰富 |
| 目标检测 | CNN (YOLO, Faster R-CNN) | 实时检测优先选 YOLO |
| 文本分类 | Transformer (BERT) | 当前最佳方案 |
| 机器翻译 | Transformer | 已全面取代 RNN Seq2Seq |
| 语音识别 | Transformer (Whisper) | CNN+RNN 组合仍有使用 |
| 时间序列 | LSTM / Transformer | 短序列用 LSTM，长序列用 Transformer |

<Warning>
虽然 Transformer 在 NLP 领域已全面取代 RNN，但在资源受限的场景（嵌入式设备、实时系统）或短序列任务中，LSTM/GRU 仍然是高效的选择。选择架构时应综合考虑任务需求、数据量和计算资源。
</Warning>

## 小结

三种核心架构的定位：

- **CNN**：通过局部卷积和池化提取空间特征，是图像处理的基石
- **RNN/LSTM/GRU**：通过隐藏状态传递时序信息，适合序列建模
- **注意力机制**：打破位置限制，动态建模序列中任意位置间的关系

Transformer 架构将自注意力机制作为核心构建块，结合了并行计算的效率和全局关系建模的能力，已成为当前最主流的深度学习架构。后续可以进一步学习 Transformer 的完整架构以及基于它的大语言模型（LLM）。
