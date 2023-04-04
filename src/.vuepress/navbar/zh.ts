import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  "/",
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
    icon: "creative",
    prefix: "/database/",
    children: [
      {
        text: "SQL数据库",
        children: [{ text: "MySQL", icon: "mysql", link: "mysql/" }],
      },
      {
        text: "NoSQL数据库",
        children: [{ text: "Redis", icon: "redis", link: "redis/" }],
      },
    ],
  },
  {
    text: "V2 文档",
    icon: "note",
    link: "https://theme-hope.vuejs.press/zh/",
  },
]);
