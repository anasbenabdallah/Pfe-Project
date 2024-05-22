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
} from "@mui/material";
import { useDispatch } from "react-redux";
import { addReview } from "../../../../../../redux/actions/ReviewAction";
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

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(review);
    dispatch(addReview({ ...review, companyId: myData._id, userId: userId }));
    setReview({
      description: "",
      star: 0,
    });
    onClose();
  };

  return (
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
  );
};

export default AddReviewModal;
