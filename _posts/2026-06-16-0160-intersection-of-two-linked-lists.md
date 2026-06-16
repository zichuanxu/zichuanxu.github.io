---
title: "160. 相交链表 (Intersection of Two Linked Lists)"
date: 2026-06-16
category: algorithms
topic: linked-list
number: 160
difficulty: 简单
tags: [哈希表, 链表, 双指针]
leetcode_url: "https://leetcode.cn/problems/intersection-of-two-linked-lists/"
permalink: /leetcode/0160-intersection-of-two-linked-lists/
layout: leetcode-post
---

## 题目描述

给定两个单链表的头节点 `headA`、`headB`，返回它们开始相交的节点；不相交则返回 `null`。

**示例：** 两链表在某节点后共享同一段，返回该交点。

## 思路分析

**核心思想：** 双指针「走对方的路」。指针 `a` 走完 A 接着走 B，指针 `b` 走完 B 接着走 A，两者走过的总长度相等，必在交点相遇（或同时到 `nil`）。

**详细步骤：**

1. `a = headA, b = headB`。
2. 每步 `a` 前进；到末尾后跳到 `headB`；`b` 同理跳到 `headA`。
3. `a == b` 时即交点（无交点时同为 `nil`）。

## 代码实现

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn" data-lang="go" onclick="switchCodeTab(this)">Go</button>
<button class="tab-btn" data-lang="python" onclick="switchCodeTab(this)">Python</button>
</div>
<div class="tab-content" data-lang="go" markdown="1">

```go
func getIntersectionNode(headA, headB *ListNode) *ListNode {
    a, b := headA, headB
    for a != b {
        if a == nil {
            a = headB
        } else {
            a = a.Next
        }
        if b == nil {
            b = headA
        } else {
            b = b.Next
        }
    }
    return a
}
```

</div>
<div class="tab-content" data-lang="python" markdown="1">

```python
class Solution:
    def getIntersectionNode(self, headA: ListNode, headB: ListNode) -> Optional[ListNode]:
        a, b = headA, headB
        while a is not b:
            a = a.next if a else headB
            b = b.next if b else headA
        return a
```

</div>
</div>

## 复杂度分析

| | 时间复杂度 | 空间复杂度 |
|---|---|---|
| Go / Python | O(m + n) | O(1) |

**解释：** 两指针最多各走 `m + n` 步即相遇。
