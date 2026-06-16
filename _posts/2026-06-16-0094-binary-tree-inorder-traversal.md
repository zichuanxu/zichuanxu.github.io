---
title: "94. 二叉树的中序遍历 (Binary Tree Inorder Traversal)"
date: 2026-06-16
category: algorithms
topic: binary-tree
number: 94
difficulty: 简单
tags: [栈, 树, 深度优先搜索, 二叉树]
leetcode_url: "https://leetcode.cn/problems/binary-tree-inorder-traversal/"
permalink: /leetcode/0094-binary-tree-inorder-traversal/
layout: leetcode-post
---

## 题目描述

给定二叉树根节点 `root`，返回它的**中序遍历**结果（左 → 根 → 右）。

**示例：** `root = [1,null,2,3]` → `[1,3,2]`。

## 思路分析

**核心思想：** 中序遍历的递归定义直接对应「先遍历左子树、再访问根、最后遍历右子树」。

**详细步骤：**

1. 递归到空节点直接返回。
2. 先递归左子树，把根值加入结果，再递归右子树。

## 代码实现

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn" data-lang="go" onclick="switchCodeTab(this)">Go</button>
<button class="tab-btn" data-lang="python" onclick="switchCodeTab(this)">Python</button>
</div>
<div class="tab-content" data-lang="go" markdown="1">

```go
func inorderTraversal(root *TreeNode) []int {
    res := []int{}
    var inorder func(*TreeNode)
    inorder = func(node *TreeNode) {
        if node == nil {
            return
        }
        inorder(node.Left)
        res = append(res, node.Val)
        inorder(node.Right)
    }
    inorder(root)
    return res
}
```

</div>
<div class="tab-content" data-lang="python" markdown="1">

```python
class Solution:
    def inorderTraversal(self, root: Optional[TreeNode]) -> List[int]:
        res = []
        def inorder(node):
            if not node:
                return
            inorder(node.left)
            res.append(node.val)
            inorder(node.right)
        inorder(root)
        return res
```

</div>
</div>

## 复杂度分析

| | 时间复杂度 | 空间复杂度 |
|---|---|---|
| Go / Python | O(n) | O(n) |

**解释：** 每个节点访问一次；空间为递归栈深度（最坏 O(n)）。
