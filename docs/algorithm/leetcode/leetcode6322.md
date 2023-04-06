---
index : false
order : 6322
---
# Leetcode 6322. 检查骑士巡视方案

## 题目描述
骑士在一张 n x n 的棋盘上巡视。在有效的巡视方案中，骑士会从棋盘的 左上角 出发，并且访问棋盘上的每个格子 恰好一次 。

给你一个 n x n 的整数矩阵 grid ，由范围 [0, n * n - 1] 内的不同整数组成，其中 grid[row][col] 表示单元格 (row, col) 是骑士访问的第 grid[row][col] 个单元格。骑士的行动是从下标 0 开始的。

如果 grid 表示了骑士的有效巡视方案，返回 true；否则返回 false。

注意，骑士行动时可以垂直移动两个格子且水平移动一个格子，或水平移动两个格子且垂直移动一个格子。下图展示了骑士从某个格子出发可能的八种行动路线。



示例 1：


输入：grid = [[0,11,16,5,20],[17,4,19,10,15],[12,1,8,21,6],[3,18,23,14,9],[24,13,2,7,22]]
输出：true
解释：grid 如上图所示，可以证明这是一个有效的巡视方案。
示例 2：


输入：grid = [[0,3,6],[5,8,1],[2,7,4]]
输出：false
解释：grid 如上图所示，考虑到骑士第 7 次行动后的位置，第 8 次行动是无效的。
 

提示：

n == grid.length == grid[i].length
3 <= n <= 7
0 <= grid[row][col] < n * n
grid 中的所有整数 互不相同

## 题目地址
[Leetcode 6322. 检查骑士巡视方案](https://leetcode.cn/problems/check-knight-tour-configuration/solution/leetcode-6322-jian-cha-qi-shi-xun-shi-fa-0ece/)

## 思路分析
1. 首先要求骑士必须从下标0开始行动，这里需要判断 grid[0][0] == 0，这种情况，我自己在做的时候就忘记了这种情况，导致一个测试用例过不去，很难受。
2. 通过骑士的站位，判断其8个点位中合法点位的值，是否和现在所占据的点位的值是否差1，即判断 grid[i][j] + 1 == 可能的8个点位的值。如果有，则说明可以跳到下一个位置，循环进行，8个点位都没有，则直接跳出循环，即无法巡视完棋盘，返回false。
3. 当点位的值+1，是否和棋盘的长乘宽相等，即 grid[i][j] + 1 == gird.length * grid[0].length ，如果想等则已经巡视完全程，否则会回到步骤二，再进行判断。

## 代码示例

```java
public class Solution {
    public boolean checkValidGrid(int[][] grid) {
        if (grid[0][0] != 0) {
            return false;
        }
        int[] ret = checkArri(0, 0, grid);
        while (ret != null) {
            ret = checkArri(ret[0], ret[1], grid);
            if (ret == null) {
                return false;
            }

            if (grid[ret[0]][ret[1]] + 1 == grid.length * grid[0].length) {
                return true;
            }
        }
        return false;
    }

    public int[] checkArri(int i, int j, int[][] grid) {
        int len_i = grid.length;
        int len_j = grid[0].length;
        if (i - 1 >= 0 && i - 1 < len_i && j - 2 >= 0 && j - 2 < len_j) {
            if (grid[i - 1][j - 2] == grid[i][j] + 1) {
                return new int[]{i - 1, j - 2};
            }
        }

        if (i - 1 >= 0 && i - 1 < len_i && j + 2 >= 0 && j + 2 < len_j) {
            if (grid[i - 1][j + 2] == grid[i][j] + 1) {
                return new int[]{i - 1, j + 2};
            }
        }

        if (i + 1 >= 0 && i + 1 < len_i && j - 2 >= 0 && j - 2 < len_j) {
            if (grid[i + 1][j - 2] == grid[i][j] + 1) {
                return new int[]{i + 1, j - 2};
            }
        }
        if (i + 1 >= 0 && i + 1 < len_i && j + 2 >= 0 && j + 2 < len_j) {
            if (grid[i + 1][j + 2] == grid[i][j] + 1) {
                return new int[]{i + 1, j + 2};
            }
        }

        if (i - 2 >= 0 && i - 2 < len_i && j - 1 >= 0 && j - 1 < len_j) {
            if (grid[i - 2][j - 1] == grid[i][j] + 1) {
                return new int[]{i - 2, j - 1};
            }
        }

        if (i - 2 >= 0 && i - 2 < len_i && j + 1 >= 0 && j + 1 < len_j) {
            if (grid[i - 2][j + 1] == grid[i][j] + 1) {
                return new int[]{i - 2, j + 1};
            }
        }

        if (i + 2 >= 0 && i + 2 < len_i && j - 1 >= 0 && j - 1 < len_j) {
            if (grid[i + 2][j - 1] == grid[i][j] + 1) {
                return new int[]{i + 2, j - 1};
            }
        }
        if (i + 2 >= 0 && i + 2 < len_i && j + 1 >= 0 && j + 1 < len_j) {
            if (grid[i + 2][j + 1] == grid[i][j] + 1) {
                return new int[]{i + 2, j + 1};
            }
        }
        return null;
    }
}
```