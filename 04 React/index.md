# 12.19

## JSX

- 类似于 XML，唯一区别是 JSX 可以使用 `{}` 来使用 js 表达式，例如三元表达式

- 合法的 JSX 元素有哪些？

- React.isValidElement

- class / for 是 HTML 的关键词，所以使用 className / htmlFor

  ```jsx
  <label className="name" htmlFor="name">
    Name
  </label>
  ```

- 需要搭配编译库对 JSX 语法 进行编译

- JSX 本质是一种语法糖 —— 在编译时会被编译成 `React.createElement`

## create-react-app CLI

- 封装了 webpack 配置和 babel 配置

## 受控组件和非受控组件

- 创建组件的形式

  - 函数组件

    ```jsx
    function App(props) {
      return <div>{props.text || 'Hello'}</div>
    }
    ```

  - 类 class 组件

    ```jsx
    class App extends React.Component {
      render() {
        return <div>{this.props.text || 'Hello'}</div>
      }
    }
    ```

- 函数组件和类组件的区别
    
    1. 加载 props 的方式不同

    2. 函数组件内部无法维护状态，而 class 组件可以通过 `this.state` 维护状态

    3. class 组件内部可以定义更多实例方法

-  如何选择使用函数组件还是类组件 —— 如果是纯展示组件，不需要维护内部状态，优先使用函数组件

## 组件生命周期

- 在哪个生命周期发送请求？ —— componentDidMount

## 常见错误

- 异步过程使用全局单例 event 对象 —— 传入事件处理函数的参数 event 是经过 React 内部代理的对象，所有的事件都会共享这个 event 对象

  - 怎么解决 —— 在事件处理函数中将 event 实现赋值给一个变量

  - 为什么要对原生事件对象做代理 —— 为了跨端

- reredner 问题 —— 需要知道 shouldComponentUpdate 方法

- 

## 性能优化方式