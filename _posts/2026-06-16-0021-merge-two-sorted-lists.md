---
title: "21. 合并两个有序链表 (Merge Two Sorted Lists)"
date: 2026-06-16
category: algorithms
topic: linked-list
number: 21
difficulty: 简单
tags: [递归, 链表]
leetcode_url: "https://leetcode.cn/problems/merge-two-sorted-lists/"
permalink: /leetcode/0021-merge-two-sorted-lists/
layout: leetcode-post
---

## 题目描述

将两个升序链表合并为一个新的升序链表并返回。

**示例：** `1→2→4` 与 `1→3→4` → `1→1→2→3→4→4`。

## 思路分析

**核心思想：** 哑结点 + 尾插。每次取两链表较小的头节点接到结果尾部，直到一方耗尽，再接上另一方剩余部分。

**详细步骤：**

1. 建哑结点 `dummy`，`tail` 指向它。
2. 比较两链表头，较小者接到 `tail` 之后并前移该链表。
3. 任一链表为空后，把另一链表整段接上。

## 代码实现

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn" data-lang="go" onclick="switchCodeTab(this)">Go</button>
<button class="tab-btn" data-lang="python" onclick="switchCodeTab(this)">Python</button>
</div>
<div class="tab-content" data-lang="go" markdown="1">

```go
func mergeTwoLists(list1, list2 *ListNode) *ListNode {
    dummy := &ListNode{}
    tail := dummy
    for list1 != nil && list2 != nil {
        if list1.Val <= list2.Val {
            tail.Next, list1 = list1, list1.Next
        } else {
            tail.Next, list2 = list2, list2.Next
        }
        tail = tail.Next
    }
    if list1 != nil {
        tail.Next = list1
    } else {
        tail.Next = list2
    }
    return dummy.Next
}
```

</div>
<div class="tab-content" data-lang="python" markdown="1">

```python
class Solution:
    def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:
        dummy = tail = ListNode()
        while list1 and list2:
            if list1.val <= list2.val:
                tail.next, list1 = list1, list1.next
            else:
                tail.next, list2 = list2, list2.next
            tail = tail.next
        tail.next = list1 or list2
        return dummy.next
```

</div>
</div>

## 复杂度分析

| | 时间复杂度 | 空间复杂度 |
|---|---|---|
| Go / Python | O(m + n) | O(1) |

**解释：** 每个节点接入一次；迭代版只用常数指针。
