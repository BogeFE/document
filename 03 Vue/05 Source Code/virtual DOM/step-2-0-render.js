import { mount } from './step-2-1-mount.js'
import { patch } from './step-2-2-patch.js'

// 渲染虚拟 DOM 为真实 DOM

export function render(newVnode, parent) {
  let oldVnode = parent._vnode

  // 判断根节点是否已经挂载了虚拟节点
  if (!oldVnode) {
    // 首次挂载 —— 需要实现 mount 方法
    mount(newVnode, parent)
    parent._vnode = newVnode
  } else {
    // 新旧两个 vnodeTree 都存在
    if (newVnode) {
      // 非首次挂载 —— 需要实现 patch 方法
      patch(oldVnode, newVnode, parent)
      parent._vnode = newVnode
    } else {
      // 卸载旧的 vnodeTree
      parent.removeChild(oldVnode.$$.el)
    }
  }
}
