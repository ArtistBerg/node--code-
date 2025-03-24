const { parse } = require("csv-parse");
const fs = require("fs");

// parse();
const habitablePlanets = [];

function ishabitablePlanets(planet) {
  // koi_insol : for planet receving energy from their sun, our is 1.0
  // koi_prad : planet should not be 1.6 times than earth
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
}
// csv => readable data
fs.createReadStream("exoplanet_data_kepler.csv")
  .pipe(
    // piping that directly to parse
    parse({
      comment: "#",
      columns: true,
    })
  )
  .on("data", (data) => {
    if (ishabitablePlanets(data)) {
      habitablePlanets.push(data);
    }
    // aa nai karvanu : 9400 planet data print thase
    // console.log(data);
  })
  .on("error", (error) => {
    console.log(error);
  })
  .on("end", () => {
    console.log(habitablePlanets.map((planet) => planet.kepler_name));
    console.log("done, habitable plantes found: ", habitablePlanets.length);
  });
/*
  🛠 Full Flow of Data
1️⃣ File Stream Opens → Reads small chunks from exoplanet_data_kepler.csv.
2️⃣ CSV Parser Processes Each Chunk → Converts CSV text into structured objects.
3️⃣ Each Row is Emitted as a "data" Event.
4️⃣ Filter Function (ishabitablePlanets) Checks Each Row.
5️⃣ Habitable Planets Are Stored in an Array (habitablePlanets.push(data)).
*/
