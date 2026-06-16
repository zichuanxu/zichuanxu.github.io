---
title: "206. 反转链表 (Reverse Linked List)"
date: 2026-06-16
category: algorithms
topic: linked-list
number: 206
difficulty: 简单
tags: [链表, 双指针]
leetcode_url: "https://leetcode.cn/problems/reverse-linked-list/"
permalink: /leetcode/0206-reverse-linked-list/
layout: leetcode-post
---

## 题目描述

反转一个单链表，返回反转后的头节点。

**示例：** `1→2→3→4→5` 反转为 `5→4→3→2→1`。

## 思路分析

**核心思想：** 迭代三指针法。遍历链表时，逐一将当前节点的 `next` 指针反向，`prev` 最终成为新的头节点。

**详细步骤：**

1. 初始化 `prev = nil`，`cur = head`。
2. 每轮循环：先保存 `next = cur.Next`，防止断链；将 `cur.Next` 指向 `prev`；再令 `prev = cur`、`cur = next`，各前进一步。
3. 循环结束时 `cur == nil`，`prev` 即为反转后的头节点，直接返回。

## 代码实现

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn" data-lang="go" onclick="switchCodeTab(this)">Go</button>
<button class="tab-btn" data-lang="python" onclick="switchCodeTab(this)">Python</button>
</div>
<div class="tab-content" data-lang="go" markdown="1">

```go
func reverseList(head *ListNode) *ListNode {
    var prev *ListNode
    for cur := head; cur != nil; {
        next := cur.Next
        cur.Next = prev
        prev = cur
        cur = next
    }
    return prev
}
```

</div>
<div class="tab-content" data-lang="python" markdown="1">

```python
class Solution:
    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        prev = None
        cur = head
        while cur:
            nxt = cur.next
            cur.next = prev
            prev = cur
            cur = nxt
        return prev
```

</div>
</div>

## 复杂度分析

| | 时间复杂度 | 空间复杂度 |
|---|---|---|
| Go / Python | O(n) | O(1) |

**解释：** 一次遍历，仅用常数个指针（`prev`、`cur`、`next`），无递归栈开销。
