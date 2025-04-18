const http = require("http");

const app = require("./app");
const { loadPlanetsData } = require("./models/planets.model");
const { mongoConnect } = require("./services/mongo");
const PORT = process.env.PORT || 8000;

// server
const server = http.createServer(app);

async function startServer() {
  await mongoConnect();
  await loadPlanetsData();

  server.listen(PORT, () => {
    console.log(`✅ Server is listening to ${PORT} PORT`);
  });
}

startServer();
//
