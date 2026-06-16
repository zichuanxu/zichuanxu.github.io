---
title: "347. 前 K 个高频元素 (Top K Frequent Elements)"
date: 2026-06-16
category: algorithms
topic: heap
number: 347
difficulty: 中等
tags: [数组, 哈希表, 分治, 桶排序, 计数, 快速选择, 堆]
leetcode_url: "https://leetcode.cn/problems/top-k-frequent-elements/"
permalink: /leetcode/0347-top-k-frequent-elements/
layout: leetcode-post
---

## 题目描述

给定整数数组 `nums` 和整数 `k`，返回出现频率前 `k` 高的元素（答案顺序任意）。

**示例：** `nums = [1,1,1,2,2,3], k = 2` → `[1,2]`。

## 思路分析

**核心思想：** 先用哈希表统计频率。Go 用**桶排序**（频次作下标，O(n)）；Python 直接用 `Counter.most_common`。

**详细步骤（桶排序）：**

1. 统计每个数的出现次数。
2. 以「频次」为下标建桶，把数字放进对应桶。
3. 从高频桶向低频桶取，凑满 `k` 个。

## 代码实现

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn" data-lang="go" onclick="switchCodeTab(this)">Go</button>
<button class="tab-btn" data-lang="python" onclick="switchCodeTab(this)">Python</button>
</div>
<div class="tab-content" data-lang="go" markdown="1">

```go
func topKFrequent(nums []int, k int) []int {
    freq := make(map[int]int)
    for _, n := range nums {
        freq[n]++
    }
    buckets := make([][]int, len(nums)+1) // 频次 -> 数字列表
    for n, c := range freq {
        buckets[c] = append(buckets[c], n)
    }
    res := []int{}
    for c := len(buckets) - 1; c >= 0 && len(res) < k; c-- {
        for _, n := range buckets[c] {
            res = append(res, n)
            if len(res) == k {
                break
            }
        }
    }
    return res
}
```

</div>
<div class="tab-content" data-lang="python" markdown="1">

```python
from collections import Counter

class Solution:
    def topKFrequent(self, nums: List[int], k: int) -> List[int]:
        count = Counter(nums)
        return [n for n, _ in count.most_common(k)]
```

</div>
</div>

## 复杂度分析

| | 时间复杂度 | 空间复杂度 |
|---|---|---|
| Go / Python | O(n) | O(n) |

**解释：** 计数 O(n)，桶收集 O(n)；`most_common(k)` 基于堆/计数同样高效。
