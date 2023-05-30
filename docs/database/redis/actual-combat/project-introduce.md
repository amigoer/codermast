---
order : 1
---
# Redis实战 - 项目介绍

## 项目介绍

本项目是黑马程序员发布的黑马点评网项目，项目基于Spring Boot + Redis + MySQL 技术栈开发。

功能模块：
1. 短信登录
2. 商户查询缓存
3. 达人探店
4. 优惠券秒杀
5. 好友关注
6. 附近的商户
7. 用户签到
8. UV 统计 

## 资料下载

::: tip 百度网盘
- 地址：https://pan.baidu.com/s/1SnbpxXcbjnvcz_qndWZbsg?pwd=5y8g
- 提取码: 5y8g 
:::

![百度网盘](../../../../assets/project-introduce/2023-05-20-00-23-04.png)

## 项目导入

### Windows OS
::: tip 参考视频
参考官方的教程视频即可：
https://www.bilibili.com/video/BV1cr4y1671t?p=25
:::

### Mac OS

1. 下载资料

2. 导入后端项目至 IDEA 或其他开发工具

3. 使用 Brew 安装 Nginx

```sh
brew install nginx
```
4. 配置前台项目

将资料中的 nginx-1.18.0.zip 内 html 文件夹中的 hmdp 文件夹复制到我们安装好的 Nginx 中的html 文件夹中。

5. 配置 Nginx

通过 Brew 安装的 Nginx 配置文件在 `/opt/homebrew/etc/nginx` 这个目录下，修改里面的 nginx.conf 文件内容为 `nginx-1.18.0.zip` 中的配置项。