---
title: "300. 最长递增子序列 (Longest Increasing Subsequence)"
date: 2026-06-16
category: algorithms
topic: dp
number: 300
difficulty: 中等
tags: [数组, 二分查找, 动态规划]
leetcode_url: "https://leetcode.cn/problems/longest-increasing-subsequence/"
permalink: /leetcode/0300-longest-increasing-subsequence/
layout: leetcode-post
---

## 题目描述

给定整数数组 `nums`，返回最长**严格递增**子序列的长度。

**示例：** `nums = [10,9,2,5,3,7,101,18]` → `4`（`[2,3,7,101]`）。

## 思路分析

**核心思想：** 贪心 + 二分。维护数组 `tails`，`tails[k]` 表示长度为 `k+1` 的递增子序列的**最小末尾**。对每个数二分找到它应替换的位置，从而保持各长度末尾尽量小。

**详细步骤：**

1. 对每个 `n`，在 `tails` 中二分找第一个 ≥ `n` 的位置 `i`。
2. `i == len(tails)` 则追加（序列变长），否则替换 `tails[i] = n`。
3. `tails` 长度即答案。

## 代码实现

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn" data-lang="go" onclick="switchCodeTab(this)">Go</button>
<button class="tab-btn" data-lang="python" onclick="switchCodeTab(this)">Python</button>
</div>
<div class="tab-content" data-lang="go" markdown="1">

```go
func lengthOfLIS(nums []int) int {
    tails := []int{} // tails[k] = 长度 k+1 的 LIS 最小末尾
    for _, n := range nums {
        lo, hi := 0, len(tails)
        for lo < hi {
            mid := (lo + hi) / 2
            if tails[mid] < n {
                lo = mid + 1
            } else {
                hi = mid
            }
        }
        if lo == len(tails) {
            tails = append(tails, n)
        } else {
            tails[lo] = n
        }
    }
    return len(tails)
}
```

</div>
<div class="tab-content" data-lang="python" markdown="1">

```python
import bisect

class Solution:
    def lengthOfLIS(self, nums: List[int]) -> int:
        tails = []
        for n in nums:
            i = bisect.bisect_left(tails, n)
            if i == len(tails):
                tails.append(n)
            else:
                tails[i] = n
        return len(tails)
```

</div>
</div>

## 复杂度分析

| | 时间复杂度 | 空间复杂度 |
|---|---|---|
| Go / Python | O(n·log n) | O(n) |

**解释：** 每个元素一次二分插入。
