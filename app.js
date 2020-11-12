const express = require('express')
const app = express()
const PORT = 3000
const cors = require('cors')
const http = require('http').createServer(app)
const io = require('socket.io')(http)

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

let answers = []

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('insertAnswers', (data) => {
    if (answers.length === 4) {
      answers = []
    }
    answers.push(data)
    io.emit('insetAnswers', answers)
  })
});

http.listen(PORT, () => {
console.log('listening on http://localhost:3000');
});
