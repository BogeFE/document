# **组件基础**
## **基本示例**
这里有一个 `Vue` 组件的示例：
```js
// 定义一个名为 button-counter 的新组件
Vue.component('button-counter', {
  data(){
    return {
      count: 0
    }
  },
  template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
})
```
组件是可复用的 `Vue` 实例，且带有一个名字：在这个例子中是 <button-counter>。我们可以在一个通过 `new Vue` 创建的 `Vue` 根实例中，把这个组件作为自定义元素来使用：
```html
<div id="components-demo">
  	<button-counter></button-counter>
</div>

<!--
app.mount('#components-demo')
-->
```
组件是可复用的组件实例，所以它们与根实例接收相同的选项，例如 `data`、`computed`、`watch`、`methods` 以及生命周期钩子等

<hr>

## 组件的复用
你可以将组件进行任意次数的复用：
```html
<div id="components-demo">
  <button-counter></button-counter>
  <button-counter></button-counter>
  <button-counter></button-counter>
</div>
```
**注意当点击按钮时，每个组件都会各自独立维护它的 `count`。因为你每用一次组件，就会有一个它的新实例被创建。**
- `data` 必须是一个函数

当我们定义这个` <button-counter> `组件时，你可能会发现它的 `data` 并不是像这样直接提供一个对象：
```js
data: {
  count: 0
}
```
取而代之的是，一个组件的 data 选项必须是一个函数，**因此每个实例可以维护一份被返回对象的独立的拷贝**
```js
data: function () {
  return {
    count: 0
  }
}
```
<hr>

## **组件的组织**
为了能在模板中使用，这些组件必须先注册以便 Vue 能够识别。**这里有两种组件的注册类型：全局注册和局部注册。**至此，我们的组件都只是通过 `Vue.componen`t 全局注册的：
```js
Vue.component('my-component-name', {
  // ... options ...
})
```
全局注册的组件可以用在其被注册之后的任何 (通过 `new Vue`) 新创建的 `Vue` 根实例，也包括其组件树中的所有子组件的模板中。
<hr>

## **通过 Prop 向子组件传递数据**
`Prop` 是你可以在组件上注册的一些**自定义 `attribute`**。当一个值传递给一个 `prop attribute` 的时候，它就变成了那个组件实例的一个 `property`

```js
Vue.component('blog-post', {
  props: ['title'],
  template: '<h3>{{ title }}</h3>'
})
```
一个组件默认可以拥有**任意数量的 `prop`**，任何值都可以传递给任何 `prop`



#### Prop 类型

可以为每个 prop 指定值的类型

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



#### 单向数据流

父级 prop 的更新会向下流动到子组件中，但是反过来则不行



#### 非 Prop 的 Attribute

传向一个组件，但是该组件并没有相应 props 或 emits 定义的 attribute

- Attribute 继承
  - 当组件返回**单个根节点**时，非 prop attribute 将**自动添加到根节点**的 attribute 中
  - 

```html
<!-- 具有非prop attribute的Date-picker组件-->
<date-picker data-status="activated"></date-picker>

<!-- 渲染所得的 date-picker 组件 -->
<div class="date-picker" data-status="activated">
  <input type="datetime-local" />
</div>

<!--
app.component('date-picker', {
  	template: `
    	<div class="date-picker">
      		<input type="datetime-local" />
    	</div>
  	`
})
-->
```



<hr>

