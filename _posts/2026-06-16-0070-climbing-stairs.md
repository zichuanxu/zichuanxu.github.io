---
title: "70. 爬楼梯 (Climbing Stairs)"
date: 2026-06-16
category: algorithms
topic: dp
number: 70
difficulty: 简单
tags: [记忆化搜索, 数学, 动态规划]
leetcode_url: "https://leetcode.cn/problems/climbing-stairs/"
permalink: /leetcode/0070-climbing-stairs/
layout: leetcode-post
---

## 题目描述

爬楼梯需 `n` 阶，每次可爬 1 或 2 阶，求有多少种不同方法爬到顶。

**示例：** `n = 3` → `3`（`1+1+1`、`1+2`、`2+1`）。

## 思路分析

**核心思想：** 到第 `i` 阶的方法数 = 到第 `i-1` 阶 + 到第 `i-2` 阶（斐波那契）。用两个滚动变量即可。

**详细步骤：**

1. `prev = cur = 1`（到第 0、1 阶各 1 种）。
2. 从第 2 阶起 `prev, cur = cur, prev + cur`。

## 代码实现

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn" data-lang="go" onclick="switchCodeTab(this)">Go</button>
<button class="tab-btn" data-lang="python" onclick="switchCodeTab(this)">Python</button>
</div>
<div class="tab-content" data-lang="go" markdown="1">

```go
func climbStairs(n int) int {
    prev, cur := 1, 1
    for i := 2; i <= n; i++ {
        prev, cur = cur, prev+cur
    }
    return cur
}
```

</div>
<div class="tab-content" data-lang="python" markdown="1">

```python
class Solution:
    def climbStairs(self, n: int) -> int:
        prev, cur = 1, 1
        for _ in range(2, n + 1):
            prev, cur = cur, prev + cur
        return cur
```

</div>
</div>

## 复杂度分析

| | 时间复杂度 | 空间复杂度 |
|---|---|---|
| Go / Python | O(n) | O(1) |

**解释：** 线性递推，只保留前两项。
