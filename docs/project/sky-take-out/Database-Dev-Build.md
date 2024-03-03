# 数据库环境搭建

1. 修改数据库配置信息

修改 `sky-server/src/main/resources/application-dev.yml` 文件内的数据库配置信息为自己的信息。

```yml
driver-class-name: com.mysql.cj.jdbc.Driver
host: localhost
port: 3306
database: sky_take_out  # 数据库名称
username: codermast # 数据库账号
password: 123456    # 数据库密码
```

2. 导入数据信息

执行 `sky-sql/sky.sql` 这个 SQL 文件内的 SQL 语句即可。

这个 SQL 文件可以在该项目的 Github 仓库内找到，另外也可以在后端环境搭建章节中的资料下载中下载。

这里再附上下载链接，和后端环境搭建中的下载文件是相同的。

::: tip 百度网盘
下载链接: https://pan.baidu.com/s/1ISkop_BXuCCCWQTr3ynuRA?pwd=sbcw 提取码: sbcw 
:::
