---
title: "230. 二叉搜索树中第 K 小的元素 (Kth Smallest Element in a BST)"
date: 2026-06-16
category: algorithms
topic: binary-tree
number: 230
difficulty: 中等
tags: [树, 深度优先搜索, 二叉搜索树, 二叉树]
leetcode_url: "https://leetcode.cn/problems/kth-smallest-element-in-a-bst/"
permalink: /leetcode/0230-kth-smallest-element-in-a-bst/
layout: leetcode-post
---

## 题目描述

给定二叉搜索树根节点 `root` 和整数 `k`，返回树中第 `k` 小的元素（`k` 从 1 计）。

**示例：** `root = [3,1,4,null,2], k = 1` → `1`。

## 思路分析

**核心思想：** BST 中序遍历是升序序列；用**迭代中序**走到第 `k` 个弹出的节点即可，无需遍历整棵树。

**详细步骤：**

1. 用栈模拟中序：一路压入左孩子。
2. 弹栈即访问，计数 `k--`；当 `k == 0` 时返回该节点值。
3. 否则转向右子树继续。

## 代码实现

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn" data-lang="go" onclick="switchCodeTab(this)">Go</button>
<button class="tab-btn" data-lang="python" onclick="switchCodeTab(this)">Python</button>
</div>
<div class="tab-content" data-lang="go" markdown="1">

```go
func kthSmallest(root *TreeNode, k int) int {
    stack := []*TreeNode{}
    node := root
    for node != nil || len(stack) > 0 {
        for node != nil {
            stack = append(stack, node)
            node = node.Left
        }
        node = stack[len(stack)-1]
        stack = stack[:len(stack)-1]
        k--
        if k == 0 {
            return node.Val
        }
        node = node.Right
    }
    return -1
}
```

</div>
<div class="tab-content" data-lang="python" markdown="1">

```python
class Solution:
    def kthSmallest(self, root: Optional[TreeNode], k: int) -> int:
        stack, node = [], root
        while node or stack:
            while node:
                stack.append(node)
                node = node.left
            node = stack.pop()
            k -= 1
            if k == 0:
                return node.val
            node = node.right
        return -1
```

</div>
</div>

## 复杂度分析

| | 时间复杂度 | 空间复杂度 |
|---|---|---|
| Go / Python | O(h + k) | O(h) |

**解释：** 只需中序走到第 `k` 个节点；栈深度为树高 `h`。
