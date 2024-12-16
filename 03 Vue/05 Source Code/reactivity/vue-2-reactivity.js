export class Vue {
  constructor(options = {}) {
    this.$options = options
    this.$el =
      typeof options.el === 'string'
        ? document.querySelector(options.el)
        : options.el

    this.$data = options.$data
    this.$methods = options.methods

    this.proxy(this.$data)

    new Observer(this.$data)

    new Compiler(this)
  }

  // this.$data.xxx -> this.xxx
  proxy(data) {
    Object.keys(data).forEach((key) => {
      Object.defineProperty(this, key, {
        enumerable: true,
        configurable: true,
        get() {
          return data[key]
        },
        set(newValue) {
          if (data[key] === newValue || (isNaN(data[key]) && isNaN(newValue)))
            return
          data[key] = newValue
        },
      })
    })
  }
}

class Observer {
  constructor(data) {
    this.walk(data)
  }

  walk(data) {
    if (!data || typeof data !== 'object') return

    Object.keys(data).forEach((key) => {
      this.defineReactive(data, key, data[key])
    })
  }

  defineReactive(target, key, value) {
    const that = this

    // value 也可能是对象，递归调用 walk 方法
    this.walk(value)

    const dep = new Dep()

    Object.defineProperty(target, key, {
      enumerable: true,
      enumerable: true,
      get() {
        // 收集依赖
        Dep.target && dep.add(Dep.target)
        return value
      },
      set(newValue) {
        if (value === newValue) return

        value = newValue
        that.walk(newValue)

        // 发布通知
        dep.notify()
      },
    })
  }
}

class Dep {
  constructor() {
    this.deps = new Set()
  }
  // 收集依赖
  add(dep) {
    if (dep && dep.update) this.deps.add(deps)
  }
  // 发布通知
  notify() {
    this.deps.forEach((dep) => dep.update())
  }
}

class Watcher {
  constructor(vm, key, callback) {
    this.vm = vm
    this.key = key
    this.callback = callback

    Dep.target = this

    // 存储初始值，触发 getter
    this.__oldValue = vm[key]

    // 避免内存溢出 —— 在 getter 触发后完成 Dep.target 的收集，即可置空
    Dep.target = null
  }
  update() {
    let newValue = this.vm[this.key]
    if (newValue !== this.__oldValue) {
      this.callback(newValue)
    }
  }
}

class Compiler {
  constructor(vm) {
    this.vm = vm
    this.el = vm.$el
    this.methods = vm.$methods

    this.compile(vm.$el)
  }

  compile(el) {
    const childNodes = el.childNodes

    // Array.from ——> el.childNodes 是一个类数组
    Array.from(childNodes).forEach((node) => {
      // 1. 如果是一个文本节点
      if (this.isTextNode(node)) {
        this.compileText(node)
      }
      // 2. 如果是一个元素节点
      else if (this.isElementNode(node)) {
        this.compileElement(node)
      }

      // 3. 如果是一个元素节点，且有子节点，则递归调用 compile 方法
      if (node.childNodes && node.childNodes.length) {
        this.compile(node)
      }
    })
  }

  isTextNode(node) {
    return node.nodeType === 3
  }
  isElementNode(node) {
    return node.nodeType === 1
  }
  isDirective(attrName) {
    return attrName.startsWith('v-')
  }

  // "this is {{ msg }}"
  compileText(node) {
    let reg = /\{\{(.+?)\}\}/
    let value = node.textContent
    if (reg.test(value)) {
      let key = RegExp.$1.trim()

      node.textContent = value.replace(reg, this.vm[key])

      new Watcher(this.vm, key, (newValue) => {
        node.textContent = newValue
      })
    }
  }

  compileElement(node) {
    if (node.attributes.length) {
      Array.from(node.attributes).forEach((attr) => {
        let attrName = attr.name

        // 判断属性是否是一个指令
        if (this.isDirective(attrName)) {
          // eg. v-on:click | v-text | v-model
          attrName =
            attrName.indexOf(':') > -1 ? attrName.slice(5) : attrName.slice(2)
          let key = attr.value
          this.update(node, key, arrtName, this.vm[key])
        }
      })
    }
  }

  update(node, key, attrName, value) {
    if (attrName === 'text') {
      node.textContent = value
      new Watcher(this.vm, key, (newValue) => {
        node.textContent = newValue
      })
    } else if (attrName === 'model') {
      node.value = value
      new Watcher(this.vm, key, (newValue) => {
        node.value = newValue
      })
      node.addEventListener('input', () => {
        this.vm[key] = node.value
      })
    } else if (attrName === 'click') {
      node.addEventListener(attrName, this.methods[key].bind(this.vm))
    }
  }
}
