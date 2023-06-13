---
 order : 2
---
# Redis入门 - 基础通用指令
在正式介绍Redis数据结构及其操作指令之前，我们需要先掌握一些最基础的通用指令。

这些都是Redis操作过程中的一些常见指令
|指令| 描述|
|:---:|:---:|
|keys| 查看符合模板的所有key，不建议在⽣产环境设备上使⽤|
|del |删除⼀个指定的key|
|esists| 判断key是否存在|
|expire |给⼀个key设置有效期，有效期到期时该key会被⾃动删除|
|ttl |查看⼀个KEY的剩余有效期|
|quit |退出|
|shutdown| 关闭服务器|
|select [0-15] |选择指定的数据库|

::: tip help指令
可以通过 help [command]可以查看⼀个命令的具体⽤法！

例如查看set指令的帮助文档：`help set`
:::