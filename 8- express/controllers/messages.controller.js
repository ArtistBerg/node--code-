const path = require("path");

function getMessages(req, res) {
  res.sendFile(path.join(__dirname, "..", "public", "Fightwin.png"));
}

function postMessage(req, res) {
  console.log("Updating message..");
}

module.exports = {
  getMessages,
  postMessage,
};
