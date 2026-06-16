---
title: "11. 盛最多水的容器 (Container With Most Water)"
date: 2026-06-16
category: algorithms
topic: two-pointers
number: 11
difficulty: 中等
tags: [数组, 双指针, 贪心]
leetcode_url: "https://leetcode.cn/problems/container-with-most-water/"
permalink: /leetcode/0011-container-with-most-water/
layout: leetcode-post
---

## 题目描述

给定 `n` 条垂线，第 `i` 条高 `height[i]`。选两条线与 x 轴构成容器，求能盛的最大水量。

**示例：** `height = [1,8,6,2,5,4,8,3,7]` → `49`。

## 思路分析

**核心思想：** 左右双指针。容器盛水量 = `min(左高, 右高) × 宽度`；每次移动**较矮**的一侧。

**详细步骤：**

1. `l = 0, r = n-1`，记录最大面积。
2. 面积 = `min(height[l], height[r]) * (r - l)`。
3. 移动较矮一侧：矮板限制了高度，移高板宽度变小、高度不增，面积只会更小，故移矮板才有机会变大。

## 代码实现

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn" data-lang="go" onclick="switchCodeTab(this)">Go</button>
<button class="tab-btn" data-lang="python" onclick="switchCodeTab(this)">Python</button>
</div>
<div class="tab-content" data-lang="go" markdown="1">

```go
func maxArea(height []int) int {
    l, r := 0, len(height)-1
    best := 0
    for l < r {
        h := height[l]
        if height[r] < h {
            h = height[r]
        }
        if area := h * (r - l); area > best {
            best = area
        }
        if height[l] < height[r] {
            l++
        } else {
            r--
        }
    }
    return best
}
```

</div>
<div class="tab-content" data-lang="python" markdown="1">

```python
class Solution:
    def maxArea(self, height: List[int]) -> int:
        l, r = 0, len(height) - 1
        best = 0
        while l < r:
            best = max(best, min(height[l], height[r]) * (r - l))
            if height[l] < height[r]:
                l += 1
            else:
                r -= 1
        return best
```

</div>
</div>

## 复杂度分析

| | 时间复杂度 | 空间复杂度 |
|---|---|---|
| Go / Python | O(n) | O(1) |

**解释：** 双指针相向移动一次遍历。
