---
title: "5. 最长回文子串 (Longest Palindromic Substring)"
date: 2026-06-16
category: algorithms
topic: multi-dim-dp
number: 5
difficulty: 中等
tags: [字符串, 动态规划, 中心扩展]
leetcode_url: "https://leetcode.cn/problems/longest-palindromic-substring/"
permalink: /leetcode/0005-longest-palindromic-substring/
layout: leetcode-post
---

## 题目描述

给定一个字符串 `s`，返回它的最长回文子串。

**示例：** `s = "babad"` → `"bab"`（`"aba"` 也是正确答案）。

## 思路分析

**核心思想：** 回文以中心对称。枚举每个可能的中心，向两侧扩展，记录最长区间。共有 `2n-1` 个中心（单字符对应奇数长度，相邻两字符之间对应偶数长度）。

**详细步骤：**

1. 对每个下标 `i`，分别以 `(i, i)`（奇数）和 `(i, i+1)`（偶数）为中心调用扩展函数。
2. 扩展函数：只要 `s[l] == s[r]` 且边界合法，就向外扩展 `l--`、`r++`；若当前长度超过记录，更新起点 `start` 和长度 `maxLen`。
3. 最终返回 `s[start : start+maxLen]`。

## 代码实现

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn" data-lang="go" onclick="switchCodeTab(this)">Go</button>
<button class="tab-btn" data-lang="python" onclick="switchCodeTab(this)">Python</button>
</div>
<div class="tab-content" data-lang="go" markdown="1">

```go
func longestPalindrome(s string) string {
    if len(s) < 2 {
        return s
    }
    start, maxLen := 0, 1
    expand := func(l, r int) {
        for l >= 0 && r < len(s) && s[l] == s[r] {
            if r-l+1 > maxLen {
                start, maxLen = l, r-l+1
            }
            l--
            r++
        }
    }
    for i := 0; i < len(s); i++ {
        expand(i, i)
        expand(i, i+1)
    }
    return s[start : start+maxLen]
}
```

</div>
<div class="tab-content" data-lang="python" markdown="1">

```python
class Solution:
    def longestPalindrome(self, s: str) -> str:
        if len(s) < 2:
            return s
        start, max_len = 0, 1
        def expand(l: int, r: int):
            nonlocal start, max_len
            while l >= 0 and r < len(s) and s[l] == s[r]:
                if r - l + 1 > max_len:
                    start, max_len = l, r - l + 1
                l -= 1
                r += 1
        for i in range(len(s)):
            expand(i, i)
            expand(i, i + 1)
        return s[start:start + max_len]
```

</div>
</div>

## 复杂度分析

| | 时间复杂度 | 空间复杂度 |
|---|---|---|
| Go / Python | O(n²) | O(1) |

**解释：** 每个中心最多扩展 O(n)，共 2n-1 个中心；仅用常数个变量，无额外空间。
