// require("express-async-errors");
const express = require("express");
const app = express();
const helmet = require("helmet");
//
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./SwaggerDocs/swagger.json");
//
const booksRouter = require("./router/books.router");
const isAdmin = require("./middleware/isAdmin");
const giveResponse = require("./responseHandling/globalResponseFunction");
//
const PORT = 9000;

// Sequalise

///////// ----------------- MIDDLEWARES----------------- /////////

// helmet
app.use(helmet());
//
// Converting to json()
app.use(express.json());
//
//swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
//
// Checking response time
app.use(function (req, res, next) {
  enteredTime = Date.now();
  console.log(`${req.method} : ${req.url}`);
  //call the next funciton
  next();
  // executed after get/post
  exitingTime = Date.now();
  console.log(`request took: ${exitingTime - enteredTime} miliseconds `);
});

// get - post - put - patch  books
app.use((req, res, next) => isAdmin(req, res, next));
app.use("/books", booksRouter);

// Global error-handling middleware:
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Internal Server Error", error: err });
});
// undefined routes
app.use((req, res) => {
  giveResponse(404, res, { error: "Not valid URL" });
});

//  port: 8000
app.listen(PORT, () => {
  console.log(`App is listening to port: ${PORT}`);
});
