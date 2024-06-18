// routes/recommendationRoute.js
const express = require("express");
const {
  getRecommendations,
} = require("../controllers/recommendationController");

const router = express.Router();

router.get("/:userId/recommendations", getRecommendations);

module.exports = router;
