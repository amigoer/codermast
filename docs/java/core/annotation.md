---
order : 7
---

# Java核心 - 注解

## 注解概述

注解是 JDK 5 开始引入的一个特性，用于对代码进行说明，可以对包、类、接口、字段、方法参数、局部变量等进行注解。主要有以下四种作用：

1. 生成文档，通过程序里标识的元数据生成 JavaDoc 文档。
2. 编译检查，通过程序里标识的元数据让编译器在编译期间进行检查验证。
3. 编译时动态处理，编译时通过代码里标识的元数据动态处理，例如动态生成代码。
4. 运行时动态处理，运行时通过代码里标识的元数据动态处理，例如使用反射注入实例。

这么说不够简单明了，常见的注解分类如下：

- 内置注解：包括`@Override`、`@Deprecated`和`@SuppressWarnings`，分别用于标明重写某个方法、标明某个类或方法过时、标明要忽略的警告，用这些注解标明后编译器就会进行检查。
- 元注解：元注解是用于定义注解的注解，包括`@Retention`、`@Target`、`@Inherited`、`@Documented`，`@Retention`用于标明注解被保留的阶段，`@Target`用于标明注解使用的范围，`@Inherited`用于标明注解可继承，`@Documented`用于标明是否生成javadoc文档。
- 自定义注解：可以根据自己的需求定义注解，并可用元注解对自定义注解进行注解。

注解就是 Java 代码里面的特殊标记，比如：@Override、@Test等，作用是让其他程序根据注解信息来决定怎么执行该程序。

注解可以用在类、构造器、方法、成员变量、参数等位置处


## 内置注解
Java 1.5开始自带的标准注解，包括@Override、@Deprecated和@SuppressWarnings：

- @Override：表示当前的方法定义将覆盖父类中的方法
- @Deprecated：表示代码被弃用，如果使用了被@Deprecated注解的代码则编译器将发出警告
- @SuppressWarnings：表示关闭编译器警告信息

### @Override注解

```java
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.SOURCE)
public @interface Override {
}
```

从该注解的源码中不难看出，该注解作用在方法上，并且在编译时有效，在编译后的 class 文件中不存在。

这个注解的作用就是告诉编译器被修饰的方法是重写父类中的方法，编译器会根据此进行检查，如果发现父类中并不存在该方法，则会报错。

### @Deprecated注解

```java
@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target(value={CONSTRUCTOR, FIELD, LOCAL_VARIABLE, METHOD, PACKAGE, PARAMETER, TYPE})
public @interface Deprecated {
}
```

从该注解的源码中可以知道，它会被文档化，能够保留到运行时，能够修饰构造方法、属性、局部变量、方法、包、参数、类型。

这个注解的作用是告诉编译器被修饰的程序元素已被“废弃”，不再建议用户使用。


### @SuppressWarnings注解

```java
@Target({TYPE, FIELD, METHOD, PARAMETER, CONSTRUCTOR, LOCAL_VARIABLE})
@Retention(RetentionPolicy.SOURCE)
public @interface SuppressWarnings {
    String[] value();
}
```

这个注解能修饰的程序元素包括类型、属性、方法、参数、构造器、局部变量，只能存活在源码时，取值为String[]。它的作用是告诉编译器忽略指定的警告信息，它可以取的值如下所示：


| 参数                     | 作用                                               | 原描述                                                       |
| :------------------------:| :--------------------------------------------------: | :------------------------------------------------------------: |
| all                      | 抑制所有警告                                       | to suppress all warnings                                     |
| boxing                   | 抑制装箱、拆箱操作时候的警告                       | to suppress warnings relative to boxing/unboxing operations  |
| cast                     | 抑制映射相关的警告                                 | to suppress warnings relative to cast operations             |
| dep-ann                  | 抑制启用注释的警告                                 | to suppress warnings relative to deprecated annotation       |
| deprecation              | 抑制过期方法警告                                   | to suppress warnings relative to deprecation                 |
| fallthrough              | 抑制确在switch中缺失breaks的警告                   | to suppress warnings relative to missing breaks in switch statements |
| finally                  | 抑制finally模块没有返回的警告                      | to suppress warnings relative to finally block that don’t return |
| hiding                   | 抑制与隐藏变数的区域变数相关的警告                 | to suppress warnings relative to locals that hide variable（） |
| incomplete-switch        | 忽略没有完整的switch语句                           | to suppress warnings relative to missing entries in a switch statement (enum case) |
| nls                      | 忽略非nls格式的字符                                | to suppress warnings relative to non-nls string literals     |
| null                     | 忽略对null的操作                                   | to suppress warnings relative to null analysis               |
| rawtype                  | 使用generics时忽略没有指定相应的类型               | to suppress warnings relative to un-specific types when using |
| restriction              | 抑制与使用不建议或禁止参照相关的警告               | to suppress warnings relative to usage of discouraged or     |
| serial                   | 忽略在serializable类中没有声明serialVersionUID变量 | to suppress warnings relative to missing serialVersionUID field for a serializable class |
| static-access            | 抑制不正确的静态访问方式警告                       | to suppress warnings relative to incorrect static access     |
| synthetic-access         | 抑制子类没有按最优方法访问内部类的警告             | to suppress warnings relative to unoptimized access from inner classes |
| unchecked                | 抑制没有进行类型检查操作的警告                     | to suppress warnings relative to unchecked operations        |
| unqualified-field-access | 抑制没有权限访问的域的警告                         | to suppress warnings relative to field access unqualified    |
| unused                   | 抑制没被使用过的代码的警告                         | to suppress warnings relative to unused code                 |

