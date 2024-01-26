<template><div><h1 id="docker-compose" tabindex="-1"><a class="header-anchor" href="#docker-compose" aria-hidden="true">#</a> Docker - Compose</h1>
<p>在部署应用时，常常使用到不止一个容器，那么在部署容器的时候就需要一个一个进行部署，这样的部署过程也相对来说比较繁琐复杂，也容易出问题，那么有没有一种更为简单的方法呢？</p>
<h2 id="compose简介" tabindex="-1"><a class="header-anchor" href="#compose简介" aria-hidden="true">#</a> Compose简介</h2>
<figure><img src="@source/../assets/docker-compose/2024-01-26-22-29-01.png" alt="" width="200" height="200" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<p>Compose 是用于定义和运行多容器 Docker 应用程序的工具。Docker Compose 通过一个单独的 docker-compose.yml 模板文件（YAML格式）来定义一组相关联的应用容器，帮助我们实现多个相关联的 Docker 容器的快速部署。</p>
<p>Compose 使用的三个步骤：</p>
<ul>
<li>
<p>使用 Dockerfile 定义应用程序的环境。</p>
</li>
<li>
<p>使用 docker-compose.yml 定义构成应用程序的服务，这样它们可以在隔离环境中一起运行。</p>
</li>
<li>
<p>最后，执行 docker-compose up 命令来启动并运行整个应用程序。</p>
</li>
</ul>
<h2 id="compose安装" tabindex="-1"><a class="header-anchor" href="#compose安装" aria-hidden="true">#</a> Compose安装</h2>
<ul>
<li>Linux：执行以下指令即可安装（最新版替换V后面的版本号即可）</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>$ <span class="token function">sudo</span> <span class="token function">curl</span> <span class="token parameter variable">-L</span> <span class="token string">"https://github.com/docker/compose/releases/download/v2.24.3/docker-compose-<span class="token variable"><span class="token variable">$(</span><span class="token function">uname</span> <span class="token parameter variable">-s</span><span class="token variable">)</span></span>-<span class="token variable"><span class="token variable">$(</span><span class="token function">uname</span> <span class="token parameter variable">-m</span><span class="token variable">)</span></span>"</span> <span class="token parameter variable">-o</span> /usr/local/bin/docker-compose
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>
<p>MacOS：Mac 的 Docker 桌面版和 Docker Toolbox 已经包括 Compose 和其他 Docker 应用程序，因此 Mac 用户不需要单独安装 Compose。</p>
</li>
<li>
<p>Windows：Windows 的 Docker 桌面版和 Docker Toolbox 已经包括 Compose 和其他 Docker 应用程序，因此 Windows 用户不需要单独安装 Compose。</p>
</li>
</ul>
<h2 id="compose样例" tabindex="-1"><a class="header-anchor" href="#compose样例" aria-hidden="true">#</a> Compose样例</h2>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">version</span> <span class="token punctuation">:</span> <span class="token string">"3.7"</span>
<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">app</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> node<span class="token punctuation">:</span>18<span class="token punctuation">-</span>alpine
    <span class="token key atrule">command</span><span class="token punctuation">:</span> sh <span class="token punctuation">-</span>c "yarn install <span class="token important">&amp;&amp;</span> yarn run dev"
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> 127.0.0.1<span class="token punctuation">:</span>3000<span class="token punctuation">:</span><span class="token number">3000</span>
    <span class="token key atrule">working_dir</span><span class="token punctuation">:</span> /app
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> ./<span class="token punctuation">:</span>/app
  <span class="token key atrule">web</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">"80:80"</span>
  <span class="token key atrule">db</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> postgres
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token key atrule">POSTGRES_DB</span><span class="token punctuation">:</span> example
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在该样例中我们定义了 3 个服务，app、web 和 db。</p>
<ul>
<li><code v-pre>app</code> 服务使用到了 <code v-pre>node:18-alpine</code> 会执行一条 Shell 指令，并且进行了端口映射，配置了工作目录，配置了卷。</li>
<li><code v-pre>web</code> 服务使用到了 <code v-pre>nginx</code> 镜像，并将容器的 80 端口，映射到宿主机的 80 端口。</li>
<li><code v-pre>db</code> 服务使用了 <code v-pre>postgres</code> 镜像，并设置了一个环境变量。</li>
</ul>
<p>Docker Compose 的配置本质上就是把部署 Docker 容器的过程集中管理起来，方便用户部署和后续维护。核心就是将 Docker 命令转换为 Yaml 文件。</p>
<h2 id="compose基本命令" tabindex="-1"><a class="header-anchor" href="#compose基本命令" aria-hidden="true">#</a> Compose基本命令</h2>
<p>使用Docker-Compose的常见命令包括：</p>
<ul>
<li><code v-pre>docker-compose up</code>：启动并运行整个应用。</li>
<li><code v-pre>docker-compose down</code>：停止并移除容器、网络、卷和镜像。</li>
<li><code v-pre>docker-compose build</code>：构建或重建服务。</li>
<li><code v-pre>docker-compose logs</code>：查看服务的日志输出。<br>
这些命令为 <code v-pre>Docker-Compose</code> 的日常使用提供了基础。</li>
</ul>
<h2 id="compose文件结构" tabindex="-1"><a class="header-anchor" href="#compose文件结构" aria-hidden="true">#</a> Compose文件结构</h2>
<ol>
<li>理解docker-compose.yml</li>
</ol>
<p>docker-compose.yml文件是Docker-Compose项目的核心，它使用YAML格式来描述和配置您的应用服务。这个文件不仅定义了所使用的服务，还包括了这些服务的配置，例如使用的Docker镜像、端口映射、依赖关系、环境变量等。</p>
<ol start="2">
<li>基本组件</li>
</ol>
<ul>
<li>服务（Services）：服务代表一个容器。在docker-compose.yml中，您可以定义一个或多个服务，每个服务可以使用不同的镜像。</li>
<li>网络（Networks）：Docker-Compose允许您定义和使用自己的网络。</li>
<li>卷（Volumes）：卷用于数据持久化和共享数据。您可以定义一个卷，并将其挂载到一个或多个容器中。</li>
</ul>
<ol start="3">
<li>文件示例</li>
</ol>
<p>下面是一个更复杂的docker-compose.yml文件示例，其中包含了网络和卷的定义：</p>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">'3'</span>

