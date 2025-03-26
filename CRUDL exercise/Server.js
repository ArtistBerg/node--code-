const express = require("express");
const mysql = require("mysql2");
const app = express();
const Joi = require("joi");
const helmet = require("helmet");

// const database = require("./controller/database");
// const {
//   getBook,
//   getBooks,
//   addBook,
//   deleteBook,
//   editBook,
//   editBookData,
// } = require("./controller/books.controller");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./SwaggerDocs/swagger.json");

const booksRouter = require("./router/books.router");
const PORT = 8000;

// // validation
// function validataInputData(data) {
//   const JoiSchema = Joi.object({
//     name: Joi.string().min(5).max(100).required(),

//     author: Joi.string().min(4).max(50).required(),

//     publishyear: Joi.number().min(1).max(2025).required(),

//     status: Joi.string().valid("available").valid("not available").optional(),
//   }).options({ abortEarly: false });
// }

///////// ----------------- MIDDLEWARES----------------- /////////

// helmet
app.use(helmet());
//
// Converting to json()
app.use(express.json());
//
//swagger documents
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

// creating a mysql Connection
// const database = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "product_details",
// });

/////////// ----------------- Check connection----------------- /////////
// database.connect((err) => {
//   if (err) {
//     console.error("❌ MySQL connection failed: ", err.message);
//     return;
//   }
//   console.log("✅ Connected to MySQL database!");
// });

// get products

app.use("/books", booksRouter);

// app.get("/books", (req, res) => getBooks(req, res));
// app.get("/books/:id", (req, res) => getBook(req, res));

// app.post("/books", (req, res) => {
//   try {
//     addBook(req, res);
//   } catch (error) {
//     res.status(400).json(error.message);
//   }
// });
// app.put("/books/:id", (req, res) => editBook(req, res));
// app.patch("/books/:id", (req, res) => editBookData(req, res));
// app.delete("/books/:id", (req, res) => deleteBook(req, res));

// listening to port: 8000
app.listen(PORT, () => {
  console.log(`App is listening to port: ${PORT}`);
});

// add router
