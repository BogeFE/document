# 前端安全

![security](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cb8128580eea45ff955ee50bfb30d2f4~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

## 01 - XSS 跨站脚本攻击

![XSS](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5b1931f019874b8cb01a7e89976d0479~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=618&h=228&s=86232&e=png&b=fdfdfd)

- 基本概念 —— 攻击者通过在目标网站上注入恶意脚本，使之在用户的浏览器上运行，

- 分类

  - 反射型 XSS —— 在 URL 中混入脚本，服务器接收到 URL 并将恶意代码作为参数取出，拼接回 HTML。浏览器在解析 HTML 后执行恶意代码。

  - 存储型 XSS —— 攻击者将恶意代码提交到目标网站的数据库中，当用户访问该页面时，服务器将恶意代码从数据库取出，拼接回 HTML。浏览器在解析 HTML 后执行恶意代码。

  - DOM 型 XSS —— 在 URL 中写入攻击脚本，诱导用户点击 URL。如果 URL 被解析，攻击脚本将被执行。

- 预防 / 防御

  - 输入检查 —— 对用户的输入进行检查，过滤掉特殊字符。

  - 预防 DOM 型 XSS —— 避免使用 innerHTML、outerHTML 等属性 / v-html、dangerouslySetInnerHTML 等功能。

  - 使用 [内容安全策略 (CSP)](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CSP) —— 用于检测并削弱某些特定类型的攻击，包括跨站脚本(XSS)和数据注入等攻击。

    ```
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' https://trustedscripts.com">
    ```

    ```
    Content-Security-Policy: default-src 'self'
    ```

  - 设置 Cookie 的 HttpOnly 属性 —— 防止客户端 JavaScript 读取 Cookie。

  - 验证码 —— 防止脚本冒充用户提交危险操作

## 02 - CSRF 跨站请求伪造

- 基本概念 —— 攻击者诱导受害者进入第三方网站，在第三方网站中，向被攻击网站发送跨站请求。

- 分类

  - GET 型 —— 利用图片的 src 属性

  - POST 型 —— 利用表单

  - 链接型 —— 利用 a 标签嵌入恶意链接

- 特点

  - 冒充

  - 攻击发起于第三方网站，而不是被攻击的网站

- 预防

  - 同源检测 —— Origin Header & Referer Header

  - 使用 Token

    ```
    X-CSRF-Token:
    ```

  - Cookie SameSite

    ```
    SameSite=Strict
    ```

## SQL 注入

## Click jacking 点击劫持

- 基本介绍 —— 通过 iframe 嵌套一个透明的页面，覆盖在目标页面上，从而达到欺骗用户的目的。

- 预防

  - X-Frame-Options —— 控制页面是否可被嵌入 iframe 中

    ```
    X-Frame-Options: DENY
    ```

  - 判断当前网页是否嵌套在 iframe 中

  - CSP 帧嵌套限制

    ```
    Content-Security-Policy: frame-ancestors 'none'
    ```

## CDN 劫持

- 基本介绍 —— 利用第三方的 CDN 服务，将目标网站的资源缓存到第三方的服务器上，从而达到欺骗用户的目的。

- 防范措施 —— Subresource Integrity 子资源完整性

## CORS 跨域资源共享

- CORS 允许服务器控制跨域资源访问

- 风险配置

  ```
  Access-Control-Allow-Origin: *
  ```

- 只允许特定源访问

  ```
  Access-Control-Allow-Origin: https://trusted.com
  ```

- 限制跨域请求方法

  ```
  Access-Control-Allow-Methods: GET, POST
  ```

- 仅允许特定头部

  ```
  Access-Control-Allow-Headers: Content-Type, Authorization
  ```
