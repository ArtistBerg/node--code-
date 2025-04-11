// server.js
const net = require("net");

const server = net.createServer((socket) => {
  console.log("Client connected!");

  socket.on("data", (data) => {
    console.log("Received:", data.toString());
    socket.write("Hello from server!");
  });

  socket.on("end", () => {
    console.log("Client disconnected");
  });
});

server.listen(5000, () => {
  console.log("Server listening on port 5000");
});
