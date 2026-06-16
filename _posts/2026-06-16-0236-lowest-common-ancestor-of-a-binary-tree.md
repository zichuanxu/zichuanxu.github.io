---
title: "236. 二叉树的最近公共祖先 (Lowest Common Ancestor of a Binary Tree)"
date: 2026-06-16
category: algorithms
topic: binary-tree
number: 236
difficulty: 中等
tags: [树, 深度优先搜索, 二叉树]
leetcode_url: "https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-tree/"
permalink: /leetcode/0236-lowest-common-ancestor-of-a-binary-tree/
layout: leetcode-post
---

## 题目描述

给定二叉树及两个节点 `p`、`q`，找出它们的最近公共祖先（一个节点可以是自己的祖先）。

**示例：** `root = [3,5,1,6,2,0,8,...], p = 5, q = 1` → `3`。

## 思路分析

**核心思想：** 递归。若当前节点是 `p`、`q` 之一或为空则直接返回；否则在左右子树中查找：若两侧都找到，当前节点即 LCA。

**详细步骤：**

1. 边界：`root` 为空或等于 `p`/`q`，返回 `root`。
2. 递归左右子树。
3. 左右都非空 → 当前节点为 LCA；否则返回非空的一侧。

## 代码实现

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn" data-lang="go" onclick="switchCodeTab(this)">Go</button>
<button class="tab-btn" data-lang="python" onclick="switchCodeTab(this)">Python</button>
</div>
<div class="tab-content" data-lang="go" markdown="1">

```go
func lowestCommonAncestor(root, p, q *TreeNode) *TreeNode {
    if root == nil || root == p || root == q {
        return root
    }
    left := lowestCommonAncestor(root.Left, p, q)
    right := lowestCommonAncestor(root.Right, p, q)
    if left != nil && right != nil {
        return root // p、q 分居两侧
    }
    if left != nil {
        return left
    }
    return right
}
```

</div>
<div class="tab-content" data-lang="python" markdown="1">

```python
class Solution:
    def lowestCommonAncestor(self, root: TreeNode, p: TreeNode, q: TreeNode) -> TreeNode:
        if not root or root is p or root is q:
            return root
        left = self.lowestCommonAncestor(root.left, p, q)
        right = self.lowestCommonAncestor(root.right, p, q)
        if left and right:
            return root
        return left or right
```

</div>
</div>

## 复杂度分析

| | 时间复杂度 | 空间复杂度 |
|---|---|---|
| Go / Python | O(n) | O(h) |

**解释：** 每个节点访问一次；递归栈深度为树高。
