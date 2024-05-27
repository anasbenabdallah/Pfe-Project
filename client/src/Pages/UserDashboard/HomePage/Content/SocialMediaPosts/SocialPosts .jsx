import { Favorite, FavoriteBorder, MoreVert, Share } from "@mui/icons-material";
import AddCommentOutlinedIcon from "@mui/icons-material/AddCommentOutlined";
import { useEffect, useState, useMemo } from "react";
import {
  Avatar,
  Card,
  CardActionArea,
  CardActions,
  CardHeader,
  CardMedia,
  Checkbox,
  IconButton,
  Stack,
  Typography,
  Button,
} from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { formatDistance } from "date-fns";
import { makeStyles } from "@mui/styles";

import { useSelector, useDispatch } from "react-redux";
import {
  likePost,
  getFeedPosts,
} from "../../../../../redux/actions/SocialPostAction";

import PostMenuIcon from "./components/PostMenuIcon";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import CommentButton from "../../../../../Components/shared/comments/CommentButton";
import ReactPlayer from "react-player";
import screenfull from "screenfull";
const useStyles = makeStyles({
  button: {
    "&:hover": {
      backgroundColor: "black", // Change the background color on hover
    },
  },
});

const SocialPosts = (props) => {
  const { loading = false } = props;
  const classes = useStyles();

  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const loggedInUserId = user._id;
  const [isLoading, setIsLoading] = useState(false); // Add loading
  const [isLiked, setIsLiked] = useState({});
  const [disabledOptions, setDisabledOptions] = useState({});

  useEffect(() => {
    dispatch(getFeedPosts()).catch(() => console.log("Error loading posts"));
  }, [dispatch]);

  const posts = useSelector((state) => state.posts.posts);

  const handleLike = (postId) => {
    dispatch(likePost(postId));
  };

  const sortedPosts = useMemo(() => {
    return posts.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  }, [posts]);

  console.log("sortedpost:", sortedPosts);

  const sharePost = async (postId, userId) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user._id;
      const response = await axios.patch(
        "http://localhost:8000/post/share",
        { postId, userId },
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const voteForPollOption = async (postId, optionId) => {
    try {
      // Send a request to vote for the option
      const response = await axios.post(
        `http://localhost:8000/post/${postId}/poll/${optionId}/vote`,
        {},
        {
          withCredentials: true,
        }
      );

      // Update the local state or refetch the posts to reflect the new vote count
      dispatch(getFeedPosts());

      // Disable the buttons for all options in the current post
      setDisabledOptions((prev) => ({
        ...prev,
        [postId]: true,
      }));
    } catch (error) {
      console.error("Error voting for poll option:", error);
    }
  };
  const handleAddFavorite = async (postId) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/post/${loggedInUserId}/favorites/${postId}`,
        {},
        {
          withCredentials: true,
        }
      );

      console.log(response.data); // Log the response for debugging
      // Assuming the response contains a message indicating success
      // You can show a success message or update the UI accordingly
    } catch (error) {
      console.error("Error adding post to favorites:", error);
      // Handle error - show error message or log it
    }
  };
  const handleBookmarkClick = (postId) => {
    setIsBookmarked((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };
  return (
    <div>
      <Stack spacing={2}>
        {isLoading ? (
          <Typography>Loading posts...</Typography>
        ) : Array.isArray(sortedPosts) ? (
          sortedPosts.map((post, index) => (
            <Card key={post._id} elevation={0} variant="outlined">
              <CardHeader
                action={<PostMenuIcon postId={post._id} />}
                title={
                  <div>
                    <Link
                      to={`/profile/${post.userId}`}
                      key={post.userId}
                      style={{ textDecoration: "none" }}
                    >
                      <Typography variant="h6">
                        {post.firstname} {post.lastname}
                        {post.companyName && (
                          <Typography> {post.companyName}</Typography>
                        )}
                      </Typography>
                    </Link>
                  </div>
                }
                avatar={<Avatar src={post.userPicturePath} />}
              />
              <Stack p={"0.5rem 1rem"}>
                <Typography> {post.description}</Typography>
              </Stack>
              {post.postPicturePath && (
                <CardActionArea>
                  <CardMedia component="img" image={post.postPicturePath} />
                </CardActionArea>
              )}
              {post.poll && post.poll.options.length > 0 && (
                <Stack p={"0.5rem 1rem"}>
                  <Typography variant="h6">{post.poll.question}</Typography>
                  {post.poll.options.map((option) => (
                    <Stack
                      key={option._id}
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      p={1}
                      bgcolor="grey.200"
                      borderRadius={1}
                      mb={1}
                    >
                      <Button
                        onClick={() => voteForPollOption(post._id, option._id)}
                        disabled={disabledOptions[post._id]}
                        className={classes.button} // Apply the custom styles class
                      >
                        <Typography>{option.text}</Typography>
                      </Button>
                      <Typography>{option.votesCount}votes</Typography>
                      <Typography>
                        {(
                          (option.votesCount /
                            post.poll.options.reduce(
                              (total, option) => total + option.votesCount,
                              0
                            )) *
                          100
                        ).toFixed(2)}
                        %
                      </Typography>
                    </Stack>
                  ))}
                </Stack>
              )}
              <CardActions>
                <Stack flexDirection={"row"} alignItems={"center"}>
                  <IconButton
                    aria-label="add to favorites"
                    onClick={() => handleLike(post._id)}
                  >
                    <Checkbox
                      icon={<FavoriteBorder />}
                      checkedIcon={<Favorite sx={{ color: "red" }} />}
                      checked={post.likes[loggedInUserId]}
                    />
                  </IconButton>
                  <Typography variant="h6">{post.likesCount}</Typography>
                </Stack>
                <Stack flexDirection={"row"} alignItems={"center"}>
                  <CommentButton postId={post._id} />
                  <Typography variant="h6">{post.commentCount}</Typography>
                </Stack>
                <Stack flexDirection={"row"} alignItems={"center"}>
                  <IconButton
                    aria-label="share"
                    onClick={() => sharePost(post._id)}
                  >
                    <Share />
                  </IconButton>
                  <BookmarkIcon
                    aria-label="add to favorites"
                    onClick={() => handleAddFavorite(post._id)}
                  >
                    {/* Show filled heart if the post is already in favorites */}
                    {post.favoritePosts &&
                    post.favoritePosts.includes(loggedInUserId) ? (
                      <Favorite sx={{ color: "red" }} />
                    ) : (
                      <FavoriteBorder />
                    )}
                  </BookmarkIcon>
                  <Typography variant="h6">{post.shareCount}</Typography>
                </Stack>
              </CardActions>
            </Card>
          ))
        ) : null}
      </Stack>
    </div>
  );
};

export default SocialPosts;
