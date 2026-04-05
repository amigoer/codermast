import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import type { ReactNode } from 'react';

export const metadata = {
  title: {
    default: 'CoderMast - 全栈技术学习指南',
    template: '%s | CoderMast',
  },
  description:
    '面向开发者的全栈技术学习平台，涵盖编程语言、后端技术、云原生、数据库、消息队列、前端开发、项目实战、面试宝典等内容。',
  keywords: [
    'CoderMast',
    'Golang',
    'Java',
    '云原生',
    'Docker',
    'Kubernetes',
    'MySQL',
    'Redis',
    '全栈',
    '面试',
  ],
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
