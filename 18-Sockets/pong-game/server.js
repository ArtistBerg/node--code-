const server = require("http").createServer();
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const PORT = 3000;

server.listen(PORT);

console.log(`Listening to port, ${PORT}`);

io.on("connection", (socket) => {
  console.log(`a user has connected!`);
});
