---
title: "105. 从前序与中序遍历序列构造二叉树 (Construct Binary Tree from Preorder and Inorder Traversal)"
date: 2026-06-16
category: algorithms
topic: binary-tree
number: 105
difficulty: 中等
tags: [树, 数组, 哈希表, 分治, 二叉树]
leetcode_url: "https://leetcode.cn/problems/construct-binary-tree-from-preorder-and-inorder-traversal/"
permalink: /leetcode/0105-construct-binary-tree-from-preorder-and-inorder-traversal/
layout: leetcode-post
---

## 题目描述

给定二叉树的前序遍历 `preorder` 与中序遍历 `inorder`（无重复值），构造并返回该二叉树。

**示例：** `preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]` → 对应的二叉树。

## 思路分析

**核心思想：** 前序的第一个元素是根；在中序中定位根，左侧是左子树、右侧是右子树。用哈希表 O(1) 定位，前序下标顺序推进。

**详细步骤：**

1. 用哈希表记录每个值在中序中的下标。
2. 维护前序游标 `pre`，每次取 `preorder[pre]` 作为当前根。
3. 按中序根位置把区间分成左右两段，递归构造。

## 代码实现

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn" data-lang="go" onclick="switchCodeTab(this)">Go</button>
<button class="tab-btn" data-lang="python" onclick="switchCodeTab(this)">Python</button>
</div>
<div class="tab-content" data-lang="go" markdown="1">

```go
func buildTree(preorder []int, inorder []int) *TreeNode {
    idx := make(map[int]int) // 值 -> 中序下标
    for i, v := range inorder {
        idx[v] = i
    }
    pre := 0
    var build func(lo, hi int) *TreeNode
    build = func(lo, hi int) *TreeNode {
        if lo > hi {
            return nil
        }
        rootVal := preorder[pre]
        pre++
        root := &TreeNode{Val: rootVal}
        mid := idx[rootVal]
        root.Left = build(lo, mid-1)
        root.Right = build(mid+1, hi)
        return root
    }
    return build(0, len(inorder)-1)
}
```

</div>
<div class="tab-content" data-lang="python" markdown="1">

```python
class Solution:
    def buildTree(self, preorder: List[int], inorder: List[int]) -> Optional[TreeNode]:
        idx = {v: i for i, v in enumerate(inorder)}
        self.pre = 0
        def build(lo, hi):
            if lo > hi:
                return None
            root_val = preorder[self.pre]
            self.pre += 1
            root = TreeNode(root_val)
            mid = idx[root_val]
            root.left = build(lo, mid - 1)
            root.right = build(mid + 1, hi)
            return root
        return build(0, len(inorder) - 1)
```

</div>
</div>

## 复杂度分析

| | 时间复杂度 | 空间复杂度 |
|---|---|---|
| Go / Python | O(n) | O(n) |

**解释：** 每个节点构造一次，哈希表 O(1) 定位；空间为哈希表与递归栈。