## 元注解

上述内置注解的定义中使用了一些元注解（注解类型进行注解的注解类），在JDK 1.5中提供了4个标准的元注解：`@Target`，`@Retention`，`@Documented`，`@Inherited`, 在JDK 1.8中提供了两个元注解 `@Repeatable` 和 `@Native`。

### @Target注解

**Target 注解的作用是**：描述注解的使用范围（即：被修饰的注解可以用在什么地方）。

Target注解用来说明那些被它所注解的注解类可修饰的对象范围：注解可以用于修饰 packages、types（类、接口、枚举、注解类）、类成员（方法、构造方法、成员变量、枚举值）、方法参数和本地变量（如循环变量、catch参数），在定义注解类时使用了@Target 能够更加清晰的知道它能够被用来修饰哪些对象，它的取值范围定义在ElementType 枚举中。
- @Target注解

```java
@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.ANNOTATION_TYPE)
public @interface Target {
    /**
     * Returns an array of the kinds of elements an annotation type
     * can be applied to.
     * @return an array of the kinds of elements an annotation type
     * can be applied to
     */
    ElementType[] value();
}
```
- ElementType

```java
public enum ElementType {
    /** Class, interface (including annotation type), or enum declaration */
    TYPE,

    /** Field declaration (includes enum constants) */
    FIELD,

    /** Method declaration */
    METHOD,

    /** Formal parameter declaration */
    PARAMETER,

    /** Constructor declaration */
    CONSTRUCTOR,

    /** Local variable declaration */
    LOCAL_VARIABLE,

    /** Annotation type declaration */
    ANNOTATION_TYPE,

    /** Package declaration */
    PACKAGE,

    /**
     * Type parameter declaration
     *
     * @since 1.8
     */
    TYPE_PARAMETER,

    /**
     * Use of a type
     *
     * @since 1.8
     */
    TYPE_USE
}
```

### @Retention & @RetentionTarget注解

Reteniton注解的作用是：描述注解保留的时间范围（即：被描述的注解在它所修饰的类中可以被保留到何时） 。Reteniton注解用来限定那些被它所注解的注解类在注解到其他类上以后，可被保留到何时，一共有三种策略，定义在RetentionPolicy枚举中。
```java
public enum RetentionPolicy {
 
    SOURCE,    // 源文件保留
    CLASS,       // 编译期保留，默认值
    RUNTIME   // 运行期保留，可通过反射去获取注解信息
}
为了验证应用了这三种策略的注解类有何区别，分别使用三种策略各定义一个注解类做测试。@Retention(RetentionPolicy.SOURCE)
public @interface SourcePolicy {
 
}
@Retention(RetentionPolicy.CLASS)
public @interface ClassPolicy {
 
}
@Retention(RetentionPolicy.RUNTIME)
public @interface RuntimePolicy {
 
}
```
用定义好的三个注解类分别去注解一个方法。

