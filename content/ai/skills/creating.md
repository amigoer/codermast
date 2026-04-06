---
title: "创建自定义 Skill"
description: "从零编写一个可被 Agent 自动发现和调用的 Skill"
---

## 目标

本章我们从零写一个真实可用的 Skill：`git-commit`，作用是**按规范格式帮用户生成 git commit 消息并提交**。完成后 Agent 只要看到"提交代码"类请求就会自动调用它。

## 第一步：创建目录

Skill 是一个目录，最低要求只需一个 `SKILL.md`：

```bash
mkdir -p .claude/skills/git-commit
cd .claude/skills/git-commit
touch SKILL.md
```

目录位置规则：

| 路径 | 作用域 |
|------|--------|
| `.claude/skills/<name>/` | 当前项目 |
| `~/.claude/skills/<name>/` | 用户全局 |
| `/etc/claude/skills/<name>/` | 系统级（很少用） |

## 第二步：编写 SKILL.md

### 2.1 YAML 元数据

```markdown
---
name: git-commit
description: >-
  Use this skill when the user asks to commit code, create a git commit,
  or save changes. Handles staging, writing a conventional commit message,
  and running pre-commit checks. Triggers: "commit", "提交代码", "保存修改".
---
```

**编写要点**：

- `name`：必须是文件名/目录名一致的 kebab-case 短名
- `description`：写成**判断式**——"什么时候该用"，而不是"它是什么"
- 显式列出触发关键词（中英都写上），能显著提升命中率

<Note>
description 是整个 skill 被加载的唯一触发器。如果写得太泛（如 "helps with git"），Agent 根本不知道何时该用它。
</Note>

### 2.2 正文结构

推荐遵循这样的骨架：

```markdown
## When to Use

（什么场景下应该使用这个 skill）

## Prerequisites

（前置条件：需要哪些工具 / 文件 / 权限）

## Workflow

（分步骤的操作流程）

## Output Format

（产出的格式约定）

## Examples

（1-3 个真实例子）
```

### 2.3 完整示例

````markdown
---
name: git-commit
description: >-
  Use this skill when the user asks to commit code, create a git commit,
  or save changes. Handles staging, writing a conventional commit message,
  and running pre-commit checks.
---

## When to Use

触发场景：
- 用户说"提交代码" / "commit" / "保存修改"
- 用户让你"把刚才的改动提交上去"
- 用户要求生成 commit message

不要使用的场景：
- 用户只是想看 git status（用 Bash 工具即可）
- 用户要求 push / rebase / 其他 git 操作

## Prerequisites

- 当前目录是 git 仓库（通过 `git rev-parse` 验证）
- 有 Bash 工具权限

## Workflow

1. **检查状态**：`git status --short` 查看未提交文件
2. **过滤敏感文件**：绝不暂存 `.env`、`*.key`、`credentials.*`
3. **分析 diff**：`git diff --staged` 理解改动内容
4. **生成消息**：按 Conventional Commits 格式
5. **执行提交**：使用 heredoc 避免转义问题
6. **验证结果**：`git log -1` 确认提交成功

## Commit Message Format

```
<type>(<scope>): <subject>

<body>
```

- type: feat / fix / docs / refactor / test / chore
- subject: 50 字以内，祈使句
- body: 解释 "为什么" 而非 "做了什么"

## Examples

### 例 1：新增功能

```
feat(auth): add OAuth2 login via Google

Users asked for SSO support in #123. This wires Passport.js
with the google-oauth20 strategy and persists refresh tokens.
```

### 例 2：修 bug

```
fix(cart): prevent negative quantities on item removal

Removing the last item triggered a race condition that set
qty = -1. Clamp to 0 before persisting.
```
````

## 第三步：增加辅助脚本（可选）

Skill 可以携带任意可执行文件。假设我们想加一个"预检脚本"：

