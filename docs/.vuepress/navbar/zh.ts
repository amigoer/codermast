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
      { text: "Java基础", link: "base/", },
      { text: "Java集合", link: "collection/", },
      { text: "Java并发", link: "thread/", },
      { text: "JVM", link: "jvm/", },
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
    text: "408",
    icon: "light",
    prefix: "/408/",
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
    text: "V2 文档",
    icon: "note",
    link: "https://theme-hope.vuejs.press/zh/",
  },
]);
