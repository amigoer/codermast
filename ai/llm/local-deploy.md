---
title: "本地部署"
description: "大模型本地部署：Ollama、vLLM、llama.cpp"
---

## 为什么要本地部署

使用云端 API 虽然方便，但本地部署大模型有其独特的优势：

- **数据隐私**：所有数据在本地处理，不会传输到第三方服务器，适合医疗、金融、政务等对数据安全要求高的场景
- **成本可控**：一次性投入硬件成本后，推理不再产生按量付费的 API 费用，适合高并发场景
- **低延迟**：无网络传输延迟，响应速度更快
- **离线可用**：不依赖网络，在断网环境中也能使用
- **完全可控**：可以自由选择模型、调整参数、定制推理流程

<Note>
本地部署并非适合所有场景。如果你只是偶尔使用、对延迟不敏感且没有数据隐私顾虑，使用云端 API 通常是更经济的选择。
</Note>

## 硬件需求

### 显存估算

模型推理时的显存需求主要取决于模型参数量和精度：

| 精度 | 每个参数占用 | 7B 模型 | 13B 模型 | 70B 模型 |
|------|-------------|---------|---------|---------|
| FP32 | 4 字节 | 28 GB | 52 GB | 280 GB |
| FP16/BF16 | 2 字节 | 14 GB | 26 GB | 140 GB |
| INT8 | 1 字节 | 7 GB | 13 GB | 70 GB |
| INT4 | 0.5 字节 | 3.5 GB | 6.5 GB | 35 GB |

<Tip>
以上仅为模型权重的显存占用，实际运行还需要额外的 KV Cache、计算中间结果等开销。建议预留模型权重 1.2-1.5 倍的显存。
</Tip>

### 推荐硬件配置

| 场景 | GPU | 内存 | 适合模型 |
|------|-----|------|---------|
| 入门体验 | 无 GPU（纯 CPU） | 16 GB | 1-3B 量化模型 |
| 个人开发 | RTX 4060 (8GB) | 32 GB | 7B INT4 量化 |
| 进阶开发 | RTX 4090 (24GB) | 64 GB | 7-8B FP16 / 70B INT4 |
| 专业部署 | A100 (80GB) | 128 GB | 70B FP16 |
| 企业级 | 多卡 A100/H100 | 256 GB+ | 70B+ FP16 / MoE 模型 |

### Apple Silicon

Apple M 系列芯片的统一内存架构使其成为本地部署的热门选择：

| 芯片 | 统一内存 | 适合模型 |
|------|---------|---------|
| M1/M2 (8GB) | 8 GB | 1-3B 量化 |
| M1/M2 Pro (16GB) | 16 GB | 7B INT4 |
| M1/M2 Max (32-64GB) | 32-64 GB | 7B FP16 / 70B INT4 |
| M3/M4 Ultra (128-192GB) | 128-192 GB | 70B FP16 |

## 量化技术

量化是降低模型精度以减少显存占用和加速推理的关键技术。

### 常见量化格式

| 量化方式 | 精度损失 | 速度提升 | 适用场景 |
|---------|---------|---------|---------|
| FP16/BF16 | 几乎无 | 基线 | 显存充足时 |
| INT8 (W8A8) | 很小 | 1.5-2x | 平衡精度和效率 |
| INT4 (W4A16) | 轻微 | 2-3x | 消费级显卡 |
| GPTQ (4-bit) | 轻微 | 2-3x | GPU 推理 |
| AWQ (4-bit) | 轻微 | 2-3x | GPU 推理（更快） |
| GGUF (2-8bit) | 可变 | 可变 | CPU/混合推理 |

### GGUF 格式

GGUF（GPT-Generated Unified Format）是 llama.cpp 项目定义的模型格式，专为 CPU 和 CPU+GPU 混合推理优化。GGUF 文件是自包含的，包含了模型权重、分词器和元数据。

常见的 GGUF 量化级别：

| 量化类型 | 每参数比特 | 7B 模型大小 | 质量 |
|---------|-----------|------------|------|
| Q2_K | ~2.6 bit | ~2.8 GB | 较差 |
| Q3_K_M | ~3.4 bit | ~3.5 GB | 可用 |
| Q4_K_M | ~4.6 bit | ~4.4 GB | 推荐 |
| Q5_K_M | ~5.7 bit | ~5.3 GB | 很好 |
| Q6_K | ~6.6 bit | ~5.9 GB | 接近原始 |
| Q8_0 | 8 bit | ~7.2 GB | 几乎无损 |

<Note>
对于大多数应用场景，Q4_K_M 是一个很好的平衡点——显存占用约为 FP16 的 1/4，而质量损失通常在可接受范围内。
</Note>

## Ollama 使用指南

Ollama 是目前最简单的本地大模型部署工具，一条命令即可运行模型。

### 安装

```bash
# macOS / Linux
curl -fsSL https://ollama.com/install.sh | sh

# macOS 也可以通过 Homebrew
brew install ollama

# Windows
# 从 https://ollama.com/download 下载安装包
```

### 基本使用

