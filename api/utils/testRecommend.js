const { recommendPosts } = require("./dataloader");

async function testRecommend() {
  try {
    const userId = "5eece14efc13ae6609000003"; // Utilisez un ID utilisateur de votre dataset
    const { recommendedPosts, predictions } = await recommendPosts(userId);

    console.log("Recommended posts:", recommendedPosts);
    console.log("Predictions:", predictions);
  } catch (error) {
    console.error("Error during recommendation:", error);
  }
}

testRecommend();
