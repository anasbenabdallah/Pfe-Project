import { useState, useEffect } from "react";
import axios from "axios";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Avatar,
  Grid,
} from "@mui/material";
import { Link } from "react-router-dom";

const Participants = ({ handleClose, jobId, open }) => {
  const [appliers, setAppliers] = useState([]);
  const [acceptedAppliers, setAcceptedAppliers] = useState([]);
  const [sort, setSort] = useState(false);

  console.log(jobId);
  useEffect(() => {
    const fetchAppliers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/event/jobs/${jobId}/appliers`
        );
        setAppliers(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAppliers();
  }, [jobId]);

  useEffect(() => {
    // Load accepted appliers from local storage or from a server API
    const loadAcceptedAppliers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/event/jobs/${jobId}/accepted-appliers`
        );
        setAcceptedAppliers(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    loadAcceptedAppliers();
  }, [jobId]);

  const acceptApplier = async (userId) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/event/jobs/${jobId}/appliers/${userId}/accept`
      );
      console.log(response.data.message);
      setAcceptedAppliers([...acceptedAppliers, userId]);
    } catch (err) {
      console.log(err);
    }
  };

  const isApplierAccepted = (userId) => {
    return acceptedAppliers.includes(userId);
  };

  const handleClick = async () => {
    setSort(true);
    try {
      const response = await axios.get(
        `http://localhost:8000/event/jobs/${jobId}/sortedappliers`
      );
      setAppliers(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth="lg">
      <Grid container alignItems="center">
        <Grid item xs={12} sm={6}>
          <DialogTitle variant="h4">Participants</DialogTitle>
        </Grid>
        <Grid item xs={12} sm={6} container justifyContent="flex-end">
          <Grid item style={{ paddingRight: 20 }}></Grid>
        </Grid>
      </Grid>{" "}
      <DialogContent>
        <TableContainer component={Paper}>
          <Table aria-label="Participants table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(appliers) && appliers.length > 0 ? (
                appliers.map((applier) => (
                  <TableRow key={applier._id}>
                    <Link
                      to={`/profile/${applier._id}`}
                      key={applier._id}
                      onClick={handleClose}
                    >
                      <TableCell component="th" scope="row">
                        {applier.firstname} {applier.lastname}
                      </TableCell>
                    </Link>
                    <TableCell>{applier.email}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => acceptApplier(applier._id)}
                        disabled={isApplierAccepted(applier._id)}
                      >
                        {isApplierAccepted(applier._id) ? "Accepted" : "Accept"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3}>No Pariticpants yet</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default Participants;
