---
title: "239. 滑动窗口最大值 (Sliding Window Maximum)"
date: 2026-06-16
category: algorithms
topic: substring
number: 239
difficulty: 困难
tags: [队列, 滑动窗口, 单调队列, 堆]
leetcode_url: "https://leetcode.cn/problems/sliding-window-maximum/"
permalink: /leetcode/0239-sliding-window-maximum/
layout: leetcode-post
---

## 题目描述

给定数组 `nums` 和窗口大小 `k`，窗口从左向右每次滑动一位，返回每个窗口中的最大值。

**示例：** `nums = [1,3,-1,-3,5,3,6,7], k = 3` → `[3,3,5,5,6,7]`。

## 思路分析

**核心思想：** 单调递减双端队列存**下标**。队首始终是当前窗口最大值的下标。

**详细步骤：**

1. 新元素入队前，从队尾弹出所有比它小的下标（它们不可能再成为最大值）。
2. 队首下标若滑出窗口（`<= i-k`）则弹出。
3. 当 `i >= k-1` 时，队首对应的值即为当前窗口最大值。

## 代码实现

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn" data-lang="go" onclick="switchCodeTab(this)">Go</button>
<button class="tab-btn" data-lang="python" onclick="switchCodeTab(this)">Python</button>
</div>
<div class="tab-content" data-lang="go" markdown="1">

```go
func maxSlidingWindow(nums []int, k int) []int {
    deque := []int{} // 存下标，对应值单调递减
    res := []int{}
    for i, n := range nums {
        for len(deque) > 0 && nums[deque[len(deque)-1]] < n {
            deque = deque[:len(deque)-1] // 弹出更小的队尾
        }
        deque = append(deque, i)
        if deque[0] <= i-k {
            deque = deque[1:] // 队首滑出窗口
        }
        if i >= k-1 {
            res = append(res, nums[deque[0]])
        }
    }
    return res
}
```

</div>
<div class="tab-content" data-lang="python" markdown="1">

```python
class Solution:
    def maxSlidingWindow(self, nums: List[int], k: int) -> List[int]:
        dq = deque()  # 存下标，对应值单调递减
        res = []
        for i, n in enumerate(nums):
            while dq and nums[dq[-1]] < n:
                dq.pop()
            dq.append(i)
            if dq[0] <= i - k:
                dq.popleft()
            if i >= k - 1:
                res.append(nums[dq[0]])
        return res
```

</div>
</div>

## 复杂度分析

| | 时间复杂度 | 空间复杂度 |
|---|---|---|
| Go / Python | O(n) | O(k) |

**解释：** 每个下标至多入队、出队各一次；队列最多存 `k` 个元素。
