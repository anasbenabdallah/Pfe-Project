const Post = require("../models/SocialMediaPost.model");
const UserModel = require("../models/user.model");
const Tester = require("../models/tester.model");
const Category = require("../models/Category.model");
const mongoose = require("mongoose");

//create a post

const CreatePost = async (req, res) => {
  try {
    // Find the current user by ID
    const user = await UserModel.findById(req.userId);
    const tester = await Tester.findById(req.userId);

    // Determine whether the current user is a UserModel or Tester
    let owner;
    let isUser = true;
    let Model;
    if (user) {
      owner = user;
      Model = UserModel;
    } else if (tester) {
      owner = tester;
      isUser = false;
      Model = Tester;
    } else {
      throw new Error("User not found");
    }

    // Create a new post with the current user's information
    const newPost = new Post({
      userId: req.userId,
      firstname: isUser ? owner.firstname : undefined,
      lastname: isUser ? owner.lastname : undefined,
      companyName: !isUser ? owner.companyName : undefined,
      userPicturePath: owner.picturePath,
      description: req.body.description,
      postPicturePath: req.body.postPicturePath,
      categories: req.body.categories,
      poll: req.body.poll
        ? {
            question: req.body.poll.question,
            options: req.body.poll.options,
          }
        : undefined,
    });
    const savedPost = await newPost.save();

    // Update the user's or tester's posts array
    const data = await Model.findOneAndUpdate(
      { _id: req.userId },
      { $push: { posts: savedPost._id }, $inc: { score: 5 } }, // Increment score by 5
      { new: true }
    ).populate("posts");

    // Send notifications to all users except admins
    const users = await UserModel.find({ role: { $ne: "admin" } }); // Get all users except admins
    for (const user of users) {
      user.notifications.push({
        message: `A new post has been created by ${
          isUser ? owner.firstname : owner.companyName
        }`,
        post: savedPost._id,
      });
      await user.save();
    }

    res.status(201).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
//update a post

const updateAPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("the post has been updated");
    } else {
      res.status(403).json("you can update only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

//getFeedPosts
//getFeedPosts
const getFeedPosts = async (req, res) => {
  const q = req.query;
  const filters = {
    ...(q.categories && { "categories.name": q.categories }),
  };
  try {
    const posts = await Post.find(filters);
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//delete a post
const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId.toString() === req.userId) {
      response = await Post.findByIdAndDelete(req.params.id);
      res.status(200).send("Post has been deleted");
    } else {
      res.status(403).send("You are not authorized to delete this post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

//getUserPosts
const getUserPosts = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find the owner of the posts by ID
    let owner;
    let isUser = true;
    if (userId) {
      owner = await UserModel.findById(userId);
    } else {
      owner = await CompanyModel.findById(userId);
      isUser = false;
    }

    let posts;
    if (isUser) {
      const sharedPostIds = owner.posts;
      posts = await Post.find({
        $or: [
          { userId: userId },
          { companyId: userId },
          { _id: { $in: sharedPostIds } },
        ],
      });
    } else {
      posts = await Post.find({ companyId: userId });
    }

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//like/dislike post
const likePost = async (req, res) => {
  try {
    const { id } = req.params; //the id of the post
    const { userId } = req.body; //the user Id
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);
    let likesCount = post.likesCount;

    if (isLiked) {
      post.likes.delete(userId);
      if (likesCount > 0) {
        likesCount -= 1;
      }
    } else {
      post.likes.set(userId, true);
      likesCount += 1;
    }
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes, likesCount },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const sharePost = async (req, res) => {
  try {
    const { postId, userId } = req.body;

    // Find the post to share
    const post = await Post.findById(postId);

    // Check if the post exists
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if the user already shared the post
    const user = await UserModel.findById(userId);
    if (user.posts.includes(postId)) {
      return res.status(400).json({ message: "Post already shared" });
    }

    // Add the post to the user's shared posts
    user.posts.push(postId);
    await user.save();

    // Increment the share count of the post
    post.shareCount += 1;
    await post.save();

    return res.status(200).json({ message: "Post shared successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
const voteForPollOption = async (req, res) => {
  const { postId, optionId } = req.params;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const option = post.poll.options.id(optionId);
    if (!option) {
      return res.status(404).json({ error: "Poll option not found" });
    }

    // Increment the vote count for the selected poll option
    option.votesCount += 1;
    await post.save();

    res.status(200).json(post);
  } catch (error) {
    console.error("Error voting for poll option:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

async function addFavoritePost(req, res) {
  const { userId, postId } = req.params;

  try {
    let user = await UserModel.findById(userId);
    let isTester = false;

    if (!user) {
      user = await Tester.findById(userId);
      isTester = true;
    }

    if (!user) {
      return res.status(404).send("User or Tester not found");
    }

    if (!user.favoritePosts.includes(postId)) {
      user.favoritePosts.push(postId);
      await user.save();
      res.status(200).send("Post added to favorites");
    } else {
      res.status(400).send("Post already in favorites");
    }
  } catch (error) {
    console.error("Error adding favorite post:", error);
    res.status(500).send("Internal Server Error");
  }
}

// Remove a post from favorites
async function removeFavoritePost(req, res) {
  const { userId, postId } = parseUserIdAndPostIdFromUrl(req.url);

  if (!userId || !postId) {
    return res.status(400).send("Invalid URL format");
  }

  try {
    let user = await UserModel.findById(userId);
    let isTester = false;

    if (!user) {
      user = await Tester.findById(userId);
      isTester = true;
    }

    if (!user) {
      return res.status(404).send("User or Tester not found");
    }

    user.favoritePosts.pull(postId);
    await user.save();

    return res.status(200).send("Post removed from favorites");
  } catch (error) {
    console.error("Error removing favorite post:", error);
    return res.status(500).send("Internal Server Error");
  }
}

function parseUserIdAndPostIdFromUrl(url) {
  const parts = url.split("/");
  const userId = parts[parts.length - 3];
  const postId = parts[parts.length - 1];
  return { userId, postId };
}
// Get favorite posts with all details
async function getFavoritePosts(req, res) {
  const { userId } = req.params;

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).send("Invalid userId format");
  }

  try {
    let user = await UserModel.findById(userId).populate({
      path: "favoritePosts",
      populate: {
        path: "comments",
        model: "Comment",
      },
    });

    if (!user) {
      user = await Tester.findById(userId).populate({
        path: "favoritePosts",
        populate: {
          path: "comments",
          model: "Comment",
        },
      });
    }

    if (!user) {
      return res.status(404).send("User or Tester not found");
    }

    res.status(200).json(user.favoritePosts);
  } catch (error) {
    console.error("Error retrieving favorite posts:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = {
  CreatePost,
  updateAPost,
  getFeedPosts,
  deletePost,
  getUserPosts,
  likePost,
  sharePost,
  voteForPollOption,
  addFavoritePost,
  removeFavoritePost,
  getFavoritePosts,
};
