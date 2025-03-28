const express = require("express");
const mysql = require("mysql2");
const app = express();
const Joi = require("joi");
const helmet = require("helmet");
const { Sequelize } = require("sequelize");
//
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./SwaggerDocs/swagger.json");
//
const booksRouter = require("./router/books.router");
const PORT = 8000;

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

app.use("/books", booksRouter);

app.listen(PORT, () => {
  console.log(`App is listening to port: ${PORT}`);
});
