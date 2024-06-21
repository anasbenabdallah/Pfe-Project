const mongoose = require("mongoose");

const testerSchema = new mongoose.Schema(
  {
    testerName: {
      type: String,
      maxLength: 255,
      trim: true,
      unique: true,
    },
    email: { type: String, required: true },
    password: { type: String, required: true },
    logo: { type: String },
    country: { type: String },
    picturePath: { type: String },
    websiteUrl: { type: String },
    verified: { type: Boolean, default: false },
    description: { type: String },
    role: { type: String, default: "tester" },
    events: [{ type: mongoose.Types.ObjectId, ref: "Event", required: true }],
    balance: { type: Number, default: 0.0 },
    dateoffoundation: { type: Date },
    phoneNumber: {
      type: String,
      maxLength: 9,
    },
    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
    posts: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "SocialMediaPost",
        },
      ],
      default: [],
    },
    favoritePosts: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "SocialMediaPost",
        },
      ],
      default: [],
    },
    challenges: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Challenge",
      },
    ],
    notificationsTester: [
      {
        message: String,
        createdAt: { type: Date, default: Date.now },
        event: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
        challenge: { type: mongoose.Schema.Types.ObjectId, ref: "Challenge" },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      },
    ],
  },

  { timestamps: true }
);

const Tester = mongoose.model("Tester", testerSchema);

module.exports = Tester;
