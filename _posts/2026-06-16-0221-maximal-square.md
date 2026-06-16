---
title: "221. 最大正方形 (Maximal Square)"
date: 2026-06-16
category: algorithms
topic: multi-dim-dp
number: 221
difficulty: 中等
tags: [数组, 动态规划, 矩阵]
leetcode_url: "https://leetcode.cn/problems/maximal-square/"
permalink: /leetcode/0221-maximal-square/
layout: leetcode-post
---

## 题目描述

在由 `'0'` 和 `'1'` 组成的二维矩阵中，找到只含 `'1'` 的最大正方形，返回其面积。

**示例：** 含一个 2×2 全 1 区域 → `4`。

## 思路分析

**核心思想：** `dp[i][j]` 表示以 `(i, j)` 为**右下角**的最大正方形边长。若该格为 `'1'`，边长由其上、左、左上三者的最小值 +1 决定（短板限制）。

**详细步骤：**

1. 多开一行一列作边界。
2. 格为 `'1'` 时 `dp[i][j] = min(上, 左, 左上) + 1`，更新最大边长。
3. 答案为最大边长的平方。

## 代码实现

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn" data-lang="go" onclick="switchCodeTab(this)">Go</button>
<button class="tab-btn" data-lang="python" onclick="switchCodeTab(this)">Python</button>
</div>
<div class="tab-content" data-lang="go" markdown="1">

```go
func maximalSquare(matrix [][]byte) int {
    m, n := len(matrix), len(matrix[0])
    dp := make([][]int, m+1)
    for i := range dp {
        dp[i] = make([]int, n+1)
    }
    best := 0
    for i := 1; i <= m; i++ {
        for j := 1; j <= n; j++ {
            if matrix[i-1][j-1] == '1' {
                dp[i][j] = min(dp[i-1][j-1], min(dp[i-1][j], dp[i][j-1])) + 1
                if dp[i][j] > best {
                    best = dp[i][j]
                }
            }
        }
    }
    return best * best
}
```

</div>
<div class="tab-content" data-lang="python" markdown="1">

```python
class Solution:
    def maximalSquare(self, matrix: List[List[str]]) -> int:
        m, n = len(matrix), len(matrix[0])
        dp = [[0] * (n + 1) for _ in range(m + 1)]
        best = 0
        for i in range(1, m + 1):
            for j in range(1, n + 1):
                if matrix[i - 1][j - 1] == '1':
                    dp[i][j] = min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]) + 1
                    best = max(best, dp[i][j])
        return best * best
```

</div>
</div>

## 复杂度分析

| | 时间复杂度 | 空间复杂度 |
|---|---|---|
| Go / Python | O(m·n) | O(m·n) |

**解释：** 遍历矩阵每格一次，常数转移；可进一步压成一维。
