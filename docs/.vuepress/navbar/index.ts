import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
    {
        text: "Java系列",
        icon: "la:java",
        prefix: "/java/",
        children: [
            {
                text: "基础篇",
                children: [
                    { text: "核心知识", link: "core/", },
                    { text: "集合框架", link: "collection/", },
                    { text: "并发框架", link: "thread/" },
                    { text: "IO框架", link: "io/", },
                ]
            }, {
                text: "原理篇",
                children: [
                    { text: "JVM虚拟机", link: "jvm/", },
                ]
            }, {
                text: "Spring系列",
                prefix: "/spring-series/",
                icon: "simple-icons:spring",
                children: [
                    { text: "Spring6", link: "spring/", },
                    { text: "Spring Boot", link: "springboot/", },
                    { text: "Spring MVC", link: "springmvc/" },
                    { text: "Spring Cloud", link: "springcloud/", },
                ]
            }
        ]
    },
    {
        text: "数据库",
        icon: "mdi:sql-query",
        prefix: "/database/",
        children: [
            {
                text: "SQL数据库",
                children: [{ text: "MySQL", link: "mysql/", icon: "simple-icons:mysql" }],
            },
            {
                text: "NoSQL数据库",
                children: [
                    { text: "Redis", link: "redis/", icon: "cib:redis" },
                    { text: "MongoDB", link: "mongodb/", icon: "teenyicons:mongodb-solid" },
                    { text: "ElaticSearch", link: "elaticsearch/", icon: "mingcute:search-fill" }],
            },
        ],
    },
    {
        text: "计算机基础",
        icon: "ri:computer-fill",
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
        text: "开发工具",
        icon: "mdi:tools",
        prefix: "/dev-tools/",
        children: [
            {
                text: "Docker",
                link: "docker/",
                icon: "mdi:docker",
            },
            {
                text: "Git",
                link: "git/",
                icon: "mdi:git",
            },
            {
                text: "IDEA",
                link: "idea/",
                icon: "simple-icons:intellijidea",
            },
            {
                text: "Maven",
                link: "maven/",
                icon: "devicon-plain:maven",
            },
        ]
    },
    {
        text: "项目实战",
        icon: "ph:planet-bold",
        link: "project/",
    },
    {
        text: "知识星球",
        icon: "ph:planet-bold",
        link: "planet/",
    },

    {
        text: "关于",
        icon: "fa-solid:user-friends",
        prefix: "/about/",
        children: [
            {
                text: "网站更新",
                link: "update/"
            },
            {
                text: "作者相关",
                link: "author/",
            },
            {
                text: "心路历程",
                link: "journey/",
            },
        ]
    }
]);