```bash
# 启动 Ollama 服务（安装后通常自动启动）
ollama serve

# 运行模型（首次会自动下载）
ollama run llama3.1
ollama run qwen2.5:7b
ollama run deepseek-r1:8b

# 查看已下载的模型
ollama list

# 删除模型
ollama rm llama3.1
```

### 常用模型

| 模型 | 命令 | 大小 | 说明 |
|------|------|------|------|
| Llama 3.1 8B | `ollama run llama3.1` | ~4.7 GB | Meta 开源，英文为主 |
| Qwen 2.5 7B | `ollama run qwen2.5:7b` | ~4.4 GB | 中文能力强 |
| DeepSeek-R1 8B | `ollama run deepseek-r1:8b` | ~4.9 GB | 推理能力强 |
| Phi-3 Mini | `ollama run phi3` | ~2.2 GB | 微软小模型 |
| Gemma 2 9B | `ollama run gemma2:9b` | ~5.4 GB | Google 开源 |
| CodeLlama 7B | `ollama run codellama` | ~3.8 GB | 代码专用 |

### API 调用

Ollama 提供了兼容 OpenAI 格式的 API：

```python
from openai import OpenAI

client = OpenAI(
    base_url="http://localhost:11434/v1",
    api_key="ollama"  # Ollama 不需要真正的 API key
)

response = client.chat.completions.create(
    model="qwen2.5:7b",
    messages=[
        {"role": "user", "content": "用 Python 写一个快速排序算法"}
    ]
)

print(response.choices[0].message.content)
```

也可以使用 Ollama 原生 API：

```bash
curl http://localhost:11434/api/generate -d '{
  "model": "qwen2.5:7b",
  "prompt": "什么是 Transformer？",
  "stream": false
}'
```

### 自定义 Modelfile

Ollama 支持通过 Modelfile 自定义模型配置：

```dockerfile
# Modelfile
FROM qwen2.5:7b

# 设置系统提示词
SYSTEM "你是一个专业的技术文档助手，使用中文回答问题。"

# 调整参数
PARAMETER temperature 0.7
PARAMETER top_p 0.9
PARAMETER num_ctx 8192
```

```bash
# 创建自定义模型
ollama create my-assistant -f Modelfile

# 运行自定义模型
ollama run my-assistant
```

## vLLM 部署

vLLM 是一个高性能的 LLM 推理和服务框架，专为生产环境设计。

### 核心优势

- **PagedAttention**：类似操作系统的虚拟内存管理，高效管理 KV Cache，显存利用率接近最优
- **连续批处理（Continuous Batching）**：动态合并请求，吞吐量比朴素方案提升 2-4 倍
- **高并发**：支持大量并发请求
- **OpenAI 兼容 API**：可直接替换 OpenAI API

### 安装与使用

```bash
# 安装（需要 NVIDIA GPU）
pip install vllm

# 启动 API 服务
python -m vllm.entrypoints.openai.api_server \
    --model Qwen/Qwen2.5-7B-Instruct \
    --host 0.0.0.0 \
    --port 8000 \
    --max-model-len 8192 \
    --gpu-memory-utilization 0.9
```

### 常用参数

| 参数 | 说明 | 默认值 |
|------|------|--------|
| `--model` | 模型路径或 Hugging Face ID | 必填 |
| `--tensor-parallel-size` | GPU 并行数 | 1 |
| `--max-model-len` | 最大上下文长度 | 模型默认值 |
| `--gpu-memory-utilization` | GPU 显存使用比例 | 0.9 |
| `--quantization` | 量化方式（awq/gptq） | 无 |
| `--dtype` | 数据类型（float16/bfloat16） | auto |

### 调用示例

```python
from openai import OpenAI

client = OpenAI(
    base_url="http://localhost:8000/v1",
    api_key="token-abc123"  # vLLM 默认不校验
)

response = client.chat.completions.create(
    model="Qwen/Qwen2.5-7B-Instruct",
    messages=[
        {"role": "system", "content": "你是一个有用的助手。"},
        {"role": "user", "content": "解释 PagedAttention 的原理"}
    ],
    temperature=0.7,
    max_tokens=1024,
)

print(response.choices[0].message.content)
```

<Warning>
vLLM 目前仅支持 NVIDIA GPU（需要 CUDA）。如果使用 AMD GPU 或 Apple Silicon，请考虑 llama.cpp 或 Ollama。
</Warning>

## llama.cpp

llama.cpp 是一个纯 C/C++ 实现的 LLM 推理框架，以其极高的兼容性和效率著称。

### 特点

- 支持 CPU、CUDA、Metal（Apple GPU）、Vulkan 等多种后端
- 内存占用极低
- 支持多种量化格式（GGUF）
- 跨平台（Linux、macOS、Windows）

### 安装与使用

```bash
# 克隆并编译
git clone https://github.com/ggerganov/llama.cpp
cd llama.cpp

# macOS (Metal 加速)
cmake -B build -DGGML_METAL=ON
cmake --build build --config Release

# Linux (CUDA 加速)
cmake -B build -DGGML_CUDA=ON
cmake --build build --config Release

# 纯 CPU
cmake -B build
cmake --build build --config Release
```

