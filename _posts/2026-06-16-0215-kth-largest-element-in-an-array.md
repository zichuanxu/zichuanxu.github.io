---
title: "215. 数组中的第 K 个最大元素 (Kth Largest Element in an Array)"
date: 2026-06-16
category: algorithms
topic: heap
number: 215
difficulty: 中等
tags: [数组, 分治, 快速选择, 排序, 堆]
leetcode_url: "https://leetcode.cn/problems/kth-largest-element-in-an-array/"
permalink: /leetcode/0215-kth-largest-element-in-an-array/
layout: leetcode-post
---

## 题目描述

给定整数数组 `nums` 和整数 `k`，返回数组中第 `k` 个最大的元素（不是第 `k` 个不同元素）。

**示例：** `nums = [3,2,1,5,6,4], k = 2` → `5`。

## 思路分析

**核心思想：** 两种最优解——维护「大小为 `k` 的最小堆」（堆顶即第 `k` 大，O(n log k)），或**快速选择**（基于快排分区，平均 O(n)）。下面 Go 用快速选择，Python 用最小堆。

**详细步骤（快速选择）：**

1. 第 `k` 大等于升序排序后下标 `len-k` 的元素。
2. 每次分区后看基准落点 `p` 与目标的关系，只递归需要的一侧。

## 代码实现

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn" data-lang="go" onclick="switchCodeTab(this)">Go</button>
<button class="tab-btn" data-lang="python" onclick="switchCodeTab(this)">Python</button>
</div>
<div class="tab-content" data-lang="go" markdown="1">

```go
func findKthLargest(nums []int, k int) int {
    target := len(nums) - k // 第 k 大 = 升序下标 len-k
    lo, hi := 0, len(nums)-1
    for {
        p := partition(nums, lo, hi)
        if p == target {
            return nums[p]
        } else if p < target {
            lo = p + 1
        } else {
            hi = p - 1
        }
    }
}

func partition(nums []int, lo, hi int) int {
    pivot := nums[hi]
    i := lo
    for j := lo; j < hi; j++ {
        if nums[j] < pivot {
            nums[i], nums[j] = nums[j], nums[i]
            i++
        }
    }
    nums[i], nums[hi] = nums[hi], nums[i]
    return i
}
```

</div>
<div class="tab-content" data-lang="python" markdown="1">

```python
import heapq

class Solution:
    def findKthLargest(self, nums: List[int], k: int) -> int:
        heap = nums[:k]
        heapq.heapify(heap)  # 大小为 k 的最小堆
        for n in nums[k:]:
            if n > heap[0]:
                heapq.heapreplace(heap, n)
        return heap[0]
```

</div>
</div>

## 复杂度分析

| | 时间复杂度 | 空间复杂度 |
|---|---|---|
| 快速选择 (Go) | 平均 O(n) | O(1) |
| 最小堆 (Python) | O(n·log k) | O(k) |

**解释：** 快速选择平均线性、最坏 O(n²)；堆法稳定 O(n log k)。
