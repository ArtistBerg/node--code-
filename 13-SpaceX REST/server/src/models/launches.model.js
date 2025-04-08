const launchesDB = require("./lauches.mongo");
const planets = require("./planets.mongo");
const axios = require("axios");

let DEFAULT_FLIGHT_NUMER = 100;

const SPACEX_API_URL = "https://api.spacexdata.com/v4/launches/query";

async function populateLaunches() {
  const response = await axios.post(SPACEX_API_URL, {
    query: {},
    options: {
      pagination: false,
      populate: [
        {
          path: "rocket",
          select: {
            name: 1,
          },
        },
        {
          path: "payloads",
          select: {
            customers: 1,
          },
        },
      ],
    },
  });

  if (response.status !== 200) {
    console.log(`Problem Downloading launch Data`);
    throw new Error("Launch data download failed");
  }
  const launchDocs = response.data.docs;

  for (const launchDoc of launchDocs) {
    const payloads = launchDoc["payloads"];
    const customers = payloads.flatMap((payload) => {
      return payload["customers"];
    });

    const launch = {
      flightNumber: launchDoc["flight_number"],
      mission: launchDoc["name"],
      rocket: launchDoc["rocket"]["name"],
      launchDate: launchDoc["date_local"],
      upcoming: launchDoc["upcoming"],
      success: launchDoc["success"],
      customers: customers,
    };

    console.log(`${launch.flightNumber}, mission: ${launch.mission}`);
    await saveLaunch(launch);
  }
}

async function loadLaunchData() {
  const launchFound = await findLaunch({
    flightNumber: 1,
    rocket: "Falcon 1",
    mission: "FalconSat",
  });
  if (launchFound) {
    console.log(`Launches are populated`);
    return;
  } else {
    console.log(`Launches are NOT populated`);
    await populateLaunches();
  }
}

async function findLaunch(filter) {
  return await launchesDB.findOne(filter);
}

async function existsLaunchWithId(launchId) {
  return await findLaunch({
    flightNumber: launchId,
  });
}

async function getLatestFlightNumber() {
  const latestLaunch = await launchesDB.findOne().sort("-flightNumber");

  if (!latestLaunch) {
    return DEFAULT_FLIGHT_NUMER;
  }
  return latestLaunch.flightNumber;
}

async function getAllLaunches(skip, limit) {
  return await launchesDB.find({}, { _id: 0, __v: 0 }).skip(skip).limit(limit);
}

async function saveLaunch(launch) {
  await launchesDB.updateOne(
    {
      flightNumber: launch.flightNumber,
    },
    launch,
    {
      upsert: true,
    }
  );
}

async function scheduleNewLaunch(launch) {
  const planet = await planets.findOne({
    keplerName: launch.target,
  });
  if (!planet) {
    throw new Error("No matching planets found");
  }

  const newFlightNumber = (await getLatestFlightNumber()) + 1;
  const newLaunch = Object.assign(launch, {
    success: true,
    upcoming: true,
    customers: ["ZTM", "GOOGLE", "AZ"],
    flightNumber: newFlightNumber,
  });

  await saveLaunch(newLaunch);
}
async function abortLaunchById(launchId) {
  const aborted = await launchesDB.updateOne(
    {
      flightNumber: launchId,
    },
    {
      upcoming: false,
      success: false,
    }
  );
  console.log(aborted);
  return aborted.matchedCount;
}
// async function abortLaunchById(launchId) {
//   const done = await launchesDB.deleteOne({
//     flightNumber: launchId,
//   });
//   if (done) {
//     console.log(`Deleted ${launchId} successfully`);
//   } else {
//     console.log(`Could not be Deleted: ${launchId}`);
//   }
// }

module.exports = {
  loadLaunchData,
  existsLaunchWithId,
  getAllLaunches,
  scheduleNewLaunch,
  abortLaunchById,
};
