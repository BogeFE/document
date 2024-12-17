# 从输入 _url_ 到页面最终呈现都发生了什么？

- 卸载上一个页面

- 浏览器查找当前 _URL_ 是否存在缓存 —— 强缓存 & 协商缓存

- _DNS_ 解析 —— 网址 ➡ IP 地址

  - 为什么要 _DNS_ 解析 —— IP 地址是每一台计算机的唯一标识，但不方便记忆

    <img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/668392324cbe4c12b66d77ddbfcd25cc~tplv-k3u1fbpfcp-watermark.awebp" alt="img" style="zoom: 67%;" />

  - 搜索缓存：主机 ➡ 浏览器 _DNS_ 缓存 ➡ 本地 hosts 文件 ➡ 操作系统 _DNS_ 缓存

  - 递归查询：主机 ➡ 本地域名服务器

    <img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7f06daba321b4069a8979167300e6878~tplv-k3u1fbpfcp-watermark.awebp" alt="img" style="zoom: 67%;" />

  - 迭代查询： 本地域名服务器 ➡ 其他域名服务器 —— 防止根域名服务器压力过大

    - 本地域名服务器 ➡ **根**域名服务器 ➡ 某个**顶级**域名服务器的**地址**

    - 本地域名服务器 ➡ 某个顶级域名服务器 ➡ 某个**权威/权限**域名服务器的**地址**

    - 本地域名服务器 ➡ 某个权限域名服务器 ➡ 域名所对应的 IP 地址

      <img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/39a795c048c3495ca2dd7c2aaa49fd47~tplv-k3u1fbpfcp-watermark.awebp" alt="img" style="zoom: 67%;" />

- 发起 TCP 连接 —— 三次握手

  ![Three-way Handshake](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d83fc034edbd44698b5590be7e97ce00~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1172&h=778&s=270257&e=png&b=fcf9f8)

- 发送 HTTP 请求

- 服务器处理相应并返回 HTTP 报文

- 浏览器解析渲染页面

  ![img](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/2/22/1691409e234135e7~tplv-t2oaga2asx-watermark.awebp)

  - 解析 HTML 形成 DOM 树

  - 解析 CSS 形成 CSS 规则树，即 CSSOM 树 —— 浏览器在 CSS 规则树生成之前不会进行渲染

  - 合并 DOM 树和 CSSOM 树形成渲染树 ➡ render 树

  - 浏览器开始渲染并绘制页面

    - 回流 —— 元素的尺寸、结构或某些属性发生改变时，浏览器进行重新渲染

    - 重绘 —— 当元素样式的改变不会影响其位置文档流位置时，浏览器进行重新绘制

- 连接结束 —— TCP 四次挥手关闭连接

  ![Four-way Handshake](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b0c0e65156124d6dae4b50b5bbd0f334~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1151&h=829&s=337142&e=png&b=fcf9f9)
