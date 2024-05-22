import { Favorite, FavoriteBorder, MoreVert, Share } from "@mui/icons-material";
import { useEffect, useState, useMemo } from "react";
import {
  Avatar,
  Card,
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
  getUserPosts,
} from "../../../../../../redux/actions/SocialPostAction";
import PostMenuIcon from "./components/PostMenuIcon";
import CommentButton from "../../../../../../Components/shared/comments/CommentButton";

import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const MySocialPosts = () => {
  const dispatch = useDispatch();
  const id = useParams().userId;

  const Likedposts = useSelector((state) => state.posts.posts);
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const [likedPosts, setLikedPosts] = useState([]);

  useEffect(() => {
    dispatch(getUserPosts(id)).catch(() => console.log("Error loading posts"));
  }, [dispatch, id]);

  const handleLike = (postId) => {
    if (likedPosts.includes(postId)) {
      setLikedPosts(likedPosts.filter((id) => id !== postId));
    } else {
      setLikedPosts([...likedPosts, postId]);
    }
    dispatch(likePost(postId));
  };

  const sortedPosts = useMemo(() => {
    if (!Likedposts) {
      return [];
    }
    return Likedposts.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  }, [Likedposts]);

  const isPostLiked = (postId) => {
    return likedPosts.includes(postId);
  };

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
              <CardMedia component="img" image={post.postPicturePath} />
              <CardActions>
                <Stack flexDirection={"row"} alignItems={"center"}>
                  <IconButton
                    aria-label="add to favorites"
                    onClick={() => handleLike(post._id)}
                  >
                    <Checkbox
                      icon={<FavoriteBorder />}
                      checkedIcon={<Favorite sx={{ color: "red" }} />}
                      checked={isPostLiked(post._id)}
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

export default MySocialPosts;
