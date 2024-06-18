const { recommendPosts } = require("../utils/dataloader");

const getRecommendations = async (req, res) => {
  const { userId } = req.params;
  try {
    const { recommendedPosts, predictions } = await recommendPosts(userId);
    res.json({ recommendedPosts, predictions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getRecommendations };
