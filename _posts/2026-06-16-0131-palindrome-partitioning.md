---
title: "131. 分割回文串 (Palindrome Partitioning)"
date: 2026-06-16
category: algorithms
topic: backtracking
number: 131
difficulty: 中等
tags: [深度优先搜索, 回溯, 动态规划]
leetcode_url: "https://leetcode.cn/problems/palindrome-partitioning/"
permalink: /leetcode/0131-palindrome-partitioning/
layout: leetcode-post
---

## 题目描述

给定字符串 `s`，将其分割成若干子串，使每个子串都是回文串，返回所有可能的分割方案。

**示例：** `s = "aab"` → `[["a","a","b"],["aa","b"]]`。

## 思路分析

**核心思想：** 回溯。枚举当前起点能切出的每个回文前缀 `s[start:end+1]`，是回文才切，递归处理剩余部分。

**详细步骤：**

1. `start == len(s)` 时收集当前分割。
2. 对每个 `end`，若 `s[start..end]` 是回文则加入路径并递归 `end+1`，再回溯。

## 代码实现

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn" data-lang="go" onclick="switchCodeTab(this)">Go</button>
<button class="tab-btn" data-lang="python" onclick="switchCodeTab(this)">Python</button>
</div>
<div class="tab-content" data-lang="go" markdown="1">

```go
func partition(s string) [][]string {
    res := [][]string{}
    path := []string{}
    isPalin := func(l, r int) bool {
        for l < r {
            if s[l] != s[r] {
                return false
            }
            l++
            r--
        }
        return true
    }
    var backtrack func(start int)
    backtrack = func(start int) {
        if start == len(s) {
            res = append(res, append([]string{}, path...))
            return
        }
        for end := start; end < len(s); end++ {
            if isPalin(start, end) {
                path = append(path, s[start:end+1])
                backtrack(end + 1)
                path = path[:len(path)-1]
            }
        }
    }
    backtrack(0)
    return res
}
```

</div>
<div class="tab-content" data-lang="python" markdown="1">

```python
class Solution:
    def partition(self, s: str) -> List[List[str]]:
        res, path = [], []
        def backtrack(start):
            if start == len(s):
                res.append(path[:])
                return
            for end in range(start, len(s)):
                sub = s[start:end + 1]
                if sub == sub[::-1]:
                    path.append(sub)
                    backtrack(end + 1)
                    path.pop()
        backtrack(0)
        return res
```

</div>
</div>

## 复杂度分析

| | 时间复杂度 | 空间复杂度 |
|---|---|---|
| Go / Python | O(n·2ⁿ) | O(n) |

**解释：** 最坏有 `2ⁿ⁻¹` 种分割，每种校验/拷贝 O(n)；递归深度 O(n)。
