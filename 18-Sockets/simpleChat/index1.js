const http = require("http");
const express = require("express");
const path = require("path");
const { Server } = require("socket.io");

// APP __ & __  SERVER
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.resolve("/public")));
// Socket.io
io.on("connection", (socket) => {
  console.log("a new user has connected", socket.id);
  socket.on("client-message", (message) => {
    console.log("A new client message", message);
    // send it to all the client
    io.emit("server-message", message);
  });
});

// HTTP
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public/index.html"));
});
app.get("/books", (req, res) => {
  res.status(200).json({ message: "There are no books here you BOOK-worm" });
});

server.on("request", (req, res) => {
  console.log(`Received ${req.method} request for ${req.url}`);
});

server.listen(9100, () => {
  console.log(`Server started at port : 9100`);
});
