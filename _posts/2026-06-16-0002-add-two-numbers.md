---
title: "2. 两数相加 (Add Two Numbers)"
date: 2026-06-16
category: algorithms
topic: linked-list
number: 2
difficulty: 中等
tags: [递归, 链表, 数学]
leetcode_url: "https://leetcode.cn/problems/add-two-numbers/"
permalink: /leetcode/0002-add-two-numbers/
layout: leetcode-post
---

## 题目描述

两个非空链表表示两个非负整数，数字按**逆序**存储，每个节点一位。将两数相加并以同样形式返回。

**示例：** `2→4→3` 加 `5→6→4`（即 342 + 465）→ `7→0→8`（807）。

## 思路分析

**核心思想：** 模拟竖式加法。逐位相加，维护进位 `carry`，逆序存储恰好与加法从低位到高位一致。

**详细步骤：**

1. 同步遍历两链表，`sum = 两节点值 + carry`。
2. 新节点存 `sum % 10`，`carry = sum / 10`。
3. 某链表更短则补 0；遍历结束后若仍有进位再补一个节点。

## 代码实现

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn" data-lang="go" onclick="switchCodeTab(this)">Go</button>
<button class="tab-btn" data-lang="python" onclick="switchCodeTab(this)">Python</button>
</div>
<div class="tab-content" data-lang="go" markdown="1">

```go
func addTwoNumbers(l1, l2 *ListNode) *ListNode {
    dummy := &ListNode{}
    tail := dummy
    carry := 0
    for l1 != nil || l2 != nil || carry != 0 {
        sum := carry
        if l1 != nil {
            sum += l1.Val
            l1 = l1.Next
        }
        if l2 != nil {
            sum += l2.Val
            l2 = l2.Next
        }
        carry = sum / 10
        tail.Next = &ListNode{Val: sum % 10}
        tail = tail.Next
    }
    return dummy.Next
}
```

</div>
<div class="tab-content" data-lang="python" markdown="1">

```python
class Solution:
    def addTwoNumbers(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:
        dummy = tail = ListNode()
        carry = 0
        while l1 or l2 or carry:
            s = carry
            if l1:
                s += l1.val
                l1 = l1.next
            if l2:
                s += l2.val
                l2 = l2.next
            carry, val = divmod(s, 10)
            tail.next = ListNode(val)
            tail = tail.next
        return dummy.next
```

</div>
</div>

## 复杂度分析

| | 时间复杂度 | 空间复杂度 |
|---|---|---|
| Go / Python | O(max(m, n)) | O(max(m, n)) |

**解释：** 遍历较长链表一次；结果链表长度同量级。
