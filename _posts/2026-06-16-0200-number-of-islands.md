---
title: "200. 岛屿数量 (Number of Islands)"
date: 2026-06-16
category: algorithms
topic: graph
number: 200
difficulty: 中等
tags: [深度优先搜索, 广度优先搜索, 并查集, 数组, 矩阵]
leetcode_url: "https://leetcode.cn/problems/number-of-islands/"
permalink: /leetcode/0200-number-of-islands/
layout: leetcode-post
---

## 题目描述

给定由 `'1'`（陆地）和 `'0'`（水）组成的二维网格，计算岛屿数量。岛屿由相邻陆地（上下左右）连接而成。

**示例：** 网格中有两片相连陆地 → `2`。

## 思路分析

**核心思想：** 遍历网格，每遇到一块未访问的陆地就计数 +1，并用 DFS 把整座岛「淹没」（置为 `'0'`），避免重复计数。

**详细步骤：**

1. 双重循环扫描每个格子。
2. 遇到 `'1'`：岛屿数 +1，从此格 DFS 向四个方向扩散并置零。
3. 扫描结束即得岛屿总数。

## 代码实现

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn" data-lang="go" onclick="switchCodeTab(this)">Go</button>
<button class="tab-btn" data-lang="python" onclick="switchCodeTab(this)">Python</button>
</div>
<div class="tab-content" data-lang="go" markdown="1">

```go
func numIslands(grid [][]byte) int {
    m, n := len(grid), len(grid[0])
    var dfs func(i, j int)
    dfs = func(i, j int) {
        if i < 0 || i >= m || j < 0 || j >= n || grid[i][j] != '1' {
            return
        }
        grid[i][j] = '0' // 淹没已访问陆地
        dfs(i+1, j)
        dfs(i-1, j)
        dfs(i, j+1)
        dfs(i, j-1)
    }
    count := 0
    for i := 0; i < m; i++ {
        for j := 0; j < n; j++ {
            if grid[i][j] == '1' {
                count++
                dfs(i, j)
            }
        }
    }
    return count
}
```

</div>
<div class="tab-content" data-lang="python" markdown="1">

```python
class Solution:
    def numIslands(self, grid: List[List[str]]) -> int:
        m, n = len(grid), len(grid[0])
        def dfs(i, j):
            if i < 0 or i >= m or j < 0 or j >= n or grid[i][j] != '1':
                return
            grid[i][j] = '0'
            dfs(i + 1, j)
            dfs(i - 1, j)
            dfs(i, j + 1)
            dfs(i, j - 1)
        count = 0
        for i in range(m):
            for j in range(n):
                if grid[i][j] == '1':
                    count += 1
                    dfs(i, j)
        return count
```

</div>
</div>

## 复杂度分析

| | 时间复杂度 | 空间复杂度 |
|---|---|---|
| Go / Python | O(m·n) | O(m·n) |

**解释：** 每个格子至多访问一次；最坏情况递归栈深度为格子总数。
