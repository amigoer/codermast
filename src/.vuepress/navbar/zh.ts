import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  "/",
  {
    text: "Java",
    icon: "java",
    prefix: "/java/",
    children: [
      {
        text: "Java基础",
        link: "base/",
      },
      {
        text: "Java集合",
        link: "collection/",
      },
      {
        text: "Java并发",
        link: "thread/",
      },
      {
        text: "JVM",
        link: "jvm/",
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
