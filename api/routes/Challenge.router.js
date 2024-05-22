const express = require("express");
const ChallengeRouter = express.Router();

//imported controllers
const {
  CreateChallenge,
  deleteChallenge,
  getChallenge,
  getChallenges,
  getChallengeUsers,
  getChallengeUserSubmit,
} = require("../controllers/Challenge.controller");
const { CreateSubmission } = require("../controllers/submission.controllers");

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
ChallengeRouter.get(
  "/getChallengeUserSubmit",
  authenticateToken,
  getChallengeUserSubmit
);
ChallengeRouter.delete(
  "/deleteChallenge/:id",
  authenticateToken,
  deleteChallenge
);

ChallengeRouter.post("/submission", authenticateToken, CreateSubmission);
ChallengeRouter.delete("/:id", authenticateToken, deleteChallenge);

module.exports = ChallengeRouter;
