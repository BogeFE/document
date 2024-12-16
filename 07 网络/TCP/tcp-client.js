const net = require('net')

const HOST = '127.0.0.1'

const PORT = 6969

const client = new net.Socket()

const SERVER_NAME = `${HOST}:${PORT}`

client.connect(PORT, HOST, () => {
  console.log(`成功连接到 ${SERVER_NAME}`)
})

client.on('data', (data) => {
  console.log(`${SERVER_NAME} send ${data}`)
}) 

client.on('close', (data) => {
  console.log(`${SERVER_NAME} 连接关闭`)
})
