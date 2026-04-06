---
title: "文本嵌入"
description: "文本嵌入模型：Embedding 原理、模型选择、相似度计算"
---

## 什么是文本嵌入

文本嵌入（Text Embedding）是将文本（词、句子、段落或文档）转换为**固定维度的稠密向量**的技术。这些向量能够在数学空间中捕捉文本的语义信息——语义相似的文本在向量空间中距离更近，语义不同的文本距离更远。

```
"Go 语言的并发模型"  →  [0.12, -0.34, 0.56, ..., 0.78]  (1536维)
"Golang 的 goroutine" →  [0.11, -0.32, 0.58, ..., 0.75]  (1536维)
"今天天气不错"        →  [0.89, 0.23, -0.45, ..., -0.12]  (1536维)

前两个向量距离很近（语义相关），第三个向量距离较远（语义无关）
```

文本嵌入是 RAG 系统的**关键桥梁**——它将人类可读的文本转换为机器可计算的数值表示，使得语义级别的相似度搜索成为可能。

## 嵌入模型的工作原理

### 从词嵌入到句子嵌入

文本嵌入技术经历了几个重要的发展阶段：

1. **Word2Vec / GloVe（2013-2014）**：为每个词生成一个固定向量，但无法处理一词多义
2. **ELMo（2018）**：基于上下文的词嵌入，同一个词在不同语境中有不同的向量表示
3. **BERT 及其变体（2018-2020）**：基于 Transformer 架构，生成高质量的上下文感知嵌入
4. **专用嵌入模型（2022-至今）**：如 E5、BGE、GTE 等，专门为检索任务优化的嵌入模型

### 现代嵌入模型的架构

当前主流的嵌入模型基于 **Transformer 编码器**架构，其核心流程为：

```
输入文本 → Tokenizer 分词 → Transformer 编码器 → Pooling 池化 → 归一化 → 嵌入向量
```

**池化策略**决定了如何将 Transformer 输出的 token 级别向量聚合为一个句子级别的向量：

- **[CLS] token 池化**：取特殊标记 [CLS] 对应的输出向量
- **平均池化（Mean Pooling）**：对所有 token 的输出向量取平均值（最常用）
- **最大池化（Max Pooling）**：对每个维度取所有 token 中的最大值

<Note>
现代嵌入模型（如 BGE、E5）通常在训练时已经内置了最优的池化策略，使用者只需调用模型接口即可，无需手动处理池化逻辑。
</Note>

## 主流嵌入模型

### 模型对比

| 模型 | 提供方 | 维度 | 最大 Token | 中文支持 | 类型 | MTEB 排名 |
|------|-------|------|-----------|---------|------|----------|
| text-embedding-3-large | OpenAI | 3072 | 8191 | 良好 | API 服务 | 前列 |
| text-embedding-3-small | OpenAI | 1536 | 8191 | 良好 | API 服务 | 中上 |
| BGE-large-zh-v1.5 | BAAI(智源) | 1024 | 512 | 优秀 | 开源模型 | 中文前列 |
| BGE-M3 | BAAI(智源) | 1024 | 8192 | 优秀 | 开源模型 | 多语言前列 |
| M3E-base | Moka AI | 768 | 512 | 优秀 | 开源模型 | 中文中上 |
| Jina-embeddings-v3 | Jina AI | 1024 | 8192 | 良好 | 开源/API | 前列 |
| GTE-Qwen2 | 阿里巴巴 | 1536 | 32768 | 优秀 | 开源模型 | 前列 |
| E5-mistral-7b | 微软 | 4096 | 32768 | 良好 | 开源模型 | 前列 |

### OpenAI text-embedding-3

OpenAI 的第三代嵌入模型，提供 small 和 large 两个规格。支持通过 `dimensions` 参数灵活调整输出维度，在性价比和质量之间取得了很好的平衡。

**优点：** 使用简单、质量稳定、支持动态降维
**缺点：** 需要网络调用、有费用、数据隐私考虑

### BGE 系列（BAAI General Embedding）

智源研究院开发的开源嵌入模型，尤其是 **BGE-M3**，支持多语言、多粒度、多功能（dense + sparse + colbert），是目前综合能力最强的开源嵌入模型之一。

**优点：** 开源免费、中文效果好、支持本地部署
**缺点：** 需要 GPU 资源、需要自行部署

### M3E

Moka AI 开源的中文嵌入模型，针对中文语料进行了专门优化，在中文文本检索和语义匹配任务上表现优异。

**优点：** 中文效果突出、模型轻量
**缺点：** 英文能力相对较弱、Token 限制较短

### Jina Embeddings

Jina AI 提供的嵌入模型，v3 版本支持 8192 token 的长文本输入和多任务优化。同时提供 API 服务和开源模型。

