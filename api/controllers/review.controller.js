const reviewModel = require("../models/Review.model");
const challengeModel = require("../models/Challenge.model");
const ObjectId = require("mongoose").Types.ObjectId;
// a user cannot feedbak tester more then once to avoid spaamming
const createReview = async (req, res) => {
  const { companyId, description, star } = req.body;
  const { userId } = req.params; // Extract userId from the URL parameters

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
const updateReviewEtat = async (req, res) => {
  try {
    const reviewId = req.params.id;
    const { etat } = req.body; // Assuming you send the new etat in the request body

    // Check if the provided review ID is valid
    if (!reviewId) {
      return res.status(400).json({ error: "Invalid review ID" });
    }

    // Find the review by ID
    const review = await reviewModel.findById(reviewId);

    // Check if the review exists
    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }

    // Update the etat of the review
    review.etat = etat;

    // Save the updated review
    await review.save();

    // Return the updated review
    return res
      .status(200)
      .json({ message: "Review etat updated successfully", review });
  } catch (error) {
    console.error("Error updating review etat:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createReview,
  getReviews,
  deleteReview,
  getAllReviews,
  getReviewsByCompanyId,
  updateReviewEtat,
};
