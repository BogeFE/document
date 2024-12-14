## Vue 2 响应式原理

1.  基本结构

    1. 类 Vue

       ```js
       export class Vue {}
       ```

    2. 类 Observer —— 数据劫持，当数据变更时，会调用 dep.notify 方法通知所有 Watcher 更新视图

       ```js
       class Observer {}
       ```

    3. 类 Watcher —— 观察者，当数据变更时，会调用 update 方法更新对应的视图

       ```js
       class Watcher {}
       ```

    4. 类 Dep —— 消息中心，目的就是收集 Watcher，当数据变更时，调用所有 Watcher 的 update 方法

       ```js
       class Dep {}
       ```

    5. 类 Compiler —— 编译

       ```js
       class Compiler {}
       ```

2.  实现 Vue 类

    1. 初始化 $options、$el、$data、$methods 等实例属性

       ```js
       constructor(options) {
         this.$options = options
         this.$data = options.data
         this.$el = options.el
         this.$methods = options.methods
       }
       ```

    2. 定义一个 proxy 方法，对 this.$data 进行一层代理 —— 数据访问方式 this.$data.xxx -> this.xxx

       ```js
       class Vue {
         constructor(options) {
           this.$data = options.data
           this.proxy(this.$data)
         }

         proxy(data) {
           Object.keys(data).forEach((key) => {
             Object.defineProperty(this, key, {
               enumerable: true,
               configurable: true,
               get() {
                 return data[key]
               },
               set(newValue) {
                 data[key] = newValue
               },
             })
           })
         }
       }
       ```

    3. 实例化 Observer 类，对 this.$data 进行劫持

       ```js
       class Vue {
         constructor(options) {
           this.$data = options.data

           new Observer(this.$data)
         }
       }
       ```

3.  实现 Observer 类

    1. walk 方法 —— 遍历数据对象，调用 defineReactive 对属性进行劫持

       ```js
       class Observer {
         constructor(data) {
           this.walk(data)
         }

         walk(data) {
           Object.keys(data).forEach((key) => {
             defineReactive(data, key, data[key])
           })
         }
       }
       ```

       2. defineReactive 方法 —— 劫持数据对象的属性，使用 Dep 类收集依赖，使用 Observer 类递归劫持子属性

4.  实现 Observer.prototype.defineReactive 方法

    1. 传入的属性值可能是对象，需要递归调用 walk 方法

       ```js
       class Observer {
         constructor(data) {}

         walk(data) {}

         defineReactive(target, key, value) {
           this.walk(value)
         }
       }
       ```

    2. 使用 Object.defineProperty 对属性进行劫持 —— setter 中 newValue 也可能是一个对象，需要递归调用 walk 方法

       ```js
       class Observer {
         constructor(data) {}

         walk(data) {}

         defineReactive(target, key, value) {
           const that = this

           this.walk(value)

           Object.defineProperty(target, key, {
             enumerable: true,
             configurable: true,
             get() {
               return value
             },
             set(newValue) {
               value = newValue
               that.walk(newValue)
             },
           })
         }
       }
       ```

       3. 实例化一个消息中心 Dep，在 getter 中收集当前的 Watcher，即 Dep.target，而在 setter 中通知所有的 Watcher 更新视图

       ```js
       class Observer {
         constructor(data) {}

         walk(data) {}

         defineReactive(target, key, value) {
           const that = this

           this.walk(value)

           const dep = new Dep()

           Object.defineProperty(target, key, {
             enumerable: true,
             configurable: true,
             get() {
               Dep.target && dep.add(Dep.target)
               return value
             },
             set(newValue) {
               value = newValue
               that.walk(newValue)

               dep.nofity()
             },
           })
         }
       }
       ```

5.  实现 Dep 类

    1.  构造函数初始化一个消息中心 deps —— 数据结构为 Set

        ```js
        class Dep {
          constructor() {
            this.deps = new Set()
          }
        }
        ```

    2.  第一个实例方法 add —— 收集依赖，基于 Set.prototype.add

        ```js
        class Dep {
          constructor() {
            this.deps = new Set()
          }

          add(dep) {
            this.deps.add(dep)
          }
        }
        ```

    3.  第二个实例方法 nofity —— 通知所有的 Watcher 更新视图，遍历 deps，调用 update 方法

        ```js
        class Dep {
          constructor() {
            this.deps = new Set()
          }
          add(dep) {
            this.deps.add(dep)
          }
          nofity() {
            this.deps.forEach((dep) => {
              dep.update()
            })
          }
        }
        ```

