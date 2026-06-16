---
title: "1143. 最长公共子序列 (Longest Common Subsequence)"
date: 2026-06-16
category: algorithms
topic: multi-dim-dp
number: 1143
difficulty: 中等
tags: [字符串, 动态规划]
leetcode_url: "https://leetcode.cn/problems/longest-common-subsequence/"
permalink: /leetcode/1143-longest-common-subsequence/
layout: leetcode-post
---

## 题目描述

给定两个字符串 `text1`、`text2`，返回它们最长公共子序列的长度（子序列不要求连续）。

**示例：** `text1 = "abcde", text2 = "ace"` → `3`（`"ace"`）。

## 思路分析

**核心思想：** 二维 DP。`dp[i][j]` 为 `text1[:i]` 与 `text2[:j]` 的 LCS 长度。字符相等则由左上 +1，否则取上、左较大者。

**详细步骤：**

1. `dp` 多开一行一列作边界（空串 LCS 为 0）。
2. `text1[i-1] == text2[j-1]` → `dp[i][j] = dp[i-1][j-1] + 1`。
3. 否则 `dp[i][j] = max(dp[i-1][j], dp[i][j-1])`。

## 代码实现

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn" data-lang="go" onclick="switchCodeTab(this)">Go</button>
<button class="tab-btn" data-lang="python" onclick="switchCodeTab(this)">Python</button>
</div>
<div class="tab-content" data-lang="go" markdown="1">

```go
func longestCommonSubsequence(text1 string, text2 string) int {
    m, n := len(text1), len(text2)
    dp := make([][]int, m+1)
    for i := range dp {
        dp[i] = make([]int, n+1)
    }
    for i := 1; i <= m; i++ {
        for j := 1; j <= n; j++ {
            if text1[i-1] == text2[j-1] {
                dp[i][j] = dp[i-1][j-1] + 1
            } else if dp[i-1][j] > dp[i][j-1] {
                dp[i][j] = dp[i-1][j]
            } else {
                dp[i][j] = dp[i][j-1]
            }
        }
    }
    return dp[m][n]
}
```

</div>
<div class="tab-content" data-lang="python" markdown="1">

```python
class Solution:
    def longestCommonSubsequence(self, text1: str, text2: str) -> int:
        m, n = len(text1), len(text2)
        dp = [[0] * (n + 1) for _ in range(m + 1)]
        for i in range(1, m + 1):
            for j in range(1, n + 1):
                if text1[i - 1] == text2[j - 1]:
                    dp[i][j] = dp[i - 1][j - 1] + 1
                else:
                    dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
        return dp[m][n]
```

</div>
</div>

## 复杂度分析

| | 时间复杂度 | 空间复杂度 |
|---|---|---|
| Go / Python | O(m·n) | O(m·n) |

**解释：** 填满 `(m+1)×(n+1)` 的表，每格 O(1)。
