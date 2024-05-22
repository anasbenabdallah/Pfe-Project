const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    country: { type: String },
    picturePath: { type: String, required: false },
    userDescription: { type: String, required: false },
    birthDate: { type: Date },
    score: { type: Number, default: 0 },
    gender: { type: String, enum: ["Male", "Female", "other"] },
    balance: { type: Number, default: 0.0 },
    yearsRegistered: { type: Number, default: 0 },
    challengesDone: { type: Number, default: 0 },
    phoneNumber: {
      type: String,
      maxLength: 14,
    },
    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
    status: {
      type: String,
      enum: ["active", "disabled"],
      default: "active",
    },
    viewedProfile: { type: Number },
    impressions: { type: Number },
    //role to switch between tester and user
    role: { type: String, enum: ["user", "admin"], default: "user" },
    resetToken: { type: String, default: undefined }, //need it for forget password(verification)
    isFaceRecognition: { type: Boolean, default: false },
    isBanned: { type: Boolean, default: false },

    posts: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "SocialMediaPost",
        },
      ],
      default: [],
    },
    challenges: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Challenge",
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
    messages: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Message",
        },
      ],
      default: [],
    },
    notifications: [
      {
        job: { type: mongoose.Schema.Types.ObjectId, ref: "Job" },
        message: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

UserSchema.virtual("yearsRegisteredCalcu").get(function () {
  const now = new Date();
  const createdAt = new Date(this.createdAt);
  const yearsRegisteredCalcu = now.getFullYear() - createdAt.getFullYear();
  if (
    now.getMonth() < createdAt.getMonth() ||
    (now.getMonth() === createdAt.getMonth() &&
      now.getDate() < createdAt.getDate())
  ) {
    yearsRegisteredCalcu--;
  }
  this.yearsRegistered = yearsRegisteredCalcu || 0;
  return this.yearsRegistered;
});

module.exports = mongoose.model("User", UserSchema);
