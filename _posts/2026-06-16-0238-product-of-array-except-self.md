---
title: "238. 除自身以外数组的乘积 (Product of Array Except Self)"
date: 2026-06-16
category: algorithms
topic: array
number: 238
difficulty: 中等
tags: [数组, 前缀和]
leetcode_url: "https://leetcode.cn/problems/product-of-array-except-self/"
permalink: /leetcode/0238-product-of-array-except-self/
layout: leetcode-post
---

## 题目描述

给定数组 `nums`，返回数组 `answer`，其中 `answer[i]` 等于 `nums` 中除 `nums[i]` 外所有元素的乘积。**不能使用除法**，O(n) 时间。

**示例：** `nums = [1,2,3,4]` → `[24,12,8,6]`。

## 思路分析

**核心思想：** `answer[i] = (左侧前缀积) × (右侧后缀积)`。两次扫描，把结果数组复用为前缀积，再乘上滚动的后缀积。

**详细步骤：**

1. 从左到右：`res[i]` = 左侧所有元素之积。
2. 从右到左：维护滚动变量 `right`（右侧元素之积），令 `res[i] *= right`，再更新 `right *= nums[i]`。

## 代码实现

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn" data-lang="go" onclick="switchCodeTab(this)">Go</button>
<button class="tab-btn" data-lang="python" onclick="switchCodeTab(this)">Python</button>
</div>
<div class="tab-content" data-lang="go" markdown="1">

```go
func productExceptSelf(nums []int) []int {
    n := len(nums)
    res := make([]int, n)
    res[0] = 1
    for i := 1; i < n; i++ {
        res[i] = res[i-1] * nums[i-1] // 左侧前缀积
    }
    right := 1
    for i := n - 1; i >= 0; i-- {
        res[i] *= right // 乘上右侧后缀积
        right *= nums[i]
    }
    return res
}
```

</div>
<div class="tab-content" data-lang="python" markdown="1">

```python
class Solution:
    def productExceptSelf(self, nums: List[int]) -> List[int]:
        n = len(nums)
        res = [1] * n
        for i in range(1, n):
            res[i] = res[i - 1] * nums[i - 1]
        right = 1
        for i in range(n - 1, -1, -1):
            res[i] *= right
            right *= nums[i]
        return res
```

</div>
</div>

## 复杂度分析

| | 时间复杂度 | 空间复杂度 |
|---|---|---|
| Go / Python | O(n) | O(1) |

**解释：** 两次线性扫描；输出数组不计入额外空间。
