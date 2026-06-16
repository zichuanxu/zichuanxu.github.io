---
title: "114. 二叉树展开为链表 (Flatten Binary Tree to Linked List)"
date: 2026-06-16
category: algorithms
topic: binary-tree
number: 114
difficulty: 中等
tags: [栈, 树, 深度优先搜索, 链表, 二叉树]
leetcode_url: "https://leetcode.cn/problems/flatten-binary-tree-to-linked-list/"
permalink: /leetcode/0114-flatten-binary-tree-to-linked-list/
layout: leetcode-post
---

## 题目描述

给定二叉树根节点 `root`，将其原地展开为一个「单链表」：用 `Right` 指针串联，顺序与**先序遍历**相同，所有 `Left` 置空。

**示例：** `[1,2,5,3,4,null,6]` → `1→2→3→4→5→6`（均挂在右指针上）。

## 思路分析

**核心思想：** 对每个有左子树的节点，把左子树整体插到「该节点与其右子树之间」：找到左子树的**最右节点**接上原右子树，再把左子树搬到右边。

**详细步骤：**

1. 从根开始遍历当前节点 `cur`。
2. 若有左子树：找左子树最右节点 `pre`，令 `pre.Right = cur.Right`；再 `cur.Right = cur.Left`，`cur.Left = nil`。
3. `cur = cur.Right` 继续，直到结束。

## 代码实现

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn" data-lang="go" onclick="switchCodeTab(this)">Go</button>
<button class="tab-btn" data-lang="python" onclick="switchCodeTab(this)">Python</button>
</div>
<div class="tab-content" data-lang="go" markdown="1">

```go
func flatten(root *TreeNode) {
    cur := root
    for cur != nil {
        if cur.Left != nil {
            pre := cur.Left
            for pre.Right != nil { // 左子树最右节点
                pre = pre.Right
            }
            pre.Right = cur.Right
            cur.Right = cur.Left
            cur.Left = nil
        }
        cur = cur.Right
    }
}
```

</div>
<div class="tab-content" data-lang="python" markdown="1">

```python
class Solution:
    def flatten(self, root: Optional[TreeNode]) -> None:
        cur = root
        while cur:
            if cur.left:
                pre = cur.left
                while pre.right:
                    pre = pre.right
                pre.right = cur.right
                cur.right = cur.left
                cur.left = None
            cur = cur.right
```

</div>
</div>

## 复杂度分析

| | 时间复杂度 | 空间复杂度 |
|---|---|---|
| Go / Python | O(n) | O(1) |

**解释：** 每个节点至多被访问常数次；原地操作不用额外空间。
