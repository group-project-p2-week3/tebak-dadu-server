const cors = require('cors')
const express = require('express')
const app = express()
const PORT = 3000
const http = require('http').createServer(app)
const io = require('socket.io')(http);

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))

let usersJoined = [];

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('userLogin', (username) => {
    usersJoined.push(username)
    console.log(usersJoined);

    io.emit('userLogin', usersJoined)
  })

});

http.listen(PORT, () => {
  console.log('listening on *:3000');
});
