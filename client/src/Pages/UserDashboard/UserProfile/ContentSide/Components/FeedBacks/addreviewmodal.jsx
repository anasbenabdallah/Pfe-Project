import { useState } from "react";
import { makeStyles } from "@mui/styles";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Box,
  Rating,
  Snackbar,
  Alert,
} from "@mui/material";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  rating: {
    marginBottom: theme.spacing(2),
  },
}));

const AddReviewModal = ({ open, onClose }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const myData = JSON.parse(localStorage.getItem("user"));
  const { userId } = useParams();

  const [review, setReview] = useState({
    description: "",
    star: 0,
  });
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleInputChange = (event) => {
    const value = event.target.value;
    setReview({ ...review, description: value });
  };

  const handleRatingChange = (event, value) => {
    setReview((prevReview) => ({
      ...prevReview,
      star: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        "http://localhost:8000/review/create",
        {
          userId: myData._id,
          companyId: userId,
          description: review.description,
          star: review.star,
        },
        { withCredentials: true }
      );

      setReview({
        description: "",
        star: 0,
      });
      onClose();
    } catch (error) {
      if (
        error.response &&
        error.response.data.message === "You have already reviewed this tester"
      ) {
        setAlertMessage(
          "You have already reviewed this Tester to avoid spam for the moment you cannot create another feedbacks"
        );
        setAlertOpen(true);
      } else {
        console.error("Error submitting review:", error);
      }
    }
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Add Review</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please leave a review for this tester.
          </DialogContentText>
          <Box className={classes.rating}>
            <Rating
              name="star"
              value={review.star}
              onChange={handleRatingChange}
            />
          </Box>
          <TextField
            autoFocus
            margin="dense"
            label="Description"
            type="text"
            name="description"
            value={review.description}
            onChange={handleInputChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={alertOpen}
        autoHideDuration={6000}
        onClose={handleAlertClose}
      >
        <Alert
          onClose={handleAlertClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AddReviewModal;
