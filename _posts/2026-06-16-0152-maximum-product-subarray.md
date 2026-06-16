---
title: "152. 乘积最大子数组 (Maximum Product Subarray)"
date: 2026-06-16
category: algorithms
topic: dp
number: 152
difficulty: 中等
tags: [数组, 动态规划]
leetcode_url: "https://leetcode.cn/problems/maximum-product-subarray/"
permalink: /leetcode/0152-maximum-product-subarray/
layout: leetcode-post
---

## 题目描述

给定整数数组 `nums`，找出乘积最大的非空连续子数组，返回其乘积。

**示例：** `nums = [2,3,-2,4]` → `6`（子数组 `[2,3]`）。

## 思路分析

**核心思想：** 由于负数会让最大变最小、最小变最大，需同时维护以当前元素结尾的**最大**乘积 `curMax` 与**最小**乘积 `curMin`；遇到负数时交换二者。

**详细步骤：**

1. 初始 `best = curMax = curMin = nums[0]`。
2. 遇到负数先交换 `curMax`、`curMin`。
3. `curMax = max(n, curMax*n)`，`curMin = min(n, curMin*n)`，用 `curMax` 更新答案。

## 代码实现

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn" data-lang="go" onclick="switchCodeTab(this)">Go</button>
<button class="tab-btn" data-lang="python" onclick="switchCodeTab(this)">Python</button>
</div>
<div class="tab-content" data-lang="go" markdown="1">

```go
func maxProduct(nums []int) int {
    best, curMax, curMin := nums[0], nums[0], nums[0]
    for i := 1; i < len(nums); i++ {
        n := nums[i]
        if n < 0 {
            curMax, curMin = curMin, curMax // 负数翻转极值
        }
        curMax = max(n, curMax*n)
        curMin = min(n, curMin*n)
        best = max(best, curMax)
    }
    return best
}
```

</div>
<div class="tab-content" data-lang="python" markdown="1">

```python
class Solution:
    def maxProduct(self, nums: List[int]) -> int:
        best = cur_max = cur_min = nums[0]
        for n in nums[1:]:
            if n < 0:
                cur_max, cur_min = cur_min, cur_max
            cur_max = max(n, cur_max * n)
            cur_min = min(n, cur_min * n)
            best = max(best, cur_max)
        return best
```

</div>
</div>

## 复杂度分析

| | 时间复杂度 | 空间复杂度 |
|---|---|---|
| Go / Python | O(n) | O(1) |

**解释：** 一次遍历，常数变量维护最大/最小乘积。
