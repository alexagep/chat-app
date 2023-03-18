const socket = io();

const messageForm = document.querySelector("#message-form");
const messageInput = document.querySelector("#message-input");
const messages = document.querySelector("#messages");

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  socket.emit("chat message", message);
  messageInput.value = "";
});

socket.on("chat message", (msg) => {
  const li = document.createElement("li");
  li.textContent = msg;
  messages.appendChild(li);
});
