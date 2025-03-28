const database = require("../model/database");
const Joi = require("joi");
const validateInputData = require("../middleware/joiValidation");
const giveResponse = require("../responseHandling/globalResponseFunction");
///////////  G E T
//
function getBook(req, res) {
  const productId = req.params["id"];
  // console.log(productId);

  let query = "";
  if (req.body.role == "admin") {
    query = `SELECT * FROM books WHERE id=${productId}`;
  } else {
    query = `SELECT * FROM books WHERE  id=${productId} && status = 'available'`;
  }

  database.query(query, (error, results) => {
    if (error) {
      console.log(error);
      giveResponse(400, res, {
        error: "Can't get your book details",
      });

      //   console.log("code executed");
    } else if (!results.length) {
      giveResponse(400, res, {
        message: "Your Book is not availabe at this time",
      });
    } else {
      console.log(results.length);
      giveResponse(200, res, results);
    }
  });
}
///////////  G E T   A L L
//
function getBooks(req, res) {
  let query = "";
  if (req.body.role == "admin") {
    query = `SELECT * FROM books`;
  } else {
    query = "SELECT * FROM books WHERE status = 'available'";
  }
  database.query(query, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(400).json({
        error: "Can't get your book details",
      });
      //   console.log("code executed");
    } else {
      return res.json(results);
    }
  });
}

///////////  P O S T
//
function addBook(req, res) {
  // let num = 10;
  console.log(req.body);
  const { name, author, publishyear, status } = req.body;

  database.query(
    "SELECT * FROM books WHERE name = ?", // Changed to search by name
    [name],
    (error, results) => {
      if (error) {
        return res.status(500).json({ error: "database error" });
      }
      if (results.length > 0) {
        return res
          .status(409)
          .json({ error: `Book with ${name} name already exists!` }); // conflict : 409
      }

      const bookStatus = status || "available";

      // create book object
      const newBook = req.body;
      response = validateInputData(newBook);

      if (response.error) {
        console.log(response.error.details);
        res.json(response.error.details);
      } else {
        // no error then only
        database.query(
          `INSERT INTO books(name, author, publishyear,status) VALUES (?,?,?,?)`,
          [name, author, publishyear, bookStatus],
          (error, results) => {
            if (error) {
              res.status(400).json({
                error: "Can't Add Book",
              });
            } else if (results.affectedRows == 1) {
              res
                .status(200)
                .json({ message: `${name} was successfully added` });
            }
          }
        ); // second query ends // POST
      }
    }
  ); // first query ends // GET
}
//////// E D I T
//
function editBook(req, res) {
  const bookId = req.params["id"];
  const { name, author, publishyear, status } = req.body;
  const bookStatus = status || "available";

  const newBook = req.body;
  response = validateInputData(newBook);
  if (response.error) {
    console.log(response.error.details);
    res.json(response.error.details);
  } else {
    database.query(
      `UPDATE books SET name=?, author=?, publishyear=?, status=? WHERE id = ?`,
      [name, author, publishyear, bookStatus, bookId],
      (error, results) => {
        if (error) {
          res
            .status(400)
            .json(`Could not upadte this book with bookID:${bookId}`);
        }
        res.status(200).json({
          message: `${name} was succesfully edited`,
          results,
        });
      }
    );
  }
}
// new editing query function
function editBookData(req, res) {
  const bookId = req.params["id"];
  const { name, author, publishyear, status } = req.body;

  const newBook = req.body;
  response = validateInputData(newBook, true);

  if (response.error) {
    console.log(response.error.details);
    res.json(response.error.details);
  } else {
    let updateQuery = "UPDATE books SET ";
    const updateValues = [];
    const updateFields = [];

    if (name) {
      updateFields.push("name = ?");
      updateValues.push(name);
    }
    if (author) {
      updateFields.push("author = ?");
      updateValues.push(author);
    }
    if (publishyear) {
      updateFields.push("publishyear = ?");
      updateValues.push(publishyear);
    }
    if (status) {
      updateFields.push("status = ?");
      if (status == "availabe" || "not available") {
        updateValues.push(status);
      } else {
        res.status(400).json("invalid status");
      }
    }

    if (updateFields.length === 0) {
      return res.status(400).json({ error: "No fields to update provided" });
    }

    updateQuery += updateFields.join(", ") + " WHERE id = ?";
    updateValues.push(bookId);

    // name=?, author=?, publishyear=?, status=? WHERE id ?, [name,.., id], ()=>{}
    database.query(updateQuery, updateValues, (error, results) => {
      if (error) {
        console.error("Database error:", error);
        return res.status(500).json({ error: "Database error" });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Book not found" });
      }

      res.json({ message: "Book updated successfully" });
    });
  }
}

/// deleting product
function deleteBook(req, res) {
  const productId = Number(req.params["id"]);
  console.log(productId);

  //gemini code
  database.query(
    `DELETE FROM books WHERE id=?`,
    [productId],
    (error, results) => {
      if (error) {
        res.status(500).json({
          error: "Database error during deletion",
        });
        return;
      }

      if (results.affectedRows === 0) {
        res.status(404).json({
          error: "book was not found",
        });
        return;
      }

      res.status(200).json({
        message: "Book deleted successfully",
      });
    }
  );
}

module.exports = {
  getBook,
  getBooks,
  addBook,
  deleteBook,
  editBook,
  editBookData,
};