```bash
mkdir scripts
cat > scripts/precheck.sh <<'EOF'
#!/usr/bin/env bash
set -e
# 拒绝提交包含 console.log 的 JS 改动
if git diff --staged --name-only | grep -E '\.(js|ts)$' | xargs -r grep -l 'console\.log'; then
  echo "错误：暂存文件中存在 console.log"
  exit 1
fi
EOF
chmod +x scripts/precheck.sh
```

然后在 `SKILL.md` 的 Workflow 中引用它：

```markdown
3.5 **运行预检**：执行 `bash .claude/skills/git-commit/scripts/precheck.sh`，如失败则中止流程
```

Agent 在加载 skill 后，会把这些脚本当作"可调用的工具"使用。

## 第四步：测试 skill

### 4.1 验证能被发现

在项目目录启动 Claude Code / Agent，输入测试请求：

```
> 把刚才改的东西提交一下
```

如果 skill 写得好，Agent 会显示：

```
● Skill(git-commit)
  ⎿  Reading SKILL.md...
```

### 4.2 调试技巧

| 问题 | 排查方向 |
|------|---------|
| Skill 没被触发 | description 太抽象，加入明确的关键词 |
| 被错误触发 | description 写了"排除场景"但 Agent 没遵守 → 在正文 When to Use 里强调 |
| 脚本找不到 | 用绝对路径或 `$CLAUDE_SKILL_DIR` |
| 权限错误 | 确认脚本有可执行位 `chmod +x` |

### 4.3 手动调用

大部分 agent 还支持直接按名字调用 skill：

```
> /skill git-commit
```

这在调试时很有用——绕过自动匹配，直接验证 skill 内容是否正确。

## 第五步：打包与分享

Skill 是纯文件，分享极其简单：

### 随项目分享

```bash
git add .claude/skills/git-commit
git commit -m "chore: add git-commit skill"
```

队友克隆项目后即可使用，不需要任何安装步骤。

### 作为独立包分享

```bash
cd .claude/skills
tar czf git-commit-skill.tar.gz git-commit/
# 或上传到 github / npm / 内部制品库
```

使用者解压到自己的 `.claude/skills/` 即可。

## 进阶：多文件 Skill

当 skill 变大时，可以拆成多个 markdown：

```text
.claude/skills/data-analysis/
├── SKILL.md              # 入口，只写总览 + 触发条件
├── workflows/
│   ├── load-csv.md       # 加载数据
│   ├── clean.md          # 清洗
│   └── visualize.md      # 可视化
├── scripts/
│   └── analyze.py
└── templates/
    └── report.md
```

在 `SKILL.md` 里用相对路径引用：

```markdown
## Workflow

1. 加载数据：参见 [workflows/load-csv.md](./workflows/load-csv.md)
2. 清洗：参见 [workflows/clean.md](./workflows/clean.md)
...
```

Agent 会根据需要按需读取对应的子文件，而不是一次性把整个 skill 灌进上下文。

## 进阶：条件参数

skill 可以接收用户的附加参数。例如 `commit` skill 接收 `-m "message"`：

```markdown
## Arguments

- `-m <msg>` 跳过消息生成，直接使用用户提供的消息
- `--no-verify` 跳过 pre-commit 钩子（需谨慎）

## Workflow

如果传入 `-m`，跳过第 4 步（生成消息）直接使用用户值。
```

使用方式：

```
> /skill git-commit -m "fix typo"
```

## 小结

一个合格 Skill 的关键点：

1. **description 决定命中率**——写成判断式 + 列关键词
2. **SKILL.md 决定执行质量**——分步骤 + 明确产出格式
3. **脚本/模板让能力可复现**——别只写说明，配上可执行资源更佳
4. **先手写 → 再测试 → 后抽象**——不要一开始就搞复杂的多文件结构

下一章 [Skill 最佳实践](/ai/skills/best-practices) 将总结从实战中沉淀的设计原则。
