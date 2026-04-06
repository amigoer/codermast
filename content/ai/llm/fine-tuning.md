---
title: "模型微调"
description: "大模型微调技术：LoRA、QLoRA、全量微调、RLHF"
---

## 为什么要微调

预训练大模型虽然已经具备了广泛的语言能力，但它们是在通用数据上训练的"通才"。在实际应用中，我们往往需要模型在特定领域或任务上表现得更好。微调（Fine-Tuning）就是在预训练模型的基础上，使用特定领域的数据继续训练，让模型变成某个领域的"专家"。

微调的常见动机：

- **领域适配**：让模型掌握医疗、法律、金融等专业领域的知识和术语
- **风格控制**：统一模型输出的语气、格式和风格
- **任务优化**：针对特定任务（如信息抽取、分类、代码生成）优化效果
- **降低成本**：微调后的小模型可能在特定任务上达到大模型的效果，从而降低推理成本
- **数据隐私**：在私有数据上训练，确保敏感信息不通过 API 传输

<Note>
在决定微调之前，建议先尝试提示词工程（Prompt Engineering）和 RAG（检索增强生成）。如果这些方法无法满足需求，再考虑微调。微调需要较多的数据、算力和调参经验。
</Note>

## 微调方法全景

```
微调方法
├── 全量微调（Full Fine-Tuning）
│   └── 更新所有参数
├── 参数高效微调（PEFT）
│   ├── LoRA / QLoRA
│   ├── Adapter
│   ├── Prefix Tuning
│   └── Prompt Tuning
└── 对齐训练
    ├── SFT（监督微调）
    ├── RLHF（人类反馈强化学习）
    └── DPO（直接偏好优化）
```

## 全量微调（Full Fine-Tuning）

全量微调是最直接的方式——更新模型的所有参数。

### 优点

- 理论上能达到最好的效果
- 实现简单

### 缺点

- **显存需求巨大**：以 7B 模型为例，仅参数就需要约 14GB（FP16），加上优化器状态和梯度，总显存需求约 60-80GB
- **训练时间长**
- **灾难性遗忘**：可能丢失预训练阶段学到的通用能力
- **需要存储完整的模型副本**

```python
# 全量微调的基本流程（以 Hugging Face Transformers 为例）
from transformers import AutoModelForCausalLM, AutoTokenizer, TrainingArguments, Trainer

model = AutoModelForCausalLM.from_pretrained("meta-llama/Llama-3-8B")
tokenizer = AutoTokenizer.from_pretrained("meta-llama/Llama-3-8B")

training_args = TrainingArguments(
    output_dir="./output",
    num_train_epochs=3,
    per_device_train_batch_size=4,
    learning_rate=2e-5,
    bf16=True,
    gradient_accumulation_steps=4,
)

trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=train_dataset,
)

trainer.train()
```

<Warning>
全量微调 7B 模型至少需要 1 张 80GB 显存的 A100 GPU。对于大多数开发者和中小企业来说，参数高效微调（PEFT）是更务实的选择。
</Warning>

## LoRA（Low-Rank Adaptation）

LoRA 是目前最流行的参数高效微调方法，由微软在 2021 年提出。

### 核心原理

LoRA 的核心思想是：微调时模型权重的变化量 ΔW 是低秩的，不需要更新完整的权重矩阵。

具体做法是将权重变化分解为两个低秩矩阵的乘积：

```
W' = W + ΔW = W + A × B

其中：
- W: 原始预训练权重（冻结不更新），形状 [d, k]
- A: 低秩矩阵，形状 [d, r]，随机初始化
- B: 低秩矩阵，形状 [r, k]，初始化为 0
- r: 秩（rank），远小于 d 和 k，通常取 8-64
```

### 参数量对比

以一个 `[4096, 4096]` 的权重矩阵为例：

| 方式 | 可训练参数量 | 比例 |
|------|-------------|------|
| 全量微调 | 16,777,216 | 100% |
| LoRA (r=8) | 65,536 | 0.39% |
| LoRA (r=16) | 131,072 | 0.78% |
| LoRA (r=64) | 524,288 | 3.12% |

### 关键超参数

- **rank (r)**：秩的大小，决定了 LoRA 的表达能力。通常取 8-64，任务越复杂可以适当增大
- **alpha**：缩放因子，最终 ΔW 会乘以 `alpha/r`。通常设为 `r` 的 1-2 倍
- **target_modules**：要应用 LoRA 的模块，通常选择注意力层的 Q、K、V、O 投影矩阵

### 代码示例

```python
from peft import LoraConfig, get_peft_model, TaskType

# 配置 LoRA
lora_config = LoraConfig(
    task_type=TaskType.CAUSAL_LM,
    r=16,                              # 秩
    lora_alpha=32,                     # 缩放因子
    lora_dropout=0.05,                 # Dropout
    target_modules=[                   # 目标模块
        "q_proj", "k_proj", "v_proj", "o_proj",
        "gate_proj", "up_proj", "down_proj"
    ],
)

# 应用 LoRA
model = get_peft_model(model, lora_config)

# 查看可训练参数
model.print_trainable_parameters()
# 输出示例：trainable params: 41,943,040 || all params: 8,072,204,288 || trainable%: 0.52%
```

