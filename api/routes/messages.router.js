const express = require("express");
const MessageRouter = express.Router();

//imported controllers
const {
  createMessage,
  getMessages,
} = require("../controllers/messages.controllers");

// Require authentication middleware
const {
  authenticateToken,
} = require("../middlewares/authenticateToken.middleware");

MessageRouter.post("/", authenticateToken, createMessage);
MessageRouter.get("/:conversationId", authenticateToken, getMessages);

module.exports = MessageRouter;
