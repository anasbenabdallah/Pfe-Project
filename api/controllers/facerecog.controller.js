var request = require("request");
var fs = require("fs");
const express = require("express");
const facerecogRouter = express.Router();
var User = require("../models/user.model");

// replace these values with your own
var token = "0e36aba8b3ff451abefdaa57966a666f";

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dvko9nyty",
  api_key: "799792456131682",
  api_secret: "HbK9IMnTgkT5SYfh7hQlskL7oFg",
});

async function uploadImageAndGetURL(localPath) {
  try {
    const result = await cloudinary.uploader.upload(localPath);
    return result.secure_url;
  } catch (error) {
    console.log(error);
  }
}

const addFace = async (req, res) => {
  // retrieve the user object from the request body
  const email = req.body.email;
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(200).json({ message: "User not found" });
  }
  // set uuid to the user's ObjectId
  const uuid = user._id.toString();
  console.log(uuid);

  const photoUrl = req.body.photoUrl;
  const localImagePath = photoUrl;
  const url = await uploadImageAndGetURL(localImagePath);
  user.isFaceRecognition = true;
  await user.save();

  // set up the request options
  const options = {
    method: "POST",
    url: "https://api.luxand.cloud/person",
    qs: { name: uuid, store: "1" },
    headers: {
      token: token,
    },
    formData: {
      photo: request(url),
    },
  };

  // make the API request
  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    res.send(body);
  });
};

const verifyFace = async (req, res) => {
  // retrieve the name and photo url from the request body
  var photoUrl = req.body.photoUrl;
  const localImagePath = photoUrl;
  const url = await uploadImageAndGetURL(localImagePath);

  // set up the request options
  var options = {
    method: "POST",
    url: "https://api.luxand.cloud/photo/search",
    qs: {},
    headers: {
      token: "0e36aba8b3ff451abefdaa57966a666f",
    },
    formData: {
      photo: request(url),
    },
  };

  const jwt = require("jsonwebtoken");

  // make the API request
  request(options, async function (error, response, body) {
    try {
      if (error) {
        throw new Error(error);
      }

      const results = JSON.parse(body);
      if (!results.length) {
        throw new Error("No matches found");
      }
      const name = JSON.parse(body)[0].name;
      const user = await User.findOne({ _id: name }).select("-password");
      const email = user.email;
      console.log(email);

      const payload = {
        email: email,
      };

      const secretKey = process.env.passwordToken;

      const token = jwt.sign(payload, secretKey);

      const data = {
        body: JSON.parse(body),
        user: user,
        token: token,
      };
      res.cookie("accessToken", token, {}).status(200).send(data);
    } catch (err) {
      console.error(err);
      res.status(400).send("Error: " + err.message);
    }
  });
};

module.exports = {
  addFace,
  verifyFace,
};
