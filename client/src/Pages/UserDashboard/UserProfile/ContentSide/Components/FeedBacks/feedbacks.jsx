// Frontend Component

import { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { Typography, Box, Button, Rating, Avatar } from "@mui/material";
import AddReviewModal from "./addreviewmodal";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";

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
  avatar: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    marginRight: theme.spacing(1),
  },
}));

const FeedbacksPage = () => {
  const classes = useStyles();
  const { userId } = useParams();
  const myData = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();

  const [openAddReviewModal, setOpenAddReviewModal] = useState(false);
  const [profileRole, setProfileRole] = useState(null);
  const [userid, setUserid] = useState(null);
  const [feeds, setFeeds] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/reviews/company/${userId}/`,
          { withCredentials: true }
        );
        setFeeds(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/${userId}`, {
          withCredentials: true,
        });
        const user = response.data;
        setProfileRole(user.role);
        setUserid(user._id);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchReviews();
    fetchProfileData();
  }, [userId]);

  const handleOpenAddReviewModal = () => {
    setOpenAddReviewModal(true);
  };

  const handleCloseAddReviewModal = () => {
    setOpenAddReviewModal(false);
  };

  return (
    <Box className={classes.root}>
      <Typography variant="h4" className={classes.title}>
        Feedbacks ({feeds.length})
      </Typography>

      {feeds.map((review) => (
        <Box key={review._id} className={classes.feedbackItem}>
          <Box className={classes.feedbackHeader}>
            <Box display="flex" alignItems="center">
              <Avatar
                src={review?.userId?.picturePath}
                alt="User Avatar"
                className={classes.avatar}
              />
              <Typography variant="subtitle2">{`${review?.userId?.firstname} ${review?.userId?.lastname}`}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2">
                {new Date(review.createdAt).toLocaleDateString()}
              </Typography>
              <Typography
                variant="body1"
                style={{ color: review?.etat === "traité" ? "green" : "red" }}
              >
                {review.etat}
              </Typography>
              <Rating
                className={classes.feedbackRating}
                value={review?.star}
                readOnly
              />
            </Box>
          </Box>
          <Typography
            variant="body1"
            className={classes.feedbackText}
            style={{ color: review.star === 5 ? "green" : "black" }}
          >
            {review.description}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Email: {review?.userId?.email}
          </Typography>
        </Box>
      ))}

      {profileRole === "tester" && userid !== myData._id && (
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
