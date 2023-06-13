export const data = JSON.parse("{\"key\":\"v-2d8772d8\",\"path\":\"/database/redis/redis-stream.html\",\"title\":\"Redis入门 - Redis Stream\",\"lang\":\"zh-CN\",\"frontmatter\":{\"order\":8,\"description\":\"Redis入门 - Redis Stream Redis Stream 是 Redis 5.0 版本新增加的数据结构。 Redis Stream 主要用于消息队列（MQ，Message Queue），Redis 本身是有一个 Redis 发布订阅 (pub/sub) 来实现消息队列的功能，但它有个缺点就是消息无法持久化，如果出现网络断开、Redis 宕机等，消息就会被丢弃。 简单来说发布订阅 (pub/sub) 可以分发消息，但无法记录历史消息。 而 Redis Stream 提供了消息的持久化和主备复制功能，可以让任何客户端访问任何时刻的数据，并且能记住每一个客户端的访问位置，还能保证消息不丢失。\"},\"headers\":[{\"level\":2,\"title\":\"XADD\",\"slug\":\"xadd\",\"link\":\"#xadd\",\"children\":[]},{\"level\":2,\"title\":\"XTRIM\",\"slug\":\"xtrim\",\"link\":\"#xtrim\",\"children\":[]},{\"level\":2,\"title\":\"XDEL\",\"slug\":\"xdel\",\"link\":\"#xdel\",\"children\":[]},{\"level\":2,\"title\":\"XLEN\",\"slug\":\"xlen\",\"link\":\"#xlen\",\"children\":[]},{\"level\":2,\"title\":\"XRANGE\",\"slug\":\"xrange\",\"link\":\"#xrange\",\"children\":[]},{\"level\":2,\"title\":\"XREVRANGE\",\"slug\":\"xrevrange\",\"link\":\"#xrevrange\",\"children\":[]},{\"level\":2,\"title\":\"XREAD\",\"slug\":\"xread\",\"link\":\"#xread\",\"children\":[]},{\"level\":2,\"title\":\"XGROUP CREATE\",\"slug\":\"xgroup-create\",\"link\":\"#xgroup-create\",\"children\":[]},{\"level\":2,\"title\":\"XREADGROUP GROUP\",\"slug\":\"xreadgroup-group\",\"link\":\"#xreadgroup-group\",\"children\":[]}],\"readingTime\":{\"minutes\":3.79,\"words\":1138},\"filePathRelative\":\"database/redis/redis-stream.md\",\"excerpt\":\"<h1> Redis入门 - Redis Stream</h1>\\n<p>Redis Stream 是 Redis 5.0 版本新增加的数据结构。</p>\\n<p>Redis Stream 主要用于消息队列（MQ，Message Queue），Redis 本身是有一个 Redis 发布订阅 (pub/sub) 来实现消息队列的功能，但它有个缺点就是消息无法持久化，如果出现网络断开、Redis 宕机等，消息就会被丢弃。</p>\\n<p>简单来说发布订阅 (pub/sub) 可以分发消息，但无法记录历史消息。</p>\\n<p>而 Redis Stream 提供了消息的持久化和主备复制功能，可以让任何客户端访问任何时刻的数据，并且能记住每一个客户端的访问位置，还能保证消息不丢失。</p>\",\"autoDesc\":true}")

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
