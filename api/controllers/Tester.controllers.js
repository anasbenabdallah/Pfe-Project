const userSchema = require("../models/user.model");
const companySchema = require("../models/tester.model");
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
      "companyName",
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
    const updatedCompany = await companySchema
      .findByIdAndUpdate(req.params.id, updateFields, { new: true })
      .select("-password");

    res.status(200).json(updatedCompany);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const getCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const tester = await companySchema.findById(id).populate("challenges");
    res.status(200).json(tester);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const getCompanyChallenges = async (req, res) => {
  try {
    const idCompany = req.query.idCompany; // Get idChallenge from the query parameter
    const Tester = await CompanyModel.findById(idCompany).populate({
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
    const idCompany = req.body.idCompany; // Get idChallenge from the query parameter
    const idChallenge = req.body.idChallenge; // Get idChallenge from the query parameter
    const idUser = req.body.idUser; // Get idUser from the query parameter
    const Challenge = await ChallengeModel.findById(idChallenge);
    const tester = await Tester.findById(idCompany).select("-password");
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
    newCompany = await tester.save();
    console.log(newCompany);
    res.status(200).json({ newCompany, newChallenge });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const getCompanyNotifications = async (req, res) => {
  try {
    const tester = await companySchema.findById(req.params.companyId).populate({
      path: "notificationsCompany",
      populate: {
        path: "user",
        select: "firstname lastname picturePath",
      },
    });
    if (!tester) throw new Error("Tester not found");
    res.json(tester.notificationsCompany);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server Error" });
  }
};
module.exports = {
  editProfile,
  getCompany,
  getCompanyChallenges,
  ChallengeWinner,
  getCompanyNotifications,
};
