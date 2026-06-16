---
title: "25. K 个一组翻转链表 (Reverse Nodes in k-Group)"
date: 2026-06-16
category: algorithms
topic: linked-list
number: 25
difficulty: 困难
tags: [递归, 链表]
leetcode_url: "https://leetcode.cn/problems/reverse-nodes-in-k-group/"
permalink: /leetcode/0025-reverse-nodes-in-k-group/
layout: leetcode-post
---

## 题目描述

给定链表，每 `k` 个节点一组进行翻转，返回翻转后的链表。不足 `k` 个的尾部保持原序。

**示例：** `1→2→3→4→5, k = 2` → `2→1→4→3→5`。

## 思路分析

**核心思想：** 递归。先检查是否有 `k` 个节点，够则翻转本组并把组尾接到「后续递归处理好的结果」上。

**详细步骤：**

1. 从 `head` 数 `k` 个节点；不足 `k` 则原样返回 `head`。
2. 递归处理第 `k+1` 个节点之后的部分，得到 `prev`（新的后续头）。
3. 翻转本组 `k` 个节点，逐个接到 `prev` 前，返回新的组头。

## 代码实现

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn" data-lang="go" onclick="switchCodeTab(this)">Go</button>
<button class="tab-btn" data-lang="python" onclick="switchCodeTab(this)">Python</button>
</div>
<div class="tab-content" data-lang="go" markdown="1">

```go
func reverseKGroup(head *ListNode, k int) *ListNode {
    node := head
    for i := 0; i < k; i++ { // 检查是否有 k 个节点
        if node == nil {
            return head
        }
        node = node.Next
    }
    prev := reverseKGroup(node, k) // 递归处理后续，作为本组翻转后的尾接
    cur := head
    for i := 0; i < k; i++ {
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
    def reverseKGroup(self, head: Optional[ListNode], k: int) -> Optional[ListNode]:
        node = head
        for _ in range(k):
            if not node:
                return head
            node = node.next
        prev = self.reverseKGroup(node, k)  # 递归处理后续
        cur = head
        for _ in range(k):
            cur.next, prev, cur = prev, cur, cur.next
        return prev
```

</div>
</div>

## 复杂度分析

| | 时间复杂度 | 空间复杂度 |
|---|---|---|
| Go / Python | O(n) | O(n / k) |

**解释：** 每个节点被访问常数次；递归深度为组数 `n/k`。
