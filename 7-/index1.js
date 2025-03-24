const http = require("http");

const PORT = 8000;
const users = [];
// getting data
const data = async function () {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!res.ok) {
    return "request bad";
  }
  return await res.json();
};
// handling data
data().then((data) => users.push(...data));

const server = http.createServer((req, res) => {
  const items = req.url.split("/");
  if (req.method === "POST" && items[1] === `users`) {
    req.on("data", (data) => {
      const newUser = data.toString();
      console.log("Req: ", newUser);
      users.push(JSON.parse(newUser));
    });
    req.pipe(res);
  } else if (req.method === "GET" && items[1] === `users`) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    //
    if (items.length === 3) {
      const index = Number(items[2]);
      const sentUser = users.filter((user) => user.id === index);
      res.end(JSON.stringify(sentUser));
    } else {
      res.end(JSON.stringify(users));
    }
  } else if (req.url === `/posts`) {
    res.write("<html>");
    res.write("<body>");
    res.write("<p>Posts not foun</p>");
    res.write("</body>");
    res.write("</html>");
    res.end();
  } else {
    res.statusCode = 404;
    res.end();
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