## **单个根元素**
当构建一个 `<blog-post>` 组件时，你的模板最终会包含的东西远不止一个标题
```html
<h3>{{ title }}</h3>
<div v-html="content"></div>
```
**每个组件必须只有一个根元素**；可以将模板的内容包裹在一个父元素内，来修复这个问题
```html
<div class="blog-post">
   <h3>{{ title }}</h3>
   <div v-html="content"></div>
</div>
```
当组件变得越来越复杂的时候，我们不只需要标题和内容，还需要发布日期、评论等等。**为每个相关的信息定义一个 prop 会变得很麻烦**
```html
<blog-post
  v-for="post in posts"
  :key="post.id"
  :title="post.title"
  :content="post.content"
  :publishedAt="post.publishedAt"
  :comments="post.comments"
></blog-post>
```
所以是时候重构一下这个 `<blog-post>` 组件了，让它变成接受一个单独的 `post prop`
```html
<blog-post
  v-for="post in posts"
  :key="post.id"
  :post="post"
></blog-post>
```
```js
Vue.component('blog-post', {
  //赋予组件post prop
  props: ['post'],
  template: 
    `<div class="blog-post">
      <h3>{{ post.title }}</h3>
      <div v-html="post.content"></div>
    </div>'
})
```
**不论何时为 `post` 对象添加一个新的 `property`，它都会自动地在 `<blog-post>` 内可用**



## 在组件上使用 v-model

#### v-model 的语法糖

```html
<input v-model="searchText" />
```

等价于⬇

```html
<input :value="searchText" @input="searchText = $event.target.value"/>
```



## 组件注册

#### 组件名

- 全部小写
- 使用连字符

#### 全局注册

```js
const app = Vue.createApp({})

app.component('component-a', {
  /* ... */
})
app.component('component-b', {
  /* ... */
})
app.component('component-c', {
  /* ... */
})

app.mount('#app')
```

- 局部注册

  - 使用普通 JavaScript 对象定义组件

  ```js
  const ComponentA = {
    /* ... */
  }
  const ComponentB = {
    /* ... */
  }
  const ComponentC = {
    /* ... */
  }
  ```

  - 在 components 选项中引入

  ```js
  const app = Vue.createApp({
    components: {
      'component-a': ComponentA,
      'component-b': ComponentB
    }
  })
  ```

  

## 模块系统





# 插槽

#### 插槽内容

- 组件的 *template* 中如果没有 *\<slot>* 元素，则起始标签和结束标签之间的内容都会被忽略

  ```html
  <!--todo-button组件模板 -->
  <button class="btn-primary">
    Create a new item
  </button>
  
  <!-- 使用todo-button组件-->
  <todo-button>
    <!-- 以下文本不会渲染 -->
    Add todo
  </todo-button>
  ```

- 使用 *\<slot>* 元素可以在渲染时将 *\<slot>\</slot>* 替换为使用时填入的内容

  ```html
  <!--todo-button组件模板 -->
  <button class="btn-primary">
      <slot></slot>
  </button>
  
  <!-- 使用todo-button组件-->
  <todo-button>
    <!-- 文本将会渲染 -->
    Add todo
  </todo-button>
  ```

- 插槽可包含的内容 —— 字符换、任意模板代码、任意组件

  

  #### 渲染作用域

- 插槽无法访问使用组建的作用域

  ```html
  <!--todo-button组件模板 -->
  <button class="btn-primary">
      <slot></slot>
  </button>
  
  <!-- 在App.vue使用todo-button组件-->
  <todo-button action="delete">
      <!-- 插槽无法访问到在App.vue中定义的action-->
      Clicking here will {{ action }} an item
  </todo-button>
  ```

- ⭐父级模板里的所有内容都是在父级作用域中编译的

- ⭐子模板里的所有内容都是在子作用域中编译的

  

#### 备用内容

可在 *\<slot>\</slot>* 填入备用内容，备用内容将会在组件使用时未填入内容时被渲染

```html
<!--todo-button组件模板 -->
<button class="btn-primary">
    <slot>Submit</slot>
</button>

