---
title: "207. 课程表 (Course Schedule)"
date: 2026-06-16
category: algorithms
topic: graph
number: 207
difficulty: 中等
tags: [深度优先搜索, 广度优先搜索, 图, 拓扑排序]
leetcode_url: "https://leetcode.cn/problems/course-schedule/"
permalink: /leetcode/0207-course-schedule/
layout: leetcode-post
---

## 题目描述

共 `numCourses` 门课，`prerequisites[i] = [a, b]` 表示学 `a` 前必须先学 `b`。判断是否能修完所有课程（即课程依赖图是否无环）。

**示例：** `numCourses = 2, prerequisites = [[1,0]]` → `true`；`[[1,0],[0,1]]` → `false`。

## 思路分析

**核心思想：** 拓扑排序（Kahn / BFS）。入度为 0 的课可先修；不断删除已修课并更新后继入度。若最终修完的课数等于总数则无环。

**详细步骤：**

1. 建邻接表与入度数组（`b → a`）。
2. 入度为 0 的课入队。
3. 出队一门课、计数 +1，将其后继入度减 1；减到 0 则入队。最后比较计数与总课数。

## 代码实现

<div class="code-tabs">
<div class="tab-buttons">
<button class="tab-btn" data-lang="go" onclick="switchCodeTab(this)">Go</button>
<button class="tab-btn" data-lang="python" onclick="switchCodeTab(this)">Python</button>
</div>
<div class="tab-content" data-lang="go" markdown="1">

```go
func canFinish(numCourses int, prerequisites [][]int) bool {
    graph := make([][]int, numCourses)
    indegree := make([]int, numCourses)
    for _, p := range prerequisites {
        graph[p[1]] = append(graph[p[1]], p[0]) // 先修 p[1] -> 后修 p[0]
        indegree[p[0]]++
    }
    queue := []int{}
    for i := 0; i < numCourses; i++ {
        if indegree[i] == 0 {
            queue = append(queue, i)
        }
    }
    finished := 0
    for len(queue) > 0 {
        cur := queue[0]
        queue = queue[1:]
        finished++
        for _, next := range graph[cur] {
            indegree[next]--
            if indegree[next] == 0 {
                queue = append(queue, next)
            }
        }
    }
    return finished == numCourses
}
```

</div>
<div class="tab-content" data-lang="python" markdown="1">

```python
class Solution:
    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:
        graph = [[] for _ in range(numCourses)]
        indegree = [0] * numCourses
        for a, b in prerequisites:
            graph[b].append(a)
            indegree[a] += 1
        queue = deque(i for i in range(numCourses) if indegree[i] == 0)
        finished = 0
        while queue:
            cur = queue.popleft()
            finished += 1
            for nxt in graph[cur]:
                indegree[nxt] -= 1
                if indegree[nxt] == 0:
                    queue.append(nxt)
        return finished == numCourses
```

</div>
</div>

## 复杂度分析

| | 时间复杂度 | 空间复杂度 |
|---|---|---|
| Go / Python | O(V + E) | O(V + E) |

**解释：** 每个节点、每条边各处理一次；邻接表与入度数组占 O(V+E)。
