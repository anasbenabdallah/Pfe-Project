import { useState } from "react";
import { makeStyles } from "@mui/styles";
import { Typography, Box, Button, Grid } from "@mui/material";
import Rating from "@mui/material/Rating";
import AddReviewModal from "./addreviewmodal";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getReviews } from "../../../../../../redux/actions/ReviewAction";
import { useParams } from "react-router-dom";
import { reviewsSelector } from "../../../../../../redux/reducers/ReviewReducer";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(4),
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  feedbackItem: {
    padding: theme.spacing(2),
    border: `1px solid ${theme.palette.grey[300]}`,
    borderRadius: theme.shape.borderRadius,
    marginBottom: theme.spacing(2),
  },
  feedbackHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing(1),
  },
  feedbackText: {
    marginBottom: theme.spacing(1),
  },
  feedbackRating: {
    marginRight: theme.spacing(1),
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

const FeedbacksPage = () => {
  const classes = useStyles();
  const [feedbacks, setFeedbacks] = useState([]);
  const { userId } = useParams();
  const myData = JSON.parse(localStorage.getItem("user"));
  console.log(userId);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getReviews(userId));
  }, []);
  const reviews = useSelector(reviewsSelector);
  console.log(reviews);

  const [openAddReviewModal, setOpenAddReviewModal] = useState(false);

  const handleOpenAddReviewModal = () => {
    setOpenAddReviewModal(true);
  };

  const handleCloseAddReviewModal = () => {
    setOpenAddReviewModal(false);
  };

  return (
    <Box className={classes.root}>
      <Typography variant="h4" className={classes.title}>
        Feedbacks ({reviews.length})
      </Typography>

      {/* Render feedback items */}
      {reviews.map((review) => (
        <Box key={review._id} className={classes.feedbackItem}>
          <Box className={classes.feedbackHeader}>
            <Rating
              className={classes.feedbackRating}
              value={review.star}
              readOnly
            />
            <Typography variant="subtitle2">
              {new Date(review.createdAt).toLocaleDateString()}
            </Typography>
          </Box>
          <Typography
            variant="body1"
            className={classes.feedbackText}
            style={{ color: review.star === 5 ? "green" : "black" }}
          >
            {review.description}
          </Typography>
        </Box>
      ))}

      {/* Add feedback button */}
      {myData.role == "tester" && (
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={handleOpenAddReviewModal}
        >
          Add Feedback
        </Button>
      )}
      <AddReviewModal
        open={openAddReviewModal}
        onClose={handleCloseAddReviewModal}
      />
    </Box>
  );
};

export default FeedbacksPage;
