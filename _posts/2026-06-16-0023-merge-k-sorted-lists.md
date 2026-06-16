---
title: "23. 合并 K 个升序链表 (Merge k Sorted Lists)"
date: 2026-06-16
category: algorithms
topic: linked-list
number: 23
difficulty: 困难
tags: [链表, 分治, 堆, 归并排序]
leetcode_url: "https://leetcode.cn/problems/merge-k-sorted-lists/"
permalink: /leetcode/0023-merge-k-sorted-lists/
layout: leetcode-post
---

## 题目描述

给定 `k` 个升序链表，将它们合并为一个升序链表并返回。

**示例：** `[[1,4,5],[1,3,4],[2,6]]` → `1→1→2→3→4→4→5→6`。

## 思路分析

**核心思想：** 两种主流写法——**分治两两合并**（Go）或**最小堆**（Python）。两两合并把 `k` 路问题折半为 log k 轮，每轮总工作量 O(N)。

**详细步骤（分治）：**

1. 相邻链表两两合并为一半数量。
2. 重复直到只剩一条链表。
3. 单次合并复用「合并两个有序链表」。

## 代码实现

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn" data-lang="go" onclick="switchCodeTab(this)">Go</button>
<button class="tab-btn" data-lang="python" onclick="switchCodeTab(this)">Python</button>
</div>
<div class="tab-content" data-lang="go" markdown="1">

```go
func mergeKLists(lists []*ListNode) *ListNode {
    if len(lists) == 0 {
        return nil
    }
    for len(lists) > 1 {
        merged := []*ListNode{}
        for i := 0; i < len(lists); i += 2 {
            if i+1 < len(lists) {
                merged = append(merged, mergeTwo(lists[i], lists[i+1]))
            } else {
                merged = append(merged, lists[i])
            }
        }
        lists = merged
    }
    return lists[0]
}

func mergeTwo(a, b *ListNode) *ListNode {
    dummy := &ListNode{}
    tail := dummy
    for a != nil && b != nil {
        if a.Val <= b.Val {
            tail.Next, a = a, a.Next
        } else {
            tail.Next, b = b, b.Next
        }
        tail = tail.Next
    }
    if a != nil {
        tail.Next = a
    } else {
        tail.Next = b
    }
    return dummy.Next
}
```

</div>
<div class="tab-content" data-lang="python" markdown="1">

```python
import heapq

class Solution:
    def mergeKLists(self, lists: List[Optional[ListNode]]) -> Optional[ListNode]:
        heap = []
        for i, node in enumerate(lists):
            if node:
                heapq.heappush(heap, (node.val, i, node))  # i 避免比较节点
        dummy = tail = ListNode()
        while heap:
            _, i, node = heapq.heappop(heap)
            tail.next = node
            tail = node
            if node.next:
                heapq.heappush(heap, (node.next.val, i, node.next))
        return dummy.next
```

</div>
</div>

## 复杂度分析

| | 时间复杂度 | 空间复杂度 |
|---|---|---|
| Go / Python | O(N·log k) | O(k) |

**解释：** `N` 为总节点数，`k` 为链表数；分治 log k 轮、堆维护 k 个候选。
