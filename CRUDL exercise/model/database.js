const mysql = require("mysql2");

const database = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "book_store",
});

database.connect((err) => {
  if (err) {
    console.error("❌ MySQL connection failed: ", err.message);
    return;
  }
  console.log("✅ Connected to MySQL database!");
});

module.exports = database;
