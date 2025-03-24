const http = require("http");

const server = http.createServer((req, res) => {
  let body = "";

  req.on("data", (chunk) => {
    console.log("Received chunk:", chunk.toString());
    body += chunk;
  });

  req.on("end", () => {
    console.log("All data received. Final body:", body);
    res.end("Data received successfully: ");
  });
});

server.listen(3000, () => console.log("Server running on port 3000"));
