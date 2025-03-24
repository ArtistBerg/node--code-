const express = require("express");
const akatsukiRouter = express.Router();

const akatsukiController = require("../controllers/akatsuki.controller");

akatsukiRouter.post("/", akatsukiController.addAkatsuki);
akatsukiRouter.get("/", akatsukiController.getAllAkatsuki);
akatsukiRouter.get("/:id", akatsukiController.getAkatsuki);

module.exports = akatsukiRouter;
