const reviewModel = require("../models/Review.model");
const challengeModel = require("../models/Challenge.model");
const ObjectId = require("mongoose").Types.ObjectId;
// a user cannot feedbak tester more then once to avoid spaamming
const createReview = async (req, res) => {
  const { companyId, description, star } = req.body;
  const userId = req.userId; // assuming the user's ID is stored in req.userId

  // Validate the star rating
  if (star < 1 || star > 5) {
    return res
      .status(400)
      .json({ message: "Star value must be between 1 and 5" });
  }

  // Create a new review instance
  const newReview = new reviewModel({
    companyId,
    userId,
    description,
    star,
  });

  try {
    // Check if a review already exists for the user and company
    const existingReview = await reviewModel.findOne({ userId, companyId });
    if (existingReview) {
      return res
        .status(400)
        .json({ message: "You have already reviewed this tester" });
    }

    // Save the new review
    const savedReview = await newReview.save();

    // Optionally, update related models like challengeModel if needed
    // This is a placeholder for any additional logic related to challenges
    // await challengeModel.updateOne({ someCriteria }, { $inc: { totalStars: star } });

    // Respond with the saved review
    return res.status(201).json(savedReview);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllReviews = async (req, res) => {
  try {
    console.log("GET request received for retrieving all reviews."); // Log incoming request

    const reviews = await reviewModel.find().populate("userId");
    console.log("Retrieved reviews:", reviews); // Log retrieved reviews

    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error occurred while retrieving reviews:", error); // Log error

    return res.status(500).json(error);
  }
};

const getReviews = async (req, res) => {
  try {
    const reviews = await reviewModel.find({
      userId: new ObjectId(req.params.id),
    });

    console.log(new ObjectId(req.params.id));
    res.status(200).json(reviews);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
const deleteReview = async (req, res) => {
  try {
    const review = await reviewModel.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });

    console.log(req.params.id);
    console.log(req.userId);
    console.log(review);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    await challengeModel.findByIdAndUpdate(review.challengeId, {
      $inc: { totalStars: -review.star, starNumber: -1 },
    });

    return res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
const getReviewsByCompanyId = async (req, res) => {
  try {
    const reviews = await reviewModel
      .find({
        companyId: new ObjectId(req.params.companyId),
      })
      .populate("userId");
    res.status(200).json(reviews);
  } catch (error) {
    console.error(
      "Error occurred while retrieving reviews by company ID:",
      error
    );
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  createReview,
  getReviews,
  deleteReview,
  getAllReviews,
  getReviewsByCompanyId,
};
