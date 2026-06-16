---
title: "438. 找到字符串中所有字母异位词 (Find All Anagrams in a String)"
date: 2026-06-16
category: algorithms
topic: sliding-window
number: 438
difficulty: 中等
tags: [哈希表, 字符串, 滑动窗口]
leetcode_url: "https://leetcode.cn/problems/find-all-anagrams-in-a-string/"
permalink: /leetcode/0438-find-all-anagrams-in-a-string/
layout: leetcode-post
---

## 题目描述

给定字符串 `s` 和 `p`，找到 `s` 中所有 `p` 的**字母异位词**子串，返回它们的起始索引。

**示例：** `s = "cbaebabacd", p = "abc"` → `[0,6]`。

## 思路分析

**核心思想：** 长度固定为 `len(p)` 的滑动窗口，用 26 个字母的计数数组比较窗口与 `p` 是否一致。

**详细步骤：**

1. 统计 `p` 的字母计数 `need`。
2. 维护长度为 `len(p)` 的窗口计数 `win`：右进左出。
3. 每当 `win == need`，记录窗口左端索引。

## 代码实现

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn" data-lang="go" onclick="switchCodeTab(this)">Go</button>
<button class="tab-btn" data-lang="python" onclick="switchCodeTab(this)">Python</button>
</div>
<div class="tab-content" data-lang="go" markdown="1">

```go
func findAnagrams(s string, p string) []int {
    res := []int{}
    if len(s) < len(p) {
        return res
    }
    var need, win [26]int
    for i := 0; i < len(p); i++ {
        need[p[i]-'a']++
        win[s[i]-'a']++
    }
    if need == win { // 数组可直接比较
        res = append(res, 0)
    }
    for i := len(p); i < len(s); i++ {
        win[s[i]-'a']++        // 右端进窗口
        win[s[i-len(p)]-'a']-- // 左端出窗口
        if need == win {
            res = append(res, i-len(p)+1)
        }
    }
    return res
}
```

</div>
<div class="tab-content" data-lang="python" markdown="1">

```python
class Solution:
    def findAnagrams(self, s: str, p: str) -> List[int]:
        if len(s) < len(p):
            return []
        need, win = [0] * 26, [0] * 26
        for c in p:
            need[ord(c) - 97] += 1
        res = []
        for i, c in enumerate(s):
            win[ord(c) - 97] += 1
            if i >= len(p):
                win[ord(s[i - len(p)]) - 97] -= 1
            if win == need:
                res.append(i - len(p) + 1)
        return res
```

</div>
</div>

## 复杂度分析

| | 时间复杂度 | 空间复杂度 |
|---|---|---|
| Go / Python | O(n) | O(1) |

**解释：** 窗口滑动一次遍历 `s`；计数数组固定 26 个。
