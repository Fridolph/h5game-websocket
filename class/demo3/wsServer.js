var ws = require("nodejs-websocket")
const PORT = 3333;

var clientCount = 0

// Scream server example: "hi" -> "HI!!!"
var server = ws.createServer(function (conn) {
	console.log("New connection")
	clientCount++;
	conn.nickname = 'uesr' + clientCount;
	broadcast(conn.nickname + ' comes in')
	conn.on("text", function (str) {
		console.log("Received "+str)
		broadcast(str)
	})
	conn.on("close", function (code, reason) {
		console.log("Connection closed")
		broadcast(conn.nickname + ' left.')
	})
  conn.on("error", err => {
		console.log("Handle error", err);
		console.warning(err);
  })
}).listen(PORT)

console.log('WebSocket server is listening on port ' + PORT);

function broadcast(str) {
	server.connections.forEach(connection => {
		connection.sendText(str)
	})
}