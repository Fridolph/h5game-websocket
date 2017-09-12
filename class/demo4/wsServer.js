var ws = require("nodejs-websocket")
const PORT = 3333;

var clientCount = 0

// Scream server example: "hi" -> "HI!!!"
var server = ws.createServer(function (conn) {
	console.log("New connection")
	clientCount++;
	conn.nickname = 'uesr' + clientCount;
	
	var mes = {};
	mes.type = 'enter';
	mes.data = conn.nickname + ' comes in.';
	broadcast(JSON.stringify(mes))

	conn.on('text', function(str) {
		console.log('Received ' + str)
		var mes = {}
		mes.type = 'message'
		mes.data = `${conn.nickname} says: ${str}`;
		broadcast(JSON.stringify(mes))
	});
	
	conn.on('close', function(code, reason) {
		console.log('Connection closed')
		var mes = {}
		mes.type = 'leave'
		mes.data = conn.nickname + ' left.'
		broadcast(JSON.stringify(mes))
	})
	
  conn.on("error", err => {
		console.warn("Handle error", err);
  })
}).listen(PORT)

console.log('WebSocket server is listening on port ' + PORT);

function broadcast(str) {
	server.connections.forEach(connection => {
		connection.sendText(str)
	})
}