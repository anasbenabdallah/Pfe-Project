const Comment = require("../models/Comment.model");
const SocialPost = require("../models/SocialMediaPost.model");

const addComment = async (req, res, next) => {
  try {
    const newComment = new Comment({ ...req.body, userId: req.userId });
    const savedComment = await newComment.save();

    const postId = req.body.postId;
    const post = await SocialPost.findById(postId);
    post.comments.push(savedComment._id);
    post.commentCount += 1; // increment comment count
    await post.save();

    res.status(200).send(savedComment);
  } catch (err) {
    next(err);
  }
};

const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(res.params.id);
    const post = await SocialPost.findById(res.params.id);
    if (req.userId === comment.userId || req.userId === post.userId) {
      await Comment.findByIdAndDelete(req.params.id);
      res.status(200).json("The comment has been deleted.");
    } else {
      return next(createError(403, "You can delete ony your comment!"));
    }
  } catch (err) {
    next(err);
  }
};

const getComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId });
    res.status(200).json(comments);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addComment,
  getComments,
  deleteComment,
};
