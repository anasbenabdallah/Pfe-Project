const ChallengeModel = require("../models/Challenge.model");
const CompanyModel = require("../models/tester.model");
const UserModel = require("../models/user.model");

const CreateChallenge = async (req, res, next) => {
  console.log(req.role);
  console.log("zzzarga", req.body);
  //you can create a challenge only if you are a tester
  if (req.role !== "tester") {
    return res.status(403).json("you are not allowed to create a challenge");
  }

  try {
    const tester = await CompanyModel.findById(req.userId);
    console.log(req.userId);
    if (tester.balance < req.body.price) {
      throw new Error("You don't have enough money to create this challenge");
    }

    const newChallenge = new ChallengeModel({
      companyId: req.userId,
      ...req.body,
    });

    console.log(newChallenge);

    console.log("ezaeazeaz : ", req.body);

    console.log("req.userId", req.userId);

    const savedChallenge = await newChallenge.save();
    const data = await CompanyModel.findOneAndUpdate(
      { _id: req.userId },
      { $push: { challenges: savedChallenge._id } },
      { new: true } // Return the updated document
    );
    console.log(data);
    const message = "Challenge created";
    res.status(200).send({ message, savedChallenge });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ error: { path: err.path, msg: err.message } });
    next(err);
  }
};

const deleteChallenge = async (req, res) => {
  try {
    console.log(req.params.id);
    const challenge = await ChallengeModel.findByIdAndDelete(req.params.id);

    const message = "challenge has been deleted";

    res.status(200).send({ challenge, message });
  } catch (err) {
    res.status(500).json(err);
  }
};

const getChallenge = async (req, res) => {
  try {
    const ChallengePost = await ChallengeModel.findById(req.params.id);
    res.status(200).json(ChallengePost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getChallenges = async (req, res) => {
  const q = req.query;
  const filters = {
    ...(q.userId && { userId: q.userId }),
    ...(q.category && { category: q.category }),
    ...((q.min || q.max) && {
      price: {
        ...(q.min && { $gte: q.min }),
        ...(q.max && { $lte: q.max }),
      },
    }),
    ...(q.search && { title: { $regex: q.search, $options: "i" } }),
  };
  try {
    const ChallengePosts = await ChallengeModel.find(filters).populate(
      "companyId"
    );
    res.status(200).json(ChallengePosts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getChallengeUsers = async (req, res) => {
  try {
    const idChallenge = req.query.idChallenge; // Get idChallenge from the query parameter
    const ChallengePost = await ChallengeModel.findById(idChallenge).populate({
      path: "users",
      select: "-password",
    });
    const ChallengeUsers = ChallengePost.users;
    res.status(200).json(ChallengeUsers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  CreateChallenge,
  deleteChallenge,
  getChallenge,
  getChallenges,
  getChallengeUsers,
};
