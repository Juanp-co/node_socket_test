
const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
const port = 4000

var http = require('http').createServer(app);
var io = require('socket.io')(http);

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('newRoom', (room) => {
      socket.join(room);
    })

    socket.on('sendfile', (data) => {
        console.log('sendfile', data.appsocket)
        io.in(data.appsocket).emit('getfile', data)
    })

})

http.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

