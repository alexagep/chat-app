const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
const routers = require('./src/modules/index.js');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);


app.use(cors())

app.use(routers)

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/chat.html');
});

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
