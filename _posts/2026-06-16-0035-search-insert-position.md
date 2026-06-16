---
title: "35. 搜索插入位置 (Search Insert Position)"
date: 2026-06-16
category: algorithms
topic: binary-search
number: 35
difficulty: 简单
tags: [数组, 二分查找]
leetcode_url: "https://leetcode.cn/problems/search-insert-position/"
permalink: /leetcode/0035-search-insert-position/
layout: leetcode-post
---

## 题目描述

给定升序数组 `nums` 和目标 `target`，若存在返回其下标，否则返回它**按序插入**的位置。要求 O(log n)。

**示例：** `nums = [1,3,5,6], target = 5` → `2`；`target = 2` → `1`。

## 思路分析

**核心思想：** 二分查找「第一个 ≥ target 的位置」（lower bound），该位置正是插入点。

**详细步骤：**

1. `lo = 0, hi = n`（左闭右开）。
2. `nums[mid] < target` 时 `lo = mid+1`，否则 `hi = mid`。
3. 收敛后 `lo` 即答案。

## 代码实现

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn" data-lang="go" onclick="switchCodeTab(this)">Go</button>
<button class="tab-btn" data-lang="python" onclick="switchCodeTab(this)">Python</button>
</div>
<div class="tab-content" data-lang="go" markdown="1">

```go
func searchInsert(nums []int, target int) int {
    lo, hi := 0, len(nums)
    for lo < hi {
        mid := (lo + hi) / 2
        if nums[mid] < target {
            lo = mid + 1
        } else {
            hi = mid
        }
    }
    return lo
}
```

</div>
<div class="tab-content" data-lang="python" markdown="1">

```python
class Solution:
    def searchInsert(self, nums: List[int], target: int) -> int:
        lo, hi = 0, len(nums)
        while lo < hi:
            mid = (lo + hi) // 2
            if nums[mid] < target:
                lo = mid + 1
            else:
                hi = mid
        return lo
```

</div>
</div>

## 复杂度分析

| | 时间复杂度 | 空间复杂度 |
|---|---|---|
| Go / Python | O(log n) | O(1) |

**解释：** 每轮折半搜索区间。
