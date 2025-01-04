# [LeetCode Hot 100](https://leetcode.cn/studyplan/top-1[00-l[iked/)

## 目录

- ✅ [哈希](#哈希)

- ✅ [双指针](#双指针)

- ✅ [滑动窗口](#滑动窗口)

- ✅ [子串](#子串)

- ✅ [普通数组](#普通数组)

- ✅ [矩阵](#矩阵)

- ✅ [链表](#链表) —— [K 个一组翻转链表](#k-个一组翻转链表) & [两两交换链表中的节点](#两两交换链表中的节点)

- ✅ [二叉树](#二叉树)

- ✅ [图](#图)

- ✅ [回溯](#回溯)

- [二分查找](#二分查找)

- [栈](#栈)

- [堆](#堆)

- [贪心算法](#贪心算法)

- [动态规划](#动态规划)

- ✅ [多维动态规划](#多维动态规划)

- ✅ [技巧](#技巧)

## 哈希

### [两数之和](./Week%204-20241125.md#两数之和)

### [字母异位词分组](https://leetcode.cn/problems/group-anagrams/?envType=study-plan-v2&envId=top-100-liked)

- 遍历字符串数组，对每个字符串使用 [charCodeAt](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt) 进行排序，将排序后的字符串作为键，原字符串作为值，存入哈希表中。

  ```js
  for (const str of strs) {
    const key = str
      .split('')
      .sort((a, b) => a.charCodeAt() - b.charCodeAt())
      .join('')
  }
  ```

- 使用扩展操作符 `...` & map.values() 将哈希表中的值取出，作为结果返回。

  ```js
  return [...map.values()]
  ```

### [最长连续序列](./Week%204-20241125.md#最长连续序列)

## 双指针

### [移动零](https://leetcode.cn/problems/move-zeroes/description/?envType=study-plan-v2&envId=top-100-liked)

- 第一个指针 flag 指向下一个 0 元素，初始值为 0

- 第二个指针 i 为 for 循环的索引，指向当前元素

- for 循环遍历数组

  - 当前元素为 0 —— i 继续前进寻找非 0 元素

  - 当前元素不为 0 —— 将当前元素与 flag 指向的元素交换位置，flag 和 i 都前进

    ```js
    if (nums[i] !== 0) {
      ;[nums[i], nums[flag]] = [nums[flag], nums[i]]
      flag++
    }
    ```

### [盛最多水的容器](./Week%202-20241102.md#盛最多水的容器)

### [三数之和](./Week%202-20241102.md#三数之和)

### [接雨水](./Week%201-20241026.md#接雨水)

## 滑动窗口

### [无重复字符的最长子串](./Week%203-20241109.md#无重复字符的最长子串)

### [找到字符串中所有字母异位词](https://leetcode.cn/problems/find-all-anagrams-in-a-string/?envType=study-plan-v2&envId=top-100-liked)

- 用两个长度为 26 的数组分别记录字符串 p 和 s 中每个字符出现的次数

  ```js
  const pFreq = new Array(26).fill(0)
  const sFreq = new Array(26).fill(0)
  ```

- 以字符 a 的 ASCII 码为基准，记录每个字符出现的次数 —— `charCodeAt`

  ```js
  for (let i = 0; i < p.length; i++) {
    pFreq[p.charCodeAt(i) - 'a'.charCodeAt()]++
    sFreq[s.charCodeAt(i) - 'a'.charCodeAt()]++
  }
  ```

- **如何判断 s 中的子串是否为 p 的字母异位词 —— 使用 `join` 方法并比对转换后得到的字符串**

- for 循环遍历字符串 s

  - 左指针 left 为 for 循环变量

  - 右指针 right 为 left + p.length

- 将定长窗口右移

  - 将 s 中 left 指向的字符出现次数减 1

    ```js
    sFreq[s.charCodeAt(left) - 'a'.charCodeAt()]--
    ```

  - 将 s 中 right 指向的字符出现次数加 1

    ```js
    sFreq[s.charCodeAt(right) - 'a'.charCodeAt()]++
    ```

  - 判断当前窗口内的子子串是否为 p 的字母异位词

## 子串

### [和为 K 的子数组](https://leetcode.cn/problems/subarray-sum-equals-k/?envType=study-plan-v2&envId=top-100-liked)

- 前缀和

  - 定义数组 preSumList，长度为 nums.length + 1

  - preSumList[0] = 0

  - preSumList[i] = preSumList[i - 1] + nums[i - 1]

    ```js
    const preSumList = Array(nums.length + 1).fill(0)
    for (let i = 0; i < nums.length; i++) {
      preSumList[i + 1] = preSumList[i] + nums[i]
    }
    ```

- 定义哈希表 map，key 为前缀和，value 为前缀和出现的次数

- 定义变量 count，用于记录符合条件的子数组个数

- for-of 循环遍历数组 nums

  - count 累加 map.get(preSum - k)

    ![](https://pic.leetcode.cn/1723037350-oDZALU-%E6%88%AA%E5%B1%8F2024-08-07%2021.19.45.png)

  - 当前元素前缀和的次数增加 1

    ```js
    map.set(preSum, (map.get(preSum) || 0) + 1)
    ```

### [滑动窗口最大值]()

### [最小覆盖子串](./Week%203-20241109.md#最小覆盖子串)

## 普通数组

### [最大子数组和](https://leetcode.cn/problems/maximum-subarray/?envType=study-plan-v2&envId=top-100-liked)

- 问题拆解 —— 当前元素的最大子数组和，取决于前一个元素的最大子数组和 + 当前元素

- 用一个变量 sum 记录当前最大子数组和

- 因为最大子数组和可能为负数，所以可以选择不和前一个元素的最大子数组和相加，而是选择当前元素

  ```js
  sum = Math.max(sum + nums[i], nums[i])
  ```

- 用一个变量 maxSum 记录最大子数组和，初始值为 -Infinity

  ```js
  maxSum = Math.max(maxSum, sum)
  ```

### [合并区间](./Week%205-20241205.md#合并区间)

### [轮转数组](./Week%201-20241026.md#轮转数组)

### [除自身以外数组的乘积](https://leetcode.cn/problems/product-of-array-except-self/?envType=study-plan-v2&envId=top-100-liked)

- 核心思想 —— 分为两个三角形进行计算

  ![](https://pic.leetcode-cn.com/1624619180-vpyyqh-Picture1.png)

- 下三角计算 —— 从左到右根据上一个元素的乘积进行计算

  ```js
  for (let i = 1; i < nums.length; i++) {
    answer[i] = answer[i - 1] * nums[i - 1]
  }
  ```

- 下三角计算 —— 从右到左根据上一个元素的乘积进行计算

  ```js
  let right = 1
  for (let i = nums.length - 1; i >= 0; i--) {
    answer[i] *= right
    right *= nums[i]
  }
  ```

### [缺失的第一个正数](https://leetcode.cn/problems/first-missing-positive/?envType=study-plan-v2&envId=top-100-liked)

- 核心思想 —— 将数值移动到对应下标处，即 `nums[nums[i] - 1] = nums[i]`

- for 循环遍历数组并嵌套 while 循环进行数值的移动

  - while 循环条件 —— 当前下标处的数值不等于下标 + 1

    ```js
    while (nums[i] >= 1 && nums[i] <= nums.length && nums[nums[i] - 1] !== nums[i])
    ```

  - while 循环体 —— 将当前下标处的数值移动到对应下标处

    ```js
    const temp = nums[nums[i] - 1]
    nums[nums[i] - 1] = nums[i]
    nums[i] = temp
    ```

- for 循环遍历数组 —— 如果当前下标处的数值不等于下标 + 1，则返回下标 + 1

  ```js
  // eg. [1, 2, 4] -> nums[2] !== 2 + 1 return 3
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== i + 1) {
      return i + 1
    }
  }
  ```

- 如果数组中的所有数值都等于下标 + 1，则返回数组长度 + 1

  ```js
  // eg. [1, 2, 3] -> return 4
  return nums.length + 1
  ```

## 矩阵

### [矩阵置零](./Week%204-20241125.md#矩阵置零)

### [螺旋矩阵](./Week%203-20241109.md#螺旋矩阵)

### [旋转图像](./Week%203-20241109.md#旋转图像)

### [搜索二维矩阵 II](https://leetcode.cn/problems/search-a-2d-matrix-ii/?envType=study-plan-v2&envId=top-100-liked)

- 核心思想 —— 从右上角开始搜索 `(0, width - 1)`

- while 循环

  - 循环条件 —— 没超出矩阵边界

  - 如果当前元素等于目标值，返回 true

  - 如果当前元素大于目标值，向左移动一列 —— `该矩阵每行的元素从左到右升序排列`

  - 如果当前元素小于目标值，向下移动一行 —— `该矩阵每列的元素从上到下升序排列`

## 链表

### [相交链表](https://leetcode.cn/problems/intersection-of-two-linked-lists/?envType=study-plan-v2&envId=top-100-liked)

- 核心思想 —— 双指针 & 指针是否相遇

- 定义两个指针 pA 和 pB，分别指向两个链表的头节点

  ```js
  let [pA, pB] = [headA, headB]
  ```

- 定义两个布尔值变量 flagA 和 flagB，初始值为 false —— 表示当前指针是否从另一个链表出发

  ```js
  let [flagA, flagB] = [false, false]
  ```

- while 循环

  - 循环条件 —— pA 和 pB 不为空

    ```js
    while (pA && pB) {}
    ```

  - 如果 pA 和 pB 相等，返回 pA —— 表示找到了相交节点

    ```js
    if (pA === pB) return pA
    ```

  - 如果 pA 为尾节点，且 flagA 为 false，则将 pA 指向 headB，flagA 置为 true —— 否则将 pA 指向下一个节点

    ```js
    if (!pA.next && !flagA) {
      pA = headB
      flagA = true
    } else {
      pA = pA.next
    }
    ```

  - 如果 pB 为尾节点，且 flagB 为 false，则将 pB 指向 headA，flagB 置为 true —— 否则将 pB 指向下一个节点
    ```js
    if (!pB.next && !flagB) {
      pB = headA
      flagB = true
    } else {
      pB = pB.next
    }
    ```

- while 循环结束 返回 null —— 表示没有找到相交节点

### [反转链表](./Week%205-20241205.md#反转链表)

### [回文链表](https://leetcode.cn/problems/palindrome-linked-list/description/?envType=study-plan-v2&envId=top-100-liked)

- 遍历链表，将链表的值存入数组中

  ```js
  const arr = []
  while (head) {
    arr.push(head.val)
    head = head.next
  }
  ```

- 双指针遍历数组，分别从数组首尾出发，判断是否为回文

### [环形链表](./Week%205-20241205.md#环形链表)

### [环形链表 II](https://leetcode.cn/problems/linked-list-cycle-ii/?envType=study-plan-v2&envId=top-100-liked)

- 解法一 —— 遍历链表并用 Set 存储节点，判断当前节点是否已经在 Set 中出现

  ```js
  while (node) {
    if (set.has(node)) {
      return node
    }

    set.add(node)
    node = node.next
  }
  ```

- 解法二 —— 快慢指针，可参考 [寻找重复数](#寻找重复数)

  - 同 [环形链表](#环形链表) 进行快慢指针判断是否有环

  - 发现有环后，将快指针指向头节点，慢指针不动

    ```js
    if (fast === slow) {
      fast = head
    }
    ```

  - fast 和 slow 同时移动，相遇的节点即为环的入口节点

    ```js
    while (fast !== slow) {
      fast = fast.next
      slow = slow.next
    }
    return fast
    ```

### [合并两个有序链表](https://leetcode.cn/problems/merge-two-sorted-lists/?envType=study-plan-v2&envId=top-100-liked)

- 因为不确定哪个链表更长，所以需要一个虚拟头节点

  ```js
  const dummy = new ListNode(-1)

  let node = dummy
  ```

- 定义双指针 p1 和 p2，分别指向两个链表的头节点

  ```js
  let [p1, p2] = [list1, list2]
  ```

- while 循环

  - 循环条件 —— p1 和 p2 都不为空

    ```js
    while (p1 && p2) {}
    ```

  - 将较小的节点添加到新链表中

    ```js
    if (p1.val < p2.val) {
      node.next = p1
      p1 = p1.next
    } else {
      node.next = p2
      p2 = p2.next
    }
    ```

- while 循环结束后，将剩余的节点添加到新链表中

  ```js
  if (p1) {
    node.next = p1
  }
  if (p2) {
    node.next = p2
  }
  ```

- 返回虚拟头节点的下一个节点

  ```js
  return dummy.next
  ```

### [两数相加](./Week%205-20241205.md#两数相加)

### [删除链表的倒数第 N 个结点](./Week%205-20241205.md#删除链表的倒数第n个节点)

### [随机链表的复制](./Week%205-20241205.md#随机链表的复制)

- Map 存储原节点与新节点的对应关系 —— key 为旧节点 node，value 为 新节点 new Node(node.val)

### [排序链表](https://leetcode.cn/problems/sort-list/?envType=study-plan-v2&envId=top-100-liked)

- 目前只会暴力解法

- 用数组存储链表中的所有节点

  ```js
  const arr = []
  while (head) {
    arr.push(head)
    head = head.next
  }
  ```

- 对数组进行排序

  ```js
  arr.sort((a, b) => a.val - b.val)
  ```

- 🌟 使用 [reduceRight](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/reduceRight) 方法将数组中的节点连接起来

  ```js
  return arr.reduceRight((res, node) => {
    node.next = res
    res = node
    return res
  }, null)
  ```

### [合并 K 个升序链表](https://leetcode.cn/problems/merge-k-sorted-lists/?envType=study-plan-v2&envId=top-100-liked)

- 暴力解法

  - 用 reduce 方法将所有节点收集到一个数组中

    ```js
    const res = lists.reduce((arr, list) => {
      while (list) {
        arr.push(list)
        list = list.next
      }
      return arr
    }, [])
    ```

  - 对数组排序并使用 [reduceRight](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/reduceRight) 方法将数组中的节点连接起来

    ```js
    return res
      .sort((a, b) => a.val - b.val)
      .reduceRight((res, node) => {
        node.next = res
        res = node
        return res
      }, null)
    ```

### [LRU 缓存](./Week%205-20241205.md#LRU-缓存)

- 需要一个额外的方法 moveToHead 将最近访问 / 操作到的节点移动到链表头部

  ```js
  LRUCache.prototype.moveToHead = function (node) {
    const [prevNode, nextNode] = [node.prev, node.next]
    prevNode.next = nextNode
    nextNode.prev = prevNode

    node.prev = this.head
    node.next = this.head.next
    this.head.next.prev = node
    this.head.next = node
  }
  ```

### [K 个一组翻转链表](https://leetcode.cn/problems/reverse-nodes-in-k-group/?envType=study-plan-v2&envId=top-100-liked)

### [两两交换链表中的节点](https://leetcode.cn/problems/swap-nodes-in-pairs/description/?envType=study-plan-v2&envId=top-100-liked)

## 二叉树

### [二叉树的中序遍历](https://leetcode.cn/problems/binary-tree-inorder-traversal/?envType=study-plan-v2&envId=top-100-liked)

- 核心思想 —— 递归

- 递归终止条件 —— 节点为空

  ```js
  if (!root) return
  ```

- 递归调用顺序 —— 左子树 → 根节点 → 右子树

  ```js
  inorderTraversal(root.left)

  res.push(root.val)

  inorderTraversal(root.right)
  ```

### [二叉树的最大深度](./week%206-20241209.md#二叉树的最大深度)

- 核心思想 —— 广度优先遍历 BFS

### [翻转二叉树](./week%206-20241209.md#翻转二叉树)

- 后序遍历

### [对称二叉树](./week%206-20241209.md#对称二叉树)

### [二叉树的直径](https://leetcode.cn/problems/diameter-of-binary-tree/?envType=study-plan-v2&envId=top-100-liked)

- 核心思想 —— 直径 = 左子树到达底部节点的最长路径 + 1 + 1 + 右子树到达底部节点的最长路径

- 辅助函数 func —— 计算节点到达底部节点的最长路径，并更新最大直径

  - 递归终止条件 —— 节点为空，返回 -1，即底部节点到达底部节点的最长路径为 0

    ```js
    if (!root) return -1
    ```

  - 递归调用顺序 —— 左子树 → 根节点 → 右子树

    ```js
    const leftDepth = func(root.left)
    const rightDepth = func(root.right)
    ```

  - 更新最大直径

    ```js
    maxDiameter = Math.max(maxDiameter, leftDepth + rightDepth + 2)
    ```

  - 返回节点到达底部节点的最长路径

    ```js
    return Math.max(leftDepth, rightDepth) + 1
    ```

### [二叉树的层序遍历](./week%206-20241209.md#二叉树的层序遍历)

### [将有序数组转换为二叉搜索树](https://leetcode.cn/problems/convert-sorted-array-to-binary-search-tree/description/?envType=study-plan-v2&envId=top-100-liked)

- 二叉搜索树的概念

  - 左子树的所有节点的值都小于根节点的值

  - 右子树的所有节点的值都大于根节点的值

  - 左右子树也都是二叉搜索树

- 核心思想 —— 二分法

- 辅助函数 buildTree —— 递归构建二叉搜索树

  - 递归终止条件 —— 数组为空，返回 null

    ```js
    if (left > right) return null
    ```

  - 取数组中间元素作为根节点，递归构建左右子树

    ```js
    const middle = Math.floor((left + right) / 2)
    const root = new TreeNode(nums[middle])

    root.left = buildTree(left, middle - 1)
    root.right = buildTree(middle + 1, right)
    ```

### [验证二叉搜索树](./week%206-20241209.md#验证二叉搜索树)

- 核心思想 —— 中序遍历

### [二叉搜索树中第 K 小的元素](./week%206-20241209.md#二叉搜索树中第K小的元素)

- 核心思想 —— 中序遍历

### [二叉树的右视图](./week%206-20241209.md#二叉树的右视图)

- 核心思想 —— 层序遍历 BFS

### [二叉树展开为链表](./week%206-20241209.md#二叉树展开为链表)

- 核心思想 —— 前序遍历

### [从前序与中序遍历序列构造二叉树](./week%206-20241209.md#从前序与中序遍历序列构造二叉树)

- 🌟 前序遍历 preorder = [根节点, 左子树的前序遍历, 右子树前序遍历]

- 🌟 中序遍历 inorder = [左子树的中序遍历, 根节点, 右子树的中序遍历]

### [路径总和 III](https://leetcode.cn/problems/path-sum-iii/?envType=study-plan-v2&envId=top-100-liked)

- 核心思想 —— 二叉树版本的[前缀和](#和为-k-的子数组)

- 前缀和 —— 从根节点到当前节点的路径和

- 定义哈希表 map，key 为前缀和，value 为前缀和出现的次数

  - 初始值为 `map.set(0, 1)`

    ```js
    const map = new Map()
    map.set(0, 1)
    ```

  - 为什么要初始值为 `map.set(0, 1)` —— 用于应对根节点本身就是目标和的情况

- 定义变量 count，用于记录符合条件的子数组个数

- 辅助函数 DFS —— 递归遍历二叉树

  - 参数 —— 节点 root 和目标和 sum

  - 递归终止条件 —— 节点为空

    ```js
    if (!root) return
    ```

  - 计算当前节点的前缀和

    ```js
    sum += root.val
    ```

  - 计算当前节点的前缀和与目标和的差值

    ```js
    const diff = sum - targetSum
    ```

  - 如果当前节点的前缀和与目标和的差值在哈希表中出现过，则将当前节点的前缀和出现的次数累加到 count 中

    ```js
    if (map.has(diff)) {
      count += map.get(diff)
    }
    ```

  - 将当前节点的前缀和出现的次数加 1

    ```js
    map.set(sum, (map.get(sum) || 0) + 1)
    ```

  - 递归调用顺序 —— 根节点 → 左子树 → 右子树

    ```js
    DFS(root.left, sum)
    DFS(root.right, sum)
    ```

  - 恢复现场 —— 将当前节点的前缀和出现的次数减 1

    ```js
    map.set(sum, map.get(sum) - 1)
    ```

  - [为什么要恢复现场](https://leetcode.cn/problems/path-sum-iii/solutions/2784856/zuo-fa-he-560-ti-shi-yi-yang-de-pythonja-fmzo/?envType=study-plan-v2&envId=top-100-liked) —— 避免重复遍历

### [二叉树的最近公共祖先](./week%206-20241209.md#二叉树的最近公共祖先)

### [二叉树中的最大路径和](./week%206-20241209.md#二叉树中的最大路径和)

- 核心思想 —— 后序遍历

- 需要舍弃副作用 —— 即左右子树的最大路径和小于 0 时，舍弃左右子树

## 图

### [岛屿数量](https://leetcode.cn/problems/number-of-islands/?envType=study-plan-v2&envId=top-100-liked)

- 核心思想

  1. 深度优先遍历 DFS

  2. 感染 —— 避免重复遍历

- 深度优先遍历 DFS

  - 终止条件 —— 越出边界

  - 感染操作 —— 将当前元素置为 0 并上下左右四个方向递归调用 DFS

    ```js
    if (grid[x][y] === '1') {
      grid[x][y] = '0'

      DFS(x + 1, y)
      DFS(x, y + 1)
      DFS(x - 1, y)
      DFS(x, y - 1)
    }
    ```

- for 循环遍历矩阵 —— 遇到 1 则岛屿数量加 1 并调用 DFS 进行感染操作

  ```js
  if (grid[i][j] === '1') {
    count++
    DFS(i, j)
  }
  ```

### [腐烂的橘子](https://leetcode.cn/problems/rotting-oranges/description/?envType=study-plan-v2&envId=top-100-liked)

- 核心思想

  1. 广度优先遍历 BFS —— 队列

  2. 感染 —— 避免重复遍历

- 遍历矩阵

  - 统计新鲜橘子数量

    ```js
    if (grid[i][j] === 1) {
      fresh++
    }
    ```

  - 将腐烂橘子入列

    ```js
    if (grid[i][j] === 2) {
      queue.push([i, j])
    }
    ```

- time 记录腐烂橘子的时间，初始值为 0

- while 循环进行 BFS

  - 循环条件 —— 队列不为空

  - 每一轮 while 循环都直接将 time + 1 ，表示进行了一轮感染

- 每一轮 while 循环

  - 记录当前队列中腐烂橘子个数并作为 for 循环次数

    ```js
    const size = queue.length
    for (let i = 0; i < size; i++) {}
    ```

  - 出列一个腐烂橘子并对其进行上下左右四个方向的感染操作

    ```js
    const [x, y] = queue.shift()
    for (const [j, k] of [
      [x + 1, y],
      [x, y + 1],
      [x - 1, y],
      [x, y - 1],
    ]) {
    }
    ```

  - 如果当前元素是新鲜橘子，则将其感染并将其入列，并将新鲜橘子数量减 1

    ```js
    if (grid[j][k] === 1) {
      grid[j][k] = 2
      queue.push([j, k])
      fresh--
    }
    ```

- 返回结果 —— 如果新鲜橘子数量为 0 则返回 time ，否则返回 -1

  ```js
  return fresh === 0 ? time : -1
  ```

### [课程表](https://leetcode.cn/problems/course-schedule/description/?envType=study-plan-v2&envId=top-100-liked)

- 核心思想

  1. 拓扑排序

  2. 入度表

  3. 队列

- 变量

  - 队列 queue —— 记录入度为 0 的课程，即可以直接学习的课程

  - 入度表 inDegree —— 记录每个课程的入度，即需要学习该课程的先修课程数

  - 哈希表 map —— 记录每个课程的后续课程，key 为先修课程，value 为后续课程

- for 循环遍历课程列表

  ```js
  for (const [course, preCourse] of prerequisites) {
  }
  ```

  - 记录课程的入度，即需要学习该课程的先修课程数

    ```js
    inDegree[course]++
    ```

  - 将先修课程的后续课程入哈希表
    ```js
    map[preCourse] ? map[preCourse].push(course) : (map[preCourse] = [course])
    ```

- 将入度为 0 的课程入列

  ```js
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) {
      queue.push(i)
    }
  }
  ```

- while 循环遍历队列

  - 循环条件 —— 队列不为空

  - 出列一个课程并将 count 加 1，表示完成了当前课程，并遍历其后续课程

    ```js
    count++

    const course = queue.shift()
    for (const nextCourse of map[course] || []) {
    }
    ```

  - 将后续课程的入度减 1，如果入度为 0 则将其入列

    ```js
    inDegree[nextCourse]--

    if (inDegree[nextCourse] === 0) {
      queue.push(nextCourse)
    }
    ```

- 返回结果 —— 最终完成的课程是否等于期望的课程数量 `numCourses`

  ```js
  return count === numCourses
  ```

### [实现 Trie (前缀树)](https://leetcode.cn/problems/implement-trie-prefix-tree/description/?envType=study-plan-v2&envId=top-100-liked)

- 核心思想

  1. 字典树

  2. 哈希表

- Trie 树实例包含一个属性 children 为一个对象

  ```js
  var Trie = function () {
    this.children = {}
  }
  ```

- 插入字符串方法 insert

  - 指针 p 指向 Trie 树实例的 children 属性

  - 遍历字符串 word 的每个字符

    - 如果 p 的属性中不存在当前字符 char，则将当前字符作为 key 并嵌套一个新的哈希表

      ```js
      if (!p[char]) {
        p[i] = {}
      }
      ```

    - 若存在则将指针 p 指向当前字符 char 所指的哈希表

      ```js
      p = p[char]
      ```

  - 将最后一个字符的哈希表中的属性 isEnd 置为 true，表示当前字符串 word 已经插入完毕

    ```js
    p.isEnd = true
    ```

- 搜索前缀方法 startsWith

  - 指针 p 指向 Trie 树实例的 children 属性

  - 遍历字符串 prefix 的每个字符

    - 如果 p 的属性中不存在当前字符 char，则返回 false

      ```js
      if (!p[char]) {
        return false
      }
      ```

    - 若存在则将指针 p 指向当前字符 char 所指的哈希表

      ```js
      p = p[char]
      ```

  - 返回 true，表示当前字符串 prefix 已经搜索完毕

    ```js
    return true
    ```

- 搜索字符串方法 search

  - 指针 p 指向 Trie 树实例的 children 属性

  - 遍历字符串 word 的每个字符

    - 如果 p 的属性中不存在当前字符 char，则返回 false

      ```js
      if (!p[char]) {
        return false
      }
      ```

    - 若存在则将指针 p 指向当前字符 char 所指的哈希表

      ```js
      p = p[char]
      ```

  - 返回 p 的属性 isEnd 是否为 true，表示当前字符串 word 已经搜索完毕

    ```js
    return p.isEnd === true
    ```

## 回溯

### [全排列](https://leetcode.cn/problems/permutations/?envType=study-plan-v2&envId=top-100-liked)

- 临时数组 temp 记录当前排列

- 结果数组 res 记录已有排列

- 哈希表 used 记录当前排列中每个数字是否已经被使用

- 定义回溯函数 backtrack

  - 递归终止条件 —— 临时数组 temp 的长度等于原数组 nums 的长度

    ```js
    if (temp.length === nums.length) {
      res.push([...temp])
      return
    }
    ```

  - for-of 遍历原数组 nums 的每个元素

    - 如果当前元素已经被使用，则跳过

      ```js
      if (used[num]) {
        continue
      }
      ```

    - 如果未被使用 —— 将当前元素加入临时数组 temp，并将当前元素标记为已使用

      ```js
      temp.push(num)
      used[num] = true
      ```

    - 递归调用回溯函数 backtrack

    - 恢复现场 —— 将当前元素从临时数组 temp 中移除，并将当前元素标记为未使用

      ```js
      temp.pop()
      used[num] = false
      ```

### [子集](https://leetcode.cn/problems/subsets/description/?envType=study-plan-v2&envId=top-100-liked)

- 临时数组 temp 记录当前子集

- 结果数组 res 存储已有子集

- 使用深度优先遍历 DFS —— 对于每一个数组都有 选 或 不选 两种选择

  - 递归终止条件 —— 遍历完原数组 nums

    ```js
    if (index === nums.length) {
      res.push([...temp])
      return
    }
    ```

  - 如果不选，则直接递归调用 DFS

    ```js
    DFS(index + 1)
    ```

  - 如果选择，则将当前元素加入临时数组 temp，并递归调用 DFS

    ```js
    temp.push(nums[index])
    DFS(index + 1)
    ```

  - 恢复现场 —— 将当前元素从临时数组 temp 中移除

    ```js
    temp.pop()
    ```

### [电话号码的字母组合](https://leetcode.cn/problems/letter-combinations-of-a-phone-number/description/?envType=study-plan-v2&envId=top-100-liked)

- 临时数组 temp 记录当前号码

- 结果数组 res 存储已有号码

- 数组 map 记录每个数字对应的字母，下标为数字，值为字母字符串

  ```js
  const map = ['', '', 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz']
  ```

- 定义回溯函数 backtrack

  - 参数 —— 起始索引 start

  - 递归终止条件 —— 临时数组 temp 的长度等于原数组 digits 的长度

    ```js
    if (temp.length === digits.length) {
      res.push(temp.join(''))
      return
    }
    ```

  - for-of 遍历原数组 digits 的每个数字对应的字符字符串

    ```js
    for (const char of map[digits[start]]) {
    }
    ```

  - 将当前字符加入临时数组 temp，并递归调用回溯函数 backtrack

    ```js
    temp.push(char)
    backtrack(start + 1)
    ```

  - 恢复现场 —— 将当前字符从临时数组 temp 中移除

    ```js
    temp.pop()
    ```

### [组合总和](https://leetcode.cn/problems/combination-sum/?envType=study-plan-v2&envId=top-100-liked)

- 临时数组 temp 记录当前组合

- 结果数组 res 存储已有组合

- 定义回溯函数 backtrack

  - 参数 —— 起始索引 start 和当前和 sum

  - 剪枝 —— 如果当前和 sum 加上当前元素大于目标和 target，则跳过

  - 递归终止条件 —— 临时数组 temp 的和 sum 等于目标和 target

    ```js
    if (sum > target) return

    if (sum === target) {
      res.push([...temp])
      return
    }
    ```

  - for 循环遍历原数组 candidates —— 从起始索引 start -1 开始，表示重复选择前一个元素

    ```js
    for (let i = start > 0 ? start - 1 ; i < candidates.length; i++) {
    }
    ```

  - 将当前元素加入临时数组 temp，并递归调用回溯函数 backtrack

    ```js
    temp.push(candidates[i])
    backtrack(i + 1, sum + candidates[i])
    ```

  - 恢复现场 —— 将当前元素从临时数组 temp 中移除

    ```js
    temp.pop()
    ```

### [括号生成](https://leetcode.cn/problems/generate-parentheses/?envType=study-plan-v2&envId=top-100-liked)

- 临时数组 temp 记录当前括号组合

- 结果数组 res 存储已有括号组合

- 定义回溯函数 backtrack

  - 参数 —— 左括号数 left 和右括号数 right

  - 递归终止条件 —— 左括号数 left 和右括号数 right 都为 0

    ```js
    if (left === 0 && right === 0) {
      res.push(temp.join(''))
      return
    }
    ```

  - 如果左括号数 left 大于 0，则将左括号加入临时数组 temp，并递归调用回溯函数 backtrack

    ```js
    if (left > 0) {
      temp.push('(')
      backtrack(left - 1, right)
      temp.pop()
    }
    ```

  - 如果右括号数 right 大于左括号数 left，则将右括号加入临时数组 temp，并递归调用回溯函数 backtrack

    ```js
    if (right > left) {
      temp.push(')')
      backtrack(left, right - 1)
      temp.pop()
    }
    ```

### [单词搜索](https://leetcode.cn/problems/word-search/?envType=study-plan-v2&envId=top-100-liked)

- 深度优先遍历 DFS

  - 参数 x, y 表示当前位置, index 表示当前匹配的单词索引

  - 剪枝 —— 如果当前位置的字符不等于单词的当前字符，则返回 false

    ```js
    if (board[x][y] !== word[index]) return false
    ```

  - 终止条件 —— 如果当前匹配的单词索引 index 等于单词的长度，则返回 true

    ```js
    if (index === word.length - 1) return true
    ```

  - 将当前位置的字符标记为已访问

    ```js
    board[x][y] = '#'
    ```

  - 在 (x, y) 的上下左右四个方向递归调用 DFS

    ```js
    for (const [j, k] of [
      [x + 1, y],
      [x, y + 1],
      [x - 1, y],
      [x, y - 1],
    ]) {
      if (DFS(j, k, index + 1)) return true
    }
    ```

  - 恢复现场 —— 将当前位置的字符还原为原来的字符

    ```js
    board[x][y] = word[index]
    ```

  - 双层 for 循环遍历整个二维数组并调用 DFS

    ```js
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[0].length; j++) {
        if (DFS(row, col, 0)) return true
      }
    }
    ```

### [分割回文串](https://leetcode.cn/problems/palindrome-partitioning/?envType=study-plan-v2&envId=top-100-liked)

- 临时数组 temp 记录当前分割

- 结果数组 res 存储已有分割

- 辅助函数 isPalindrome 判断字符串是否为回文串

  ```js
  const isPalindrome = (s, left, right) => {
    while (left < right) {
      if (s.charAt(left++) !== s.charAt(right--)) return false
    }

    return true
  }
  ```

- 深度优先遍历 DFS —— 是否在当前位置分割

  - 参数 —— 分割起始索引 start & 分割终止索引 end

  - 递归终止条件 —— 终止索引 end 等于原字符串 s 的长度

    ```js
    if (end === s.length) {
      res.push([...temp])
      return
    }
    ```

  - 选择不分割 —— 将 end + 1 并递归调用 DFS

    ```js
    DFS(start, end + 1)
    ```

  - 选择分割 —— 判断当前子串是否为回文串，如果是则将当前子串加入临时数组 temp

    ```js
    if (isPalindrome(s, start, end)) {
      temp.push(s.slice(start, end + 1))
    }
    ```

  - 切割后将 end + 1 作为新的起始索引 start 并递归调用 DFS

    ```js
    DFS(end + 1, end + 1)
    ```

  - 恢复现场 —— 将当前子串从临时数组 temp 中移除

    ```js
    temp.pop()
    ```

### [N 皇后](https://leetcode.cn/problems/n-queens/?envType=study-plan-v2&envId=top-100-liked)

- 临时数组 temp 记录当前皇后的位置 —— **下标为行 row，值为列 col**

- 结果数组 res 存储已有皇后的位置

- 问题分解

  - 递归方向 —— 从第 0 行开始逐行向下

  - columnMap 数组 —— 记录当前列是否有皇后，**下标为列 col，值为布尔值**

  - rightTopMap 数组 —— 记录当前右上方 ↗️ 是否有皇后 —— 斜线上 row + col 相等

  - rightBottomMap 数组 —— 记录当前右下 ↘️ 方向上是否有皇后 —— 斜线上 row - col + n - 1 相等

- 定义回溯函数 backtrack

  - 参数 —— 起始行 row = 0

  - 递归终止条件 —— 起始行 row 等于 n

    ```js
    if (row === n) {
      res.push(
        temp.map((col) => '.'.repeat(col) + 'Q' + '.'.repeat(n - col - 1))
      )
      return
    }
    ```

  - for 循环遍历当前行的每一列

    ```js
    for (let col = 0; col < n; col++) {}
    ```

  - 判断当前列 col 是否可以放置皇后 —— columnRecord[col] === false

  - 判断当前右上方 ↗️ 是否可以放置皇后 —— rightTopMap[row + col] === false

  - 判断当前右下 ↘️ 是否可以放置皇后 —— rightBottomMap[row - col + n - 1] === false

    ```js
    if (
      columnRecord[col] === false &&
      rightTopMap[row + col] === false &&
      rightBottomMap[row - col + n - 1] === false
    ) {
    }
    ```

  - 如果可以放置皇后 —— 将当前列 col 加入临时数组 temp，并将当前列 col 标记为已放置

    ```js
    temp[row] = col
    columnRecord[col] =
      rightTopMap[row + col] =
      rightBottomMap[row - col + n - 1] =
        true
    ```

  - 递归调用回溯函数 backtrack

    ```js
    backtrack(row + 1)
    ```

  - 恢复现场 —— 将当前列 col 标记为未放置 —— 因为 temp 数组是直接将列 col 赋值给 temp[row]，所以无需手动移除

    ```js
    columnRecord[col] =
      rightTopMap[row + col] =
      rightBottomMap[row - col + n - 1] =
        false
    ```

## 二分查找

## 栈

## 堆

## 贪心算法

## 动态规划

## 多维动态规划

### [不同路径](./week-7-20241215.md#不同路径-ii)

- 不同路径 II 的简化版，无需考虑障碍物

### [最小路径和](./week-7-20241215.md#最小路径和)

### [最长回文子串](./week-7-20241215.md#最长回文子串)

### [最长公共子序列](https://leetcode.cn/problems/longest-common-subsequence/?envType=study-plan-v2&envId=top-100-liked)

- dp[i][j] —— 表示 text1 的前 i 个字符和 text2 的前 j 个字符的最长公共子序列的长度

  ```js
  const [len1, len2] = [text1.length, text2.length]

  const dp = Array.from(Array(len1 + 1), () => Array(len2 + 1).fill(0))
  ```

- 状态转移方程

  - dp[i][j] = dp[i - 1][j - 1] + 1 —— 如果 text1 的第 i 个字符和 text2 的第 j 个字符相同

    ```js
    if (text1[i - 1] === text2[j - 1]) {
      dp[i][j] = dp[i - 1][j - 1] + 1
    }
    ```

  - dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]) —— 如果 text1 的第 i 个字符和 text2 的第 j 个字符不同

    ```js
    if (text1[i - 1] !== text2[j - 1]) {
      dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
    }
    ```

- 双层 for 循环遍历 text1 和 text2

  ```js
  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {}
  }
  ```

### [编辑距离](./week-7-20241215.md#编辑距离)

## 技巧

### [只出现一次的数字](https://leetcode.cn/problems/single-number/description/?envType=study-plan-v2&envId=top-100-liked)

- 使用 ^ 异或运算符 —— 相同为 0，不同为 1

  ```js
  let res = nums[0]

  for (let i = 1; i < nums.length; i++) {
    res ^= nums[i]
  }

  return res
  ```

### [多数元素](./Week%201-20241026.md#多数元素)

### [颜色分类](https://leetcode.cn/problems/sort-colors/?envType=study-plan-v2&envId=top-100-liked)

- 用双指针 edge1 & edg2 将数组划分为三个区域

  - 0 区域：`[0, edge1)`

  - 1 区域：`[edge1, edg2)`

  - 2 区域：`[edg2, nums.length)`

- 声明 i 变量作为数组下标索引并使用 while 循环数组

  - 循环条件 —— i < edg2

  - 如果当前元素为 0，则将其与 edge1 处的元素交换，并将 edge1 右移一位，i 也右移一位

    ```js
    if (nums[i] === 0) {
      ;[nums[i], nums[edge1]] = [nums[edge1], nums[i]]
      edge1++
    }
    ```

  - 如果当前元素为 2，则将其与 edg2 处的元素交换，并将 edg2 左移一位 —— 为什么 i 不右移一位？因为交换后的元素可能是 0 或 1，需要继续执行交换操作

    ```js
    if (nums[i] === 2) {
      ;[nums[i], nums[edg2]] = [nums[edg2], nums[i]]
      edg2--
    }
    ```

  - 如果当前元素为 1，则将 i 右移一位

    ```js
    i++
    ```

### [下一个排列](https://leetcode.cn/problems/next-permutation/description/?envType=study-plan-v2&envId=top-100-liked)

![](https://pic.leetcode-cn.com/1622189822-LnnwFv-file_1622189822542)

- 从后往前找到第一个升序，并记录其前一个索引 i，即 i 右侧的元素单调递减 —— 表示已经到达最大值，需要在 i 处变大

  ```js
  let i = nums.length - 2
  while (i >= 0 && nums[i] >= nums[i + 1]) {
    i--
  }
  ```

- 如果 i >= 0 —— 再次从后往前找到第一个大于 i 处元素的索引 j

  - i < 0 表示数组已经是最大值，需要将数组反转

  - i >= 0 表示找到了第一个升序，需要将 i 处元素与 j 处元素交换

    ```js
    let j = nums.length - 1
    while (j >= 0 && nums[i] >= nums[j]) {
      j--
    }
    ;[nums[i], nums[j]] = [nums[j], nums[i]]
    ```

- i 右侧的元素在替换结束后仍然保持单调递减，即最大排列值，需要反转为单调递增，成为最小排列值

  ```js
  let [left, right] = [i + 1, nums.length - 1]
  while (left < right) {
    ;[nums[left], nums[right]] = [nums[right], nums[left]]
    left++
    right--
  }
  ```

### [寻找重复数](https://leetcode.cn/problems/find-the-duplicate-number/description/?envType=study-plan-v2&envId=top-100-liked)

- 快慢指针 — 慢指针 slow 每次走一步，快指针 fast 每次走两步

  - 数组中的每一步是什么意思 —— 将数组看作一个链表，数组中的元素表示链表中的节点，数组中的元素值表示链表中的节点的 next 指针指向的节点的索引

  - slow 指向下表为 nums[slow] 的元素，此为一步

  - fast 指向下标为 nums[nums[fast]] 的元素，此为两步

    ```js
    let [slow, fast] = [0, 0]
    while (true) {
      slow = nums[slow]
      fast = nums[nums[fast]]
    }
    ```

- 当 slow 与 fast 相遇，表示存在环 —— 那么如何找到环的入口？

  ![](https://pic.leetcode-cn.com/56c8b48d97d705019869bb772ea98295c8bc9537a4b3c23cb223cdbc95899f6e-%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20200526160516.png)

  - slow 走过的路程为 `D + S1`

  - fast 走过的路程为 `D + n(S1 + S2) + S1`，n 表示 fast 已经环绕圈数

  - 由于 fast 速度是 slow 的两倍，所以 fast 走过的路程是 slow 走过的路程的两倍，即 `D + S1 + n(S1 + S2) + S1 = 2(D + S1)`

  - 我们可以得到 `D = (n - 1)(S1 + S2) + S2`

  - n 取 1 时，`D = S2`

  - 综上所述我们可以声明一个从数组 0 下标出发的指针与 slow 指针同时出发，当两个指针相遇时，相遇的节点即为环的入口

    ```js
    if (slow == fast) {
      let p = 0
      while (true) {
        if (slow === p) return p

        slow = nums[slow]
        p = nums[p]
      }
    }
    ```

- 为什么可以使用快慢指针 —— 因为数组中的元素值范围为 [1, n] 且长度为 n+1 ，所以每个数值对应下标都存在值，不会出现空指针的情况