<Tip>
LoRA 训练完成后，产生的适配器文件通常只有几十 MB，非常方便保存和分发。你可以为同一个基础模型训练多个 LoRA 适配器，在推理时按需加载。
</Tip>

## QLoRA（Quantized LoRA）

QLoRA 在 LoRA 的基础上引入了量化技术，进一步降低了显存需求。

### 核心创新

- **4-bit NormalFloat 量化**：将基础模型以 4-bit 精度加载，显存占用降为 FP16 的约 1/4
- **双重量化（Double Quantization）**：对量化常数本身也进行量化，进一步节省显存
- **分页优化器（Paged Optimizers）**：利用 CPU 内存处理显存溢出

### 显存对比

以 Llama 3 8B 模型为例：

| 微调方式 | 显存需求 |
|---------|---------|
| 全量微调 (FP16) | ~60 GB |
| LoRA (FP16) | ~18 GB |
| QLoRA (4-bit) | ~6 GB |

```python
from transformers import BitsAndBytesConfig

# 配置 4-bit 量化
bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_quant_type="nf4",          # NormalFloat4 量化
    bnb_4bit_compute_dtype=torch.bfloat16,
    bnb_4bit_use_double_quant=True,      # 双重量化
)

# 加载量化模型
model = AutoModelForCausalLM.from_pretrained(
    "meta-llama/Llama-3-8B",
    quantization_config=bnb_config,
    device_map="auto",
)

# 然后像普通 LoRA 一样应用 PEFT
model = get_peft_model(model, lora_config)
```

<Note>
QLoRA 让在消费级显卡（如 RTX 4090 24GB）上微调 7-8B 模型成为现实。对于 70B 级别的模型，QLoRA 也只需要约 40GB 显存。
</Note>

## SFT（监督微调）

SFT（Supervised Fine-Tuning）是使模型学会遵循指令的关键步骤。它使用"指令-回答"对作为训练数据，教会模型按用户的要求回答问题。

### 数据格式

SFT 数据通常采用对话格式：

```json
{
  "messages": [
    {"role": "system", "content": "你是一个专业的医疗助手。"},
    {"role": "user", "content": "什么是高血压？"},
    {"role": "assistant", "content": "高血压是指动脉血压持续升高的慢性疾病..."}
  ]
}
```

或者简单的指令格式：

```json
{
  "instruction": "将以下文本翻译成英文",
  "input": "今天天气很好",
  "output": "The weather is very nice today."
}
```

### 数据质量要点

| 维度 | 要求 |
|------|------|
| 数量 | 通常 1K-100K 条即可见效 |
| 多样性 | 覆盖目标场景的各种情况 |
| 质量 | 高质量的回答比大量低质量数据更重要 |
| 一致性 | 风格、格式保持统一 |
| 长度分布 | 包含不同长度的回答 |

<Tip>
数据质量远比数量重要。研究表明，精心构建的 1000 条高质量数据的微调效果，可能优于 10 万条普通质量的数据。在准备数据时，应把大部分精力放在质量把控上。
</Tip>

## RLHF（基于人类反馈的强化学习）

RLHF 是让模型更好地对齐人类偏好的关键技术，ChatGPT 的成功很大程度上归功于这项技术。

### 三个阶段

**阶段一：SFT**

在高质量指令数据上进行监督微调，得到初始的对话模型。

**阶段二：训练奖励模型（Reward Model）**

收集人类标注数据，对模型的多个回答进行排序（如 A > B > C），训练一个奖励模型来自动评估回答质量。

```
用户问题 + 模型回答 → 奖励模型 → 分数（0-1）
```

**阶段三：PPO 强化学习训练**

使用 PPO（Proximal Policy Optimization）算法，以奖励模型的打分为信号，进一步优化语言模型。

```
目标：最大化 Reward(回答) - β × KL(新模型 || SFT模型)
```

其中 KL 惩罚项防止模型偏离 SFT 模型太远。

<Warning>
RLHF 流程复杂、训练不稳定，需要大量人类标注数据和丰富的调参经验。对于大多数实际项目，DPO 是一个更简单实用的替代方案。
</Warning>

## DPO（直接偏好优化）

DPO（Direct Preference Optimization）是 RLHF 的简化替代方案，无需单独训练奖励模型。

### 核心思想

DPO 直接利用偏好数据（chosen/rejected 对）来优化模型，将 RLHF 的三步流程简化为一步：

```json
{
  "prompt": "解释量子计算的基本原理",
  "chosen": "量子计算利用量子力学的叠加态和纠缠态...",
  "rejected": "量子计算就是很快的计算机..."
}
```

### DPO 的优势

