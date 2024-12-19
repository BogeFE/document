# Vue.js 基础知识

## 模版语法

## 响应式基础

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

## 类与样式绑定

<!--  -->

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

## 事件处理

## 表单输入绑定

## 生命周期

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

## 模版引用

## 组件实例

#### 创建应用实例

每个 Vue 应用都是通过用 `createApp` 函数创建一个新的**应用实例**开始的：

```js
const app = Vue.createApp({
  /* 选项 */
})
```

#### 根组件

一个应用需要被挂载到一个 DOM 元素中。例如，如果你想把一个 Vue 应用挂载到 `<div id="app"></div>`，应该传入 `#app`：

```js
const RootComponent = {
  /* 选项 */
}
const app = Vue.createApp(RootComponent).mount('#app')
```

#### 组件实例 property

在 data 中定义的 property 通过**组件实例**暴露

```js
const vm = Vue.createApp({
  data() {
    return {
      count: 4,
    }
  },
}).mount('#app')

console.log(vm.count) //4
```

#### 生命周期钩子

Vue 实例有一个完成的生命周期：开始创建 → 初始化数据 → 编译模板 → 挂载 DOM → 渲染、更新 → 渲染、卸载

![实例的生命周期](https://v3.cn.vuejs.org/images/lifecycle.svg)

- **beforeCreate（创建前）**—— 无法访问到 data、computed、watch、methods 上的方法和数据
- **created（创建后）**—— 实例创建完成，实例上的 data、computed、watch、methods 已配置完成；渲染的节点未挂载到 DOM 上，无法访问到**$el**属性

- **beforeMount（挂载前）**—— 编译模板，将 data 里的数据和模板生成 html，该 html 未挂载到页面上
- **mounted（挂载后）**

- **beforeUpdate（更新前）**：响应式数据更新时调用，此时虽然响应式数据更新了，但是对应的**真实 DOM 还没有被渲染**
- **updated（更新后）**—— 组件 DOM 已经更新，可以执行依赖于 DOM 的操作
- **beforeDestroy（销毁前）**—— 销毁实例之前调用，实例仍然完全可用，**`this` 仍能获取到实例**
- **destroyed（销毁后）** —— 实例销毁后调用

## 插值

#### 文本插值

Mustache 标签会被替换为**组件实例中对应 property 的值**

```html
<span>Message: {{ msg }}</span>
```

#### v-once 指令

当数据改变时，插值处的内容不会更新

```html
<span v-once>这个将不会改变: {{ msg }}</span>
```

#### 原始 HTML

使用 `v-html` 指令输出真正的 HTML

```html
<div id="example1" class="demo">
  <p>Using mustaches: {{ rawHtml }}</p>
  <p>Using v-html directive: <span v-html="rawHtml"></span></p>
</div>

<script>
  Vue.createApp({
    data() {
      return {
        rawHtml: '<span style="color: red">This should be red.</span>',
      }
    },
  }).mount('#example1')
</script>
```

#### Attribute

```html
<button v-bind:disabled="isButtonDisabled">按钮</button>
```

#### 使用 JavaScript 表达式

## 指令

指令的职责 —— 当表达式的值改变时，将产生的影响响应式地作用于 DOM

#### 参数

有些指令可以接收参数

```html
<a v-bind:href="url"> ... </a>
```

- href 作为参数
- v-bind 将该组件实例的 href attribute 与表达式 url 的值进行绑定

#### 动态参数

在方括号中使用 JavaScript 表达式作为指令参数

```html
<a v-bind:[attributeName]="url"> ... </a>

<a v-on:[eventName]="doSomething"> ... </a>
```

#### 修饰符

## 缩写

- **v-bind —— :**

  ```html
  <!-- 完整语法 -->
  <a v-bind:href="url"> ... </a>

  <!-- 缩写 -->
  <a :href="url"> ... </a>

  <!-- 动态参数的缩写 -->
  <a :[key]="url"> ... </a>
  ```

- **v-on —— @**

  ```html
  <!-- 完整语法 -->
  <a v-on:click="doSomething"> ... </a>

  <!-- 缩写 -->
  <a @click="doSomething"> ... </a>

  <!-- 动态参数的缩写 (2.6.0+) -->
  <a @[event]="doSomething"> ... </a>
  ```

## Data Property

组件的 `data` 选项是一个函数，**返回一个对象**，然后 Vue 会通过响应性系统将其包裹起来，并以 `$data` 的形式存储在组件实例中。

```js
const app = Vue.createApp({
  data() {
    return { count: 4 }
  },
})
```

## 方法

用 `methods` 选项向组件实例添加方法，是一个包含所需方法的对象：

```js
const app = Vue.createApp({
  methods: {
    sayHi() {
      alert('Hi')
    },
  },
})
```

定义 methods 时应避免是用箭头函数 → 会阻止 Vue 绑定恰当的 this 指向

## 绑定 Class

#### 对象语法

- 我们可以传给 `:class` 一个对象，以动态地切换 class：

```html
<div :class="{ active: isActive }"></div>
<!--数据isActive 的真假决定了 active 这个 class 是否存在-->
```

- 绑定的数据对象不必内联定义在模板里：

```html
<div :class="classObject"></div>
```

```js
data() {
  return {
    classObject: {
      active: true,
      'text-danger': false
    }
  }
}
```

- 使用一个返回对象的计算属性

```js
computed: {
  classObject() {
    return {
      active: this.isActive && !this.error,
      'text-danger': this.error && this.error.type === 'fatal'
    }
  }
}
```

### 数组语法

可以把一个数组传给 `:class`，以应用一个 class 列表：

```html
<div :class="[activeClass, errorClass]"></div>
```

#### 在组件上使用

- 组件内外的 class 会合并

```html
<div id="app">
  <my-component class="baz boo"></my-component>
  <!-- 相当于<p class="foo bar baz boo">Hi!</p> -->
</div>

<script>
  const app = Vue.createApp({})

  app.component('my-component', {
    template: `<p class="foo bar">Hi!</p>`,
  })
</script>
```

- 如果你的组件有多个根元素，你需要定义哪些部分将接收这个类。可以使用 `$attrs` 组件属性执行此操作：

```html
<div id="app">
  <my-component class="baz"></my-component>
</div>
```

```js
const app = Vue.createApp({})

app.component('my-component', {
  template: `
    <p :class="$attrs.class">Hi!</p>
    <span>This is a child component</span>
  `,
})
```

## 绑定内联样式

#### 对象语法

- 传给 `:style` 一个对象，以动态地切换 class：

```html
<div :style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
```

- 直接绑定到一个样式对象上

```html
<div :style="styleObject"></div>

<!--
data() {
	return {
    	styleObject: {
      		color: 'red',
      		fontSize: '13px'
    	}
  	}
}
-->
```

- 结合计算属性使用

#### 数组语法

将多个样式对象应用到同一元素

```html
<div :style="[baseStyles, overridingStyles]"></div>
```

#### 多重值

只会渲染数组中最后一个被浏览器支持的值

```html
<div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
```

## 事件处理

#### 事件监听

```html
<div id="basic-event">
  <button @click="counter += 1">Add 1</button>
  <p>The button above has been clicked {{ counter }} times.</p>
</div>
```

#### 事件处理方法

接收一个需要调用的方法名称

```html
<div id="event-with-method">
  	<button @click="greet">Greet</button>
</div>

<!--
methods: {
    greet(event) {
      // `methods` 内部的 `this` 指向当前活动实例
      alert('Hello ' + this.name + '!')
      // `event` 是原生 DOM event
      if (event) {
        alert(event.target.tagName)
      }
    }
}
```

#### 内联处理器中的方法

内联 JavaScript 语句调用方法

```html
<div id="inline-handler">
  	<button @click="say('hi')">Say hi</button>
  	<button @click="say('what')">Say what</button>
</div
```

#### 传入事件对象

用特殊变量 `$event` 传入方法

```html
<button @click="warn('Form cannot be submitted yet.', $event)">Submit</button>
```

#### 多事件处理器

事件处理程序中可以有多个方法，这些方法由逗号运算符分隔

#### 事件修饰符

Vue.js 为 `v-on` 提供了**事件修饰符**。之前提过，修饰符是由点开头的指令后缀来表示的。

- `.stop` —— 阻止单击事件继续传播，相当于 event.stopPropagation()
- `.prevent` —— 提交事件不再重载页面，相当于 event.preventDefault()
- `.capture` —— 添加事件监听器时使用事件捕获模式
- `.self` —— 只当在 event.target 是当前元素自身时触发处理函数
- `.once` —— 点击事件将只会触发一次
- `.passive`

不要把 `.passive` 和 `.prevent` 一起使用，因为 `.prevent` 将会被忽略，同时浏览器可能会向你展示一个警告。

#### 按键别名

- `.enter`
- `.tab`
- `.delete` (捕获“删除”和“退格”键)
- `.esc`
- `.space`
- `.up`
- `.down`
- `.left`
- `.right`

#### 系统修饰键

- `.ctrl`
- `.alt`
- `.shift`
- `.meta`

#### 鼠标按钮修饰符

- `.left`
- `.right`
- `.middle`

#### .exact 修饰符

`.exact` 修饰符允许你控制由精确的系统修饰符组合触发的事件。

```html
<!-- 即使 Alt 或 Shift 被一同按下时也会触发 -->
<button @click.ctrl="onClick">A</button>

<!-- 有且只有 Ctrl 被按下的时候才触发 -->
<button @click.ctrl.exact="onCtrlClick">A</button>

<!-- 没有任何系统修饰符被按下的时候才触发 -->
<button @click.exact="onClick">A</button>
```

#### 使用 `v-on` 或 `@` 有几个好处：

1. 扫一眼 HTML 模板便能轻松定位在 JavaScript 代码里对应的方法。
2. 因为你无须在 JavaScript 里手动绑定事件，你的 ViewModel 代码可以是非常纯粹的逻辑，和 DOM 完全解耦，更易于测试。
3. 当一个 ViewModel 被销毁时，所有的事件处理器都会自动被删除。你无须担心如何清理它们。

## 表单输入绑定

v-model 指令在表单 `<input>`、`<textarea>` 及 `<select>` 元素上创建双向数据绑定

#### 语法糖

#### 文本 (Text)

```html
<input v-model="message" placeholder="edit me" />
<p>Message is: {{ message }}</p>
```

#### 多行文本 (Textarea)

```html
<span>Multiline message is:</span>
<p style="white-space: pre-line;">{{ message }}</p>
<br />
<textarea v-model="message" placeholder="add multiple lines"></textarea>
```

#### 复选框 (Checkbox)

单个复选框，绑定为**一个布尔值**：

```html
<input type="checkbox" id="checkbox" v-model="checked" />
<label for="checkbox">{{ checked }}</label>
```

多个复选框，绑定到**同一个数组**：

```html
<div id="v-model-multiple-checkboxes">
  <input type="checkbox" id="jack" value="Jack" v-model="checkedNames" />
  <label for="jack">Jack</label>
  <input type="checkbox" id="john" value="John" v-model="checkedNames" />
  <label for="john">John</label>
  <input type="checkbox" id="mike" value="Mike" v-model="checkedNames" />
  <label for="mike">Mike</label>
  <br />
  <span>Checked names: {{ checkedNames }}</span>
</div>
```

#### 单选框 (Radio)

```html
<div id="v-model-radiobutton">
  <input type="radio" id="one" value="One" v-model="picked" />
  <label for="one">One</label>
  <br />
  <input type="radio" id="two" value="Two" v-model="picked" />
  <label for="two">Two</label>
  <br />
  <span>Picked: {{ picked }}</span>
</div>
```

#### 修饰符

.lazy —— 在 change 事件之后更新而非在 input 事件触发后更新

.number —— 自动将用户的输入值转为数值类型

.trim —— 自动过滤用户输入的**首尾**空白字符

# 组件

以对象形式列出 prop，这些 property 的名称和值分别是 prop 各自的名称和类型：

```js
props: {
  title: String,
  likes: Number,
  isPublished: Boolean,
  commentIds: Array,
  author: Object,
  callback: Function,
  contactsPromise: Promise // 或任何其他构造函数
}
```

可以为 `props` 中的值提供一个带有验证需求的对象

```js
app.component('my-component', {
  props: {
    // 基础的类型检查 (`null` 和 `undefined` 会通过任何类型验证)
    propA: Number,

    // 多个可能的类型
    propB: [String, Number],

    // 必填的字符串
    propC: {
      type: String,
      required: true,
    },

    // 带有默认值的数字
    propD: {
      type: Number,
      default: 100,
    },

    // 带有默认值的对象
    propE: {
      type: Object,
      // 对象或数组默认值必须从一个工厂函数获取
      default() {
        return { message: 'hello' }
      },
    },

    // 自定义验证函数
    propF: {
      validator(value) {
        // 这个值必须匹配下列字符串中的一个
        return ['success', 'warning', 'danger'].includes(value)
      },
    },

    // 具有默认值的函数
    propG: {
      type: Function,
      // 与对象或数组默认值不同，这不是一个工厂函数 —— 这是一个用作默认值的函数
      default() {
        return 'Default function'
      },
    },
  },
})
```
