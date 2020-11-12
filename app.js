const express = require("express")
const app = express()
const PORT = 3000
const cors = require("cors")
const http = require("http").createServer(app)
var io = require('socket.io')(http);

app.use(cors())

app.use(express.urlencoded({extended:true}))
app.use(express.json())

io.on('connection', (socket) => {
  console.log('a user connected');
});


http.listen(PORT, () => {
console.log('listening on *:3000');
});
