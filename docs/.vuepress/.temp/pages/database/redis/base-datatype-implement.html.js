export const data = JSON.parse("{\"key\":\"v-350dca32\",\"path\":\"/database/redis/base-datatype-implement.html\",\"title\":\"Redis原理 - 五种数据类型的底层结构关系\",\"lang\":\"zh-CN\",\"frontmatter\":{\"order\":17,\"description\":\"Redis原理 - 五种数据类型的底层结构关系 字符串对象String String 是 Redis 中最常见的数据存储类型。 其基本编码方式是 RAW ，基于简单动态字符串（SDS）实现，存储上限为 512 MB。 如果存储的 SDS 长度小于 44 字节，则会采用 EMBSTR 编码，此时 object head 与 SDS 是一段连续空间。申请内存时只需要调用一次内存分配函数，效率更高。\"},\"headers\":[{\"level\":2,\"title\":\"字符串对象String\",\"slug\":\"字符串对象string\",\"link\":\"#字符串对象string\",\"children\":[]},{\"level\":2,\"title\":\"列表对象List\",\"slug\":\"列表对象list\",\"link\":\"#列表对象list\",\"children\":[]},{\"level\":2,\"title\":\"哈希对象Hash\",\"slug\":\"哈希对象hash\",\"link\":\"#哈希对象hash\",\"children\":[]},{\"level\":2,\"title\":\"集合对象Set\",\"slug\":\"集合对象set\",\"link\":\"#集合对象set\",\"children\":[]},{\"level\":2,\"title\":\"有序集合对象ZSet\",\"slug\":\"有序集合对象zset\",\"link\":\"#有序集合对象zset\",\"children\":[]}],\"readingTime\":{\"minutes\":3.51,\"words\":1054},\"filePathRelative\":\"database/redis/base-datatype-implement.md\",\"excerpt\":\"<h1> Redis原理 - 五种数据类型的底层结构关系</h1>\\n<figure><figcaption></figcaption></figure>\\n<h2> 字符串对象String</h2>\\n<p>String 是 Redis 中最常见的数据存储类型。</p>\\n<ul>\\n<li>其基本编码方式是 RAW ，基于简单动态字符串（SDS）实现，存储上限为 512 MB。</li>\\n</ul>\\n<figure><figcaption></figcaption></figure>\\n<ul>\\n<li>如果存储的 SDS 长度小于 44 字节，则会采用 <strong>EMBSTR</strong> 编码，此时 object head 与 SDS 是一段连续空间。申请内存时只需要调用一次内存分配函数，效率更高。</li>\\n</ul>\",\"autoDesc\":true}")

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
