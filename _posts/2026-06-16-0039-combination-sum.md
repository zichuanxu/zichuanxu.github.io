---
title: "39. 组合总和 (Combination Sum)"
date: 2026-06-16
category: algorithms
topic: backtracking
number: 39
difficulty: 中等
tags: [数组, 回溯]
leetcode_url: "https://leetcode.cn/problems/combination-sum/"
permalink: /leetcode/0039-combination-sum/
layout: leetcode-post
---

## 题目描述

给定无重复元素的正整数数组 `candidates` 和目标 `target`，找出所有和为 `target` 的组合，同一数字可**无限次**使用。

**示例：** `candidates = [2,3,6,7], target = 7` → `[[2,2,3],[7]]`。

## 思路分析

**核心思想：** 回溯。维护剩余目标 `remain`，从 `start` 开始选数；因可重复使用，递归时仍传入 `i`（不跳过自己）。

**详细步骤：**

1. `remain == 0` 收集组合。
2. 从 `start` 遍历候选数；若该数大于 `remain` 则跳过（剪枝）。
3. 选入后递归 `(i, remain - candidates[i])`，再回溯。

## 代码实现

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn" data-lang="go" onclick="switchCodeTab(this)">Go</button>
<button class="tab-btn" data-lang="python" onclick="switchCodeTab(this)">Python</button>
</div>
<div class="tab-content" data-lang="go" markdown="1">

```go
func combinationSum(candidates []int, target int) [][]int {
    res := [][]int{}
    path := []int{}
    var backtrack func(start, remain int)
    backtrack = func(start, remain int) {
        if remain == 0 {
            res = append(res, append([]int{}, path...))
            return
        }
        for i := start; i < len(candidates); i++ {
            if candidates[i] > remain {
                continue
            }
            path = append(path, candidates[i])
            backtrack(i, remain-candidates[i]) // 可重复使用，传 i
            path = path[:len(path)-1]
        }
    }
    backtrack(0, target)
    return res
}
```

</div>
<div class="tab-content" data-lang="python" markdown="1">

```python
class Solution:
    def combinationSum(self, candidates: List[int], target: int) -> List[List[int]]:
        res, path = [], []
        def backtrack(start, remain):
            if remain == 0:
                res.append(path[:])
                return
            for i in range(start, len(candidates)):
                if candidates[i] > remain:
                    continue
                path.append(candidates[i])
                backtrack(i, remain - candidates[i])  # 可重复使用
                path.pop()
        backtrack(0, target)
        return res
```

</div>
</div>

## 复杂度分析

| | 时间复杂度 | 空间复杂度 |
|---|---|---|
| Go / Python | O(S)（解的总规模） | O(target) |

**解释：** 复杂度取决于可行组合的数量与长度；递归深度最多 `target`（全选最小元素）。
