---
title: "994. 腐烂的橘子 (Rotting Oranges)"
date: 2026-06-16
category: algorithms
topic: graph
number: 994
difficulty: 中等
tags: [广度优先搜索, 数组, 矩阵]
leetcode_url: "https://leetcode.cn/problems/rotting-oranges/"
permalink: /leetcode/0994-rotting-oranges/
layout: leetcode-post
---

## 题目描述

网格中 `0` 空、`1` 新鲜橘子、`2` 腐烂橘子。每分钟腐烂橘子会让四邻的新鲜橘子腐烂。返回所有橘子腐烂所需的最少分钟数；无法全部腐烂则返回 `-1`。

**示例：** `[[2,1,1],[1,1,0],[0,1,1]]` → `4`。

## 思路分析

**核心思想：** 多源 BFS。把所有初始腐烂橘子作为「第 0 层」同时入队，逐层向外扩散，层数即分钟数。

**详细步骤：**

1. 统计新鲜橘子数 `fresh`，所有腐烂橘子入队。
2. 每一轮（分钟）把队列里所有橘子的新鲜邻居腐烂并入队，`fresh` 递减。
3. 结束后若仍有新鲜橘子返回 `-1`，否则返回经过的分钟数。

## 代码实现

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn" data-lang="go" onclick="switchCodeTab(this)">Go</button>
<button class="tab-btn" data-lang="python" onclick="switchCodeTab(this)">Python</button>
</div>
<div class="tab-content" data-lang="go" markdown="1">

```go
func orangesRotting(grid [][]int) int {
    m, n := len(grid), len(grid[0])
    queue := [][2]int{}
    fresh := 0
    for i := 0; i < m; i++ {
        for j := 0; j < n; j++ {
            if grid[i][j] == 2 {
                queue = append(queue, [2]int{i, j})
            } else if grid[i][j] == 1 {
                fresh++
            }
        }
    }
    dirs := [4][2]int{ {1, 0}, {-1, 0}, {0, 1}, {0, -1} }
    minutes := 0
    for len(queue) > 0 && fresh > 0 {
        minutes++
        next := [][2]int{}
        for _, cell := range queue {
            for _, d := range dirs {
                ni, nj := cell[0]+d[0], cell[1]+d[1]
                if ni >= 0 && ni < m && nj >= 0 && nj < n && grid[ni][nj] == 1 {
                    grid[ni][nj] = 2
                    fresh--
                    next = append(next, [2]int{ni, nj})
                }
            }
        }
        queue = next
    }
    if fresh > 0 {
        return -1
    }
    return minutes
}
```

</div>
<div class="tab-content" data-lang="python" markdown="1">

```python
class Solution:
    def orangesRotting(self, grid: List[List[int]]) -> int:
        m, n = len(grid), len(grid[0])
        queue = deque()
        fresh = 0
        for i in range(m):
            for j in range(n):
                if grid[i][j] == 2:
                    queue.append((i, j))
                elif grid[i][j] == 1:
                    fresh += 1
        minutes = 0
        dirs = [(1, 0), (-1, 0), (0, 1), (0, -1)]
        while queue and fresh > 0:
            minutes += 1
            for _ in range(len(queue)):
                i, j = queue.popleft()
                for di, dj in dirs:
                    ni, nj = i + di, j + dj
                    if 0 <= ni < m and 0 <= nj < n and grid[ni][nj] == 1:
                        grid[ni][nj] = 2
                        fresh -= 1
                        queue.append((ni, nj))
        return -1 if fresh > 0 else minutes
```

</div>
</div>

## 复杂度分析

| | 时间复杂度 | 空间复杂度 |
|---|---|---|
| Go / Python | O(m·n) | O(m·n) |

**解释：** 每个格子入队出队一次；队列最坏存全部橘子。
