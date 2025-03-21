const http = require("http");

const PORT = 8000;
// const users = async function () {
//   await fetch("https://jsonplaceholder.typicode.com/users")
//     .then((data) => data.json())
//     .then((data) => console.log(data));
//   if (!response.ok) {
//     throw new Error("User not found");
//   }
//   return data;
// };
const users = [];
const data = async function () {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!res.ok) {
    return "request bad";
  }
  return await res.json();
};
data().then((data) => users.push(...data));

const server = http.createServer((req, res) => {
  // req is readable stream

  if (req.url === `/users`) {
    // res.writeHead(200, {
    //   "Content-type": "application/json",
    // });
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    // users[9].id = 0;
    // console.log(users);
    res.end(JSON.stringify(users[0]));
  } else if (req.url === `/posts`) {
    res.write("<html>");
    res.write("<body>");
    res.write("<p>Posts not foun</p>");
    res.write("</body>");
    res.write("</html>");
    res.end();
  } else {
    res.statusCode = 404;
    res.end(`user with ${items}`);
  }

  // // res is writable stream
  // res.writeHead(200, {
  //   "Content-type": "application/json",
  // });
  // res.end(JSON.stringify(users)); // response is complete
});

// 127.0.0.1  => localhost
server.listen(PORT, () => {
  console.log("listening to port..", PORT);
});
