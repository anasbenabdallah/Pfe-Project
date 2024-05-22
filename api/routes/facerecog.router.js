var request = require("request");
var fs = require("fs");
const express = require("express");
const facerecogRouter = express.Router();
const { addFace, verifyFace } = require("../controllers/facerecog.controller");
const {
  authenticateToken,
} = require("../middlewares/authenticateToken.middleware");

// route to handle the POST request with person name and photo URL as parameters
facerecogRouter.post("/addface", authenticateToken, addFace);

facerecogRouter.post("/verifyface", verifyFace);

module.exports = facerecogRouter;
