const mongoose = require("mongoose");
const Tester = require("./tester.model");

const ChallengeSchema = new mongoose.Schema(
  {
    //we need the owner of the challenge
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Tester,
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    totalStars: { type: Number, default: 0 },
    starNumber: { type: Number, default: 0 },
    category: {
      type: String,
      required: true,
    },
    RecommendedSkills: {
      type: Array,
      default: [],
    },
    price: { type: Number, required: true },
    cover: { type: String },
    images: { type: [String] }, //array that include string
    deliveryTime: { type: Number },
    features: { type: [String] },
    deadline: { type: Date },
    winner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    users: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      default: [],
    },
    submissions: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Submission",
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Challenge", ChallengeSchema);
