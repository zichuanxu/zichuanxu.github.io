---
title: "739. 每日温度 (Daily Temperatures)"
date: 2026-06-16
category: algorithms
topic: stack
number: 739
difficulty: 中等
tags: [栈, 数组, 单调栈]
leetcode_url: "https://leetcode.cn/problems/daily-temperatures/"
permalink: /leetcode/0739-daily-temperatures/
layout: leetcode-post
---

## 题目描述

给定每日温度数组 `temperatures`，返回数组 `answer`，`answer[i]` 表示第 `i` 天之后需要等多少天才会更暖；若不存在则为 `0`。

**示例：** `[73,74,75,71,69,72,76,73]` → `[1,1,4,2,1,1,0,0]`。

## 思路分析

**核心思想：** 单调递减栈存下标。遇到更高温度时，不断弹出栈中比它低的天，它们的答案就是「当前下标 - 弹出的下标」。

**详细步骤：**

1. 遍历每天 `i`。
2. 当栈非空且当前温度高于栈顶对应温度，弹栈并填 `res[j] = i - j`。
3. 把 `i` 入栈，继续。

## 代码实现

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn" data-lang="go" onclick="switchCodeTab(this)">Go</button>
<button class="tab-btn" data-lang="python" onclick="switchCodeTab(this)">Python</button>
</div>
<div class="tab-content" data-lang="go" markdown="1">

```go
func dailyTemperatures(temperatures []int) []int {
    n := len(temperatures)
    res := make([]int, n)
    stack := []int{} // 存下标，温度单调递减
    for i, t := range temperatures {
        for len(stack) > 0 && temperatures[stack[len(stack)-1]] < t {
            j := stack[len(stack)-1]
            stack = stack[:len(stack)-1]
            res[j] = i - j
        }
        stack = append(stack, i)
    }
    return res
}
```

</div>
<div class="tab-content" data-lang="python" markdown="1">

```python
class Solution:
    def dailyTemperatures(self, temperatures: List[int]) -> List[int]:
        n = len(temperatures)
        res = [0] * n
        stack = []  # 存下标，温度单调递减
        for i, t in enumerate(temperatures):
            while stack and temperatures[stack[-1]] < t:
                j = stack.pop()
                res[j] = i - j
            stack.append(i)
        return res
```

</div>
</div>

## 复杂度分析

| | 时间复杂度 | 空间复杂度 |
|---|---|---|
| Go / Python | O(n) | O(n) |

**解释：** 每个下标至多入栈出栈一次。
