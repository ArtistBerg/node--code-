const mysql = require("mysql2");

const database = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "book_store",
});

module.exports = database;
