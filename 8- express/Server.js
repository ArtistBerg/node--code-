const express = require("express");

const app = express();

const PORT = 3000;

// app.get("/", (req, res) => {
//   res.send("hello");
// });
// app.get("/messages", (req, res) => {
//   res.send("<ul><li>Hello Nature</li></ul>");
// });
// app.post("/messages", (req, res) => {
//   console.log(req.body);
//   console.log("Updating more ..");
//   res.send("Your Request has been sent");
// });

// app.listen(PORT, () => {
//   console.log(`listening to ${PORT}`);
// });

const akatsuki = [
  {
    id: 0,
    name: "Sasori",
  },
  {
    id: 1,
    name: "Itachi",
  },
  {
    id: 2,
    name: "Kisame",
  },
  {
    id: 3,
    name: "madara",
  },
  {
    id: 4,
    name: "Deidara",
  },
  {
    id: 5,
    name: "Konan",
  },
  {
    id: 6,
    name: "Yahiko",
  },
  {
    id: 7,
    name: "Kakuzu",
  },
  {
    id: 8,
    name: "Hidan",
  },
  {
    id: 9,
    name: "Zetsu",
  },
];
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
// provides parsed JSON data
// access in req.body
app.use(express.json());

app.post("/akatsuki", (req, res) => {
  if (!req.body.name) {
    res.status(400).json({
      error: "Can't Add Akatsuki without a Name",
    });
  } else {
    const newAkatsuki = {
      id: akatsuki.length,
      name: req.body.name,
    };
    akatsuki.push(newAkatsuki);

    res.json(newAkatsuki);
  }
});

///////////////////////////////////////////
app.get("/", (req, res) => {
  res.json("Enter /akatsuki in url");
});
///////////////////////////////////////////
app.get("/akatsuki", (req, res) => {
  res.json(akatsuki);
  // res.send();
});
///////////////////////////////////////////////////////
app.get("/akatsuki/:id", (req, res) => {
  const akatsukiId = Number(req.params.id);
  const akatsukiMember = akatsuki[akatsukiId];
  if (akatsukiMember) {
    res.send(akatsukiMember);
  } else {
    // res.sendStatus(404);
    res.status(400).json({
      error: "Akatsuki member are only 10",
    });
  }
});
app.listen(PORT, () => {
  console.log(`App is listening to port: ${PORT}`);
});
