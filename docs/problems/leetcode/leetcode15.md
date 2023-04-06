---
index : false
order : 15
---
# Leetcode15. 三数之和
## 题目描述
给你一个整数数组 nums ，判断是否存在三元组 [nums[i], nums[j], nums[k]] 满足 i != j、i != k 且 j != k ，同时还满足 nums[i] + nums[j] + nums[k] == 0 。请

你返回所有和为 0 且不重复的三元组。

注意：答案中不可以包含重复的三元组。

示例 1：

输入：nums = [-1,0,1,2,-1,-4]
输出：[[-1,-1,2],[-1,0,1]]

解释：
nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0 。
nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0 。
nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0 。
不同的三元组是 [-1,0,1] 和 [-1,-1,2] 。
注意，输出的顺序和三元组的顺序并不重要。
示例 2：

输入：nums = [0,1,1]
输出：[]
解释：唯一可能的三元组和不为 0 。
示例 3：

输入：nums = [0,0,0]
输出：[[0,0,0]]
解释：唯一可能的三元组和为 0 。
 

提示：

3 <= nums.length <= 3000
-105 <= nums[i] <= 105

## 题目地址
[Leetcode 15. 三数之和](https://leetcode.cn/problems/3sum/solution/san-shu-zhi-he-pai-xu-shuang-zhi-zhen-bu-wt6o/)
## 解题思路
### 1.暴力三循环
&emsp;&emsp;第一种方法也是我们能够快速想出来的方法，即使用三个指针i、j、k分别指向三个数，进行遍历，遍历完进行去重操作即可，这里不做过多赘述，主要以第二种方法为主。

### 2.固定指针+双循环指针
&emsp;&emsp;我们使用一个固定指针k，指向数组的开头，使其不断自增，小于nums.length - 2，这里需要小于 nums.length - 2，是因为需要保证其指针后最少有一个i指针和j指针的存在。
&emsp;&emsp;随后我们使i指针指向k指针的后面一个位置，j指针指向数组末尾。

&emsp;&emsp;判断sum = nums[k] + nums[i] + nums[j] 三者的和：

- sum == 0:
&emsp;&emsp;这时nums[k],nums[i],nums[j]三个数即为我们所求的三个数，将其插入返回链表中，并且使得i++和j--。
>&emsp;&emsp;这里需要说明一下的是，对两个指针的操作是同时的，简单说一下原因：
&emsp;&emsp;在k不变的情况下，三者之和为0，那么当i++单独执行后，且不与之前的值重复，则更新后的三者必不可能为0，必大于0，此时则需要将 j--；
&emsp;&emsp;反之，若仅仅更新j--，则三者之和必小于0，则下一步必然是更新i++。
&emsp;&emsp;综上两种情况，无论我们怎么变化，都是需要同时变更两个指针，即该操作是需要将两者同时进行更新的，仅仅变更一个指针的话，在下一个循环内会变更另外一个指针，则会多循环一次。

- sum < 0:
三者之和 < 0，则说明值太小了，需要将小一点的数变大，仅有i++可以实现。
- sum > 0:
三者之和 > 0，则说明值太大了，需要将大一点的数变小，仅有j--可以实现。
## 代码示例
```java
class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        Arrays.sort(nums);
        List<List<Integer>> ret = new LinkedList<>();

        // 这里让k < nums.length - 2 ，是保证k在i和j之前。
        for (int k = 0; k < nums.length - 2; k++) {
            if (nums[k] > 0) {
                // 如果连最小的数都是 > 0 ，那么后面的数都是比他大的数，则相加之后必为一个 > 0 的数
                break;
            }

            if (k > 0 && nums[k] == nums[k - 1]) {
                continue;
            }

            int i = k + 1;
            int j = nums.length - 1;

            while (i < j) {
                // nums[i] == nums[i - 1]时，直接跳过即可，因为结果和nums[i - 1]一致
                if (i >= k + 2) {
                    if (nums[i] == nums[i - 1]) {
                        i++;
                        continue;
                    }
                }
                // nums[j] == nums[j + 1]时，直接跳过即可，因为结果和nums[j + 1]一致
                if (j < nums.length -1) {
                    if (nums[j] == nums[j + 1]) {
                        j--;
                        continue;
                    }
                }

                // 判断三者之和是否为0
                if (nums[k] + nums[i] + nums[j] == 0) {
                    List<Integer> list = new LinkedList<>();
                    list.add(nums[k]);
                    list.add(nums[i]);
                    list.add(nums[j]);

                    ret.add(list);
                    // 这里将i和j都进行更新
                    i++;
                    j--;
                } else if (nums[k] + nums[i] + nums[j] > 0) {
                    j--;
                } else {
                    i++;
                }
            }
        }
        return ret;
    }
}
```