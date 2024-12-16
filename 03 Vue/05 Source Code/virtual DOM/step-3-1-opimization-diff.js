import { mount } from './step-2-1-mount.js'
import { patch } from './step-2-2-patch.js'

// Vue 3 的 diff 算法的核心思想
// 最长上升子序列算法
export const diff = (oldChildren, newChildren, parent) => {
  // 双指针思想

  // j 为前指针
  let j = 0

  // 后指针
  let [oldEndIndex, newEndIndex] = [
    oldChildren.length - 1,
    newChildren.length - 1,
  ]
  let [oldChildNode, newChildNode] = [oldChildren[j], newChildren[j]]

  // 从前往后 & 从后往前各比对一次，缩小需要 diff 的范围
  outer: {
    // 相同节点 —— 指针后移
    while (oldChildNode.key === newChildNode.key) {
      patch(oldChildNode, newChildNode, parent)
      j++

      if (j > oldEndIndex || j > newEndIndex) break outer

      oldChildNode = oldChildren[j]
      newChildNode = newChildren[j]
    }

    oldChildNode = oldChildren[oldEndIndex]
    newChildNode = newChildren[newEndIndex]

    while (oldChildNode.key === newChildNode.key) {
      patch(oldChildNode, newChildNode, parent)
      oldEndIndex--
      newEndIndex--

      if (j > oldEndIndex || j > newEndIndex) break outer

      oldChildNode = oldChildren[oldEndIndex]
      newChildNode = newChildren[newEndIndex]
    }
  }

  // [a, b, c, h, d] => [a, b, c, f, m, k, h, d]
  //        ↑  ↑                  ↑     ↑
  //        e  j                  j     e
  //        n                           n
  //        d                           d
  // 此时 newChildren j 到 newEnd 的节点是要被新增的
  if (j > oldEndIndex && j <= newEndIndex) {
    let newPositionIndex = newEndIndex + 1
    let refNode =
      newPositionIndex < newChildren.length
        ? newChildNode[newPositionIndex].$$.el
        : null

    while (j <= newEndIndex) {
      mount(newChildren[j++], parent, refNode)
    }

    return
  }
  // [a, b, c, f, m, k, h, d] =>  [a, b, c, h, d]
  //           ↑     ↑                   ↑  ↑
  //           j     e                   e  j
  //                 n                   n
  //                 d                   d
  // 此时 oldChildren中 j 到 oldEnd 的节点是要被删除的
  else if (j > newEndIndex) {
    while (j <= oldEndIndex) {
      parent.removeChild(oldChildren[j++].$$.el)
    }

    return
  }

  // [a, b, c, d] =>  [c, a, d, b]
  //  ↑        ↑       ↑        ↑
  //  j        e       j        e
  //           n                n
  //           d                d

  let [oldStartIndex, newStartIndex] = [j, j]
  let [newChildCount, newChildIndexMap] = [newEndIndex - newStartIndex + 1, {}]
  let source = Array(newChildCount).fill(-1)
  let [patched, lastIndex, move] = [0, 0, false]

  // 存储子节点 key 的下标
  for (let i = newStartIndex; i <= newEndIndex; i++) {
    newChildIndexMap[newChildren[i].key || i] = i
  }

  for (let i = oldStartIndex; i <= oldEndIndex; i++) {
    let oldChild = oldChildren[i],
      oldChildKey = oldChild.key || i,
      newChildIndex = newChildIndexMap[oldChildKey]

    if (patched >= newChildCount || newChildIndex === undefined) {
      parent.removeChild(oldChild.$$.el)
      continue
    }

    patched++
    let newChild = newChildren[newChildIndex]
    patch(oldChild, newChild, parent)

    // newChildIndex - newStartIndex 相当于子节点在当前子节点序列中的索引
    // eg. 子节点序列起始索引 newStartIndex 为 3，当前子节点索引为 6
    // 则当前子节点在子节点序列中为第 4 个元素
    // 下标即为 newChildIndex - newStartIndex = 6 - 3 = 3
    source[newChildIndex - newStartIndex] = i

    // lastIndex 为顺序旧子节点序列遍历时的上一个节点的新索引
    // 该步骤的目的是判断子节点是否需要移动
    // 如果旧子节点序列中后一个节点的新索引 < 前一个节点的新索引，说明当前节点需要移动，即 move = true
    if (newChildIndex < lastIndex) {
      move = true
    } else {
      lastIndex = newChildIndex
    }

    if (move) {
      // source: [4, 0, -1, 1]
      // seq: [1, 3]
      const seq = lengthOfLIS(source)
      let j = source.length - 1

      // 倒序遍历 source 数组，即需要 diff 的子节点序列
      for (let i = newChildCount - 1; i >= 0; i--) {
        let [newChildIndex, newChild, newChildNextIndex] = [
          newStartIndex + i,
          newChildren[newChildIndex],
          newChildIndex + 1,
        ]

        // 判断节点插入位置是否已经超出原序列
        let refNode =
          newChildNextIndex >= newChildCount
            ? null
            : newChildren[newChildNextIndex]

        if (source[i] === -1) {
          mount(newChild, parent, refNode)
        } else if (i !== seq[j]) {
          parent.insertBefore(newChild.$$.el, refNode)
        } else {
          j--
        }
      }
    } else {
      // no move
      for (let i = newChildCount - 1; i >= 0; i--) {
        if (source === -1) {
          let [newChildIndex, newChild, newChildNextIndex] = [
            newStartIndex + i,
            newChildren[newChildIndex],
            newChildIndex + 1,
          ]
          let refNode =
            newChildNextIndex >= newChildCount
              ? null
              : newChildren[newChildNextIndex]
              
          mount(newChild, parent, refNode)
        }
      }
    }
  }
}

// 最长上升子序列算法 —— 返回最长上升子序列的索引
/**
 * @param {number[]} nums
 * @return {number}
 */
const lengthOfLIS = function (nums) {
  const dp = Array(nums.length).fill(1)

  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1)
      }
    }
  }

  return Math.max(...dp)
}
