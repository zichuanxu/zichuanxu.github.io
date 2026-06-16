---
title: "20. 有效的括号 (Valid Parentheses)"
date: 2026-06-16
category: algorithms
topic: stack
number: 20
difficulty: 简单
tags: [栈, 字符串]
leetcode_url: "https://leetcode.cn/problems/valid-parentheses/"
permalink: /leetcode/0020-valid-parentheses/
layout: leetcode-post
---

## 题目描述

给定只含 `()[]{}` 的字符串 `s`，判断括号是否有效（正确闭合且嵌套）。

**示例：** `s = "()[]{}"` → `true`；`s = "(]"` → `false`。

## 思路分析

**核心思想：** 栈。遇左括号入栈；遇右括号检查栈顶是否为匹配的左括号，匹配则出栈，否则非法。最终栈空才有效。

**详细步骤：**

1. 用映射记录右括号对应的左括号。
2. 遇右括号：栈空或栈顶不匹配即返回 `false`，否则弹栈。
3. 遇左括号入栈；遍历结束后栈为空即有效。

## 代码实现

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn" data-lang="go" onclick="switchCodeTab(this)">Go</button>
<button class="tab-btn" data-lang="python" onclick="switchCodeTab(this)">Python</button>
</div>
<div class="tab-content" data-lang="go" markdown="1">

```go
func isValid(s string) bool {
    pairs := map[byte]byte{')': '(', ']': '[', '}': '{'}
    stack := []byte{}
    for i := 0; i < len(s); i++ {
        c := s[i]
        if open, ok := pairs[c]; ok {
            if len(stack) == 0 || stack[len(stack)-1] != open {
                return false
            }
            stack = stack[:len(stack)-1]
        } else {
            stack = append(stack, c)
        }
    }
    return len(stack) == 0
}
```

</div>
<div class="tab-content" data-lang="python" markdown="1">

```python
class Solution:
    def isValid(self, s: str) -> bool:
        pairs = {')': '(', ']': '[', '}': '{'}
        stack = []
        for c in s:
            if c in pairs:
                if not stack or stack[-1] != pairs[c]:
                    return False
                stack.pop()
            else:
                stack.append(c)
        return not stack
```

</div>
</div>

## 复杂度分析

| | 时间复杂度 | 空间复杂度 |
|---|---|---|
| Go / Python | O(n) | O(n) |

**解释：** 一次遍历，栈最坏存全部左括号。
