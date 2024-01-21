---
order : 9
---
# Docker - Dockerfile

## 什么是Dockerfile？

DockerFile 是用于构建 Docker 镜像的文本文件。Docker 是一种容器化平台，允许开发者将应用程序及其依赖项打包到一个可移植的容器中，以确保在不同环境中的一致性和可移植性。

DockerFile 包含一系列指令，这些指令描述了如何构建 Docker 镜像。每个指令都对应一个操作，例如安装软件包、设置环境变量、复制文件等。当 Docker 引擎读取 DockerFile 时，它会逐行执行其中的指令，以最终创建一个镜像。

以下是一个简单的 DockerFile 示例：

```dockerfile
# 使用官方的基础镜像
FROM ubuntu:latest

# 设置工作目录
WORKDIR /app

# 复制当前目录下的所有文件到工作目录
COPY . .

# 安装依赖
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip

# 安装应用程序依赖
RUN pip3 install -r requirements.txt

# 暴露应用程序的端口
EXPOSE 5000

# 定义启动命令
CMD ["python3", "app.py"]
```
在上面的示例中：

- FROM 指定了基础镜像，即用作构建的起点的操作系统和环境。
- WORKDIR 设置了工作目录，即后续指令执行时的当前工作目录。
- COPY 将当前目录下的所有文件复制到容器的工作目录。
- RUN 执行命令，例如更新包列表、安装软件等。
- EXPOSE 声明应用程序将监听的端口。
- CMD 定义了容器启动时要执行的默认命令。

通过编写 DockerFile，开发者可以将应用程序的构建过程和运行时环境的配置以代码的方式进行描述，实现了可重复、可移植和可自动化的容器化部署。


## 镜像结构



## 编写规则

- 每条保留字指令都必须为大写字母且后面要跟随至少一个参数
- 指令顺序执行，遵循从上到下原则
- #表示注释
- 每条指令都会创建一个新的镜像层，并对镜像进行提交
