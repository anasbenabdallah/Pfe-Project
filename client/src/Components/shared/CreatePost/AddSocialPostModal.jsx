import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Paper,
  TextField,
  Stack,
  Typography,
  Autocomplete,
  IconButton,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import SmartDisplayIcon from "@mui/icons-material/SmartDisplay";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
//redux
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../../redux/actions/SocialPostAction";
import { getCategories } from "../../../redux/actions/CategoryAction";

//firebase
import storage from "../../../config/firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

export const AddSocialPostModal = ({ open, handleClose }) => {
  const myData = JSON.parse(localStorage.getItem("user"));
  const userId = myData._id;
  const dispatch = useDispatch();

  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [postFile, setPostFile] = useState(null);
  const [imgPerc, setImgPerc] = useState(0);
  const [videoPerc, setVideoPerc] = useState(0);
  const [pollQuestion, setPollQuestion] = useState("");
  const [pollOptions, setPollOptions] = useState([{ id: 1, text: "" }]);

  const uploadFile = async () => {
    const storageRef = ref(storage);
    const fileName = Date.now(); // generate a timestamp

    const fileRef = ref(storageRef, `files/${myData.posts.length}-${fileName}`);
    const uploadTask = uploadBytesResumable(fileRef, postFile);

    try {
      const snapshot = await uploadTask;
      const url = await getDownloadURL(fileRef);
      return url;
    } catch (error) {
      console.log(error);
    }
  };

  const handlePostFileChange = (e) => {
    if (e.target.files[0]) {
      setPostFile(e.target.files[0]);
    }
  };

  const categories = useSelector((state) => state.Category.categories);

  useEffect(() => {
    dispatch(getCategories()).catch(() =>
      console.log("Error loading categories")
    );
  }, [dispatch]);

  const handleAddOption = () => {
    setPollOptions([...pollOptions, { id: pollOptions.length + 1, text: "" }]);
  };

  const handleRemoveOption = (id) => {
    setPollOptions(pollOptions.filter((option) => option.id !== id));
  };

  const handleOptionChange = (id, text) => {
    setPollOptions(
      pollOptions.map((option) =>
        option.id === id ? { ...option, text } : option
      )
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const url = postFile ? await uploadFile() : null;

      const postData = {
        userId,
        description,
        categories: selectedCategory,
        postPicturePath: url,
      };

      // Include poll data only if pollQuestion is provided and at least one option has text
      if (pollQuestion && pollOptions.some((option) => option.text.trim())) {
        postData.poll = {
          question: pollQuestion,
          options: pollOptions.filter((option) => option.text.trim()), // Filter out empty options
        };
      }

      dispatch(createPost(postData));
      window.location.reload();
    } catch (error) {
      console.log(error);
    }

    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <Stack component="form" onSubmit={handleSubmit} spacing={1}>
        <DialogTitle variant="h5">Create a Post</DialogTitle>
        <Divider />
        <DialogContent sx={{ pb: 0 }}>
          <Stack spacing={1}>
            <TextField
              autoFocus
              margin="dense"
              multiline
              id="name"
              placeholder="Write here"
              fullWidth
              variant="outlined"
              onChange={(event) => setDescription(event.target.value)}
              rows={8}
            />
            <Autocomplete
              onChange={(event, newValue) => {
                setSelectedCategory(newValue);
                console.log("Selected category:", newValue);
              }}
              selected={selectedCategory}
              multiple
              limitTags={2}
              id="multiple-limit-tags"
              options={categories}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="categories"
                  placeholder="categories"
                />
              )}
            />

            {selectedCategory && selectedCategory.length > 0 ? (
              <>
                <Typography>Selected categories:</Typography>
                {selectedCategory.map((category) => (
                  <p key={category._id}>{category.name}</p>
                ))}
              </>
            ) : (
              <p>No category selected</p>
            )}

            <Paper variant="outlined" sx={{ padding: "5px" }}>
              <Button
                aria-label="upload picture"
                component="label"
                color="primary"
                startIcon={<PhotoCamera />}
              >
                {imgPerc > 0 ? (
                  "Uploading:" + imgPerc + "%"
                ) : (
                  <input
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={handlePostFileChange}
                  />
                )}
                <Typography>Picture</Typography>
              </Button>
              <Button
                aria-label="upload picture"
                component="label"
                color={"warning"}
                startIcon={<SmartDisplayIcon />}
              >
                {!videoPerc ? (
                  <input
                    hidden
                    accept="video/*"
                    type="file"
                    onChange={handlePostFileChange}
                  />
                ) : (
                  "Uploading:" + videoPerc
                )}
                <Typography>Video</Typography>
              </Button>
            </Paper>

            <Typography variant="h6">Create a Poll</Typography>
            <TextField
              margin="dense"
              id="pollQuestion"
              label="Poll Question"
              fullWidth
              variant="outlined"
              value={pollQuestion}
              onChange={(event) => setPollQuestion(event.target.value)}
            />
            {pollOptions.map((option) => (
              <Stack key={option.id} direction="row" spacing={1}>
                <TextField
                  margin="dense"
                  label={`Option ${option.id}`}
                  variant="outlined"
                  value={option.text}
                  onChange={(event) =>
                    handleOptionChange(option.id, event.target.value)
                  }
                  fullWidth
                />
                <IconButton
                  aria-label="delete"
                  onClick={() => handleRemoveOption(option.id)}
                >
                  <DeleteOutlineIcon />
                </IconButton>
              </Stack>
            ))}
            <Button
              startIcon={<AddCircleOutlineIcon />}
              onClick={handleAddOption}
            >
              Add Option
            </Button>
          </Stack>
        </DialogContent>

        <Stack
          direction={"row"}
          sx={{
            justifyContent: "space-between",
            px: 0,
            padding: "20px 20px",
          }}
        >
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" type="submit">
            Post
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};
