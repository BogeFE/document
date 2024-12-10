import express from 'express'
import { createSSRApp } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { createApp } from './app.js'

const server = express()

server.get('/', (req, res) => {
  const app = createApp()

  renderToString(app).then((html) => {
    res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Vue SSR Example</title>

        <!-- 使用 importmap 引入 Vue 以支持在浏览器中使用 -->
        <script type="importmap">
        {
            "imports": {
                "vue": "https://unpkg.com/vue@3/dist/vue.esm-browser.js"
            }
        }
        </script>

        <!-- 引入客户端构建文件 -->
        <script type="module" src="/client.js"></script>
      </head>
      <body>
        <div id="app">${html}</div>
      </body>
    </html>
    `)
  })
})

server.listen(3000, () => {
  console.log('ready')
})

// 托管客户端文件
server.use(express.static('.'))
