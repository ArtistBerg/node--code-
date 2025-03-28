const express = require("express");
const booksRouter = express.Router();
const asyncHandler = require("../globalErrorHandling/globalTryCatch");
const {
  getBooks,
  getBook,
  deleteBook,
  addBook,
  editBook,
  editBookData,
} = require("../controller/books.controller");

// booksRouter.get("/", booksController.getBooks);
// booksRouter.post("/", booksController.addBook);
// booksRouter.get("/:id", booksController.getBook);
// booksRouter.delete("/:id", booksController.deleteBook);
// booksRouter.put("/:id", booksController.editBook);
// booksRouter.patch("/:id", booksController.editBookData);

// DESTRUCTURED
booksRouter.get("/", asyncHandler(getBooks));
booksRouter.post("/", asyncHandler(addBook));
booksRouter.get("/:id", asyncHandler(getBook));
booksRouter.delete("/:id", asyncHandler(deleteBook));
booksRouter.put("/:id", asyncHandler(editBook));
booksRouter.patch("/:id", asyncHandler(editBookData));

module.exports = booksRouter;
