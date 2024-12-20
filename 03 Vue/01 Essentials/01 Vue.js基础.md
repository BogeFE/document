# Vue.js 基础知识

## 模版语法

### 插值

- 文本插值 —— Mustache 标签会被替换为**组件实例中对应 property 的值**

- v-once 指令 —— 当数据改变时，插值处的内容不会更新

- v-html 指令 —— 插入原始 HTML，有造成 [XSS 漏洞](https://zh.wikipedia.org/wiki/%E8%B7%A8%E7%B6%B2%E7%AB%99%E6%8C%87%E4%BB%A4%E7%A2%BC)的风险

- v-bind 指令 —— 对属性进行绑定

  - 简写为 `:`

  - 进一步简写 —— 如果 attribute 的名称与绑定的 JavaScript 值的名称相同可省略值

    ```html
    <div v-bind:id="id"></div>
    <div :id="id"></div>

    <div :id></div>
    <div v-bind:id></div>
    ```

  - 绑定多个值 —— 通过不带参数的 v-bind绑定一个对象

- 文本插值 & Vue 指令的值中可以使用 JS 表达式 —— [需要区分表达式和语句的区别](https://cn.vuejs.org/guide/essentials/template-syntax.html#expressions-only)

### [指令](https://cn.vuejs.org/guide/essentials/template-syntax.html#directives)

- 动态参数 —— 指令参数上也可以使用一个 JavaScript 表达式，需要包含在一对方括号内

- 指令语法

![](https://cn.vuejs.org/assets/directive.DtZKvoAo.png)

- [自定义指令](https://cn.vuejs.org/guide/reusability/custom-directives.html)

## 计算属性

### [使用介绍](https://cn.vuejs.org/guide/essentials/computed.html#basic-example)

### 计算属性的 Setter

- 计算属性默认只有 Getter

- 可以添加 Setter —— 计算属性改变时可进行的其它更新

### 计算属性 Computed 和 方法 Methods 的异同

- 相同点 —— 结果一致

- 不同点 —— **计算属性是基于它们的响应依赖关系缓存的**

  - 计算属性只在相关响应式依赖发生改变时它们才会重新求值

  - 每当触发重新渲染时，调用方法将总会再次执行函数。

### [计算属性 Computed 与 侦听器 Watch 的区别](#计算属性-computed-和-侦听器-watch-的区别)

## 类 class 与样式 style 的绑定

### 绑定类—— v-bind:class / :class

- [绑定对象](https://cn.vuejs.org/guide/essentials/class-and-style.html#binding-to-objects)

  - 内联对象字面量

  - 直接绑定对象名称

  - 绑定一个返回对象的计算属性

- 绑定数组 —— 渲染多个 CSS class

  ```html
  <div :class="[activeClass, errorClass]"></div>
  ```

- [在组件上使用](https://cn.vuejs.org/guide/components/attrs.html)

  - 单个根元素 —— 组件上的 class 会被合并到根元素的 class 中

  - 多个根元素 —— 使用 `$attrs` 组件属性定义接收 class 的根元素

### 绑定内联样式 —— v-bind:style / :style

- style 的绑定使用规则同 [class 的绑定](#绑定-class--v-bindclass--class)

- 样式多值 —— 金辉渲染浏览器支持的最后一个值

  ```html
  <div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
  ```

## [条件渲染](https://cn.vuejs.org/guide/essentials/conditional.html)

### v-if

- `v-if` 指令只会在指令的表达式返回真值的时候渲染。

  ```html
  <h1 v-if="awesome">Vue is awesome!</h1>
  ```

- 可以用 `v-else` 添加一个“else 块” —— `v-else` 元素必须紧跟在带 `v-if` 或者 `v-else-if` 的元素的后面，否则它将不会被识别。

  ```html
  <h1 v-if="awesome">Vue is awesome!</h1>
  <h1 v-else>Oh no 😢</h1>
  ```

- `v-else-if`，顾名思义，充当 `v-if` 的“else-if 块”，并且可以连续使用：`v-else-if` 也必须紧跟在带 `v-if` 或者 `v-else-if` 的元素之后。

- `<template>` 上的 `v-if`、`v-else`、`v-else-if` —— 最后渲染的结果并不会包含这个 `<template>` 元素

  ```html
  <template v-if="ok">
    <h1>Title</h1>
    <p>Paragraph 1</p>
    <p>Paragraph 2</p>
  </template>
  ```

### v-if VS v-show

1. `<template>` 的使用

   - `v-if`可添加在 `<template>` 上以同时控制多个元素

   - `v-show` 不支持 `<template>` 元素，也不支持 `v-else`。

2. 切换开销

   - `v-if` 有更高的切换开销 —— 真正地销毁和重建组件

   - `v-show` 仅简单地切换元素的 CSS 属性 `display`。

3. 初始渲染开销 / 编译条件

   - `v-show` 有更高的初始渲染开销 —— 无论初始条件，元素总是会被渲染

   - `v-if` 是**惰性的** —— 只有当条件第一次变为真时，才会开始渲染条件块。

4. 优先级 —— `v-if` 具有比 `v-for` 更高的优先级

5. 适用场景

   - `v-if` 适用于运行条件不太大可能变化的场景

   - `v-show` 适用于需要频繁切换的场景

<!--  -->

<!--  -->

## [列表渲染](https://cn.vuejs.org/guide/essentials/list.html)

### v-for

- `v-for` 指令需要使用 `item in items` 形式的特殊语法 —— `items` 是源数据数组 & `item` 是被迭代的数组元素的**别名**。

  ```html
  <ul id="array-rendering">
    <li v-for="item in items">{{ item.message }}</li>
  </ul>
  ```

- `v-for` 还支持一个可选的第二个参数，即当前项的索引。

  ```html
  <ul id="array-with-index">
    <li v-for="(item, index) in items">
      {{ parentMessage }} - {{ index }} - {{ item.message }}
    </li>
  </ul>
  ```

- 可以使用解构

- 可以使用 `of` 语法

  ```html
  <li v-for="item in items">
    <span v-for="childItem in item.children">
      {{ item.message }} {{ childItem }}
    </span>
  </li>
  ```

### 使用对象

- 用 `v-for` 来遍历一个对象的 property —— 基于 Object.values()

  ```html
  <ul id="v-for-object" class="demo">
    <li v-for="value in myObject">{{ value }}</li>
  </ul>
  ```

- 可以提供第二个的参数为 property 名称 (也就是键名 key)：

  ```html
  <li v-for="(value, key) in myObject">{{ key }}: {{ value }}</li>
  ```

- 可以用第三个参数作为索引：

  ```html
  <li v-for="(value, key, index) in myObject">
    {{ index }}. {{ key }}: {{ value }}
  </li>
  ```

### 使用范围值

- v-for 可以直接接受一个整数值，此时它将重复多次模板，初始值为 1 而非 0

  ```html
  <span v-for="n in 10">{{ n }}</span>
  ```

### 使用 \<template\>

- 可以在 `<template>` 标签上使用 v-for 来渲染一个包含多个元素的块

  ```html
  <ul>
    <template v-for="item in items">
      <li>{{ item.msg }}</li>
      <li class="divider" role="presentation"></li>
    </template>
  </ul>
  ```

### 通过 [key](https://cn.vuejs.org/api/built-in-special-attributes.html#key) 管理状态

- Vue 默认按照“就地更新”的策略来更新通过 v-for 渲染的元素列表

- 建议尽可能在使用 `v-for`时提供 key attribute

  ```html
  <div v-for="item in items" :key="item.id">
    <!-- content -->
  </div>
  ```

- 使用 `<template v-for>` 时，key 必须添加在 `<template>` 标签上

### 数组变化侦测

- Vue 能够检测到以下数组的变动

  - **push( )**

  - **pop( )**

  - **shift( )**

  - **unshift( )**

  - **splice( )**

  - **sort( )**

  - **reverse( )**

- 对于非变更方法，即不变更原始数组，而是返回新数组的方法 —— 需要将旧的数组替换为新的

  ```js
  // `items` 是一个数组的 ref
  items.value = items.value.filter((item) => item.message.match(/Foo/))
  ```

- 显示过滤/排序后的结果

  - 使用计算属性来返回过滤或者排序后的数组

    ```js
    const numbers = ref([1, 2, 3, 4, 5])
    const evenNumbers = computed(() => {
      return numbers.value.filter((n) => n % 2 === 0)
    })
    ```

  - 计算属性不适用时，例如在 `v-for` 中使用

    ```js
    const sets = ref([
      [1, 2, 3, 4, 5],
      [6, 7, 8, 9, 10],
    ])

    function even(numbers) {
      return numbers.filter((number) => number % 2 === 0)
    }
    ```

    ```html
    <ul v-for="numbers in sets">
      <li v-for="n in even(numbers)" :key="n">{{ n }}</li>
    </ul>
    ```

### v-if 和 v-for

- 不推荐同时使用 `v-if` 和 `v-for`，因为这会带来不必要的开销。

- 当处于同一节点，`v-if` 的优先级比 `v-for` 更高，这意味着 `v-if` 将没有权限访问 `v-for` 里的变量：

  ```html
  <!--
   这会抛出一个错误，因为属性 todo 此时
   没有在该实例上定义
  -->
  <li v-for="todo in todos" v-if="!todo.isComplete">{{ todo.name }}</li>
  ```

- 可以将`v-for` 放入 `<template>`中修正

  ```html
  <template v-for="todo in todos">
    <li v-if="!todo.isComplete">{{ todo.name }}</li>
  </template>
  ```

### 在组件上使用

- 记得提供 key

- 使用 props 将迭代数据传递到组件里

  ```html
  <my-component v-for="(item, index) in items" :item="item" :index="index"
  :key="item.id" / >
  ```

<!--  -->

## [事件处理](https://cn.vuejs.org/guide/essentials/event-handling.html)

### 事件监听

- 指令 —— v-on / @

- 事件处理器 handler 有两种形式

  - 内联事件处理器

    ```html
    <button @click="count++">Add 1</button>
    <p>Count is: {{ count }}</p>
    ```

  - 方法事件处理器

    ```html
    <button @click="greet">Greet</button>
    ```

### 内联事件处理器

- 调用方法

  ```html
  <button @click="say('hello')">Say hello</button>
  <button @click="say('bye')">Say bye</button>
  ```

- 访问事件参数 `$event`

  ```html
  <!-- 使用特殊的 $event 变量 -->
  <button @click="warn('Form cannot be submitted yet.', $event)">Submit</button>

  <!-- 使用内联箭头函数 -->
  <button @click="(event) => warn('Form cannot be submitted yet.', event)">
    Submit
  </button>
  ```

### [事件修饰符](https://cn.vuejs.org/guide/essentials/event-handling.html#event-modifiers)

修饰符是由点开头的指令后缀来表示的。

- `.stop` —— 阻止单击事件继续传播，相当于 event.stopPropagation()

- `.prevent` —— 提交事件不再重载页面，相当于 event.preventDefault()

- `.capture` —— 添加事件监听器时使用事件捕获模式

- `.self` —— 只当在 event.target 是当前元素自身时触发处理函数

- `.once` —— 点击事件将只会触发一次

- `.passive` —— 不要把 `.passive` 和 `.prevent` 一起使用，因为 `.prevent` 将会被忽略，同时浏览器可能会向你展示一个警告。

### 其他修饰符

- [按键修饰符](https://cn.vuejs.org/guide/essentials/event-handling.html#key-modifiers)

- [系统按键修饰键](https://cn.vuejs.org/guide/essentials/event-handling.html#system-modifier-keys)

- [鼠标按钮修饰符](https://cn.vuejs.org/guide/essentials/event-handling.html#mouse-button-modifiers)

- [.exact 修饰符](https://cn.vuejs.org/guide/essentials/event-handling.html#exact-modifier) —— 控制由精确的系统修饰符组合触发的事件

### 使用 `v-on` 或 `@` 有几个好处：

1. 扫一眼 HTML 模板便能轻松定位在 JavaScript 代码里对应的方法。

2. 因为你无须在 JavaScript 里手动绑定事件，你的 ViewModel 代码可以是非常纯粹的逻辑，和 DOM 完全解耦，更易于测试。

3. 当一个 ViewModel 被销毁时，所有的事件处理器都会自动被删除。你无须担心如何清理它们。

##  表单输入绑定

### v-model

- 简化了 v-bind 指令 & v-input 指令

  - 简化前

    ```html
    <input :value="text" @input="event => text = event.target.value" />
    ```

  - 简化后

    ```html
    <input v-model="text" />
    ```

- [可用于多种不同类型元素和输出](基本用法)

  - 文本类型元素 `<input>` 和 `<textarea>` —— 绑定 value 属性，监听 input 事件

  - 复选框元素 `<input type="checkbox">` 和 `<input type="radio">` —— 绑定 checked 属性， 监听 change 事件

  - 选择器元素 `<select>` —— 绑定 value 属性，监听 change 事件

- v-model 会忽略表单元素的 value、checked、selected 的初始属性值

### 修饰符

.lazy —— 在 change 事件之后更新而非在 input 事件触发后更新

.number —— 自动将用户的输入值转为数值类型

.trim —— 自动过滤用户输入的**首尾**空白字符

## [侦听器](https://cn.vuejs.org/guide/essentials/watchers.html)

### 介绍

- 基本使用

```js
export default {
  watch: {
    // 每当 question 改变时，这个函数就会执行
    question(newQuestion, oldQuestion) {
      // do something
    },

    // 注意：只能是简单的路径，不支持表达式。
    'some.nested.key'(newValue) {
      // do something
    },
  },
}
```

- 深层侦听器

  - 设置 deep 属性为 true —— 侦听所有嵌套的变更

    ```js
    export default {
      watch: {
        someObject: {
          handler(newValue, oldValue) {
            // 注意：在嵌套的变更中，只要没有替换对象本身，那么这里的 `newValue` 和 `oldValue` 相同
          },
          deep: true,
        },
      },
    }
    ```

  - 在 Vue 3.5+ 中，deep 可以是一个数字，表示最大遍历深度

- 即时回调，即创建侦听器时立即执行一遍

  - 设置选项 immediate: true

  - 初次执行发生在 created 生命周期钩子之前

- Vue 3.4+版本中可设置仅触发一次的一次性侦听器 —— 设置选项 once: true

- 副作用清理

  - [onWatcherCleanup() 方法](https://cn.vuejs.org/api/reactivity-core.html#onwatchercleanup)

  - 侦听器回调函数的第三个参数 onCleanup 函数

### 计算属性 Computed 和 侦听器 Watch 的区别

- 缓存

  - computed 支持缓存，只有依赖的数据变化了才会重新计算

  - watch 不支持缓存，一旦数据变化就会触发相应操作

- 异步

  - computed 不支持异步，当 computed 中有异步操作时无法监听数据的变化

  - watch 支持异步监听

- 适用场景

  - computed 适用于需要进行数值计算并依赖其他数据的操作场景

  - watch 适用于需要在数据变化时执行异步或开销较大的操作

## [模版引用](https://cn.vuejs.org/guide/essentials/template-refs.html)

- ref 属性 —— 声明模版引用

- this.$refs —— 访问模版引用