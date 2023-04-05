# Final关键字的用法及加载时机
## 修饰变量

final关键字修饰变量表示该变量一经初始化，则无法被修改。

- 基本类型和String类型：这类一般都是通过字面量进行赋值，一经初始化无法改变。
- 其他引用类型：这种类型我们无法改变常量指向的引用，但是仍然可以改变引用指向的对象，即引用指向的地址。

### 静态常量和对象常量

这里根据是否被static修饰可以将常量分为两类：

1. **被final和static关键字同时修饰的变量**

被final和static同时修饰的变量，我们称为静态常量，需要在类加载的时候进行初始化

2. **仅被final关键字修饰的变量**

仅被final修饰的变量，我们称为对象常量，需要在实例化的时候进行初始化

### 常量的初始化方式

#### 静态常量

1. 声明时初始化


  ```java
public static final int age = 18;
  ```

2. 构造方法初始化

  ```java
  public class Main{
      public static final int age;

      public Main(){
          age = 18;
      }
  }
  ```

    3. 静态代码块初始化

  ```java
  public class Main{
      public static final int age;

      static{
          age = 18;
      }
  }
  ```

#### 对象常量

1. 声明时初始化


  ```java
public final int age = 18;
  ```

2. 构造方法初始化

  ```java
  public class Main{
      public final int age;

      public Main(){
          age = 18;
      }
  }
  ```

3. 构造代码块初始化

  ```java
  public class Main{
      public final int age;
      {
          age = 18;
      }
  }
  ```

### 常量的初始化过程

- final修饰的实例属性，在实例创建的时候才会赋值。
- static修饰的类属性，在类加载的准备阶段赋初值，初始化阶段赋值。
- static+final修饰的String类型或者基本类型常量，JVM规范是在初始化阶段赋值，但是HotSpot VM直接在准备阶段就赋值了，这里是通过字段的ConstantValue属性进行判断的。
- static+final修饰的其他引用类型常量，赋值步骤和第二点的流程是一样的。

