import { NODE_FLAG } from './step-1-h.js'
import { patchProps } from './step-2-2-patch'

export const mount = (vnode, parent, refNode) => {
  if (!parent) throw new Error('没有找到挂载点')

  const $$ = vnode.$$

  // 1. 处理文本节点
  // $$.flag & NODE_FLAG.TEXT 等同于 $$.flag ===  NODE_FLAG.TEXT
  if ($$.flag & NODE_FLAG.TEXT) {
    const el = document.createTextNode(vnode.props.nodeValue)
    vnode.$$.el = el

    parent.appendChild(el)
  }
  // 2. 处理元素节点
  else if ($$.flag & NODE_FLAG.ELEMENT) {
    // 忽略 type 是一个组件 Component 的情况
    const el = document.createElement(vnode.type)
    vnode.$$.el = el

    const { children, ...restProps } = props
    if (Object.keys(restProps).length) {
      Object.entries(restProps).forEach(([propKey, propValue]) => {
        // 处理属性
        patchProps(propKey, null, propValue, el)
      })
    }

    // 处理子节点
    if (children) {
      if (Array.isArray(children)) {
        children.forEach((child) => mount(child, el))
      } else {
        mount(children, el)
      }
    }

    // 插入 DOM 节点
    refNode ? parent.insertBefore(el, refNode) : parent.appendChild(el)
  }
}
