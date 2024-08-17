import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
    {
        text: "技术教程",
        icon: "material-symbols:book",
        children: [
            {
                text: "Java全栈",
                prefix: "/java/",
                children: [
                    { text: "核心知识", link: "core/", icon: "ri:coreos-fill", },
                    { text: "集合框架", link: "collection/", icon: "mdi:collection", },
                    { text: "并发框架", link: "thread/", icon: "uim:process", },
                    { text: "IO框架", link: "io/", icon: "fluent:stream-20-filled", },
                    { text: "JVM虚拟机", link: "jvm/", icon: "material-symbols:allergies", },
                ]
            },
            {
                text: "Spring系列",
                prefix: "/spring-series/",
                children: [

                    { text: "Spring 6", link: "spring/", icon: "simple-icons:spring" },
                    { text: "Spring MVC", link: "springmvc/", icon: "fluent:cloud-flow-20-filled" },
                    { text: "Spring Boot", link: "springboot/", icon: "simple-icons:springboot" },
                    { text: "Spring Cloud", link: "springcloud/", icon: "clarity:data-cluster-solid" },
                ]
            },
            {
                text: "数据库",
                icon: "mdi:sql-query",
                prefix: "/database/",
                children: [
                    { text: "MySQL", link: "mysql/", icon: "simple-icons:mysql" },
                    { text: "Redis", link: "redis/", icon: "cib:redis" },
                    { text: "MongoDB", link: "mongodb/", icon: "teenyicons:mongodb-solid" },
                    { text: "ElaticSearch", link: "elaticsearch/", icon: "mingcute:search-fill" },
                ],
            },
            {
                text: "前端系列",
                icon: "akar-icons:html-fill",
                prefix: "/front-end/",
                children: [
                    {
                        icon: "carbon:logo-vue",
                        text: "Vue3",
                        link: "vue3/",
                    },

                ],
            },

            {
                text: "开发工具",
                prefix: "/dev-tools/",
                icon: "fluent:window-dev-tools-16-filled",
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
                    {
                        text: "Homebrew",
                        link: "homebrew",
                        icon: "simple-icons:homebrew",
                    },
                ]
            },
            {
                text: "开发思想",
                prefix: "/dev-idea/",
                children: [
                    {
                        text: "设计模式",
                        link: "design-patterns/",
                        icon: "mdi:design",
                    },
                ]
            },
        ]
    },
    {
        text: "面试宝典",
        icon: "icon-park-solid:tips",
        children: []
    },
    {
        text: "计算机基础",
        prefix: "computer-basic/",
        icon: "mingcute:computer-fill",
        children: [
            {
                text: "数据结构",
                link: "datastruct/",
                icon: "cryptocurrency:data",
            }, {
                text: "计算机网络",
                link: "computer-network/",
                icon: "ph:network-bold",
            }, {
                text: "操作系统",
                link: "operating-system/",
                icon: "icon-park-solid:coordinate-system",
            },
            {
                text: "计算机组成原理",
                link: "computer-composition/",
                icon: "el:cog",
            }]
    },

    {
        text: "项目实战",
        icon: "ph:planet-bold",
        link: "project/",
    },
    // {
    //     text: "知识星球",
    //     icon: "ph:planet-bold",
    //     link: "planet/",
    // },

    // {
    //     text: "关于",
    //     icon: "fa-solid:user-friends",
    //     prefix: "/about/",
    //     children: [
    //         {
    //             text: "网站更新",
    //             link: "update/"
    //         },
    //         {
    //             text: "作者相关",
    //             link: "author/",
    //         },
    //         {
    //             text: "心路历程",
    //             link: "journey/",
    //         },
    //     ]
    // }
]);
