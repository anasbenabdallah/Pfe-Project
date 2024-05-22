const mongoose = require("mongoose");

const SocialMediaPostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: false,
    },
    lastname: {
      type: String,
      required: false,
    },
    companyName: { type: String, required: false },
    /*owner.companyName || */
    description: {
      type: String,
      max: 500,
      required: true,
    },
    postPicturePath: {
      type: String,
    },
    userPicturePath: {
      type: String,
    },
    likes: {
      type: Map,
      of: Boolean,
      default: {},
    },
    likesCount: {
      type: Number,
      default: 0,
    },
    shareCount: {
      type: Number,
      default: 0,
    },
    categories: {
      type: Array,
      required: false,
    },
    comments: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Comment",
        },
      ],
      default: [],
    },
    commentCount: {
      type: Number,
      default: 0,
    },
    user: { type: mongoose.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const SocialMediaPost = mongoose.model(
  "SocialMediaPost",
  SocialMediaPostSchema
);

module.exports = SocialMediaPost;
