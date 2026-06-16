---
title: "141. 环形链表 (Linked List Cycle)"
date: 2026-06-16
category: algorithms
topic: linked-list
number: 141
difficulty: 简单
tags: [哈希表, 链表, 双指针]
leetcode_url: "https://leetcode.cn/problems/linked-list-cycle/"
permalink: /leetcode/0141-linked-list-cycle/
layout: leetcode-post
---

## 题目描述

给定链表头节点 `head`，判断链表中是否存在环。

**示例：** 尾节点指向中间某节点 → `true`。

## 思路分析

**核心思想：** 快慢指针（Floyd 判圈）。快指针每次走两步、慢指针每次走一步；若有环，二者必在环内相遇。

**详细步骤：**

1. `slow` 走一步、`fast` 走两步。
2. 若 `fast` 到达 `nil` 说明无环。
3. 若 `slow == fast` 说明相遇，存在环。

## 代码实现

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn" data-lang="go" onclick="switchCodeTab(this)">Go</button>
<button class="tab-btn" data-lang="python" onclick="switchCodeTab(this)">Python</button>
</div>
<div class="tab-content" data-lang="go" markdown="1">

```go
func hasCycle(head *ListNode) bool {
    slow, fast := head, head
    for fast != nil && fast.Next != nil {
        slow = slow.Next
        fast = fast.Next.Next
        if slow == fast {
            return true
        }
    }
    return false
}
```

</div>
<div class="tab-content" data-lang="python" markdown="1">

```python
class Solution:
    def hasCycle(self, head: Optional[ListNode]) -> bool:
        slow = fast = head
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
            if slow is fast:
                return True
        return False
```

</div>
</div>

## 复杂度分析

| | 时间复杂度 | 空间复杂度 |
|---|---|---|
| Go / Python | O(n) | O(1) |

**解释：** 快指针至多绕环一圈即追上慢指针，常数额外空间。
