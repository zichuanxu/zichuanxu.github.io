---
title: "234. 回文链表 (Palindrome Linked List)"
date: 2026-06-16
category: algorithms
topic: linked-list
number: 234
difficulty: 简单
tags: [栈, 递归, 链表, 双指针]
leetcode_url: "https://leetcode.cn/problems/palindrome-linked-list/"
permalink: /leetcode/0234-palindrome-linked-list/
layout: leetcode-post
---

## 题目描述

给定单链表头节点 `head`，判断该链表是否为回文链表。要求 O(n) 时间、O(1) 空间。

**示例：** `1 → 2 → 2 → 1` → `true`。

## 思路分析

**核心思想：** 快慢指针找中点，反转后半部分，再与前半部分逐一比较。

**详细步骤：**

1. 快慢指针定位中点。
2. 原地反转后半链表。
3. 从两端向中间比较节点值，全部相等则为回文。

## 代码实现

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn" data-lang="go" onclick="switchCodeTab(this)">Go</button>
<button class="tab-btn" data-lang="python" onclick="switchCodeTab(this)">Python</button>
</div>
<div class="tab-content" data-lang="go" markdown="1">

```go
func isPalindrome(head *ListNode) bool {
    slow, fast := head, head
    for fast != nil && fast.Next != nil { // 找中点
        slow = slow.Next
        fast = fast.Next.Next
    }
    var prev *ListNode
    for slow != nil { // 反转后半部分
        slow.Next, prev, slow = prev, slow, slow.Next
    }
    left, right := head, prev
    for right != nil {
        if left.Val != right.Val {
            return false
        }
        left, right = left.Next, right.Next
    }
    return true
}
```

</div>
<div class="tab-content" data-lang="python" markdown="1">

```python
class Solution:
    def isPalindrome(self, head: Optional[ListNode]) -> bool:
        slow = fast = head
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
        prev = None
        while slow:
            slow.next, prev, slow = prev, slow, slow.next
        left, right = head, prev
        while right:
            if left.val != right.val:
                return False
            left, right = left.next, right.next
        return True
```

</div>
</div>

## 复杂度分析

| | 时间复杂度 | 空间复杂度 |
|---|---|---|
| Go / Python | O(n) | O(1) |

**解释：** 找中点、反转、比较各为线性，原地反转不占额外空间。
