import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([

  {
    text: "首页",
    icon: "home",
    link: "/"
  },
  {
    text: "Java",
    icon: "java",
    prefix: "/java/",
    children: [
      { text: "基础知识", link: "base/", },
      { text: "集合框架", link: "collection/", },
      { text: "面向对象", link: "oop/" },
      { text: "线程并发", link: "thread/", },
      { text: "JVM虚拟机", link: "jvm/", },
    ]
  },
  {
    text: "数据库",
    icon: "mysql",
    prefix: "/database/",
    children: [
      {
        text: "SQL数据库",
        children: [{ text: "MySQL", link: "mysql/" }],
      },
      {
        text: "NoSQL数据库",
        children: [{ text: "Redis", link: "redis/" }],
      },
    ],
  },
  {
    text: "计算机基础",
    icon: "computer",
    prefix: "/computer/",
    children: [
      {
        text: "数据结构",
        link: "ds/",
      },
      {
        text: "组成原理",
        link: "co/",
      },
      {
        text: "操作系统",
        link: "os/",
      },
      {
        text: "计算机网络",
        link: "cn/",
      },
    ],
  },
  {
    text: "算法题解",
    icon: "like",
    prefix: "/",
    children: [
      {
        text: "算法",
        link: "algorithm/",
      },
      {
        text: "题解",
        link: "problems/",
      },
    ]
  },
  {
    text: "博客",
    icon: "blog",
    link: "https://blog.codermast.com/"
  }
]);
