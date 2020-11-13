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
let answers = []
let diceNumber = 0

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('userLogin', (dataUser) => {
    usersJoined.push(dataUser)
    console.log(usersJoined);
    io.emit('userLogin', usersJoined)
  })
  
  socket.on('insertAnswers', (data) => {
    if (answers.length === 4) {
      answers = []
    }
    answers.push(data)
    io.emit('insetAnswers', answers)
  })

  socket.on('getDiceNumber', (number) => {
    diceNumber = number
    console.log(diceNumber);
    io.emit('getDice', diceNumber)
  })
  
});

http.listen(PORT, () => {
  console.log('listening on http://localhost:3000');
});
