var app = require('http').createServer()
var io = require('socket.io')(app)

app.listen(3000);

io.on('connection', socket => {
  socket.emit('news', {hello: 'world'});
  socket.on('my other event', data => {
    console.log(data);
  })
})