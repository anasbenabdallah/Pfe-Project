const userSchema = require("../models/user.model");
const testerSchema = require("../models/tester.model");
const jwt = require("jsonwebtoken");
const { pick } = require("lodash");
const ChallengeModel = require("../models/Challenge.model");
const Tester = require("../models/tester.model");
const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const { sendEmail } = require("../middlewares/mail.middleware");

const editProfile = async (req, res) => {
  try {
    console.log("editProfile");

    const updateFields = pick(req.body, [
      "testerName",
      "email",
      "password",
      "picturePath",
      "country",
      "dateoffoundation",
      "phoneNumber",
    ]);

    if (updateFields.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(updateFields.password, salt);
      updateFields.password = hashedPass;
    }
    const updatedTester = await testerSchema
      .findByIdAndUpdate(req.params.id, updateFields, { new: true })
      .select("-password");

    res.status(200).json(updatedTester);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const getTester = async (req, res) => {
  try {
    const { id } = req.params;
    const tester = await testerSchema.findById(id).populate("challenges");
    res.status(200).json(tester);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const getTesterChallenges = async (req, res) => {
  try {
    const idTester = req.query.idTester; // Get idChallenge from the query parameter
    const Tester = await TesterModel.findById(idTester).populate({
      path: "challenges",
      select: "-password",
    });
    res.status(200).json(Tester);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const ChallengeWinner = async (req, res) => {
  try {
    const idTester = req.body.idTester; // Get idChallenge from the query parameter
    const idChallenge = req.body.idChallenge; // Get idChallenge from the query parameter
    const idUser = req.body.idUser; // Get idUser from the query parameter
    const Challenge = await ChallengeModel.findById(idChallenge);
    const tester = await Tester.findById(idTester).select("-password");
    const User = await userModel.findById(idUser);
    console.log(Challenge);
    User.balance = User.balance + Challenge.price;
    tester.balance = tester.balance - Challenge.price;
    Challenge.winner = User._id;
    User.notifications.push({
      message: `You won the challenge ${Challenge.title}`,
    });
    sendEmail(User.email, `You won the challenge ${Challenge.title}`);
    newChallenge = await Challenge.save();
    User.save();
    newTester = await tester.save();
    console.log(newTester);
    res.status(200).json({ newTester, newChallenge });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const getTesterNotifications = async (req, res) => {
  try {
    const tester = await testerSchema.findById(req.params.testerId).populate({
      path: "notificationsTester",
      populate: {
        path: "user",
        select: "firstname lastname picturePath",
      },
    });
    if (!tester) throw new Error("Tester not found");
    res.json(tester.notificationsTester);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server Error" });
  }
};
module.exports = {
  editProfile,
  getTester,
  getTesterChallenges,
  ChallengeWinner,
  getTesterNotifications,
};
