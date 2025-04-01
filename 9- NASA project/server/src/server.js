const http = require("http");
// express app
const app = require("./app");

const { loadPlanetsData } = require("./models/planets.model");

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServer() {
  await loadPlanetsData();

  server.listen(PORT, () => {
    console.log(`✅ Server is listening to ${PORT} PORT`);
  });
}

startServer();
//
