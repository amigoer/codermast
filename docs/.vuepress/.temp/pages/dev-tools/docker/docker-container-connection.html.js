export const data = JSON.parse("{\"key\":\"v-51da8368\",\"path\":\"/dev-tools/docker/docker-container-connection.html\",\"title\":\"Docker - 容器互联\",\"lang\":\"zh-CN\",\"frontmatter\":{\"order\":7,\"description\":\"Docker - 容器互联 在上一个章节中我们学习了 Docker 容器的端口映射，可以将 Docker 容器和本地以及网络中的端口进行连接起来。 但端口映射并不是唯一把 Docker 连接到另一个容器的方法，Docker 有一个连接系统允许将多个容器连接在一起，共享连接信息。 容器命名 在创建一个容器的时候，Docker 会自动为其进行命名，也可以使用 --name 来自定义 Docker 容器的名称。 创建时自定义名称 docker run -d -P --name codermast training/webapp python app.py\"},\"headers\":[{\"level\":2,\"title\":\"容器命名\",\"slug\":\"容器命名\",\"link\":\"#容器命名\",\"children\":[]},{\"level\":2,\"title\":\"创建网络\",\"slug\":\"创建网络\",\"link\":\"#创建网络\",\"children\":[]},{\"level\":2,\"title\":\"连接容器\",\"slug\":\"连接容器\",\"link\":\"#连接容器\",\"children\":[]}],\"readingTime\":{\"minutes\":1.46,\"words\":439},\"filePathRelative\":\"dev-tools/docker/docker-container-connection.md\",\"excerpt\":\"<h1> Docker - 容器互联</h1>\\n<p>在上一个章节中我们学习了 Docker 容器的端口映射，可以将 Docker 容器和本地以及网络中的端口进行连接起来。</p>\\n<p>但端口映射并不是唯一把 Docker 连接到另一个容器的方法，Docker 有一个连接系统允许将多个容器连接在一起，共享连接信息。</p>\\n<h2> 容器命名</h2>\\n<p>在创建一个容器的时候，Docker 会自动为其进行命名，也可以使用 <code>--name</code> 来自定义 Docker 容器的名称。</p>\\n<ul>\\n<li>创建时自定义名称</li>\\n</ul>\\n<div class=\\\"language-bash line-numbers-mode\\\" data-ext=\\\"sh\\\"><pre class=\\\"language-bash\\\"><code><span class=\\\"token function\\\">docker</span> run <span class=\\\"token parameter variable\\\">-d</span> <span class=\\\"token parameter variable\\\">-P</span> <span class=\\\"token parameter variable\\\">--name</span> codermast training/webapp python app.py\\n</code></pre><div class=\\\"line-numbers\\\" aria-hidden=\\\"true\\\"><div class=\\\"line-number\\\"></div></div></div>\",\"autoDesc\":true}")

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
