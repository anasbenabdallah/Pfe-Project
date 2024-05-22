const express = require("express");
const CommentRouter = express.Router();

const {
  addComment,
  getComments,
  deleteComment,
} = require("../controllers/Comment.controllers");
// Require authentication middleware
const {
  authenticateToken,
} = require("../middlewares/authenticateToken.middleware");

CommentRouter.post("/", authenticateToken, addComment);
CommentRouter.get("/:postId", authenticateToken, getComments);
CommentRouter.delete("/:id", authenticateToken, deleteComment);

module.exports = CommentRouter;
