export const data = JSON.parse("{\"key\":\"v-ff34c30e\",\"path\":\"/database/redis/redis-object.html\",\"title\":\"Redis原理 - RedisObject对象机制\",\"lang\":\"zh-CN\",\"frontmatter\":{\"order\":14,\"description\":\"Redis原理 - RedisObject对象机制 为什么会设计RedisObject 在 Redis 中，我们的操作都是使用指令进行，而这些的命令中，用于对键处理的命令占据一大部分。有些指令只能针对某些特定的类型，而有些指令却能够针对所有的类型。但是要正确实现这些命令，必须为不同类型的键设置不同的处理方式。比如删除一个列表键和删除一个字符串键的操作过程是不一样的，在底层就需要调用不同的视线方式。 集合类型有字典和整数集合两种不同的底层实现方式，而用户在对集合进行操作时，并不想关心具体的底层实现是什么样的，只要 Redis 能根据自己的指令，完成对应的功能即可，比如对元素进行添加、删除等操作，具体的实现底层对用户来说是透明的，不可见的。\"},\"headers\":[{\"level\":2,\"title\":\"为什么会设计RedisObject\",\"slug\":\"为什么会设计redisobject\",\"link\":\"#为什么会设计redisobject\",\"children\":[]},{\"level\":2,\"title\":\"RedisObject\",\"slug\":\"redisobject\",\"link\":\"#redisobject\",\"children\":[]},{\"level\":2,\"title\":\"编码方式\",\"slug\":\"编码方式\",\"link\":\"#编码方式\",\"children\":[]},{\"level\":2,\"title\":\"数据类型\",\"slug\":\"数据类型\",\"link\":\"#数据类型\",\"children\":[]},{\"level\":2,\"title\":\"命令处理\",\"slug\":\"命令处理\",\"link\":\"#命令处理\",\"children\":[]},{\"level\":2,\"title\":\"对象共享\",\"slug\":\"对象共享\",\"link\":\"#对象共享\",\"children\":[]},{\"level\":2,\"title\":\"引用计数器\",\"slug\":\"引用计数器\",\"link\":\"#引用计数器\",\"children\":[]}],\"readingTime\":{\"minutes\":5.87,\"words\":1762},\"filePathRelative\":\"database/redis/redis-object.md\",\"excerpt\":\"<h1> Redis原理 - RedisObject对象机制</h1>\\n<h2> 为什么会设计RedisObject</h2>\\n<p>在 Redis 中，我们的操作都是使用指令进行，而这些的命令中，用于对键处理的命令占据一大部分。有些指令只能针对某些特定的类型，而有些指令却能够针对所有的类型。但是要正确实现这些命令，必须为不同类型的键设置不同的处理方式。比如删除一个列表键和删除一个字符串键的操作过程是不一样的，在底层就需要调用不同的视线方式。</p>\\n<p>集合类型有字典和整数集合两种不同的底层实现方式，而用户在对集合进行操作时，并不想关心具体的底层实现是什么样的，只要 Redis 能根据自己的指令，完成对应的功能即可，比如对元素进行添加、删除等操作，具体的实现底层对用户来说是透明的，不可见的。</p>\",\"autoDesc\":true}")

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
