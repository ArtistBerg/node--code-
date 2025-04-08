const express = require("express");
const planetsRouter = express.Router();
const { httpGetAllPlanets } = require("./planets.controller");

// route management
planetsRouter.get("/", httpGetAllPlanets);

module.exports = planetsRouter;
