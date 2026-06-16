---
title: "73. 矩阵置零 (Set Matrix Zeroes)"
date: 2026-06-16
category: algorithms
topic: matrix
number: 73
difficulty: 中等
tags: [数组, 哈希表, 矩阵]
leetcode_url: "https://leetcode.cn/problems/set-matrix-zeroes/"
permalink: /leetcode/0073-set-matrix-zeroes/
layout: leetcode-post
---

## 题目描述

给定 `m × n` 矩阵，若某元素为 `0`，则将其所在行和列全部置零。要求**原地**、O(1) 额外空间。

**示例：** `[[1,1,1],[1,0,1],[1,1,1]]` → `[[1,0,1],[0,0,0],[1,0,1]]`。

## 思路分析

**核心思想：** 用矩阵的**第一行/第一列**作为标记位，记录对应列/行是否需要置零；另用两个布尔变量单独记录首行、首列本身是否含零。

**详细步骤：**

1. 先记录首行、首列是否原本含零。
2. 遍历内部元素，遇 0 就把对应的 `matrix[i][0]` 与 `matrix[0][j]` 标记为 0。
3. 依据标记把内部置零，最后按布尔变量处理首行、首列。

## 代码实现

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn" data-lang="go" onclick="switchCodeTab(this)">Go</button>
<button class="tab-btn" data-lang="python" onclick="switchCodeTab(this)">Python</button>
</div>
<div class="tab-content" data-lang="go" markdown="1">

```go
func setZeroes(matrix [][]int) {
    m, n := len(matrix), len(matrix[0])
    firstRow, firstCol := false, false
    for j := 0; j < n; j++ {
        if matrix[0][j] == 0 {
            firstRow = true
        }
    }
    for i := 0; i < m; i++ {
        if matrix[i][0] == 0 {
            firstCol = true
        }
    }
    for i := 1; i < m; i++ {
        for j := 1; j < n; j++ {
            if matrix[i][j] == 0 {
                matrix[i][0], matrix[0][j] = 0, 0
            }
        }
    }
    for i := 1; i < m; i++ {
        for j := 1; j < n; j++ {
            if matrix[i][0] == 0 || matrix[0][j] == 0 {
                matrix[i][j] = 0
            }
        }
    }
    if firstRow {
        for j := 0; j < n; j++ {
            matrix[0][j] = 0
        }
    }
    if firstCol {
        for i := 0; i < m; i++ {
            matrix[i][0] = 0
        }
    }
}
```

</div>
<div class="tab-content" data-lang="python" markdown="1">

```python
class Solution:
    def setZeroes(self, matrix: List[List[int]]) -> None:
        m, n = len(matrix), len(matrix[0])
        first_row = any(matrix[0][j] == 0 for j in range(n))
        first_col = any(matrix[i][0] == 0 for i in range(m))
        for i in range(1, m):
            for j in range(1, n):
                if matrix[i][j] == 0:
                    matrix[i][0] = matrix[0][j] = 0
        for i in range(1, m):
            for j in range(1, n):
                if matrix[i][0] == 0 or matrix[0][j] == 0:
                    matrix[i][j] = 0
        if first_row:
            for j in range(n):
                matrix[0][j] = 0
        if first_col:
            for i in range(m):
                matrix[i][0] = 0
```

</div>
</div>

## 复杂度分析

| | 时间复杂度 | 空间复杂度 |
|---|---|---|
| Go / Python | O(m·n) | O(1) |

**解释：** 常数次遍历矩阵；仅用首行首列与两个布尔位作标记。
