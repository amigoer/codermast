---
order : 2
---

# MySQL基础 - SQL基础语法
## 通用语法

1. SQL语句可以单行或者多行书写，以分号结尾。
2. SQL语句可以使用空格/缩进符来增强语句的可读性。
3. MySQL数据库的SQL语言不区分大小写，关键字建议使用大写。
4. 注释
::: info 注释
- 单行注释：-- 注释内容 或者 # 注释内容(MySQL特有的语法)
- 多行注释：使用/* 注释内容 */
:::
## SQL分类

- DDL

Data Definition Language 数据定义语言，用来定义数据库对象（数据库、数据表、字段）

- DML

Data Manipulation Language 数据操作语言，用来对数据库表中的数据进行增删改

- DQL

Data Query Language 数据查询语言，用来对数据库中的数据进行查询操作

- DCL

Data Control Language 数据控制语言，用来创建数据库用户、控制数据表的访问权限

## DDL语句

### 数据库操作

- 查询

    1. 查询所有数据库
    ```sql
    SHOW DATABASES;
    ```
    2. 查询当前数据库
    ```sql
    SELECT DATABASE():
    ```
- 创建

```sql
CREATE DATABASE [IF NOT EXISTS] 数据库名 [DEFULT CHARSET 字符集] [COLLATE 排序规则];
```

- 删除

```sql
DROP DATABASE [IF EXISTS] 数据库名;
```
- 使用
```sql
USE 数据库名;
```

### 数据表操作
- 查询

    1. 查询当前数据库的所有表
    ```sql
    SHOW TABLES;
    ```
    2. 查询表结构
    ```sql
    DESC 表名;
    ```
    3. 查询指定表的建表语句
    ```sql
    SHOW CREATE TABLE 表名;
    ```
- 创建
```sql
CREATE TABLE 表名(
    字段1 字段1类型 [COMMENT 字段1注释],
    字段2 字段2类型 [COMMENT 字段2注释],
    字段3 字段3类型 [COMMENT 字段3注释],
    ......
    字段n 字段n类型 [COMMENT 字段n注释]
)[COMMENT 表注释];
```
::: tip 提示
`[]`代表可选参数，并且最后一个字段后没有==逗号==，最后以分号结尾。
:::
- 删除
    1. 删除表
    ```sql
    DROP TABLE [IF EXISTS]表名；
    ```
    2. 删除指定数据表，并且重新创建该表
    ```sql
    TRUNCATE TABLE 表名;
    ```
    ::: info 说明
    删除数据表后，会讲数据表内的所有数据清空。这里的功能可以看作，将数据表内的所有数据全部清空。但是实际上的操作流程是将表删除，然后重新创建。而`DELETE * FROM 表名`语句能够将所有的数据清空，但是例如字段自增的序号和建立的一些索引等是不会被清除的。
    :::
- 修改
    1. 修改表名
    ```sql
    ALTER TABLE 旧表名 RENAME [TO] 新表名;
    ```

    ::: tip 提示
    这里的[TO]是可有可无的，没有也不会对SQL语句造成歧义，影响功能，写上以后会使SQL的可读性更高。
    :::
    2. 修改表字符集
    ```sql
    ALTER TABLE 表名 [DEFAULT] CHARACTER SET 字符集名 [DEFAULT] COLLATE 校对规则名;
    ```
    3. 表内字段修改
    ::: info 说明
    由于对表字段的修改，也可以归纳为字段操作，且其操作较多，就将其全部归纳到字段操作里。即下一小节。
    :::
### 字段操作
1. 添加字段
    ```sql
    ALTER TABLE 表名 ADD 字段名 字段数据类型(长度)[COMMENT 字段注释][约束];
    ```
    2. 删除字段
    ```sql
    ALTER TABLE 表名 DROP 字段名;
    ```
    3. 修改字段
        - 修改数据类型

        ```sql
        ALTER TABlE 表名 MODIFY 字段名 新数据类型(长度);
        ```

        - 修改字段名称和字段类型
        ```sql
        ALTER TABlE 表名 CHANGE 旧字段名 新字段名 数据类型(长度)[COMMENT 字段注释][约束];
        ```

