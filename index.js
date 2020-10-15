
const express = require('express')
const cors = require('cors')
const app = express()
const port = 4000
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });

app.get('/', function(req, res, next) {
  // Handle the get for this route
});

app.post('/', function(req, res, next) {
 // Handle the post for this route
});
app.use(cors())

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

