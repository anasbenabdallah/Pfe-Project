//;
import axios from "axios";
import {
  Typography,
  Modal,
  Fade,
  CardHeader,
  Avatar,
  Button,
  CardContent,
  Chip,
  Divider,
} from "@mui/material";
import { useState } from "react";

import { makeStyles } from "@mui/styles";
import { Stack } from "@mui/system";
import { Snackbar } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: "80%",
    maxWidth: "800px",
    maxHeight: "800px",
    overflow: "scroll",
  },
}));

const JobPopup = ({
  open,
  handleClose,
  title,
  description,
  username,
  jobId,
  userId,
}) => {
  const classes = useStyles();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("");

  const handleApply = async (userId) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/event/jobs/${jobId}/apply/${userId}`
      );
      setSnackbarMessage(response.data);
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (err) {
      setSnackbarMessage(err.response.data);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleUnapply = async (userId) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/event/jobs/${jobId}/unapply/${userId}`
      );
      setSnackbarMessage(response.data);
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (err) {
      setSnackbarMessage(err.response.data);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    setSnackbarMessage("");
    setSnackbarSeverity("");
  };

  return (
    <>
      <Modal className={classes.modal} open={open} onClose={handleClose}>
        <Fade in={open}>
          <div className={classes.paper}>
            <CardHeader
              title={<Typography variant="h4">{username}</Typography>}
              action={
                <Stack direction="row" spacing={2}>
                  <Button
                    variant="contained"
                    sx={{
                      width: "114.49px",
                      height: "33.76px",
                      borderRadius: "25px",
                      bgcolor: "#8F00FF",
                      color: "#fff",
                      "&:hover": {
                        bgcolor: "#7a00cc",
                      },
                    }}
                    onClick={() => handleApply(userId)}
                  >
                    Participate
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      width: "114.49px",
                      height: "33.76px",
                      borderRadius: "25px",
                      bgcolor: "#ff1744",
                      color: "#fff",
                      "&:hover": {
                        bgcolor: "#d50000",
                      },
                    }}
                    onClick={() => handleUnapply(userId)}
                  >
                    UnParticipate
                  </Button>
                </Stack>
              }
            />
            <Divider />
            <CardContent>
              <Stack spacing={38}>
                <Stack spacing={2}>
                  <Stack
                    flexDirection={"row"}
                    columnGap={"0.3rem"}
                    alignItems={"flex-end"}
                  >
                    <Stack
                      flexDirection={"row"}
                      alignItems={"center"}
                      columnGap={"0.3rem"}
                    >
                      <Typography variant="h4">Event Title :</Typography>
                    </Stack>
                    <Typography variant="h4">{title}</Typography>
                  </Stack>
                  <Divider />
                  <Stack>
                    <Typography variant="h5">About the work offer:</Typography>
                    <Typography variant="body1" Wrap>
                      {description}
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            </CardContent>
          </div>
        </Fade>
      </Modal>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        severity={snackbarSeverity}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />
    </>
  );
};

export default JobPopup;
