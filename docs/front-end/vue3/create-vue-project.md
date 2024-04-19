---
order : 1
---

# Vue3 - 创建 Vue 工程

## 基于 vue-cli 创建

::: warning vue-cli 已处于维护模式，官方推荐基于 Vite 创建项目
现在官方推荐使用 create-vue 来创建基于 Vite 的新项目。 
:::

1. 安装 `@vue/cli`，已安装可以跳过该过程

```sh
npm install -g @vue/cli
```

2. 查看 `@vue/cli` 版本，确保其在 `4.5.0` 版本以上

```sh
vue --version
```

3. 执行创建命令

```sh
vue create vue-codermast-project
```

::: info 
vue-codermast-project 为想要创建的项目名称，替换为自己的即可。
:::

该指令执行后，根据提示输入 Y 即可安装，然后选择自己想要的版本和控件即可。

4. 运行项目

```sh
# 切换到项目目录
cd vue-codermast-project

# 安装所需依赖
npm install

# 启动项目
npm run serve
```

## 基于 vite 创建 【推荐】

::: tip 
`vite` 是新一代前端构建工具，官网地址：[https://vitejs.cn](https://vitejs.cn/)，`vite`的优势如下：

- 轻量快速的热重载（`HMR`），能实现极速的服务启动。
- 对 `TypeScript`、`JSX`、`CSS` 等支持开箱即用。
- 真正的按需编译，不再等待整个应用编译完成。
- `webpack`构建 与 `vite`构建对比图如下

![](../../../assets/create-vue-project/2024-04-10-16-12-45.png =450x250)

![](../../../assets/create-vue-project/2024-04-10-16-13-01.png =450x250)
:::

1. 安装 Vite 

```sh
npm install vite
```

2. 创建项目

```sh
npm create vue@latest
```

3. 项目配置

```text
## 配置项目名称
√ Project name: vue-codermast-project
## 是否添加TypeScript支持
√ Add TypeScript?  Yes
## 是否添加JSX支持
√ Add JSX Support?  No
## 是否添加路由环境
√ Add Vue Router for Single Page Application development?  No
## 是否添加pinia环境
√ Add Pinia for state management?  No
## 是否添加单元测试
√ Add Vitest for Unit Testing?  No
## 是否添加端到端测试方案
√ Add an End-to-End Testing Solution? » No
## 是否添加ESLint语法检查
√ Add ESLint for code quality?  Yes
## 是否添加Prettiert代码格式化
√ Add Prettier for code formatting?  No
```

4. 项目启动

```sh
# 切换到项目目录
cd vue-codermast-project

# 安装所需依赖
npm install

# 启动项目
npm run serve
```