---
title: "101. 对称二叉树 (Symmetric Tree)"
date: 2026-06-16
category: algorithms
topic: binary-tree
number: 101
difficulty: 简单
tags: [树, 深度优先搜索, 广度优先搜索, 二叉树]
leetcode_url: "https://leetcode.cn/problems/symmetric-tree/"
permalink: /leetcode/0101-symmetric-tree/
layout: leetcode-post
---

## 题目描述

给定二叉树根节点 `root`，判断它是否轴对称（镜像对称）。

**示例：** `[1,2,2,3,4,4,3]` → `true`。

## 思路分析

**核心思想：** 同步比较「左子树」与「右子树」的镜像：左的左对右的右、左的右对右的左。

**详细步骤：**

1. 定义 `mirror(a, b)`：两者都空为真；只一空或值不等为假。
2. 递归比较 `a.Left vs b.Right` 与 `a.Right vs b.Left`。

## 代码实现

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn" data-lang="go" onclick="switchCodeTab(this)">Go</button>
<button class="tab-btn" data-lang="python" onclick="switchCodeTab(this)">Python</button>
</div>
<div class="tab-content" data-lang="go" markdown="1">

```go
func isSymmetric(root *TreeNode) bool {
    if root == nil {
        return true
    }
    var mirror func(a, b *TreeNode) bool
    mirror = func(a, b *TreeNode) bool {
        if a == nil && b == nil {
            return true
        }
        if a == nil || b == nil || a.Val != b.Val {
            return false
        }
        return mirror(a.Left, b.Right) && mirror(a.Right, b.Left)
    }
    return mirror(root.Left, root.Right)
}
```

</div>
<div class="tab-content" data-lang="python" markdown="1">

```python
class Solution:
    def isSymmetric(self, root: Optional[TreeNode]) -> bool:
        def mirror(a, b):
            if not a and not b:
                return True
            if not a or not b or a.val != b.val:
                return False
            return mirror(a.left, b.right) and mirror(a.right, b.left)
        return mirror(root.left, root.right) if root else True
```

</div>
</div>

## 复杂度分析

| | 时间复杂度 | 空间复杂度 |
|---|---|---|
| Go / Python | O(n) | O(h) |

**解释：** 每个节点比较一次；递归栈深度为树高。
