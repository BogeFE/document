# TypeScript

## 基本用法

- 类型声明

- 类型推断 —— 类型声明是可选的，如果没有，TypeScript 会自己推断类型。

- tsc 编译器 —— 将 TypeScript 脚本编译成 JavaScript 脚本

## 特殊类型

- any 类型 —— any 类型的变量可以赋予任意类型的值。

  - 关闭类型检查 —— 打开编译选项 `noImplicitAny` 会对 any 类型进行报错

  - 污染其他变量 —— 可以赋值给其他任何类型的变量（因为没有类型检查），导致其他变量出错

- unknown 类型 —— 严格版 any 类型

  - 不能直接赋值给其他类型的变量 —— 解决了 any 类型变量的缺点

  - 不能直接调用 unknown 类型变量的方法和属性

- never 类型 —— 空类型，表示不可能有这样的值

  - 不可能赋给它任何值，否则都会报错

  - 可以赋值给任意其他类型 —— 空集是任何集合的子集

## 类型系统

- 基本类型 —— JavaScript 的 8 种类型

  - boolean

  - string

  - number

  - bigint

  - symbol

  - object —— 包含了所有对象、数组和函数

    - Object —— 除了 undefined 和 null 这两个值不能转为对象，其他任何值都可以赋值给 Object 类型

    - object —— 可以用字面量表示的对象，只包含对象、数组和函数，不包括原始类型的值

  - undefined —— 只包含一个值 undefined，表示未定义（即还未给出定义，以后可能会有定义）

  - null —— 只包含一个值 null，表示为空（即此处没有值）。

- 如果没有声明类型的变量，被赋值为 undefined 或 null，它们的类型会被推断为 any —— 打开编译选项 `strictNullChecks`

- 值类型 —— 单个值也是一种类型

- 联合类型 —— 任何一个类型只要属于 `A` 或 `B`，就属于联合类型 `A | B`

  - 联合类型可以与值类型相结合，表示一个变量的值有若干种可能

- 交叉类型 —— 任何一个类型必须同时属于 `A` 和 `B`，才属于交叉类型 `A & B`

  - 不可能的交叉类型会被认定为 never —— `number & string`

  - 主要用途是表示对象的合成

    ```ts
    let obj: { foo: string } & { bar: string }
    ```

  - 常用来为对象类型添加新属性

    ```ts
    type A = { foo: number }
    type B = A & { bar: number }
    ```

- type 命令 —— 定义一个类型的别名

  - 不允许重名

  - 块级作用域

  - 属于类型相关的代码，编译成 JavaScript 的时候，会被全部删除

-

# 听课笔记

- 面试场景 —— 根据场景实现一个 interface

## 基础知识

- 枚举 enum —— 默认值为 0、1、2，

  ```ts
  enum Color {
    Red,
    Green,
    Blue,
  }
  ```

- type & interface

- 操作符

  - typeof

  - keyof

  - in

    ```ts
    type Keys = 'option1' | 'option2'

    type Flags = { [K in Keys]: boolean }

    const flags: Flags = {
      option1: true,
      option2: false,
    }
    ```

  - extends

  - Partial<T> —— 将传入的 T 类型的属性全部变为可选项

  - Required<T> —— 将传入的 T 类型的属性全部变为必选项

  - Record<K, T> —— 将传入的 K 类型的属性全部变为 T 类型

    ```ts
    interface PageInfo {
      title: string
    }
    type Page = 'home' | 'about' | 'contact'

    const nav: Record<Page, PageInfo> = {
      home: { title: 'Home' },
      about: { title: 'About' },
      contact: { title: 'Contact' },
    }
    ```

  - Exclude<T, U>

    ```ts
    type B = Exclude<'a' | 'b' | 'c', 'a' | 'b'> // "c"
    ```

  - Extract<T, U> —— 从 T 中提取 U

## 面试题

- 使用 TypeScript 的好处

  - ts 是 js 的超集，给 js 添加了可选的静态类型和基于类的面向对象编程

  - 编译错误提示 —— ts 在开发时暴露，js 在运行时暴露

  - 强类型语言，可读性极强

  - ts 中有很多方便特性

- type 和 interface 的异同

  - interface 重点用于描述数据结构 —— type 重点描述类型

  - 都可以描述一个对象或函数

    ```ts
    interface SetUser {
      (name: string): void
    }

    type SetUser = (name: string) => void
    ```

  - 都允许使用 extends 进行两两组合

- 基于已有类型，扩展得到一个大部分属性相同，个别属性不同的新类型

- 泛型 —— 定义时不预先指定类型，使用时在

  ```ts
  interface User<T = any> {
    userId: T
  }

  type UserA = User<string>
  type UserB = User<number>
  ```

- 课程中有三个实战片段

- 编译流程