> 这里参考的是Archie_java这位大佬的文章进行总结的，[你知道Java中final和static修饰的变量是在什么时候赋值的吗？_final修饰的变量什么时候赋值](https://blog.csdn.net/qq_43842093/article/details/122144825)

### ConstantValue属性

final static修饰的成员变量只有在其类型为ConstantValue时才会在准备阶段被赋予具体值。什么时候会将字段加上ConstantValue属性呢？

ConstantValue需要满足2个条件：

1. 类型为基本类型或者String
2. 并且使用字面量的形式赋值

> 必须是8种基本类型或者String类型，并且必须是通过字面量进行赋值，此时才会加上ConstantValue属性。

```java
public class Main {
    static class Node{
        int val;
        Node left;
        Node right;
    }

    // 使用字面量对int类型的常量进行赋值
    public final int id = 10;
    // 调用方法的返回值对int类型的常量进行赋值
    public final int age = getAge();

    // 使用字面量对String类型的常量进行赋值
    public final String address = "陕西省西安市";
    // 调用方法的返回值对String类型的常量进行赋值
    public final String name = getName();

    // 使用字面量对Node类型的常量进行赋值
    public final Node root = new Node();
    // 调用方法的返回值对String类型的常量进行赋值
    public final Node left = getNode();

    public int getAge() {
        return 18;
    }

    public String getName(){
        return "Hello Codermast!";
    }

    public Node getNode(){
        return new Node();
    }
}
```

我们对于这个类使用`javap -verbose className`指令查看字节码文件

```shell
Classfile /Users/codermast/IdeaProjects/Demo/src/main/java/finalKeyword/Main.class
  Last modified 2023年3月29日; size 891 bytes
  SHA-256 checksum 0af0e202c117c2964acccd6eec3a5c4823a29c14bff3fc896f9e926a5edee590
  Compiled from "Main.java"
public class finalKeyword.Main
  minor version: 0
  major version: 63
  flags: (0x0021) ACC_PUBLIC, ACC_SUPER
  this_class: #8                          // finalKeyword/Main
  super_class: #2                         // java/lang/Object
  interfaces: 0, fields: 6, methods: 4, attributes: 3
Constant pool:
   #1 = Methodref          #2.#3          // java/lang/Object."<init>":()V
   #2 = Class              #4             // java/lang/Object
   #3 = NameAndType        #5:#6          // "<init>":()V
   #4 = Utf8               java/lang/Object
   #5 = Utf8               <init>
   #6 = Utf8               ()V
   #7 = Fieldref           #8.#9          // finalKeyword/Main.id:I
   #8 = Class              #10            // finalKeyword/Main
   #9 = NameAndType        #11:#12        // id:I
  #10 = Utf8               finalKeyword/Main
  #11 = Utf8               id
  #12 = Utf8               I
  #13 = Methodref          #8.#14         // finalKeyword/Main.getAge:()I
  #14 = NameAndType        #15:#16        // getAge:()I
  #15 = Utf8               getAge
  #16 = Utf8               ()I
  #17 = Fieldref           #8.#18         // finalKeyword/Main.age:I
  #18 = NameAndType        #19:#12        // age:I
  #19 = Utf8               age
  #20 = String             #21            // 陕西省西安市
  #21 = Utf8               陕西省西安市
  #22 = Fieldref           #8.#23         // finalKeyword/Main.address:Ljava/lang/String;
  #23 = NameAndType        #24:#25        // address:Ljava/lang/String;
  #24 = Utf8               address
  #25 = Utf8               Ljava/lang/String;
  #26 = Methodref          #8.#27         // finalKeyword/Main.getName:()Ljava/lang/String;
  #27 = NameAndType        #28:#29        // getName:()Ljava/lang/String;
  #28 = Utf8               getName
  #29 = Utf8               ()Ljava/lang/String;
  #30 = Fieldref           #8.#31         // finalKeyword/Main.name:Ljava/lang/String;
  #31 = NameAndType        #32:#25        // name:Ljava/lang/String;
  #32 = Utf8               name
  #33 = Class              #34            // finalKeyword/Main$Node
  #34 = Utf8               finalKeyword/Main$Node
  #35 = Methodref          #33.#3         // finalKeyword/Main$Node."<init>":()V
  #36 = Fieldref           #8.#37         // finalKeyword/Main.root:LfinalKeyword/Main$Node;
  #37 = NameAndType        #38:#39        // root:LfinalKeyword/Main$Node;
  #38 = Utf8               root
  #39 = Utf8               LfinalKeyword/Main$Node;
  #40 = Methodref          #8.#41         // finalKeyword/Main.getNode:()LfinalKeyword/Main$Node;
  #41 = NameAndType        #42:#43        // getNode:()LfinalKeyword/Main$Node;
  #42 = Utf8               getNode
  #43 = Utf8               ()LfinalKeyword/Main$Node;
  #44 = Fieldref           #8.#45         // finalKeyword/Main.left:LfinalKeyword/Main$Node;
  #45 = NameAndType        #46:#39        // left:LfinalKeyword/Main$Node;
  #46 = Utf8               left
  #47 = String             #48            // Hello Codermast!
  #48 = Utf8               Hello Codermast!
  #49 = Utf8               ConstantValue
  #50 = Integer            10
  #51 = Utf8               Code
  #52 = Utf8               LineNumberTable
  #53 = Utf8               SourceFile
  #54 = Utf8               Main.java
  #55 = Utf8               NestMembers
  #56 = Utf8               InnerClasses
  #57 = Utf8               Node
{
  public final int id;
    descriptor: I
    flags: (0x0011) ACC_PUBLIC, ACC_FINAL
    ConstantValue: int 10

  public final int age;
    descriptor: I
    flags: (0x0011) ACC_PUBLIC, ACC_FINAL

  public final java.lang.String address;
    descriptor: Ljava/lang/String;
    flags: (0x0011) ACC_PUBLIC, ACC_FINAL
    ConstantValue: String 陕西省西安市

  public final java.lang.String name;
    descriptor: Ljava/lang/String;
    flags: (0x0011) ACC_PUBLIC, ACC_FINAL

  public final finalKeyword.Main$Node root;
    descriptor: LfinalKeyword/Main$Node;
    flags: (0x0011) ACC_PUBLIC, ACC_FINAL

  public final finalKeyword.Main$Node left;
    descriptor: LfinalKeyword/Main$Node;
    flags: (0x0011) ACC_PUBLIC, ACC_FINAL

  public finalKeyword.Main();
    descriptor: ()V
    flags: (0x0001) ACC_PUBLIC
    Code:
      stack=3, locals=1, args_size=1
         0: aload_0
         1: invokespecial #1                  // Method java/lang/Object."<init>":()V
         4: aload_0
         5: bipush        10
         7: putfield      #7                  // Field id:I
        10: aload_0
        11: aload_0
        12: invokevirtual #13                 // Method getAge:()I
        15: putfield      #17                 // Field age:I
        18: aload_0
        19: ldc           #20                 // String 陕西省西安市
        21: putfield      #22                 // Field address:Ljava/lang/String;
        24: aload_0
        25: aload_0
        26: invokevirtual #26                 // Method getName:()Ljava/lang/String;
        29: putfield      #30                 // Field name:Ljava/lang/String;
        32: aload_0
        33: new           #33                 // class finalKeyword/Main$Node
        36: dup
        37: invokespecial #35                 // Method finalKeyword/Main$Node."<init>":()V
        40: putfield      #36                 // Field root:LfinalKeyword/Main$Node;
        43: aload_0
        44: aload_0
        45: invokevirtual #40                 // Method getNode:()LfinalKeyword/Main$Node;
        48: putfield      #44                 // Field left:LfinalKeyword/Main$Node;
        51: return
      LineNumberTable:
        line 3: 0
        line 11: 4
        line 13: 10
        line 16: 18
        line 18: 24
        line 21: 32
        line 23: 43

  public int getAge();
    descriptor: ()I
    flags: (0x0001) ACC_PUBLIC
    Code:
      stack=1, locals=1, args_size=1
         0: bipush        18
         2: ireturn
      LineNumberTable:
        line 26: 0

  public java.lang.String getName();
    descriptor: ()Ljava/lang/String;
    flags: (0x0001) ACC_PUBLIC
    Code:
      stack=1, locals=1, args_size=1
         0: ldc           #47                 // String Hello Codermast!
         2: areturn
      LineNumberTable:
        line 30: 0

  public finalKeyword.Main$Node getNode();
    descriptor: ()LfinalKeyword/Main$Node;
    flags: (0x0001) ACC_PUBLIC
    Code:
      stack=2, locals=1, args_size=1
         0: new           #33                 // class finalKeyword/Main$Node
         3: dup
         4: invokespecial #35                 // Method finalKeyword/Main$Node."<init>":()V
         7: areturn
      LineNumberTable:
        line 34: 0
}
SourceFile: "Main.java"
NestMembers:
  finalKeyword/Main$Node
InnerClasses:
  static #57= #33 of #8;                  // Node=class finalKeyword/Main$Node of class finalKeyword/Main
```

我们能够明显的看到只有

```java
public final int id = 10;
public final String address = "陕西省西安市";
```

这两个字段被加上了ConstrantValue属性，也就是只有这两个属性在初始化时直接进行赋值。

## 修饰方法

final关键字修饰方法，则表明该方法无法被子类重写，但是可以被子类继承子类也可以调用该方法。

## 修饰类

final关键字修饰类，则表明该类无法被继承，如我们经常使用的java.lang.String类就是如此。