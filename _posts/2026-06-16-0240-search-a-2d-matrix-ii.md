---
title: "240. 搜索二维矩阵 II (Search a 2D Matrix II)"
date: 2026-06-16
category: algorithms
topic: matrix
number: 240
difficulty: 中等
tags: [数组, 矩阵, 二分查找, 分治]
leetcode_url: "https://leetcode.cn/problems/search-a-2d-matrix-ii/"
permalink: /leetcode/0240-search-a-2d-matrix-ii/
layout: leetcode-post
---

## 题目描述

给定 `m × n` 矩阵，每行从左到右升序、每列从上到下升序。判断 `target` 是否存在。

**示例：** 在有序矩阵中查找 `target = 5` → `true`。

## 思路分析

**核心思想：** 从**右上角**出发当作「二叉搜索树」：当前值比目标大就左移（列 -1），比目标小就下移（行 +1）。

**详细步骤：**

1. `row = 0, col = n-1`。
2. 比较 `matrix[row][col]` 与 `target`：相等返回 `true`；偏大左移；偏小下移。
3. 越界仍未找到则返回 `false`。

## 代码实现

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn" data-lang="go" onclick="switchCodeTab(this)">Go</button>
<button class="tab-btn" data-lang="python" onclick="switchCodeTab(this)">Python</button>
</div>
<div class="tab-content" data-lang="go" markdown="1">

```go
func searchMatrix(matrix [][]int, target int) bool {
    row, col := 0, len(matrix[0])-1
    for row < len(matrix) && col >= 0 {
        switch {
        case matrix[row][col] == target:
            return true
        case matrix[row][col] > target:
            col-- // 当前列太大，左移
        default:
            row++ // 当前行太小，下移
        }
    }
    return false
}
```

</div>
<div class="tab-content" data-lang="python" markdown="1">

```python
class Solution:
    def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:
        row, col = 0, len(matrix[0]) - 1
        while row < len(matrix) and col >= 0:
            v = matrix[row][col]
            if v == target:
                return True
            elif v > target:
                col -= 1
            else:
                row += 1
        return False
```

</div>
</div>

## 复杂度分析

| | 时间复杂度 | 空间复杂度 |
|---|---|---|
| Go / Python | O(m + n) | O(1) |

**解释：** 每步排除一行或一列，最多走 `m + n` 步。
