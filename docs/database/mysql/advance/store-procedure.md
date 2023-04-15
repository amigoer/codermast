---
order : 6
---
# 存储过程
## 介绍

存储过程是事先经过编译并且存储在数据库中的一段SQL语句的集合，调用存储过程可以简化应用开发人员的很多工作，减少数据在数据库和应用服务器之间的传输，对于提高数据处理的效率是有好处的。

存储过程思想上很简单，就是数据库SQL语言层面的代码封装与重用。

::: info 个人理解
这里我个人理解的是 类似于 编程语言中的函数，将一些语句封装起来，直接进行函数的调用即可。
:::

特点
- 封装、复用
- 可以接收参数，也可以返回数据
- 减少网络交互，效率提升
## 基本语法
- 创建
```sql
CREATE PROCEDURE 存储过程名称([参数列表])
BEGIN
    -- SQL语句
END;
```
::: danger 注意
在命令行中，执行创建存储过程的SQL时，需要通过关键字delimiter指定SQL语句的结束符。

例如：delimiter $$ ，即定义为 $$ 为结束标识符。

则此时不会以默认的 ; 为结束标识符，而是我们设置的$$，但是存储过程中的SQL语句，还是以 ; 为结束符号。
:::
- 调用
```sql
CALL 名称([参数列表]);
```
- 查看
```sql
-- 查询指定数据库的存储过程及状态信息
SELECT * FROM INFORMATION_SCHEMA_ROUTINES WHERE ROUTINE_SCHEMA = 'xxx'；
-- 查询某个存储过程的定义
SHOW CREATE PROCEDURE 存储过程名称;
```
- 删除
```sql
DROP PROCEDURE [IF EXISTS] 存储过程名称;
```
## 变量

### 系统变量
系统变量是MySQL服务器提供，不是用户定义的，属于服务器层面。分为全面变量(`GLOBAL`)、会话变量(`SESSION`)。

- 查看系统变量
```sql
-- 查看所有系统变量
SHOW [SESSION | GLOBAL] VARIABLES;

-- 可以通过LIKE模糊匹配的方式查找变量
SHOW [SESSION | GLOBAL] VARIABLES LIKE '.....';

-- 查看指定变量的值
SELECT @@[SESSION. | GLOBAL.]系统变量名;
```
- 设置系统变量
```sql
SET [SESSION | GLOBAL] 系统变量名 = 值;
SET @@[SESSION. | GLOBAL.]系统变量名 = 值;
```
::: danger 注意
如果没有指定SESSION | GLOBAL，默认是SESSION，会话变量。

MySQL服务重新启动之后，所设置的全局参数会失效，要想不失效，可以在 `/etc/my.cnf` 中配置。
:::

### 用户自定义变量
用户自定义变量是用户根据需要自己定义的变量，用户变量不用提前声明，在用的时候直接用"@变量名" 使用就可以。其作用域为当前的连接。

- 赋值
```sql
-- 使用SET
SET @var_name = expr[,@var_name = expr]...;
SET @var_name := expr[,@var_name := expr]...;
-- 使用SELECT
SELECT @var_anme := expr [,@var_name := expr]...;
SELECT 字段名 INTO @var_name FROM 表名;
```
::: info 提示
在赋值时我们能看到有两种写法， `=` 和 `:=` 。这两个实际上没有区别，但是在MySQL中，判断相等的运算符是 `=` 而不是 `==` ，这就容易造成混淆，所以推荐使用 `:=`
:::
- 使用
```sql
SELECT @var_name;
```
::: danger 注意
用户定义的变量无需对其进行声明或者初始化，只不过获取到的值为NULL
:::

### 局部变量
局部变量是根据需要定义的在局部生效的变量，访问之前，需要使用`DECLARE`声明，可以作存储过程内的局部变量和输入参数，局部变量的范围是在其内声明的BEGIN......END块。

- 声明
```sql
DECLARE 变量名 变量类型 [DEFAULT ...];
```
变量类型就是数据库字段类型:INT、BIGINT、CHAR、VARCHAR、DATE、TIME等。
- 赋值

```sql
SET 变量名 = 值;
SET 变量名 := 值;
SELECT 字段名 INTO 变量名 FROM 表名 ...;
```
## IF判断
- 语法
```sql
IF 条件1 THEN
    ...
ELSEIF 条件2 THEN   -- 可选
    ...
ELSE               -- 可选
    ...
END IF;
```
## 参数
|类型|含义|备注|
|:---:|:---:|:---:|
|IN|该类参数作为输入，也就是需要调用时传入值|默认|
|OUT|该类参数作为输出，也就是该参数可以作为返回值||
|INOUT|既可以作为输入参数，也可以作为输出参数||

- 用法
```sql
CREATE PROCEDURE 存储过程名称([IN/OUT/INOUT 参数名 参数类型])
BEGIN
    -- SQL语句
END;
```

## case
- 语法1
```sql
CASE case_value
    WHEN when_value1 THEN statement_list1
    [WHEN when_value2 THEN statement_list2]
    [ELSE statement_list]
END CASE;
```
- 语法2
```sql
CASE 
    WHEN search_condition1 THEN statement_list1
    [WHEN search_condition2 THEN statement_list2]
    [ELSE statement_list]
END CASE;
```
## 循环
### WHILE循环
while循环时有条件的循环控制语句。满足条件后，再执行循环体中的SQL语句，具体语法为：
```sql
-- 先判定条件，如果条件为true，则执行逻辑，否则，不执行逻辑
WHILE 条件 DO
    -- SQL逻辑
END WHILE;
```
### REPEAT循环
repeat是有条件的循环控制语句，当满足条件的时候推出循环。具体语法为：

```sql
-- 先执行一次逻辑，然后判定逻辑是否满足，如果满足，则退出。如果不满足，则继续下一次循环。
REPEAT
    SQL逻辑
    UNTIL条件
END REPEAT;
```

::: info 提示
类似于编程语言中的 do ... while() 循环，但是repeat是满足条件则推出和do while刚好相反。
:::
### LOOP循环
Loop实现简单的循环，如果不在SQL逻辑中增加退出循环的条件，可以用其来实现简单的死循环。loop可以配合以下两个语句使用：
- LEAVE : 必须用在循环中，退出循环。
- ITERATE : 必须用在循环中，作用是跳过当前循环剩下的语句，直接进入下一次循环。
```sql
[begin_lable:] LOOP
    SQL逻辑
END LOOP [end_lable];

-- 退出指定标记的循环体
LEAVE lable;

-- 直接进入下一次循环
ITERATE lable;
```
::: info 提示
`leave`和`iterate`相当于编程语言中的 `break`和`continue`关键字的用法。
:::

## 游标

## 条件处理程序

## 存储函数