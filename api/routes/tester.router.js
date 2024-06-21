const express = require("express");

const testerRouter = express.Router();

//imported controllers
const { approveTester } = require("../controllers/admin.controllers");
const {
  editProfile,
  ChallengeWinner,
  getTesterNotifications,
} = require("../controllers/Tester.controllers");
const { getTester } = require("../controllers/Tester.controllers");

const validate = require("../middlewares/SchemaValidation.middleware");

//imported MiddleWare
const {
  authenticateToken,
} = require("../middlewares/authenticateToken.middleware");

const {
  testerEditProfileValidator,
} = require("../validators/tester.auth.validators");

testerRouter.put("/approve/:id/", authenticateToken, approveTester);
testerRouter.put(
  "/:id/",
  validate(testerEditProfileValidator),
  authenticateToken,
  editProfile
);
testerRouter.get("/get/:id/", authenticateToken, getTester);
testerRouter.post("/challengeWinner", authenticateToken, ChallengeWinner);
testerRouter.get(
  "/tester/:testerId/notifications",
  authenticateToken,
  getTesterNotifications
);

module.exports = testerRouter;
