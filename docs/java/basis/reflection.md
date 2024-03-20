---
order : 5
---

# Java - 反射

## 概述
反射就是加载类，并允许以编程的方式解剖类中的各种成分（成员变量、方法、构造器等）。

反射的功能：

1. 获取类的字节码文件 class 对象
2. 获取类的构造器 Constructor 对象
3. 获取类的成员变量 Field 对象
4. 获取类的成员方法 Method 对象

## 获取Class对象

获取 Class 对象有三种方式：从类、类名、对象获取。

- 从类中获取：Class c = 类名.class
- 从类名获取：调用 Class 提供的方法`public static Class forName(String package)` 用法为 `Class c = Class.forName("com.codermast.Student")`
- 从对象获取：Object 提供的方法`public Class getClass()` 用法为 `Class c = 对象.getClass()`

接下来，简单的演示这三种方法的使用：

- Studen 类

```java
public class Student {
    public String name = "codermast";
    private int age = 18;
    
    public Student(){
        
    }

    private Student(int age){
        this.age = age;
    }
    
    public Student(String name,int age){
        this.name = name;
        this.age = age;
    }

    public void run(){
        System.out.println(name + "正在跑...");
    }

    private void eat(String eat){
        System.out.println(name + "正在吃：" + eat);
    }

    @Override
    public String toString() {
        return "Student{" +
                "name='" + name + '\'' +
                ", age=" + age +
                '}';
    }
}
```

- 反射获取Class测试类

```java
public class ReflectionGetClassTest {
    public static void main(String[] args) throws ClassNotFoundException {
        Class<Student> studentClassByClass = Student.class;

        Class<?> studentClassByClassPath = Class.forName("reflection.Student");

        Student student = new Student();

        Class<?> studentClassByReference = student.getClass();

        System.out.println(studentClassByClass == studentClassByClassPath);
        System.out.println(studentClassByReference == studentClassByClass);
        System.out.println(studentClassByReference == studentClassByClassPath);
    }
}
```

执行结果：

```text
true
true
true
```

这说明，无论我们通过那种方式获取的 Class 对象，只要是同一个类，则获取到的 Class 对象都是相同的。本质是类的字节码文件只存储一份。

## 获取类的构造器

Class 提供了以下几种从类中获取构造器的方法。

|方法|功能|
|:---:|:---:|
|Constructor<?>[] getConstructors()|获取全部构造器（只能获取 public 修饰的）|
|Constructor<?>[] getDeclareConstructors()|获取全部构造器（只要存在就能拿到）|
|Constructor\<T> getConstructor(Class<?>... parameterTypes)|获取某个构造器（只能获取 public 修饰的）|
|Constructor\<T> getDeclaredConstructor(Class<?>... parameterTypes)|获取某个构造器（只要存在就能拿到）|


- 反射获取构造器测试类

