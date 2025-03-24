const express = require("express");

const messageRouter = express.Router();

const messagesController = require("../controllers/messages.controller");

messageRouter.use((req, res, next) => {
  console.log(`Request Route: ${req.ip}`);
  next();
});
messageRouter.get("/", messagesController.getMessages);
messageRouter.post("/", messagesController.postMessage);

module.exports = messageRouter;
