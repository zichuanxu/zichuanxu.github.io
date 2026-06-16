---
title: "24. 两两交换链表中的节点 (Swap Nodes in Pairs)"
date: 2026-06-16
category: algorithms
topic: linked-list
number: 24
difficulty: 中等
tags: [递归, 链表]
leetcode_url: "https://leetcode.cn/problems/swap-nodes-in-pairs/"
permalink: /leetcode/0024-swap-nodes-in-pairs/
layout: leetcode-post
---

## 题目描述

给定链表，两两交换相邻节点，返回交换后的链表（不能只改值，需实际交换节点）。

**示例：** `1→2→3→4` → `2→1→4→3`。

## 思路分析

**核心思想：** 哑结点 + 三指针。维护待交换对的前驱 `prev`，每轮交换 `first` 与 `second`，再把 `prev` 推进到下一对前。

**详细步骤：**

1. `prev = dummy`，当 `prev.Next` 与 `prev.Next.Next` 都存在时循环。
2. 取 `first = prev.Next`、`second = first.Next`，重接三条指针完成交换。
3. `prev` 移到 `first`（交换后变为该对的末尾），进入下一对。

## 代码实现

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn" data-lang="go" onclick="switchCodeTab(this)">Go</button>
<button class="tab-btn" data-lang="python" onclick="switchCodeTab(this)">Python</button>
</div>
<div class="tab-content" data-lang="go" markdown="1">

```go
func swapPairs(head *ListNode) *ListNode {
    dummy := &ListNode{Next: head}
    prev := dummy
    for prev.Next != nil && prev.Next.Next != nil {
        first := prev.Next
        second := first.Next
        first.Next = second.Next
        second.Next = first
        prev.Next = second
        prev = first
    }
    return dummy.Next
}
```

</div>
<div class="tab-content" data-lang="python" markdown="1">

```python
class Solution:
    def swapPairs(self, head: Optional[ListNode]) -> Optional[ListNode]:
        dummy = ListNode(0, head)
        prev = dummy
        while prev.next and prev.next.next:
            first, second = prev.next, prev.next.next
            first.next = second.next
            second.next = first
            prev.next = second
            prev = first
        return dummy.next
```

</div>
</div>

## 复杂度分析

| | 时间复杂度 | 空间复杂度 |
|---|---|---|
| Go / Python | O(n) | O(1) |

**解释：** 每对节点交换一次，迭代版常数空间。
