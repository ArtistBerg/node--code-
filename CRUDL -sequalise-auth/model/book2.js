const { DataTypes } = require("sequelize");
const { Op } = require("sequelize");

const sequelize = require("../sqlDatabase/sequelize");
const { validateInputData } = require("../middleware/joiValidation");
const giveResponse = require("../responseHandling/globalResponseFunction");

const Book = sequelize.define(
  "book",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    author: DataTypes.STRING,
    publishyear: DataTypes.INTEGER,
    status: DataTypes.STRING,
  },
  {
    tableName: "books",
  }
);

function checkAdmin(req) {
  let bookStatus = [];
  if (!req.body.role) {
    bookStatus = ["available"];
  } else if (req.body.role == "admin") {
    bookStatus = ["available", "not available"];
  }
  return bookStatus;
}

////// GET _ BOOKS - ALL
async function getBooks(req, res, next) {
  const bookStatus = checkAdmin(req);
  console.log(`booksstatus`, bookStatus);
  const books = await Book.findAll({
    where: {
      status: {
        [Op.or]: bookStatus,
      },
    },
  });
  // return res.status(200).json(books);
  giveResponse(200, res, books);
}
//
////// GET _ BOOK - From ID

async function getBook(req, res, next) {
  const bookId = req.params.id;
  try {
    console.log(bookId);
    const oneBook = await Book.findAll({
      where: {
        id: bookId,
      },
    });
    if (oneBook.length) {
      //   return res.status(200).json(oneBook);
      giveResponse(200, res, oneBook);
    }
    giveResponse(400, res, {
      message: "Could not find your book in database",
    });
  } catch (err) {
    giveResponse(500, res, {
      message: `There was error fetching book with ${bookId}`,
      Error: err,
    });
  }
}
//

////// DELETE _ BOOK - From ID

async function deleteBook(req, res, next) {
  const bookId = req.params.id;
  try {
    const book = await Book.findAll({
      where: {
        id: bookId,
      },
    });
    const deletedRows = await Book.destroy({
      where: {
        id: bookId,
      },
    });
    if (deletedRows > 0) {
      giveResponse(200, res, {
        message: "Book was deleted Successfully",
        Book: book,
      });
    } else {
      giveResponse(404, res, { message: "Book was not found" });
    }
  } catch (err) {
    console.log("Error deleting book: ", err);
    giveResponse(500, res, { message: "error in server", Error: err });
  }
}

// A D D : BOOK
async function addBook(req, res, next) {
  const { name } = req.body;

  const newBook = req.body;
  let response = validateInputData(newBook);

  if (response.error) {
    console.log(response.error.details);
    giveResponse(400, res, response.error.details);
  } else {
    try {
      // checking if book exists
      const askedBook = await Book.findAll({
        where: {
          name: req.body.name,
        },
      });
      // console.log("askedBook: ", askedBook);
      if (askedBook.length > 0) {
        giveResponse(409, res, {
          message: `Book with ${name} name already exists`,
        });
      } else {
        // adding new book
        const book = await Book.create(newBook);
        giveResponse(200, res, {
          message: "Book Added successfully",
          book: book,
        });
      }
    } catch (error) {
      giveResponse(500, res, { message: "Database Error", error });
    }
  }
}

async function editBook(req, res, next) {
  try {
    const bookId = req.params.id;
    // validate - Input
    const response = validateInputData(req.body);

    if (response.error) {
      console.log(response.error.details);
      giveResponse(400, res, response.error.details);
    } else {
      // creating newbook
      const { name, author, publishyear, status } = req.body;
      const newBook = {
        name,
        author,
        publishyear,
        status,
      };
      const findbook = await Book.findAll({
        where: {
          id: bookId,
        },
      });
      if (findbook.length > 0) {
        const response = await Book.update(newBook, {
          where: {
            id: bookId,
          },
        });
        giveResponse(200, res, {
          message: "Book updated successFully",
        });
      } else {
        giveResponse(400, res, { message: "Book Is not in the database" });
      }
    }
  } catch (error) {
    giveResponse(400, res, { error: error });
  }
}

async function editBookData(req, res, next) {
  try {
    const bookId = req.params.id;
    // validate - Input
    const response = validateInputData(req.body, true);

    if (response.error) {
      console.log(response.error.details);
      giveResponse(400, res, response.error.details);
    } else {
      // creating newbook
      const { role, ...updatedBook } = req.body;

      // findByPk => Primary Key
      const bookExists = await Book.findByPk(bookId);

      if (!bookExists) {
        giveResponse(404, res, { error: "Book not found" });
      }

      const [updatedRows] = await Book.update(updatedBook, {
        where: {
          id: bookId,
        },
      });
      if (updatedRows > 0) {
        const updatedBook = await Book.findByPk(bookId);
        giveResponse(200, res, {
          message: "Book updated successFully",
        });
      } else {
        giveResponse(500, res, { error: "Failed to update book" });
      }
    }
  } catch (error) {
    giveResponse(400, res, { error: error });
  }
}

module.exports = {
  getBooks,
  getBook,
  deleteBook,
  addBook,
  editBook,
  editBookData,
};
