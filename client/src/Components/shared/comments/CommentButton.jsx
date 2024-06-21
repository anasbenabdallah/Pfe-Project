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
  Divider,
  ListItem,
  Avatar,
  ListItemText,
  List,
  ListItemAvatar,
} from "@mui/material";
import { formatDistance } from "date-fns";
import AddCommentOutlinedIcon from "@mui/icons-material/AddCommentOutlined";
import { useSelector, useDispatch } from "react-redux";
import { getComments, addComment } from "../../../redux/actions/CommentAction";

const CommentButton = ({ postId }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [desc, setDesc] = useState("");
  const [selectedPostId, setSelectedPostId] = useState(null);

  const handleButtonClick = (postId) => {
    setSelectedPostId(postId);
    setIsOpen(true);
  };

  const handleDialogClose = () => {
    setIsOpen(false);
  };

  const comments = useSelector(
    (state) => state.Comment.comments[selectedPostId]
  );

  useEffect(() => {
    if (selectedPostId !== null) {
      dispatch(getComments(selectedPostId));
    }
  }, [dispatch, selectedPostId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      dispatch(
        addComment({
          postId: selectedPostId,
          desc,
        })
      );
      setDesc("");
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
                    <div key={comment._id}>
                      <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                          <Avatar src={comment.userId.picturePath} />
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Typography
                              component="span"
                              variant="body1"
                              color="text.primary"
                            >
                              {comment.userId.firstname}{" "}
                              {comment.userId.lastname}
                            </Typography>
                          }
                          secondary={
                            <React.Fragment>
                              <Typography
                                sx={{ display: "inline" }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                              >
                                {comment.desc}
                              </Typography>
                              <br />
                              {formatDistance(
                                new Date(comment.createdAt),
                                new Date(),
                                {
                                  addSuffix: true,
                                }
                              )}
                            </React.Fragment>
                          }
                        />
                      </ListItem>
                      <Divider />
                    </div>
                  ))}
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
