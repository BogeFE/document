const targetMap = new WeakMap()
let activeEffect

/**
 * 追踪某个对象的特定属性的依赖关系
 * @param {Object} target - 要追踪的目标对象
 * @param {string} key - 目标对象的属性键
 */
function track(target, key) {
  // 尝试从 targetMap 中获取 target 对象的依赖映射
  const depsMap = targetMap.get(target)
  // 如果获取失败（即 target 对象没有依赖映射），则创建一个新的 Map 并设置到 targetMap 中
  if (!depsMap) {
    targetMap.set(target, new Map())
  }

  // 尝试从 depsMap 中获取 key 属性的依赖集合
  const dep = depsMap.get(key)
  // 如果获取失败（即 key 属性没有依赖集合），则创建一个新的 Set 并设置到 depsMap 中
  if (!dep) {
    depsMap.set(key, new Set())
  }

  // 如果 activeEffect 不存在于 dep 中，则将其添加到 dep 中
  if (!dep.has(activeEffect)) dep.add(activeEffect)
}

/**
 * 触发某个对象的特定属性的依赖关系
 * @param {Object} target - 要触发依赖的目标对象
 * @param {string} key - 目标对象的属性键
 */
function trigger(target, key) {
  // 尝试从 targetMap 中获取 target 对象的依赖映射
  const depsMap = targetMap.get(target)
  // 如果获取失败（即 target 对象没有依赖映射），则直接返回
  if (!depsMap) return

  // 尝试从 depsMap 中获取 key 属性的依赖集合
  const dep = depsMap.get(key)
  // 如果获取失败（即 key 属性没有依赖集合），则直接返回
  if (!dep) return

  // 遍历 dep 集合中的每个副作用函数，并执行它们
  dep.forEach((effect) => {
    // 如果 effect 函数存在，则执行它
    effect && effect()
  })
}

/**
 * 创建一个副作用函数，用于追踪和触发依赖
 * @param {Function} func - 要执行的副作用函数
 * @param {Object} options - 副作用函数的配置选项
 * @returns {Function} - 返回创建的副作用函数
 */
function effect(func, options = {}) {
  // 创建一个内部函数 __effect，它将成为实际执行的副作用函数
  const __effect = function (...args) {
    // 在执行副作用函数之前，将当前副作用函数设置为 activeEffect
    activeEffect = __effect
    // 执行传入的副作用函数 func，并传入调用时的参数 args
    func(...args)
    // 在副作用函数执行完毕后，将 activeEffect 重置为 null
    activeEffect = null
  }

  if (!options.lazy) {
    __effect()
  }

  // 返回创建的副作用函数 __effect
  return __effect
}

// 封装一个判断是否为对象的方法
function isObject(target) {
  return typeof target === 'object' && target !== null
}

export function reactive(data) {
  if (!isObject(data)) return

  return new Proxy(data, {
    get(target, key, receiver) {
      const result = Reflect.get(target, key, receiver)

      // 依赖收集
      track(target, key)

      return isObject(result) ? reactive(result) : result
    },
    set(target, key, newValue, receiver) {
      Reflect.set(target, key, newValue, receiver)

      // 触发依赖
      trigger(target, key)

      return true
    },
    deleteProperty(target, key) {
      const result = Reflect.deleteProperty(target, key)

      // 触发依赖
      trigger(target, key)

      return result
    },
  })
}

export function ref(data) {
  let value = data
  const target = {
    get value() {
      track(target, 'value')

      return value
    },
    set value(newValue) {
      if (value === newValue) return

      value = newValue

      trigger(target, 'value')
    },
  }

  return target
}

export function computed(getter) {
  let __computed

  // 只会访问了当前方法返回的对象的 value 属性时才会执行 getter 函数
  const run = effect(getter, { lazy: true })

  __computed = {
    get value() {
      return run()
    },
  }
}

export function mount(app, el) {
  effect(() => {
    app.$data && update(qpp, el)
  })

  app.$data = app.setup()
  update(app, el)

  function update(app, el) {
    el.innerHTML = app.render()
  }
}
