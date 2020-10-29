const express = require('express')
const cors = require('cors')
const axios = require('axios')
const io = require('socket.io-client')
var fs = require('fs')
const app = express()
app.use(cors())
const port = 4444

const socket = io('https://push.wingo.landsoft.com.co');




function guidGenerator() {
    var S4 = function() {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

app.get('/', (req, res) => {
  var appUID;

  console.log('listenPDF')
  appUID = guidGenerator()
  console.log(appUID);
  socket.emit('newRoom', appUID)
  socket.on('getfile', info => {
      console.log(info.fileType);
      res.json(info)
  })
  if(!res.headersSent) res.json({}, 0, 500);
  setTimeout(() => {
    var filename = 'base64.txt';
    fs.readFile(filename, 'utf8', function(err, data) {
      if (err) throw err;
      console.log('OK: ' + filename);

      console.log(data)
      console.log('getFile');
        socket.emit('sendfile',{
            typeFile: 1,
            appsocket:appUID,
            file:data,
            fileType:'application/pdf',
            fileName:'NombreArchivo'
        })
    })
  }, 100);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