<!-- 使用todo-button组件-->
<todo-button></todo-button>
<!--会渲染为<todo-button>Submit</todo-button>-->
```



#### 具名插槽

- 定义具名插槽 —— 为 *\<slot>* 元素添加 *name* 属性

  ```html
  <div class="container">
      <header>
      	<slot name="header"></slot>
    	</header>
    	<main>
      	<slot></slot>
    	</main>
    	<footer>
      	<slot name="footer"></slot>
    	</footer>
  </div>
  ```

- 使用具名插槽 —— 使用*\<template>* 元素并添加 *v-slot* 指令

  ```html
  <base-layout>
    	<template v-slot:header>
          <h1>Here might be a page title</h1>
    	</template>
  
    	<template v-slot:default>
      	<p>A paragraph for the main content.</p>
      	<p>And another one.</p>
    	</template>
  
    	<template v-slot:footer>
      	<p>Here's some contact info</p>
    	</template>
  </base-layout>
  ```

- *v-slot* 可以使用动态插槽名

  ```html
  <base-layout>
    	<template v-slot:[dynamicSlotName]>
      	...
    	</template>
  </base-layout>
  ```

- 具名插槽的缩写 —— *#SlotName*

  ```html
  <base-layout>
    	<template #header>
      	<h1>Here might be a page title</h1>
    	</template>
  
    	<template #default>
      	<p>A paragraph for the main content.</p>
      	<p>And another one.</p>
    	</template>
  
    	<template #footer>
      	<p>Here's some contact info</p>
    	</template>
  </base-layout>
  ```

- 一个不带 *name* 的 *\<slot>* 会带有隐含的名字 *default*
- ⭐通常 *v-slot* 只能添加在 *\<template>* 上，除非是在**只包含默认插槽**时，可以将 *v-slot* 指令添加在标签上



#### 插槽作用域

- 目的 —— 实现自定义渲染方式

  ```html
  <!--定义 todo-items 组件-->
  <script>
  app.component('todo-list', {
    data() {
      return {
        items: ['Feed a cat', 'Buy milk']
      }
    },
    template: `
      <ul>
        <li v-for="(item, index) in items">
          {{ item }}
        </li>
      </ul>
    `
  })
  </script>
  
  <!--使用 todo-items 组件-->
  <todo-list>
    	<i class="fas fa-check"></i>
    	<span class="green">{{ item }}</span>
  </todo-list>
  ```

- 局限性 —— 父组件中无法直接访问到子组件作用域中的 *item*

- 方案 —— 为 *\<slot>* 添加要提供的 *attribute*，即插槽 *prop*

  ```html
  <ul>
    <li v-for="( item, index ) in items">
      <slot :item="item" :index="index" :another-attribute="anotherAttribute"></slot>
    </li>
  </ul>
  ```

- 使用 —— 在父级作用域中用 *=* 为 *\<template>*元素中的 *v-slot* 赋予插槽 *prop*，对于例子中的 *slotProps* 为惯用命名，实际上可以任意取名

  ```html
  <todo-list>
    	<template v-slot:default="slotProps">
      	<i class="fas fa-check"></i>
      	<span class="green">{{ slotProps.item }}</span>
    	</template>
  </todo-list>
  ```

- 对插槽 *Prop* 解构 —— 作用域插槽的**内部工作原理**是将你的插槽内容包括在一个传入单个参数的函数

  ```js
  function (slotProps) {
    // ... 插槽内容 ...
  }
  ```

  - 传入具体的某个插槽 *prop* —— *v-slot = "{ item }"*

    ```html
    <todo-list v-slot="{ item }">
      	<i class="fas fa-check"></i>
      	<span class="green">{{ item }}</span>
    </todo-list>
    ```

  -  对 *prop* 进行重命名 —— *v-slot = "{ item: todo }"*

    ```html
    <todo-list v-slot="{ item: todo }">
      	<i class="fas fa-check"></i>
      	<span class="green">{{ todo }}</span>
    </todo-list>
    ```

  - 为 *prop* 定义备用内容 —— *v-slot = "{ item = 'Placeholder' }"*

    ```html
    <todo-list v-slot="{ item = 'Placeholder' }">
      	<i class="fas fa-check"></i>
      	<span class="green">{{ item }}</span>
    </todo-list>
    ```

    
