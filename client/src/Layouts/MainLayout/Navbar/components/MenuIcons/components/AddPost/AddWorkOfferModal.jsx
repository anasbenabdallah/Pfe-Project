import { useState } from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  InputLabel,
  TextField,
  IconButton,
  Paper,
} from "@mui/material";
import { green } from "@mui/material/colors";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { Stack } from "@mui/system";
import { useNavigate } from "react-router-dom";
import storage from "../../../../../../../../src/config/firebase";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { getDownloadURL } from "firebase/storage";
import { Snackbar } from "@mui/material";

export const AddWorkOfferModal = ({ open, handleClose }) => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",

    imageFile: null,
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("");

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      imageFile: e.target.files[0],
    }));
  };

  const uploadImageToFirebase = async () => {
    const storageRef = ref(storage, `images/${inputs.imageFile.name}`);
    await uploadBytes(storageRef, inputs.imageFile);
    const imageURL = await getDownloadURL(storageRef);
    return imageURL;
  };

  const sendRequest = async () => {
    try {
      const imageURL = inputs.imageFile ? await uploadImageToFirebase() : "";
      const res = await axios.post("http://localhost:8000/event/jobs/add", {
        title: inputs.title,
        description: inputs.description,

        image: imageURL,
        tester: JSON.parse(localStorage.getItem("user"))._id,
      });
      const data = await res.data;
      return data;
    } catch (err) {
      console.error(err);
      throw err; // re-throw the error to be handled by the caller
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);

    // check if salary is a number

    sendRequest()
      .then((data) => console.log(data))
      .then(() => window.location.reload());
  };
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    setSnackbarMessage("");
    setSnackbarSeverity("");
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <Stack spacing={1}>
        <DialogTitle variant="h5">Create a Event Offer</DialogTitle>
        <Divider />
        <DialogContent>
          <Stack spacing={2}>
            <form onSubmit={handleSubmit}>
              <InputLabel>Event Title</InputLabel>
              <TextField
                name="title"
                onChange={handleChange}
                value={inputs.title}
                margin="normal"
                variant="outlined"
                required
                fullWidth
                id="title"
                label="Title"
                autoFocus
              />
              <InputLabel>Event Description</InputLabel>
              <TextField
                name="description"
                onChange={handleChange}
                value={inputs.description}
                margin="normal"
                variant="outlined"
                required
                fullWidth
                id="description"
                label="Description"
                multiline
                rows={4}
              />

              <Paper variant="outlined" sx={{ padding: "5px" }}>
                <IconButton
                  aria-label="upload picture"
                  component="label"
                  sx={{ bgcolor: green[500] }}
                >
                  <input
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={handleFileChange}
                  />
                  <PhotoCamera sx={{ fill: "white" }} />
                </IconButton>
              </Paper>

              <Stack direction={"row"} justifyContent={"space-between"}>
                <Button variant="outlined" onClick={handleClose}>
                  Cancel
                </Button>
                <Button variant="contained" type="submit">
                  Post a event offer
                </Button>
              </Stack>
            </form>
          </Stack>
        </DialogContent>
      </Stack>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        severity={snackbarSeverity}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />
    </Dialog>
  );
};
