const express = require("express");
const SocialMediaPostRouter = express.Router();

//imported controllers
const {
  CreatePost,
  updateAPost,
  getFeedPosts,
  deletePost,
  getUserPosts,
  likePost,
  sharePost,
} = require("../controllers/SocialMediaPost.controllers");

// Require authentication middleware
const {
  authenticateToken,
} = require("../middlewares/authenticateToken.middleware");

SocialMediaPostRouter.post("/", authenticateToken, CreatePost);
SocialMediaPostRouter.get("/posts", authenticateToken, getFeedPosts);
SocialMediaPostRouter.get("/:userId", authenticateToken, getUserPosts);
SocialMediaPostRouter.delete("/:id", authenticateToken, deletePost);
SocialMediaPostRouter.put("/:id", authenticateToken, updateAPost);
SocialMediaPostRouter.patch("/:id/like", authenticateToken, likePost);
SocialMediaPostRouter.patch("/share", authenticateToken, sharePost);

module.exports = SocialMediaPostRouter;
