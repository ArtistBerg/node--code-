const { request, get } = require("https");

// Create a server
// const myServer = http.createServer((req, res) => {
//   req.writeHead(200, { "Content-Type": "text/plain" });
//   res.end("hellow!");
// });
// // const server = http.createServer((req, res) => {
// //     res.writeHead(200, { 'Content-Type': 'text/plain' }); // Set response header
// //     res.end('Hello, World!'); // Send response
// // });

// // Start server on port 3000
// myServer.listen(3000, () => {
//   console.log("Server running at http://localhost:3000/");
// });

/// from video

// request function
/*
const myreq = request("https://www.google.com", (result) => {
  // result/ res(responce) = whatever you like
  result.on("data", (chunk) => {
    console.log(`Received chunk: ${chunk.toString().slice(0, 100)}...`); // Print first 100 chars
  });
  result.on("end", () => {
    console.log("Request ended by amit jagada");
  });
});
// has to end connection
myreq.end();
*/
// get function - auto end connection
get("https://jsonplaceholder.typicode.com/users", (res) => {
  console.log(`Status Code: ${res.statusCode}`);

  res.on("data", (chunk) => {
    // chunk.map((user) => console.log(user));
    console.log(`Chunck:${chunk.toString()})}`); // Print first 100 chars
    console.log(chunk.chunk);
  });

  res.on("end", () => {
    console.log("No more data.");
  });
}).on("error", (err) => {
  console.error(`Error: ${err.message}`);
});
