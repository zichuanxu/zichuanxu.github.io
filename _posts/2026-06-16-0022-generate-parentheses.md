---
title: "22. 括号生成 (Generate Parentheses)"
date: 2026-06-16
category: algorithms
topic: backtracking
number: 22
difficulty: 中等
tags: [字符串, 动态规划, 回溯]
leetcode_url: "https://leetcode.cn/problems/generate-parentheses/"
permalink: /leetcode/0022-generate-parentheses/
layout: leetcode-post
---

## 题目描述

给定 `n` 对括号，生成所有可能的、有效的括号组合。

**示例：** `n = 3` → `["((()))","(()())","(())()","()(())","()()()"]`。

## 思路分析

**核心思想：** 回溯并剪枝。维护已用的左、右括号数：只要左括号没用完就能放 `(`；只有右括号数小于左括号数时才能放 `)`，保证任意前缀合法。

**详细步骤：**

1. 字符串长度达 `2n` 时收集结果。
2. `open < n` 时放 `(`；`close < open` 时放 `)`。

## 代码实现

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn" data-lang="go" onclick="switchCodeTab(this)">Go</button>
<button class="tab-btn" data-lang="python" onclick="switchCodeTab(this)">Python</button>
</div>
<div class="tab-content" data-lang="go" markdown="1">

```go
func generateParenthesis(n int) []string {
    res := []string{}
    var backtrack func(s string, open, close int)
    backtrack = func(s string, open, close int) {
        if len(s) == 2*n {
            res = append(res, s)
            return
        }
        if open < n {
            backtrack(s+"(", open+1, close)
        }
        if close < open {
            backtrack(s+")", open, close+1)
        }
    }
    backtrack("", 0, 0)
    return res
}
```

</div>
<div class="tab-content" data-lang="python" markdown="1">

```python
class Solution:
    def generateParenthesis(self, n: int) -> List[str]:
        res = []
        def backtrack(s, open_, close):
            if len(s) == 2 * n:
                res.append(s)
                return
            if open_ < n:
                backtrack(s + "(", open_ + 1, close)
            if close < open_:
                backtrack(s + ")", open_, close + 1)
        backtrack("", 0, 0)
        return res
```

</div>
</div>

## 复杂度分析

| | 时间复杂度 | 空间复杂度 |
|---|---|---|
| Go / Python | O(4ⁿ / √n) | O(n) |

**解释：** 有效组合数为第 `n` 个卡特兰数；递归深度 O(n)。
