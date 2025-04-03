const express = require("express");
const {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch,
} = require("./launches.controller");
const launchesRouter = express.Router();
const { existsLaunchWithId } = require("../../models/launches.model");
launchesRouter.get("/", httpGetAllLaunches);
launchesRouter.post("/", httpAddNewLaunch);
launchesRouter.delete("/:id", httpAbortLaunch);

module.exports = launchesRouter;
