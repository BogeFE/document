# 生命周期

![vue-lifecycle](https://cn.vuejs.org/assets/lifecycle_zh-CN.W0MNXI0C.png)

## 基本过程

开始创建 ➡ 初始化数据 ➡ 模板编译 ➡ 挂载 _DOM_ ➡ 渲染 ➡ 更新、渲染 ➡ 卸载

### _beforeCreate_ —— 创建前

无法访问到 _data、computed、watch、methods_ 上的方法和数据

### _created_ —— 创建后

_data、computed、watch、methods_ 已配置完成，此时渲染的节点未挂载到 _DOM_ 上，无法访问到 _$el_ 属性

### _beforeMount_ —— 挂载前

编译模板，将 _data_ 里的数据和模板生成 _HTML_，此时未挂载 _HTML_ 到页面上

### _mounted_ —— 挂载后

完成模板中的 _html_ 渲染到 _html_ 页面中

### _beforeUpdate_ —— 更新前

此时 _data_ 中数据的状态值已经更新为最新的，但是页面上显示的数据还是最原始的，还没有重新开始渲染 _DOM_ 树

### _updated_ —— 更新后

调用时，组件 _DOM_ 已经更新，所以可以执行依赖于 _DOM_ 的操作

### _beforeDestroy_ —— 销毁前

实例销毁之前调用，实例仍然完全可用

### _destroyed_ —— 销毁后

_Vue_ 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁

## _created_ 和 _mounted_ 的区别

- _created_ —— **在模板渲染成 _html_ 前调用**，即通常初始化某些属性值，然后再渲染成视图

- _mounted_ —— **在模板渲染成 _html_ 后调用**，通常是初始化页面完成后，再对 _html_ 的 _dom_ 节点进行一些需要的操作

## [KeepAlive](https://cn.vuejs.org/guide/built-ins/keep-alive.html)

### 介绍

- 内置组件 `<KeepAlive>` —— 在多个组件间动态切换时缓存被移除的组件实例

- 定制缓存行为

  - include 属性

  - exclude 属性

- 最大缓存实例数 —— max 属性，采用 LRU 缓存思想

### 生命周期

- _deactivated_ —— 当组件被换掉时，会被缓存到内存中、触发 _deactivated_ 生命周期

- _activated_ —— 当组件被切回来时，再去缓存里找这个组件，触发 _activated_ 钩子函数

- _beforeDestroy_ 和 _destroyed_ 不会再被触发了，因为组件不会被真正销毁
