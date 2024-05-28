const express = require("express");
const ChallengeRouter = express.Router();

//imported controllers
const {
  CreateChallenge,
  deleteChallenge,
  getChallenge,
  getChallenges,
  getChallengeUsers,
} = require("../controllers/Challenge.controller");

// Require authentication middleware
const {
  authenticateToken,
} = require("../middlewares/authenticateToken.middleware");

const validate = require("../middlewares/SchemaValidation.middleware");

const {
  challengeSchemaValidator,
} = require("../validators/challenge.validators");

ChallengeRouter.post(
  "/",
  authenticateToken,
  validate(challengeSchemaValidator),
  CreateChallenge
);
ChallengeRouter.get("/single/:id", authenticateToken, getChallenge);
ChallengeRouter.get("/challenges", getChallenges);
ChallengeRouter.get("/getChallengeUsers", authenticateToken, getChallengeUsers);

ChallengeRouter.delete(
  "/deleteChallenge/:id",
  authenticateToken,
  deleteChallenge
);

ChallengeRouter.delete("/:id", authenticateToken, deleteChallenge);

module.exports = ChallengeRouter;
