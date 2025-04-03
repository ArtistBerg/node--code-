const http = require("http");
const mongoose = require("mongoose");

const app = require("./app");

const { loadPlanetsData } = require("./models/planets.model");

const PORT = process.env.PORT || 8000;

const MONGO_URL =
  "mongodb+srv://nasa-api:OgBqeNrPNWFVg2ab@book-store-mern.1pit7.mongodb.net/nasa?retryWrites=true&w=majority&appName=book-store-MERN";

const server = http.createServer(app);

mongoose.connection.once("open", () => {
  console.log(`Mongo connection ready`);
});

mongoose.connection.on("error", (err) => console.error(err));

async function startServer() {
  await mongoose.connect(MONGO_URL);
  /**
   options* {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  }
   */
  await loadPlanetsData();

  server.listen(PORT, () => {
    console.log(`✅ Server is listening to ${PORT} PORT`);
  });
}

startServer();
//
