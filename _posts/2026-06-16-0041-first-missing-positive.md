---
title: "41. 缺失的第一个正数 (First Missing Positive)"
date: 2026-06-16
category: algorithms
topic: array
number: 41
difficulty: 困难
tags: [数组, 哈希表, 原地]
leetcode_url: "https://leetcode.cn/problems/first-missing-positive/"
permalink: /leetcode/0041-first-missing-positive/
layout: leetcode-post
---

## 题目描述

给定未排序的整数数组 `nums`，找出其中没有出现的最小正整数。要求 O(n) 时间、O(1) 额外空间。

**示例：** `nums = [3,4,-1,1]` → `2`。

## 思路分析

**核心思想：** 原地哈希。长度为 `n` 的数组，答案必在 `[1, n+1]`。把值 `v`（`1 ≤ v ≤ n`）放到下标 `v-1` 处，再扫描第一个「位置与值不匹配」的下标。

**详细步骤：**

1. 对每个位置，反复把 `nums[i]` 交换到它该在的位置 `nums[i]-1`，直到无法再放。
2. 再次遍历，第一个 `nums[i] != i+1` 的 `i+1` 即答案。
3. 若全部就位，答案为 `n+1`。

## 代码实现

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn" data-lang="go" onclick="switchCodeTab(this)">Go</button>
<button class="tab-btn" data-lang="python" onclick="switchCodeTab(this)">Python</button>
</div>
<div class="tab-content" data-lang="go" markdown="1">

```go
func firstMissingPositive(nums []int) int {
    n := len(nums)
    for i := 0; i < n; i++ {
        // 把 nums[i] 放到正确位置（索引提前求值，交换安全）
        for nums[i] > 0 && nums[i] <= n && nums[nums[i]-1] != nums[i] {
            nums[i], nums[nums[i]-1] = nums[nums[i]-1], nums[i]
        }
    }
    for i := 0; i < n; i++ {
        if nums[i] != i+1 {
            return i + 1
        }
    }
    return n + 1
}
```

</div>
<div class="tab-content" data-lang="python" markdown="1">

```python
class Solution:
    def firstMissingPositive(self, nums: List[int]) -> int:
        n = len(nums)
        for i in range(n):
            while 0 < nums[i] <= n and nums[nums[i] - 1] != nums[i]:
                j = nums[i] - 1  # 先固定目标下标
                nums[i], nums[j] = nums[j], nums[i]
        for i in range(n):
            if nums[i] != i + 1:
                return i + 1
        return n + 1
```

</div>
</div>

## 复杂度分析

| | 时间复杂度 | 空间复杂度 |
|---|---|---|
| Go / Python | O(n) | O(1) |

**解释：** 每次交换都让一个元素归位，总交换次数 O(n)；原地操作。
