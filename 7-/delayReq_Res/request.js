const http = require("http");

const options = {
  hostname: "localhost",
  port: 3000,
  method: "POST",
  headers: { "Content-Type": "application/json" },
};

const req = http.request(options, (res) => {
  res.on("data", (chunk) => console.log("Server Response:", chunk.toString()));
});

req.write('{ "username": "MohanDas"');
setTimeout(() => req.write(', "age": 52 }'), 3000); // Delay of 3 seconds
setTimeout(() => req.end("5 sec complete"), 5000); // Ends after 5 seconds
