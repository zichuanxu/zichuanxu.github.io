---
title: "104. 二叉树的最大深度 (Maximum Depth of Binary Tree)"
date: 2026-06-16
category: algorithms
topic: binary-tree
number: 104
difficulty: 简单
tags: [树, 深度优先搜索, 广度优先搜索, 二叉树]
leetcode_url: "https://leetcode.cn/problems/maximum-depth-of-binary-tree/"
permalink: /leetcode/0104-maximum-depth-of-binary-tree/
layout: leetcode-post
---

## 题目描述

给定二叉树根节点 `root`，返回其最大深度（从根到最远叶子的节点数）。

**示例：** `root = [3,9,20,null,null,15,7]` → `3`。

## 思路分析

**核心思想：** 递归。一棵树的最大深度 = 左右子树最大深度的较大者 + 1。

**详细步骤：**

1. 空节点深度为 0。
2. 返回 `max(左深度, 右深度) + 1`。

## 代码实现

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn" data-lang="go" onclick="switchCodeTab(this)">Go</button>
<button class="tab-btn" data-lang="python" onclick="switchCodeTab(this)">Python</button>
</div>
<div class="tab-content" data-lang="go" markdown="1">

```go
func maxDepth(root *TreeNode) int {
    if root == nil {
        return 0
    }
    l, r := maxDepth(root.Left), maxDepth(root.Right)
    if l > r {
        return l + 1
    }
    return r + 1
}
```

</div>
<div class="tab-content" data-lang="python" markdown="1">

```python
class Solution:
    def maxDepth(self, root: Optional[TreeNode]) -> int:
        if not root:
            return 0
        return 1 + max(self.maxDepth(root.left), self.maxDepth(root.right))
```

</div>
</div>

## 复杂度分析

| | 时间复杂度 | 空间复杂度 |
|---|---|---|
| Go / Python | O(n) | O(h) |

**解释：** 每个节点访问一次；空间为树高 `h`（递归栈）。
