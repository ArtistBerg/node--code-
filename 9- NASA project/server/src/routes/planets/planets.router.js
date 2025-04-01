const express = require("express");
const planetsRouter = express.Router();
const { getAllPlanets } = require("./planets.controller");

// route management
planetsRouter.get("/", getAllPlanets);

module.exports = planetsRouter;
