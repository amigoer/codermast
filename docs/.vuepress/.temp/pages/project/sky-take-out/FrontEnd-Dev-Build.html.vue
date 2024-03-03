<template><div><h1 id="前端环境搭建" tabindex="-1"><a class="header-anchor" href="#前端环境搭建" aria-hidden="true">#</a> 前端环境搭建</h1>
<h2 id="windows" tabindex="-1"><a class="header-anchor" href="#windows" aria-hidden="true">#</a> Windows</h2>
<div class="hint-container tip">
<p class="hint-container-title">视频教程</p>
<p><a href="https://www.bilibili.com/video/BV1TP411v7v6/?p=5" target="_blank" rel="noopener noreferrer">https://www.bilibili.com/video/BV1TP411v7v6/?p=5<ExternalLinkIcon/></a></p>
</div>
<h2 id="macos" tabindex="-1"><a class="header-anchor" href="#macos" aria-hidden="true">#</a> MacOs</h2>
<ol>
<li>前端资料下载</li>
</ol>
<div class="hint-container tip">
<p class="hint-container-title">前端资料</p>
<p>下载地址：<a href="https://pan.baidu.com/s/1ga3Cy_CPANj7dTDLFni7mw?pwd=6cyn" target="_blank" rel="noopener noreferrer">https://pan.baidu.com/s/1ga3Cy_CPANj7dTDLFni7mw?pwd=6cyn<ExternalLinkIcon/></a><br>
提取码: 6cyn</p>
</div>
<p>点击上面的前端资料下载链接，即可下载。下载之后解压，解压完成以后的文件如下。</p>
<figure><img src="@source/../assets/FrontEnd-Dev-Build/2024-03-03-12-33-06.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<ol start="2">
<li>安装 Nginx 服务</li>
</ol>
<p>在 MacOs 上安装 Nginx 服务，主要使用 Homebrew 工具进行安装。</p>
<ul>
<li>安装 brew</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>/bin/bash <span class="token parameter variable">-c</span> <span class="token string">"<span class="token variable"><span class="token variable">$(</span><span class="token function">curl</span> <span class="token parameter variable">-fsSL</span> https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh<span class="token variable">)</span></span>"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>使用 brew 安装 nginx</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>brew <span class="token function">install</span> nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="3">
<li>配置 Nginx</li>
</ol>
<ul>
<li>更改 nginx 配置文件</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">vim</span> /usr/local/etc/nginx/nginx.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>将其中的内容删除，然后替换为</p>
<details class="hint-container details"><summary>代码详情</summary>
<div class="language-conf line-numbers-mode" data-ext="conf"><pre v-pre class="language-conf"><code>#user  nobody;
worker_processes  1;

#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       mime.types;
    default_type  application/octet-stream;

    #log_format  main  '$remote_addr - $remote_user [$time_local] &quot;$request&quot; '
    #                  '$status $body_bytes_sent &quot;$http_referer&quot; '
    #                  '&quot;$http_user_agent&quot; &quot;$http_x_forwarded_for&quot;';

    #access_log  logs/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    #keepalive_timeout  0;
    keepalive_timeout  65;

    #gzip  on;
	
	map $http_upgrade $connection_upgrade{
		default upgrade;
		'' close;
	}

	upstream webservers{
	  server 127.0.0.1:8080 weight=90 ;
	  #server 127.0.0.1:8088 weight=10 ;
	}

    server {
        listen       80;
        server_name  localhost;

        location / {
            root   html/sky;
            index  index.html index.htm;
        }

        #error_page  404              /404.html;

        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }

        # 反向代理,处理管理端发送的请求
        location /api/ {
			proxy_pass   http://localhost:8080/admin/;
            #proxy_pass   http://webservers/admin/;
        }
		
		# 反向代理,处理用户端发送的请求
        location /user/ {
            proxy_pass   http://webservers/user/;
        }
		
		# WebSocket
		location /ws/ {
            proxy_pass   http://webservers/ws/;
			proxy_http_version 1.1;
			proxy_read_timeout 3600s;
			proxy_set_header Upgrade $http_upgrade;
			proxy_set_header Connection &quot;$connection_upgrade&quot;;
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>
<ul>
<li>将 sky 文件夹移动至 <code v-pre>/usr/local/var/www</code> 目录下</li>
</ul>
<p>可以使用如下指令打开对应的文件夹，然后拖动即可。</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">open</span> /usr/local/var/www
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="4">
<li>启动 Nginx</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>brew services start nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="5">
<li>访问项目</li>
</ol>
<p>访问 localhost:80 即可，默认为 80 端口，也可以直接访问 localhost</p>
<figure><img src="@source/../assets/readme/2024-03-03-11-41-05.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
</div></template>


