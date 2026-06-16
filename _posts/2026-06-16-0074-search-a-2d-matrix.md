---
title: "74. 搜索二维矩阵 (Search a 2D Matrix)"
date: 2026-06-16
category: algorithms
topic: binary-search
number: 74
difficulty: 中等
tags: [数组, 二分查找, 矩阵]
leetcode_url: "https://leetcode.cn/problems/search-a-2d-matrix/"
permalink: /leetcode/0074-search-a-2d-matrix/
layout: leetcode-post
---

## 题目描述

`m × n` 矩阵每行升序，且每行第一个数大于上一行最后一个数。判断 `target` 是否存在。要求 O(log(m·n))。

**示例：** 在该矩阵中查找 `target = 3` → `true`。

## 思路分析

**核心思想：** 整个矩阵展平后是一个升序数组，可把一维下标 `mid` 映射回 `(mid/n, mid%n)` 做标准二分。

**详细步骤：**

1. `lo = 0, hi = m*n-1`。
2. 取 `mid`，用 `matrix[mid/n][mid%n]` 取值与 `target` 比较。
3. 据大小收缩区间。

## 代码实现

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn" data-lang="go" onclick="switchCodeTab(this)">Go</button>
<button class="tab-btn" data-lang="python" onclick="switchCodeTab(this)">Python</button>
</div>
<div class="tab-content" data-lang="go" markdown="1">

```go
func searchMatrix(matrix [][]int, target int) bool {
    m, n := len(matrix), len(matrix[0])
    lo, hi := 0, m*n-1
    for lo <= hi {
        mid := (lo + hi) / 2
        v := matrix[mid/n][mid%n]
        if v == target {
            return true
        } else if v < target {
            lo = mid + 1
        } else {
            hi = mid - 1
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
        m, n = len(matrix), len(matrix[0])
        lo, hi = 0, m * n - 1
        while lo <= hi:
            mid = (lo + hi) // 2
            v = matrix[mid // n][mid % n]
            if v == target:
                return True
            elif v < target:
                lo = mid + 1
            else:
                hi = mid - 1
        return False
```

</div>
</div>

## 复杂度分析

| | 时间复杂度 | 空间复杂度 |
|---|---|---|
| Go / Python | O(log(m·n)) | O(1) |

**解释：** 在 `m·n` 个元素上做一次二分。
