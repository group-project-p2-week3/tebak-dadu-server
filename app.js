const express = require("express")
const app = express()
const PORT = 3000
const cors = require('cors')
const http = require("http").createServer(app)
const io = require('socket.io')(http);

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

let answers = []

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('insertAnswers', (answer) => {
    console.log(answer)
  })
});

http.listen(PORT, () => {
console.log('listening on http://localhost:3000');
});