```java
public class RetentionTest {
 
	@SourcePolicy
	public void sourcePolicy() {
	}
 
	@ClassPolicy
	public void classPolicy() {
	}
 
	@RuntimePolicy
	public void runtimePolicy() {
	}
}
```
通过执行 javap -verbose RetentionTest命令获取到的RetentionTest 的 class 字节码内容如下。
```java
{
  public retention.RetentionTest();
    flags: ACC_PUBLIC
    Code:
      stack=1, locals=1, args_size=1
         0: aload_0
         1: invokespecial #1                  // Method java/lang/Object."<init>":()V
         4: return
      LineNumberTable:
        line 3: 0

  public void sourcePolicy();
    flags: ACC_PUBLIC
    Code:
      stack=0, locals=1, args_size=1
         0: return
      LineNumberTable:
        line 7: 0

  public void classPolicy();
    flags: ACC_PUBLIC
    Code:
      stack=0, locals=1, args_size=1
         0: return
      LineNumberTable:
        line 11: 0
    RuntimeInvisibleAnnotations:
      0: #11()

  public void runtimePolicy();
    flags: ACC_PUBLIC
    Code:
      stack=0, locals=1, args_size=1
         0: return
      LineNumberTable:
        line 15: 0
    RuntimeVisibleAnnotations:
      0: #14()
}
```
从 RetentionTest 的字节码内容我们可以得出以下两点结论：编译器并没有记录下 sourcePolicy() 方法的注解信息；编译器分别使用了 RuntimeInvisibleAnnotations 和 RuntimeVisibleAnnotations 属性去记录了classPolicy()方法 和 runtimePolicy()方法 的注解信息；

### @Documented注解

### @Inherited注解

Inherited注解的作用：被它修饰的Annotation将具有继承性。如果某个类使用了被@Inherited修饰的Annotation，则其子类将自动具有该注解。

- 定义`@Inherited`注解

```java
@Inherited
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.TYPE,ElementType.METHOD})
public @interface TestInheritedAnnotation {
    String [] values();
    int number();
}
```

- 使用这个注解

```java
@TestInheritedAnnotation(values = {"value"}, number = 10)
public class Person {
}

class Student extends Person{
	@Test
    public void test(){
        Class clazz = Student.class;
        Annotation[] annotations = clazz.getAnnotations();
        for (Annotation annotation : annotations) {
            System.out.println(annotation.toString());
        }
    }
}
```

- 输出

```java
xxxxxxx.TestInheritedAnnotation(values=[value], number=10)
```

即使Student类没有显示地被注解 @TestInheritedAnnotation，但是它的父类 Person 被注解，而且 @TestInheritedAnnotation 被 @Inherited 注解，因此 @TestInheritedAnnotation 注解可以被继承，则 Student 类自动有了该注解。

## 注解与反射接口

定义注解后，如何获取注解中的内容呢？反射包java.lang.reflect下的AnnotatedElement接口提供这些方法。这里注意：只有注解被定义为RUNTIME后，该注解才能是运行时可见，当class文件被装载时被保存在class文件中的Annotation才会被虚拟机读取。

AnnotatedElement 接口是所有程序元素（Class、Method和Constructor）的父接口，所以程序通过反射获取了某个类的AnnotatedElement对象之后，程序就可以调用该对象的方法来访问Annotation信息。我们看下具体的先关接口

- `boolean isAnnotationPresent(Class<?extends Annotation> annotationClass)`

判断该程序元素上是否包含指定类型的注解，存在则返回true，否则返回false。注意：此方法会忽略注解对应的注解容器。

- `<T extends Annotation> T getAnnotation(Class<T> annotationClass)`

返回该程序元素上存在的、指定类型的注解，如果该类型注解不存在，则返回null。

- `Annotation[] getAnnotations()`

返回该程序元素上存在的所有注解，若没有注解，返回长度为0的数组。

- `<T extends Annotation> T[] getAnnotationsByType(Class<T> annotationClass)`

返回该程序元素上存在的、指定类型的注解数组。没有注解对应类型的注解时，返回长度为0的数组。该方法的调用者可以随意修改返回的数组，而不会对其他调用者返回的数组产生任何影响。`getAnnotationsByType`方法与 `getAnnotation`的区别在于，`getAnnotationsByType`会检测注解对应的重复注解容器。若程序元素为类，当前类上找不到注解，且该注解为可继承的，则会去父类上检测对应的注解。

- `<T extends Annotation> T getDeclaredAnnotation(Class<T> annotationClass)`

返回直接存在于此元素上的所有注解。与此接口中的其他方法不同，该方法将忽略继承的注释。如果没有注释直接存在于此元素上，则返回null

- `<T extends Annotation> T[] getDeclaredAnnotationsByType(Class<T> annotationClass)`

返回直接存在于此元素上的所有注解。与此接口中的其他方法不同，该方法将忽略继承的注释

- `Annotation[] getDeclaredAnnotations()`

