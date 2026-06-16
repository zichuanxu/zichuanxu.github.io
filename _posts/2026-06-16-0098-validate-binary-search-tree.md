---
title: "98. 验证二叉搜索树 (Validate Binary Search Tree)"
date: 2026-06-16
category: algorithms
topic: binary-tree
number: 98
difficulty: 中等
tags: [树, 深度优先搜索, 二叉搜索树, 二叉树]
leetcode_url: "https://leetcode.cn/problems/validate-binary-search-tree/"
permalink: /leetcode/0098-validate-binary-search-tree/
layout: leetcode-post
---

## 题目描述

给定二叉树根节点 `root`，判断它是否是合法的二叉搜索树（左子树全小于根、右子树全大于根，且子树同样合法）。

**示例：** `[2,1,3]` → `true`；`[5,1,4,null,null,3,6]` → `false`。

## 思路分析

**核心思想：** BST 的**中序遍历**结果严格递增。中序遍历时维护前驱节点，若出现「前驱值 ≥ 当前值」则非法。

**详细步骤：**

1. 中序递归：先左、再访问当前、后右。
2. 访问当前节点时与 `prev` 比较，非严格递增即返回 `false`。
3. 更新 `prev` 为当前节点。

## 代码实现

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn" data-lang="go" onclick="switchCodeTab(this)">Go</button>
<button class="tab-btn" data-lang="python" onclick="switchCodeTab(this)">Python</button>
</div>
<div class="tab-content" data-lang="go" markdown="1">

```go
func isValidBST(root *TreeNode) bool {
    var prev *TreeNode
    var inorder func(*TreeNode) bool
    inorder = func(node *TreeNode) bool {
        if node == nil {
            return true
        }
        if !inorder(node.Left) {
            return false
        }
        if prev != nil && prev.Val >= node.Val {
            return false // 非严格递增
        }
        prev = node
        return inorder(node.Right)
    }
    return inorder(root)
}
```

</div>
<div class="tab-content" data-lang="python" markdown="1">

```python
class Solution:
    def isValidBST(self, root: Optional[TreeNode]) -> bool:
        self.prev = None
        def inorder(node):
            if not node:
                return True
            if not inorder(node.left):
                return False
            if self.prev is not None and self.prev.val >= node.val:
                return False
            self.prev = node
            return inorder(node.right)
        return inorder(root)
```

</div>
</div>

## 复杂度分析

| | 时间复杂度 | 空间复杂度 |
|---|---|---|
| Go / Python | O(n) | O(h) |

**解释：** 一次中序遍历；递归栈深度为树高。
