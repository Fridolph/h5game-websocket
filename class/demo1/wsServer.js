var ws = require('nodejs-websocket')

var server = ws.createServer(conn => {
  console.log('New connection')
  conn.on('text', str => {
    console.log('Received ' + str)
    conn.sendText(str.toUpperCase() + '!!!')
  })
  conn.on('close', (code, reason) => {
    console.log('Connection closed')
  })
}).listen(8001)