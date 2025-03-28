const { DataTypes } = require("sequelize");
const { Op } = require("sequelize");

const sequelize = require("../sqlDatabase/sequelize");
const { validateUserData } = require("../middleware/joiValidation");
const giveResponse = require("../responseHandling/globalResponseFunction");

// User Object
const Users = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },

    password: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
  },
  {
    tableName: "users",
    timestamps: false,
  }
);

//  autheticate User
async function addUser(req, res) {
  const { username, password } = req.body;

  const response = validateUserData({ username, password });

  if (response.error) {
    console.log(response.error.details);
    giveResponse(400, res, { error: response.error.details });
  } else {
    const newUser = { username, password };
    const checkUser = await Users.findAll({
      where: {
        username: username,
      },
    });
    if (checkUser.length > 0) {
      return giveResponse(409, res, {
        message: "User already exists!",
      });
    }
    const addedUser = await Users.create(newUser);
    return giveResponse(200, res, {
      message: "User added successfully",
      user: addedUser,
    });
  }
}

async function getUsers(req, res) {
  const users = await Users.findAll();
  res.json(users);
  //   const user = await User.getAll({
  //     where: {
  //       username: username,
  //     },
  //   });
}

module.exports = { Users, addUser, getUsers };
