# 组件

## 组件基础

- 定义组件 —— 单文件组件 SFC，即组件定义在一个单独的 .vue 文件

- 使用组件

  1. 导入组件

  2. [组件注册](#组件注册)

  3. [组件属性 props](#组件属性)

  4. [组件事件](#组件事件)

  5. [组件插槽](#插槽)

  6. 动态组件 —— 使用 `<component>` & `is` 属性

### 组件注册

- 全局注册 —— 在当前 Vue 应用中全局可用

  - 使用 Vue 实例方法 Vue.prototype.component()

  - component 方法可链式调用

  - 不足 —— 未使用的全局注册组件无法被 tree-shaking

- 局部注册 —— 仅在父组件中可使用

  - 使用 components 选项

  - 优点 —— ==使组件之间的依赖关系更加明确，并且对 tree-shaking 更加友好==

### 组件属性

- 定义 props 选项

  - 字符串数组

  - 对象 —— key 是 prop 的名称，而值则是该 prop 预期类型的构造函数

- props 名字格式

  - 定义 & 在组件模版中的使用 —— camelCase 形式

  - 父组件中向组件传入 —— kebab-case 形式

- 动态 props —— 使用 v-bind 指令绑定

  - 绑定单个 prop —— `:prop-name`

  - 直接绑定一个包含多个 props 的对象 —— `v-bind="propsObj"`

- 单向数据流 —— props 因父组件的更新而变化，自然地将新的状态向下流往子组件，而不会逆向传递

- prop 交验 —— 向 props 选项提供一个带有 props 校验选项的对象

  - reuqired

  - [type](https://cn.vuejs.org/guide/components/props.html#runtime-type-checks)

  - default

  - validator

- 逐级传递的问题 —— 仅使用 props 则必须将其沿着组件链逐级传递下去

  ![props](https://cn.vuejs.org/assets/prop-drilling.XJXa8UE-.png)

- 解决 prop 逐级透传 —— 依赖注入 provide & inject

  - 为后代组件提供数据 —— 配置 provide 选项

  - 注入上层组件的数据 —— 配置 inject 选项

  ![](https://cn.vuejs.org/assets/provide-inject.C0gAIfVn.png)

### 组件事件

- 自定义事件触发 —— $emit / this.$emit

  - 第一个参数 —— 自定义事件名字符串

  - 额外参数 —— 要传入父组件事件响应程序的参数

- 声明触发的事件

  - emits 选项

  - 事件校验 —— 接收一个函数，参数就是抛出事件时传入 this.$emit 的内容，返回一个布尔值来表明事件是否合法

### [组件双向绑定](https://cn.vuejs.org/guide/components/v-model.html)

### 透传 Attributes

- 继承 —— 当一个组件以单个元素为根作渲染时，透传的 attribute 会自动被添加到根元素上，包括 class、style、v-on 事件监听器

- 合并 —— 子组件根元素的 class & style 会和从父组件上继承的值合并

- 禁用 —— 组件选项设置 `inheritAttrs: false`

- 访问 —— $attrs / this.$attrs

- 指定元素继承 —— 显式绑定 v-bind="$attrs"

- 多根节点继承 —— 显式绑定 v-bind="$attrs"

### 插槽

- 插槽出口 `<slot>` 元素 —— 标示了父元素提供的插槽内容的渲染位置

  ![slot](https://cn.vuejs.org/assets/slots.CKcE8XYd.png)

- 作用域 —— ==父组件模板中的表达式只能访问父组件的作用域；子组件模板中的表达式只能访问子组件的作用域==

- 默认插槽 —— `<slot>` 标签之间的内容会作为默认插槽内容

- 具名/命名插槽

  - 定义 —— 子组件 `<slot>` 元素设置 name 属性

  - 使用 —— 父组件 `<template>` 元素使用 v-slot 指令 / 简写 `#`

  ![named-slot](https://cn.vuejs.org/assets/named-slots.CCIb9Mo_.png)

- 动态插槽 —— `<template v-slot:[slotName]></template>`

- 条件插槽 —— 结合 $slots 属性与 v-if

- 作用域插槽 —— 让子组件在渲染时将数据提供给插槽

  - 子组件 —— `<slot :prop-name></slot>`

  - 父组件 —— `v-slot="slotProps"` & `slotProps.prop-name`

  ![scoped-slot](https://cn.vuejs.org/assets/scoped-slots.B67tIPc5.svg)

  - 具名作用域插槽 —— `v-slot:name="slotProps"` / `#name="slotProps"`

### [异步组件](https://cn.vuejs.org/guide/components/async.html)

- 全局方法 [defineAsyncComponent​](https://cn.vuejs.org/api/general.html#defineasynccomponent)

- 异步组件搭配 [内置组件 Suspense](https://cn.vuejs.org/guide/built-ins/suspense.html) 使用

## 组件通信

<img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3245a3c0598b4b79b32f60649ded9cca~tplv-k3u1fbpfcp-watermark.awebp"/>

### props / \$emit

父组件通过 _props_ 向子组件传递数据，子组件通过 _$emit_ 和父组件通信

- 父组件向子组件传递数据 —— 单向数据流

  - 在父组件中的引入子组件

  - 注册子组件

  - 使用子组件时在标签上动态绑定值

  - 在子组件中使用 _props_ 接收父组件传递的值

- 子组件向父组件传值 —— 利用 _$emit_ 触发父组件事件并传参

### eventBus 事件总线

实现在任意两个组件之间通信，有两种方式初始化 _eventBus_ 对象

- 导出一个 Vue 实例，按需引入

  ```js
  // eventBus.js
  import Vue from 'vue'
  export const EventBus = new Vue()
  ```

  ```js
  import { EventBus } from '../ eventBus.js'
  //订阅事件 $on('事件名',事件监听函数)
  EventBus.$on('update', (val) => {})

  //发布事件，即主动触发事件 $emit('事件名',传入参数)
  EventBus.$emit('update', '更新信息')

  //移出事件监听 $off('事件名',事件监听函数)
  EventBus.$off('update', {})
  ```

- 在 main.js 初始化一个全局的事件总线

  ```js
  //main.js
  Vue.prototype.$eventBus = new Vue()

  // 需要订阅的地方
  this.$eventBus.$on('update', (val) => {})

  // 需要发布信息的地方
  this.$eventBus.$emit('update', '更新信息')

  //移除事件监听
  this.$eventBus.$off('update', {})
  ```

### 依赖注入 —— 非响应式

- _provide_ —— 用来发送数据或方法

- _inject_ —— 用来接收数据或方法

### ref / \$refs

- 子组件定义 —— `ref='refName'`

- 父组件访问 —— this.$refs.refName

### \$parent / \$children

- _$parent_ —— 访问上一级父组件的实例，是一个对象

- _$root_ —— 访问根组件的实例

- _$children_ —— 访问子组件的实例，是一个**无序数组**

### 跨代通信

- \$attrs —— 继承所有的父组件属性 **（除了 _prop_ 传递的属性、_class_ 和 _style_ ）**，一般用在子组件的子元素上

- 在子组件中定义 `v-bind="$attrs"` 可以把父级传过来的参数，去除 _props_、_class_ 和 _style_ 之后剩下的继续往下级传递，这样就实现了跨级的组件通信。

- \$listeners —— 该属性是一个对象，里面包含了作用在这个组件上的所有监听器，可以配合 `v-on="$listeners"` 将所有的事件监听器指向这个组件的某个特定的子元素

  - 传递不含 _.native_ 修饰的事件监听器
