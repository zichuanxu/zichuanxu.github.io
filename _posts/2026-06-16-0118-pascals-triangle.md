---
title: "118. 杨辉三角 (Pascal's Triangle)"
date: 2026-06-16
category: algorithms
topic: dp
number: 118
difficulty: 简单
tags: [数组, 动态规划]
leetcode_url: "https://leetcode.cn/problems/pascals-triangle/"
permalink: /leetcode/0118-pascals-triangle/
layout: leetcode-post
---

## 题目描述

给定行数 `numRows`，生成杨辉三角的前 `numRows` 行。每个数是它左上与右上两数之和。

**示例：** `numRows = 5` → `[[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]`。

## 思路分析

**核心思想：** 每行首尾为 1，中间元素 `row[j] = 上一行[j-1] + 上一行[j]`。

**详细步骤：**

1. 第 `i` 行长度为 `i+1`，两端置 1。
2. 中间位置由上一行相邻两数求和。

## 代码实现

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn" data-lang="go" onclick="switchCodeTab(this)">Go</button>
<button class="tab-btn" data-lang="python" onclick="switchCodeTab(this)">Python</button>
</div>
<div class="tab-content" data-lang="go" markdown="1">

```go
func generate(numRows int) [][]int {
    res := make([][]int, numRows)
    for i := 0; i < numRows; i++ {
        res[i] = make([]int, i+1)
        res[i][0], res[i][i] = 1, 1
        for j := 1; j < i; j++ {
            res[i][j] = res[i-1][j-1] + res[i-1][j]
        }
    }
    return res
}
```

</div>
<div class="tab-content" data-lang="python" markdown="1">

```python
class Solution:
    def generate(self, numRows: int) -> List[List[int]]:
        res = []
        for i in range(numRows):
            row = [1] * (i + 1)
            for j in range(1, i):
                row[j] = res[i - 1][j - 1] + res[i - 1][j]
            res.append(row)
        return res
```

</div>
</div>

## 复杂度分析

| | 时间复杂度 | 空间复杂度 |
|---|---|---|
| Go / Python | O(numRows²) | O(1)（除输出） |

**解释：** 元素总数约为行数平方的一半。
