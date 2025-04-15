const http = require("http");
const express = require("express");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const userSockets = new Map();

app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
  userSockets.set(socket.id, socket);

  socket.on("disconnect", () => {
    userSockets.delete(socket.id);
    console.log("User disconnected:", socket.id);
  });

  socket.on("client-message", (message) => {
    console.log("Message:", message.text);
    io.emit("server-message", message);
  });

  socket.on("message-seen", ({ messageId, senderId }) => {
    const senderSocket = userSockets.get(senderId);
    if (senderSocket) {
      senderSocket.emit("update-tick", { messageId });
    }
  });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

server.listen(9000, () => {
  console.log("Server running on http://localhost:9000");
});