## DML语句

::: tip 说明
理论上讲DML数据操作语言，应该包含增、删、改、查4个部分，但是由于数据查询的操作使用频繁，且种类繁多，我们将其抽取出来，单独作为一个章节，为DQL进行说明，这里就只了解增、删、改这三个操作。
:::

### 添加数据
1. 给指定字段添加数据
```sql
INSERT INTO 表名 (字段1,字段2,...,字段n) VALUES (值1,值2,...,值n);
```
2. 给全部字段添加数据
```sql
INSERT INTO 表名 VALUES (值1,值2,...,值n);
```
3. 批量添加数据
```sql
-- 指定字段添加数据
INSERT INTO 表名 (字段1,字段2,...,字段n) VALUES (值1,值2,...,值n),...,(值1,值2,...,值n);
-- 全部字段添加数据
INSERT INTO 表名 VALUES (值1,值2,...,值n),...,(值1,值2,...,值n);
```

::: danger 注意
- 插入数据时指定的字段顺序需要于值的顺序是一一对应的
- 字符串和日期型数据应该包含在引号之中
- 插入的数据大小，应该在字段数据类型的规定范围以内
:::

### 修改数据
```sql
UPDATE 表名 SET 字段名1  = 值1,字段名2 = 值2,.... [WHERE 条件];
```
::: danger 危险警告
涉及的数据的修改时，需要严格谨慎检查自己的SQL语句，这里修改数据的筛选条件可有可无，但是没有筛选条件时则会修改整张表的所有数据。
:::
### 删除数据

```sql
DELETE FROM 表名 [WHERE 条件];
```
::: danger 危险警告
- 涉及的数据的删除时，和前面的数据修改相同，需要严格谨慎检查自己的SQL语句，这里删除数据的筛选条件可有可无，但是没有筛选条件时则会删除整张表的所有数据。
- DELETE语句只能按行删除数据，不能只删除某一个字段的值，不过可以使用UPDATE语句来进行修改。
:::
## DQL语句

### DQL语法

```sql
SELECT 
    字段列表
FROM
    表名
WHERE
    条件列表
GROUP BY
    分组字段列表
HAVING
    分组后条件列表
ORDER BY
    排序字段列表
LIMIT
    分页参数
```
### 查询类型
- 基本查询
- 条件查询（WHERE）
- 聚合查询（count、max、min、avg、sum）
- 分组查询（GROUP BY）
- 排序查询（ORDER BY）
- 分页查询（LIMIT）

### 基本查询
1. 查询多个字段
```sql
-- 指定字段
SELECT 字段1,字段2,字段3,... FROM 表名;
-- 所有字段
SELECT * FROM 表名;
```
2. 设置别名
```sql
SELECT 字段1 [AS 别名1],字段2 [AS 别名2],... FROM 表名;
```

3. 去除重复记录

```sql
SELECT DISTINCT 字段列表 FROM 表名;
```

### 条件查询
1. 语法

```sql
SELECT 字段列表 FROM 表名 WHERE 条件列表;
```
2. 条件

|运算符|功能|
|:---:|:---:|
|>|大于|
|>=|大于等于|
|<|小于|
|<=|小于等于|
|<>或者!=|不等于|
|BETWEEN...AND...|在某个范围之内,包含临界值|
|IN(...)|在in之后的列表中，多选之|
|LIKE 占位符|模糊匹配(_匹配单个字符，%匹配任意个字符)|
|IS NULL|是否为NULL|
|AND 或者 &&|并且(同时成立)|
|OR 或者 \|\| | 或者(成立任意一个即可)|
|NOT 或者 ! | 非，不是 |

### 聚合查询

#### 聚合函数
1. 介绍
将一列数据作为一个整体，进行纵向计算
2. 常见的聚合函数

