const express = require("express");
const app = express();
const helmet = require("helmet");
//
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./SwaggerDocs/swagger.json");
//
const giveResponse = require("./responseHandling/globalResponseFunction");
const isAdmin = require("./middleware/isAdmin");
const booksRouter = require("./router/books.router");
//
const PORT = 8000;

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

// "role":"admin" is added or not in body
app.use((req, res, next) => isAdmin(req, res, next));

app.use("/books", booksRouter);
// ---- //// A L L  I N  O N E  R O U T E R ////---- //
// app.get("/books", (req, res) => getBooks(req, res));
// app.get("/books/:id", (req, res) => getBook(req, res));
// app.post("/books", (req, res) => addBook(req, res)});
// app.put("/books/:id", (req, res) => editBook(req, res));
// app.patch("/books/:id", (req, res) => editBookData(req, res));
// app.delete("/books/:id", (req, res) => deleteBook(req, res));

//
// Handling non- existing routes
app.use((req, res) => {
  giveResponse(404, res, { error: "Not valid URL" });
});

// listening to port: 8000
app.listen(PORT, () => {
  console.log(`App is listening to port: ${PORT}`);
});

// add router
