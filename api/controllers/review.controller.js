const reviewModel = require("../models/Review.model");
const challengeModel = require("../models/Challenge.model");
const ObjectId = require("mongoose").Types.ObjectId;

const createReview = async (req, res) => {
  if (req.body.star > 5) {
    return res
      .status(400)
      .json({ message: "Star value must be between 1 and 5" });
  }
  const newReview = new reviewModel({
    companyId: req.userId,
    userId: req.body.userId,
    description: req.body.description,
    star: req.body.star,
  });

  try {
    //fetch our reviews
    const review = await reviewModel.findOne({
      userId: req.userId,
      companyId: req.body.companyId,
    });
    console.log(review);

    const savedReview = await newReview.save();
    //we should update our challenge after we are giving a review and i'm going to increment my total stars

    await res.status(200).json(savedReview);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
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

module.exports = {
  createReview,
  getReviews,
  deleteReview,
  getAllReviews,
};
