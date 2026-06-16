---
title: "31. 下一个排列 (Next Permutation)"
date: 2026-06-16
category: algorithms
topic: tricks
number: 31
difficulty: 中等
tags: [数组, 双指针]
leetcode_url: "https://leetcode.cn/problems/next-permutation/"
permalink: /leetcode/0031-next-permutation/
layout: leetcode-post
---

## 题目描述

实现「下一个排列」：原地把数组重排为字典序中下一个更大的排列；若已是最大则变为最小（升序）。常数额外空间。

**示例：** `[1,2,3]` → `[1,3,2]`；`[3,2,1]` → `[1,2,3]`。

## 思路分析

**核心思想：** 从右找第一个「升序对」的左元素 `i`（即 `nums[i] < nums[i+1]`）；在其右侧找比 `nums[i]` 大的最小元素交换，再把 `i` 之后的降序后缀反转为升序。

**详细步骤：**

1. 从右向左找第一个 `nums[i] < nums[i+1]`。
2. 若存在，从右找第一个大于 `nums[i]` 的 `nums[j]`，交换二者。
3. 反转下标 `i+1` 到末尾的后缀（使其最小）。

## 代码实现

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn" data-lang="go" onclick="switchCodeTab(this)">Go</button>
<button class="tab-btn" data-lang="python" onclick="switchCodeTab(this)">Python</button>
</div>
<div class="tab-content" data-lang="go" markdown="1">

```go
func nextPermutation(nums []int) {
    n := len(nums)
    i := n - 2
    for i >= 0 && nums[i] >= nums[i+1] {
        i-- // 找第一个升序对的左元素
    }
    if i >= 0 {
        j := n - 1
        for nums[j] <= nums[i] {
            j--
        }
        nums[i], nums[j] = nums[j], nums[i]
    }
    for l, r := i+1, n-1; l < r; l, r = l+1, r-1 { // 反转后缀
        nums[l], nums[r] = nums[r], nums[l]
    }
}
```

</div>
<div class="tab-content" data-lang="python" markdown="1">

```python
class Solution:
    def nextPermutation(self, nums: List[int]) -> None:
        n = len(nums)
        i = n - 2
        while i >= 0 and nums[i] >= nums[i + 1]:
            i -= 1
        if i >= 0:
            j = n - 1
            while nums[j] <= nums[i]:
                j -= 1
            nums[i], nums[j] = nums[j], nums[i]
        left, right = i + 1, n - 1
        while left < right:
            nums[left], nums[right] = nums[right], nums[left]
            left += 1
            right -= 1
```

</div>
</div>

## 复杂度分析

| | 时间复杂度 | 空间复杂度 |
|---|---|---|
| Go / Python | O(n) | O(1) |

**解释：** 至多三次线性扫描（查找、交换、反转），原地完成。
