const userSchema = require("../models/user.model");
const testerSchema = require("../models/tester.model");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

// ==============================|| Register ||============================== //
const signUp = async (req, res) => {
  try {
    // Generate a salt for password hashing
    const salt = await bcrypt.genSalt(10);

    // Hash the password using the generated salt
    const hashedPass = await bcrypt.hash(req.body.password, salt);

    // If the role is "user"
    if (req.body.role == "user") {
      // Check if the user already exists in the userSchema collection
      const userExist = await userSchema.findOne({ email: req.body.email });
      if (userExist) {
        return res.status(400).send({ error: { msg: "User already exists" } });
      }

      // Create a new user with the hashed password
      const newUser = new userSchema({
        ...req.body,
        password: hashedPass,
      });

      // Save the new user to the userSchema collection
      const user = await newUser.save();

      // Return a success response with the new user data
      return res.status(200).json({ msg: "User successfully created", user });
    }
    // If the role is "tester"
    else if (req.body.role == "tester") {
      // Create a new tester with the hashed password
      const newTester = new testerSchema({
        ...req.body,
        password: hashedPass,
      });

      // Save the new tester to the testerSchema collection
      const tester = await newTester.save();

      // Return a success response with the new tester data
      return res
        .status(200)
        .json({ msg: "Tester successfully created", tester });
    }
  } catch (error) {
    // Log any errors that occur and return an error response with the error data
    console.log(error);
    return res.status(500).json(error);
  }
};

// ==============================|| Login ||============================== //

const signIn = async (req, res) => {
  try {
    //check if the email exist
    const user = await userSchema.findOne({ email: req.body.email });
    const tester = await testerSchema.findOne({ email: req.body.email });

    if (!user && !tester)
      return res.status(400).json({ error: "email does not exist!" });

    //check if the password is valid
    if (user) {
      const validated = await bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!validated)
        return res.status(400).json({ error: "Wrong password or email" });
    } else if (tester) {
      const validated = await bcrypt.compareSync(
        req.body.password,
        tester.password
      );
      if (!validated)
        return res.status(400).json({ error: "Wrong password or email" });
    }

    const { password, ...info } = user ? user._doc : tester._doc;

    //if the both are valid then
    const token = jwt.sign(
      {
        id: user ? user._id : tester._id,
        role: user ? user.role : tester.role,
        email: user ? user.email : tester.email,
      },
      process.env.passwordToken
    );

    if (tester) {
      if (tester.verified == false) {
        return res.status(400).json({ error: "Tester not verified" });
      }
    }

    res.cookie("accessToken", token, {}).status(200).send(info);

    console.log(token);
  } catch (error) {
    console.log(error);

    return res.status(500).json(error);
  }
};
// ==============================|| Logout ||============================== //
const logout = async (req, res) => {
  try {
    // Get the token from the request headers
    const blacklistedToken = req.header("Authorization").split(" ")[1];
    // Decode the token to get the user ID
    const decodedToken = jwt.verify(
      blacklistedToken,
      process.env.passwordToken
    );
    console.log(decodedToken);
    //get only the user id
    const userId = decodedToken.id;
    console.log(userId);
    // Fetch the user from the database
    const user = await userSchema.findById(userId);
    console.log(user);
    return res
      .status(200)
      .send({ msg: "Logout successfully", blacklistedToken, user });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
// ==============================|| forgetpassword ||============================== //
const forgetpassword = async (req, res) => {
  try {
    const email = req.body.email;
    const user = await userSchema.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const resetToken = jwt.sign(
      { userId: user._id },
      process.env.passwordToken,
      {
        expiresIn: "1h",
      }
    );
    user.resetToken = resetToken;
    await user.save();

    // Send email with password reset link
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL_ADDRESS,
      to: email,
      subject: "Password Reset",
      html: `<p>Please click the following link to reset your password:</p><a href="http://localhost:3000/reset-password/${resetToken}">http://localhost:3000/reset-password/${resetToken}</a>`,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return res.status(500).json({ error: "Error sending email" });
      } else {
        console.log("Email sent: " + info.response);
        return res.status(200).json({ message: "Password reset email sent" });
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

// ==============================|| reset password ||============================== //
const resetpassword = async (req, res) => {
  try {
    const resetToken = req.body.resetToken;
    const Password = req.body.password;
    const user = await userSchema.findOne({ resetToken: resetToken });
    if (!user) {
      return res.status(404).json({ error: "Invalid reset token" });
    }
    const decoded = jwt.verify(resetToken, process.env.passwordToken);
    if (decoded.userId !== user._id.toString()) {
      return res.status(404).json({ error: "Invalid reset token" });
    }
    user.password = await bcrypt.hash(Password, 10);
    user.resetToken = undefined;
    await user.save();
    return res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
// ==============================|| signInWithGoogle ||============================== //

module.exports = {
  signUp,
  signIn,
  logout,
  forgetpassword,
  resetpassword,
};
