---
title: "Skill 最佳实践"
description: "编写高质量 Skill 的设计原则、常见陷阱与优化技巧"
---

## 核心心法

写 skill 前先记住三条：

1. **Skill 不是脚本仓库**，而是"让 Agent 少犯错的说明书"
2. **description 写得像 JD（招聘描述）**，而不是像简介
3. **宁可少做，也别越界**——skill 的边界越清晰，Agent 用得越顺手

## 设计原则

### 原则一：单一职责

一个 skill 只解决一类任务。不要做"万能 skill"。

❌ 反例：

```markdown
---
name: git-helper
description: >-
  Helps with git operations including commit, push, pull,
  rebase, merge, branch management, tag creation, and more.
---
```

问题：Agent 永远无法判断"git 相关就调用它"到底该干什么，结果就是**要么不调用、要么乱调用**。

✅ 正例：拆成多个小而美的 skill

```text
.claude/skills/
├── git-commit/
├── git-release/
└── git-rebase-main/
```

每个 skill 都有**明确的触发边界**和**可预期的产出**。

### 原则二：description 必须"可判断"

description 是触发开关，必须让 Agent 能明确判断"用 / 不用"。

**判断式写法**：

```yaml
description: >-
  Use when the user wants to review a GitHub pull request. This includes
  fetching the PR diff, analyzing changes, and leaving review comments.
  Triggers: "review PR", "看一下这个 PR", "检查合并请求".
  Do NOT use for: creating new PRs, merging, or resolving conflicts.
```

包含的要素：

| 要素 | 作用 |
|------|------|
| **Use when** | 正向场景 |
| **This includes** | 具体动作清单，避免歧义 |
| **Triggers** | 字面关键词（中英都写） |
| **Do NOT use for** | 反向排除，防止错用 |

### 原则三：流程要"可回放"

SKILL.md 的 Workflow 应该是**任何人按着做都能得到同样结果**。

❌ 模糊：

```markdown
## Workflow

1. 分析代码改动
2. 写个好的 commit message
3. 提交
```

✅ 精确：

```markdown
## Workflow

1. 运行 `git status --short` 获取改动文件列表
2. 运行 `git diff --staged` 获取具体 diff
3. 按以下规则分类：
   - 新增文件 → 候选 type 为 `feat` 或 `docs`
   - 删除文件 → 候选 type 为 `refactor` 或 `chore`
   - 纯 bug 修复 → type 为 `fix`
4. 生成消息（50/72 规则），遵循本章 Output Format
5. 使用 heredoc 执行 `git commit -m "$(cat <<'EOF' ... EOF)"`
6. 执行 `git log -1 --stat` 验证结果
```

关键：**每一步都对应可执行命令或明确判断规则**。

### 原则四：Output Format 比 Input 更重要

Agent 最容易"跑偏"的地方是产出格式不稳定。显式声明 Output Format 能极大提升一致性：

````markdown
## Output Format

产出的 commit 消息必须符合：

```
<type>(<scope>): <subject>

<body>
```

- `<type>` ∈ {feat, fix, docs, style, refactor, test, chore}
- `<scope>` 是模块名，省略时不写括号
- `<subject>` ≤ 50 字，祈使句，首字母小写，结尾无句号
- `<body>` 每行 ≤ 72 字，解释"为什么"而非"做了什么"
````

### 原则五：能用脚本就别让 Agent 推理

LLM 做推理不稳定，做执行才稳定。把**确定性逻辑**沉淀成脚本，让 skill 只负责"什么时候调用脚本 + 如何解读结果"。

```markdown
## Workflow

1. 执行 `bash scripts/detect-changes.sh`，获取 JSON 输出
2. 根据 JSON 中的 `category` 字段决定下一步：
   - `"frontend"` → 跳到第 5 步
   - `"backend"` → 跳到第 8 步
```

这比"让 Agent 自己判断前后端"稳定得多。

### 原则六：写清楚"不该做什么"

Agent 天然倾向于过度发挥。显式列出边界能减少越界：

```markdown
## Out of Scope

本 skill 不做以下事情：

- ❌ 不执行 `git push`（即使用户要求也要拒绝，除非显式传 `--push`）
- ❌ 不修改 `.env` 等敏感文件
- ❌ 不使用 `--no-verify` 跳过钩子
- ❌ 不创建 PR（需要切换到 `create-pr` skill）
```

## 常见陷阱

### 陷阱 1：description 里塞背景

```yaml
# ❌
description: >-
  Git is a distributed version control system. This skill provides
  helpers for common git operations such as...
```

Agent 不需要百科介绍。description 只要回答"**用 / 不用**"。

### 陷阱 2：SKILL.md 里硬编码路径

