import Link from 'next/link';
import {
  Code2,
  Database,
  Cloud,
  FileQuestion,
  Layers,
  Wrench,
  Rocket,
  Monitor,
  ArrowRight,
} from 'lucide-react';

const sections = [
  {
    icon: <Code2 className="size-4" />,
    title: 'Golang',
    desc: '核心语法、并发编程、GMP、Web 开发、标准库',
    href: '/docs/golang',
  },
  {
    icon: <Code2 className="size-4" />,
    title: 'Java',
    desc: '核心语法、集合、IO、多线程、JVM、Spring',
    href: '/docs/other/java',
  },
  {
    icon: <Database className="size-4" />,
    title: '数据库',
    desc: 'MySQL 索引与优化、Redis 数据类型与集群',
    href: '/docs/tutorials/database',
  },
  {
    icon: <Layers className="size-4" />,
    title: '消息队列',
    desc: 'Kafka、RabbitMQ、RocketMQ',
    href: '/docs/tutorials/mq',
  },
  {
    icon: <Cloud className="size-4" />,
    title: '云原生',
    desc: 'Docker、Kubernetes、Linux、Nginx',
    href: '/docs/tutorials/cloud',
  },
  {
    icon: <Monitor className="size-4" />,
    title: '前端',
    desc: 'Vue 3 组件通信、Pinia、Router',
    href: '/docs/other/front-end',
  },
  {
    icon: <Wrench className="size-4" />,
    title: '工具',
    desc: 'Git、Maven、IDEA、设计模式',
    href: '/docs/other/dev-tools',
  },
  {
    icon: <FileQuestion className="size-4" />,
    title: '面试',
    desc: 'Go、MySQL、Redis、MQ、K8s',
    href: '/docs/interview',
  },
  {
    icon: <Rocket className="size-4" />,
    title: '实战',
    desc: '从零到一完整项目开发',
    href: '/docs/project',
  },
];

export default function HomePage() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero */}
      <section className="flex flex-col items-center px-6 pt-20 pb-12 text-center">
        <p className="text-sm text-fd-muted-foreground mb-3">
          面向开发者的全栈技术学习平台
        </p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-fd-foreground">
          CoderMast
        </h1>
        <p className="mt-3 text-fd-muted-foreground max-w-md">
          从编程语言到云原生，系统化的知识体系助你进阶
        </p>
        <div className="mt-6 flex gap-3">
          <Link
            href="/docs"
            className="inline-flex items-center gap-1.5 rounded-md bg-fd-primary px-5 py-2 text-sm font-medium text-fd-primary-foreground hover:bg-fd-primary/90 transition-colors"
          >
            开始阅读
            <ArrowRight className="size-3.5" />
          </Link>
          <Link
            href="https://github.com/amigoer/codermast"
            target="_blank"
            className="inline-flex items-center gap-1.5 rounded-md border border-fd-border px-5 py-2 text-sm font-medium text-fd-muted-foreground hover:text-fd-foreground hover:bg-fd-accent transition-colors"
          >
            GitHub
          </Link>
        </div>
      </section>

      {/* Grid */}
      <section className="px-6 pb-20 max-w-3xl mx-auto w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-fd-border rounded-lg overflow-hidden border border-fd-border">
          {sections.map((s) => (
            <Link
              key={s.title}
              href={s.href}
              className="group flex items-start gap-3 bg-fd-background p-4 hover:bg-fd-accent/50 transition-colors"
            >
              <div className="mt-0.5 text-fd-muted-foreground group-hover:text-fd-foreground transition-colors">
                {s.icon}
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-medium text-fd-foreground">
                  {s.title}
                </h3>
                <p className="mt-0.5 text-xs text-fd-muted-foreground leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
