const io = require("socket.io-client");
const readline = require("readline");

const socket = io("http://localhost:3000");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

socket.on("connect", () => {
  console.log(`Connected to server as ${socket.id}`);

  rl.question("Enter your username: ", (username) => {
    socket.emit("register", username);

    rl.setPrompt("You: ");
    rl.prompt();

    rl.on("line", (input) => {
      socket.emit("message", input);
      rl.prompt();
    });
  });
});

socket.on("message", (msg) => {
  console.log(`\n${msg}`);
  rl.prompt();
});