### 运行模型

```bash
# 交互式对话
./build/bin/llama-cli \
    -m models/qwen2.5-7b-instruct-q4_k_m.gguf \
    -n 512 \
    -t 8 \
    --interactive-first

# 启动 API 服务（兼容 OpenAI 格式）
./build/bin/llama-server \
    -m models/qwen2.5-7b-instruct-q4_k_m.gguf \
    --host 0.0.0.0 \
    --port 8080 \
    -t 8 \
    -ngl 99  # GPU 层数，99 表示尽可能多地放到 GPU
```

### 模型转换

如果你有 Hugging Face 格式的模型，可以转换为 GGUF：

```bash
# 安装依赖
pip install -r requirements.txt

# 转换为 GGUF（FP16）
python convert_hf_to_gguf.py /path/to/model --outfile model-f16.gguf

# 量化
./build/bin/llama-quantize model-f16.gguf model-q4_k_m.gguf Q4_K_M
```

## 模型下载源

### Hugging Face

全球最大的模型托管平台：

```bash
# 使用 huggingface-cli
pip install huggingface_hub
huggingface-cli download Qwen/Qwen2.5-7B-Instruct --local-dir ./qwen2.5-7b

# 下载 GGUF 文件
huggingface-cli download bartowski/Qwen2.5-7B-Instruct-GGUF \
    Qwen2.5-7B-Instruct-Q4_K_M.gguf \
    --local-dir ./models
```

<Tip>
Hugging Face 在国内访问速度可能较慢，可以使用镜像站 `https://hf-mirror.com` 加速下载。设置环境变量 `HF_ENDPOINT=https://hf-mirror.com` 即可。
</Tip>

### ModelScope（魔搭社区）

阿里巴巴推出的国内模型托管平台，国内下载速度快：

```bash
# 安装
pip install modelscope

# 下载模型
from modelscope import snapshot_download
model_dir = snapshot_download('Qwen/Qwen2.5-7B-Instruct')
```

```bash
# 命令行下载
modelscope download --model Qwen/Qwen2.5-7B-Instruct --local_dir ./qwen2.5-7b
```

### 其他下载源

| 平台 | 地址 | 特点 |
|------|------|------|
| Hugging Face | huggingface.co | 全球最全，模型最多 |
| ModelScope | modelscope.cn | 国内速度快 |
| HF Mirror | hf-mirror.com | Hugging Face 镜像 |
| Ollama Library | ollama.com/library | Ollama 专用，一键下载 |

## API 服务部署

无论使用哪种推理引擎，最终都需要将模型封装为 API 服务。以下是一个使用 FastAPI 封装 Ollama 的示例：

```python
from fastapi import FastAPI
from pydantic import BaseModel
import httpx

app = FastAPI()

class ChatRequest(BaseModel):
    message: str
    model: str = "qwen2.5:7b"
    temperature: float = 0.7

@app.post("/chat")
async def chat(request: ChatRequest):
    async with httpx.AsyncClient() as client:
        response = await client.post(
            "http://localhost:11434/api/chat",
            json={
                "model": request.model,
                "messages": [{"role": "user", "content": request.message}],
                "stream": False,
                "options": {"temperature": request.temperature}
            },
            timeout=120.0
        )
    return response.json()
```

### Docker 部署

使用 Docker 可以更方便地管理部署环境：

```yaml
# docker-compose.yml
version: '3.8'
services:
  ollama:
    image: ollama/ollama
    ports:
      - "11434:11434"
    volumes:
      - ollama_data:/root/.ollama
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: all
              capabilities: [gpu]

  # 可选：Open WebUI（提供聊天界面）
  open-webui:
    image: ghcr.io/open-webui/open-webui:main
    ports:
      - "3000:8080"
    environment:
      - OLLAMA_BASE_URL=http://ollama:11434
    depends_on:
      - ollama

volumes:
  ollama_data:
```

```bash
docker compose up -d

# 下载模型
docker exec -it ollama ollama pull qwen2.5:7b
```

## 部署方案对比

| 特性 | Ollama | vLLM | llama.cpp |
|------|--------|------|-----------|
| 上手难度 | 极低 | 中等 | 中等 |
| 推理性能 | 中等 | 最高 | 较高 |
| GPU 支持 | CUDA/Metal | CUDA | CUDA/Metal/Vulkan |
| CPU 推理 | 支持 | 不支持 | 最佳 |
| 量化支持 | GGUF | AWQ/GPTQ | GGUF（最全） |
| 并发能力 | 一般 | 最强 | 一般 |
| 适用场景 | 个人/开发 | 生产环境 | 资源受限/跨平台 |
| API 兼容 | OpenAI | OpenAI | OpenAI |

## 小结

本地部署大模型已经变得越来越简单。对于个人开发者和学习用途，Ollama 是最推荐的入门方案；对于生产环境的高并发需求，vLLM 是最佳选择；对于需要在 CPU 或多种硬件上运行的场景，llama.cpp 是最灵活的方案。

选择合适的量化级别（推荐 Q4_K_M）和硬件配置，即使在消费级设备上也能获得不错的使用体验。
