---
title: "138. 随机链表的复制 (Copy List with Random Pointer)"
date: 2026-06-16
category: algorithms
topic: linked-list
number: 138
difficulty: 中等
tags: [哈希表, 链表]
leetcode_url: "https://leetcode.cn/problems/copy-list-with-random-pointer/"
permalink: /leetcode/0138-copy-list-with-random-pointer/
layout: leetcode-post
---

## 题目描述

链表每个节点含 `val`、`next`、以及指向任意节点（或 `null`）的 `random` 指针。请构造该链表的**深拷贝**。

**示例：** 返回与原链表结构、随机指针完全对应的全新链表。

## 思路分析

**核心思想：** 哈希表建立「原节点 → 新节点」映射。第一遍创建所有新节点，第二遍按映射填好 `next` 与 `random`。

**详细步骤：**

1. 遍历原链表，为每个节点创建仅含 `val` 的副本，存入 `copies[原] = 新`。
2. 再次遍历，令 `copies[cur].Next = copies[cur.Next]`、`copies[cur].Random = copies[cur.Random]`。
3. `nil` 自然映射为 `nil`，返回 `copies[head]`。

## 代码实现

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn" data-lang="go" onclick="switchCodeTab(this)">Go</button>
<button class="tab-btn" data-lang="python" onclick="switchCodeTab(this)">Python</button>
</div>
<div class="tab-content" data-lang="go" markdown="1">

```go
func copyRandomList(head *Node) *Node {
    if head == nil {
        return nil
    }
    copies := make(map[*Node]*Node)
    for cur := head; cur != nil; cur = cur.Next {
        copies[cur] = &Node{Val: cur.Val}
    }
    for cur := head; cur != nil; cur = cur.Next {
        copies[cur].Next = copies[cur.Next]     // nil 键返回 nil
        copies[cur].Random = copies[cur.Random]
    }
    return copies[head]
}
```

</div>
<div class="tab-content" data-lang="python" markdown="1">

```python
class Solution:
    def copyRandomList(self, head: 'Optional[Node]') -> 'Optional[Node]':
        if not head:
            return None
        copies = {None: None}
        cur = head
        while cur:
            copies[cur] = Node(cur.val)
            cur = cur.next
        cur = head
        while cur:
            copies[cur].next = copies[cur.next]
            copies[cur].random = copies[cur.random]
            cur = cur.next
        return copies[head]
```

</div>
</div>

## 复杂度分析

| | 时间复杂度 | 空间复杂度 |
|---|---|---|
| Go / Python | O(n) | O(n) |

**解释：** 两遍线性遍历；哈希表存 `n` 个节点映射。
