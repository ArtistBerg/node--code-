const express = require("express");
const planetsRouter = express.Router();
const { getAllPlanets } = require("./planets.controller");

// route management
planetsRouter.get("/planets", getAllPlanets);

module.exports = planetsRouter;
