---
title: "279. 完全平方数 (Perfect Squares)"
date: 2026-06-16
category: algorithms
topic: dp
number: 279
difficulty: 中等
tags: [广度优先搜索, 数学, 动态规划]
leetcode_url: "https://leetcode.cn/problems/perfect-squares/"
permalink: /leetcode/0279-perfect-squares/
layout: leetcode-post
---

## 题目描述

给定正整数 `n`，返回和为 `n` 的完全平方数的最少数量。

**示例：** `n = 12` → `3`（`4+4+4`）；`n = 13` → `2`（`4+9`）。

## 思路分析

**核心思想：** 完全背包式 DP。`dp[i]` = 凑出 `i` 所需最少平方数；枚举平方数 `j*j ≤ i`，`dp[i] = min(dp[i], dp[i-j*j] + 1)`。

**详细步骤：**

1. `dp[i]` 初始化为 `i`（全用 1）。
2. 对每个 `i`，枚举 `j` 使 `j*j ≤ i` 转移取最小。

## 代码实现

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn" data-lang="go" onclick="switchCodeTab(this)">Go</button>
<button class="tab-btn" data-lang="python" onclick="switchCodeTab(this)">Python</button>
</div>
<div class="tab-content" data-lang="go" markdown="1">

```go
func numSquares(n int) int {
    dp := make([]int, n+1)
    for i := 1; i <= n; i++ {
        dp[i] = i // 最坏全用 1
        for j := 1; j*j <= i; j++ {
            if dp[i-j*j]+1 < dp[i] {
                dp[i] = dp[i-j*j] + 1
            }
        }
    }
    return dp[n]
}
```

</div>
<div class="tab-content" data-lang="python" markdown="1">

```python
class Solution:
    def numSquares(self, n: int) -> int:
        dp = [0] * (n + 1)
        for i in range(1, n + 1):
            dp[i] = i
            j = 1
            while j * j <= i:
                dp[i] = min(dp[i], dp[i - j * j] + 1)
                j += 1
        return dp[n]
```

</div>
</div>

## 复杂度分析

| | 时间复杂度 | 空间复杂度 |
|---|---|---|
| Go / Python | O(n·√n) | O(n) |

**解释：** 对每个 `i` 枚举约 `√i` 个平方数。
