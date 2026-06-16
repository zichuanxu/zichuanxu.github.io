---
title: "208. 实现 Trie (前缀树) (Implement Trie)"
date: 2026-06-16
category: algorithms
topic: graph
number: 208
difficulty: 中等
tags: [设计, 字典树, 哈希表, 字符串]
leetcode_url: "https://leetcode.cn/problems/implement-trie-prefix-tree/"
permalink: /leetcode/0208-implement-trie-prefix-tree/
layout: leetcode-post
---

## 题目描述

实现前缀树 `Trie`，支持 `insert(word)` 插入、`search(word)` 精确查找、`startsWith(prefix)` 前缀查找。

**示例：** 插入 `"apple"` 后，`search("apple")=true`、`search("app")=false`、`startsWith("app")=true`。

## 思路分析

**核心思想：** 每个节点保存指向子节点的指针（按字符索引）与「是否为单词结尾」标记。沿字符逐层下行即可插入/查询。

**详细步骤：**

1. `insert`：逐字符下行，缺失子节点则新建，末尾置 `isEnd`。
2. `search`：下行查找；末节点存在且 `isEnd` 为真。
3. `startsWith`：下行能走通即存在该前缀。

## 代码实现

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn" data-lang="go" onclick="switchCodeTab(this)">Go</button>
<button class="tab-btn" data-lang="python" onclick="switchCodeTab(this)">Python</button>
</div>
<div class="tab-content" data-lang="go" markdown="1">

```go
type Trie struct {
    children [26]*Trie
    isEnd    bool
}

func Constructor() Trie {
    return Trie{}
}

func (t *Trie) Insert(word string) {
    node := t
    for i := 0; i < len(word); i++ {
        c := word[i] - 'a'
        if node.children[c] == nil {
            node.children[c] = &Trie{}
        }
        node = node.children[c]
    }
    node.isEnd = true
}

func (t *Trie) find(word string) *Trie {
    node := t
    for i := 0; i < len(word); i++ {
        c := word[i] - 'a'
        if node.children[c] == nil {
            return nil
        }
        node = node.children[c]
    }
    return node
}

func (t *Trie) Search(word string) bool {
    node := t.find(word)
    return node != nil && node.isEnd
}

func (t *Trie) StartsWith(prefix string) bool {
    return t.find(prefix) != nil
}
```

</div>
<div class="tab-content" data-lang="python" markdown="1">

```python
class Trie:
    def __init__(self):
        self.children = {}
        self.is_end = False

    def insert(self, word: str) -> None:
        node = self
        for ch in word:
            if ch not in node.children:
                node.children[ch] = Trie()
            node = node.children[ch]
        node.is_end = True

    def _find(self, word: str):
        node = self
        for ch in word:
            if ch not in node.children:
                return None
            node = node.children[ch]
        return node

    def search(self, word: str) -> bool:
        node = self._find(word)
        return node is not None and node.is_end

    def startsWith(self, prefix: str) -> bool:
        return self._find(prefix) is not None
```

</div>
</div>

## 复杂度分析

| | 时间复杂度 | 空间复杂度 |
|---|---|---|
| Go / Python | O(L) 每次操作 | O(总字符数·26) |

**解释：** 每次操作沿单词长度 `L` 下行；空间取决于插入的字符总量。
