---
title: "56. 合并区间 (Merge Intervals)"
date: 2026-06-16
category: algorithms
topic: array
number: 56
difficulty: 中等
tags: [数组, 排序]
leetcode_url: "https://leetcode.cn/problems/merge-intervals/"
permalink: /leetcode/0056-merge-intervals/
layout: leetcode-post
---

## 题目描述

给定若干区间 `intervals`，合并所有重叠区间，返回不重叠的区间数组。

**示例：** `intervals = [[1,3],[2,6],[8,10],[15,18]]` → `[[1,6],[8,10],[15,18]]`。

## 思路分析

**核心思想：** 先按左端点排序，相邻区间若重叠（后者左端 ≤ 前者右端）就合并，否则新开一段。

**详细步骤：**

1. 按 `interval[0]` 升序排序。
2. 结果列表初始放入第一个区间。
3. 遍历其余区间：与结果末尾重叠则更新末尾右端为两者较大值；否则追加。

## 代码实现

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn" data-lang="go" onclick="switchCodeTab(this)">Go</button>
<button class="tab-btn" data-lang="python" onclick="switchCodeTab(this)">Python</button>
</div>
<div class="tab-content" data-lang="go" markdown="1">

```go
func merge(intervals [][]int) [][]int {
    sort.Slice(intervals, func(i, j int) bool {
        return intervals[i][0] < intervals[j][0]
    })
    res := [][]int{intervals[0]}
    for _, cur := range intervals[1:] {
        last := res[len(res)-1]
        if cur[0] <= last[1] { // 重叠，合并
            if cur[1] > last[1] {
                last[1] = cur[1]
            }
        } else {
            res = append(res, cur)
        }
    }
    return res
}
```

</div>
<div class="tab-content" data-lang="python" markdown="1">

```python
class Solution:
    def merge(self, intervals: List[List[int]]) -> List[List[int]]:
        intervals.sort(key=lambda x: x[0])
        res = [intervals[0]]
        for cur in intervals[1:]:
            if cur[0] <= res[-1][1]:
                res[-1][1] = max(res[-1][1], cur[1])
            else:
                res.append(cur)
        return res
```

</div>
</div>

## 复杂度分析

| | 时间复杂度 | 空间复杂度 |
|---|---|---|
| Go / Python | O(n·log n) | O(n) |

**解释：** 排序主导复杂度；一次线性扫描完成合并。
