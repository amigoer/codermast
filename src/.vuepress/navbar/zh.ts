import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  "/",
  {
    text: "Java",
    icon: "discover",
    prefix: "/java/",
    children: [
      {
        text: "JavaSE",
        link: "javase"
      },
      {
        text: "JavaEE",
        link: "javaee",
      },
      {
        text: "JVM",
        link: "jvm",
      }
    ]
  },
  {
    text: "数据库",
    icon: "discover",
    prefix: "/sql/",
    children: [
      {
        text: "Redis",
        link: "redis"
      },
      {
        text: "MySQL",
        link: "mysql",
      },
    ]
  },
  {
    text: "指南",
    icon: "creative",
    prefix: "/guide/",
    children: [
      {
        text: "Bar",
        icon: "creative",
        prefix: "bar/",
        children: ["baz", { text: "...", icon: "more", link: "" }],
      },
      {
        text: "Foo",
        icon: "config",
        prefix: "foo/",
        children: ["ray", { text: "...", icon: "more", link: "" }],
      },
    ],
  },
  {
    text: "V2 文档",
    icon: "note",
    link: "https://theme-hope.vuejs.press/zh/",
  },
]);
