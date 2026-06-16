---
title: "560. 和为 K 的子数组 (Subarray Sum Equals K)"
date: 2026-06-16
category: algorithms
topic: substring
number: 560
difficulty: 中等
tags: [哈希表, 前缀和, 数组]
leetcode_url: "https://leetcode.cn/problems/subarray-sum-equals-k/"
permalink: /leetcode/0560-subarray-sum-equals-k/
layout: leetcode-post
---

## 题目描述

给定整数数组 `nums` 和整数 `k`，统计并返回该数组中和为 `k` 的连续子数组的个数。

**示例：** `nums = [1,2,3], k = 3` → `2`（`[1,2]` 与 `[3]`）。

## 思路分析

**核心思想：** 前缀和 + 哈希表。子数组 `(i, j]` 的和为 `prefix[j] - prefix[i]`，等于 `k` 即 `prefix[i] = prefix[j] - k`。用哈希表记录各前缀和出现的次数。

**详细步骤：**

1. `prefixCount[0] = 1`（空前缀）。
2. 累加前缀和 `sum`，答案加上 `prefixCount[sum-k]`。
3. 把当前 `sum` 计入哈希表。

## 代码实现

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn" data-lang="go" onclick="switchCodeTab(this)">Go</button>
<button class="tab-btn" data-lang="python" onclick="switchCodeTab(this)">Python</button>
</div>
<div class="tab-content" data-lang="go" markdown="1">

```go
func subarraySum(nums []int, k int) int {
    prefixCount := map[int]int{0: 1} // 前缀和 -> 出现次数
    sum, count := 0, 0
    for _, n := range nums {
        sum += n
        count += prefixCount[sum-k]
        prefixCount[sum]++
    }
    return count
}
```

</div>
<div class="tab-content" data-lang="python" markdown="1">

```python
class Solution:
    def subarraySum(self, nums: List[int], k: int) -> int:
        prefix = defaultdict(int)
        prefix[0] = 1
        s = count = 0
        for n in nums:
            s += n
            count += prefix[s - k]
            prefix[s] += 1
        return count
```

</div>
</div>

## 复杂度分析

| | 时间复杂度 | 空间复杂度 |
|---|---|---|
| Go / Python | O(n) | O(n) |

**解释：** 一次遍历，哈希表读写均摊 O(1)。
