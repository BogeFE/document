const http = require('http')

http
  .createServer((req, res) => {
    res.writeHead(200, {
      'Content-Type': 'text/plain',
    })

    res.end('HTTP END')
  })
  .listen(80, '127.0.0.1')

  console.log(`server running at 127.0.0.1:80`)


// curl -v 127.0.0.1:80