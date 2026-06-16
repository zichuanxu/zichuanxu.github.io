---
title: "169. 多数元素 (Majority Element)"
date: 2026-06-16
category: algorithms
topic: tricks
number: 169
difficulty: 简单
tags: [数组, 哈希表, 分治, 计数, 排序]
leetcode_url: "https://leetcode.cn/problems/majority-element/"
permalink: /leetcode/0169-majority-element/
layout: leetcode-post
---

## 题目描述

给定大小为 `n` 的数组，找出出现次数超过 `⌊n/2⌋` 的多数元素（保证存在）。要求线性时间、常数空间。

**示例：** `nums = [2,2,1,1,1,2,2]` → `2`。

## 思路分析

**核心思想：** Boyer-Moore 投票。维护候选与计数：相同则 +1，不同则 -1，计数归零时换候选。由于多数元素超过半数，最终候选必是答案。

**详细步骤：**

1. `candidate = nums[0]`，`count = 0`。
2. 遍历：`count == 0` 时把当前元素设为候选；与候选相同 `count++`，否则 `count--`。

## 代码实现

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn" data-lang="go" onclick="switchCodeTab(this)">Go</button>
<button class="tab-btn" data-lang="python" onclick="switchCodeTab(this)">Python</button>
</div>
<div class="tab-content" data-lang="go" markdown="1">

```go
func majorityElement(nums []int) int {
    candidate, count := nums[0], 0
    for _, n := range nums {
        if count == 0 {
            candidate = n
        }
        if n == candidate {
            count++
        } else {
            count--
        }
    }
    return candidate
}
```

</div>
<div class="tab-content" data-lang="python" markdown="1">

```python
class Solution:
    def majorityElement(self, nums: List[int]) -> int:
        candidate, count = nums[0], 0
        for n in nums:
            if count == 0:
                candidate = n
            count += 1 if n == candidate else -1
        return candidate
```

</div>
</div>

## 复杂度分析

| | 时间复杂度 | 空间复杂度 |
|---|---|---|
| Go / Python | O(n) | O(1) |

**解释：** 一次遍历，只维护候选与计数两个变量。
