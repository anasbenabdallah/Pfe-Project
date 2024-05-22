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
} from "@mui/material";

const FeedbacksPage = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [token, setToken] = useState(""); // State to store the JWT token

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

        setFeedbacks(response.data);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      }
    };

    fetchFeedbacks();
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  return (
    <div>
      <h1>Feedbacks</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {feedbacks.map((feedback) => (
              <TableRow key={feedback._id}>
                <TableCell>{feedback.description}</TableCell>
                <TableCell>{feedback.star} stars</TableCell>
                <UserDetails userId={feedback.userId} />
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
        {userId.firstname} {userId.lastname}
      </TableCell>
      <TableCell>{userId.email}</TableCell>
    </>
  );
};

export default FeedbacksPage;
