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
} from "@mui/material";
import { formatDistance } from "date-fns";
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

const SocialPosts = (props) => {
  const { loading = false } = props;

  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const loggedInUserId = user._id;
  const [isLoading, setIsLoading] = useState(false); // Add loading
  const [isLiked, setIsLiked] = useState({});

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
                subheader={
                  <Typography variant="h6" color={"gray"}>
                    {formatDistance(new Date(post.createdAt), new Date(), {
                      addSuffix: true,
                    })}
                  </Typography>
                }
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
              {/* 
              <ReactPlayer
                url={post.postPicturePath}
                controls
                playing={true}
                muted={true}
                playbackRate={true}
                width={"100%"}
              />*/}
              <CardActionArea>
                <CardMedia component="img" image={post.postPicturePath} />
              </CardActionArea>
              <CardActions>
                <Stack flexDirection={"row"} alignItems={"center"}>
                  <IconButton
                    aria-label="add to favorites"
                    onClick={() => handleLike(post._id)}
                  >
                    {isLiked ? (
                      <Checkbox
                        icon={<FavoriteBorder />}
                        checkedIcon={<Favorite sx={{ color: "red" }} />}
                      />
                    ) : (
                      <FavoriteBorder />
                    )}
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
