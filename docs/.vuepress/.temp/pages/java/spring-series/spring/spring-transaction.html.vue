<template><div><h1 id="spring-事务" tabindex="-1"><a class="header-anchor" href="#spring-事务" aria-hidden="true">#</a> Spring - 事务</h1>
<h2 id="jdbctemplate" tabindex="-1"><a class="header-anchor" href="#jdbctemplate" aria-hidden="true">#</a> JdbcTemplate</h2>
<p>Spring 框架对 JDBC 进行封装，使用 JdbcTemplate 方便实现对数据库操作</p>
<h3 id="准备工作" tabindex="-1"><a class="header-anchor" href="#准备工作" aria-hidden="true">#</a> 准备工作</h3>
<p><strong>①搭建子模块</strong></p>
<p>搭建子模块：spring6-transaction</p>
<p><strong>②加入依赖</strong></p>
<div class="language-xml line-numbers-mode" data-ext="xml"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencies</span><span class="token punctuation">></span></span>
    <span class="token comment">&lt;!--spring jdbc  Spring 持久化层支持jar包--></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-jdbc<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>6.0.2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token comment">&lt;!-- MySQL驱动 --></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>mysql<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>mysql-connector-java<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>8.0.33<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token comment">&lt;!-- 数据源 --></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.alibaba<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>druid<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>1.2.15<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencies</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>③创建jdbc.properties</strong></p>
<div class="language-properties line-numbers-mode" data-ext="properties"><pre v-pre class="language-properties"><code><span class="token key attr-name">jdbc.user</span><span class="token punctuation">=</span><span class="token value attr-value">codermast</span>
<span class="token key attr-name">jdbc.password</span><span class="token punctuation">=</span><span class="token value attr-value">123456</span>
<span class="token key attr-name">jdbc.url</span><span class="token punctuation">=</span><span class="token value attr-value">jdbc:mysql://localhost:3306/spring?characterEncoding=utf8&amp;useSSL=false</span>
<span class="token key attr-name">jdbc.driver</span><span class="token punctuation">=</span><span class="token value attr-value">com.mysql.cj.jdbc.Driver</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里 user 就是数据库账号，password 就是数据库密码，spring 就是数据库名。根据自己实际的信息修改即可。</p>
<p><strong>④配置Spring的配置文件</strong></p>
<p>beans.xml</p>
<div class="language-xml line-numbers-mode" data-ext="xml"><pre v-pre class="language-xml"><code><span class="token prolog">&lt;?xml version="1.0" encoding="UTF-8"?></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>beans</span> <span class="token attr-name">xmlns</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://www.springframework.org/schema/beans<span class="token punctuation">"</span></span>
       <span class="token attr-name"><span class="token namespace">xmlns:</span>xsi</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://www.w3.org/2001/XMLSchema-instance<span class="token punctuation">"</span></span>
       <span class="token attr-name"><span class="token namespace">xmlns:</span>context</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://www.springframework.org/schema/context<span class="token punctuation">"</span></span>
       <span class="token attr-name"><span class="token namespace">xsi:</span>schemaLocation</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans.xsd
       http://www.springframework.org/schema/context
       http://www.springframework.org/schema/context/spring-context.xsd<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>

    <span class="token comment">&lt;!-- 导入外部属性文件 --></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">context:</span>property-placeholder</span> <span class="token attr-name">location</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>classpath:jdbc.properties<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>

    <span class="token comment">&lt;!-- 配置数据源 --></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>druidDataSource<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>com.alibaba.druid.pool.DruidDataSource<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>url<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>${jdbc.url}<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>driverClassName<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>${jdbc.driver}<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>username<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>${jdbc.user}<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>password<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>${jdbc.password}<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>bean</span><span class="token punctuation">></span></span>

    <span class="token comment">&lt;!-- 配置 JdbcTemplate --></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>jdbcTemplate<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>org.springframework.jdbc.core.JdbcTemplate<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token comment">&lt;!-- 装配数据源 --></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>dataSource<span class="token punctuation">"</span></span> <span class="token attr-name">ref</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>druidDataSource<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>bean</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>beans</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>⑤准备数据库与测试表</strong></p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token keyword">DATABASE</span> <span class="token identifier"><span class="token punctuation">`</span>spring<span class="token punctuation">`</span></span><span class="token punctuation">;</span>

<span class="token keyword">use</span> <span class="token identifier"><span class="token punctuation">`</span>spring<span class="token punctuation">`</span></span><span class="token punctuation">;</span>

<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> <span class="token identifier"><span class="token punctuation">`</span>t_emp<span class="token punctuation">`</span></span> <span class="token punctuation">(</span>
  <span class="token identifier"><span class="token punctuation">`</span>id<span class="token punctuation">`</span></span> <span class="token keyword">int</span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">AUTO_INCREMENT</span><span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">`</span>name<span class="token punctuation">`</span></span> <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span> <span class="token keyword">DEFAULT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'姓名'</span><span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">`</span>age<span class="token punctuation">`</span></span> <span class="token keyword">int</span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">)</span> <span class="token keyword">DEFAULT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'年龄'</span><span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">`</span>sex<span class="token punctuation">`</span></span> <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span> <span class="token keyword">DEFAULT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'性别'</span><span class="token punctuation">,</span>
  <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span> <span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">`</span>id<span class="token punctuation">`</span></span><span class="token punctuation">)</span>
<span class="token punctuation">)</span> <span class="token keyword">ENGINE</span><span class="token operator">=</span><span class="token keyword">InnoDB</span> <span class="token keyword">DEFAULT</span> <span class="token keyword">CHARSET</span><span class="token operator">=</span>utf8mb4<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="实现curd" tabindex="-1"><a class="header-anchor" href="#实现curd" aria-hidden="true">#</a> 实现CURD</h3>
<p>①装配 JdbcTemplate</p>
<p><strong>创建测试类，整合JUnit，注入JdbcTemplate</strong></p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>codermast<span class="token punctuation">.</span>spring6</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>beans<span class="token punctuation">.</span>factory<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Autowired</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>jdbc<span class="token punctuation">.</span>core<span class="token punctuation">.</span></span><span class="token class-name">JdbcTemplate</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>test<span class="token punctuation">.</span>context<span class="token punctuation">.</span>junit<span class="token punctuation">.</span>jupiter<span class="token punctuation">.</span></span><span class="token class-name">SpringJUnitConfig</span></span><span class="token punctuation">;</span>

