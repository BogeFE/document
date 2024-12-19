## 虚拟 DOM

#### 什么是虚拟 DOM？

虚拟 DOM 简单说就是 **用 JavaScript 对象来模拟 DOM 结构**

```html
<template>
    <div id="app" class="container">
        <h1>虚拟 DOM</h1>
    </div>
</template>
```

模板 ➡ 虚拟 DOM —— 将每一个标签转换为一个对象

- tag —— （必选）标签，可以是组件或者函数
- props ——（非必选）标签上的属性和方法
- children —— （非必选）
  - 文本内容 —— 字符串
  - 子节点 —— 数组形式

```js
{
	tag：'div',
	props: {
		id: 'app',
        class: 'container'
	},
    children: [
        {
            tag: 'h1',
            children: '虚拟 DOM'
        }
    ]
}
```



#### 原生DOM 与虚拟 DOM

- 原生 DOM 上具有非常多的属性和事件
- 虚拟 DOM 在 DOM 发生变化时通过 diff 算法将其与改变前的 DOM 对比，**只对变化的 DOM 进行操作，而不是更新整个视图**



#### 实现原理

Vue 中虚拟 DOM 的数据更新机制 —— 异步更新队列 *patch*





## 认识 Diff 算法

通过新旧虚拟 DOM 对比(即 patch 过程)，找出最小变化的地方转为进行 DOM 操作



#### 执行时机

- 页面首次渲染 —— 调用一次 patch 并创建新的 vnode，**不会进行更深层次的比较**
- 组件中数据发生变化
  - 触发 `setter` ，通过 Notify 通知 `Watcher`
  - 对应的 `Watcher` 会通知更新并执行更新函数，它会执行 `render` 函数获取新的虚拟 DOM
  - 执行 `patch` 对比上次渲染结果的老的虚拟 DOM，计算出最小的变化，然后再去根据这个最小的变化去更新真实的 DOM，也就是视图



#### Diff 算法优化

- 同层比较，不跨级比较

###### <img src="C:\Users\ThunderUp\AppData\Roaming\Typora\typora-user-images\image-20211018101556453.png" alt="image-20211018101556453" style="zoom:120%;" />

- 比较标签名

###### <img src="C:\Users\ThunderUp\AppData\Roaming\Typora\typora-user-images\image-20211018101640820.png" alt="image-20211018101640820" style="zoom:150%;" />

- 比较 key —— 如果标签名相同，key 也相同，就会认为是相同节点
  - key 的作用 —— 更高效地更新虚拟 DOM
  - 避免使用数组下标 index 作为 key —— 会导致变更节点之后的节点全部会被更新



#### Diff 算法源码

patch 函数接收四个参数

- oldVnode —— 旧虚拟 DOM 节点
- vnode —— 新虚拟 DOM 的节点
- hydrating —— 是否与真实 DOM 混合
- removeOnly



流程

- vnode 不存在，oldVnode 存在，就删掉 oldVnode

```js
//isUndef() —— 判断节点是否未被定义
//isDef() —— 判断节点是否存在
if(isUndef(vnode)){
    if(isDef(oldVnode)){
        //调用oldVnode的组件卸载钩子destroy
        invokeDestroyHook(oldVnode);
        return;
    }
}
```

- vnode 存在，oldVnode 不存在，就创建 vnode

```js
if(isUndef(oldVnode)){
    createElm(vnode);
}
```

- 两个都存在的话，通过 *sameVnode* 函数对比是不是同一节点
  - 如果组件根节点被替换，则遍历更新父节点，删除旧节点
  - 如果是同一节点，通过 *patchVnode* 对比后续文本变化或子节点变化
  - 如果不是同一节点，将 vnode 挂载到 oldVnode 的父元素下



#### sameVnode 函数

```js
function sameVnode(a,b){
    return (
        //判断key是否一样
    	a.key === b.key &&
        //判断是否为异步组件
        a.asyncFactory === b.asyncFactory && (
            // 标签是不是一样
        	a.tag === b.tag &&
            //是不是注释节点
            a.isComment && b.isComment &&
            // 内容数据是不是一样
            isDef(a.data) === isDef(b.data) &&
            //判断input的type是不是一样
            sameInputType(a,b)
        ) || (
            // 判断区分异步组件的占位符否存在
        	isTrue(a.isAsyncPlaceholder) && isTrue(b.isAsyncPlaceholder)
        )
    )
}
```



#### patchVnode 函数

主要是对比节点文本变化或子节点变化

- 如果 oldVnode 和 vnode 的**引用地址**是一样的，就表示节点没有变化，直接返回

```js
if(oldVnode === vnode){
    return;
}
```

- 如果 oldVnode 的 isAsyncPlaceholder 存在，**跳过异步组件的检查**，直接返回

- 如果 oldVnode 和 vnode 都是**静态节点**，并且

  - key 相同
  - vnode 是克隆节点或者是 v-once 指令控制的节点

  将 oldVnode.elm 和 oldVnode.child 都复制到 vnode 上

```js
if(
   isTrue(vnode.isStatic) &&
   isTrue(oldVnode.isStatic) &&
   vnode.key === oldVnode.key &&
   (isTrue(vnode.isClone) || isTrue(vnode.isOnce))
){
    vnode.componentInstance = oldVnode.componentInstance;
    return;
}
```

- 如果 vnode 是文本节点但是和 oldVnode 文本内容不同，就更新文本

