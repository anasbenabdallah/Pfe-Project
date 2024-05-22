const User = require("../models/user.model");
const Tester = require("../models/tester.model");
const companySchema = require("../models/tester.model");

const bcrypt = require("bcryptjs");

const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    res.json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const getCompanies = async (req, res) => {
  try {
    const testers = await Tester.find({}).select("-password");
    res.json(testers);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const addUser = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    console.log(typeof req.body.password, req.body.password);

    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: hashedPass,
      role: req.body.role,
    });

    //see if user exist or not
    const userExist = await User.findOne({ email: req.body.email });
    if (userExist) {
      return res.status(400).send({ msg: "User already exists" });
    }
    //create the user if not existed in the database
    const user = await newUser.save();
    return res.status(200).json({ msg: "user successfully created", user });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
const updUser = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const delUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.send(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

// ==============================|| disableUser ||============================== //

const disableUser = async (req, res) => {
  const { id, action } = req.params;
  try {
    let status;
    if (action === "active") {
      status = "active";
    } else if (action === "disabled") {
      status = "disabled";
    } else {
      return res.status(400).json({ message: "Invalid action" });
    }

    const updatedUser = await userSchema.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
// if user role is admin he can ban or unban an account
const BanAccount = async (req, res) => {
  try {
    const user = await userSchema.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.isBanned = !user.isBanned; // toggle the user's banned status
    await user.save();
    res.json({ msg: "User successfully Banned", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const approveCompany = async (req, res) => {
  try {
    console.log("zzz  ", req.body.companyId);
    const updatedCompany = await companySchema.findByIdAndUpdate(
      req.body.companyId,
      {
        verified: true,
      },
      { new: true }
    );
    res.status(200).json(updatedCompany);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

module.exports = {
  getUsers,
  addUser,
  updUser,
  delUser,
  disableUser,
  BanAccount,
  approveCompany,
  getCompanies,
};
