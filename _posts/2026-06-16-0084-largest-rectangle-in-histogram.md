---
title: "84. 柱状图中最大的矩形 (Largest Rectangle in Histogram)"
date: 2026-06-16
category: algorithms
topic: stack
number: 84
difficulty: 困难
tags: [栈, 数组, 单调栈]
leetcode_url: "https://leetcode.cn/problems/largest-rectangle-in-histogram/"
permalink: /leetcode/0084-largest-rectangle-in-histogram/
layout: leetcode-post
---

## 题目描述

给定柱状图各柱高度 `heights`（宽均为 1），求能勾勒出的最大矩形面积。

**示例：** `heights = [2,1,5,6,2,3]` → `10`（高 5、6 那两根，宽 2）。

## 思路分析

**核心思想：** 单调递增栈。对每根柱，找它左右两侧第一根更矮的柱，其间宽度即以该柱为高的最大矩形。两端加哨兵 `0` 简化边界。

**详细步骤：**

1. 在 `heights` 首尾各加一个 `0`。
2. 维护下标单调递增栈；遇到更矮的柱时弹栈结算：`高 = heights[top]`，`宽 = i - 新栈顶 - 1`。
3. 取所有结算面积的最大值。

## 代码实现

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn" data-lang="go" onclick="switchCodeTab(this)">Go</button>
<button class="tab-btn" data-lang="python" onclick="switchCodeTab(this)">Python</button>
</div>
<div class="tab-content" data-lang="go" markdown="1">

```go
func largestRectangleArea(heights []int) int {
    heights = append([]int{0}, append(heights, 0)...) // 两端哨兵
    stack := []int{}
    best := 0
    for i, h := range heights {
        for len(stack) > 0 && heights[stack[len(stack)-1]] > h {
            top := stack[len(stack)-1]
            stack = stack[:len(stack)-1]
            width := i - stack[len(stack)-1] - 1
            if area := heights[top] * width; area > best {
                best = area
            }
        }
        stack = append(stack, i)
    }
    return best
}
```

</div>
<div class="tab-content" data-lang="python" markdown="1">

```python
class Solution:
    def largestRectangleArea(self, heights: List[int]) -> int:
        heights = [0] + heights + [0]  # 两端哨兵
        stack, best = [], 0
        for i, h in enumerate(heights):
            while stack and heights[stack[-1]] > h:
                top = stack.pop()
                width = i - stack[-1] - 1
                best = max(best, heights[top] * width)
            stack.append(i)
        return best
```

</div>
</div>

## 复杂度分析

| | 时间复杂度 | 空间复杂度 |
|---|---|---|
| Go / Python | O(n) | O(n) |

**解释：** 每根柱至多入栈出栈一次；哨兵保证栈被清空结算。
