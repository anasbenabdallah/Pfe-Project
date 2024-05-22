import { useEffect, useState } from "react";
import {
  Stack,
  IconButton,
  Typography,
  Dialog,
  DialogContent,
  Button,
  Grid,
  TextField,
  Box,
  ListItemAvatar,
  ListItem,
  Avatar,
  ListItemText,
  Divider,
  CardMedia,
  List,
} from "@mui/material";
import { formatDistance } from "date-fns";
import AddCommentOutlinedIcon from "@mui/icons-material/AddCommentOutlined";
import { useSelector, useDispatch } from "react-redux";
import { getComments, addComment } from "../../../redux/actions/CommentAction";

const CommentButton = ({ postId }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [desc, setDesc] = useState("");
  const [selectedPostId, setSelectedPostId] = useState(null); // new state variable

  const handleButtonClick = (postId) => {
    console.log(postId, "xxx"); // Add this line to log the value of postId
    setSelectedPostId(postId); // update selectedPostId
    setIsOpen(true);
  };

  const handleDialogClose = () => {
    setIsOpen(false);
  };

  const comments = useSelector(
    (state) => state.Comment.comments[selectedPostId]
  );

  console.log(comments, "hedha post id comment");

  useEffect(() => {
    if (selectedPostId !== null) {
      // fetch comments only if selectedPostId is not null
      dispatch(getComments(selectedPostId));
    }
  }, [dispatch, selectedPostId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(desc, "desc"); // Add this line to check the value of the desc variable

    try {
      dispatch(
        addComment({
          postId,
          desc,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Stack flexDirection={"row"} alignItems={"center"}>
        <IconButton
          aria-label="comment"
          onClick={() => handleButtonClick(postId)}
        >
          <AddCommentOutlinedIcon />
        </IconButton>
      </Stack>
      <Dialog open={isOpen} onClose={handleDialogClose} fullWidth maxWidth="sm">
        <DialogContent sx={{ display: "flex" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Stack flexDirection={"row"} columnGap={2}>
                <TextField
                  id="comment-textfield"
                  label="Enter your comment"
                  fullWidth
                  variant="outlined"
                  value={desc}
                  onChange={(event) => {
                    console.log(event.target.value);
                    setDesc(event.target.value);
                  }}
                />
                <Button variant="outlined" onClick={handleSubmit}>
                  Comment
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Divider />
              {comments && comments.length > 0 ? (
                <List>
                  {comments.map((comment) => (
                    <>
                      <ListItem alignItems="flex-start" key={comment._id}>
                        {/*<ListItemAvatar>
                      <Avatar src={comment.user.picturePath} />
                    </ListItemAvatar>*/}
                        <ListItemText
                          secondary={
                            <React.Fragment>
                              <Stack flexDirection={"column"}>
                                <Typography
                                  sx={{ display: "inline" }}
                                  component="span"
                                  variant="body1"
                                  color="text.primary"
                                >
                                  {comment.desc}
                                </Typography>
                                {formatDistance(
                                  new Date(comment.createdAt),
                                  new Date(),
                                  {
                                    addSuffix: true,
                                  }
                                )}
                              </Stack>
                            </React.Fragment>
                          }
                        />
                      </ListItem>
                      <Divider />
                    </>
                  ))}
                  <Divider />
                </List>
              ) : (
                <Typography variant="body1">No comments yet.</Typography>
              )}
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CommentButton;
