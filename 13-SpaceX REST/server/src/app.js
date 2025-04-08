const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
// module imports

const historyRouter = require("./routes/history/history.router");
const { api } = require("./routes/api");

//middleware
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// version 1
app.use(express.json());
app.use("/v1", api);
// monitoring requests => morgan
app.use(morgan("combined"));
app.use(express.static(path.join(__dirname, "..", "public")));

/*
 if(historyRouter) => 
   then "/history" => will be express API
   OR react will handle it by "/*"
  app.use(historyRouter);
*/
// adding client side static script
app.use("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = app;