| 特性 | RLHF | DPO |
|------|------|-----|
| 训练步骤 | 3 步 | 1 步 |
| 是否需要奖励模型 | 是 | 否 |
| 训练稳定性 | 较差 | 较好 |
| 实现复杂度 | 高 | 低 |
| 效果 | 略优 | 接近 |

```python
from trl import DPOTrainer, DPOConfig

dpo_config = DPOConfig(
    output_dir="./dpo_output",
    num_train_epochs=1,
    per_device_train_batch_size=4,
    learning_rate=5e-7,
    beta=0.1,  # KL 惩罚系数
    bf16=True,
)

trainer = DPOTrainer(
    model=model,
    ref_model=ref_model,   # SFT 后的参考模型
    args=dpo_config,
    train_dataset=dpo_dataset,
    tokenizer=tokenizer,
)

trainer.train()
```

## 常用工具

### Hugging Face 生态

Hugging Face 提供了完整的微调工具链：

| 库 | 用途 |
|---|------|
| `transformers` | 模型加载、训练流程 |
| `peft` | LoRA、QLoRA 等 PEFT 方法 |
| `trl` | SFT、DPO、PPO 训练 |
| `datasets` | 数据集加载和处理 |
| `accelerate` | 分布式训练 |
| `bitsandbytes` | 量化支持 |

### LLaMA-Factory

LLaMA-Factory 是一个非常流行的一站式微调框架，支持通过 Web UI 或命令行配置微调参数，大幅降低了使用门槛。

```bash
# 安装
git clone https://github.com/hiyouga/LLaMA-Factory.git
cd LLaMA-Factory
pip install -e ".[torch,metrics]"

# 启动 Web UI
llamafactory-cli webui

# 命令行训练
llamafactory-cli train examples/train_lora/llama3_lora_sft.yaml
```

LLaMA-Factory 的优势：

- 支持 100+ 种模型
- 支持全量微调、LoRA、QLoRA
- 支持 SFT、DPO、PPO、ORPO 等训练方法
- 提供可视化的 Web UI
- 内置数据集管理

### 其他工具

- **Axolotl**：配置灵活的微调框架，适合高级用户
- **Unsloth**：专注于加速 LoRA 微调，速度可达 2-5 倍提升
- **OpenRLHF**：专注于 RLHF/DPO 训练的框架

## 实战工作流

一个完整的微调项目通常包含以下步骤：

### 第一步：明确目标

- 确定微调要解决的具体问题
- 评估是否真的需要微调（vs 提示词工程 / RAG）
- 选择基础模型

### 第二步：准备数据

```python
# 数据处理示例
import json

def prepare_sft_data(raw_data):
    """将原始数据转换为 SFT 格式"""
    formatted = []
    for item in raw_data:
        formatted.append({
            "messages": [
                {"role": "system", "content": "你是一个专业的客服助手。"},
                {"role": "user", "content": item["question"]},
                {"role": "assistant", "content": item["answer"]}
            ]
        })
    return formatted

# 数据划分
# 训练集 : 验证集 = 9 : 1
```

### 第三步：配置训练

```yaml
# LLaMA-Factory 配置示例 (train_config.yaml)
model_name_or_path: Qwen/Qwen2.5-7B
stage: sft
finetuning_type: lora

# LoRA 参数
lora_rank: 16
lora_alpha: 32
lora_target: all

# 训练参数
num_train_epochs: 3
per_device_train_batch_size: 4
gradient_accumulation_steps: 4
learning_rate: 1.0e-4
lr_scheduler_type: cosine
warmup_ratio: 0.1
bf16: true

# 数据
dataset: my_custom_dataset
template: qwen
```

### 第四步：训练与监控

- 观察 loss 曲线是否正常下降
- 在验证集上监控指标
- 注意过拟合的迹象

### 第五步：评估与部署

- 在测试集和真实场景中评估效果
- 人工评估生成质量
- 将 LoRA 适配器合并到基础模型中（可选）

```python
# 合并 LoRA 适配器
from peft import PeftModel

base_model = AutoModelForCausalLM.from_pretrained("Qwen/Qwen2.5-7B")
model = PeftModel.from_pretrained(base_model, "./lora_output")
merged_model = model.merge_and_unload()
merged_model.save_pretrained("./merged_model")
```

## 常见问题与建议

| 问题 | 可能原因 | 解决方案 |
|------|---------|---------|
| Loss 不下降 | 学习率过小/过大 | 调整学习率，尝试 1e-4 到 5e-5 |
| 过拟合 | 数据量不足 | 增加数据、增大 dropout、减少 epoch |
| 灾难性遗忘 | 学习率过大/训练过久 | 降低学习率、减少训练步数 |
| 生成质量差 | 数据质量问题 | 清洗数据、提高标注质量 |
| 显存不足 | 模型/批次太大 | 使用 QLoRA、减小 batch size、增大梯度累积 |

## 小结

模型微调是将通用大模型转化为领域专家的关键技术。对于大多数开发者来说，LoRA/QLoRA + SFT 是最实用的组合，它在效果和成本之间取得了良好平衡。在实践中，数据质量始终是决定微调效果的最关键因素。
