const {
  existsLaunchWithId,
  getAllLaunches,
  addNewLaunch,
  abortLaunchById,
  scheduleNewLaunch,
} = require("../../models/launches.model");
const getPagination = require("../../services/query");

async function httpGetAllLaunches(req, res) {
  const { skip, limit } = getPagination(req.query);
  const launches = await getAllLaunches(skip, limit);
  return res.status(200).json(launches);
}

async function httpAddNewLaunch(req, res) {
  console.log(`request body: `, req.body);
  const launch = req.body;
  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.launchDate ||
    !launch.target
  ) {
    return res.status(400).json({
      error: "Missing require Input in Launch",
    });
  }
  // string date to data object
  launch.launchDate = new Date(launch.launchDate);
  if (isNaN(launch.launchDate)) {
    return res.status(400).json({
      error: "Invalid Launch Date",
    });
  }
  await scheduleNewLaunch(launch);
  res.status(201).json(launch);
}

async function httpAbortLaunch(req, res) {
  const launchId = req.params.id;

  const existsLaunch = await existsLaunchWithId(launchId);
  if (!existsLaunch) {
    return res.status(404).json({
      error: "Launch Not Found",
    });
  }
  const abortedLaunch = await abortLaunchById(launchId);
  if (!abortedLaunch) {
    return res.status(400).json({
      error: "Launch not aborted",
    });
  }
  // if successfully aborted
  return res.status(200).json({
    message: "Launch aborted successfully",
    launch: abortedLaunch,
  });
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch,
};
