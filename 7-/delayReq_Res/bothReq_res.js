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

const server = http.createServer((req, res) => {
  let body = "";

  // req: receiving data
  req.on("data", (chunk) => {
    console.log("Received chunk:", chunk.toString());
    body += chunk;
  });

  // req: all data arrived
  req.on("end", () => {
    console.log("All data received. Final body:", body);
    // respose to all data arriving
    res.end("Data received successfully: ");
  });
});

server.listen(3000, () => console.log("Server running on port 3000"));

/**
Server running on port 3000
Received chunk: { "username": "MohanDas"
Received chunk: , "age": 52 }
Received chunk: 5 sec complete
All data received. Final body: { "username": "MohanDas", "age": 52 }5 sec complete
Server Response: Data received successfully:

 */
