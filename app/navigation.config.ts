export interface NavItem {
  title: string
  path?: string
  icon?: string
  children?: NavItem[]
}

export interface NavTab {
  name: string
  prefix: string
  icon?: string
  groups: NavItem[]
}

export const tabs: NavTab[] = [
  {
    name: 'AI',
    prefix: '/ai',
    icon: 'i-lucide-sparkles',
    groups: [
      { title: 'AI 学习路线', path: '/ai/getting-started', icon: 'i-lucide-map' },
      {
        title: 'AI 基础',
        icon: 'i-lucide-book-open',
        children: [
          { title: '机器学习基础', path: '/ai/fundamentals/ml-basics' },
          { title: '深度学习', path: '/ai/fundamentals/deep-learning' },
          { title: '神经网络', path: '/ai/fundamentals/neural-networks' },
        ],
      },
      {
        title: '大语言模型',
        icon: 'i-lucide-brain',
        children: [
          { title: 'LLM 简介', path: '/ai/llm/introduction' },
          { title: 'Transformer', path: '/ai/llm/transformer' },
          { title: '微调', path: '/ai/llm/fine-tuning' },
          { title: '本地部署', path: '/ai/llm/local-deploy' },
        ],
      },
      {
        title: 'Prompt 工程',
        icon: 'i-lucide-message-square',
        children: [
          { title: '基础', path: '/ai/prompt/basics' },
          { title: '技巧', path: '/ai/prompt/techniques' },
          { title: '进阶', path: '/ai/prompt/advanced' },
        ],
      },
      {
        title: 'RAG 开发',
        icon: 'i-lucide-database',
        children: [
          { title: '简介', path: '/ai/rag/introduction' },
          { title: '向量数据库', path: '/ai/rag/vector-database' },
          { title: 'Embedding', path: '/ai/rag/embedding' },
          { title: '实战', path: '/ai/rag/practice' },
        ],
      },
      {
        title: 'AI Agent',
        icon: 'i-lucide-bot',
        children: [
          { title: '简介', path: '/ai/agent/introduction' },
          { title: '框架', path: '/ai/agent/frameworks' },
          { title: '工具调用', path: '/ai/agent/tool-use' },
          { title: '实战', path: '/ai/agent/practice' },
        ],
      },
      {
        title: 'MCP 协议',
        icon: 'i-lucide-plug',
        children: [
          { title: '简介', path: '/ai/mcp/introduction' },
          { title: 'Server', path: '/ai/mcp/server' },
          { title: 'Client', path: '/ai/mcp/client' },
        ],
      },
    ],
  },
  {
    name: 'Golang',
    prefix: '/golang',
    icon: 'i-vscode-icons:file-type-go',
    groups: [
      {
        title: 'Go 核心基础',
        icon: 'i-lucide-box',
        children: [
          { title: '安装配置', path: '/golang/core/go-install' },
          { title: '基础语法', path: '/golang/core/go-basic' },
          { title: '流程控制', path: '/golang/core/go-control' },
          { title: '函数', path: '/golang/core/go-function' },
          { title: '复合类型', path: '/golang/core/go-composite' },
          { title: '接口', path: '/golang/core/go-interface' },
          { title: '错误处理', path: '/golang/core/go-error' },
          { title: '模块管理', path: '/golang/core/go-module' },
        ],
      },
      {
        title: 'Go 进阶',
        icon: 'i-lucide-trending-up',
        children: [
          { title: '并发编程', path: '/golang/advanced/concurrency' },
          { title: 'GMP 模型', path: '/golang/advanced/gmp' },
          { title: '内存管理', path: '/golang/advanced/memory' },
          { title: '垃圾回收', path: '/golang/advanced/gc' },
          { title: '性能分析', path: '/golang/advanced/profiling' },
          { title: '并发模式', path: '/golang/advanced/go-concurrency' },
        ],
      },
      {
        title: 'Go Web 开发',
        icon: 'i-lucide-globe',
        children: [
          {
            title: 'Gin',
            children: [
              { title: '快速开始', path: '/golang/web/gin/quickstart' },
              { title: '路由', path: '/golang/web/gin/router' },
              { title: '请求处理', path: '/golang/web/gin/request' },
              { title: '响应处理', path: '/golang/web/gin/response' },
              { title: '文件操作', path: '/golang/web/gin/file' },
              { title: '中间件', path: '/golang/web/gin/middleware' },
              { title: '参数验证', path: '/golang/web/gin/validation' },
              { title: '错误处理', path: '/golang/web/gin/error' },
            ],
          },
          {
            title: 'GORM',
            children: [
              { title: '快速开始', path: '/golang/web/gorm/quickstart' },
              { title: '模型定义', path: '/golang/web/gorm/model' },
              { title: 'CRUD', path: '/golang/web/gorm/crud' },
              { title: '查询', path: '/golang/web/gorm/query' },
              { title: '关联', path: '/golang/web/gorm/association' },
              { title: '事务', path: '/golang/web/gorm/transaction' },
              { title: '性能优化', path: '/golang/web/gorm/performance' },
            ],
          },
        ],
      },
      {
        title: 'Go 分布式',
        icon: 'i-lucide-network',
        children: [
          { title: 'Redis', path: '/golang/distributed/redis' },
          { title: '消息队列', path: '/golang/distributed/mq' },
          { title: 'gRPC', path: '/golang/distributed/grpc' },
          { title: '微服务', path: '/golang/distributed/microservice' },
        ],
      },
      {
        title: 'Go 工程化',
        icon: 'i-lucide-wrench',
        children: [
          { title: '测试', path: '/golang/engineering/testing' },
          { title: '日志', path: '/golang/engineering/logging' },
          { title: '配置管理', path: '/golang/engineering/config' },
          { title: 'Docker', path: '/golang/engineering/docker' },
          { title: 'Kubernetes', path: '/golang/engineering/kubernetes' },
        ],
      },
      {
        title: '标准库',
        icon: 'i-lucide-library',
        children: [
          { title: 'bufio', path: '/golang/stdlib/bufio' },
          { title: 'container', path: '/golang/stdlib/container' },
          { title: 'crypto', path: '/golang/stdlib/crypto' },
          { title: 'encoding/csv', path: '/golang/stdlib/encoding-csv' },
          { title: 'encoding/json', path: '/golang/stdlib/encoding-json' },
          { title: 'encoding/xml', path: '/golang/stdlib/encoding-xml' },
          { title: 'flag', path: '/golang/stdlib/flag' },
          { title: 'fmt', path: '/golang/stdlib/fmt' },
          { title: 'http', path: '/golang/stdlib/http' },
          { title: 'io', path: '/golang/stdlib/io' },
          { title: 'log', path: '/golang/stdlib/log' },
          { title: 'math', path: '/golang/stdlib/math' },
          { title: 'net', path: '/golang/stdlib/net' },
          { title: 'os', path: '/golang/stdlib/os' },
          { title: 'sort', path: '/golang/stdlib/sort' },
          { title: 'strconv', path: '/golang/stdlib/strconv' },
          { title: 'time', path: '/golang/stdlib/time' },
        ],
      },
    ],
  },
  {
    name: 'Java & Spring',
    icon: 'i-vscode-icons:file-type-java',
    prefix: '/other',
    groups: [
      {
        title: 'Java 核心知识',
        icon: 'i-lucide-box',
        children: [
          { title: 'JDK 环境配置', path: '/other/java/core/jdk-env-path' },
          { title: '基础语法', path: '/other/java/core/basic-grammar' },
          { title: '类和对象', path: '/other/java/core/class-and-object' },
          { title: '异常处理', path: '/other/java/core/exception' },
          { title: '反射', path: '/other/java/core/reflection' },
          { title: '泛型', path: '/other/java/core/generics' },
          { title: '注解', path: '/other/java/core/annotation' },
          { title: '字符串', path: '/other/java/core/string' },
          { title: '常用类', path: '/other/java/core/common-classes' },
        ],
      },
      {
        title: 'Java 集合框架',
        icon: 'i-lucide-layers',
        children: [
          { title: 'ArrayList', path: '/other/java/collection/list-arraylist' },
          { title: 'LinkedList', path: '/other/java/collection/list-linkedlist' },
          { title: 'Stack', path: '/other/java/collection/list-stack' },
          { title: 'Vector', path: '/other/java/collection/list-vectore' },
          { title: 'HashMap', path: '/other/java/collection/map-hashmap' },
          { title: 'LinkedHashMap', path: '/other/java/collection/map-linkedhashmap' },
          { title: 'TreeMap', path: '/other/java/collection/map-treemap' },
          { title: 'Deque', path: '/other/java/collection/queue-deque' },
          { title: 'Queue', path: '/other/java/collection/queue-queue' },
          { title: 'HashSet', path: '/other/java/collection/set-hashset' },
          { title: 'LinkedHashSet', path: '/other/java/collection/set-linkedhashset' },
          { title: 'TreeSet', path: '/other/java/collection/set-treeset' },
        ],
      },
      {
        title: 'Java IO 框架',
        icon: 'i-lucide-file-input',
        children: [
          { title: '缓冲流', path: '/other/java/io/buffer-stream' },
          { title: '字节流', path: '/other/java/io/byte-stream' },
          { title: '字符流', path: '/other/java/io/char-stream' },
          { title: 'File', path: '/other/java/io/file' },
          { title: 'IO 流体系', path: '/other/java/io/io-stream-system' },
          { title: 'NIO', path: '/other/java/io/nio' },
        ],
      },
      {
        title: 'JVM 虚拟机',
        icon: 'i-lucide-cpu',
        children: [
          { title: '类加载', path: '/other/java/jvm/class-loading' },
          { title: '垃圾回收', path: '/other/java/jvm/garbage-collection' },
          { title: 'JVM 内存', path: '/other/java/jvm/jvm-memory' },
          { title: 'JVM 调优', path: '/other/java/jvm/jvm-tuning' },
        ],
      },
      {
        title: 'Java 并发框架',
        icon: 'i-lucide-git-branch',
        children: [
          { title: '原子操作', path: '/other/java/thread/atomic' },
          { title: 'CompletableFuture', path: '/other/java/thread/completable-future' },
          { title: '并发集合', path: '/other/java/thread/concurrent-collections' },
          { title: '并发工具', path: '/other/java/thread/concurrent-utils' },
          { title: 'synchronized 与锁', path: '/other/java/thread/synchronized-lock' },
          { title: '线程基础', path: '/other/java/thread/thread-basic' },
          { title: '线程池', path: '/other/java/thread/thread-pool' },
        ],
      },
      {
        title: 'Spring',
        icon: 'i-lucide-leaf',
        children: [
          { title: '入门案例', path: '/other/spring-series/spring/introduction-case' },
          { title: 'Spring IoC', path: '/other/spring-series/spring/spring-ioc' },
          { title: 'IoC 实现', path: '/other/spring-series/spring/implement-ioc' },
          { title: 'XML 配置 Bean', path: '/other/spring-series/spring/xml-beans' },
          { title: '注解配置 Bean', path: '/other/spring-series/spring/annotations-beans' },
          { title: 'Spring AOP', path: '/other/spring-series/spring/spring-aop' },
          { title: 'Spring AOT', path: '/other/spring-series/spring/spring-aot' },
          { title: '事务管理', path: '/other/spring-series/spring/spring-transaction' },
          { title: '资源管理', path: '/other/spring-series/spring/spring-resources' },
          { title: '数据校验', path: '/other/spring-series/spring/spring-data-validation' },
          { title: '国际化', path: '/other/spring-series/spring/spring-i18n' },
          { title: 'JUnit 测试', path: '/other/spring-series/spring/spring-junit' },
          { title: '总结', path: '/other/spring-series/spring/spring-summarize' },
        ],
      },
      {
        title: 'Spring MVC',
        icon: 'i-lucide-layout',
        children: [
          { title: '简介', path: '/other/spring-series/springmvc/springmvc-introduction' },
          { title: '请求处理', path: '/other/spring-series/springmvc/springmvc-request' },
          { title: '响应处理', path: '/other/spring-series/springmvc/springmvc-response' },
          { title: '数据绑定', path: '/other/spring-series/springmvc/springmvc-databind' },
          { title: '拦截器', path: '/other/spring-series/springmvc/springmvc-interceptor' },
          { title: '异常处理', path: '/other/spring-series/springmvc/springmvc-exception' },
        ],
      },
      {
        title: 'SpringBoot',
        icon: 'i-lucide-rocket',
        children: [
          { title: '快速开始', path: '/other/spring-series/springboot/springboot-quickstart' },
          { title: '配置', path: '/other/spring-series/springboot/springboot-config' },
          { title: 'Web 开发', path: '/other/spring-series/springboot/springboot-web' },
          { title: '数据访问', path: '/other/spring-series/springboot/springboot-data' },
        ],
      },
      {
        title: 'Spring Cloud',
        icon: 'i-lucide-cloud',
        children: [
          { title: '简介', path: '/other/spring-series/springcloud/springcloud-introduction' },
          { title: '服务发现', path: '/other/spring-series/springcloud/springcloud-discovery' },
          { title: '网关', path: '/other/spring-series/springcloud/springcloud-gateway' },
          { title: 'Feign', path: '/other/spring-series/springcloud/springcloud-feign' },
          { title: 'Sentinel', path: '/other/spring-series/springcloud/springcloud-sentinel' },
          { title: '配置中心', path: '/other/spring-series/springcloud/springcloud-config' },
        ],
      },
    ],
  },
  {
    name: '技术教程',
    icon: 'i-lucide-book-open',
    prefix: '/tutorials',
    groups: [
      {
        title: 'Docker',
        icon: 'i-vscode-icons:file-type-docker',
        children: [
          { title: 'Docker 简介', path: '/tutorials/cloud/docker/docker-introduce' },
          { title: '安装', path: '/tutorials/cloud/docker/docker-install' },
          { title: 'Hello World', path: '/tutorials/cloud/docker/docker-helloworld' },
          { title: '基础操作', path: '/tutorials/cloud/docker/docker-basic' },
          { title: '核心对象', path: '/tutorials/cloud/docker/docker-object' },
          { title: 'Dockerfile', path: '/tutorials/cloud/docker/docker-dockerfile' },
          { title: 'Docker Compose', path: '/tutorials/cloud/docker/docker-compose' },
          { title: '仓库', path: '/tutorials/cloud/docker/docker-warehouse' },
          { title: '容器连接', path: '/tutorials/cloud/docker/docker-container-connection' },
          { title: 'Web 容器', path: '/tutorials/cloud/docker/docker-web-containers' },
        ],
      },
      {
        title: 'Kubernetes',
        icon: 'i-vscode-icons:file-type-kubernetes',
        children: [
          { title: '简介', path: '/tutorials/cloud/kubernetes/k8s-introduction' },
          { title: '安装', path: '/tutorials/cloud/kubernetes/k8s-install' },
          { title: 'kubectl', path: '/tutorials/cloud/kubernetes/k8s-kubectl' },
          { title: '工作负载', path: '/tutorials/cloud/kubernetes/k8s-workload' },
          { title: 'Service', path: '/tutorials/cloud/kubernetes/k8s-service' },
          { title: '存储', path: '/tutorials/cloud/kubernetes/k8s-storage' },
          { title: '配置', path: '/tutorials/cloud/kubernetes/k8s-config' },
          { title: '网络与安全', path: '/tutorials/cloud/kubernetes/k8s-network-security' },
          { title: '监控', path: '/tutorials/cloud/kubernetes/k8s-monitoring' },
          { title: 'Helm', path: '/tutorials/cloud/kubernetes/k8s-helm' },
        ],
      },
      {
        title: 'Linux',
        icon: 'i-vscode-icons:file-type-linux',
        children: [
          { title: '文件与目录', path: '/tutorials/cloud/linux/linux-file-directory' },
          { title: '用户与权限', path: '/tutorials/cloud/linux/linux-user-permission' },
          { title: '进程管理', path: '/tutorials/cloud/linux/linux-process' },
          { title: '软件包', path: '/tutorials/cloud/linux/linux-package' },
          { title: '服务管理', path: '/tutorials/cloud/linux/linux-service' },
          { title: '网络配置', path: '/tutorials/cloud/linux/linux-network' },
          { title: 'Bash', path: '/tutorials/cloud/linux/linux-bash' },
          { title: 'Shell 脚本', path: '/tutorials/cloud/linux/linux-scripts' },
        ],
      },
      {
        title: 'Nginx',
        icon: 'i-vscode-icons:file-type-nginx',
        children: [
          { title: '安装', path: '/tutorials/cloud/nginx/nginx-install' },
          { title: '静态资源', path: '/tutorials/cloud/nginx/nginx-static' },
          { title: '反向代理', path: '/tutorials/cloud/nginx/nginx-proxy' },
          { title: '负载均衡', path: '/tutorials/cloud/nginx/nginx-loadbalance' },
          { title: '虚拟主机', path: '/tutorials/cloud/nginx/nginx-vhost' },
          { title: 'HTTPS', path: '/tutorials/cloud/nginx/nginx-https' },
          { title: '性能优化', path: '/tutorials/cloud/nginx/nginx-optimization' },
        ],
      },
      {
        title: 'MySQL',
        icon: 'i-vscode-icons:file-type-mysql',
        children: [
          { title: 'SQL 基础', path: '/tutorials/database/mysql/sql-basic' },
          { title: 'SQL 进阶', path: '/tutorials/database/mysql/sql-advanced' },
          { title: '索引', path: '/tutorials/database/mysql/mysql-index' },
          { title: '事务', path: '/tutorials/database/mysql/mysql-transaction' },
          { title: '锁', path: '/tutorials/database/mysql/mysql-lock' },
          { title: '优化', path: '/tutorials/database/mysql/mysql-optimize' },
          { title: '架构', path: '/tutorials/database/mysql/mysql-architecture' },
        ],
      },
      {
        title: 'Redis',
        icon: 'i-devicon:redis',
        children: [
          { title: '基础', path: '/tutorials/database/redis/redis-basic' },
          { title: '数据类型', path: '/tutorials/database/redis/redis-datatype' },
          { title: '进阶', path: '/tutorials/database/redis/redis-advanced' },
          { title: '持久化', path: '/tutorials/database/redis/redis-persistence' },
          { title: '集群', path: '/tutorials/database/redis/redis-cluster' },
          { title: '优化', path: '/tutorials/database/redis/redis-optimize' },
          { title: '原理', path: '/tutorials/database/redis/redis-principle' },
        ],
      },
      {
        title: 'Kafka',
        icon: 'i-devicon:apachekafka',
        children: [
          { title: '简介', path: '/tutorials/mq/kafka/kafka-introduction' },
          { title: '生产者与消费者', path: '/tutorials/mq/kafka/kafka-producer-consumer' },
          { title: 'SpringBoot 集成', path: '/tutorials/mq/kafka/kafka-springboot' },
        ],
      },
      {
        title: 'RabbitMQ',
        icon: 'i-devicon:rabbitmq',
        children: [
          { title: '简介', path: '/tutorials/mq/rabbitmq/rabbitmq-introduction' },
          { title: '交换机', path: '/tutorials/mq/rabbitmq/rabbitmq-exchange' },
          { title: '可靠性', path: '/tutorials/mq/rabbitmq/rabbitmq-reliability' },
          { title: 'SpringBoot 集成', path: '/tutorials/mq/rabbitmq/rabbitmq-springboot' },
        ],
      },
      {
        title: 'RocketMQ',
        icon: 'i-lucide-send',
        children: [
          { title: '核心概念', path: '/tutorials/mq/rocketmq/rocketmq-concepts' },
          { title: '消息类型', path: '/tutorials/mq/rocketmq/rocketmq-message-type' },
          { title: '安装', path: '/tutorials/mq/rocketmq/rocketmq-installation' },
          { title: '客户端', path: '/tutorials/mq/rocketmq/rocketmq-client' },
        ],
      },
      {
        title: 'Git',
        icon: 'i-vscode-icons:file-type-git',
        children: [
          { title: '简介与安装', path: '/tutorials/dev-tools/git/git-introduce-install' },
          { title: '基本操作', path: '/tutorials/dev-tools/git/git-basic-operations' },
          { title: '分支管理', path: '/tutorials/dev-tools/git/git-branch-manage' },
          { title: '内容操作', path: '/tutorials/dev-tools/git/git-content-operations' },
          { title: '远程管理', path: '/tutorials/dev-tools/git/git-remote-manage' },
          { title: '工作区与暂存区', path: '/tutorials/dev-tools/git/git-workspace-index-repo' },
        ],
      },
      {
        title: 'IDEA',
        icon: 'i-vscode-icons:file-type-jetbrains',
        children: [
          { title: '快捷键', path: '/tutorials/dev-tools/idea/shortcuts' },
        ],
      },
      {
        title: 'Maven',
        icon: 'i-vscode-icons:file-type-maven',
        children: [
          { title: '简介与配置', path: '/tutorials/dev-tools/maven/introduce-install-config' },
        ],
      },
      { title: 'Homebrew', path: '/tutorials/dev-tools/homebrew', icon: 'i-lucide-package' },
      {
        title: '设计模式',
        icon: 'i-lucide-shapes',
        children: [
          { title: '观察者模式', path: '/tutorials/dev-idea/design-patterns/behaiver-patterns/observer-pattern' },
          { title: '工厂模式', path: '/tutorials/dev-idea/design-patterns/create-patterns/factory-pattern' },
          { title: '单例模式', path: '/tutorials/dev-idea/design-patterns/create-patterns/singleton-pattern' },
          { title: '适配器模式', path: '/tutorials/dev-idea/design-patterns/structural-patterns/adapter-pattern' },
        ],
      },
      {
        title: 'Vue3',
        icon: 'i-vscode-icons:file-type-vue',
        children: [
          { title: '基础知识', path: '/tutorials/front-end/vue3/basic-knowledge' },
          { title: '创建项目', path: '/tutorials/front-end/vue3/create-vue-project' },
          { title: '模板语法', path: '/tutorials/front-end/vue3/template-grammar' },
          { title: '计算属性', path: '/tutorials/front-end/vue3/computed' },
          { title: '侦听器', path: '/tutorials/front-end/vue3/watch' },
          { title: '生命周期', path: '/tutorials/front-end/vue3/life-cycle' },
          { title: '组件通信', path: '/tutorials/front-end/vue3/component-communication' },
          { title: 'Pinia', path: '/tutorials/front-end/vue3/pinia' },
          { title: 'Router', path: '/tutorials/front-end/vue3/router' },
          { title: '新组件', path: '/tutorials/front-end/vue3/vue3-new-component' },
          { title: '其他 API', path: '/tutorials/front-end/vue3/other-api' },
        ],
      },
    ],
  },
  {
    name: '面试宝典',
    icon: 'i-lucide-briefcase',
    prefix: '/interview',
    groups: [
      { title: 'Golang', path: '/interview/golang', icon: 'i-vscode-icons:file-type-go' },
      { title: 'MySQL', path: '/interview/mysql', icon: 'i-vscode-icons:file-type-mysql' },
      { title: 'Redis', path: '/interview/redis', icon: 'i-devicon:redis' },
      { title: 'RocketMQ', path: '/interview/rocketmq', icon: 'i-lucide-send' },
      { title: '计算机基础', path: '/interview/basic', icon: 'i-lucide-cpu' },
      { title: 'Kubernetes', path: '/interview/k8s', icon: 'i-vscode-icons:file-type-kubernetes' },
    ],
  },
  {
    name: '项目实战',
    icon: 'i-lucide-rocket',
    prefix: '/project',
    groups: [
      {
        title: '苍穹外卖',
        icon: 'i-lucide-utensils',
        children: [
          { title: '后端搭建', path: '/project/sky-take-out/BackEnd-Dev-Build' },
          { title: '数据库搭建', path: '/project/sky-take-out/Database-Dev-Build' },
          { title: '前端搭建', path: '/project/sky-take-out/FrontEnd-Dev-Build' },
        ],
      },
    ],
  },
  {
    name: '关于',
    icon: 'i-lucide-info',
    prefix: '/about',
    groups: [
      { title: '关于作者', path: '/about/author/index', icon: 'i-lucide-user' },
      { title: '成长之路', path: '/about/journey/index', icon: 'i-lucide-map' },
    ],
  },
]
