---
order : 7
---
# Redis入门 - Lua脚本

Redis 脚本使用 Lua 解释器来执行脚本。 Redis 2.6 版本通过内嵌支持 Lua 环境。执行脚本的常用命令为 EVAL。

## 语法

Eval 命令的基本语法如下：`EVAL script numkeys key [key ...] arg [arg ...]`

## 脚本命令

- 执行Lua脚本：`EVAL script numkeys key [key ...] arg [arg ...]`
- 将脚本添加到脚本缓存，但不执行：`SCRIPT LOAD script`
- 从脚本缓存中移除所有脚本：`SCRIPT FLUSH`
- 杀死当前正在运行的 Lua 脚本：`SCRIPT KILL`
- 查看指定的脚本是否已经被保存在缓存当中：`SCRIPT EXISTS script [script ...]`
- 根据给定的 sha1 校验码，执行缓存在服务器中的脚本：`EVALSHA sha1 numkeys key [key ...] arg [arg ...] `
