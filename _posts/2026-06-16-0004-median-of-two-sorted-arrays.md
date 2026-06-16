---
title: "4. 寻找两个正序数组的中位数 (Median of Two Sorted Arrays)"
date: 2026-06-16
category: algorithms
topic: binary-search
number: 4
difficulty: 困难
tags: [数组, 二分查找, 分治]
leetcode_url: "https://leetcode.cn/problems/median-of-two-sorted-arrays/"
permalink: /leetcode/0004-median-of-two-sorted-arrays/
layout: leetcode-post
---

## 题目描述

给定两个正序数组 `nums1`、`nums2`，返回两数组合并后的中位数。要求 O(log(m+n))。

**示例：** `nums1 = [1,3], nums2 = [2]` → `2.0`。

## 思路分析

**核心思想：** 在较短数组上二分「切分点」`i`，对应 `nums2` 的切分点 `j = half - i`，使左半总数为 `(m+n+1)/2`。当 `left1 ≤ right2 && left2 ≤ right1` 时切分合法，由四个边界值得到中位数。

**详细步骤：**

1. 保证在较短数组上二分；`half = (m+n+1)/2`。
2. 取 `i`、`j`，越界处用 ±∞ 兜底。
3. 切分合法即可计算：奇数取 `max(left1,left2)`，偶数取两侧中值平均；否则据 `left1>right2` 调整 `i`。

## 代码实现

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn" data-lang="go" onclick="switchCodeTab(this)">Go</button>
<button class="tab-btn" data-lang="python" onclick="switchCodeTab(this)">Python</button>
</div>
<div class="tab-content" data-lang="go" markdown="1">

```go
func findMedianSortedArrays(nums1 []int, nums2 []int) float64 {
    if len(nums1) > len(nums2) {
        nums1, nums2 = nums2, nums1
    }
    m, n := len(nums1), len(nums2)
    const inf = 1 << 31
    lo, hi := 0, m
    half := (m + n + 1) / 2
    for lo <= hi {
        i := (lo + hi) / 2
        j := half - i
        left1, right1 := -inf, inf
        if i > 0 {
            left1 = nums1[i-1]
        }
        if i < m {
            right1 = nums1[i]
        }
        left2, right2 := -inf, inf
        if j > 0 {
            left2 = nums2[j-1]
        }
        if j < n {
            right2 = nums2[j]
        }
        if left1 <= right2 && left2 <= right1 { // 切分合法
            if (m+n)%2 == 1 {
                return float64(max(left1, left2))
            }
            return float64(max(left1, left2)+min(right1, right2)) / 2.0
        } else if left1 > right2 {
            hi = i - 1
        } else {
            lo = i + 1
        }
    }
    return 0
}
```

</div>
<div class="tab-content" data-lang="python" markdown="1">

```python
class Solution:
    def findMedianSortedArrays(self, nums1: List[int], nums2: List[int]) -> float:
        if len(nums1) > len(nums2):
            nums1, nums2 = nums2, nums1
        m, n = len(nums1), len(nums2)
        lo, hi = 0, m
        half = (m + n + 1) // 2
        while lo <= hi:
            i = (lo + hi) // 2
            j = half - i
            left1 = nums1[i - 1] if i > 0 else float("-inf")
            right1 = nums1[i] if i < m else float("inf")
            left2 = nums2[j - 1] if j > 0 else float("-inf")
            right2 = nums2[j] if j < n else float("inf")
            if left1 <= right2 and left2 <= right1:
                if (m + n) % 2 == 1:
                    return max(left1, left2)
                return (max(left1, left2) + min(right1, right2)) / 2
            elif left1 > right2:
                hi = i - 1
            else:
                lo = i + 1
        return 0.0
```

</div>
</div>

## 复杂度分析

| | 时间复杂度 | 空间复杂度 |
|---|---|---|
| Go / Python | O(log(min(m, n))) | O(1) |

**解释：** 仅在较短数组上二分切分点。