返回直接存在于此元素上的所有注解及注解对应的重复注解容器。与此接口中的其他方法不同，该方法将忽略继承的注解。如果没有注释直接存在于此元素上，则返回长度为零的一个数组。该方法的调用者可以随意修改返回的数组，而不会对其他调用者返回的数组产生任何影响。


## 自定义注解

### 注解自定义语法

```java
public @interface 注解名称 {
    public 属性类型 属性名称() default 默认值;
}
```

下面是一个自定义的注解 MyAnnotation：

```java
public @interface MyAnnotation {
    String name() default "codermast";

    boolean sex() default true;
}
```

### 注解使用语法

```java
@MyAnnotation(name = "hello",sex = false)
public class AnnotationTest {

    @MyAnnotation(name = "xiaoming")
    public static void main(String[] args) {
        // statement 
    }
}
```

### 特殊属性

如果注解中只有一个属性且名叫 value 时，在使用时该属性的名称可以不写。

```java
// 特殊注解
public @interface MyAnnotation1 {
    String value();
}

// 使用时
@MyAnnotation("CoderMast")
public class AnnotationTest {
}
```

::: tip 注解f本质
- 注解本质就是一个接口，Java 中所有注解都是继承了 Annotation 接口。
- @注解(...)：其实就是一个接口的实现类对象，实现了该注解以及 Annotation 接口。
:::

### 自定义注解实例

> 当我们理解了内置注解, 元注解和获取注解的反射接口后，我们便可以开始自定义注解了。这个例子我把上述的知识点全部融入进来, 代码很简单：

- 定义自己的注解

```java
package com.pdai.java.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface MyMethodAnnotation {

    public String title() default "";

    public String description() default "";

}
```

- 使用注解

```java
package com.pdai.java.annotation;

import java.io.FileNotFoundException;
import java.lang.annotation.Annotation;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;

public class TestMethodAnnotation {

    @Override
    @MyMethodAnnotation(title = "toStringMethod", description = "override toString method")
    public String toString() {
        return "Override toString method";
    }

    @Deprecated
    @MyMethodAnnotation(title = "old static method", description = "deprecated old static method")
    public static void oldMethod() {
        System.out.println("old method, don't use it.");
    }

    @SuppressWarnings({"unchecked", "deprecation"})
    @MyMethodAnnotation(title = "test method", description = "suppress warning static method")
    public static void genericsTest() throws FileNotFoundException {
        List l = new ArrayList();
        l.add("abc");
        oldMethod();
    }
}
```

- 用反射接口获取注解信息

在TestMethodAnnotation中添加Main方法进行测试：

```java
public static void main(String[] args) {
    try {
        // 获取所有methods
        Method[] methods = TestMethodAnnotation.class.getClassLoader()
                .loadClass(("com.pdai.java.annotation.TestMethodAnnotation"))
                .getMethods();

        // 遍历
        for (Method method : methods) {
            // 方法上是否有MyMethodAnnotation注解
            if (method.isAnnotationPresent(MyMethodAnnotation.class)) {
                try {
                    // 获取并遍历方法上的所有注解
                    for (Annotation anno : method.getDeclaredAnnotations()) {
                        System.out.println("Annotation in Method '"
                                + method + "' : " + anno);
                    }

                    // 获取MyMethodAnnotation对象信息
                    MyMethodAnnotation methodAnno = method
                            .getAnnotation(MyMethodAnnotation.class);

                    System.out.println(methodAnno.title());

                } catch (Throwable ex) {
                    ex.printStackTrace();
                }
            }
        }
    } catch (SecurityException | ClassNotFoundException e) {
        e.printStackTrace();
    }
}
```

- 测试的输出

```java
Annotation in Method 'public static void com.pdai.java.annotation.TestMethodAnnotation.oldMethod()' : @java.lang.Deprecated()
Annotation in Method 'public static void com.pdai.java.annotation.TestMethodAnnotation.oldMethod()' : @com.pdai.java.annotation.MyMethodAnnotation(title=old static method, description=deprecated old static method)
old static method
Annotation in Method 'public static void com.pdai.java.annotation.TestMethodAnnotation.genericsTest() throws java.io.FileNotFoundException' : @com.pdai.java.annotation.MyMethodAnnotation(title=test method, description=suppress warning static method)
test method
Annotation in Method 'public java.lang.String com.pdai.java.annotation.TestMethodAnnotation.toString()' : @com.pdai.java.annotation.MyMethodAnnotation(title=toStringMethod, description=override toString method)
toStringMethod
```

