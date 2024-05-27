import { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import {
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
  Pagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
} from "@mui/material";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    marginBottom: theme.spacing(2),
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 120,
    height: 120,
    margin: theme.spacing(2),
  },
}));

const ContestCards = () => {
  const classes = useStyles();

  const [favoritePosts, setFavoritePosts] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const cardsPerPage = 3;
  const startIndex = (page - 1) * cardsPerPage;
  const endIndex = page * cardsPerPage;

  useEffect(() => {
    fetchFavoritePosts();
  }, []);

  const fetchFavoritePosts = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user._id;
      const response = await axios.get(
        `http://localhost:8000/post/${userId}/favorites`,
        {
          withCredentials: true,
        }
      );

      setFavoritePosts(response.data);
    } catch (error) {
      console.error("Error fetching favorite posts:", error);
    }
  };

  const totalPages = Math.ceil(favoritePosts.length / cardsPerPage);

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const handlePostClick = (post) => {
    setSelectedPost(post);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const removeFromFavorites = async (postId) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user._id;
      await axios.delete(
        `http://localhost:8000/post/${userId}/favorites/${postId}`,
        {
          withCredentials: true,
        }
      );
      // Remove the post from the favoritePosts state
      setFavoritePosts((prevPosts) =>
        prevPosts.filter((post) => post._id !== postId)
      );
    } catch (error) {
      console.error("Error removing post from favorites:", error);
    }
  };

  return (
    <>
      <Stack flexDirection={"column"} alignItems={"flex-end"}>
        {favoritePosts.length > 0 &&
          favoritePosts.slice(startIndex, endIndex).map((post) => (
            <Card
              key={post._id}
              className={classes.root}
              sx={{
                ":hover": {
                  boxShadow: "5",
                },
              }}
            >
              <CardMedia
                className={classes.cover}
                image={post.postPicturePath}
                title={post.title}
                sx={{ display: { xs: "none", sm: "block" } }}
              />
              <div className={classes.content}>
                <CardContent>
                  <Stack spacing={2}>
                    <Typography
                      component="h5"
                      variant="h5"
                      overflow="hidden"
                      textOverflow="ellipsis"
                      whiteSpace={"normal"}
                    >
                      {post.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="textSecondary"
                      whiteSpace={"normal"}
                    >
                      {post.firstname} {post.lastname}
                    </Typography>
                    <Stack flexDirection={"row"} columnGap={"0.3rem"}>
                      <Typography variant="subtitle1" color={"primary"}>
                        {post.description}
                      </Typography>
                    </Stack>
                  </Stack>
                </CardContent>
              </div>
              <IconButton onClick={() => removeFromFavorites(post._id)}>
                <DeleteIcon />
              </IconButton>
              <Button onClick={() => handlePostClick(post)}>see details</Button>
            </Card>
          ))}
        <Pagination
          count={totalPages}
          page={page}
          onChange={handleChangePage}
          shape="rounded"
        />
      </Stack>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        {selectedPost && (
          <>
            <DialogTitle>{selectedPost.title}</DialogTitle>
            <DialogContent>
              <Typography variant="body1">
                {selectedPost.description}
              </Typography>
              <Typography variant="h6">Comments:</Typography>
              {selectedPost.comments.map((comment) => (
                <Typography key={comment._id} variant="body2">
                  {comment.desc}
                </Typography>
              ))}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </>
  );
};

export default ContestCards;
