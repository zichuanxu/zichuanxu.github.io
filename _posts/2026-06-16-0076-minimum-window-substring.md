---
title: "76. 最小覆盖子串 (Minimum Window Substring)"
date: 2026-06-16
category: algorithms
topic: substring
number: 76
difficulty: 困难
tags: [哈希表, 字符串, 滑动窗口]
leetcode_url: "https://leetcode.cn/problems/minimum-window-substring/"
permalink: /leetcode/0076-minimum-window-substring/
layout: leetcode-post
---

## 题目描述

给定字符串 `s` 和 `t`，返回 `s` 中涵盖 `t` 所有字符（含重复）的最小子串；不存在则返回 `""`。

**示例：** `s = "ADOBECODEBANC", t = "ABC"` → `"BANC"`。

## 思路分析

**核心思想：** 可伸缩滑动窗口。`need[c]` 记录还差多少个字符 `c`；`missing` 记录窗口还缺多少字符。

**详细步骤：**

1. 右指针扩张：若 `need[c] > 0` 说明该字符是需要的，`missing--`；`need[c]--`。
2. 当 `missing == 0`（窗口已覆盖 `t`），尝试更新最小窗口，并收缩左指针。
3. 收缩时若移出一个必需字符（`need[s[left]]` 回到正数），`missing++`。

## 代码实现

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn" data-lang="go" onclick="switchCodeTab(this)">Go</button>
<button class="tab-btn" data-lang="python" onclick="switchCodeTab(this)">Python</button>
</div>
<div class="tab-content" data-lang="go" markdown="1">

```go
func minWindow(s string, t string) string {
    if len(s) < len(t) {
        return ""
    }
    need := make(map[byte]int)
    for i := 0; i < len(t); i++ {
        need[t[i]]++
    }
    missing := len(t)
    left, start, minLen := 0, 0, len(s)+1
    for right := 0; right < len(s); right++ {
        if need[s[right]] > 0 {
            missing--
        }
        need[s[right]]--
        for missing == 0 { // 窗口已覆盖 t
            if right-left+1 < minLen {
                minLen, start = right-left+1, left
            }
            need[s[left]]++
            if need[s[left]] > 0 {
                missing++
            }
            left++
        }
    }
    if minLen == len(s)+1 {
        return ""
    }
    return s[start : start+minLen]
}
```

</div>
<div class="tab-content" data-lang="python" markdown="1">

```python
class Solution:
    def minWindow(self, s: str, t: str) -> str:
        if len(s) < len(t):
            return ""
        need = Counter(t)
        missing = len(t)
        left = start = 0
        min_len = len(s) + 1
        for right, c in enumerate(s):
            if need[c] > 0:
                missing -= 1
            need[c] -= 1
            while missing == 0:
                if right - left + 1 < min_len:
                    min_len, start = right - left + 1, left
                need[s[left]] += 1
                if need[s[left]] > 0:
                    missing += 1
                left += 1
        return "" if min_len == len(s) + 1 else s[start:start + min_len]
```

</div>
</div>

## 复杂度分析

| | 时间复杂度 | 空间复杂度 |
|---|---|---|
| Go / Python | O(n + m) | O(m) |

**解释：** 左右指针各遍历 `s` 一次；`need` 表大小为 `t` 的字符种类数。
