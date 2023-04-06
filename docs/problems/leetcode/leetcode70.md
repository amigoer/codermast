---
order : 70
---
# 70. 爬楼梯

## 题目描述
假设你正在爬楼梯。需要 n 阶你才能到达楼顶。

每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？


示例 1：

输入：n = 2
输出：2
解释：有两种方法可以爬到楼顶。
1. 1 阶 + 1 阶
2. 2 阶
   示例 2：

输入：n = 3
输出：3
解释：有三种方法可以爬到楼顶。
1. 1 阶 + 1 阶 + 1 阶
2. 1 阶 + 2 阶
3. 2 阶 + 1 阶

提示：

1 <= n <= 45

## 题目地址
[Leetcode 70.爬楼梯](https://leetcode-cn.com/problems/climbing-stairs/)

## 解题思路
&emsp;&emsp;爬到第⼀层楼梯有⼀种⽅法，爬到⼆层楼梯有两种⽅法。 
那么第⼀层楼梯再跨两步就到第三层 ，第⼆层楼梯再跨⼀步就到第三层。 
所以到第三层楼梯的状态可以由第⼆层楼梯 和 到第⼀层楼梯状态推导出来，那么就可以想到动态规划了。

&emsp;&emsp;**爬上 n-1 阶楼梯的方法数量。因为再爬1阶就能到第n阶**

&emsp;&emsp;**爬上 n−2 阶楼梯的方法数量，因为再爬2阶就能到第n阶**

&emsp;&emsp;要求F(n) 则需要先求F(n - 1) 和 F(n - 2);

&emsp;&emsp;要求F(n - 1) 则需要先求F(n - 1 - 1) 和 F(n - 1 - 2);

&emsp;&emsp;...以此类推

&emsp;&emsp;要求F(3) 则需要先求F(2) 和 F(1);

&emsp;&emsp;此时的F(2) 和 F(1)都是已知条件，则可以求的结果。

### 方法1️⃣：递归法
#### 代码Code
```java
// 递归法
public int climbStairs(int n) {
    if (n < 3) {
        return n;
    }
    return climbStairs(n - 1) + climbStairs(n - 2);
}
```
#### 复杂度分析

- 时间复杂度：O(2 ^ n)。

- 空间复杂度：O(n)。

### 方法2️⃣：动态规划法1：（使用dp数组进行记录）
#### 代码Code
```java
// 动态规划法1：
public int climbStairs(int n) {
    if (n < 2) {
        return n;
    }
    // 定义 dp 数组
    int[] dp = new int[n + 1];

    // 初始化 dp 数组中的初始值
    dp[1] = 1;
    dp[2] = 2;

    // 开始循环遍历
    for (int i = 3; i < dp.length; i++) {
        // 递推公式
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    // 得到返回值
    return dp[n];
}
```
#### 复杂度分析

- 时间复杂度：O(n)。

- 空间复杂度：O(n)。
### 方法3️⃣：动态规划法2：（使用dp数组进行记录）
#### 代码Code
```java
// 动态规划法2：仅保存需要进行递推的两个值
public int climbStairs2(int n) {
    if (n < 3) {
    return n;
    }
    // 定义 dp 数组
    int[] dp = new int[2];

    // 初始化 dp 数组中的初始值
    dp[0] = 1;
    dp[1] = 2;

    // 开始循环遍历
    // 循环 1 次 得到第 3 个值
    // 循环 n - 2 次 得到第 n 个值
    for (int i = 0; i < n - 2; i++) {
        int num = dp[0] + dp[1];
        dp[0] = dp[1];
        dp[1] = num;
    }
    // 得到返回值
    return dp[1];
}
```
#### 复杂度分析

- 时间复杂度：O(n)。

- 空间复杂度：O(1)。
