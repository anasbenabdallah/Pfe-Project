import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Card, CardActions, Grid, Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import SubmissionDialog from "./SubmissionDialog";
import { useDispatch } from "react-redux";
import { joinChallenge } from "../../../../redux/actions/ChallengeAction";
import getDeadlineDifference from "./deadlineModif";

const {
  UnjoinChallenge,
} = require("../../../../redux/actions/ChallengeAction");

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: 200,
    padding: "2% 8%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    backgroundColor: `${theme.palette.secondary.darker}`,
    [theme.breakpoints.down("sm")]: {
      padding: "0% 2%",
    },
  },
  media: {
    position: "relative",
    height: 200,
    backgroundColor: "#f5f5f5",
  },
  title: {
    color: `${theme.palette.secondary.lighter}`,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },

  gridItem: {
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
}));

const Banner = ({ entry }) => {
  const classes = useStyles();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(null);
  const [deadline, setDeadline] = useState(null);
  const [now, setNow] = useState(new Date().toISOString().slice(0, -8));

  const myData = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date().toISOString().slice(0, -8));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (myData.role === "user") {
      if (
        myData.submissions.some(
          (submission) => submission.challengeId === entry._id
        )
      ) {
        setIsSubmitted(true);
      }
    }
    const formatteDate = getDeadlineDifference(entry.deadline);
    setDeadline(formatteDate);
  }, [now]);

  const dispatch = useDispatch();

  console.log("submit : ", isSubmitted);
  const handleOpen = (row) => {
    setModalOpen(true);
    setSelectedRow(row);
    console.log(row);
  };

  const handleClose = () => {
    setModalOpen(false);
    setSelectedRow(null);
  };

  const handleRegisterClick = async () => {
    setIsRegistered(true);
    await dispatch(joinChallenge(entry._id));
  };

  const userChallenges = JSON.parse(localStorage.getItem("user")).challenges;
  console.log(userChallenges);

  const checkAlreadyRegistered = () => {
    const Registered = userChallenges.some(
      (challengeId) => challengeId === entry._id
    );
    console.log(Registered);
    setAlreadyRegistered(Registered);
    setIsRegistered(Registered);
  };

  useEffect(() => {
    checkAlreadyRegistered();
  }, []);

  const handleUnregisterClick = async () => {
    setIsRegistered(false);
    await dispatch(UnjoinChallenge(entry._id));
  };

  return (
    <Card className={classes.root} variant="outlined">
      <React.Fragment key={entry._id}>
        <Grid container>
          <Grid item lg={9} md={9} sm={9} xs={12}>
            <Typography gutterBottom variant="h3" className={classes.title}>
              {entry.title}
            </Typography>
          </Grid>
          <Grid
            item
            lg={3}
            md={3}
            sm={3}
            xs={12}
            sx={{
              display: { sm: "flex" },
            }}
            justifyContent={"flex-end"}
          >
            {myData.role === "user" &&
            deadline !== "0 Days 0 Hours 0 Minutes" &&
            !isSubmitted ? (
              <Stack columnGap={1} flexDirection={"row"}>
                {isRegistered ? (
                  <Button
                    variant="outlined"
                    onClick={handleUnregisterClick}
                    className={classes.gridItem}
                  >
                    Unregister
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    onClick={handleRegisterClick}
                    className={classes.gridItem}
                  >
                    Register
                  </Button>
                )}
                <Button
                  variant="contained"
                  disabled={!isRegistered}
                  className={classes.gridItem}
                  onClick={() => handleOpen(entry)}
                >
                  Submit
                </Button>
              </Stack>
            ) : null}
          </Grid>
        </Grid>
        <Grid container>
          <Grid item lg={9} md={9} sm={9} xs={12}>
            <Button variant="outlined" className={classes.gridItem}>
              {deadline}{" "}
            </Button>
          </Grid>
          <Grid
            item
            lg={3}
            md={3}
            sm={3}
            xs={12}
            sx={{
              display: { sm: "flex" },
            }}
            justifyContent={"flex-end"}
          >
            <Stack columnGap={1} flexDirection={"row"}>
              <Button variant="outlined" className={classes.gridItem}>
                Prize : {entry.price}$
              </Button>
            </Stack>
          </Grid>
        </Grid>
        <SubmissionDialog
          open={modalOpen}
          selectedRow={selectedRow}
          handleClose={handleClose}
          setIsSubmitted={setIsSubmitted}
        />
      </React.Fragment>
    </Card>
  );
};

export default Banner;
