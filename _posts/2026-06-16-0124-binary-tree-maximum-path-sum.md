---
title: "124. 二叉树中的最大路径和 (Binary Tree Maximum Path Sum)"
date: 2026-06-16
category: algorithms
topic: binary-tree
number: 124
difficulty: 困难
tags: [树, 深度优先搜索, 动态规划, 二叉树]
leetcode_url: "https://leetcode.cn/problems/binary-tree-maximum-path-sum/"
permalink: /leetcode/0124-binary-tree-maximum-path-sum/
layout: leetcode-post
---

## 题目描述

路径定义为从树中任意节点出发、沿父子边到达任意节点的序列。求所有路径中节点值之和的最大值。

**示例：** `root = [-10,9,20,null,null,15,7]` → `42`（路径 `15→20→7`）。

## 思路分析

**核心思想：** 对每个节点计算「向下延伸的最大贡献」`gain`（负贡献舍弃为 0）。以该节点为「拐点」的路径和 = `node.Val + 左贡献 + 右贡献`，用它更新全局答案。

**详细步骤：**

1. `gain(node)` 返回从该节点向下单边的最大和（小于 0 取 0）。
2. 递归时用 `node.Val + leftGain + rightGain` 更新 `best`。
3. 向上层只能返回单边：`node.Val + max(leftGain, rightGain)`。

## 代码实现

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn" data-lang="go" onclick="switchCodeTab(this)">Go</button>
<button class="tab-btn" data-lang="python" onclick="switchCodeTab(this)">Python</button>
</div>
<div class="tab-content" data-lang="go" markdown="1">

```go
func maxPathSum(root *TreeNode) int {
    best := root.Val
    var gain func(*TreeNode) int
    gain = func(node *TreeNode) int {
        if node == nil {
            return 0
        }
        left := gain(node.Left)
        if left < 0 {
            left = 0 // 负贡献舍弃
        }
        right := gain(node.Right)
        if right < 0 {
            right = 0
        }
        if node.Val+left+right > best {
            best = node.Val + left + right // 以该节点为拐点
        }
        if left > right {
            return node.Val + left
        }
        return node.Val + right
    }
    gain(root)
    return best
}
```

</div>
<div class="tab-content" data-lang="python" markdown="1">

```python
class Solution:
    def maxPathSum(self, root: Optional[TreeNode]) -> int:
        self.best = root.val
        def gain(node):
            if not node:
                return 0
            left = max(gain(node.left), 0)
            right = max(gain(node.right), 0)
            self.best = max(self.best, node.val + left + right)
            return node.val + max(left, right)
        gain(root)
        return self.best
```

</div>
</div>

## 复杂度分析

| | 时间复杂度 | 空间复杂度 |
|---|---|---|
| Go / Python | O(n) | O(h) |

**解释：** 一次后序遍历；递归栈深度为树高 `h`。
