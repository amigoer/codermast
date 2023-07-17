# C语言基础


数据结构学习之前需要掌握的 C 语言基础：

- 基本语法
- 判断语句
- 循环语句
- 结构体
- 指针

## 基本语法

- C 语言的关键字
- 注释
- 变量语法
- 函数

::: note 详情参考
https://www.runoob.com/cprogramming/c-basic-syntax.html
:::

## 判断语句

C 语言提供了以下类型的判断语句。点击链接查看每个语句的细节。

- if 语句

```c
if (exp1) {
    // exp2
}
```
**上述代码的含义为：** exp1 == true 时，执行 exp2 。

- if ... else ... 语句
```c
if (exp1){
    // exp2
}else {
    // exp3
}
```
**上述代码的含义为：** exp1 == true 时，执行 exp2，否则执行exp3。

- 嵌套 if 语句
```c
if (exp1) {
    if (exp2){
        // exp3
    }
}
```
**上述代码的含义为：** exp1 == true 时，并且 exp2 == true，才执行exp3。

- switch 语句

```c
switch (value) {
    case value1:
        exp1;
        break;
    case value2:
        exp2;
        break;
    case value3:
        exp3;
        break;    
    case value4:
        exp4;
        break;
    default :
        exp5;    
}
```
**上述代码的含义为：** value == value1 时，执行 exp1，并退出；value == value2 时，执行 exp2，依次类推，都不是时执行 default 分支，即执行 exp5。

- 嵌套 switch 语句

::: info
类似于 嵌套 if 语句，不做过多赘述。
:::

- 三目运算符

```c
Exp1 ? Exp2 : Exp3;
```
**上述代码的含义为：** exp1 == true 时，则执行 exp2 语句，否则执行 exp3 语句。

::: note 详情参考
https://www.bilibili.com/video/BV1vs411n7TH?p=31&vd_source=321621351b5c8d1d29a51feda1285409
:::

## 循环语句

- for 循环

```c
for (int i = 0; i < 10 ; i ++ ){
   statement(s);
}
```

- while 循环

```c
int i = 0;
while ( i < 10 ) {
    i ++;
    statement(s);
}
```

- do ... while 循环

```c
int i = 0;
do{
    i ++;
}while(i < 10 );
```
- 嵌套循环
```c
for (int i = 0; i < 10; i++){
    for( int j = 0 ; j < 10; j ++){
        statement(s)
    }
}
```

::: note 详情参考
https://www.bilibili.com/video/BV1Vm4y1r7jY?p=25&vd_source=321621351b5c8d1d29a51feda1285409
:::
## 结构体

```c
struct tag {
    member-list
    member-list
    member-list  
    ...
} variable-list ;
```
**结构体可以理解为构建一个新的类型，并可以用此类型构建对象。**

::: warning 举例
举个简单的例子，我们可以构建一个名为 小狗 dog 的结构体，dog 结构体中包含了 小狗的名称、颜色、年龄等信息。即创建了一个 dog 的结构体。
:::

::: info 视频
https://www.bilibili.com/video/BV1Vm4y1r7jY?p=24&vd_source=321621351b5c8d1d29a51feda1285409
:::
## 指针

指针也就是内存地址，指针变量是用来存放内存地址的变量。就像其他变量或常量一样，您必须在使用指针存储其他变量地址之前，对其进行声明。指针变量声明的一般形式为：

```c
type *var_name;
```
举个简单的例子，int i = 1 时，我们可以调用 i 来获取这个值，这时会自动找到 i 这个变量，然后找到 对应的存储位置，拿到存储位置以后，再去获取实际的值。这个存储位置就是指针。

::: note 详情参考
https://www.bilibili.com/video/BV1Vm4y1r7jY?p=23&vd_source=321621351b5c8d1d29a51feda1285409
:::