const express = require("express");
const historyRouter = express.Router();

const { getAllHistory } = require("../history/history.controller");

historyRouter.get("/history", getAllHistory);

module.exports = historyRouter;
