const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

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

// const server = http.createServer((req, res) => {
//   if (req.url === "/") {
//     res.writeHead(200, { "Content-Type": "text/html" });
//     const html = fs.readFileSync("./chat.html", "utf8");
//     res.end(html);
//   } else if (req.url === "/sse") {
//     res.writeHead(200, {
//       "Content-Type": "text/event-stream",
//       Connection: "keep-alive",
//     });
//     const onMessage = (msg) => res.write(`data: ${msg}\n\n`);
//     chatEmitter.on("message", onMessage);
//     res.on("close", function () {
//       chatEmitter.off("message", onMessage);
//     });
//   } else if (req.url === "/chat") {
//     const { message } = req.query;
//     chatEmitter.emit("message", message);
//     res.end();
//   } else {
//     res.writeHead(404, { "Content-Type": "text/plain" });
//     res.end("404 Not Found");
//   }
// });

// server.listen(3000, () => {
//   console.log("Server is running on port 3000");
// });
