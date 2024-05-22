const express = require("express");
const {
  stripePayment,
  stripeUpdate,
} = require("../controllers/stripe.controllers");
const {
  authenticateToken,
} = require("../middlewares/authenticateToken.middleware");
const stripeRouter = express.Router();

stripeRouter.post("/create-checkout-session", authenticateToken, stripePayment);
stripeRouter.post("/webhook", stripeUpdate);

module.exports = stripeRouter;
