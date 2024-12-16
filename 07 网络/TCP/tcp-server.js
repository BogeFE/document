const net = require('net')

const HOST = '127.0.0.1'

const PORT = 6969

// 创建一个 TCP 服务器实例，调用listen函数监听指定端口和ip地址
//
net
  .createServer((socket) => {
    const remoteName = `${socket.remoteAddress}:${socket.remotePort}`
    
    console.log(`${remoteName} 连接到本服务器`)

    // 监听数据
    socket.on('data', (data) => {
      console.log(data)

      socket.write(`send ${data}`)
    })

    // 监听关闭时间
    socket.on('close', (data) => {
      console.log(`${remoteName} 连接关闭`)
    })
  })
  .listen(PORT, HOST)

console.log(`Server Listening on ${HOST}:${PORT}`)