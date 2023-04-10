export const data = JSON.parse("{\"key\":\"v-c124708c\",\"path\":\"/database/mysql/base/multi-table-query.html\",\"title\":\"多表查询\",\"lang\":\"zh-CN\",\"frontmatter\":{\"order\":5,\"description\":\"多表查询 多表关系 提示 在正式学习数据库的多表查询之前，我们需要了解到需要多表查询的场景，以及有哪些多表查询的情况，也就是数据表之间的关系。 一对一 一对一关系是我们比较常见的关系，比如数据表A中的一条值对应数据表B中的一条值，这种情况经常用于多表的拆分。例如将最常用的字段抽取出来，使得提高查询的效率。 实现 在任意一方加入外键，关联另外一方的主键，并且设置唯一约束(UNIQUE)。\"},\"headers\":[{\"level\":2,\"title\":\"多表关系\",\"slug\":\"多表关系\",\"link\":\"#多表关系\",\"children\":[{\"level\":3,\"title\":\"一对一\",\"slug\":\"一对一\",\"link\":\"#一对一\",\"children\":[]},{\"level\":3,\"title\":\"一对多\",\"slug\":\"一对多\",\"link\":\"#一对多\",\"children\":[]},{\"level\":3,\"title\":\"多对多\",\"slug\":\"多对多\",\"link\":\"#多对多\",\"children\":[]}]},{\"level\":2,\"title\":\"多表查询\",\"slug\":\"多表查询-1\",\"link\":\"#多表查询-1\",\"children\":[{\"level\":3,\"title\":\"内连接\",\"slug\":\"内连接\",\"link\":\"#内连接\",\"children\":[]},{\"level\":3,\"title\":\"外连接\",\"slug\":\"外连接\",\"link\":\"#外连接\",\"children\":[]},{\"level\":3,\"title\":\"自连接\",\"slug\":\"自连接\",\"link\":\"#自连接\",\"children\":[]},{\"level\":3,\"title\":\"联合查询\",\"slug\":\"联合查询\",\"link\":\"#联合查询\",\"children\":[]},{\"level\":3,\"title\":\"子查询\",\"slug\":\"子查询\",\"link\":\"#子查询\",\"children\":[]}]}],\"readingTime\":{\"minutes\":4.91,\"words\":1474},\"filePathRelative\":\"database/mysql/base/multi-table-query.md\",\"excerpt\":\"<h1> 多表查询</h1>\\n<h2> 多表关系</h2>\\n<div class=\\\"hint-container tip\\\">\\n<p class=\\\"hint-container-title\\\">提示</p>\\n<p>在正式学习数据库的多表查询之前，我们需要了解到需要多表查询的场景，以及有哪些多表查询的情况，也就是数据表之间的关系。</p>\\n</div>\\n<h3> 一对一</h3>\\n<p>一对一关系是我们比较常见的关系，比如数据表A中的一条值对应数据表B中的一条值，这种情况经常用于多表的拆分。例如将最常用的字段抽取出来，使得提高查询的效率。</p>\\n<div class=\\\"hint-container info\\\">\\n<p class=\\\"hint-container-title\\\">实现</p>\\n<p>在任意一方加入外键，关联另外一方的主键，并且设置唯一约束(UNIQUE)。</p>\\n</div>\",\"autoDesc\":true}")

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
