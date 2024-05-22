const express = require("express");

const companyRouter = express.Router();

//imported controllers
const { approveCompany } = require("../controllers/admin.controllers");
const {
  editProfile,
  ChallengeWinner,
  getCompanyNotifications,
} = require("../controllers/Tester.controllers");
const { getCompany } = require("../controllers/Tester.controllers");

const validate = require("../middlewares/SchemaValidation.middleware");

//imported MiddleWare
const {
  authenticateToken,
} = require("../middlewares/authenticateToken.middleware");

const {
  companyEditProfileValidator,
} = require("../validators/tester.auth.validators");

companyRouter.put("/approve/:id/", authenticateToken, approveCompany);
companyRouter.put(
  "/:id/",
  validate(companyEditProfileValidator),
  authenticateToken,
  editProfile
);
companyRouter.get("/get/:id/", authenticateToken, getCompany);
companyRouter.post("/challengeWinner", authenticateToken, ChallengeWinner);
companyRouter.get(
  "/tester/:companyId/notifications",
  authenticateToken,
  getCompanyNotifications
);

module.exports = companyRouter;
