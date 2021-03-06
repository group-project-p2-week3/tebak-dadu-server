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
let isWinning = false
let winners = []
const img_list = [
  '',
  'https://i.imgur.com/MFF46Ba.png',
  'https://i.imgur.com/5YvvV3i.png',
  'https://i.imgur.com/wMBE60f.png',
  'https://i.imgur.com/ozv1iAb.png',
  'https://i.imgur.com/lH3h1n9.png',
  'https://i.imgur.com/LcAfJnK.png'
]
let img = ''

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('userLogin', (username) => {
    usersJoined.push({
      username: username,
      score: 0
    })

    io.emit('userLogin', usersJoined)
  })
  
  socket.on('insertAnswers', (data) => {
    if (answers.length === 4) {
      answers = []
    }
    answers.push(data)
    io.emit('insertAnswers', answers)
  })

  socket.on('addScore', (data) => {
    const winner = data.map(el => el.username)
    usersJoined.forEach(el => {
      if (winner.includes(el.username)) {
        el.score += 10
      }
      if (el.score === 50) {
        winners.push(el.username)
        isWinning = true
      }
    })
    if (isWinning) {
      io.emit('getWinners', winners)
      answers = []
      io.emit('insetAnswers', answers)
      usersJoined = []
      isWinning = false
    }

    io.emit('updateScore', usersJoined)
  })

  socket.on('changeDice', number => {
    img = img_list[number]
    io.emit('changeDice', img)
  })

  
});

http.listen(PORT, () => {
  console.log('listening on http://localhost:3000');
});
