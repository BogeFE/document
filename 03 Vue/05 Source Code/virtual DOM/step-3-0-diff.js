import { mount } from './step-2-1-mount.js'

export const diff = (oldChildren, newChildren, parent) => {
  const [oldChildrenMap, newChildrenMap] = [{}, {}]

  // 1. 收集旧子节点的 key 映射关系
  for (let i = 0; i < oldChildren.length; i++) {
    let { key = i + '' } = oldChildren[i]
    oldChildrenMap[key] = i
  }

  let lastIndex = 0
  // 2. 遍历新子节点
  for (let j = 0; j < newChildren.length; j++) {
    let { key = j + '' } = newChildren[j]

    let k = oldChildrenMap[key]
    let newChild = newChildren[j]
    newChildrenMap[key] = j

    // 2.1 新子节点不存在于旧子节点中 —— 直接挂载
    if (k === null || k === undefined) {
      //  判断插入位置
      const refNode =
        j === 0 ? oldChildren[0] : newChildren[j - 1].$$.el.nextSibling

      mount(newChild, parent, refNode)
    }
    // 2.2 新子节点存在于旧子节点中 —— 移动操作
    else {
      patch(oldChildren[k], newChild, parent)

      if (k < lastIndex) {
        const refNode = newChildren[j - 1].$$.el.nextSibling
        parent.insertBefore(oldChildren[k].$$.el, refNode)
      } else {
        lastIndex = k
      }
    }
  }

  //  删除新子节点中不存在的旧子节点
  for (let i = 0; i < oldChildren.length; i++) {
    let { key = i + '' } = oldChildren[i]

    if (!newChildrenMap.hasOwnProperty(key)) {
      parent.removeChild(oldChildren[i].$$.el)
    }
  }
}
