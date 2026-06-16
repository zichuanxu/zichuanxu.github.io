---
title: "64. 最小路径和 (Minimum Path Sum)"
date: 2026-06-16
category: algorithms
topic: multi-dim-dp
number: 64
difficulty: 中等
tags: [数组, 动态规划, 矩阵]
leetcode_url: "https://leetcode.cn/problems/minimum-path-sum/"
permalink: /leetcode/0064-minimum-path-sum/
layout: leetcode-post
---

## 题目描述

给定非负整数 `m × n` 网格 `grid`，从左上走到右下（只能向右或向下），求路径上数字总和的最小值。

**示例：** `grid = [[1,3,1],[1,5,1],[4,2,1]]` → `7`。

## 思路分析

**核心思想：** `dp[i][j] = grid[i][j] + min(上, 左)`。用一维数组滚动更新。

**详细步骤：**

1. 初始化首行前缀和。
2. 每行先更新 `dp[0]`（只能从上来），再 `dp[j] = grid[i][j] + min(dp[j-1], dp[j])`。

## 代码实现

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn" data-lang="go" onclick="switchCodeTab(this)">Go</button>
<button class="tab-btn" data-lang="python" onclick="switchCodeTab(this)">Python</button>
</div>
<div class="tab-content" data-lang="go" markdown="1">

```go
func minPathSum(grid [][]int) int {
    m, n := len(grid), len(grid[0])
    dp := make([]int, n)
    dp[0] = grid[0][0]
    for j := 1; j < n; j++ {
        dp[j] = dp[j-1] + grid[0][j]
    }
    for i := 1; i < m; i++ {
        dp[0] += grid[i][0]
        for j := 1; j < n; j++ {
            if dp[j-1] < dp[j] {
                dp[j] = dp[j-1] + grid[i][j]
            } else {
                dp[j] = dp[j] + grid[i][j]
            }
        }
    }
    return dp[n-1]
}
```

</div>
<div class="tab-content" data-lang="python" markdown="1">

```python
class Solution:
    def minPathSum(self, grid: List[List[int]]) -> int:
        m, n = len(grid), len(grid[0])
        dp = [0] * n
        dp[0] = grid[0][0]
        for j in range(1, n):
            dp[j] = dp[j - 1] + grid[0][j]
        for i in range(1, m):
            dp[0] += grid[i][0]
            for j in range(1, n):
                dp[j] = min(dp[j - 1], dp[j]) + grid[i][j]
        return dp[-1]
```

</div>
</div>

## 复杂度分析

| | 时间复杂度 | 空间复杂度 |
|---|---|---|
| Go / Python | O(m·n) | O(n) |

**解释：** 遍历整个网格；一维数组滚动。
