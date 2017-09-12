// var ws = require("nodejs-websocket")
var app = require('http').createServer()
var io = require('socket.io')(app)

const PORT = 3000;

let clientCount = 0;

app.listen(PORT);

io.on('connection', socket => {
	clientCount++;
	socket.nickname = `user ${clientCount}`;
	// 调用io.emit是进行广播 —— 所有都能收听到 
	// 如果是socket.emit，则是对socket所在的客户端进行发送消息
	io.emit('enter', `${socket.nickname} comes in`);

	socket.on('message', str => {
		io.emit('message', `${socket.nickname} says: ${str}`)
	})

	socket.on('disconnect', () => {
		io.emit('leave', `${socket.nickname} left...`)
	})
})

console.log(`WebSocket server is listening on port ${PORT}`);