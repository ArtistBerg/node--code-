const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*", // allow all clients for testing
  },
});

const clients = {}; // store client info

io.on("connection", (socket) => {
  console.log(`Client connected with ID: ${socket.id}`);

  // Client registers a name
  socket.on("register", (username) => {
    clients[socket.id] = username;
    console.log(`Client ${socket.id} registered as ${username}`);
  });

  // Receive message from a client
  socket.on("message", (msg) => {
    const sender = clients[socket.id] || "Unknown";
    console.log(`Message from ${sender} (${socket.id}): ${msg}`);

    // Optionally, broadcast the message to other clients
    socket.broadcast.emit("message", `${sender}: ${msg}`);
  });

  // Handle client disconnect
  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
    delete clients[socket.id];
  });
});

httpServer.listen(3000, () => {
  console.log("Socket server is running on http://localhost:3000");
});
