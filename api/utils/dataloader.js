const tf = require("@tensorflow/tfjs");
const csv = require("csvtojson");
const fs = require("fs");
const SocialMediaPost = require("../models/SocialMediaPost.model"); // Ensure the correct path

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

    console.log("Loaded data:", userPosts.slice(0, 10)); // Log the first 10 rows for inspection
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

// Example user mapping
const userMapping = {
  "667aa9d7a928bdfae8a51eb2": "5eece14efc13ae6609000003",
  "6671caefb75bb69d6c6c771a": "5eece14efc13ae6609000000",
  // Add more mappings here
};

// Example post mapping
const postMapping = {
  108: "60b5f4d8c8e4a334a4e5ef9a", // Dataset post ID to Database post ID
  347: "60b5f4d8c8e4a334a4e5ef9b",
  // Add more mappings here
};

// Function to map database user ID to dataset user ID
function mapDatabaseUserIdToDatasetUserId(dbUserId) {
  return userMapping[dbUserId] || dbUserId;
}

// Function to map dataset post ID to database post ID
function mapDatasetPostIdToDatabasePostId(datasetPostId) {
  return postMapping[datasetPostId] || datasetPostId;
}

// Fetch post details from the database
async function getPostDetails(postId) {
  try {
    const post = await SocialMediaPost.findById(postId).exec();
    return post ? post.toObject() : null;
  } catch (error) {
    console.error("Error fetching post details:", error);
    return null;
  }
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

    const recommendedPosts = [];
    allPredictions[userId] = [];

    userPosts.forEach((post) => {
      const prediction = model
        .predict(tf.tensor2d([[post.likesCount, post.clicks]]))
        .dataSync()[0];

      allPredictions[userId].push({ postId: post.postId, prediction });

      if (userLikedCategories.has(post.category) && prediction > 0.4) {
        recommendedPosts.push(post);
      }
    });

    userRecommendations[userId] = recommendedPosts;
  });

  return { userRecommendations, allPredictions };
}

// Recommend posts for a specific user
async function recommendPosts(userId) {
  await loadData(); // Wait for the data to be loaded
  const datasetUserId = mapDatabaseUserIdToDatasetUserId(userId);
  const { userRecommendations, allPredictions } =
    await generateRecommendationsForAllUsers();

  const recommendedPostDetails = await Promise.all(
    (userRecommendations[datasetUserId] || []).map(async (post) => {
      const mappedPostId = mapDatasetPostIdToDatabasePostId(post.postId);
      const postDetails = await getPostDetails(mappedPostId);
      return postDetails ? postDetails : post; // Use dataset post if no database post found
    })
  );

  return {
    recommendedPosts: recommendedPostDetails,
    predictions: allPredictions[datasetUserId] || [],
  };
}

module.exports = { recommendPosts };
