---
title: "53. 最大子数组和 (Maximum Subarray)"
date: 2026-06-16
category: algorithms
topic: array
number: 53
difficulty: 中等
tags: [数组, 动态规划, 分治]
leetcode_url: "https://leetcode.cn/problems/maximum-subarray/"
permalink: /leetcode/0053-maximum-subarray/
layout: leetcode-post
---

## 题目描述

给定整数数组 `nums`，找出具有最大和的连续子数组，返回其最大和。

**示例：** `nums = [-2,1,-3,4,-1,2,1,-5,4]` → `6`（子数组 `[4,-1,2,1]`）。

## 思路分析

**核心思想：** Kadane 算法。`cur` 表示以当前元素结尾的最大子数组和：若前面的和为负则丢弃，从当前元素重新开始。

**详细步骤：**

1. `cur = best = nums[0]`。
2. 遍历后续元素：`cur = max(nums[i], cur + nums[i])`。
3. 用 `cur` 更新全局最大 `best`。

## 代码实现

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn" data-lang="go" onclick="switchCodeTab(this)">Go</button>
<button class="tab-btn" data-lang="python" onclick="switchCodeTab(this)">Python</button>
</div>
<div class="tab-content" data-lang="go" markdown="1">

```go
func maxSubArray(nums []int) int {
    best, cur := nums[0], nums[0]
    for i := 1; i < len(nums); i++ {
        if cur < 0 {
            cur = nums[i] // 前缀为负，丢弃
        } else {
            cur += nums[i]
        }
        if cur > best {
            best = cur
        }
    }
    return best
}
```

</div>
<div class="tab-content" data-lang="python" markdown="1">

```python
class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        best = cur = nums[0]
        for n in nums[1:]:
            cur = n if cur < 0 else cur + n
            best = max(best, cur)
        return best
```

</div>
</div>

## 复杂度分析

| | 时间复杂度 | 空间复杂度 |
|---|---|---|
| Go / Python | O(n) | O(1) |

**解释：** 一次遍历，常数空间维护当前与全局最大。
