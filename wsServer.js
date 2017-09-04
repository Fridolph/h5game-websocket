var ws = require("nodejs-websocket")
const PORT = 3001
// Scream server example: "hi" -> "HI!!!"
var server = ws.createServer(function (conn) {
	console.log("New connection")
	conn.on("text", function (str) {
		console.log("Received "+str)
		conn.sendText(str.toUpperCase()+"!!!")
	})
	conn.on("close", function (code, reason) {
		console.log("Connection closed")
	})
  conn.on("error", err => {
    console.log("Handle error", err);    
  })
}).listen(PORT)

console.log('WebSocket server is listening on port ' + PORT);