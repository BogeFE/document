// app.js (在服务器和客户端之间共享)
// 该文件及其依赖项在服务器和客户端之间共享 —— 称之为通用代码
import { createSSRApp } from 'vue'

export function createApp() {
  return createSSRApp({
    data: () => ({ count: 1 }),
    template: `<button @click="count++">{{ count }}</button>`
  })
}