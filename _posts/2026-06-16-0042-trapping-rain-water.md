---
title: "42. 接雨水 (Trapping Rain Water)"
date: 2026-06-16
category: algorithms
topic: two-pointers
number: 42
difficulty: 困难
tags: [数组, 双指针, 动态规划, 单调栈]
leetcode_url: "https://leetcode.cn/problems/trapping-rain-water/"
permalink: /leetcode/0042-trapping-rain-water/
layout: leetcode-post
---

## 题目描述

给定 `n` 个非负整数表示柱状图，每根柱宽为 `1`，计算下雨后能接多少雨水。

**示例：** `height = [0,1,0,2,1,0,1,3,2,1,2,1]` → `6`。

## 思路分析

**核心思想：** 位置 `i` 能存的水 = `min(左侧最高, 右侧最高) - height[i]`。用左右双指针在 O(1) 空间内完成。

**详细步骤：**

1. `l, r` 指向两端，维护 `leftMax / rightMax`。
2. 哪侧的柱**更矮**就结算哪侧：该侧的存水量只由本侧的最大值决定（对侧一定不低于它）。
3. 更新对应的 `Max`，累加 `Max - height[当前]`，指针内移。

## 代码实现

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn" data-lang="go" onclick="switchCodeTab(this)">Go</button>
<button class="tab-btn" data-lang="python" onclick="switchCodeTab(this)">Python</button>
</div>
<div class="tab-content" data-lang="go" markdown="1">

```go
func trap(height []int) int {
    l, r := 0, len(height)-1
    leftMax, rightMax, water := 0, 0, 0
    for l < r {
        if height[l] < height[r] {
            if height[l] >= leftMax {
                leftMax = height[l]
            } else {
                water += leftMax - height[l]
            }
            l++
        } else {
            if height[r] >= rightMax {
                rightMax = height[r]
            } else {
                water += rightMax - height[r]
            }
            r--
        }
    }
    return water
}
```

</div>
<div class="tab-content" data-lang="python" markdown="1">

```python
class Solution:
    def trap(self, height: List[int]) -> int:
        l, r = 0, len(height) - 1
        left_max = right_max = water = 0
        while l < r:
            if height[l] < height[r]:
                if height[l] >= left_max:
                    left_max = height[l]
                else:
                    water += left_max - height[l]
                l += 1
            else:
                if height[r] >= right_max:
                    right_max = height[r]
                else:
                    water += right_max - height[r]
                r -= 1
        return water
```

</div>
</div>

## 复杂度分析

| | 时间复杂度 | 空间复杂度 |
|---|---|---|
| Go / Python | O(n) | O(1) |

**解释：** 双指针一次遍历，仅用常数额外变量。
