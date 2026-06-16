---
title: "153. 寻找旋转排序数组中的最小值 (Find Minimum in Rotated Sorted Array)"
date: 2026-06-16
category: algorithms
topic: binary-search
number: 153
difficulty: 中等
tags: [数组, 二分查找]
leetcode_url: "https://leetcode.cn/problems/find-minimum-in-rotated-sorted-array/"
permalink: /leetcode/0153-find-minimum-in-rotated-sorted-array/
layout: leetcode-post
---

## 题目描述

升序数组（元素互不相同）旋转后得到 `nums`，找出其中的最小元素。要求 O(log n)。

**示例：** `nums = [4,5,6,7,0,1,2]` → `0`。

## 思路分析

**核心思想：** 二分。把 `nums[mid]` 与 `nums[hi]` 比较：若 `nums[mid] > nums[hi]`，最小值必在右半（`lo = mid+1`）；否则在左半或就是 `mid`（`hi = mid`）。

**详细步骤：**

1. `lo, hi` 为首尾下标。
2. 按上述规则收缩，直到 `lo == hi`。
3. `nums[lo]` 即最小值。

## 代码实现

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn" data-lang="go" onclick="switchCodeTab(this)">Go</button>
<button class="tab-btn" data-lang="python" onclick="switchCodeTab(this)">Python</button>
</div>
<div class="tab-content" data-lang="go" markdown="1">

```go
func findMin(nums []int) int {
    lo, hi := 0, len(nums)-1
    for lo < hi {
        mid := (lo + hi) / 2
        if nums[mid] > nums[hi] {
            lo = mid + 1 // 最小值在右半
        } else {
            hi = mid
        }
    }
    return nums[lo]
}
```

</div>
<div class="tab-content" data-lang="python" markdown="1">

```python
class Solution:
    def findMin(self, nums: List[int]) -> int:
        lo, hi = 0, len(nums) - 1
        while lo < hi:
            mid = (lo + hi) // 2
            if nums[mid] > nums[hi]:
                lo = mid + 1
            else:
                hi = mid
        return nums[lo]
```

</div>
</div>

## 复杂度分析

| | 时间复杂度 | 空间复杂度 |
|---|---|---|
| Go / Python | O(log n) | O(1) |

**解释：** 每轮折半，与右端点比较确定最小值所在半区。
