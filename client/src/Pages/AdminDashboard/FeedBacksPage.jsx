import { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import "./FeedbacksPage.css"; // Import CSS file for custom styling

const FeedbacksPage = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [token, setToken] = useState(""); // State to store the JWT token
  const [totalFeedbacks, setTotalFeedbacks] = useState(0);
  const [treatedFeedbacks, setTreatedFeedbacks] = useState(0);
  const [untreatedFeedbacks, setUntreatedFeedbacks] = useState(0);

  useEffect(() => {
    // Function to fetch feedbacks with authentication token
    const fetchFeedbacks = async () => {
      try {
        // Retrieve the JWT token from local storage
        const token = localStorage.getItem("token");
        setToken(token); // Store the token in state

        const response = await axios.get(
          "http://localhost:8000/bayern/getallreviews",
          {
            withCredentials: true,
          }
        );

        const fetchedFeedbacks = response.data;
        setFeedbacks(fetchedFeedbacks);

        // Calculate total, treated, and untreated feedbacks
        setTotalFeedbacks(fetchedFeedbacks.length);
        setTreatedFeedbacks(
          fetchedFeedbacks.filter((feedback) => feedback.etat === "traité")
            .length
        );
        setUntreatedFeedbacks(
          fetchedFeedbacks.filter((feedback) => feedback.etat !== "traité")
            .length
        );
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      }
    };

    fetchFeedbacks();
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  // Function to handle updating the etat of a feedback
  const handleUpdateEtat = async (feedbackId) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/bayerns/${feedbackId}`,
        { etat: "traité" },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update the feedbacks state with the updated feedback
      setFeedbacks((prevFeedbacks) =>
        prevFeedbacks.map((feedback) =>
          feedback._id === feedbackId
            ? { ...feedback, etat: "traité" }
            : feedback
        )
      );

      // Update treated and untreated feedbacks counts
      setTreatedFeedbacks(treatedFeedbacks + 1);
      setUntreatedFeedbacks(untreatedFeedbacks - 1);
    } catch (error) {
      console.error("Error updating feedback etat:", error);
    }
  };

  return (
    <div>
      <h1>Feedbacks</h1>
      <div className="feedbacks-counts">
        <div className="feedbacks-count total-feedbacks">
          total: {totalFeedbacks}
        </div>
        <div className="feedbacks-count treated-feedbacks">
          traité: {treatedFeedbacks}
        </div>
        <div className="feedbacks-count untreated-feedbacks">
          nontraité:{untreatedFeedbacks}
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Etat</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {feedbacks.map((feedback) => (
              <TableRow key={feedback._id}>
                <TableCell>{feedback.description}</TableCell>
                <TableCell>{feedback.star} stars</TableCell>
                <UserDetails userId={feedback.userId} />
                <TableCell>
                  <Button
                    style={{
                      color: feedback.etat === "traité" ? "green" : "red",
                    }}
                  >
                    {feedback.etat}
                  </Button>{" "}
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleUpdateEtat(feedback._id)}
                    disabled={feedback.etat === "traité"}
                  >
                    Update Etat
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

const UserDetails = ({ userId }) => {
  return (
    <>
      <TableCell>
        {userId?.firstname} {userId?.lastname}
      </TableCell>
      <TableCell>{userId?.email}</TableCell>
    </>
  );
};

export default FeedbacksPage;
