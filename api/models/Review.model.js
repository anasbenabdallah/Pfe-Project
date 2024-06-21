const mongoose = require("mongoose");
const User = require("./user.model");
const Tester = require("./tester.model");

const ReviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
    testerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Tester,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    //the number of stars of the user who put the review
    star: {
      type: Number,
      required: true,
      enum: [1, 2, 3, 4, 5],
    },
    etat: {
      type: String,
      enum: ["traité", "non traité"],
      default: "non traité",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", ReviewSchema);
