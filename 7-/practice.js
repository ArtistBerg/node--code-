const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors()); // Allow cross-origin requests

app.get("/data", (req, res) => {
  res.json({ message: "CORS enabled!" });
});

app.listen(5000, () => console.log("Server running on port 5000"));
