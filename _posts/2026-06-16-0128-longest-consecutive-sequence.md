---
title: "128. 最长连续序列 (Longest Consecutive Sequence)"
date: 2026-06-16
category: algorithms
topic: hash
number: 128
difficulty: 中等
tags: [哈希表, 并查集, 数组]
leetcode_url: "https://leetcode.cn/problems/longest-consecutive-sequence/"
permalink: /leetcode/0128-longest-consecutive-sequence/
layout: leetcode-post
---

## 题目描述

给定一个未排序的整数数组 `nums`，找出数字连续的最长序列的长度（序列元素不要求在原数组中相邻）。要求时间复杂度 **O(n)**。

**示例：** `nums = [100,4,200,1,3,2]` → `4`（最长连续序列是 `[1,2,3,4]`）。

## 思路分析

**核心思想：** 用哈希集合存所有数；只从「序列起点」开始向上枚举，避免重复计数。

**详细步骤：**

1. 把所有数放入集合 `set`。
2. 对每个数 `n`，若 `n-1` 在集合中则它不是起点，跳过。
3. 否则从 `n` 向上数 `n+1, n+2, ...`，统计该序列长度并更新答案。

> 每个数最多被内层循环访问一次，整体仍是 O(n)。

## 代码实现

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn" data-lang="go" onclick="switchCodeTab(this)">Go</button>
<button class="tab-btn" data-lang="python" onclick="switchCodeTab(this)">Python</button>
</div>
<div class="tab-content" data-lang="go" markdown="1">

```go
func longestConsecutive(nums []int) int {
    set := make(map[int]bool)
    for _, n := range nums {
        set[n] = true
    }
    best := 0
    for n := range set {
        if set[n-1] {
            continue // 不是序列起点
        }
        length := 1
        for set[n+length] {
            length++
        }
        if length > best {
            best = length
        }
    }
    return best
}
```

</div>
<div class="tab-content" data-lang="python" markdown="1">

```python
class Solution:
    def longestConsecutive(self, nums: List[int]) -> int:
        s = set(nums)
        best = 0
        for n in s:
            if n - 1 in s:
                continue  # 不是序列起点
            length = 1
            while n + length in s:
                length += 1
            best = max(best, length)
        return best
```

</div>
</div>

## 复杂度分析

| | 时间复杂度 | 空间复杂度 |
|---|---|---|
| Go / Python | O(n) | O(n) |

**解释：** 集合查找均摊 O(1)；每个数仅作为起点向上扩展一次。
