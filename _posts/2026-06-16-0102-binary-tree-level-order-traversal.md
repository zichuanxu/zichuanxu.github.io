---
title: "102. 二叉树的层序遍历 (Binary Tree Level Order Traversal)"
date: 2026-06-16
category: algorithms
topic: binary-tree
number: 102
difficulty: 中等
tags: [树, 广度优先搜索, 二叉树]
leetcode_url: "https://leetcode.cn/problems/binary-tree-level-order-traversal/"
permalink: /leetcode/0102-binary-tree-level-order-traversal/
layout: leetcode-post
---

## 题目描述

给定二叉树根节点 `root`，返回其按层序（逐层从左到右）遍历得到的值的列表。

**示例：** `[3,9,20,null,null,15,7]` → `[[3],[9,20],[15,7]]`。

## 思路分析

**核心思想：** BFS。用队列逐层扩展，每轮处理「当前层全部节点」，收集其值并把孩子作为下一层。

**详细步骤：**

1. 队列初始放根节点。
2. 每轮记录当前层所有节点的值，并把它们的非空孩子组成下一层。
3. 直到队列为空。

## 代码实现

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn" data-lang="go" onclick="switchCodeTab(this)">Go</button>
<button class="tab-btn" data-lang="python" onclick="switchCodeTab(this)">Python</button>
</div>
<div class="tab-content" data-lang="go" markdown="1">

```go
func levelOrder(root *TreeNode) [][]int {
    res := [][]int{}
    if root == nil {
        return res
    }
    queue := []*TreeNode{root}
    for len(queue) > 0 {
        level := []int{}
        next := []*TreeNode{}
        for _, node := range queue {
            level = append(level, node.Val)
            if node.Left != nil {
                next = append(next, node.Left)
            }
            if node.Right != nil {
                next = append(next, node.Right)
            }
        }
        res = append(res, level)
        queue = next
    }
    return res
}
```

</div>
<div class="tab-content" data-lang="python" markdown="1">

```python
class Solution:
    def levelOrder(self, root: Optional[TreeNode]) -> List[List[int]]:
        if not root:
            return []
        res, queue = [], [root]
        while queue:
            res.append([n.val for n in queue])
            queue = [c for n in queue for c in (n.left, n.right) if c]
        return res
```

</div>
</div>

## 复杂度分析

| | 时间复杂度 | 空间复杂度 |
|---|---|---|
| Go / Python | O(n) | O(n) |

**解释：** 每个节点入队出队一次；队列最多存一层节点。
