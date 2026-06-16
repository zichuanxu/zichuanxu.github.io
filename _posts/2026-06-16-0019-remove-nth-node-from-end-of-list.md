---
title: "19. 删除链表的倒数第 N 个结点 (Remove Nth Node From End of List)"
date: 2026-06-16
category: algorithms
topic: linked-list
number: 19
difficulty: 中等
tags: [链表, 双指针]
leetcode_url: "https://leetcode.cn/problems/remove-nth-node-from-end-of-list/"
permalink: /leetcode/0019-remove-nth-node-from-end-of-list/
layout: leetcode-post
---

## 题目描述

给定链表，删除倒数第 `n` 个结点并返回头节点。要求一次遍历完成。

**示例：** `1→2→3→4→5, n = 2` → `1→2→3→5`。

## 思路分析

**核心思想：** 快慢双指针 + 哑结点。快指针先走 `n` 步，再与慢指针同步前进；快指针到末尾时，慢指针恰好停在待删结点的**前驱**。

**详细步骤：**

1. 哑结点指向头，`fast = slow = dummy`。
2. `fast` 先前进 `n` 步。
3. 两指针同步前进，直到 `fast.Next == nil`；此时 `slow.Next` 即目标，跳过它。

## 代码实现

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn" data-lang="go" onclick="switchCodeTab(this)">Go</button>
<button class="tab-btn" data-lang="python" onclick="switchCodeTab(this)">Python</button>
</div>
<div class="tab-content" data-lang="go" markdown="1">

```go
func removeNthFromEnd(head *ListNode, n int) *ListNode {
    dummy := &ListNode{Next: head}
    fast, slow := dummy, dummy
    for i := 0; i < n; i++ {
        fast = fast.Next
    }
    for fast.Next != nil {
        fast = fast.Next
        slow = slow.Next
    }
    slow.Next = slow.Next.Next // 删除目标结点
    return dummy.Next
}
```

</div>
<div class="tab-content" data-lang="python" markdown="1">

```python
class Solution:
    def removeNthFromEnd(self, head: Optional[ListNode], n: int) -> Optional[ListNode]:
        dummy = ListNode(0, head)
        fast = slow = dummy
        for _ in range(n):
            fast = fast.next
        while fast.next:
            fast = fast.next
            slow = slow.next
        slow.next = slow.next.next
        return dummy.next
```

</div>
</div>

## 复杂度分析

| | 时间复杂度 | 空间复杂度 |
|---|---|---|
| Go / Python | O(n) | O(1) |

**解释：** 一次遍历，哑结点优雅处理删除头节点的边界。
