---
title: "287. 寻找重复数 (Find the Duplicate Number)"
date: 2026-06-16
category: algorithms
topic: tricks
number: 287
difficulty: 中等
tags: [位运算, 数组, 双指针, 二分查找]
leetcode_url: "https://leetcode.cn/problems/find-the-duplicate-number/"
permalink: /leetcode/0287-find-the-duplicate-number/
layout: leetcode-post
---

## 题目描述

给定含 `n+1` 个整数的数组 `nums`，每个数在 `[1, n]` 范围内，存在唯一重复的数（可能重复多次）。找出它，不能修改数组、只用常数额外空间。

**示例：** `nums = [1,3,4,2,2]` → `2`。

## 思路分析

**核心思想：** 把数组视为「下标 → nums[下标]」的链表：因为有重复值，必存在环，环的入口即重复数。用 Floyd 判圈找入口。

**详细步骤：**

1. 快慢指针 `slow = nums[slow]`、`fast = nums[nums[fast]]` 直到相遇。
2. 令一指针回到起点 0，两指针每次各走一步。
3. 再次相遇处即重复数（环入口）。

## 代码实现

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn" data-lang="go" onclick="switchCodeTab(this)">Go</button>
<button class="tab-btn" data-lang="python" onclick="switchCodeTab(this)">Python</button>
</div>
<div class="tab-content" data-lang="go" markdown="1">

```go
func findDuplicate(nums []int) int {
    slow, fast := nums[0], nums[nums[0]]
    for slow != fast { // 找相遇点
        slow = nums[slow]
        fast = nums[nums[fast]]
    }
    slow = 0
    for slow != fast { // 找环入口
        slow = nums[slow]
        fast = nums[fast]
    }
    return slow
}
```

</div>
<div class="tab-content" data-lang="python" markdown="1">

```python
class Solution:
    def findDuplicate(self, nums: List[int]) -> int:
        slow, fast = nums[0], nums[nums[0]]
        while slow != fast:
            slow = nums[slow]
            fast = nums[nums[fast]]
        slow = 0
        while slow != fast:
            slow = nums[slow]
            fast = nums[fast]
        return slow
```

</div>
</div>

## 复杂度分析

| | 时间复杂度 | 空间复杂度 |
|---|---|---|
| Go / Python | O(n) | O(1) |

**解释：** 两轮线性遍历找环入口，不修改数组、常数空间。