<Tip>
选择嵌入模型时的关键考虑因素：如果你的数据以中文为主且需要本地部署，优先考虑 BGE 系列；如果追求快速集成且对费用不敏感，OpenAI 的 API 是最便捷的选择；如果需要处理超长文档，关注支持长上下文窗口的模型（如 BGE-M3、GTE-Qwen2）。
</Tip>

## 代码示例

### 使用 OpenAI 嵌入模型

```python
from openai import OpenAI
import numpy as np

client = OpenAI(api_key="your-api-key")

def get_embedding(text: str, model: str = "text-embedding-3-small") -> list[float]:
    """获取文本的嵌入向量"""
    response = client.embeddings.create(
        input=text,
        model=model
    )
    return response.data[0].embedding

def get_embeddings_batch(texts: list[str], model: str = "text-embedding-3-small") -> list[list[float]]:
    """批量获取嵌入向量（效率更高）"""
    response = client.embeddings.create(
        input=texts,
        model=model
    )
    return [item.embedding for item in response.data]

# 单条文本嵌入
embedding = get_embedding("RAG 是检索增强生成技术")
print(f"向量维度: {len(embedding)}")  # 输出: 1536

# 批量嵌入
texts = [
    "Docker 容器化部署",
    "Kubernetes 集群管理",
    "今天吃什么",
]
embeddings = get_embeddings_batch(texts)

# 计算相似度
def cosine_similarity(a, b):
    a, b = np.array(a), np.array(b)
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

sim_01 = cosine_similarity(embeddings[0], embeddings[1])
sim_02 = cosine_similarity(embeddings[0], embeddings[2])
print(f"Docker vs Kubernetes 相似度: {sim_01:.4f}")  # 较高
print(f"Docker vs 今天吃什么 相似度: {sim_02:.4f}")  # 较低
```

### 使用 OpenAI 动态降维

```python
# text-embedding-3 系列支持通过 dimensions 参数降维
response = client.embeddings.create(
    input="RAG 检索增强生成",
    model="text-embedding-3-large",
    dimensions=512  # 将 3072 维降到 512 维
)
embedding = response.data[0].embedding
print(f"降维后向量维度: {len(embedding)}")  # 输出: 512
```

### 使用本地开源模型（sentence-transformers）

```python
from sentence_transformers import SentenceTransformer
import numpy as np

# 加载 BGE 中文模型（首次运行会自动下载）
model = SentenceTransformer("BAAI/bge-base-zh-v1.5")

# 单条文本嵌入
text = "什么是向量数据库？"
embedding = model.encode(text, normalize_embeddings=True)
print(f"向量维度: {embedding.shape}")  # 输出: (768,)

# 批量嵌入
texts = [
    "向量数据库用于存储和检索高维向量",
    "Redis 是一个内存键值数据库",
    "Milvus 是开源的向量检索引擎",
]
embeddings = model.encode(texts, normalize_embeddings=True)

# 计算相似度矩阵
similarity_matrix = np.inner(embeddings, embeddings)
print("相似度矩阵:")
print(np.round(similarity_matrix, 3))
```

### 使用 BGE-M3 多功能嵌入

```python
from FlagEmbedding import BGEM3FlagModel

# 加载 BGE-M3 模型
model = BGEM3FlagModel("BAAI/bge-m3", use_fp16=True)

sentences = [
    "什么是检索增强生成？",
    "RAG 的基本原理是什么？",
    "如何做红烧肉？",
]

# 同时获取 dense 和 sparse 向量
embeddings = model.encode(
    sentences,
    return_dense=True,
    return_sparse=True,
)

# Dense 向量用于语义检索
dense_vectors = embeddings["dense_vecs"]  # shape: (3, 1024)

# Sparse 向量用于关键词匹配（类似 BM25）
sparse_vectors = embeddings["lexical_weights"]
```

<Warning>
使用本地嵌入模型需要足够的计算资源。基础模型（如 `bge-base-zh`，约 110M 参数）可以在 CPU 上运行，但速度较慢；大模型（如 `bge-large-zh`，约 326M 参数）建议使用 GPU。对于 BGE-M3 等大规模模型，强烈建议使用 GPU 并开启 FP16 推理。
</Warning>

## 文本分块策略（Chunking）

在将文档存入向量数据库之前，需要将长文档切分为较小的文本片段（chunks）。分块策略直接影响 RAG 系统的检索质量。

### 固定大小分块（Fixed-size Chunking）

按固定字符数或 token 数切分文本，通常设置一定的重叠（overlap）以保持上下文连贯性。

```python
def fixed_size_chunk(text: str, chunk_size: int = 500, overlap: int = 100) -> list[str]:
    """固定大小分块"""
    chunks = []
    start = 0
    while start < len(text):
        end = start + chunk_size
        chunks.append(text[start:end])
        start = end - overlap  # 向前重叠
    return chunks

text = "这是一段很长的文档内容..." * 100
chunks = fixed_size_chunk(text, chunk_size=500, overlap=100)
print(f"分块数量: {len(chunks)}")
```

