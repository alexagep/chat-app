const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const http = require('http');
const routers = require('./modules/index.js');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const errorHandler = require('./common/middlewares/errorHandler');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(cors())

app.use(routers)

app.use(errorHandler)

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