```java
public class ReflectionGetConstructorTest {

    public static void main(String[] args) throws NoSuchMethodException {
        Class<Student> studentClass = Student.class;

        // 1. 获取所有 public 的构造器
        Constructor<?>[] constructors = studentClass.getConstructors();
        System.out.println("===================获取所有 public 的构造器===================");
        for (Constructor<?> constructor : constructors) {
            System.out.println("构造器名称为：" + constructor.getName() + "，参数个数为：" + constructor.getParameterCount());
        }
        System.out.println("============================================================");
        
        // 2. 获取所有存在的构造器
        System.out.println("=====================获取所有存在的构造器======================");
        Constructor<?>[] declaredConstructors = studentClass.getDeclaredConstructors();
        for (Constructor<?> constructor : declaredConstructors) {
            System.out.println("构造器名称为：" + constructor.getName() + "，参数个数为：" + constructor.getParameterCount());
        }
        System.out.println("============================================================");
        
        // 3. 获取指定的 public 构造器
        // 获取无参构造器
        Constructor<Student> constructorNoParameter = studentClass.getConstructor();
        System.out.println("=========================获取无参构造器=======================");
        System.out.println("构造器名称为：" + constructorNoParameter.getName() + "，参数个数为：" + constructorNoParameter.getParameterCount());
        System.out.println("============================================================");
        // 获取第一个参数为 String 类型，第二个参数为 int 类型的构造器
        Constructor<Student> constructorTwoParameter = studentClass.getConstructor(String.class, int.class);
        System.out.println("====获取第一个参数为 String 类型，第二个参数为 int 类型的构造器====");
        System.out.println("构造器名称为：" + constructorTwoParameter.getName() + "，参数个数为：" + constructorTwoParameter.getParameterCount());
        System.out.println("============================================================");
        
        // 4. 获取指定存在的构造器
        // 获取参数为 String 类型的构造器
        Constructor<Student> constructorOneParameter = studentClass.getDeclaredConstructor(int.class);
        System.out.println("================获取参数为 String 类型的构造器=================");
        System.out.println("构造器名称为：" + constructorOneParameter.getName() + "，参数个数为：" + constructorOneParameter.getParameterCount());
        System.out.println("============================================================");
        
        // 5. 通过构造器创建对象
        Student student = constructorNoParameter.newInstance();
        student.run();
    }
}
```

- 执行结果

```text
===================获取所有 public 的构造器===================
构造器名称为：reflection.Student，参数个数为：2
构造器名称为：reflection.Student，参数个数为：0
============================================================
=====================获取所有存在的构造器======================
构造器名称为：reflection.Student，参数个数为：2
构造器名称为：reflection.Student，参数个数为：1
构造器名称为：reflection.Student，参数个数为：0
============================================================
=========================获取无参构造器=======================
构造器名称为：reflection.Student，参数个数为：0
============================================================
====获取第一个参数为 String 类型，第二个参数为 int 类型的构造器====
构造器名称为：reflection.Student，参数个数为：2
============================================================
================获取参数为 String 类型的构造器=================
构造器名称为：reflection.Student，参数个数为：1
============================================================
无参构造被调用...
codermast正在跑...
```

::: tip 实例化对象
拿到构造器对象后，可以调用构造器对象内的 newInstace() 方法，来实例化对象。
:::

## 获取类的成员变量

Class 提供了以下几种从类中获取成员变量的方法：

|方法|功能|
|:---:|:---:|
|Field[] getFields()|获取类的全部成员变量（只能获取 public 修饰的）|
|Field[] getDeclaredFields()|获取类的全部成员变量（只要存在就能拿到）|
|Field getField(String name)|获取类的某个成员变量（只能获取 public 修饰的）|
|Field getDeclaredField(String name)|获取类的某个成员变量（只要存在就能拿到）|

操作对象的成员变量有两种类型：set() 设置变量，get() 获取变量

|方法|功能|
|:---:|:---:|
|Object get(Object obj)|获取对象的成员变量|
|void set(Object obj, Object value)|设置对象的成员变量|
|public void setAccessible(boolean flag)|设置为 true，表示禁止检查访问控制（暴力修改）|

- 获取类的成员变量测试类

```java
public class ReflectionGetFieldTest {
    public static void main(String[] args) throws NoSuchFieldException, NoSuchMethodException, InvocationTargetException, InstantiationException, IllegalAccessException {
        Class<Student> studentClass = Student.class;

        Field[] fieldsPublic = studentClass.getFields();

        System.out.println("=======所有的 public 成员变量=======");
        for (Field field : fieldsPublic) {
            System.out.println(field);
        }
        System.out.println("==================================");

        Field[] fieldsAll = studentClass.getDeclaredFields();
        System.out.println("============所有的成员变量===========");
        for (Field field : fieldsAll) {
            System.out.println(field);
        }
        System.out.println("==================================");
        System.out.println("=========== 成员变量 name =========");
        Field name = studentClass.getField("name");
        System.out.println(name);
        System.out.println("==================================");
        System.out.println("=========== 成员变量 age ==========");
        Field age = studentClass.getDeclaredField("age");
        System.out.println(age);
        System.out.println("==================================");

        Student student = studentClass.getConstructor().newInstance();
        // 取指
        System.out.println(name.get(student));

        // 赋值
        name.set(student,"友人");

        // 取指
        System.out.println(name.get(student));

        System.out.println(student);
    }
}
```