|函数|功能|
|:---:|:---:|
|count|统计数量|
|max|最大值|
|min|最小值|
|avg|平均值|
|sum|求和|

3. 语法
```sql
SELECT 聚合函数(字段列表) FROM 表名;
```

::: tip 注意
null值不参与所有聚合函数运算。
:::
### 分组查询
1. 语法
```sql
SELECT 字段列表 FROM 表名 [WHERE 条件列表] GROUP BY 分组字段名 [HAVING 分组后的过滤条件];
```
2. WHERE 和 HAVING 区别
执行时机不同：where是分组之前进行过滤，不符合where条件的不参与分组，而having是在分组之后进行过滤。
判断条件不同：where不能对聚合函数进行判断，而having可以。

::: info 注意
- 执行顺序：where >  聚合函数 > having
- 分组以后，查询的字段一般为聚合函数和分组字段，查询其他字段无任何意义
:::
### 排序查询
1. 语法
```sql
SELECT 字段列表 FROM 表名 ORDER BY 字段1 [排序方式1],字段2 [排序方式2],...;
```

2. 排序方式
- ASC : 升序(默认值)
- DESC : 降序

::: info 提示
如果是多字段排序，只有当第一个字段的值相同时，才会根据第二个字段比较，以此类推。
:::

### 分页查询
1. 语法

```sql
SELECT 字段列表 FROM 表名 LIMIT 起始索引,查询记录数;
```

::: warning 注意
- 起始索引从0开始，起始索引 = (查询的页码 - 1) * 每页显示的记录数
- 分页查询是数据库的方言，不同的数据库拥有不同的语法实现，MySQL中使用的是LIMIT子句实现
- 如果查询的是第一页数据，起始索引可以省略，直接简写为LIMIT 查询记录数，如LIMIT 10。
:::

### 执行顺序

```sql
SELECT  -- 5
    字段列表
FROM    -- 1
    表名
WHERE   -- 2
    条件列表
GROUP BY-- 3
    分组字段列表
HAVING  -- 4
    分组后条件列表
ORDER BY-- 6
    排序字段列表
LIMIT   -- 7
    分页参数
```
## DCL语句

DCL全称为Data Control Language(数据控制语言)，用来管理数据库 用户，控制数据库的访问权限。

### 用户控制
1. 查询用户
```sql
USE mysql;
SELECT * FROM user;
```
2. 创建用户
```sql
CREATE USER '用户名'@'主机名' IDENTIFIED BY ‘密码’;
```

3. 删除用户
```sql
DROP USER ‘'用户名'@'主机名';
```
4. 修改用户

```sql
ALTER USER '用户名'@'主机名' IDENTIFIED WITH mysql_native_password BY ‘新密码’;
```
::: tip 注意
- 在MySQL数据库中，所有的用户信息和用户权限信息都存储于mysql数据库内的表中。
- 主机名可以使用 % 通配。
- 这类SQL开发人员操作的比较少，通常是DBA(Database Adminstrator数据库管理员)使用
:::
### 权限控制
MySQL中定义了很多种权限，但是常用的就以下几种：
|权限|说明|
|:---:|:---:|
|ALL、ALL PRIVILEGES|所有权限|
|SELECT|查询数据权限|
|INSERT|插入数据权限|
|UPDATE|更新数据权限|
|DELETE|删除数据权限|
|ALTER|修改表权限|
|DROP|删除数据库/数据表权限|
|CREATE|创建数据库/数据表权限|
1. 查询权限
```sql
SHOW GRANTS FOR '用户名'@'主机名';
```
2. 授予权限
```sql
GRANT 权限列表 ON 数据库名.表名 TO '用户名'@'主机名';
```
3. 撤销权限
```sql
REVOKE 权限列表 ON 数据库名.表名 FROM '用户名'@'主机名';
```

::: info 提示
- 多个权限之间，使用逗号分隔
- 授权时，数据库名和表名可以使用 * 进行通配，代表所有。
:::