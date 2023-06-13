export const data = JSON.parse("{\"key\":\"v-446027a3\",\"path\":\"/database/mysql/advance/innodb-engine.html\",\"title\":\"MySQL进阶 - InnoDB存储引擎\",\"lang\":\"zh-CN\",\"frontmatter\":{\"order\":19,\"description\":\"MySQL进阶 - InnoDB存储引擎 逻辑存储结构 InnoDB引擎的存储结构主要包含5个部分： 表空间Tablespace 主要是MySQL中的ibd文件，一个MySQL实例可以对应多个表空间，用于存储记录、索引等数据。表空间用来管理多个Segment段。 段Segment 段分为数据段(Leaf node segment)、索引段(Non-leaf node segment)、回滚段(Rollback segment)，InnoDB是索引组织表，数据段就是B+树的叶子结点，索引段即为B+树的非叶子结点。段用来管理多个Extent区。\"},\"headers\":[{\"level\":2,\"title\":\"逻辑存储结构\",\"slug\":\"逻辑存储结构\",\"link\":\"#逻辑存储结构\",\"children\":[]},{\"level\":2,\"title\":\"架构\",\"slug\":\"架构\",\"link\":\"#架构\",\"children\":[{\"level\":3,\"title\":\"内存结构\",\"slug\":\"内存结构\",\"link\":\"#内存结构\",\"children\":[]},{\"level\":3,\"title\":\"磁盘结构\",\"slug\":\"磁盘结构\",\"link\":\"#磁盘结构\",\"children\":[]},{\"level\":3,\"title\":\"后台线程\",\"slug\":\"后台线程\",\"link\":\"#后台线程\",\"children\":[]}]},{\"level\":2,\"title\":\"事务原理\",\"slug\":\"事务原理\",\"link\":\"#事务原理\",\"children\":[{\"level\":3,\"title\":\"Redo Log 重做日志\",\"slug\":\"redo-log-重做日志-1\",\"link\":\"#redo-log-重做日志-1\",\"children\":[]},{\"level\":3,\"title\":\"Undo Log\",\"slug\":\"undo-log\",\"link\":\"#undo-log\",\"children\":[]}]}],\"readingTime\":{\"minutes\":8.56,\"words\":2567},\"filePathRelative\":\"database/mysql/advance/innodb-engine.md\",\"excerpt\":\"<h1> MySQL进阶 - InnoDB存储引擎</h1>\\n<h2> 逻辑存储结构</h2>\\n<p>\\nInnoDB引擎的存储结构主要包含5个部分：</p>\\n<ol>\\n<li>表空间Tablespace</li>\\n</ol>\\n<p>主要是MySQL中的ibd文件，一个MySQL实例可以对应多个表空间，用于存储记录、索引等数据。表空间用来管理多个Segment段。</p>\\n<ol start=\\\"2\\\">\\n<li>段Segment</li>\\n</ol>\\n<p>段分为数据段(Leaf node segment)、索引段(Non-leaf node segment)、回滚段(Rollback segment)，InnoDB是索引组织表，数据段就是B+树的叶子结点，索引段即为B+树的非叶子结点。段用来管理多个Extent区。</p>\",\"autoDesc\":true}")

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
