const ChallengeModel = require("../models/Challenge.model");
const Submission = require("../models/submission.model");
const User = require("../models/user.model");

const CreateSubmission = async (req, res, next) => {
  const { challengeId, userId, title, description, filesPaths } = req.body;

  // Create submission object
  const submission = new Submission({
    challengeId,
    userId,
    title,
    description,
    filesPaths,
  });

  try {
    // Save submission to database
    const savedSubmission = await submission.save();

    // Add submission to challenge
    const challenge = await ChallengeModel.findById(challengeId);
    const user = await User.findById(userId)
      .select("-password")
      .populate("submissions");

    challenge.submissions.push(savedSubmission._id);
    user.submissions.push(savedSubmission._id);

    await challenge.save();
    await user.save();

    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  CreateSubmission,
};
