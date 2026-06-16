---
title: "32. 最长有效括号 (Longest Valid Parentheses)"
date: 2026-06-16
category: algorithms
topic: dp
number: 32
difficulty: 困难
tags: [栈, 字符串, 动态规划]
leetcode_url: "https://leetcode.cn/problems/longest-valid-parentheses/"
permalink: /leetcode/0032-longest-valid-parentheses/
layout: leetcode-post
---

## 题目描述

给定只含 `(` 和 `)` 的字符串，返回最长**有效**（格式正确且连续）括号子串的长度。

**示例：** `s = ")()())"` → `4`（`"()()"`）。

## 思路分析

**核心思想：** 栈存下标，栈底放一个「上一个未匹配位置」的哨兵 `-1`。遇 `(` 压下标；遇 `)` 先弹栈：若栈空则把当前下标作新哨兵，否则用 `当前下标 - 栈顶` 更新最长长度。

**详细步骤：**

1. 栈初始为 `[-1]`。
2. `(` → 压入下标。
3. `)` → 弹栈；空则压入当前下标，否则用 `i - 栈顶` 更新答案。

## 代码实现

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn" data-lang="go" onclick="switchCodeTab(this)">Go</button>
<button class="tab-btn" data-lang="python" onclick="switchCodeTab(this)">Python</button>
</div>
<div class="tab-content" data-lang="go" markdown="1">

```go
func longestValidParentheses(s string) int {
    stack := []int{-1} // 栈底哨兵：上一个未匹配位置
    best := 0
    for i := 0; i < len(s); i++ {
        if s[i] == '(' {
            stack = append(stack, i)
        } else {
            stack = stack[:len(stack)-1]
            if len(stack) == 0 {
                stack = append(stack, i) // 新哨兵
            } else if i-stack[len(stack)-1] > best {
                best = i - stack[len(stack)-1]
            }
        }
    }
    return best
}
```

</div>
<div class="tab-content" data-lang="python" markdown="1">

```python
class Solution:
    def longestValidParentheses(self, s: str) -> int:
        stack = [-1]  # 栈底哨兵
        best = 0
        for i, c in enumerate(s):
            if c == '(':
                stack.append(i)
            else:
                stack.pop()
                if not stack:
                    stack.append(i)
                else:
                    best = max(best, i - stack[-1])
        return best
```

</div>
</div>

## 复杂度分析

| | 时间复杂度 | 空间复杂度 |
|---|---|---|
| Go / Python | O(n) | O(n) |

**解释：** 一次遍历，栈最坏存全部左括号下标。
