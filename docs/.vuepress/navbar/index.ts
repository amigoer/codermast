import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([

    {
        text: "Java系列",
        icon: "iconfont icon-java",
        children: [
            {
                text: "基础篇",
                prefix: "/java",
                children: [
                    { text: "基础知识", link: "/base", },
                    { text: "集合框架", link: "/collection", },
                    { text: "面向对象", link: "/oop" },
                    { text: "线程并发", link: "/thread", },
                ]
            }, {
                text: "原理篇",
                children: [
                    { text: "JVM虚拟机", link: "/jvm", },
                ]
            }, {
                text: "Spring系列",
                icon: "iconfont icon-light",
                prefix: "/spring-series",
                children: [
                    { text: "Spring6", link: "/spring", },
                    { text: "Spring Boot", link: "/springboot", },
                    { text: "Spring MVC", link: "/springmvc" },
                    { text: "Spring Cloud", link: "/springcloud", },
                ]
            }
        ]
    }, {
        text: "数据库",
        icon: "iconfont icon-mysql",
        prefix: "/database",
        children: [
            {
                text: "SQL数据库",
                children: [{ text: "MySQL", link: "/mysql" }],
            },
            {
                text: "NoSQL数据库",
                children: [
                    { text: "Redis", link: "/redis" },
                    { text: "MongoDB", link: "/mongodb" },
                    { text: "ElaticSearch", link: "/elaticsearch" }],
            },
        ],
    },
    {
        text: "计算机基础",
        icon: "iconfont icon-computer",
        prefix: "/computer",
        children: [
            {
                text: "数据结构",
                link: "/ds",
            },
            {
                text: "组成原理",
                link: "/co",
            },
            {
                text: "操作系统",
                link: "/os",
            },
            {
                text: "计算机网络",
                link: "/cn",
            },
        ],
    },
    // {
    //   text: "前端",
    //   icon: "iconfont icon-mysql",
    //   prefix: "/front",
    //   children: [
    //     {
    //       text: "前端基础",
    //       children: [
    //         { text: "HTML", link: "/html" },
    //         { text: "CSS", link: "/css" },
    //         { text: "JavaScript", link: "/js" },
    //       ],
    //     },
    //     {
    //       text: "前端框架",
    //       prefix: "/frame",
    //       children: [
    //         { text: "Vue3", link: "/vue3" },
    //         { text: "Element UI", link: "/element-ui" },
    //         { text: "BootStrap", link: "/bootstrap" }],
    //     },
    //   ],
    // },
    // {
    //     text: "算法题解",
    //     icon: "iconfont icon-like",
    //     prefix: "/",
    //     children: [
    //         {
    //             text: "算法",
    //             link: "/algorithm",
    //         },
    //         {
    //             text: "题解",
    //             link: "/problems",
    //         },
    //     ]
    // },
    {
        text: "开发工具",
        icon: "iconfont icon-tool",
        prefix: "/dev-tools",
        children: [
            {
                text: "Docker",
                link: "/docker",
            },
            {
                text: "Git",
                link: "/git",
            },
            {
                text: "IDEA",
                link: "/idea",
            },
            {
                text: "Maven",
                link: "/maven",
            },
        ]
    }, {
        text: "关于",
        icon: "iconfont icon-tool",
        prefix: "/about",
        children: [
            {
                text: "网站更新",
                link: "/update"
            },
            {
                text: "作者相关",
                link: "/author",
            },
            {
                text: "心路历程",
                link: "/journey",
            },
        ]
    }
]);
