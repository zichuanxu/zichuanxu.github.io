---
title: "49. 字母异位词分组 (Group Anagrams)"
date: 2026-06-16
category: algorithms
topic: hash
number: 49
difficulty: 中等
tags: [哈希表, 字符串, 排序]
leetcode_url: "https://leetcode.cn/problems/group-anagrams/"
permalink: /leetcode/0049-group-anagrams/
layout: leetcode-post
---

## 题目描述

给你一个字符串数组 `strs`，请把**字母异位词**组合在一起（异位词指由相同字母重排得到的字符串）。可以按任意顺序返回结果。

**示例：** `strs = ["eat","tea","tan","ate","nat","bat"]` → `[["bat"],["nat","tan"],["ate","eat","tea"]]`。

## 思路分析

**核心思想：** 异位词排序后得到的字符串相同，可用「排序后的串」作为哈希表的 key，把同组词聚到一起。

**详细步骤：**

1. 遍历每个字符串 `s`，把字符排序得到 `key`。
2. 以 `key` 为键，把原串 `s` 追加到对应分组列表。
3. 返回哈希表所有值。

## 代码实现

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn" data-lang="go" onclick="switchCodeTab(this)">Go</button>
<button class="tab-btn" data-lang="python" onclick="switchCodeTab(this)">Python</button>
</div>
<div class="tab-content" data-lang="go" markdown="1">

```go
func groupAnagrams(strs []string) [][]string {
    groups := make(map[string][]string)
    for _, s := range strs {
        b := []byte(s)
        sort.Slice(b, func(i, j int) bool { return b[i] < b[j] })
        key := string(b) // 排序后的串作为分组 key
        groups[key] = append(groups[key], s)
    }
    res := make([][]string, 0, len(groups))
    for _, g := range groups {
        res = append(res, g)
    }
    return res
}
```

</div>
<div class="tab-content" data-lang="python" markdown="1">

```python
class Solution:
    def groupAnagrams(self, strs: List[str]) -> List[List[str]]:
        groups = defaultdict(list)  # 排序后的串 -> 原串列表
        for s in strs:
            key = "".join(sorted(s))
            groups[key].append(s)
        return list(groups.values())
```

</div>
</div>

## 复杂度分析

| | 时间复杂度 | 空间复杂度 |
|---|---|---|
| Go / Python | O(n·k·log k) | O(n·k) |

**解释：** `n` 为字符串个数，`k` 为最长字符串长度；每个串排序需 O(k·log k)。
