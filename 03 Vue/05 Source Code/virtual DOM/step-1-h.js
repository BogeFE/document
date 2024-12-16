// Step 1 —— 定义虚拟 DOM 的数据结构，声明创建虚拟 DOM 的方法
// $$ —— 内部使用的属性
const createVnode = (type, props, key, $$) => {
  return {
    type,
    props,
    key,
    $$,
  }
}

// Step 2 —— 对于纯文本节点进行特殊处理
const createTextVnode = (text) => {
  return {
    type: '',
    props: {
      nodeValue: text + '',
    },
    $$: {
      flag: NODE_FLAG.TEXT,
    },
  }
}

// 标记节点类型
export const NODE_FLAG = {
  ELEMENT: 1,
  // 运用位运算，将 1 向左移动一位，得到 2
  TEXT: 1 << 1,
}

// Step 3 —— 对纯文本子节点进行特殊处理
const normalize = (children = []) =>
  children.map((child) =>
    typeof child === 'string' ? createTextVnode(child) : child
  )

// 使用场景 —— h('div', { className: 'padding20' }, 'hello world ')
export const h = (type, props, ...children) => {
  props = props || {}

  let key = props.key || void 0

  children = normalize(props.children || children)
  if (children.length) {
    props.children = children.length === 1 ? children[0] : children
  }

  const $$ = {
    el: null,
    flag: type === '' ? NODE_FLAG.TEXT : NODE_FLAG.ELEMENT,
  }

  return createVnode(type, props, key, $$)
}
