---
title: "199. 二叉树的右视图 (Binary Tree Right Side View)"
date: 2026-06-16
category: algorithms
topic: binary-tree
number: 199
difficulty: 中等
tags: [树, 深度优先搜索, 广度优先搜索, 二叉树]
leetcode_url: "https://leetcode.cn/problems/binary-tree-right-side-view/"
permalink: /leetcode/0199-binary-tree-right-side-view/
layout: leetcode-post
---

## 题目描述

给定二叉树根节点 `root`，想象自己站在树的右侧，返回从上到下看到的节点值。

**示例：** `[1,2,3,null,5,null,4]` → `[1,3,4]`。

## 思路分析

**核心思想：** 层序遍历，每一层取**最后一个**节点的值即为该层的右视图。

**详细步骤：**

1. BFS 逐层处理。
2. 把当前层最右节点值加入结果。
3. 把当前层所有非空孩子作为下一层。

## 代码实现

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn" data-lang="go" onclick="switchCodeTab(this)">Go</button>
<button class="tab-btn" data-lang="python" onclick="switchCodeTab(this)">Python</button>
</div>
<div class="tab-content" data-lang="go" markdown="1">

```go
func rightSideView(root *TreeNode) []int {
    res := []int{}
    if root == nil {
        return res
    }
    queue := []*TreeNode{root}
    for len(queue) > 0 {
        res = append(res, queue[len(queue)-1].Val) // 该层最右
        next := []*TreeNode{}
        for _, node := range queue {
            if node.Left != nil {
                next = append(next, node.Left)
            }
            if node.Right != nil {
                next = append(next, node.Right)
            }
        }
        queue = next
    }
    return res
}
```

</div>
<div class="tab-content" data-lang="python" markdown="1">

```python
class Solution:
    def rightSideView(self, root: Optional[TreeNode]) -> List[int]:
        if not root:
            return []
        res, queue = [], [root]
        while queue:
            res.append(queue[-1].val)
            queue = [c for n in queue for c in (n.left, n.right) if c]
        return res
```

</div>
</div>

## 复杂度分析

| | 时间复杂度 | 空间复杂度 |
|---|---|---|
| Go / Python | O(n) | O(n) |

**解释：** 每个节点入队一次；队列最多存一层节点。
