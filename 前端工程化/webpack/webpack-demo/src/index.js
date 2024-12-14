// // import _ from 'lodash'
// // import './style.css'
// // import Icon from './background.png'

// import { get } from 'lodash'
// import printMe from './print.js'

// // function component() {
// //   const element = document.createElement('div')

// //   const button = document.createElement('button')
// //   button.innerHTML = 'Click me and check the console!'
// //   button.onclick = printMe

// //   // 执行这一行需要引入 lodash（目前通过 script 脚本引入）
// //   // ⬇️
// //   // lodash 现在通过 import 引入
// //   element.innerHTML = _.join(['Hello', 'webpack'], ' ')

// //   // element.classList.add('hello')
// //   element.appendChild(button)

// //   // const myIcon = new Image()
// //   // myIcon.src = Icon
// //   // element.appendChild(myIcon)

// //   return element
// // }
// // document.body.appendChild(component())

// function getComponent() {
//   return import('lodash')
//     .then(({ default: _ }) => {
//       const element = document.createElement('div')
//       element.innerHTML = _.join(['Hello', 'webpack'], ' ')
//       return element
//     })
//     .catch((error) => 'An error occurred while loading the component')
// }

// getComponent().then((component) => {
//   document.body.appendChild(component)
// })

import _ from 'lodash'
// import Print from './print'

function component() {
  const element = document.createElement('div')

  // lodash 现在使用 import 引入
  element.innerHTML = _.join(['Hello', 'webpack'], ' ')
  // element.onclick = Print.bind(null, 'Hello webpack!')

  return element
}

document.body.appendChild(component())