```markdown
# ❌
运行 /Users/amigoer/projects/myapp/.claude/skills/pdf/scripts/extract.py
```

Skill 可能被放到任何路径。使用相对路径或环境变量：

```markdown
# ✅
运行 `./scripts/extract.py`（相对于 SKILL.md 所在目录）
```

### 陷阱 3：写成教程而非说明书

```markdown
# ❌
## 什么是 Git Commit

Git commit 是一种将工作区改动保存到仓库的操作……
```

Skill 不是给人看的教程，而是给 Agent 看的操作指令。**省略所有"背景科普"**。

### 陷阱 4：没有失败路径

现实中命令会失败。Workflow 必须覆盖错误处理：

```markdown
## Workflow

3. 执行 `git commit -m "..."`
   - 如果失败且 stderr 包含 `pre-commit hook failed`：
     - 读取 hook 报错详情
     - 修复后**创建新 commit**（绝不 `--amend`）
   - 如果失败且 stderr 包含 `nothing to commit`：
     - 告知用户无改动，终止流程
   - 其他失败：向用户报告 stderr 原文
```

### 陷阱 5：Skill 互相依赖

避免让一个 skill 强依赖另一个 skill 的产出。每个 skill 应该能独立执行。

如果两个 skill 必须配合，考虑合并成一个、或用脚本作为桥梁。

## 性能与可维护性

### 控制 SKILL.md 长度

| 长度 | 评估 |
|------|------|
| < 100 行 | ✅ 理想 |
| 100-300 行 | ✅ 可接受 |
| 300-600 行 | ⚠️ 考虑拆分子文件 |
| > 600 行 | ❌ 必须重构 |

超长的 skill 会挤占其他上下文，Agent 读完也容易遗漏细节。

### 分层加载

对大 skill，使用"总览 + 子文档"模式：

```markdown
## Workflow Overview

本 skill 分三阶段：
1. 数据加载（详见 `workflows/load.md`）
2. 数据清洗（详见 `workflows/clean.md`）
3. 可视化（详见 `workflows/viz.md`）

先只读本页，根据用户需求判断进入哪个阶段，再加载对应子文档。
```

### 版本管理

在 frontmatter 中加版本号，便于追踪：

```yaml
---
name: git-commit
version: 1.2.0
description: ...
---
```

并维护 `CHANGELOG.md` 记录破坏性变更。

## 测试与评估

### 回归测试集

为每个 skill 维护一个"测试用例"清单：

```markdown
## Test Cases

1. 纯代码改动 → 应生成 `feat/fix/refactor` 开头
2. 文档改动 → 应生成 `docs` 开头
3. 包含 .env 文件 → 应警告并拒绝暂存
4. pre-commit 失败 → 应修复后创建新 commit，不 amend
```

定期跑这些用例，观察 Agent 的实际表现。

### A/B 测试

当不确定某种写法是否更好时，复制一份 skill 改名为 `git-commit-v2`，让用户在一段时间内主动选择，对比命中率和质量。

## 团队协作

### 约定命名规范

```text
<domain>-<action>
例：
  git-commit        ✅
  pdf-extract       ✅
  my-cool-helper    ❌（看不出用途）
```

### Review 流程

Skill 应该像代码一样走 Code Review。Review 重点：

- [ ] description 是否足够具体
- [ ] Workflow 是否每步都可执行
- [ ] 是否列出 Out of Scope
- [ ] 是否有敏感文件 / 危险操作未做防护
- [ ] 是否与现有 skill 重叠

### 文档化 Skill 目录

在团队 wiki / README 里维护一个"skill 目录表"，列出每个 skill 的用途和触发场景，方便新人快速了解。

## 何时不应该用 Skill

**Skill 不是银弹**，以下场景不适合：

| 场景 | 更好的选择 |
|------|-----------|
| 需要实时数据查询 | MCP Server |
| 需要长期后台运行 | 独立服务 / Agent |
| 一次性需求 | 直接写提示词 |
| 纯函数计算 | Tool |
| 大段静态参考资料 | RAG 文档 |

## 小结

写好 Skill 的 7 条军规：

1. **单一职责**，一个 skill 只干一件事
2. **description 判断式**，明确触发边界
3. **Workflow 可回放**，每步都有明确命令
4. **Output Format 先行**，格式稳定胜过花哨
5. **确定性逻辑下沉到脚本**，别让 LLM 反复推理
6. **显式写 Out of Scope**，防越界
7. **像代码一样管理**，有版本、有 Review、有测试

Skills 是 Agent 时代最低成本的"能力建设"方式。把团队的最佳实践沉淀进 skill，比写十篇 wiki 文档都有效。
