---
title: "121. 买卖股票的最佳时机 (Best Time to Buy and Sell Stock)"
date: 2026-06-16
category: algorithms
topic: greedy
number: 121
difficulty: 简单
tags: [数组, 动态规划]
leetcode_url: "https://leetcode.cn/problems/best-time-to-buy-and-sell-stock/"
permalink: /leetcode/0121-best-time-to-buy-and-sell-stock/
layout: leetcode-post
---

## 题目描述

给定数组 `prices`，`prices[i]` 为第 `i` 天股价。只能买卖一次（先买后卖），求最大利润，无利润返回 `0`。

**示例：** `prices = [7,1,5,3,6,4]` → `5`（第 2 天买入、第 5 天卖出）。

## 思路分析

**核心思想：** 一次遍历维护「到目前为止的最低买入价」，用当前价减去最低价更新最大利润。

**详细步骤：**

1. `minPrice` 初始为首日价。
2. 每天更新 `minPrice` 与 `best = max(best, 当前价 - minPrice)`。

## 代码实现

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn" data-lang="go" onclick="switchCodeTab(this)">Go</button>
<button class="tab-btn" data-lang="python" onclick="switchCodeTab(this)">Python</button>
</div>
<div class="tab-content" data-lang="go" markdown="1">

```go
func maxProfit(prices []int) int {
    minPrice := prices[0]
    best := 0
    for _, p := range prices {
        if p < minPrice {
            minPrice = p
        } else if p-minPrice > best {
            best = p - minPrice
        }
    }
    return best
}
```

</div>
<div class="tab-content" data-lang="python" markdown="1">

```python
class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        min_price = prices[0]
        best = 0
        for p in prices:
            min_price = min(min_price, p)
            best = max(best, p - min_price)
        return best
```

</div>
</div>

## 复杂度分析

| | 时间复杂度 | 空间复杂度 |
|---|---|---|
| Go / Python | O(n) | O(1) |

**解释：** 一次遍历，常数变量记录最低价与最大利润。
