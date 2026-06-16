---
title: "416. 分割等和子集 (Partition Equal Subset Sum)"
date: 2026-06-16
category: algorithms
topic: dp
number: 416
difficulty: 中等
tags: [数组, 动态规划]
leetcode_url: "https://leetcode.cn/problems/partition-equal-subset-sum/"
permalink: /leetcode/0416-partition-equal-subset-sum/
layout: leetcode-post
---

## 题目描述

给定只含正整数的数组 `nums`，判断能否将其分成两个子集，使两子集元素和相等。

**示例：** `nums = [1,5,11,5]` → `true`（`[1,5,5]` 与 `[11]`）。

## 思路分析

**核心思想：** 转化为 0/1 背包：能否选出若干元素恰好凑出 `sum/2`。`dp[j]` 表示能否凑出和 `j`；对每个数倒序更新容量。

**详细步骤：**

1. 总和为奇数直接返回 `false`；目标 `target = sum/2`。
2. `dp[0] = true`；对每个数 `n`，从 `target` 倒序到 `n` 更新 `dp[j] |= dp[j-n]`。
3. 返回 `dp[target]`。

## 代码实现

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn" data-lang="go" onclick="switchCodeTab(this)">Go</button>
<button class="tab-btn" data-lang="python" onclick="switchCodeTab(this)">Python</button>
</div>
<div class="tab-content" data-lang="go" markdown="1">

```go
func canPartition(nums []int) bool {
    sum := 0
    for _, n := range nums {
        sum += n
    }
    if sum%2 != 0 {
        return false
    }
    target := sum / 2
    dp := make([]bool, target+1)
    dp[0] = true
    for _, n := range nums {
        for j := target; j >= n; j-- { // 倒序保证每个数只用一次
            if dp[j-n] {
                dp[j] = true
            }
        }
    }
    return dp[target]
}
```

</div>
<div class="tab-content" data-lang="python" markdown="1">

```python
class Solution:
    def canPartition(self, nums: List[int]) -> bool:
        total = sum(nums)
        if total % 2:
            return False
        target = total // 2
        dp = [True] + [False] * target
        for n in nums:
            for j in range(target, n - 1, -1):
                if dp[j - n]:
                    dp[j] = True
        return dp[target]
```

</div>
</div>

## 复杂度分析

| | 时间复杂度 | 空间复杂度 |
|---|---|---|
| Go / Python | O(n·sum) | O(sum) |

**解释：** 0/1 背包：物品数 × 目标容量；一维数组倒序更新。