<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">web</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">"80:80"</span>
    <span class="token key atrule">networks</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> webnet
  <span class="token key atrule">db</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> postgres
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token key atrule">POSTGRES_DB</span><span class="token punctuation">:</span> example
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> db<span class="token punctuation">-</span>data<span class="token punctuation">:</span>/var/lib/postgresql/data
    <span class="token key atrule">networks</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> webnet

<span class="token key atrule">volumes</span><span class="token punctuation">:</span>
  <span class="token key atrule">db-data</span><span class="token punctuation">:</span>

<span class="token key atrule">networks</span><span class="token punctuation">:</span>
  <span class="token key atrule">webnet</span><span class="token punctuation">:</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个示例中，我们创建了一个名为webnet的网络，并且让web和db服务都连接到这个网络。我们还定义了一个卷db-data用于持久化数据库的数据。</p>
<ol start="4">
<li>配置项解析</li>
</ol>
<ul>
<li>环境变量（Environment）：可以设置环境变量，为服务配置必要的参数。</li>
<li>端口映射（Ports）：将容器内的端口映射到宿主机的端口，以便外部访问。</li>
<li>依赖关系（Depends On）：可以指定服务启动的顺序。</li>
</ul>
<h2 id="compose高级应用" tabindex="-1"><a class="header-anchor" href="#compose高级应用" aria-hidden="true">#</a> Compose高级应用</h2>
<ol>
<li>网络配置</li>
</ol>
<p>在Docker-Compose中，您可以自定义网络来实现服务间的隔离或通信。例如，您可以创建一个只供数据库和后端服务使用的内部网络。以下是一个网络配置的例子：</p>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">'3'</span>
<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">web</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx
    <span class="token key atrule">networks</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> front<span class="token punctuation">-</span>end
  <span class="token key atrule">api</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> my<span class="token punctuation">-</span>api
    <span class="token key atrule">networks</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> front<span class="token punctuation">-</span>end
      <span class="token punctuation">-</span> back<span class="token punctuation">-</span>end
  <span class="token key atrule">db</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> postgres
    <span class="token key atrule">networks</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> back<span class="token punctuation">-</span>end

<span class="token key atrule">networks</span><span class="token punctuation">:</span>
  <span class="token key atrule">front-end</span><span class="token punctuation">:</span>
  <span class="token key atrule">back-end</span><span class="token punctuation">:</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个配置中，web和api服务都连接到front-end网络，而db和api服务则连接到back-end网络。</p>
<ol start="2">
<li>卷挂载和数据持久化<br>
卷用于数据持久化和服务间共享数据。在Docker-Compose中，您可以定义卷并将其挂载到服务所需的位置。例如：</li>
</ol>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">'3'</span>
<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">db</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> postgres
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> db<span class="token punctuation">-</span>data<span class="token punctuation">:</span>/var/lib/postgresql/data

<span class="token key atrule">volumes</span><span class="token punctuation">:</span>
  <span class="token key atrule">db-data</span><span class="token punctuation">:</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，我们定义了一个名为db-data的卷，并将其挂载到数据库服务的数据目录。</p>
<ol start="3">
<li>环境变量和配置文件<br>
Docker-Compose允许您通过环境变量或.env文件来配置服务。这使得您的配置更加灵活，也更适合不同的环境。例如：</li>
</ol>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">'3'</span>
<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">web</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">"${WEB_PORT}:80"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>您可以在.env文件中定义WEB_PORT变量，Docker-Compose会在运行时使用该值。</p>
<ol start="4">
<li>扩展和复用配置</li>
</ol>
<p>通过使用extends关键字，您可以在多个项目中重用配置。这样，您可以为不同的环境（如开发、测试和生产）保持共同的基础配置，同时覆盖特定环境的设置。</p>
<ol start="5">
<li>使用Docker-Compose进行部署</li>
</ol>
<p>虽然Docker-Compose主要用于开发环境，但它也可以用于生产环境的部署。通过适当的配置和环境准备，Docker-Compose可以作为一个简单的部署工具。</p>
</div></template>


