---
title: "543. 二叉树的直径 (Diameter of Binary Tree)"
date: 2026-06-16
category: algorithms
topic: binary-tree
number: 543
difficulty: 简单
tags: [树, 深度优先搜索, 二叉树]
leetcode_url: "https://leetcode.cn/problems/diameter-of-binary-tree/"
permalink: /leetcode/0543-diameter-of-binary-tree/
layout: leetcode-post
---

## 题目描述

给定二叉树，返回其**直径**：任意两节点间最长路径的边数（路径不一定经过根）。

**示例：** `[1,2,3,4,5]` → `3`（路径 `4→2→1→3` 或 `5→2→1→3`）。

## 思路分析

**核心思想：** 对每个节点，「经过它的最长路径」= 左子树深度 + 右子树深度。在求深度的递归中顺带更新全局最大值。

**详细步骤：**

1. `depth(node)` 返回以 `node` 为根的最大深度。
2. 递归时用 `左深度 + 右深度` 更新答案 `best`。
3. 返回 `max(左, 右) + 1` 给上层。

## 代码实现

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn" data-lang="go" onclick="switchCodeTab(this)">Go</button>
<button class="tab-btn" data-lang="python" onclick="switchCodeTab(this)">Python</button>
</div>
<div class="tab-content" data-lang="go" markdown="1">

```go
func diameterOfBinaryTree(root *TreeNode) int {
    best := 0
    var depth func(*TreeNode) int
    depth = func(node *TreeNode) int {
        if node == nil {
            return 0
        }
        l, r := depth(node.Left), depth(node.Right)
        if l+r > best {
            best = l + r // 经过该节点的路径边数
        }
        if l > r {
            return l + 1
        }
        return r + 1
    }
    depth(root)
    return best
}
```

</div>
<div class="tab-content" data-lang="python" markdown="1">

```python
class Solution:
    def diameterOfBinaryTree(self, root: Optional[TreeNode]) -> int:
        best = 0
        def depth(node):
            nonlocal best
            if not node:
                return 0
            l, r = depth(node.left), depth(node.right)
            best = max(best, l + r)
            return 1 + max(l, r)
        depth(root)
        return best
```

</div>
</div>

## 复杂度分析

| | 时间复杂度 | 空间复杂度 |
|---|---|---|
| Go / Python | O(n) | O(h) |

**解释：** 一次后序遍历；递归栈深度为树高。
