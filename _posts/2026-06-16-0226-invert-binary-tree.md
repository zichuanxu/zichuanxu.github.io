---
title: "226. 翻转二叉树 (Invert Binary Tree)"
date: 2026-06-16
category: algorithms
topic: binary-tree
number: 226
difficulty: 简单
tags: [树, 深度优先搜索, 广度优先搜索, 二叉树]
leetcode_url: "https://leetcode.cn/problems/invert-binary-tree/"
permalink: /leetcode/0226-invert-binary-tree/
layout: leetcode-post
---

## 题目描述

给定二叉树根节点 `root`，翻转这棵树（交换每个节点的左右子树）并返回根节点。

**示例：** `[4,2,7,1,3,6,9]` → `[4,7,2,9,6,3,1]`。

## 思路分析

**核心思想：** 递归地交换每个节点的左右孩子。先翻转子树再交换，或交换后再翻转皆可。

**详细步骤：**

1. 空节点直接返回。
2. 递归翻转左右子树，并把结果交叉赋回 `Left`、`Right`。

## 代码实现

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn" data-lang="go" onclick="switchCodeTab(this)">Go</button>
<button class="tab-btn" data-lang="python" onclick="switchCodeTab(this)">Python</button>
</div>
<div class="tab-content" data-lang="go" markdown="1">

```go
func invertTree(root *TreeNode) *TreeNode {
    if root == nil {
        return nil
    }
    root.Left, root.Right = invertTree(root.Right), invertTree(root.Left)
    return root
}
```

</div>
<div class="tab-content" data-lang="python" markdown="1">

```python
class Solution:
    def invertTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        if not root:
            return None
        root.left, root.right = self.invertTree(root.right), self.invertTree(root.left)
        return root
```

</div>
</div>

## 复杂度分析

| | 时间复杂度 | 空间复杂度 |
|---|---|---|
| Go / Python | O(n) | O(h) |

**解释：** 每个节点交换一次；空间为递归栈深度（树高）。
