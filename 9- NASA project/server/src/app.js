const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
// module imports
const planetsRouter = require("./routes/planets/planets.router");
const launchesRouter = require("./routes/launches/launches.router");
const historyRouter = require("./routes/history/history.router");

//middleware
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// monitoring requests => morgan
app.use(morgan("combined"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

// router : planetsRouter, launchesRouter
app.use("/planets", planetsRouter);
app.use("/launches", launchesRouter);
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