**优点：** 实现简单，效率高
**缺点：** 可能在句子中间截断，破坏语义完整性

### 句子级分块（Sentence-based Chunking）

以句子为基本单位进行分块，保证每个分块都由完整的句子组成。

```python
import re

def sentence_chunk(text: str, max_chunk_size: int = 500) -> list[str]:
    """基于句子的分块"""
    # 按中英文句号、问号、感叹号分句
    sentences = re.split(r'(?<=[。！？.!?])', text)
    sentences = [s.strip() for s in sentences if s.strip()]

    chunks = []
    current_chunk = ""
    for sentence in sentences:
        if len(current_chunk) + len(sentence) <= max_chunk_size:
            current_chunk += sentence
        else:
            if current_chunk:
                chunks.append(current_chunk)
            current_chunk = sentence
    if current_chunk:
        chunks.append(current_chunk)
    return chunks
```

**优点：** 保持句子完整性，语义连贯
**缺点：** 分块大小不均匀

### 语义分块（Semantic Chunking）

根据文本的语义变化进行分块——当相邻句子的语义相似度低于阈值时，在此处进行切分。

```python
from sentence_transformers import SentenceTransformer
import numpy as np

def semantic_chunk(text: str, model, threshold: float = 0.5) -> list[str]:
    """基于语义相似度的分块"""
    # 先按句子分割
    sentences = re.split(r'(?<=[。！？.!?])', text)
    sentences = [s.strip() for s in sentences if s.strip()]

    if len(sentences) <= 1:
        return sentences

    # 计算每个句子的嵌入
    embeddings = model.encode(sentences, normalize_embeddings=True)

    # 计算相邻句子的相似度
    chunks = []
    current_chunk = [sentences[0]]
    for i in range(1, len(sentences)):
        similarity = np.dot(embeddings[i-1], embeddings[i])
        if similarity < threshold:
            # 语义变化较大，开始新的分块
            chunks.append("".join(current_chunk))
            current_chunk = [sentences[i]]
        else:
            current_chunk.append(sentences[i])

    if current_chunk:
        chunks.append("".join(current_chunk))
    return chunks
```

**优点：** 分块边界与语义边界对齐，检索质量最高
**缺点：** 需要额外的嵌入计算，处理速度较慢

### 分块策略对比

| 策略 | 实现复杂度 | 语义完整性 | 处理速度 | 适用场景 |
|------|----------|----------|---------|---------|
| 固定大小 | 低 | 一般 | 快 | 快速原型、结构简单的文档 |
| 句子级 | 中 | 较好 | 较快 | 通用场景 |
| 语义分块 | 高 | 最好 | 慢 | 对检索质量要求高的场景 |

### 分块参数调优建议

- **chunk_size（分块大小）**：通常设置在 200~1000 字符之间。过小会丢失上下文，过大会引入噪音
- **overlap（重叠大小）**：通常为 chunk_size 的 10%~20%，用于保持上下文连贯性
- **建议做法**：根据实际数据和检索效果反复调试，没有放之四海而皆准的最优参数

<Tip>
LangChain 提供了丰富的文本分割器（Text Splitters），包括 `RecursiveCharacterTextSplitter`、`MarkdownHeaderTextSplitter` 等，建议在实际项目中使用这些成熟的工具而非自己从头实现。
</Tip>

## 维度与性能权衡

嵌入向量的维度是一个重要的设计决策，需要在质量和效率之间进行权衡：

| 维度 | 存储空间（100万条） | 检索速度 | 语义质量 | 建议 |
|------|-------------------|---------|---------|------|
| 256 | ~1 GB | 最快 | 一般 | 资源极度受限时使用 |
| 512 | ~2 GB | 快 | 较好 | 移动端、边缘设备 |
| 768 | ~3 GB | 较快 | 好 | 大多数场景的平衡选择 |
| 1024 | ~4 GB | 中等 | 很好 | 质量优先的场景 |
| 1536 | ~6 GB | 较慢 | 优秀 | OpenAI 默认维度 |
| 3072 | ~12 GB | 慢 | 最优 | 追求极致质量 |

<Note>
存储空间估算基于 float32（4 字节/维）。实际使用中可以通过量化（如 int8、binary）大幅压缩存储空间，通常能减少 4~32 倍，但会略微牺牲检索精度。
</Note>

## 小结

文本嵌入是 RAG 系统中连接文本世界和向量世界的桥梁。选择合适的嵌入模型和分块策略，对 RAG 系统的整体检索质量至关重要。建议从以下几个方面进行决策：

1. **语言需求**：中文场景优先选择 BGE 系列，多语言场景选择 BGE-M3
2. **部署方式**：快速原型选 OpenAI API，生产环境考虑本地部署开源模型
3. **分块策略**：从句子级分块开始，根据效果逐步优化
4. **维度选择**：768 维是大多数场景的良好起点，根据实际需求调整
