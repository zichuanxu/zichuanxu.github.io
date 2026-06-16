---
title: "763. 划分字母区间 (Partition Labels)"
date: 2026-06-16
category: algorithms
topic: greedy
number: 763
difficulty: 中等
tags: [贪心, 哈希表, 双指针, 字符串]
leetcode_url: "https://leetcode.cn/problems/partition-labels/"
permalink: /leetcode/0763-partition-labels/
layout: leetcode-post
---

## 题目描述

给定字符串 `s`，把它划分为尽可能多的片段，使同一字母只出现在一个片段中。返回各片段长度。

**示例：** `s = "ababcbacadefegdehijhklij"` → `[9,7,8]`。

## 思路分析

**核心思想：** 贪心。先记录每个字母最后出现的位置；遍历时把当前片段的右边界扩展到「片段内所有字母的最远出现位置」，当遍历到该边界时即可切分。

**详细步骤：**

1. 记录每个字母最后出现下标 `last`。
2. 遍历，`end = max(end, last[当前字母])`。
3. 当 `i == end` 时结算片段长度 `end - start + 1`，并把 `start` 移到下一位。

## 代码实现

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn" data-lang="go" onclick="switchCodeTab(this)">Go</button>
<button class="tab-btn" data-lang="python" onclick="switchCodeTab(this)">Python</button>
</div>
<div class="tab-content" data-lang="go" markdown="1">

```go
func partitionLabels(s string) []int {
    var last [26]int
    for i := 0; i < len(s); i++ {
        last[s[i]-'a'] = i // 每个字母最后出现位置
    }
    res := []int{}
    start, end := 0, 0
    for i := 0; i < len(s); i++ {
        if last[s[i]-'a'] > end {
            end = last[s[i]-'a']
        }
        if i == end { // 片段可闭合
            res = append(res, end-start+1)
            start = i + 1
        }
    }
    return res
}
```

</div>
<div class="tab-content" data-lang="python" markdown="1">

```python
class Solution:
    def partitionLabels(self, s: str) -> List[int]:
        last = {c: i for i, c in enumerate(s)}
        res = []
        start = end = 0
        for i, c in enumerate(s):
            end = max(end, last[c])
            if i == end:
                res.append(end - start + 1)
                start = i + 1
        return res
```

</div>
</div>

## 复杂度分析

| | 时间复杂度 | 空间复杂度 |
|---|---|---|
| Go / Python | O(n) | O(1) |

**解释：** 两次线性遍历；字母表大小固定。
