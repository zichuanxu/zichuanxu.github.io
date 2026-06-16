---
title: "142. 环形链表 II (Linked List Cycle II)"
date: 2026-06-16
category: algorithms
topic: linked-list
number: 142
difficulty: 中等
tags: [哈希表, 链表, 双指针]
leetcode_url: "https://leetcode.cn/problems/linked-list-cycle-ii/"
permalink: /leetcode/0142-linked-list-cycle-ii/
layout: leetcode-post
---

## 题目描述

给定链表头节点 `head`，返回链表开始入环的第一个节点；无环则返回 `null`。

**示例：** 返回环的入口节点。

## 思路分析

**核心思想：** Floyd 判圈定理。快慢指针相遇后，再让一个指针从头出发、一个从相遇点出发，每次各走一步，二者会在**入环点**相遇。

**详细步骤：**

1. 快慢指针找相遇点；若快指针到末尾说明无环。
2. 设头到入环点距离 `a`、入环点到相遇点 `b`，可推出再走 `a` 步两指针会在入环点相遇。
3. 令 `p` 从头、`slow` 从相遇点同步前进，相等处即入环点。

## 代码实现

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn" data-lang="go" onclick="switchCodeTab(this)">Go</button>
<button class="tab-btn" data-lang="python" onclick="switchCodeTab(this)">Python</button>
</div>
<div class="tab-content" data-lang="go" markdown="1">

```go
func detectCycle(head *ListNode) *ListNode {
    slow, fast := head, head
    for fast != nil && fast.Next != nil {
        slow = slow.Next
        fast = fast.Next.Next
        if slow == fast { // 相遇
            p := head
            for p != slow {
                p = p.Next
                slow = slow.Next
            }
            return p
        }
    }
    return nil
}
```

</div>
<div class="tab-content" data-lang="python" markdown="1">

```python
class Solution:
    def detectCycle(self, head: Optional[ListNode]) -> Optional[ListNode]:
        slow = fast = head
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
            if slow is fast:
                p = head
                while p is not slow:
                    p = p.next
                    slow = slow.next
                return p
        return None
```

</div>
</div>

## 复杂度分析

| | 时间复杂度 | 空间复杂度 |
|---|---|---|
| Go / Python | O(n) | O(1) |

**解释：** 两轮线性遍历，常数额外空间。
