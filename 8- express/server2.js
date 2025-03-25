const express = require("express");
const path = require("path");
// import both function to outsource the logic

// importing Router
const akatsukiRouter = require("./router/akatsuki.router");
const messageRouter = require("./router/messages.router");
// getting
const app = express();

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

const PORT = 3000;

let enteredTime = 0;
let exitingTime = 0;

// middleware contains (req, res, next)
//    => have to call next function for it to execute further
app.use(function (req, res, next) {
  enteredTime = Date.now();
  console.log(`${req.method} : ${req.url}`);
  //call the next funciton
  next();
  // executed after get/post
  exitingTime = Date.now();
  console.log(`request took: ${exitingTime - enteredTime} miliseconds `);
});

app.use("/site", express.static(path.join(__dirname, "public")));
// provides parsed JSON data
// access in req.body
app.use(express.json());

///////////////////////////////////////////
// just my added thought
// app.get("/", (req, res) => {
//   res.json("Enter /akatsuki in url");
// });

app.get("/", (req, res) => {
  res.render("index", {
    title: "Best win",
    caption: "Hollow Night SS",
  });
});

app.use("/akatsukis", akatsukiRouter);

/// messages

app.use("/messages", messageRouter);

app.listen(PORT, () => {
  console.log(`App is listening to port: ${PORT}`);
});
