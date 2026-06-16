---
title: "295. 数据流的中位数 (Find Median from Data Stream)"
date: 2026-06-16
category: algorithms
topic: heap
number: 295
difficulty: 困难
tags: [设计, 双指针, 数据流, 排序, 堆]
leetcode_url: "https://leetcode.cn/problems/find-median-from-data-stream/"
permalink: /leetcode/0295-find-median-from-data-stream/
layout: leetcode-post
---

## 题目描述

设计数据结构支持 `addNum(num)` 添加整数、`findMedian()` 返回当前所有元素的中位数。

**示例：** 添加 `1,2,3` 后 `findMedian()` → `2.0`。

## 思路分析

**核心思想：** 对顶双堆。`lo` 为最大堆存较小一半，`hi` 为最小堆存较大一半，保持 `len(lo) ≥ len(hi)` 且两堆大小差 ≤ 1。中位数由两堆堆顶得到。

**详细步骤：**

1. 新数先入 `lo`，再把 `lo` 堆顶移给 `hi`（保证有序划分）。
2. 若 `hi` 比 `lo` 大，则把 `hi` 堆顶移回 `lo`（维持平衡）。
3. 求中位数：两堆等大取均值，否则取 `lo` 堆顶。

## 代码实现

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn" data-lang="go" onclick="switchCodeTab(this)">Go</button>
<button class="tab-btn" data-lang="python" onclick="switchCodeTab(this)">Python</button>
</div>
<div class="tab-content" data-lang="go" markdown="1">

```go
import "container/heap"

type IntHeap []int

func (h IntHeap) Len() int           { return len(h) }
func (h IntHeap) Less(i, j int) bool { return h[i] < h[j] }
func (h IntHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }
func (h *IntHeap) Push(x any)        { *h = append(*h, x.(int)) }
func (h *IntHeap) Pop() any {
    old := *h
    n := len(old)
    x := old[n-1]
    *h = old[:n-1]
    return x
}

type MedianFinder struct {
    lo *IntHeap // 较小一半，用负数模拟最大堆
    hi *IntHeap // 较大一半，最小堆
}

func Constructor() MedianFinder {
    return MedianFinder{lo: &IntHeap{}, hi: &IntHeap{}}
}

func (mf *MedianFinder) AddNum(num int) {
    heap.Push(mf.lo, -num)
    heap.Push(mf.hi, -heap.Pop(mf.lo).(int))
    if mf.hi.Len() > mf.lo.Len() {
        heap.Push(mf.lo, -heap.Pop(mf.hi).(int))
    }
}

func (mf *MedianFinder) FindMedian() float64 {
    if mf.lo.Len() > mf.hi.Len() {
        return float64(-(*mf.lo)[0])
    }
    return float64(-(*mf.lo)[0]+(*mf.hi)[0]) / 2.0
}
```

</div>
<div class="tab-content" data-lang="python" markdown="1">

```python
import heapq

class MedianFinder:
    def __init__(self):
        self.lo = []  # 最大堆（存负数）
        self.hi = []  # 最小堆

    def addNum(self, num: int) -> None:
        heapq.heappush(self.lo, -num)
        heapq.heappush(self.hi, -heapq.heappop(self.lo))
        if len(self.hi) > len(self.lo):
            heapq.heappush(self.lo, -heapq.heappop(self.hi))

    def findMedian(self) -> float:
        if len(self.lo) > len(self.hi):
            return -self.lo[0]
        return (-self.lo[0] + self.hi[0]) / 2
```

</div>
</div>

## 复杂度分析

| | 时间复杂度 | 空间复杂度 |
|---|---|---|
| Go / Python | addNum O(log n) / findMedian O(1) | O(n) |

**解释：** 每次插入做常数次堆操作；两堆共存 `n` 个元素。
