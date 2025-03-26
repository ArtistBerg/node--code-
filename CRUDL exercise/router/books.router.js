const express = require("express");
const booksRouter = express.Router();

const booksController = require("../controller/books.controller");

booksRouter.get("/", booksController.getBooks);
booksRouter.post("/", booksController.addBook);
booksRouter.get("/:id", booksController.getBook);
booksRouter.delete("/:id", booksController.deleteBook);
booksRouter.put("/:id", booksController.editBook);
booksRouter.patch("/:id", booksController.editBookData);

module.exports = booksRouter;
