const map = new Map()

// AMD 的迷你实现
window.rj = {}
const rj = window.rj

const defaultOptions = {
  paths: '',
}

rj.config = (options) => {
  Object.assign(defaultOptions, options)
}

window.define = (name, depencies, factory) => {
  // todo 参数的判断，互换

  // 使用 Map 收集依赖
  // 模块的加载时机是在 require 的时候
  map.set(name, {
    name,
    depencies,
    factory,
  })
}

require = (depencies, factory) => {
  return new Promise((resolve, reject) => {
    Promise.all(depencies.map((depencie) => {}))
  }).then((instances) => {
    factory(...instances)
  })
}

// const def = new Map()

// // AMD mini impl
// const defaultOptions = {
//   paths: '',
// }

// // From CDN
// const __import = (url) => {
//   return new Promise((resove, reject) => {
//     System.import(url).then(resove, reject)
//   })
// }

// // normal script
// const __load = (url) => {
//   return new Promise((resolve, reject) => {
//     const head = document.getElementsByTagName('head')[0]
//     const node = document.createElement('script')
//     node.type = 'text/javascript'
//     node.src = url
//     node.async = true
//     node.onload = resolve
//     node.onerror = reject
//     head.appendChild(node)
//   })
// }

// // 为啥没写 let const var
// // 千万不要在实际使用这种比较 low 的方式 🔥
// rj = {}

// rj.config = (options) => Object.assign(defaultOptions, options)

// // 定义模块，触发的时机其实是在 require 的时候，所以 -> 收集
// define = (name, deps, factory) => {
//   // todo 参数的判断，互换
//   def.set(name, { name, deps, factory })
// }

// // dep -> a -> a.js -> 'http:xxxx/xx/xx/a.js';
// const __getUrl = (dep) => {
//   const p = location.pathname
//   return p.slice(0, p.lastIndexOf('/')) + '/' + dep + '.js'
// }

// // 其实才是触发加载依赖的地方
// require = (deps, factory) => {
//   return new Promise((resolve, reject) => {
//     Promise.all(
//       deps.map((dep) => {
//         // 走 CDN
//         if (defaultOptions.paths[dep])
//           return __import(defaultOptions.paths[dep])

//         return __load(__getUrl(dep)).then(() => {
//           const { deps, factory } = def.get(dep)
//           if (deps.length === 0) return factory(null)
//           return require(deps, factory)
//         })
//       })
//     ).then(resolve, reject)
//   }).then((instances) => factory(...instances))
// }