- 执行结果

```text
=======所有的 public 成员变量=======
public java.lang.String reflection.Student.name
==================================
============所有的成员变量===========
public java.lang.String reflection.Student.name
private int reflection.Student.age
==================================
=========== 成员变量 name =========
public java.lang.String reflection.Student.name
==================================
=========== 成员变量 age ==========
private int reflection.Student.age
==================================
无参构造被调用...
codermast
友人
Student{name='友人', age=18}
```

## 获取类的成员方法

Class 提供了以下几种从类中获取成员方法的方法：

|方法|功能|
|:---:|:---:|
|Method[] getMethods()|获取类的全部成员方法（只能获取 public 修饰的）|
|Method[] getDeclaredMethods()|获取类的全部成员方法（只要存在就能拿到）|
|Method getMethod(String name, Class<?>... parameterTypes)|获取类的某个成员方法（只能获取 public 修饰的）|
|Method getDeclaredMethod(String name, Class<?>... parameterTypes)|获取类的某个成员方法（只要存在就能拿到）|

另外获取到的成员方法，也可以调用，使用 invoke() 方法调用。

- 获取类的成员方法测试类

```java
public class ReflectionGetMethodTest {
    public static void main(String[] args) throws NoSuchMethodException, InvocationTargetException, InstantiationException, IllegalAccessException {
        Class<Student> studentClass = Student.class;
        // 获取所有 public 的成员方法
        Method[] methodsPublic = studentClass.getMethods();
        System.out.println("=======所有的 public 成员方法=======");
        for (Method method : methodsPublic) {
            System.out.println("方法名为：" + method.getName() +  "，参数个数为：" + method.getParameterCount() );
        }
        System.out.println("==================================");

        Method[] methodsAll = studentClass.getDeclaredMethods();
        System.out.println("==========所有的存在的成员方法=======");
        for (Method method : methodsAll) {
            System.out.println("方法名为：" + method.getName() +  "，参数个数为：" + method.getParameterCount() );
        }
        System.out.println("==================================");

        Method runMethod = studentClass.getMethod("run");
        System.out.println("======获取 public 的 run 方法======");
        System.out.println("方法名为：" + runMethod.getName() +  "，参数个数为：" + runMethod.getParameterCount() );
        System.out.println("==================================");

        Method eatMethod = studentClass.getDeclaredMethod("eat", String.class);
        System.out.println("======获取 private 的 eat 方法======");
        System.out.println("方法名为：" + eatMethod.getName() +  "，参数个数为：" + eatMethod.getParameterCount() );
        System.out.println("==================================");

        Student student = studentClass.getConstructor().newInstance();
        runMethod.invoke(student);

        eatMethod.setAccessible(true);
        eatMethod.invoke(student,"米饭");
    }
}
```

- 执行结果

```text
=======所有的 public 成员方法=======
方法名为：run，参数个数为：0
方法名为：toString，参数个数为：0
方法名为：wait，参数个数为：2
方法名为：wait，参数个数为：1
方法名为：wait，参数个数为：0
方法名为：equals，参数个数为：1
方法名为：hashCode，参数个数为：0
方法名为：getClass，参数个数为：0
方法名为：notify，参数个数为：0
方法名为：notifyAll，参数个数为：0
==================================
==========所有的存在的成员方法=======
方法名为：run，参数个数为：0
方法名为：toString，参数个数为：0
方法名为：eat，参数个数为：1
==================================
======获取 public 的 run 方法======
方法名为：run，参数个数为：0
==================================
======获取 private 的 eat 方法======
方法名为：eat，参数个数为：1
==================================
无参构造被调用...
codermast正在跑...
codermast正在吃：米饭
```

