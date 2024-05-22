const express = require("express");
const ConversationRouter = express.Router();

//imported controllers
const {
  createConversation,
  getConversations,
} = require("../controllers/conversation.controller");

// Require authentication middleware
const {
  authenticateToken,
} = require("../middlewares/authenticateToken.middleware");

ConversationRouter.post("/", authenticateToken, createConversation);
ConversationRouter.get("/:userId", authenticateToken, getConversations);

module.exports = ConversationRouter;
