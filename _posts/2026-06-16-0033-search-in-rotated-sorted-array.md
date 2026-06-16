---
title: "33. 搜索旋转排序数组 (Search in Rotated Sorted Array)"
date: 2026-06-16
category: algorithms
topic: binary-search
number: 33
difficulty: 中等
tags: [数组, 二分查找]
leetcode_url: "https://leetcode.cn/problems/search-in-rotated-sorted-array/"
permalink: /leetcode/0033-search-in-rotated-sorted-array/
layout: leetcode-post
---

## 题目描述

升序数组在某点旋转后得到 `nums`（元素互不相同），查找 `target` 的下标，不存在返回 `-1`。要求 O(log n)。

**示例：** `nums = [4,5,6,7,0,1,2], target = 0` → `4`。

## 思路分析

**核心思想：** 二分时，`mid` 的左右两半至少有一半是有序的。判断哪半有序，再看 `target` 是否落在该有序半区间内，决定收缩方向。

**详细步骤：**

1. 若 `nums[mid] == target` 直接返回。
2. 若 `nums[lo] <= nums[mid]` 则左半有序：`target` 在 `[nums[lo], nums[mid])` 内则收右，否则收左。
3. 否则右半有序，对称处理。

## 代码实现

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn" data-lang="go" onclick="switchCodeTab(this)">Go</button>
<button class="tab-btn" data-lang="python" onclick="switchCodeTab(this)">Python</button>
</div>
<div class="tab-content" data-lang="go" markdown="1">

```go
func search(nums []int, target int) int {
    lo, hi := 0, len(nums)-1
    for lo <= hi {
        mid := (lo + hi) / 2
        if nums[mid] == target {
            return mid
        }
        if nums[lo] <= nums[mid] { // 左半有序
            if nums[lo] <= target && target < nums[mid] {
                hi = mid - 1
            } else {
                lo = mid + 1
            }
        } else { // 右半有序
            if nums[mid] < target && target <= nums[hi] {
                lo = mid + 1
            } else {
                hi = mid - 1
            }
        }
    }
    return -1
}
```

</div>
<div class="tab-content" data-lang="python" markdown="1">

```python
class Solution:
    def search(self, nums: List[int], target: int) -> int:
        lo, hi = 0, len(nums) - 1
        while lo <= hi:
            mid = (lo + hi) // 2
            if nums[mid] == target:
                return mid
            if nums[lo] <= nums[mid]:
                if nums[lo] <= target < nums[mid]:
                    hi = mid - 1
                else:
                    lo = mid + 1
            else:
                if nums[mid] < target <= nums[hi]:
                    lo = mid + 1
                else:
                    hi = mid - 1
        return -1
```

</div>
</div>

## 复杂度分析

| | 时间复杂度 | 空间复杂度 |
|---|---|---|
| Go / Python | O(log n) | O(1) |

**解释：** 每轮排除一半区间。