<span class="token annotation punctuation">@SpringJUnitConfig</span><span class="token punctuation">(</span>locations <span class="token operator">=</span> <span class="token string">"classpath:beans.xml"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">JDBCTemplateTest</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">JdbcTemplate</span> jdbcTemplate<span class="token punctuation">;</span>
    
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>②测试增删改功能</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token comment">//测试增删改功能</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">testUpdate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">//添加功能</span>
	<span class="token class-name">String</span> sql <span class="token operator">=</span> <span class="token string">"insert into t_emp values(null,?,?,?)"</span><span class="token punctuation">;</span>
	<span class="token keyword">int</span> result <span class="token operator">=</span> jdbcTemplate<span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span>sql<span class="token punctuation">,</span> <span class="token string">"张三"</span><span class="token punctuation">,</span> <span class="token number">23</span><span class="token punctuation">,</span> <span class="token string">"男"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    <span class="token comment">//修改功能</span>
	<span class="token comment">//String sql = "update t_emp set name=? where id=?";</span>
    <span class="token comment">//int result = jdbcTemplate.update(sql, "codermast", 1);</span>

    <span class="token comment">//删除功能</span>
	<span class="token comment">//String sql = "delete from t_emp where id=?";</span>
	<span class="token comment">//int result = jdbcTemplate.update(sql, 1);</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>③查询数据返回对象</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Emp</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token class-name">Integer</span> id<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">Integer</span> age<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> sex<span class="token punctuation">;</span>

    <span class="token comment">//生成get和set方法</span>
    <span class="token comment">//......</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">"Emp{"</span> <span class="token operator">+</span>
                <span class="token string">"id="</span> <span class="token operator">+</span> id <span class="token operator">+</span>
                <span class="token string">", name='"</span> <span class="token operator">+</span> name <span class="token operator">+</span> <span class="token char">'\''</span> <span class="token operator">+</span>
                <span class="token string">", age="</span> <span class="token operator">+</span> age <span class="token operator">+</span>
                <span class="token string">", sex='"</span> <span class="token operator">+</span> sex <span class="token operator">+</span> <span class="token char">'\''</span> <span class="token operator">+</span>
                <span class="token char">'}'</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>④查询返回对象</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">testSelectObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">//写法一</span>
<span class="token comment">//        String sql = "select * from t_emp where id=?";</span>
<span class="token comment">//        Emp empResult = jdbcTemplate.queryForObject(sql,</span>
<span class="token comment">//                (rs, rowNum) -> {</span>
<span class="token comment">//                    Emp emp = new Emp();</span>
<span class="token comment">//                    emp.setId(rs.getInt("id"));</span>
<span class="token comment">//                    emp.setName(rs.getString("name"));</span>
<span class="token comment">//                    emp.setAge(rs.getInt("age"));</span>
<span class="token comment">//                    emp.setSex(rs.getString("sex"));</span>
<span class="token comment">//                    return emp;</span>
<span class="token comment">//                }, 1);</span>
<span class="token comment">//        System.out.println(empResult);</span>

    <span class="token comment">//写法二</span>
    <span class="token class-name">String</span> sql <span class="token operator">=</span> <span class="token string">"select * from t_emp where id=?"</span><span class="token punctuation">;</span>
    <span class="token class-name">Emp</span> emp <span class="token operator">=</span> jdbcTemplate<span class="token punctuation">.</span><span class="token function">queryForObject</span><span class="token punctuation">(</span>sql<span class="token punctuation">,</span>
                  <span class="token keyword">new</span> <span class="token class-name">BeanPropertyRowMapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token class-name">Emp</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>emp<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>⑤查询数据返回list集合</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token comment">//查询多条数据为一个list集合</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">testSelectList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token class-name">String</span> sql <span class="token operator">=</span> <span class="token string">"select * from t_emp"</span><span class="token punctuation">;</span>
    <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Emp</span><span class="token punctuation">></span></span> list <span class="token operator">=</span> jdbcTemplate<span class="token punctuation">.</span><span class="token function">query</span><span class="token punctuation">(</span>sql<span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">BeanPropertyRowMapper</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token class-name">Emp</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>list<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>⑥查询返回单个的值</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Test</span>
<span class="token comment">//查询单行单列的值</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">selectCount</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token class-name">String</span> sql <span class="token operator">=</span> <span class="token string">"select count(id) from t_emp"</span><span class="token punctuation">;</span>
    <span class="token class-name">Integer</span> count <span class="token operator">=</span> jdbcTemplate<span class="token punctuation">.</span><span class="token function">queryForObject</span><span class="token punctuation">(</span>sql<span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>count<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="@source/assets/spring-transaction/2024-01-02-09-12-47.png" alt="测试结果" tabindex="0" loading="lazy"><figcaption>测试结果</figcaption></figure>
<h2 id="事务概念" tabindex="-1"><a class="header-anchor" href="#事务概念" aria-hidden="true">#</a> 事务概念</h2>
<h3 id="事务基本概念" tabindex="-1"><a class="header-anchor" href="#事务基本概念" aria-hidden="true">#</a> 事务基本概念</h3>
<p>①什么是事务</p>
<p>数据库事务( transaction)是访问并可能操作各种数据项的一个数据库操作序列，这些操作要么全部执行,要么全部不执行，是一个不可分割的工作单位。事务由事务开始与事务结束之间执行的全部数据库操作组成。</p>
<p>②事务的特性</p>
<p><strong>A：原子性(Atomicity)</strong></p>
<p>一个事务(transaction)中的所有操作，要么全部完成，要么全部不完成，不会结束在中间某个环节。事务在执行过程中发生错误，会被回滚（Rollback）到事务开始前的状态，就像这个事务从来没有执行过一样。</p>
<p><strong>C：一致性(Consistency)</strong></p>
<p>事务的一致性指的是在一个事务执行之前和执行之后数据库都必须处于一致性状态。</p>
<p>如果事务成功地完成，那么系统中所有变化将正确地应用，系统处于有效状态。</p>
<p>如果在事务中出现错误，那么系统中的所有变化将自动地回滚，系统返回到原始状态。</p>
<p><strong>I：隔离性(Isolation)</strong></p>
<p>指的是在并发环境中，当不同的事务同时操纵相同的数据时，每个事务都有各自的完整数据空间。由并发事务所做的修改必须与任何其他并发事务所做的修改隔离。事务查看数据更新时，数据所处的状态要么是另一事务修改它之前的状态，要么是另一事务修改它之后的状态，事务不会查看到中间状态的数据。</p>
<p><strong>D：持久性(Durability)</strong></p>
<p>指的是只要事务成功结束，它对数据库所做的更新就必须保存下来。即使发生系统崩溃，重新启动数据库系统后，数据库还能恢复到事务成功结束时的状态。</p>
<h3 id="编程式事务" tabindex="-1"><a class="header-anchor" href="#编程式事务" aria-hidden="true">#</a> 编程式事务</h3>
<p>事务功能的相关操作全部通过自己编写代码来实现：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token class-name">Connection</span> conn <span class="token operator">=</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">;</span>
    
<span class="token keyword">try</span> <span class="token punctuation">{</span>
    
    <span class="token comment">// 开启事务：关闭事务的自动提交</span>
    conn<span class="token punctuation">.</span><span class="token function">setAutoCommit</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    <span class="token comment">// 核心操作</span>
    
    <span class="token comment">// 提交事务</span>
    conn<span class="token punctuation">.</span><span class="token function">commit</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    
<span class="token punctuation">}</span><span class="token keyword">catch</span><span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span><span class="token punctuation">{</span>
    
    <span class="token comment">// 回滚事务</span>
    conn<span class="token punctuation">.</span><span class="token function">rollBack</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    
<span class="token punctuation">}</span><span class="token keyword">finally</span><span class="token punctuation">{</span>
    
    <span class="token comment">// 释放数据库连接</span>
    conn<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编程式的实现方式存在缺陷：</p>
<ul>
<li>细节没有被屏蔽：具体操作过程中，所有细节都需要程序员自己来完成，比较繁琐。</li>
<li>代码复用性不高：如果没有有效抽取出来，每次实现功能都需要自己编写代码，代码就没有得到复用。</li>
</ul>
<h3 id="声明式事务" tabindex="-1"><a class="header-anchor" href="#声明式事务" aria-hidden="true">#</a> 声明式事务</h3>
<p>既然事务控制的代码有规律可循，代码的结构基本是确定的，所以框架就可以将固定模式的代码抽取出来，进行相关的封装。</p>
<p>封装起来后，我们只需要在配置文件中进行简单的配置即可完成操作。</p>
<ul>
<li>好处1：提高开发效率</li>
<li>好处2：消除了冗余的代码</li>
<li>好处3：框架会综合考虑相关领域中在实际开发环境下有可能遇到的各种问题，进行了健壮性、性能等各个方面的优化</li>
</ul>
<p>所以，我们可以总结下面两个概念：</p>
<ul>
<li><strong>编程式</strong>：<strong>自己写代码</strong>实现功能</li>
<li><strong>声明式</strong>：通过<strong>配置</strong>让<strong>框架</strong>实现功能</li>
</ul>
<h2 id="基于注解的声明式事务" tabindex="-1"><a class="header-anchor" href="#基于注解的声明式事务" aria-hidden="true">#</a> 基于注解的声明式事务</h2>
<h3 id="准备工作-1" tabindex="-1"><a class="header-anchor" href="#准备工作-1" aria-hidden="true">#</a> 准备工作</h3>
<p><strong>①添加配置</strong></p>
<p>在<code v-pre>beans.xml</code>添加配置</p>
<div class="language-xml line-numbers-mode" data-ext="xml"><pre v-pre class="language-xml"><code><span class="token comment">&lt;!--扫描组件--></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">context:</span>component-scan</span> <span class="token attr-name">base-package</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>com.codermast.spring6<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>②创建表</strong></p>
<div class="language-sql line-numbers-mode" data-ext="sql"><pre v-pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> <span class="token identifier"><span class="token punctuation">`</span>t_book<span class="token punctuation">`</span></span> <span class="token punctuation">(</span>
  <span class="token identifier"><span class="token punctuation">`</span>book_id<span class="token punctuation">`</span></span> <span class="token keyword">int</span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">AUTO_INCREMENT</span> <span class="token keyword">COMMENT</span> <span class="token string">'主键'</span><span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">`</span>book_name<span class="token punctuation">`</span></span> <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span> <span class="token keyword">DEFAULT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'图书名称'</span><span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">`</span>price<span class="token punctuation">`</span></span> <span class="token keyword">int</span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">)</span> <span class="token keyword">DEFAULT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'价格'</span><span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">`</span>stock<span class="token punctuation">`</span></span> <span class="token keyword">int</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span> <span class="token keyword">unsigned</span> <span class="token keyword">DEFAULT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'库存（无符号）'</span><span class="token punctuation">,</span>
  <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span> <span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">`</span>book_id<span class="token punctuation">`</span></span><span class="token punctuation">)</span>
<span class="token punctuation">)</span> <span class="token keyword">ENGINE</span><span class="token operator">=</span><span class="token keyword">InnoDB</span> <span class="token keyword">AUTO_INCREMENT</span><span class="token operator">=</span><span class="token number">3</span> <span class="token keyword">DEFAULT</span> <span class="token keyword">CHARSET</span><span class="token operator">=</span>utf8<span class="token punctuation">;</span>
<span class="token keyword">insert</span>  <span class="token keyword">into</span> <span class="token identifier"><span class="token punctuation">`</span>t_book<span class="token punctuation">`</span></span><span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">`</span>book_id<span class="token punctuation">`</span></span><span class="token punctuation">,</span><span class="token identifier"><span class="token punctuation">`</span>book_name<span class="token punctuation">`</span></span><span class="token punctuation">,</span><span class="token identifier"><span class="token punctuation">`</span>price<span class="token punctuation">`</span></span><span class="token punctuation">,</span><span class="token identifier"><span class="token punctuation">`</span>stock<span class="token punctuation">`</span></span><span class="token punctuation">)</span> <span class="token keyword">values</span> <span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token string">'斗破苍穹'</span><span class="token punctuation">,</span><span class="token number">80</span><span class="token punctuation">,</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token string">'斗罗大陆'</span><span class="token punctuation">,</span><span class="token number">50</span><span class="token punctuation">,</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> <span class="token identifier"><span class="token punctuation">`</span>t_user<span class="token punctuation">`</span></span> <span class="token punctuation">(</span>
  <span class="token identifier"><span class="token punctuation">`</span>user_id<span class="token punctuation">`</span></span> <span class="token keyword">int</span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">AUTO_INCREMENT</span> <span class="token keyword">COMMENT</span> <span class="token string">'主键'</span><span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">`</span>username<span class="token punctuation">`</span></span> <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span> <span class="token keyword">DEFAULT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'用户名'</span><span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">`</span>balance<span class="token punctuation">`</span></span> <span class="token keyword">int</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span> <span class="token keyword">unsigned</span> <span class="token keyword">DEFAULT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'余额（无符号）'</span><span class="token punctuation">,</span>
  <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span> <span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">`</span>user_id<span class="token punctuation">`</span></span><span class="token punctuation">)</span>
<span class="token punctuation">)</span> <span class="token keyword">ENGINE</span><span class="token operator">=</span><span class="token keyword">InnoDB</span> <span class="token keyword">AUTO_INCREMENT</span><span class="token operator">=</span><span class="token number">2</span> <span class="token keyword">DEFAULT</span> <span class="token keyword">CHARSET</span><span class="token operator">=</span>utf8<span class="token punctuation">;</span>
<span class="token keyword">insert</span>  <span class="token keyword">into</span> <span class="token identifier"><span class="token punctuation">`</span>t_user<span class="token punctuation">`</span></span><span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">`</span>user_id<span class="token punctuation">`</span></span><span class="token punctuation">,</span><span class="token identifier"><span class="token punctuation">`</span>username<span class="token punctuation">`</span></span><span class="token punctuation">,</span><span class="token identifier"><span class="token punctuation">`</span>balance<span class="token punctuation">`</span></span><span class="token punctuation">)</span> <span class="token keyword">values</span> <span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token string">'admin'</span><span class="token punctuation">,</span><span class="token number">50</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>③创建组件</strong></p>
<p>创建BookController</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Controller</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">BookController</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">BookService</span> bookService<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">buyBook</span><span class="token punctuation">(</span><span class="token class-name">Integer</span> bookId<span class="token punctuation">,</span> <span class="token class-name">Integer</span> userId<span class="token punctuation">)</span><span class="token punctuation">{</span>
        bookService<span class="token punctuation">.</span><span class="token function">buyBook</span><span class="token punctuation">(</span>bookId<span class="token punctuation">,</span> userId<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建接口BookService：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">BookService</span> <span class="token punctuation">{</span>
    <span class="token keyword">void</span> <span class="token function">buyBook</span><span class="token punctuation">(</span><span class="token class-name">Integer</span> bookId<span class="token punctuation">,</span> <span class="token class-name">Integer</span> userId<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建实现类BookServiceImpl：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Service</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">BookServiceImpl</span> <span class="token keyword">implements</span> <span class="token class-name">BookService</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">BookDao</span> bookDao<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">buyBook</span><span class="token punctuation">(</span><span class="token class-name">Integer</span> bookId<span class="token punctuation">,</span> <span class="token class-name">Integer</span> userId<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//查询图书的价格</span>
        <span class="token class-name">Integer</span> price <span class="token operator">=</span> bookDao<span class="token punctuation">.</span><span class="token function">getPriceByBookId</span><span class="token punctuation">(</span>bookId<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//更新图书的库存</span>
        bookDao<span class="token punctuation">.</span><span class="token function">updateStock</span><span class="token punctuation">(</span>bookId<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//更新用户的余额</span>
        bookDao<span class="token punctuation">.</span><span class="token function">updateBalance</span><span class="token punctuation">(</span>userId<span class="token punctuation">,</span> price<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建接口BookDao：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">BookDao</span> <span class="token punctuation">{</span>
    <span class="token class-name">Integer</span> <span class="token function">getPriceByBookId</span><span class="token punctuation">(</span><span class="token class-name">Integer</span> bookId<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">void</span> <span class="token function">updateStock</span><span class="token punctuation">(</span><span class="token class-name">Integer</span> bookId<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">void</span> <span class="token function">updateBalance</span><span class="token punctuation">(</span><span class="token class-name">Integer</span> userId<span class="token punctuation">,</span> <span class="token class-name">Integer</span> price<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建实现类BookDaoImpl：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Repository</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">BookDaoImpl</span> <span class="token keyword">implements</span> <span class="token class-name">BookDao</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">JdbcTemplate</span> jdbcTemplate<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">Integer</span> <span class="token function">getPriceByBookId</span><span class="token punctuation">(</span><span class="token class-name">Integer</span> bookId<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> sql <span class="token operator">=</span> <span class="token string">"select price from t_book where book_id = ?"</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> jdbcTemplate<span class="token punctuation">.</span><span class="token function">queryForObject</span><span class="token punctuation">(</span>sql<span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> bookId<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">updateStock</span><span class="token punctuation">(</span><span class="token class-name">Integer</span> bookId<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> sql <span class="token operator">=</span> <span class="token string">"update t_book set stock = stock - 1 where book_id = ?"</span><span class="token punctuation">;</span>
        jdbcTemplate<span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span>sql<span class="token punctuation">,</span> bookId<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">updateBalance</span><span class="token punctuation">(</span><span class="token class-name">Integer</span> userId<span class="token punctuation">,</span> <span class="token class-name">Integer</span> price<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> sql <span class="token operator">=</span> <span class="token string">"update t_user set balance = balance - ? where user_id = ?"</span><span class="token punctuation">;</span>
        jdbcTemplate<span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span>sql<span class="token punctuation">,</span> price<span class="token punctuation">,</span> userId<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="测试无事务情况" tabindex="-1"><a class="header-anchor" href="#测试无事务情况" aria-hidden="true">#</a> 测试无事务情况</h3>
<p><strong>①创建测试类</strong></p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@SpringJUnitConfig</span><span class="token punctuation">(</span>locations <span class="token operator">=</span> <span class="token string">"classpath:beans.xml"</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TxByAnnotationTest</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">BookController</span> bookController<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">testBuyBook</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        bookController<span class="token punctuation">.</span><span class="token function">buyBook</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>②模拟场景</strong></p>
<p>用户购买图书，先查询图书的价格，再更新图书的库存和用户的余额</p>
<p>假设用户id为1的用户，购买id为1的图书</p>
<p>用户余额为50，而图书价格为80</p>
<p>购买图书之后，用户的余额为-30，数据库中余额字段设置了无符号，因此无法将-30插入到余额字段</p>
<p>此时执行sql语句会抛出SQLException</p>
<p><strong>③观察结果</strong></p>
<p>因为没有添加事务，图书的库存更新了，但是用户的余额没有更新</p>
<p>显然这样的结果是错误的，购买图书是一个完整的功能，更新库存和更新余额要么都成功要么都失败</p>
<figure><img src="@source/assets/spring-transaction/2024-01-02-09-17-11.png" alt="余额不足" tabindex="0" loading="lazy"><figcaption>余额不足</figcaption></figure>
<figure><img src="@source/assets/spring-transaction/2024-01-02-09-17-39.png" alt="余额充足" tabindex="0" loading="lazy"><figcaption>余额充足</figcaption></figure>
<h3 id="加入事务" tabindex="-1"><a class="header-anchor" href="#加入事务" aria-hidden="true">#</a> 加入事务</h3>
<p>①添加事务配置</p>
<p>在spring配置文件中引入tx命名空间</p>
<div class="language-xml line-numbers-mode" data-ext="xml"><pre v-pre class="language-xml"><code><span class="token prolog">&lt;?xml version="1.0" encoding="UTF-8"?></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>beans</span> <span class="token attr-name">xmlns</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://www.springframework.org/schema/beans<span class="token punctuation">"</span></span>
       <span class="token attr-name"><span class="token namespace">xmlns:</span>xsi</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://www.w3.org/2001/XMLSchema-instance<span class="token punctuation">"</span></span>
       <span class="token attr-name"><span class="token namespace">xmlns:</span>context</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://www.springframework.org/schema/context<span class="token punctuation">"</span></span>
       <span class="token attr-name"><span class="token namespace">xmlns:</span>tx</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://www.springframework.org/schema/tx<span class="token punctuation">"</span></span>
       <span class="token attr-name"><span class="token namespace">xsi:</span>schemaLocation</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans.xsd
       http://www.springframework.org/schema/context
       http://www.springframework.org/schema/context/spring-context.xsd
       http://www.springframework.org/schema/tx
       http://www.springframework.org/schema/tx/spring-tx.xsd<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在Spring的配置文件中添加配置：</p>
<div class="language-xml line-numbers-mode" data-ext="xml"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>bean</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>transactionManager<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>org.springframework.jdbc.datasource.DataSourceTransactionManager<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>property</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>dataSource<span class="token punctuation">"</span></span> <span class="token attr-name">ref</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>druidDataSource<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>property</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>bean</span><span class="token punctuation">></span></span>

<span class="token comment">&lt;!--
    开启事务的注解驱动
    通过注解@Transactional所标识的方法或标识的类中所有的方法，都会被事务管理器管理事务
--></span>
<span class="token comment">&lt;!-- transaction-manager属性的默认值是transactionManager，如果事务管理器bean的id正好就是这个默认值，则可以省略这个属性 --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">tx:</span>annotation-driven</span> <span class="token attr-name">transaction-manager</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>transactionManager<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>②添加事务注解</p>
<p>因为service层表示业务逻辑层，一个方法表示一个完成的功能，因此处理事务一般在service层处理</p>
<p><strong>在BookServiceImpl的buybook()添加注解@Transactional</strong></p>
<p>③观察结果</p>
<p>由于使用了Spring的声明式事务，更新库存和更新余额都没有执行</p>
<h3 id="transactional注解标识的位置" tabindex="-1"><a class="header-anchor" href="#transactional注解标识的位置" aria-hidden="true">#</a> @Transactional注解标识的位置</h3>
<p>@Transactional标识在方法上，则只会影响该方法</p>
<p>@Transactional标识的类上，则会影响类中所有的方法</p>
<h3 id="事务属性-只读" tabindex="-1"><a class="header-anchor" href="#事务属性-只读" aria-hidden="true">#</a> 事务属性：只读</h3>
<p><strong>①介绍</strong></p>
<p>对一个查询操作来说，如果我们把它设置成只读，就能够明确告诉数据库，这个操作不涉及写操作。这样数据库就能够针对查询操作来进行优化。</p>
<p><strong>②使用方式</strong></p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Transactional</span><span class="token punctuation">(</span>readOnly <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">buyBook</span><span class="token punctuation">(</span><span class="token class-name">Integer</span> bookId<span class="token punctuation">,</span> <span class="token class-name">Integer</span> userId<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">//查询图书的价格</span>
    <span class="token class-name">Integer</span> price <span class="token operator">=</span> bookDao<span class="token punctuation">.</span><span class="token function">getPriceByBookId</span><span class="token punctuation">(</span>bookId<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//更新图书的库存</span>
    bookDao<span class="token punctuation">.</span><span class="token function">updateStock</span><span class="token punctuation">(</span>bookId<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//更新用户的余额</span>
    bookDao<span class="token punctuation">.</span><span class="token function">updateBalance</span><span class="token punctuation">(</span>userId<span class="token punctuation">,</span> price<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//System.out.println(1/0);</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>③注意</strong></p>
<p>对增删改操作设置只读会抛出下面异常：</p>
<p>Caused by: java.sql.SQLException: Connection is read-only. Queries leading to data modification are not allowed</p>
<figure><img src="@source/assets/spring-transaction/2024-01-02-09-23-05.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>
<h3 id="事务属性-超时" tabindex="-1"><a class="header-anchor" href="#事务属性-超时" aria-hidden="true">#</a> 事务属性：超时</h3>
<p><strong>①介绍</strong></p>
<p>事务在执行过程中，有可能因为遇到某些问题，导致程序卡住，从而长时间占用数据库资源。而长时间占用资源，大概率是因为程序运行出现了问题（可能是Java程序或MySQL数据库或网络连接等等）。此时这个很可能出问题的程序应该被回滚，撤销它已做的操作，事务结束，把资源让出来，让其他正常程序可以执行。</p>
<p>概括来说就是一句话：超时回滚，释放资源。</p>
<p><strong>②使用方式</strong></p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token comment">//超时时间单位秒</span>
<span class="token annotation punctuation">@Transactional</span><span class="token punctuation">(</span>timeout <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">buyBook</span><span class="token punctuation">(</span><span class="token class-name">Integer</span> bookId<span class="token punctuation">,</span> <span class="token class-name">Integer</span> userId<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">SECONDS</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">//查询图书的价格</span>
    <span class="token class-name">Integer</span> price <span class="token operator">=</span> bookDao<span class="token punctuation">.</span><span class="token function">getPriceByBookId</span><span class="token punctuation">(</span>bookId<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//更新图书的库存</span>
    bookDao<span class="token punctuation">.</span><span class="token function">updateStock</span><span class="token punctuation">(</span>bookId<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//更新用户的余额</span>
    bookDao<span class="token punctuation">.</span><span class="token function">updateBalance</span><span class="token punctuation">(</span>userId<span class="token punctuation">,</span> price<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//System.out.println(1/0);</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>③观察结果</strong></p>
<p>执行过程中抛出异常：</p>
<p>org.springframework.transaction.<strong>TransactionTimedOutException</strong>: Transaction timed out: deadline was Fri Jun 04 16:25:39 CST 2022</p>
<figure><img src="@source/assets/spring-transaction/2024-01-02-09-25-13.png" alt="异常信息" tabindex="0" loading="lazy"><figcaption>异常信息</figcaption></figure>
<h3 id="事务属性-回滚策略" tabindex="-1"><a class="header-anchor" href="#事务属性-回滚策略" aria-hidden="true">#</a> 事务属性：回滚策略</h3>
<p><strong>①介绍</strong></p>
<p>声明式事务默认只针对运行时异常回滚，编译时异常不回滚。</p>
<p>可以通过@Transactional中相关属性设置回滚策略</p>
<ul>
<li>
<p>rollbackFor属性：需要设置一个Class类型的对象</p>
</li>
<li>
<p>rollbackForClassName属性：需要设置一个字符串类型的全类名</p>
</li>
<li>
<p>noRollbackFor属性：需要设置一个Class类型的对象</p>
</li>
<li>
<p>rollbackFor属性：需要设置一个字符串类型的全类名</p>
</li>
</ul>
<p><strong>②使用方式</strong></p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Transactional</span><span class="token punctuation">(</span>noRollbackFor <span class="token operator">=</span> <span class="token class-name">ArithmeticException</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token comment">//@Transactional(noRollbackForClassName = "java.lang.ArithmeticException")</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">buyBook</span><span class="token punctuation">(</span><span class="token class-name">Integer</span> bookId<span class="token punctuation">,</span> <span class="token class-name">Integer</span> userId<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">//查询图书的价格</span>
    <span class="token class-name">Integer</span> price <span class="token operator">=</span> bookDao<span class="token punctuation">.</span><span class="token function">getPriceByBookId</span><span class="token punctuation">(</span>bookId<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//更新图书的库存</span>
    bookDao<span class="token punctuation">.</span><span class="token function">updateStock</span><span class="token punctuation">(</span>bookId<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">//更新用户的余额</span>
    bookDao<span class="token punctuation">.</span><span class="token function">updateBalance</span><span class="token punctuation">(</span>userId<span class="token punctuation">,</span> price<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token operator">/</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>③观察结果</strong></p>
<p>虽然购买图书功能中出现了数学运算异常（ArithmeticException），但是我们设置的回滚策略是，当出现ArithmeticException不发生回滚，因此购买图书的操作正常执行</p>
<figure><img src="@source/assets/spring-transaction/2024-01-02-09-26-12.png" alt="异常回滚" tabindex="0" loading="lazy"><figcaption>异常回滚</figcaption></figure>
<h3 id="事务属性-隔离级别" tabindex="-1"><a class="header-anchor" href="#事务属性-隔离级别" aria-hidden="true">#</a> 事务属性：隔离级别</h3>
<p><strong>①介绍</strong></p>
<p>数据库系统必须具有隔离并发运行各个事务的能力，使它们不会相互影响，避免各种并发问题。一个事务与其他事务隔离的程度称为隔离级别。SQL标准中规定了多种事务隔离级别，不同隔离级别对应不同的干扰程度，隔离级别越高，数据一致性就越好，但并发性越弱。</p>
<p>隔离级别一共有四种：</p>
<ul>
<li>
<p>读未提交：READ UNCOMMITTED</p>
<p>允许Transaction01读取Transaction02未提交的修改。</p>
</li>
<li>
<p>读已提交：READ COMMITTED、</p>
<p>要求Transaction01只能读取Transaction02已提交的修改。</p>
</li>
<li>
<p>可重复读：REPEATABLE READ</p>
<p>确保Transaction01可以多次从一个字段中读取到相同的值，即Transaction01执行期间禁止其它事务对这个字段进行更新。</p>
</li>
<li>
<p>串行化：SERIALIZABLE</p>
<p>确保Transaction01可以多次从一个表中读取到相同的行，在Transaction01执行期间，禁止其它事务对这个表进行添加、更新、删除操作。可以避免任何并发问题，但性能十分低下。</p>
</li>
</ul>
<p>各个隔离级别解决并发问题的能力见下表：</p>
<table>
<thead>
<tr>
<th>隔离级别</th>
<th>脏读</th>
<th>不可重复读</th>
<th>幻读</th>
</tr>
</thead>
<tbody>
<tr>
<td>READ UNCOMMITTED</td>
<td>有</td>
<td>有</td>
<td>有</td>
</tr>
<tr>
<td>READ COMMITTED</td>
<td>无</td>
<td>有</td>
<td>有</td>
</tr>
<tr>
<td>REPEATABLE READ</td>
<td>无</td>
<td>无</td>
<td>有</td>
</tr>
<tr>
<td>SERIALIZABLE</td>
<td>无</td>
<td>无</td>
<td>无</td>
</tr>
</tbody>
</table>
<p>各种数据库产品对事务隔离级别的支持程度：</p>
<table>
<thead>
<tr>
<th>隔离级别</th>
<th>Oracle</th>
<th>MySQL</th>
</tr>
</thead>
<tbody>
<tr>
<td>READ UNCOMMITTED</td>
<td>×</td>
<td>√</td>
</tr>
<tr>
<td>READ COMMITTED</td>
<td>√(默认)</td>
<td>√</td>
</tr>
<tr>
<td>REPEATABLE READ</td>
<td>×</td>
<td>√(默认)</td>
</tr>
<tr>
<td>SERIALIZABLE</td>
<td>√</td>
<td>√</td>
</tr>
</tbody>
</table>
<p><strong>②使用方式</strong></p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Transactional</span><span class="token punctuation">(</span>isolation <span class="token operator">=</span> <span class="token class-name">Isolation</span><span class="token punctuation">.</span><span class="token constant">DEFAULT</span><span class="token punctuation">)</span><span class="token comment">//使用数据库默认的隔离级别</span>
<span class="token annotation punctuation">@Transactional</span><span class="token punctuation">(</span>isolation <span class="token operator">=</span> <span class="token class-name">Isolation</span><span class="token punctuation">.</span><span class="token constant">READ_UNCOMMITTED</span><span class="token punctuation">)</span><span class="token comment">//读未提交</span>
<span class="token annotation punctuation">@Transactional</span><span class="token punctuation">(</span>isolation <span class="token operator">=</span> <span class="token class-name">Isolation</span><span class="token punctuation">.</span><span class="token constant">READ_COMMITTED</span><span class="token punctuation">)</span><span class="token comment">//读已提交</span>
<span class="token annotation punctuation">@Transactional</span><span class="token punctuation">(</span>isolation <span class="token operator">=</span> <span class="token class-name">Isolation</span><span class="token punctuation">.</span><span class="token constant">REPEATABLE_READ</span><span class="token punctuation">)</span><span class="token comment">//可重复读</span>
<span class="token annotation punctuation">@Transactional</span><span class="token punctuation">(</span>isolation <span class="token operator">=</span> <span class="token class-name">Isolation</span><span class="token punctuation">.</span><span class="token constant">SERIALIZABLE</span><span class="token punctuation">)</span><span class="token comment">//串行化</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="事务属性-传播行为" tabindex="-1"><a class="header-anchor" href="#事务属性-传播行为" aria-hidden="true">#</a> 事务属性：传播行为</h3>
<p><strong>①介绍</strong></p>
<p>什么是事务的传播行为？</p>
<p>在service类中有a()方法和b()方法，a()方法上有事务，b()方法上也有事务，当a()方法执行过程中调用了b()方法，事务是如何传递的？合并到一个事务里？还是开启一个新的事务？这就是事务传播行为。</p>
<p>一共有七种传播行为：</p>
<ul>
<li>REQUIRED：支持当前事务，如果不存在就新建一个(默认)<strong>【没有就新建，有就加入】</strong></li>
<li>SUPPORTS：支持当前事务，如果当前没有事务，就以非事务方式执行**【有就加入，没有就不管了】**</li>
<li>MANDATORY：必须运行在一个事务中，如果当前没有事务正在发生，将抛出一个异常**【有就加入，没有就抛异常】**</li>
<li>REQUIRES_NEW：开启一个新的事务，如果一个事务已经存在，则将这个存在的事务挂起**【不管有没有，直接开启一个新事务，开启的新事务和之前的事务不存在嵌套关系，之前事务被挂起】**</li>
<li>NOT_SUPPORTED：以非事务方式运行，如果有事务存在，挂起当前事务**【不支持事务，存在就挂起】**</li>
<li>NEVER：以非事务方式运行，如果有事务存在，抛出异常**【不支持事务，存在就抛异常】**</li>
<li>NESTED：如果当前正有一个事务在进行中，则该方法应当运行在一个嵌套式事务中。被嵌套的事务可以独立于外层事务进行提交或回滚。如果外层事务不存在，行为就像REQUIRED一样。<strong>【有事务的话，就在这个事务里再嵌套一个完全独立的事务，嵌套的事务可以独立的提交和回滚。没有事务就和REQUIRED一样。】</strong></li>
</ul>
<p><strong>②测试</strong></p>
<p>创建接口CheckoutService</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">CheckoutService</span> <span class="token punctuation">{</span>
    <span class="token keyword">void</span> <span class="token function">checkout</span><span class="token punctuation">(</span><span class="token class-name">Integer</span><span class="token punctuation">[</span><span class="token punctuation">]</span> bookIds<span class="token punctuation">,</span> <span class="token class-name">Integer</span> userId<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建实现类CheckoutServiceImpl</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Service</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CheckoutServiceImpl</span> <span class="token keyword">implements</span> <span class="token class-name">CheckoutService</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">BookService</span> bookService<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token annotation punctuation">@Transactional</span>
    <span class="token comment">//一次购买多本图书</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">checkout</span><span class="token punctuation">(</span><span class="token class-name">Integer</span><span class="token punctuation">[</span><span class="token punctuation">]</span> bookIds<span class="token punctuation">,</span> <span class="token class-name">Integer</span> userId<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Integer</span> bookId <span class="token operator">:</span> bookIds<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            bookService<span class="token punctuation">.</span><span class="token function">buyBook</span><span class="token punctuation">(</span>bookId<span class="token punctuation">,</span> userId<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在BookController中添加方法：</p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Autowired</span>
<span class="token keyword">private</span> <span class="token class-name">CheckoutService</span> checkoutService<span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">checkout</span><span class="token punctuation">(</span><span class="token class-name">Integer</span><span class="token punctuation">[</span><span class="token punctuation">]</span> bookIds<span class="token punctuation">,</span> <span class="token class-name">Integer</span> userId<span class="token punctuation">)</span><span class="token punctuation">{</span>
    checkoutService<span class="token punctuation">.</span><span class="token function">checkout</span><span class="token punctuation">(</span>bookIds<span class="token punctuation">,</span> userId<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在数据库中将用户的余额修改为100元</p>
<p><strong>③观察结果</strong></p>
<p>可以通过@Transactional中的propagation属性设置事务传播行为</p>
<p>修改BookServiceImpl中buyBook()上，注解@Transactional的propagation属性</p>
<p>@Transactional(propagation = Propagation.REQUIRED)，默认情况，表示如果当前线程上有已经开启的事务可用，那么就在这个事务中运行。经过观察，购买图书的方法buyBook()在checkout()中被调用，checkout()上有事务注解，因此在此事务中执行。所购买的两本图书的价格为80和50，而用户的余额为100，因此在购买第二本图书时余额不足失败，导致整个checkout()回滚，即只要有一本书买不了，就都买不了</p>
<p>@Transactional(propagation = Propagation.REQUIRES_NEW)，表示不管当前线程上是否有已经开启的事务，都要开启新事务。同样的场景，每次购买图书都是在buyBook()的事务中执行，因此第一本图书购买成功，事务结束，第二本图书购买失败，只在第二次的buyBook()中回滚，购买第一本图书不受影响，即能买几本就买几本。</p>
<h3 id="全注解配置事务" tabindex="-1"><a class="header-anchor" href="#全注解配置事务" aria-hidden="true">#</a> 全注解配置事务</h3>
<p><strong>①添加配置类</strong></p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>alibaba<span class="token punctuation">.</span>druid<span class="token punctuation">.</span>pool<span class="token punctuation">.</span></span><span class="token class-name">DruidDataSource</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>context<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Bean</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>context<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">ComponentScan</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>context<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Configuration</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>jdbc<span class="token punctuation">.</span>core<span class="token punctuation">.</span></span><span class="token class-name">JdbcTemplate</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>jdbc<span class="token punctuation">.</span>datasource<span class="token punctuation">.</span></span><span class="token class-name">DataSourceTransactionManager</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>transaction<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">EnableTransactionManagement</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">javax<span class="token punctuation">.</span>sql<span class="token punctuation">.</span></span><span class="token class-name">DataSource</span></span><span class="token punctuation">;</span>

<span class="token annotation punctuation">@Configuration</span>
<span class="token annotation punctuation">@ComponentScan</span><span class="token punctuation">(</span><span class="token string">"com.codermast.spring6"</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@EnableTransactionManagement</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SpringConfig</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">DataSource</span> <span class="token function">getDataSource</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">DruidDataSource</span> dataSource <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DruidDataSource</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        dataSource<span class="token punctuation">.</span><span class="token function">setDriverClassName</span><span class="token punctuation">(</span><span class="token string">"com.mysql.cj.jdbc.Driver"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        dataSource<span class="token punctuation">.</span><span class="token function">setUrl</span><span class="token punctuation">(</span><span class="token string">"jdbc:mysql://localhost:3306/spring?characterEncoding=utf8&amp;useSSL=false"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        dataSource<span class="token punctuation">.</span><span class="token function">setUsername</span><span class="token punctuation">(</span><span class="token string">"codermast"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        dataSource<span class="token punctuation">.</span><span class="token function">setPassword</span><span class="token punctuation">(</span><span class="token string">"123456"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> dataSource<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Bean</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">"jdbcTemplate"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">JdbcTemplate</span> <span class="token function">getJdbcTemplate</span><span class="token punctuation">(</span><span class="token class-name">DataSource</span> dataSource<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">JdbcTemplate</span> jdbcTemplate <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">JdbcTemplate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        jdbcTemplate<span class="token punctuation">.</span><span class="token function">setDataSource</span><span class="token punctuation">(</span>dataSource<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> jdbcTemplate<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">DataSourceTransactionManager</span> <span class="token function">getDataSourceTransactionManager</span><span class="token punctuation">(</span><span class="token class-name">DataSource</span> dataSource<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">DataSourceTransactionManager</span> dataSourceTransactionManager <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DataSourceTransactionManager</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        dataSourceTransactionManager<span class="token punctuation">.</span><span class="token function">setDataSource</span><span class="token punctuation">(</span>dataSource<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> dataSourceTransactionManager<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>②测试</strong></p>
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>codermast<span class="token punctuation">.</span>spring6<span class="token punctuation">.</span>config<span class="token punctuation">.</span></span><span class="token class-name">SpringConfig</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>codermast<span class="token punctuation">.</span>spring6<span class="token punctuation">.</span>controller<span class="token punctuation">.</span></span><span class="token class-name">BookController</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>junit<span class="token punctuation">.</span>jupiter<span class="token punctuation">.</span>api<span class="token punctuation">.</span></span><span class="token class-name">Test</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>beans<span class="token punctuation">.</span>factory<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Autowired</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>context<span class="token punctuation">.</span></span><span class="token class-name">ApplicationContext</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>context<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">AnnotationConfigApplicationContext</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>test<span class="token punctuation">.</span>context<span class="token punctuation">.</span>junit<span class="token punctuation">.</span>jupiter<span class="token punctuation">.</span></span><span class="token class-name">SpringJUnitConfig</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TxByAllAnnotationTest</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">testTxAllAnnotation</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token class-name">ApplicationContext</span> applicationContext <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">AnnotationConfigApplicationContext</span><span class="token punctuation">(</span><span class="token class-name">SpringConfig</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">BookController</span> accountService <span class="token operator">=</span> applicationContext<span class="token punctuation">.</span><span class="token function">getBean</span><span class="token punctuation">(</span><span class="token string">"bookController"</span><span class="token punctuation">,</span> <span class="token class-name">BookController</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        accountService<span class="token punctuation">.</span><span class="token function">buyBook</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="基于xml的声明式事务" tabindex="-1"><a class="header-anchor" href="#基于xml的声明式事务" aria-hidden="true">#</a> 基于XML的声明式事务</h2>
<h3 id="场景模拟" tabindex="-1"><a class="header-anchor" href="#场景模拟" aria-hidden="true">#</a> 场景模拟</h3>
<p>参考基于注解的声明式事务</p>
<h3 id="修改spring配置文件" tabindex="-1"><a class="header-anchor" href="#修改spring配置文件" aria-hidden="true">#</a> 修改Spring配置文件</h3>
<p>将Spring配置文件中去掉tx:annotation-driven 标签，并添加配置：</p>
<div class="language-xml line-numbers-mode" data-ext="xml"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">aop:</span>config</span><span class="token punctuation">></span></span>
    <span class="token comment">&lt;!-- 配置事务通知和切入点表达式 --></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">aop:</span>advisor</span> <span class="token attr-name">advice-ref</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>txAdvice<span class="token punctuation">"</span></span> <span class="token attr-name">pointcut</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>execution(* com.codermast.spring.tx.xml.service.impl.*.*(..))<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token namespace">aop:</span>advisor</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token namespace">aop:</span>config</span><span class="token punctuation">></span></span>
<span class="token comment">&lt;!-- tx:advice标签：配置事务通知 --></span>
<span class="token comment">&lt;!-- id属性：给事务通知标签设置唯一标识，便于引用 --></span>
<span class="token comment">&lt;!-- transaction-manager属性：关联事务管理器 --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">tx:</span>advice</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>txAdvice<span class="token punctuation">"</span></span> <span class="token attr-name">transaction-manager</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>transactionManager<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">tx:</span>attributes</span><span class="token punctuation">></span></span>
        <span class="token comment">&lt;!-- tx:method标签：配置具体的事务方法 --></span>
        <span class="token comment">&lt;!-- name属性：指定方法名，可以使用星号代表多个字符 --></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">tx:</span>method</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>get*<span class="token punctuation">"</span></span> <span class="token attr-name">read-only</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>true<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">tx:</span>method</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>query*<span class="token punctuation">"</span></span> <span class="token attr-name">read-only</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>true<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">tx:</span>method</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>find*<span class="token punctuation">"</span></span> <span class="token attr-name">read-only</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>true<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
    
        <span class="token comment">&lt;!-- read-only属性：设置只读属性 --></span>
        <span class="token comment">&lt;!-- rollback-for属性：设置回滚的异常 --></span>
        <span class="token comment">&lt;!-- no-rollback-for属性：设置不回滚的异常 --></span>
        <span class="token comment">&lt;!-- isolation属性：设置事务的隔离级别 --></span>
        <span class="token comment">&lt;!-- timeout属性：设置事务的超时属性 --></span>
        <span class="token comment">&lt;!-- propagation属性：设置事务的传播行为 --></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">tx:</span>method</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>save*<span class="token punctuation">"</span></span> <span class="token attr-name">read-only</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>false<span class="token punctuation">"</span></span> <span class="token attr-name">rollback-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>java.lang.Exception<span class="token punctuation">"</span></span> <span class="token attr-name">propagation</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>REQUIRES_NEW<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">tx:</span>method</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>update*<span class="token punctuation">"</span></span> <span class="token attr-name">read-only</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>false<span class="token punctuation">"</span></span> <span class="token attr-name">rollback-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>java.lang.Exception<span class="token punctuation">"</span></span> <span class="token attr-name">propagation</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>REQUIRES_NEW<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token namespace">tx:</span>method</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>delete*<span class="token punctuation">"</span></span> <span class="token attr-name">read-only</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>false<span class="token punctuation">"</span></span> <span class="token attr-name">rollback-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>java.lang.Exception<span class="token punctuation">"</span></span> <span class="token attr-name">propagation</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>REQUIRES_NEW<span class="token punctuation">"</span></span><span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token namespace">tx:</span>attributes</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token namespace">tx:</span>advice</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>注意：基于xml实现的声明式事务，必须引入aspectJ的依赖</p>
<div class="language-xml line-numbers-mode" data-ext="xml"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-aspects<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>6.0.2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></blockquote>
</div></template>


