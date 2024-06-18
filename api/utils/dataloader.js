const tf = require("@tensorflow/tfjs");
const csv = require("csvtojson");
const fs = require("fs");

const filePath = "./tensorflow/final_modified.csv";

let userPosts = [];

// Load data with csvtojson
async function loadData() {
  try {
    userPosts = await csv().fromFile(filePath);

    // Convert relevant fields to numbers
    userPosts.forEach((row) => {
      row.likesCount = parseInt(row.likesCount, 10);
      row.clicks = parseInt(row.clicks, 10);
    });

    // console.log("Loaded data:", userPosts.slice(0, 10)); // Log the first 10 rows for inspection to see we retiving correctly data from csv or not
  } catch (error) {
    console.error("Error loading data:", error);
  }
}

// Prepare data for TensorFlow
function prepareData() {
  const features = [];
  const labels = [];

  userPosts.forEach((post) => {
    features.push([post.likesCount, post.clicks]); // Example features
    labels.push(post.liked === "True" ? 1 : 0); // Example label
  });

  const featureTensor = tf.tensor2d(features);
  const labelTensor = tf.tensor1d(labels, "int32");

  console.log("Feature tensor:", featureTensor.arraySync().slice(0, 10)); // Log first 10 features
  console.log("Label tensor:", labelTensor.arraySync().slice(0, 10)); // Log first 10 labels

  return { featureTensor, labelTensor };
}

// Train TensorFlow model
async function trainModel(features, labels) {
  const model = tf.sequential();
  model.add(
    tf.layers.dense({ units: 10, activation: "relu", inputShape: [2] })
  );
  model.add(tf.layers.dense({ units: 1, activation: "sigmoid" }));

  model.compile({
    optimizer: tf.train.adam(),
    loss: tf.losses.sigmoidCrossEntropy,
    metrics: ["accuracy"],
  });

  const history = await model.fit(features, labels, {
    epochs: 10,
    batchSize: 32,
    validationSplit: 0.2,
  });

  console.log("Training history:", history.history); // Log the training history

  return model;
}

// Generate recommendations for all users
async function generateRecommendationsForAllUsers() {
  const { featureTensor, labelTensor } = prepareData();
  const model = await trainModel(featureTensor, labelTensor);

  const userRecommendations = {};
  const allPredictions = {};

  // Extract unique user IDs
  const userIds = [...new Set(userPosts.map((post) => post.userId))];

  userIds.forEach((userId) => {
    const userLikedCategories = new Set(
      userPosts
        .filter((post) => post.userId === userId && post.liked === "True")
        .map((post) => post.category)
    );

    // Filter posts by the user's liked categories
    const recommendedPosts = [];
    allPredictions[userId] = [];

    userPosts.forEach((post) => {
      const prediction = model
        .predict(tf.tensor2d([[post.likesCount, post.clicks]]))
        .dataSync()[0];

      allPredictions[userId].push({ postId: post.postId, prediction });
      // return the post with prediction superior then the value indicated
      if (userLikedCategories.has(post.category) && prediction > 0.4) {
        // Example threshold
        recommendedPosts.push(
          post.postId,
          post.liked,
          post.likesCount,
          post.clicks,
          post.description
        );
      }
    });

    userRecommendations[userId] = recommendedPosts;
  });

  return { userRecommendations, allPredictions };
}

// Recommend posts for a specific user
async function recommendPosts(userId) {
  await loadData(); // Wait for the data to be loaded
  const { userRecommendations, allPredictions } =
    await generateRecommendationsForAllUsers();

  // console.log("All predictions for user", userId, ":", allPredictions[userId]); // Log predictions for the specific user

  return {
    recommendedPosts: userRecommendations[userId] || [],
    predictions: allPredictions[userId] || [],
  };
}

module.exports = { recommendPosts };
