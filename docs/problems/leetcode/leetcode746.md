---
order : 746
---

# 746. 使用最小花费爬楼梯

## 题目描述

给你一个整数数组 cost ，其中 cost[i] 是从楼梯第 i 个台阶向上爬需要支付的费用。一旦你支付此费用，即可选择向上爬一个或者两个台阶。

你可以选择从下标为 0 或下标为 1 的台阶开始爬楼梯。

请你计算并返回达到楼梯顶部的最低花费。

示例 1：

输入：cost = [10,15,20]
输出：15
解释：你将从下标为 1 的台阶开始。
- 支付 15 ，向上爬两个台阶，到达楼梯顶部。
  总花费为 15 。
  示例 2：

输入：cost = [1,100,1,1,1,100,1,1,100,1]
输出：6
解释：你将从下标为 0 的台阶开始。
- 支付 1 ，向上爬两个台阶，到达下标为 2 的台阶。
- 支付 1 ，向上爬两个台阶，到达下标为 4 的台阶。
- 支付 1 ，向上爬两个台阶，到达下标为 6 的台阶。
- 支付 1 ，向上爬一个台阶，到达下标为 7 的台阶。
- 支付 1 ，向上爬两个台阶，到达下标为 9 的台阶。
- 支付 1 ，向上爬一个台阶，到达楼梯顶部。
  总花费为 6 。

提示：

2 <= cost.length <= 1000
0 <= cost[i] <= 999

## 题目地址
[Leetcode 746. 使用最小花费爬楼梯](https://leetcode-cn.com/problems/min-cost-climbing-stairs/)


## 解题思路
&emsp;&emsp;由题目可得，我们需要得到到达楼梯顶部的时候，所需要支付的最小体力花费。我们在支付完对应的花费后，可以选择向上两个台阶或者一个台阶。

&emsp;&emsp;此时的最优解即这两个台阶中的一个最小值，此时到达该阶梯的最小花费即为上一步的最小花费加上此步骤的最优解即最小花费。

&emsp;&emsp;递推公式有两种：
 - dp[i] = Math.min(dp[i - 1],dp[i - 2]) + cost[i];
 - dp[i] = Math.min(dp[i - 1] + cost[i - 1],dp[i - 2] + cost[i - 2]);

&emsp;&emsp;在递推公式中，我们需要知道dp[i - 1] 和 dp[i - 2]两个的数值，即该阶梯前两个阶梯的最小花费。
即此时 i 最小等于 2 ，那么就需要进行第一个和第二个阶梯的初始化。
&emsp;&emsp;dp[0] = cost[0];

&emsp;&emsp;dp[1] = cost[1];

&emsp;&emsp;dp[2] = Math.min(dp[0],dp[1]) + cost[2];

&emsp;&emsp;......

&emsp;&emsp;dp[i - 1] = Math.min(dp[i - 2],dp[i - 3]) + cost[i - 1];

&emsp;&emsp;dp[i] = Math.min(dp[i - 1],dp[i - 2]) + cost[i];

::: tip 注意
需要注意的是：此时的dp[dp.length - 1]即dp数组的最后一个数并不一定是最小的花费，因为我们一次可以跨一个台阶或者两个台阶，即最小值为Math.min(dp[dp.length - 1], dp[dp.length - 2])
:::
## 代码实现

### 方法1：动态规划
```java
// 动态规划法1：使用dp数组记录每一步所需要花费的最小体力
public int minCostClimbingStairs(int[] cost) {
    if (cost.length == 1) {
        return cost[0];
    }

    // 定义 dp 数组
    int[] dp = new int[cost.length];

    // 初始化 dp 数组
    dp[0] = cost[0];
    dp[1] = cost[1];
    // 递推公式 ： dp[i] = Math.min(dp[i - 1],dp[i - 2]) + cost[i];

    // dp[i] : 到达第 i 个阶梯所的最小花费
    for (int i = 2; i < dp.length; i++) {
        dp[i] = Math.min(dp[i - 1], dp[i - 2]) + cost[i];
    }
    return Math.min(dp[dp.length - 1], dp[dp.length - 2]);
}
```
### 复杂度分析：
- 时间复杂度：O(n)
- 空间复杂度：O(n)

### 方法2：动态规划(优化版)
```java
// 动态规划法2：将dp数组进行优化
public int minCostClimbingStairs2(int[] cost) {
    if (cost.length == 1) {
        return cost[0];
    }

    // 定义 dp 数组
    int[] dp = new int[2];

    // 初始化 dp 数组
    dp[0] = cost[0];
    dp[1] = cost[1];
    // 递推公式 ： dp[1] = Math.min(num,dp[0]) + cost[i];

    // dp[i] : 到达第 i 个阶梯所的最小花费
    for (int i = 2; i < cost.length; i++) {
        int num = dp[0];
        dp[0] = dp[1];
        dp[1] = Math.min(num, dp[0]) + cost[i];
    }
    return Math.min(dp[0], dp[1]);
}
```
### 复杂度分析：
- 时间复杂度：O(n)
- 空间复杂度：O(1)
