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
  voteForPollOption,
  addFavoritePost,
  removeFavoritePost,
  getFavoritePosts,
} = require("../controllers/SocialMediaPost.controllers");

// Require authentication middleware
const {
  authenticateToken,
} = require("../middlewares/authenticateToken.middleware");

SocialMediaPostRouter.post("/", authenticateToken, CreatePost);
SocialMediaPostRouter.post("/:postId/poll/:optionId/vote", voteForPollOption);

SocialMediaPostRouter.get("/posts", authenticateToken, getFeedPosts);
SocialMediaPostRouter.get("/:userId", authenticateToken, getUserPosts);
SocialMediaPostRouter.delete("/:id", authenticateToken, deletePost);
SocialMediaPostRouter.put("/:id", authenticateToken, updateAPost);
SocialMediaPostRouter.patch("/:id/like", authenticateToken, likePost);
SocialMediaPostRouter.patch("/share", authenticateToken, sharePost);
// Add a post to favorites
SocialMediaPostRouter.post(
  "/:userId/favorites/:postId",

  addFavoritePost
);

// Remove a post from favorites
SocialMediaPostRouter.delete(
  "/:userId/favorites/:postId",
  authenticateToken,
  removeFavoritePost
);

// Get user's favorite posts
SocialMediaPostRouter.get(
  "/:userId/favorites",
  authenticateToken,
  getFavoritePosts
);

module.exports = SocialMediaPostRouter;
