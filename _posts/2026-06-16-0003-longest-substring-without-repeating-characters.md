---
title: "3. 无重复字符的最长子串 (Longest Substring Without Repeating Characters)"
date: 2026-06-16
category: algorithms
topic: sliding-window
number: 3
difficulty: 中等
tags: [滑动窗口, 哈希表, 双指针]
leetcode_url: "https://leetcode.cn/problems/longest-substring-without-repeating-characters/"
permalink: /leetcode/0003-longest-substring-without-repeating-characters/
layout: leetcode-post
---

## 题目描述

给定一个字符串 `s`，求不含重复字符的最长子串的长度。

**示例：** `s = "abcabcbb"` → `3`（最长无重复子串为 `"abc"`）。

## 思路分析

**核心思想：** 用滑动窗口 `[left, right]` 维护一个无重复字符的区间，哈希表记录每个字符最近出现的位置，从而 O(1) 判断是否重复。

**详细步骤：**

1. 维护左指针 `left`，用哈希表 `{字符: 最近下标}` 记录字符上次出现的位置。
2. 右指针 `right` 逐步向右扫描：若当前字符在窗口内（即 `last[ch] >= left`），将 `left` 跳到 `重复位置 + 1`，收缩窗口。
3. 更新该字符的最新位置，并记录当前窗口长度 `right - left + 1` 的最大值。
4. 每个字符至多进出窗口一次，整体一次遍历完成。

## 代码实现

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn" data-lang="go" onclick="switchCodeTab(this)">Go</button>
<button class="tab-btn" data-lang="python" onclick="switchCodeTab(this)">Python</button>
</div>
<div class="tab-content" data-lang="go" markdown="1">

```go
func lengthOfLongestSubstring(s string) int {
    last := make(map[byte]int)
    ans, left := 0, 0
    for right := 0; right < len(s); right++ {
        if i, ok := last[s[right]]; ok && i >= left {
            left = i + 1
        }
        last[s[right]] = right
        if right-left+1 > ans {
            ans = right - left + 1
        }
    }
    return ans
}
```

</div>
<div class="tab-content" data-lang="python" markdown="1">

```python
class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        last = {}
        ans = left = 0
        for right, ch in enumerate(s):
            if ch in last and last[ch] >= left:
                left = last[ch] + 1
            last[ch] = right
            ans = max(ans, right - left + 1)
        return ans
```

</div>
</div>

## 复杂度分析

| | 时间复杂度 | 空间复杂度 |
|---|---|---|
| Go / Python | O(n) | O(min(n, 字符集大小)) |

**解释：** 每个字符至多进出窗口一次，遍历一趟完成；哈希表大小不超过字符集大小（如 ASCII 128）。
