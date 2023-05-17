export const data = JSON.parse("{\"key\":\"v-245b3b2e\",\"path\":\"/database/redis/base/redistemplate-redis-serializer.html\",\"title\":\"Redis客户端 - RedisSerializer\",\"lang\":\"zh-CN\",\"frontmatter\":{\"order\":12,\"description\":\"Redis客户端 - RedisSerializer 前景回顾 在上一篇中，我们实现了一个简单的案例，操作一个 String 类型的数据，插入了一个 name = codermast 的数据到Redis。 使用redis-cli客户端连接对应的Redis服务器后，按道理来讲get name这个指令的返回结果应该是 codermast redis-cli客户端查看\",\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://www.codermast.com/database/redis/base/redistemplate-redis-serializer.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"CoderMast编程学习笔记\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"Redis客户端 - RedisSerializer\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"Redis客户端 - RedisSerializer 前景回顾 在上一篇中，我们实现了一个简单的案例，操作一个 String 类型的数据，插入了一个 name = codermast 的数据到Redis。 使用redis-cli客户端连接对应的Redis服务器后，按道理来讲get name这个指令的返回结果应该是 codermast redis-cli客户端查看\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:author\",\"content\":\"CoderMast\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"Redis客户端 - RedisSerializer\\\",\\\"image\\\":[\\\"\\\"],\\\"dateModified\\\":null,\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"CoderMast\\\",\\\"url\\\":\\\"https://www.codermast.com\\\",\\\"email\\\":\\\"codermast@qq.com\\\"}]}\"]]},\"headers\":[{\"level\":2,\"title\":\"编写一个 RedisConfig 配置类\",\"slug\":\"编写一个-redisconfig-配置类\",\"link\":\"#编写一个-redisconfig-配置类\",\"children\":[]},{\"level\":2,\"title\":\"自定义序列化方式\",\"slug\":\"自定义序列化方式\",\"link\":\"#自定义序列化方式\",\"children\":[]},{\"level\":2,\"title\":\"优化自定义序列化\",\"slug\":\"优化自定义序列化\",\"link\":\"#优化自定义序列化\",\"children\":[]},{\"level\":2,\"title\":\"小结\",\"slug\":\"小结\",\"link\":\"#小结\",\"children\":[]}],\"readingTime\":{\"minutes\":3.46,\"words\":1039},\"filePathRelative\":\"database/redis/base/redistemplate-redis-serializer.md\",\"excerpt\":\"<h1> Redis客户端 - RedisSerializer</h1>\\n<div class=\\\"hint-container note\\\">\\n<p class=\\\"hint-container-title\\\">前景回顾</p>\\n<p>在上一篇中，我们实现了一个简单的案例，操作一个 String 类型的数据，插入了一个 name = codermast 的数据到Redis。</p>\\n</div>\\n<p>使用redis-cli客户端连接对应的Redis服务器后，按道理来讲<code>get name</code>这个指令的返回结果应该是 <code>codermast</code></p>\\n<figure><figcaption>redis-cli客户端查看</figcaption></figure>\",\"autoDesc\":true}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
