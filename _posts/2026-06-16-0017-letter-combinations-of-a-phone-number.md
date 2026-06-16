---
title: "17. 电话号码的字母组合 (Letter Combinations of a Phone Number)"
date: 2026-06-16
category: algorithms
topic: backtracking
number: 17
difficulty: 中等
tags: [哈希表, 字符串, 回溯]
leetcode_url: "https://leetcode.cn/problems/letter-combinations-of-a-phone-number/"
permalink: /leetcode/0017-letter-combinations-of-a-phone-number/
layout: leetcode-post
---

## 题目描述

给定仅含 `2-9` 的数字字符串，返回它能表示的所有字母组合（电话九宫格映射）。

**示例：** `digits = "23"` → `["ad","ae","af","bd","be","bf","cd","ce","cf"]`。

## 思路分析

**核心思想：** 回溯。逐位选择该数字对应的某个字母，拼到路径里；处理完所有数字位即得到一个组合。

**详细步骤：**

1. 建立数字到字母串的映射。
2. 递归索引 `idx`：到末尾则收集当前字符串。
3. 否则遍历当前数字的每个字母，入路径、递归、回溯。

## 代码实现

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn" data-lang="go" onclick="switchCodeTab(this)">Go</button>
<button class="tab-btn" data-lang="python" onclick="switchCodeTab(this)">Python</button>
</div>
<div class="tab-content" data-lang="go" markdown="1">

```go
func letterCombinations(digits string) []string {
    if len(digits) == 0 {
        return []string{}
    }
    phone := map[byte]string{
        '2': "abc", '3': "def", '4': "ghi", '5': "jkl",
        '6': "mno", '7': "pqrs", '8': "tuv", '9': "wxyz",
    }
    res := []string{}
    path := []byte{}
    var backtrack func(idx int)
    backtrack = func(idx int) {
        if idx == len(digits) {
            res = append(res, string(path))
            return
        }
        for i := 0; i < len(phone[digits[idx]]); i++ {
            path = append(path, phone[digits[idx]][i])
            backtrack(idx + 1)
            path = path[:len(path)-1]
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
    def letterCombinations(self, digits: str) -> List[str]:
        if not digits:
            return []
        phone = {'2': "abc", '3': "def", '4': "ghi", '5': "jkl",
                 '6': "mno", '7': "pqrs", '8': "tuv", '9': "wxyz"}
        res, path = [], []
        def backtrack(idx):
            if idx == len(digits):
                res.append("".join(path))
                return
            for ch in phone[digits[idx]]:
                path.append(ch)
                backtrack(idx + 1)
                path.pop()
        backtrack(0)
        return res
```

</div>
</div>

## 复杂度分析

| | 时间复杂度 | 空间复杂度 |
|---|---|---|
| Go / Python | O(4ⁿ·n) | O(n) |

**解释：** 最坏每位 4 个字母，共 `4ⁿ` 组合，每个构造 O(n)；递归深度 O(n)。
