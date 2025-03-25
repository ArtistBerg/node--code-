const database = require("./database");
const Joi = require("joi");

function validateInputData(book, edit = false) {
  if (!edit) {
    // schema for adding data
    const JoiSchema = Joi.object({
      name: Joi.string().min(5).max(100).required(),

      author: Joi.string().min(4).max(50).required(),

      publishyear: Joi.number().min(1).max(2026).required(),

      role: Joi.string().valid("admin").valid("subscriber").required(),

      status: Joi.string().valid("available").valid("not available").optional(),
    }).options({ abortEarly: false });
    return JoiSchema.validate(book);
  }

  // schema for updating data
  const JoiSchema2 = Joi.object({
    name: Joi.string().min(5).max(100).optional(),

    author: Joi.string().min(4).max(50).optional(),

    publishyear: Joi.number().min(1).max(2026).optional(),

    role: Joi.string().valid("admin").valid("subscriber").required(),

    status: Joi.string().valid("available").valid("not available").optional(),
  }).options({ abortEarly: false });

  return JoiSchema2.validate(book);
}

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
      res.status(400).json({
        error: "Can't get your book details",
      });
      //   console.log("code executed");
    } else if (!results.length) {
      res.send("Your Book is not availabe at this time");
    } else {
      console.log(results.length);
      res.json(results);
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
      res.status(400).json({
        error: "Can't get your book details",
      });
      //   console.log("code executed");
    } else {
      res.json(results);
    }
  });
}

///////////  P O S T
//
function addBook(req, res) {
  // let num = 10;
  console.log(req.body);
  const { name, author, publishyear, status } = req.body;

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
        } else {
          res.status(200).json(results);
        }
      }
    );
  }
}

/// editing product
// function editBook(req, res) {
//   const bookId = req.params["id"];

//   console.log(req.body);
//   // validate body

//   //

//   database.query(
//     `UPDATE boooks
//   SET name = ?, author = ?
//   WHERE id = ?`,
//     [name, quantity, bookId],
//     (error, results) => {
//       if (error) {
//         res.status(400).json(error);
//       } else {
//         res.status(200).json(results);
//       }
//     }
//   );
// }

// new editing query function
function editBook(req, res) {
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
};
