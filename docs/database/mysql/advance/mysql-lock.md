---
order : 8
---
# 锁
## 介绍

锁是计算机协调多个进程或线程并发访问某一资源的机制。在数据库中，除了传统的计算机资源(CPU、RAM、I/O)的争用以外，数据也是一种供许多用户共享的资源。如何保证数据并发访问的一致性、有效性是所有数据库必须解决的一个问题，锁冲突也是影响数据库并发访问性能的一个重要因素。从这个角度来说，锁对数据库而言显得尤其重要，也更加复杂。

## 全局锁

### 介绍

全局锁就是对整个数据库实例加锁，加锁后整个实例就处于只读状态，后续的DML的写语句，DDL语句，已经更新操作的事务提交语句都将被阻塞。

其典型的使用场景是做全库的逻辑备份，对所有的表进行锁定，从而获取一致性视图，保证数据的完整性。

### 一致性数据备份

1. 加锁
```sql
flush tables with read lock;
```
2. 备份
```shell
mysqldump -uroot -p1234 tb_user > tb_user.sql;
```
> 注意：这并不是一条SQL语句！
3. 解锁
```sql
unlock tables;
```

### 特点

数据库中加全局锁，是一个比较重的操作，存在以下问题：

1. 如果在主库上备份，那么在备份期间都不能执行更新，业务基本上就完全停止。
2. 如果在从库上备份，那么在备份期间从库不能执行主库同步过来的二进制日志（binlog），会导致主从延迟。

在InnoDB引擎中，我们可以在备份时加上参数 `--single-transaction`参数来完成不加锁的一致性数据备份。

```shell
mysaldump --single-transaction -uroot -p1234 tb_user > tb_user.sql
```

## 表级锁

### 介绍

表级锁，每次操作锁住整张表。锁定力度大，发生锁冲突的概率最高，并发度最低。应用在MyISAM、InnoDB、BDB等存储引擎中。

对于表级锁，主要分为以下三种类型：

1. 表锁
2. 元数据锁（meta data lock，MDL）
3. 意向锁

### 表锁

- 分类
对于表锁，又可以分为两类：
1. 表共享读锁（read lock）
2. 表独占写锁（write lock）

- 语法
1. 加锁：
```sql
lock tables 表名 ... read/write
```
2. 释放锁
```sql
unlock tables / 客户端断开连接
```

::: tip 注意
读锁不会阻塞其他客户端的读，但是会阻塞写。写锁既会阻塞其他客户端的读，又会阻塞其他客户端的读。
:::
### 元数据锁

MDL加锁过程是系统自动控制，无需显示使用，在访问一张表的时候会自动加上。MDL锁主要作用是维护元数据的数据一致性，在表上有活动事务的时候，不可以对元数据进行写入操作。为了避免DML与DDL冲突，保证读写的正确性。

在MySQL5.5中引入了MDL，当对一张表进行增删改查的时候，加MDL读锁(共享)；当对表结构进行变更操作的时候，加MDL写锁（排他）。

|对应SQL|锁类型|说明|
|:---:|:---:|:---:|
|lock table xxx read / write|SHARED_READ_ONLY / SHARED_NO_READ_WRITE||
|select 、 select ... lock in share mode |SHARED_READ|与SHARED_READ、SHARED_WRITE兼容，与EXCLUSIVE|
|insert 、 update 、delete 、 select ... for update|SHARED_WRITE|与SHARED_READ、SHARED_WRITE兼容，与EXCLUSIVE|
|alter table ...|EXCLUSIVE|与其他的MDL都互斥|

查看元数据锁：

```sql
select object_type,object_schema,object_name,lock_type,lock_duration from performance_schema.metadate_locks;
```

### 意向锁

为了避免DML在执行时，加的行锁与表锁的冲突，在InnoDB中引入了意向锁，使得表锁不用检查每行数据是否加锁，使用意向锁来减少表锁的检查。

1. 意向共享锁（IS）：
```sql
select ... lock in share mode ```
与表锁共享锁 read 兼容，与表锁排他锁 write 互斥。

2. 意向排他锁（IX）：
```sql
insert、update、delete、select ... for update
```

与表锁共享锁 read 及排他锁 write 都互斥。意向锁之间不会互斥。

通过以下SQL，查看意向锁及行锁的加锁情况。
```sql
select object_schema,object_name,index_name,lock_type,lock_mode,lock_data from performance_schema.data_locks;
```
## 行级锁