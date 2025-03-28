const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("book_store", "root", "", {
  host: "localhost",
  dialect: "mysql", // or 'postgres', 'sqlite', etc.
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection was established successfully");
  })
  .catch((error) => {
    console.log("Unble to connect to the database: ", error);
  });

module.exports = sequelize;
