const dgram = require('dgram')

const message = Buffer.alloc(5, 'boge')

const client = dgram.createSocket('udp4')

client.send(message, 0, message.length, 12345, 'localhost', (err, bytes) => {
  console.log(`成功发送${bytes}字节`)
})

client.on('message', (buffer) => {
  console.log(buffer.toString())
})

