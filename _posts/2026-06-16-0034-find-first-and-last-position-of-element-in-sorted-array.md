---
title: "34. 在排序数组中查找元素的第一个和最后一个位置 (Find First and Last Position)"
date: 2026-06-16
category: algorithms
topic: binary-search
number: 34
difficulty: 中等
tags: [数组, 二分查找]
leetcode_url: "https://leetcode.cn/problems/find-first-and-last-position-of-element-in-sorted-array/"
permalink: /leetcode/0034-find-first-and-last-position-of-element-in-sorted-array/
layout: leetcode-post
---

## 题目描述

给定升序数组 `nums` 和目标 `target`，返回其开始与结束下标；不存在返回 `[-1, -1]`。要求 O(log n)。

**示例：** `nums = [5,7,7,8,8,10], target = 8` → `[3,4]`。

## 思路分析

**核心思想：** 用两次「lower bound」。`lower(target)` 是第一个 ≥ target 的位置；`lower(target+1) - 1` 是最后一个等于 target 的位置。

**详细步骤：**

1. `left = lower(target)`；若越界或 `nums[left] != target` 则不存在。
2. `right = lower(target+1) - 1`。
3. 返回 `[left, right]`。

## 代码实现

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn" data-lang="go" onclick="switchCodeTab(this)">Go</button>
<button class="tab-btn" data-lang="python" onclick="switchCodeTab(this)">Python</button>
</div>
<div class="tab-content" data-lang="go" markdown="1">

```go
func searchRange(nums []int, target int) []int {
    lower := func(t int) int { // 第一个 >= t 的下标
        lo, hi := 0, len(nums)
        for lo < hi {
            mid := (lo + hi) / 2
            if nums[mid] < t {
                lo = mid + 1
            } else {
                hi = mid
            }
        }
        return lo
    }
    left := lower(target)
    if left == len(nums) || nums[left] != target {
        return []int{-1, -1}
    }
    return []int{left, lower(target+1) - 1}
}
```

</div>
<div class="tab-content" data-lang="python" markdown="1">

```python
class Solution:
    def searchRange(self, nums: List[int], target: int) -> List[int]:
        def lower(t):
            lo, hi = 0, len(nums)
            while lo < hi:
                mid = (lo + hi) // 2
                if nums[mid] < t:
                    lo = mid + 1
                else:
                    hi = mid
            return lo
        left = lower(target)
        if left == len(nums) or nums[left] != target:
            return [-1, -1]
        return [left, lower(target + 1) - 1]
```

</div>
</div>

## 复杂度分析

| | 时间复杂度 | 空间复杂度 |
|---|---|---|
| Go / Python | O(log n) | O(1) |

**解释：** 两次二分，各 O(log n)。