6.  实现 Watcher 类

    1. 构造函数初始化一个 Watcher，传入一个 vm 实例、一个数据属性名 key 和数据更新时需要执行的回调函数 callback

       ```js
       class Watcher {
         constructor(vm, key, callback) {
           this.vm = vm
           this.key = key
           this.callback = callback
         }
       }
       ```

    2. 在构造函数中，将当前的 Watcher 实例赋值给 Dep.target，然后读取 vm[key]，触发 getter，从而收集依赖

       ```js
       class Watcher {
         constructor(vm, key, callback) {
           this.vm = vm
           this.key = key
           this.callback = callback

           Dep.target = this
           vm[key]
         }
       }
       ```

    3. 将 vm[key] 的原始值保存到 oldValue 中，然后将 Dep.target 置为 null，防止重复收集依赖

       ```js
       class Watcher {
         constructor(vm, key, callback) {
           this.vm = vm
           this.key = key
           this.callback = callback

           Dep.target = this
           this.__oldValue = vm[key]
           Dep.target = null
         }
       }
       ```

    4. 实例方法 update —— 当数据更新时，调用 callback 方法更新视图

       ```js
       class Watcher {
         constructor(vm, key, callback) {
           this.vm = vm
           this.key = key
           this.callback = callback
           Dep.target = this
           this.__oldValue = vm[key]
           Dep.target = null
         }
         update() {
           let newValue = this.vm[this.key]
           if (newValue !== this.__oldValue) {
             this.callback(newValue)
           }
         }
       }
       ```

7.  实现 Compiler 类

    1.  构造函数初始化一个 Compiler 实例，传入一个 vm 实例，并将 vm.$el & vm.$methods 赋值给 el 属性 & methods 属性

        ```js
        class Compiler {
          constructor(vm) {
            this.vm = vm
            this.el = vm.$el
            this.methods = vm.$methods
          }
        }
        ```

    2.  实例方法 compile —— 遍历 el.childNodes 类数组并调用 compileText / compileElement 方法

        ```js
        class Compiler {
          constructor(vm) {
            this.vm = vm
            this.el = vm.$el
            this.methods = vm.$methods
          }
          compile() {
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
        }
        ```

    3.  实例方法 compileText —— 处理文本节点，使用正则表达式匹配 {{ }} 中的数据属性名，然后使用 Watcher 类收集依赖，最后调用 update 方法更新视图

        ```js
        class Compiler {
          constructor(vm) {
            this.vm = vm
            this.el = vm.$el
            this.methods = vm.$methods
          }
          compile() {}

          compileText(node) {
            const reg = /\{\{(.+?)\}\}/
            const value = node.textContent
            if (reg.test(value)) {
              const key = RegExp.$1.trim()

              node.textContent = value.replace(reg, this.vm[key])

              new Watcher(this.vm, key, (newValue) => {
                node.textContent = newValue
              })
            }
          }
        }
        ```

    4.  实例方法 compileElement —— 处理元素节点，使用正则表达式匹配 v- 指令，然后使用 Watcher 类收集依赖，最后调用 update 方法更新视图

        ```js
        class Compiler {
          constructor(vm) {
            this.vm = vm
            this.el = vm.$el
            this.methods = vm.$methods
          }

          compile() {}
          compileText(node) {}
          compileElement(node) {
            const nodeAttrs = node.attributes
            Array.from(nodeAttrs).forEach((attr) => {
              const attrName = attr.name

              if (attrName.indexOf('v-') === 0) {
                // eg. v-on:click | v-text | v-model
                attrName =
                  attrName.indexOf(':') > -1
                    ? attrName.slice(5)
                    : attrName.slice(2)

                const attrValue = attr.value

                // attrValue 作为 key
                // eg. v-if="isShow"
                this.update(node, attrName, attrValue, this.vm[attrValue])
              }
            })
          }
        }
        ```

    5.  实例方法 update —— 判断指令类型，然后调用对应的方法更新视图

        ```js
        class Compiler {
          constructor(vm) {
            this.vm = vm
            this.el = vm.$el
            this.methods = vm.$methods
          }
          compile() {}
          compileText(node) {}
          compileElement(node) {}

          update(node, attrName, attrValue, value) {
            if (attrName === 'text') {
              node.textContent = value
              new Watcher(this.vm, attrValue, (newValue) => {
                node.textContent = newValue
              })
            } else if (attrName === 'model') {
              node.value = value
              new Watcher(this.vm, attrValue, (newValue) => {
                node.value = newValue
              })
              node.addEventListener('input', () => {
                this.vm[attrValue] = node.value
              })
            } else if (attrName === 'click') {
              node.addEventListener(
                attrName,
                this.methods[attrValue].bind(this.vm)
              )
            }
          }
        }
        ```

    6.  在 Vue 类的构造函数中，实例化一个 Compiler 类，调用 compile 方法编译模板
        ```js
        class Vue {
          constructor(options) {
            this.$data = options.data
            this.$el = options.el
            this.$methods = options.methods

            new Observer(this.$data)
            new Compiler(this)
          }
        }
        ```

## Vue 3 响应式原理
