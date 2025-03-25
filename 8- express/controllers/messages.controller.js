const path = require("path");

function getMessages(req, res) {
  // __dirname => controller/messages.controller.js
  // res.sendFile(path.join(__dirname, "..", "public", "images", "Fightwin.png"));

  // template using messages.hbs
  res.render("messages", {
    title: "Into my college",
    college: "My new friend",
    layout: "layout",
  });
}

function postMessage(req, res) {
  console.log("Updating message..");
}

module.exports = {
  getMessages,
  postMessage,
};
