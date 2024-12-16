import { mount } from './step-2-1-mount'
import { diff } from './step-3-0-diff'

export const patch = (oldVnode, newVnode, parent) => {
  // 1. 新旧节点标签类型不同，直接卸载旧的节点并挂载新的节点
  if (oldVnode.type !== newVnode.type) {
    parent.removeChild(oldVnode.$$.el)
    mount(newVnode, parent)

    return
  }

  // 2. 新旧节点标签类型相同，需要进一步对比 —— diff props
  const {
    props: { children: oldChildren, ...oldProps },
  } = oldVnode
  const {
    props: { children: newChildren, ...newProps },
  } = newVnode

  // 2.1 根据新的属性更新 DOM 节点的属性
  const el = (newVnode.$$.el = oldVnode.$$.el)
  Object.keys(newProps).forEach((propKey) => {
    let [oldPropValue, newPropValue] = [oldProps[propKey], newProps[propKey]]

    patchProps(propKey, oldPropValue, newPropValue, el)
  })

  // 2.2 根据旧的属性删除 DOM 节点上不存在的属性
  Object.entries(oldProps).forEach(([propKey, oldPropValue]) => {
    if (!newProps.hasOwnProperty(propKey)) {
      patchProps(propKey, oldPropValue, null, el)
    }
  })

  // 3. 对比并更新子节点
  patchChildren(oldChildren, newChildren, el)
}

// 进行新旧属性的对比并直接作用在 DOM 节点上
export const patchProps = (propKey, oldPropValue, newPropValue, el) => {
  if (propKey === 'style') {
    if (newPropValue) {
      for (const k in newPropValue) {
        el.style[k] = newPropValue[k]
      }
    }

    if (oldPropValue) {
      for (const k in oldPropValue) {
        if (!newPropValue.hasOwnProperty(k)) {
          el.style[k] = ''
        }
      }
    }
  }
  // 处理 className 属性
  else if (propKey === 'className') {
    if (!el.classList.contains(newPropValue)) {
      el.classList.add(newPropValue)
    }
  }
  // 处理事件
  else if (/^on/.test(propKey)) {
    oldPropValue &&
      el.removeEventListener(propKey.slice(2).toLowerCase(), oldPropValue)
    newPropValue &&
      el.addEventListener(propKey.slice(2).toLowerCase(), newPropValue)
  }
  // 处理其他属性
  else {
    el.setAttribute && el.setAttribute(propKey, newPropValue)
  }
}

// 对比并更新子节点 —— 因为 diff 算法较为消耗性能，因此先做一下前置处理
export const patchChildren = (oldChildren, newChildren, parent) => {
  // 1. 旧节点不存在
  if (!oldChildren) {
    if (!newChildren) {
      return
    } else {
      newChildren = Array.isArray(newChildren) ? newChildren : [newChildren]

      for (const child of newChildren) {
        mount(child, parent)
      }
    }
  }
  // 2. 旧子节点为单个节点
  else if (oldChildren && !Array.isArray(oldChildren)) {
    // 2.1 新子节点不存在
    if (!newChildren) {
      parent.removeChild(oldChildren.$$.el)
    }
    // 2.2 新子节点也是单个节点 —— 直接对比
    else if (!Array.isArray(newChildren)) {
      patch(oldChildren, newChildren, parent)
    }
    // 2.3 新子节点为多个节点 —— 直接删除旧节点并挂载新节点
    else {
      parent.removeChild(oldChildren.$$.el)
      for (const child of newChildren) {
        mount(child, parent)
      }
    }
    // 3. 新旧子节点都为多个节点 —— 使用 diff 算法进行对比
  } else {
    diff(oldChildren, newChildren, parent)
  }
}
